<?php

namespace App\Services;

use App\Models\ExtrasItem;
use App\Models\Service;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PricingService {
    /**
     * Calculate the total price for a reservation
     *
     * @param Service $service
     * @param Carbon $startDateTime
     * @param Carbon $endDateTime
     * @param int $guestsCount
     * @param int $unitsReserved
     * @return array
     */
    public function calculateReservationPrice(
        Service $service,
        Carbon $startDateTime,
        Carbon $endDateTime,
        int $guestsCount = 1,
        int $unitsReserved = 1
    ): array {
        try {
            $basePrice = 0;
            $priceBreakdown = [];
            $duration = $this->calculateDuration($startDateTime, $endDateTime);

            // Load service with active prices and taxes
            $service->load(['prices' => function ($query) {
                $query->where('is_active', true);
            }, 'taxes' => function ($query) {
                $query->where('is_active', true);
            }]);

            // Calculate base price from all applicable pricing models
            foreach ($service->prices as $price) {
                $priceModel = $price->pricingModel;

                switch ($priceModel->calculation_type) {
                    case 'time_based':
                        $quantity = $this->getTimeBasedQuantity($duration, $priceModel->unit);
                        $amount = $this->calculateTimeBasedAmount($price, $quantity, $unitsReserved);
                        break;

                    case 'person_based':
                        $quantity = $guestsCount;
                        $amount = $this->calculatePersonBasedAmount($price, $quantity, $unitsReserved);
                        break;

                    case 'fixed':
                        $quantity = $unitsReserved;
                        $amount = $this->calculateFixedAmount($price, $quantity);
                        break;

                    default:
                        $quantity = 0;
                        $amount = 0;
                        break;
                }

                // Apply minimum and maximum constraints
                $amount = $this->applyPriceConstraints($price, $amount, $quantity);

                if ($amount > 0) {
                    $basePrice += $amount;
                    $priceBreakdown[] = [
                        'pricing_model' => $priceModel->name,
                        'rate' => (float) $price->amount,
                        'quantity' => $quantity,
                        'units' => $unitsReserved,
                        'amount' => round($amount, 2),
                        'calculation_type' => $priceModel->calculation_type,
                    ];
                }
            }

            // Calculate taxes
            $taxAmount = $this->calculateTaxes($service, $basePrice);
            $totalPrice = $basePrice + $taxAmount;

            return [
                'base_price' => round($basePrice, 2),
                'tax_amount' => round($taxAmount, 2),
                'total_price' => round($totalPrice, 2),
                'price_breakdown' => $priceBreakdown,
                'tax_breakdown' => $this->getTaxBreakdown($service, $basePrice),
                'duration' => $duration,
                'guests_count' => $guestsCount,
                'units_reserved' => $unitsReserved,
            ];
        } catch (\Exception $e) {
            Log::error('Price calculation failed: ' . $e->getMessage());
            throw new \Exception('Failed to calculate price: ' . $e->getMessage());
        }
    }

    /**
     * Calculate duration in appropriate units
     *
     * @param Carbon $start
     * @param Carbon $end
     * @return array
     */
    protected function calculateDuration(Carbon $start, Carbon $end): array {
        $totalMinutes = $end->diffInMinutes($start);
        $totalHours = $end->diffInHours($start);
        $totalDays = $end->diffInDays($start);

        return [
            'minutes' => $totalMinutes,
            'hours' => $totalHours,
            'days' => $totalDays,
            'total_hours' => round($totalMinutes / 60, 2),
        ];
    }

    /**
     * Get quantity based on time unit
     *
     * @param array $duration
     * @param string $unit
     * @return float
     */
    protected function getTimeBasedQuantity(array $duration, string $unit): float {
        switch ($unit) {
            case 'hour':
                return $duration['total_hours'];
            case 'day':
                return $duration['days'];
            default:
                return $duration['hours'];
        }
    }

    /**
     * Calculate time-based amount
     *
     * @param mixed $price
     * @param float $quantity
     * @param int $units
     * @return float
     */
    protected function calculateTimeBasedAmount($price, float $quantity, int $units): float {
        return $price->amount * $quantity * $units;
    }

    /**
     * Calculate person-based amount
     *
     * @param mixed $price
     * @param int $quantity
     * @param int $units
     * @return float
     */
    protected function calculatePersonBasedAmount($price, int $quantity, int $units): float {
        return $price->amount * $quantity * $units;
    }

    /**
     * Calculate fixed amount
     *
     * @param mixed $price
     * @param int $quantity
     * @return float
     */
    protected function calculateFixedAmount($price, int $quantity): float {
        return $price->amount * $quantity;
    }

    /**
     * Apply price constraints (min/max amount and quantity)
     *
     * @param mixed $price
     * @param float $amount
     * @param float $quantity
     * @return float
     */
    protected function applyPriceConstraints($price, float $amount, float $quantity): float {
        // Apply minimum quantity check
        if ($price->min_quantity && $quantity < $price->min_quantity) {
            $quantity = $price->min_quantity;
            $amount = $price->amount * $quantity;
        }

        // Apply maximum quantity check
        if ($price->max_quantity && $quantity > $price->max_quantity) {
            $quantity = $price->max_quantity;
            $amount = $price->amount * $quantity;
        }

        // Apply minimum amount
        if ($price->min_amount && $amount < $price->min_amount) {
            $amount = $price->min_amount;
        }

        // Apply maximum amount
        if ($price->max_amount && $amount > $price->max_amount) {
            $amount = $price->max_amount;
        }

        return $amount;
    }

    /**
     * Calculate taxes for a service
     *
     * @param Service $service
     * @param float $basePrice
     * @return float
     */
    protected function calculateTaxes(Service $service, float $basePrice): float {
        $totalTax = 0;

        foreach ($service->taxes as $tax) {
            if ($tax->type === 'percentage') {
                $taxAmount = $basePrice * ($tax->rate / 100);
            } else {
                $taxAmount = $tax->rate;
            }

            // If tax is compound, add it to base for next tax calculation
            if ($tax->is_compound) {
                $basePrice += $taxAmount;
            }

            $totalTax += $taxAmount;
        }

        return $totalTax;
    }

    /**
     * Get detailed tax breakdown
     *
     * @param Service $service
     * @param float $basePrice
     * @return array
     */
    protected function getTaxBreakdown(Service $service, float $basePrice): array {
        $breakdown = [];
        $currentBase = $basePrice;

        foreach ($service->taxes as $tax) {
            if ($tax->type === 'percentage') {
                $taxAmount = $currentBase * ($tax->rate / 100);
            } else {
                $taxAmount = $tax->rate;
            }

            $breakdown[] = [
                'name' => $tax->name,
                'rate' => (float) $tax->rate,
                'type' => $tax->type,
                'amount' => round($taxAmount, 2),
                'is_compound' => $tax->is_compound,
            ];

            if ($tax->is_compound) {
                $currentBase += $taxAmount;
            }
        }

        return $breakdown;
    }

    /**
     * Validate reservation parameters before calculation
     *
     * @param Service $service
     * @param Carbon $startDateTime
     * @param Carbon $endDateTime
     * @param int $guestsCount
     * @param int $unitsReserved
     * @return bool
     * @throws \Exception
     */
    public function validateReservationParameters(
        Service $service,
        Carbon $startDateTime,
        Carbon $endDateTime,
        int $guestsCount = 1,
        int $unitsReserved = 1
    ): bool {
        // Check if end time is after start time
        if ($endDateTime <= $startDateTime) {
            throw new \Exception('End time must be after start time');
        }

        // Check if guests count exceeds service capacity
        if ($guestsCount > $service->max_capacity * $unitsReserved) {
            throw new \Exception('Number of guests exceeds capacity for the selected units');
        }

        // Check if service has active prices
        if (!$service->prices()->where('is_active', true)->exists()) {
            throw new \Exception('Service has no active pricing');
        }

        // Check if units reserved is valid
        if ($unitsReserved < 1) {
            throw new \Exception('At least one unit must be reserved');
        }

        return true;
    }

    /**
     * Calculate price for an existing reservation
     *
     * @param Reservation $reservation
     * @return array
     */
    public function calculateForReservation(Reservation $reservation): array {
        return $this->calculateReservationPrice(
            $reservation->service,
            $reservation->start_datetime,
            $reservation->end_datetime,
            $reservation->guests_count,
            $reservation->units_reserved
        );
    }

    /**
     * Flatten extras tax breakdown from all extras items
     */
    protected function flattenExtrasTaxBreakdown(array $extrasBreakdown): array
    {
        $flattened = [];
        
        foreach ($extrasBreakdown as $extra) {
            if (isset($extra['tax_breakdown'])) {
                foreach ($extra['tax_breakdown'] as $tax) {
                    // Group identical taxes together
                    $key = $tax['name'] . '_' . $tax['type'] . '_' . $tax['rate'];
                    if (!isset($flattened[$key])) {
                        $flattened[$key] = $tax;
                        $flattened[$key]['amount'] = 0;
                    }
                    $flattened[$key]['amount'] += $tax['amount'];
                }
            }
        }
        
        return array_values($flattened);
    }

    /**
     * Calculate extras price for a reservation
     *
     * @param array $extrasSelection [['extras_item_id' => uuid, 'quantity' => int]]
     * @param Carbon $startDateTime
     * @param Carbon $endDateTime
     * @param int $guestsCount
     * @return array
     */
    public function calculateExtrasPrice(
        array $extrasSelection,
        Carbon $startDateTime,
        Carbon $endDateTime,
        int $guestsCount = 1
    ): array {
        $totalExtrasPrice = 0;
        $extrasBreakdown = [];

        foreach ($extrasSelection as $selection) {
            $extrasItem = ExtrasItem::with('taxes')->find($selection['extras_item_id']);

            if (!$extrasItem || !$extrasItem->is_active) {
                continue;
            }

            $quantity = $selection['quantity'] ?? 1;
            $unitPrice = $this->calculateExtrasUnitPrice(
                $extrasItem,
                $startDateTime,
                $endDateTime,
                $guestsCount
            );

            $subtotal = $unitPrice * $quantity;
            $taxAmount = $this->calculateExtrasTax($extrasItem, $subtotal);
            $totalItemPrice = $subtotal + $taxAmount;

            $extrasBreakdown[] = [
                'extras_item_id' => $extrasItem->id,
                'name' => $extrasItem->name,
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_price' => $totalItemPrice,
                'tax_breakdown' => $this->getExtrasTaxBreakdown($extrasItem, $subtotal),
            ];

            $totalExtrasPrice += $totalItemPrice;
        }

        return [
            'total_extras_price' => round($totalExtrasPrice, 2),
            'extras_breakdown' => $extrasBreakdown,
        ];
    }

    /**
     * Calculate unit price for an extras item based on price type
     */
    protected function calculateExtrasUnitPrice(
        ExtrasItem $extrasItem,
        Carbon $startDateTime,
        Carbon $endDateTime,
        int $guestsCount
    ): float {
        $duration = $this->calculateDuration($startDateTime, $endDateTime);

        switch ($extrasItem->price_type) {
            case 'per_person':
                return $extrasItem->price * $guestsCount;

            case 'per_night':
                return $extrasItem->price * $duration['days'];

            case 'per_hour':
                return $extrasItem->price * $duration['total_hours'];

            case 'fixed':
            default:
                return $extrasItem->price;
        }
    }

    /**
     * Calculate tax for extras item
     */
    protected function calculateExtrasTax(ExtrasItem $extrasItem, float $subtotal): float {
        $totalTax = 0;

        foreach ($extrasItem->taxes as $tax) {
            if ($tax->type === 'percentage') {
                $taxAmount = $subtotal * ($tax->rate / 100);
            } else {
                $taxAmount = $tax->rate;
            }
            $totalTax += $taxAmount;
        }

        return $totalTax;
    }

    /**
     * Get tax breakdown for extras item
     */
    protected function getExtrasTaxBreakdown(ExtrasItem $extrasItem, float $subtotal): array {
        $breakdown = [];

        foreach ($extrasItem->taxes as $tax) {
            if ($tax->type === 'percentage') {
                $taxAmount = $subtotal * ($tax->rate / 100);
            } else {
                $taxAmount = $tax->rate;
            }

            $breakdown[] = [
                'name' => $tax->name,
                'rate' => (float) $tax->rate,
                'type' => $tax->type,
                'amount' => round($taxAmount, 2),
            ];
        }

        return $breakdown;
    }

    public function calculateCompleteReservationPrice(
        Service $service,
        Carbon $startDateTime,
        Carbon $endDateTime,
        int $guestsCount = 1,
        int $unitsReserved = 1,
        array $extrasSelection = []
    ): array {
        $basePrice = $this->calculateReservationPrice(
            $service, $startDateTime, $endDateTime, $guestsCount, $unitsReserved
        );

        $extrasPrice = $this->calculateExtrasPrice(
            $extrasSelection, $startDateTime, $endDateTime, $guestsCount
        );

        // Calculate total tax amount from base and extras
        $totalTaxAmount = $basePrice['tax_amount'];
        foreach ($extrasPrice['extras_breakdown'] as $extra) {
            $totalTaxAmount += $extra['tax_amount'];
        }

        return [
            'base_price' => $basePrice['base_price'],
            'tax_amount' => $totalTaxAmount,
            'total_price' => $basePrice['total_price'] + $extrasPrice['total_extras_price'],
            'price_breakdown' => $basePrice['price_breakdown'],
            'extras_breakdown' => $extrasPrice['extras_breakdown'],
            'tax_breakdown' => array_merge($basePrice['tax_breakdown'], $this->flattenExtrasTaxBreakdown($extrasPrice['extras_breakdown'])),
            'duration' => $basePrice['duration'],
            'guests_count' => $guestsCount,
            'units_reserved' => $unitsReserved,
        ];
    }
}
