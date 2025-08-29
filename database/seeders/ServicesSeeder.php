<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create();
        $user = DB::table('users')->first();
        $studioCategory = DB::table('categories')->where('slug', 'studios')->first();
        $roomCategory = DB::table('categories')->where('slug', 'meeting-rooms')->first();
        $appointmentCategory = DB::table('categories')->where('slug', 'appointments')->first();

        $services = [
            // Recording Studio (will get hourly pricing)
            [
                'user_id' => $user->id,
                'category_id' => $studioCategory->id ?? null,
                'name' => 'Recording Studio A',
                'slug' => 'recording-studio-a',
                'description' => 'Professional recording studio with state-of-the-art equipment',
                'min_capacity' => 1,
                'max_capacity' => 5,
                'features' => json_encode(['sound_proofing', 'mixing_board', 'instruments', 'vocal_booth']),
                'is_active' => true,
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ],
            // Photo Studio (will get hourly pricing)
            [
                'user_id' => $user->id,
                'category_id' => $studioCategory->id ?? null,
                'name' => 'Photo Studio B',
                'slug' => 'photo-studio-b',
                'description' => 'Spacious photo studio with natural lighting options',
                'min_capacity' => 1,
                'max_capacity' => 8,
                'features' => json_encode(['natural_light', 'backdrops', 'lighting_equipment', 'changing_room']),
                'is_active' => true,
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ],
            // Conference Room (will get hourly pricing)
            [
                'user_id' => $user->id,
                'category_id' => $roomCategory->id ?? null,
                'name' => 'Conference Room C',
                'slug' => 'conference-room-c',
                'description' => 'Professional meeting space for business presentations',
                'min_capacity' => 1,
                'max_capacity' => 12,
                'features' => json_encode(['projector', 'whiteboard', 'wifi', 'video_conferencing']),
                'is_active' => true,
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ],
            // Consultation Service (will get fixed pricing - no conditional pricing)
            [
                'user_id' => $user->id,
                'category_id' => $appointmentCategory->id ?? null,
                'name' => 'Professional Consultation',
                'slug' => 'professional-consultation',
                'description' => 'One-on-one professional consulting session',
                'min_capacity' => 1,
                'max_capacity' => 1,
                'features' => json_encode(['private_session', 'expert_advice', 'custom_solutions']),
                'is_active' => true,
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ],
            // Equipment Rental (will get hourly pricing)
            [
                'user_id' => $user->id,
                'category_id' => DB::table('categories')->where('slug', 'equipment')->value('id'),
                'name' => 'Camera Equipment Package',
                'slug' => 'camera-equipment-package',
                'description' => 'Professional camera and lens rental package',
                'min_capacity' => 1,
                'max_capacity' => 1,
                'features' => json_encode(['camera_body', 'multiple_lenses', 'tripod', 'lighting']),
                'is_active' => true,
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ],
        ];

        DB::table('services')->insert($services);
    }
}