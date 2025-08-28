<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        
        // Get employee users and first business
        $employees = DB::table('users')
            ->where('role', 'employees')
            ->get();
        
        $positions = ['Manager', 'Receptionist', 'Service Provider', 'Support Staff', 'Coordinator'];
        
        foreach ($employees as $index => $employee) {
            DB::table('employees')->insert([
                'user_id' => $employee->id,
                'identification' => 'EMP' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'position' => $positions[$index % count($positions)],
                'hourly_rate' => $faker->numberBetween(15, 60),
                'hire_date' => $faker->dateTimeBetween('-2 years', '-1 month'),
                'permissions' => json_encode(['manage_bookings', 'view_customers']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}