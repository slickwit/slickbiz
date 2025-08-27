<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User Seeder
        $user_seeder = [
            UsersTableSeeder::class,
            UserProfilesTableSeeder::class,
            EmployeesTableSeeder::class,
            CustomersTableSeeder::class,
        ];

        // Services-Based Reservation System Seeder
        $services = [
            PricingModelsSeeder::class,
            TaxesSeeder::class,
            ServicesSeeder::class,
            PricesSeeder::class,
            ServiceTaxSeeder::class,
            ReservationsSeeder::class
        ];
        $this->call([
            ...$user_seeder,
            ...$services,
        ]);
    }
}
