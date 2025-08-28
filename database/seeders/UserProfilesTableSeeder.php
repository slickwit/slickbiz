<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserProfilesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        
        // Get all users
        $users = DB::table('users')->get();
        
        foreach ($users as $user) {
            DB::table('user_profiles')->insert([
                'user_id' => $user->id,
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'phone' => $faker->phoneNumber,
                'avatar_url' => $faker->imageUrl(100, 100, 'people'),
                'timezone' => $faker->timezone,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}