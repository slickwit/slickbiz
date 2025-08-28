<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaxesSeeder extends Seeder
{
    public function run()
    {
        // Get a user to associate with
        $user = DB::table('users')->first();

        $taxes = [
            [
                'user_id' => $user->id,
                'name' => 'Sales Tax',
                'description' => 'Standard sales tax',
                'rate' => 8.25,
                'type' => 'percentage',
                'is_compound' => false,
                'is_default' => true,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'name' => 'City Tax',
                'description' => 'Local city tax',
                'rate' => 2.00,
                'type' => 'percentage',
                'is_compound' => false,
                'is_default' => false,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'name' => 'Service Fee',
                'description' => 'Fixed service fee',
                'rate' => 5.00,
                'type' => 'fixed',
                'is_compound' => false,
                'is_default' => false,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('taxes')->insert($taxes);
    }
}