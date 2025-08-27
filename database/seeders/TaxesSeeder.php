<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TaxesSeeder extends Seeder
{
    public function run()
    {
        $taxes = [
            [
                'id' => Str::uuid(),
                'name' => 'Sales Tax',
                'rate' => 8.25, // 8.25%
                'type' => 'percentage',
                'is_compound' => false,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'City Tax',
                'rate' => 2.00, // 2%
                'type' => 'percentage',
                'is_compound' => false,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Service Fee',
                'rate' => 5.00, // Fixed $5
                'type' => 'fixed',
                'is_compound' => false,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('taxes')->insert($taxes);
    }
}