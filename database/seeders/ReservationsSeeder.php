<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ReservationsSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        // Get sample data
        $customer = DB::table('users')->where('role', 'customer')->first();
        $employee = DB::table('users')->where('role', 'employees')->first();
        $services = DB::table('services')->get();
        $extrasItems = DB::table('extras_items')->get();

        if (!$customer || !$employee || $services->isEmpty()) {
            $this->command->info('Skipping reservations seeder - missing required data');
            return;
        }

        $reservations = [];
        $reservationExtras = [];
        $statuses = ['pending', 'confirmed', 'checked_in', 'completed', 'cancelled'];
        $sources = ['website', 'phone', 'in_person'];

        // Create reservations for the next 30 days
        for ($i = 0; $i < 20; $i++) {
            $service = $services->random();
            $startDate = Carbon::today()->addDays($faker->numberBetween(1, 30));
            
            // Adjust time based on service type
            if (in_array($service->type, ['studio', 'room'])) {
                $startTime = Carbon::createFromTime($faker->numberBetween(9, 16), 0, 0); // 9AM-4PM
                $durationHours = $faker->numberBetween(1, 8);
            } else {
                $startTime = Carbon::createFromTime($faker->numberBetween(8, 20), 0, 0); // 8AM-8PM
                $durationHours = $faker->numberBetween(1, 4);
            }

            $startDateTime = $startDate->copy()->setTime($startTime->hour, 0);
            $endDateTime = $startDateTime->copy()->addHours($durationHours);
            
            $guestsCount = $faker->numberBetween(1, $service->max_capacity);
            $unitsReserved = $faker->numberBetween(1, 2);
            
            $status = $statuses[array_rand($statuses)];
            $source = $sources[array_rand($sources)];

            $reservationId = Str::uuid();
            $reservationNumber = 'RES-' . date('Ymd') . '-' . str_pad($i + 1, 4, '0', STR_PAD_LEFT);

            // Calculate price (simplified for seeder)
            $basePrice = $this->calculateSamplePrice($service, $durationHours, $guestsCount, $unitsReserved);
            $taxAmount = $basePrice * 0.1; // Simple 10% tax
            $totalPrice = $basePrice + $taxAmount;

            $reservations[] = [
                'id' => $reservationId,
                'reservation_number' => $reservationNumber,
                'customer_id' => $customer->id,
                'service_id' => $service->id,
                'assigned_employee_id' => $employee->id,
                'start_datetime' => $startDateTime,
                'end_datetime' => $endDateTime,
                'timezone' => 'UTC',
                'guests_count' => $guestsCount,
                'units_reserved' => $unitsReserved,
                'status' => $status,
                'cancellation_reason' => $status === 'cancelled' ? 'Sample cancellation reason' : null,
                'source' => $source,
                'special_requests' => $faker->numberBetween(0, 1) ? 'Sample special request' : null,
                'base_price' => $basePrice,
                'tax_amount' => $taxAmount,
                'total_price' => $totalPrice,
                'price_breakdown' => json_encode([
                    'base' => $basePrice,
                    'tax_rate' => '10%',
                    'calculation' => "{$durationHours}h × {$guestsCount} guests × {$unitsReserved} units"
                ]),
                'confirmed_at' => in_array($status, ['confirmed', 'checked_in', 'completed']) ? now() : null,
                'cancelled_at' => $status === 'cancelled' ? now() : null,
                'checked_in_at' => in_array($status, ['checked_in', 'completed']) ? now() : null,
                'completed_at' => $status === 'completed' ? now() : null,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Add extras to some reservations
            if ($extrasItems->isNotEmpty() && $faker->numberBetween(0, 1)) {
                $extrasCount = $faker->numberBetween(1, min(3, $extrasItems->count()));
                $selectedExtras = $extrasItems->random($extrasCount);
                
                foreach ($selectedExtras as $extra) {
                    $quantity = $faker->numberBetween(1, $extra->max_quantity ?: 2);
                    $unitPrice = $extra->price;
                    $totalExtraPrice = $unitPrice * $quantity;
                    
                    $reservationExtras[] = [
                        'id' => Str::uuid(),
                        'reservation_id' => $reservationId,
                        'extras_item_id' => $extra->id,
                        'quantity' => $quantity,
                        'unit_price' => $unitPrice,
                        'total_price' => $totalExtraPrice,
                        'price_breakdown' => json_encode([
                            'item' => $extra->name,
                            'quantity' => $quantity,
                            'unit_price' => $unitPrice
                        ]),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // Insert reservations
        DB::table('reservations')->insert($reservations);

        // Insert reservation extras if any
        if (!empty($reservationExtras)) {
            DB::table('reservation_extras')->insert($reservationExtras);
        }

        $this->command->info('Created ' . count($reservations) . ' sample reservations');
        if (!empty($reservationExtras)) {
            $this->command->info('Created ' . count($reservationExtras) . ' reservation extras');
        }
    }

    /**
     * Calculate sample price for seeder purposes
     */
    protected function calculateSamplePrice($service, $durationHours, $guestsCount, $unitsReserved): float
    {
        // Simple calculation for seeder - real app would use PricingService
        $baseRate = match($service->type) {
            'studio' => 50.00,
            'room' => 75.00,
            'equipment' => 25.00,
            default => 40.00
        };

        return ($baseRate * $durationHours * $guestsCount * $unitsReserved);
    }
}