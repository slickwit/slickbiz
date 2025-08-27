<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PricingModelsSeeder extends Seeder
{
    public function run()
    {
        $models = [
            [
                'id' => Str::uuid(),
                'name' => 'Per Hour',
                'calculation_type' => 'time_based',
                'unit' => 'hour',
                'is_default' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Per Day',
                'calculation_type' => 'time_based',
                'unit' => 'day',
                'is_default' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Per Person',
                'calculation_type' => 'person_based',
                'unit' => 'person',
                'is_default' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
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