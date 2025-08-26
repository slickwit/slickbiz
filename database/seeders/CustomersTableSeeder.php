<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        
        // Get customer users
        $customers = DB::table('users')
            ->where('role', 'customer')
            ->get();
        
        foreach ($customers as $index => $customer) {
            DB::table('customers')->insert([
                'id' => Str::uuid(),
                'user_id' => $customer->id,
                'customer_id' => 'CUST' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'loyalty_points' => $faker->numberBetween(0, 1000),
                'preferences' => json_encode([
                    'notifications' => $faker->boolean(70),
                    'newsletter' => $faker->boolean(50),
                    'sms_alerts' => $faker->boolean(30)
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
