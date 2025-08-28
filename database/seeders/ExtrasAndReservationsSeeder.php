<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ExtrasAndReservationsSeeder extends Seeder
{
    protected $faker;

    public function __construct()
    {
        $this->faker = Faker::create();
    }

    public function run()
    {
        // Get the first user
        $user = DB::table('users')->first();
        if (!$user) {
            $this->command->error('No users found. Please run Users seeder first.');
            return;
        }

        // Create Extras Groups
        $extrasGroups = [
            [
                'user_id' => $user->id,
                'name' => 'Equipment Rental',
                'slug' => 'equipment-rental',
                'description' => 'Additional equipment available for rent',
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'name' => 'Food & Beverage',
                'slug' => 'food-beverage',
                'description' => 'Catering and refreshment options',
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'name' => 'Additional Services',
                'slug' => 'additional-services',
                'description' => 'Extra services to enhance your experience',
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'name' => 'Studio Add-ons',
                'slug' => 'studio-addons',
                'description' => 'Specialized equipment for studio sessions',
                'is_active' => true,
                'sort_order' => 4,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
        ];

        $groupIds = [];
        foreach ($extrasGroups as $group) {
            $groupId = DB::table('extras_groups')->insertGetId($group);
            $groupIds[] = $groupId;
        }

        // Create Extras Items
        $extrasItems = [
            // Equipment Rental
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[0],
                'name' => 'Professional Microphone',
                'description' => 'High-quality condenser microphone',
                'price' => 15.00,
                'price_type' => 'fixed',
                'max_quantity' => 5,
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[0],
                'name' => 'Camera Stand',
                'description' => 'Sturdy tripod for cameras',
                'price' => 10.00,
                'price_type' => 'fixed',
                'max_quantity' => 8,
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[0],
                'name' => 'Lighting Kit',
                'description' => 'Professional lighting setup',
                'price' => 25.00,
                'price_type' => 'fixed',
                'max_quantity' => 3,
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],

            // Food & Beverage
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[1],
                'name' => 'Coffee & Pastries',
                'description' => 'Fresh coffee and assorted pastries',
                'price' => 8.50,
                'price_type' => 'per_person',
                'max_quantity' => 20,
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[1],
                'name' => 'Lunch Catering',
                'description' => 'Full lunch service for participants',
                'price' => 25.00,
                'price_type' => 'per_person',
                'max_quantity' => 15,
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[1],
                'name' => 'Bottled Water',
                'description' => 'Refreshment water bottles',
                'price' => 2.00,
                'price_type' => 'fixed',
                'max_quantity' => 50,
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],

            // Additional Services
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[2],
                'name' => 'Technical Support',
                'description' => 'Dedicated technician assistance',
                'price' => 40.00,
                'price_type' => 'hourly',
                'max_quantity' => 2,
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[2],
                'name' => 'Cleaning Service',
                'description' => 'Post-session cleanup',
                'price' => 35.00,
                'price_type' => 'fixed',
                'max_quantity' => 1,
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],

            // Studio Add-ons
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[3],
                'name' => 'Green Screen',
                'description' => 'Professional green screen setup',
                'price' => 20.00,
                'price_type' => 'fixed',
                'max_quantity' => 1,
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
            [
                'user_id' => $user->id,
                'extras_group_id' => $groupIds[3],
                'name' => 'Additional Monitor',
                'description' => 'Extra display screen',
                'price' => 12.00,
                'price_type' => 'fixed',
                'max_quantity' => 3,
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ],
        ];

        $itemIds = [];
        foreach ($extrasItems as $item) {
            $itemId = DB::table('extras_items')->insertGetId($item);
            $itemIds[] = $itemId;
        }

        // Associate extras groups with services
        $services = DB::table('services')->get();
        $serviceExtras = [];

        foreach ($services as $service) {
            // All services get Equipment Rental and Additional Services
            $serviceExtras[] = [
                'service_id' => $service->id,
                'extras_group_id' => $groupIds[0], // Equipment
                'is_required' => false,
                'max_selectable' => 3,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ];

            $serviceExtras[] = [
                'service_id' => $service->id,
                'extras_group_id' => $groupIds[2], // Additional Services
                'is_required' => false,
                'max_selectable' => 2,
                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ];

            // Studios also get Studio Add-ons
            if (str_contains(strtolower($service->name), 'studio')) {
                $serviceExtras[] = [
                    'service_id' => $service->id,
                    'extras_group_id' => $groupIds[3], // Studio Add-ons
                    'is_required' => false,
                    'max_selectable' => 2,
                    'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                    'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                ];
            }

            // Meeting rooms get Food & Beverage
            if (str_contains(strtolower($service->name), 'conference') || 
                str_contains(strtolower($service->name), 'meeting')) {
                $serviceExtras[] = [
                    'service_id' => $service->id,
                    'extras_group_id' => $groupIds[1], // Food & Beverage
                    'is_required' => false,
                    'max_selectable' => 5,
                    'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                    'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                ];
            }
        }

        DB::table('service_extras')->insert($serviceExtras);

        // Add taxes to some extras items
        $salesTax = DB::table('taxes')->where('name', 'Sales Tax')->first();
        $extrasItemTaxes = [];

        foreach ($itemIds as $itemId) {
            // 70% chance to add sales tax to the item
            if ($this->faker->boolean(70)) {
                $extrasItemTaxes[] = [
                    'extras_item_id' => $itemId,
                    'tax_id' => $salesTax->id,
                    'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                    'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                ];
            }
        }

        DB::table('extras_item_taxes')->insert($extrasItemTaxes);

        $this->command->info('Created extras groups and items');

        // Now add extras to some reservations (40% chance per reservation)
        $reservations = DB::table('reservations')->get();
        $reservationExtras = [];
        $extrasAddedCount = 0;

        foreach ($reservations as $reservation) {
            // 40% chance to add extras to this reservation
            if ($this->faker->boolean(40)) {
                $serviceExtrasGroups = DB::table('service_extras')
                    ->where('service_id', $reservation->service_id)
                    ->pluck('extras_group_id');

                if ($serviceExtrasGroups->isNotEmpty()) {
                    $availableItems = DB::table('extras_items')
                        ->whereIn('extras_group_id', $serviceExtrasGroups)
                        ->where('is_active', true)
                        ->get();

                    if ($availableItems->isNotEmpty()) {
                        // Add 1-3 random extras to this reservation
                        $itemsToAdd = $availableItems->random(
                            min($this->faker->numberBetween(1, 3), $availableItems->count())
                        );

                        foreach ($itemsToAdd as $item) {
                            $quantity = $this->faker->numberBetween(1, $item->max_quantity ?: 2);
                            
                            // Get item taxes
                            $itemTaxes = DB::table('extras_item_taxes')
                                ->join('taxes', 'extras_item_taxes.tax_id', '=', 'taxes.id')
                                ->where('extras_item_taxes.extras_item_id', $item->id)
                                ->where('taxes.is_active', true)
                                ->get();

                            // Calculate prices
                            $unitPrice = $item->price;
                            $baseAmount = $unitPrice * $quantity;
                            $taxAmount = $this->calculateTaxAmount($itemTaxes, $baseAmount);

                            // Build applied taxes JSON
                            $appliedTaxes = [];
                            foreach ($itemTaxes as $tax) {
                                $appliedTaxes[] = [
                                    'tax_id' => $tax->id,
                                    'name' => $tax->name,
                                    'rate' => $tax->rate,
                                    'type' => $tax->type,
                                    'is_compound' => $tax->is_compound,
                                    'amount' => $tax->type === 'percentage' 
                                        ? $baseAmount * ($tax->rate / 100)
                                        : $tax->rate
                                ];
                            }

                            $reservationExtras[] = [
                                'reservation_id' => $reservation->id,
                                'extras_item_id' => $item->id,
                                'applied_taxes' => json_encode(['taxes' => $appliedTaxes]),
                                'quantity' => $quantity,
                                'unit_price' => $unitPrice,
                                'total_price' => $baseAmount + $taxAmount,
                                'price_breakdown' => json_encode([
                                    'base' => $baseAmount,
                                    'tax' => $taxAmount,
                                    'calculation' => "{$unitPrice} × {$quantity} " . ($quantity > 1 ? 'units' : 'unit')
                                ]),
                                'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                                'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
                            ];

                            $extrasAddedCount++;
                        }
                    }
                }
            }
        }

        // Insert reservation extras
        if (!empty($reservationExtras)) {
            DB::table('reservation_extras')->insert($reservationExtras);
            
            // Update reservation totals
            foreach ($reservations as $reservation) {
                $reservationExtrasTotal = DB::table('reservation_extras')
                    ->where('reservation_id', $reservation->id)
                    ->selectRaw('SUM(total_price) as extras_total')
                    ->first();

                if ($reservationExtrasTotal && $reservationExtrasTotal->extras_total > 0) {
                    $extrasBreakdown = DB::table('reservation_extras')
                        ->where('reservation_id', $reservation->id)
                        ->get()
                        ->map(function ($extra) {
                            return [
                                'item' => DB::table('extras_items')->where('id', $extra->extras_item_id)->value('name'),
                                'quantity' => $extra->quantity,
                                'unit_price' => $extra->unit_price,
                                'total' => $extra->total_price
                            ];
                        });

                    $currentBreakdown = json_decode($reservation->price_breakdown, true);
                    $currentBreakdown['extras'] = $extrasBreakdown;

                    DB::table('reservations')
                        ->where('id', $reservation->id)
                        ->update([
                            'base_price' => $reservation->base_price + $reservationExtrasTotal->extras_total,
                            'total_price' => $reservation->total_price + $reservationExtrasTotal->extras_total,
                            'price_breakdown' => json_encode($currentBreakdown)
                        ]);
                }
            }
        }

        $this->command->info("Added {$extrasAddedCount} extras to reservations");
        $this->command->info('Extras and reservations seeding completed!');
    }

    protected function calculateTaxAmount($taxes, $baseAmount): float
    {
        $totalTax = 0;
        foreach ($taxes as $tax) {
            $totalTax += $tax->type === 'percentage' 
                ? $baseAmount * ($tax->rate / 100)
                : $tax->rate;
        }
        return round($totalTax, 2);
    }
}