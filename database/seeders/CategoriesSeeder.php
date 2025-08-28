<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    public function run()
    {
        // Get a user to associate with
        $user = DB::table('users')->first();

        $categories = [
            [
                'user_id' => $user->id,
                'name' => 'Studios',
                'slug' => 'studios',
                'description' => 'Professional recording and photo studios',
                'sort_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'name' => 'Meeting Rooms',
                'slug' => 'meeting-rooms',
                'description' => 'Conference and meeting spaces',
                'sort_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'name' => 'Equipment',
                'slug' => 'equipment',
                'description' => 'Rental equipment and gear',
                'sort_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'name' => 'Appointments',
                'slug' => 'appointments',
                'description' => 'Professional services and consultations',
                'sort_order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('categories')->insert($categories);
    }
}