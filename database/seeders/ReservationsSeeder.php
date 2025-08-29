<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReservationsSeeder extends Seeder
{
    public \Faker\Generator $faker;
    
    public function __construct() {
        $this->faker = \Faker\Factory::create();
    }

    public function run()
    {
        $user = DB::table('users')->first();
        $customer = DB::table('users')->where('role', 'customer')->first();
        $services = DB::table('services')->get();

        if (!$customer || $services->isEmpty()) {
            $this->command->info('Skipping reservations seeder - missing required data');
            return;
        }

        $statuses = ['pending', 'confirmed', 'checked_in', 'completed', 'cancelled'];
        $sources = ['website', 'phone', 'in_person'];

        for ($i = 0; $i < 20; $i++) {
            $service = $services->random();
            $startDate = Carbon::today()->addDays($this->faker->numberBetween(1, 30));
            
            $price = DB::table('prices')->where('service_id', $service->id)->first();
            $serviceTaxes = DB::table('service_taxes')
                ->join('taxes', 'service_taxes.tax_id', '=', 'taxes.id')
                ->where('service_taxes.service_id', $service->id)
                ->where('taxes.is_active', true)
                ->get();

            if (!$price) continue;

            // Adjust time based on service type
            $startTime = Carbon::createFromTime($this->faker->numberBetween(9, 16), 0, 0);
            $durationHours = $this->faker->numberBetween(1, 8);

            $startDateTime = $startDate->copy()->setTime($startTime->hour, 0);
            $endDateTime = $startDateTime->copy()->addHours($durationHours);
            
            $guestsCount = $this->faker->numberBetween(1, $service->max_capacity);
            $status = $this->faker->randomElement($statuses);
            $source = $this->faker->randomElement($sources);

            $reservationNumber = 'RES-' . date('Ymd') . '-' . str_pad($i + 1, 4, '0', STR_PAD_LEFT);

            // Calculate prices
            $serviceBasePrice = $this->calculateServicePrice($price, $durationHours, $guestsCount);
            $serviceTaxAmount = $this->calculateTaxAmount($serviceTaxes, $serviceBasePrice);
            
            // Build applied_taxes JSON
            $appliedTaxes = [];
            foreach ($serviceTaxes as $tax) {
                if ($tax->is_default) {
                    $appliedTaxes[] = [
                        'tax_id' => $tax->id,
                        'name' => $tax->name,
                        'rate' => $tax->rate,
                        'type' => $tax->type,
                        'is_compound' => $tax->is_compound,
                        'amount' => $tax->type === 'percentage' 
                            ? $serviceBasePrice * ($tax->rate / 100)
                            : $tax->rate
                    ];
                }
            }

            DB::table('reservations')->insertGetId([
                'user_id' => $user->id,
                'reservation_number' => $reservationNumber,
                'customer_id' => $customer->id,
                'service_id' => $service->id,
                'price_id' => $price->id,
                'applied_taxes' => json_encode(['taxes' => $appliedTaxes]),
                'start_datetime' => $startDateTime,
                'end_datetime' => $endDateTime,
                'timezone' => 'UTC',
                'guests_count' => $guestsCount,
                'units_reserved' => 1,
                'status' => $status,
                'cancellation_reason' => $status === 'cancelled' ? $this->faker->sentence() : null,
                'source' => $source,
                'special_requests' => $this->faker->boolean(30) ? $this->faker->sentence() : null,
                'base_price' => $serviceBasePrice,
                'tax_amount' => $serviceTaxAmount,
                'total_price' => $serviceBasePrice + $serviceTaxAmount,
                'price_breakdown' => json_encode([
                    'service' => [
                        'base' => $serviceBasePrice,
                        'taxes' => $serviceTaxAmount,
                        'calculation' => $this->getPriceCalculation($price, $durationHours, $guestsCount)
                    ]
                ]),
                'confirmed_at' => in_array($status, ['confirmed', 'checked_in', 'completed']) ? $this->faker->dateTimeBetween('-1 year', 'now') : null,
                'cancelled_at' => $status === 'cancelled' ? $this->faker->dateTimeBetween('-1 year', 'now') : null,
                'checked_in_at' => in_array($status, ['checked_in', 'completed']) ? $this->faker->dateTimeBetween('-1 year', 'now') : null,
                'completed_at' => $status === 'completed' ? $this->faker->dateTimeBetween('-1 year', 'now') : null,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }

        $this->command->info('Created 20 sample reservations');
    }

    protected function calculateServicePrice($price, $durationHours, $guestsCount): float
    {
        return match($price->type) {
            'hourly' => $price->amount * $durationHours,
            'daily' => $price->amount * ceil($durationHours / 24),
            'per_person' => $price->amount * $guestsCount,
            default => $price->amount
        };
    }

    protected function calculateTaxAmount($taxes, $baseAmount): float
    {
        $totalTax = 0;
        foreach ($taxes as $tax) {
            if ($tax->is_default) {
                $totalTax += $tax->type === 'percentage' 
                    ? $baseAmount * ($tax->rate / 100)
                    : $tax->rate;
            }
        }
        return round($totalTax, 2);
    }

    protected function getPriceCalculation($price, $durationHours, $guestsCount): string
    {
        return match($price->type) {
            'hourly' => "{$price->amount}/hour × {$durationHours} hours",
            'daily' => "{$price->amount}/day × " . ceil($durationHours / 24) . " days",
            'per_person' => "{$price->amount}/person × {$guestsCount} guests",
            default => "Fixed rate: {$price->amount}"
        };
    }
}