<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PricingModelsSeeder extends Seeder
{
    public function run()
    {
        $models = [
            [
                'name' => 'Per Hour',
                'calculation_type' => 'time_based',
                'unit' => 'hour',
                'is_default' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Per Day',
                'calculation_type' => 'time_based',
                'unit' => 'day',
                'is_default' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Per Person',
                'calculation_type' => 'person_based',
                'unit' => 'person',
                'is_default' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fixed Rate',
                'calculation_type' => 'fixed',
                'unit' => 'service',
                'is_default' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('pricing_models')->insert($models);
    }
}