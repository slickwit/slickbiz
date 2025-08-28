<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExtrasSeeder extends Seeder
{
    public function run()
    {
        // Create extras groups
        $amenitiesGroup = DB::table('extras_groups')->insertGetId([
            'name' => 'Amenities',
            'slug' => 'amenities',
            'description' => 'Additional amenities for your stay',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $servicesGroup = DB::table('extras_groups')->insertGetId([
            'name' => 'Additional Services',
            'slug' => 'additional-services',
            'description' => 'Extra services to enhance your experience',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create extras items
        $extrasItems = [
            [
                'extras_group_id' => $amenitiesGroup,
                'name' => 'Breakfast Package',
                'description' => 'Daily breakfast for all guests',
                'price' => 25.00,
                'price_type' => 'per_person',
                'max_quantity' => 10,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'extras_group_id' => $amenitiesGroup,
                'name' => 'Airport Transfer',
                'description' => 'Round-trip airport transportation',
                'price' => 75.00,
                'price_type' => 'fixed',
                'max_quantity' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'extras_group_id' => $servicesGroup,
                'name' => 'Equipment Rental',
                'description' => 'Professional equipment rental',
                'price' => 50.00,
                'price_type' => 'per_hour',
                'max_quantity' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('extras_items')->insert($extrasItems);
    }
}