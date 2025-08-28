<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Create super admin
        DB::table('users')->insert([
            'email' => 'admin@email.com',
            'password' => Hash::make('123123'),
            'role' => 'super_admin',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            'email' => 'admin@reservation.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create regular admin
        DB::table('users')->insert([
            'email' => 'regular.admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create sample employees
        for ($i = 1; $i <= 7; $i++) {
            DB::table('users')->insert([
                'email' => "employee{$i}@example.com",
                'password' => Hash::make('password'),
                'role' => 'employees',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Create sample customers
        for ($i = 1; $i <= 67; $i++) {
            DB::table('users')->insert([
                'email' => "customer{$i}@example.com",
                'password' => Hash::make('password'),
                'role' => 'customer',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}