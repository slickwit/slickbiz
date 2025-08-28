<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        // Get a user to associate with
        $user = DB::table('users')->first();
        $studioCategory = DB::table('categories')->where('slug', 'studios')->first();
        $roomCategory = DB::table('categories')->where('slug', 'meeting-rooms')->first();

        $services = [
            [
                'user_id' => $user->id,
                'category_id' => $studioCategory->id ?? null,
                'name' => 'Recording Studio A',
                'slug' => 'recording-studio-a',
                'description' => 'Professional recording studio with state-of-the-art equipment',
                'max_capacity' => 5,
                'features' => json_encode(['sound_proofing', 'mixing_board', 'instruments', 'vocal_booth']),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $studioCategory->id ?? null,
                'name' => 'Photo Studio B',
                'slug' => 'photo-studio-b',
                'description' => 'Spacious photo studio with natural lighting options',
                'max_capacity' => 8,
                'features' => json_encode(['natural_light', 'backdrops', 'lighting_equipment', 'changing_room']),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user->id,
                'category_id' => $roomCategory->id ?? null,
                'name' => 'Conference Room C',
                'slug' => 'conference-room-c',
                'description' => 'Professional meeting space for business presentations',
                'max_capacity' => 12,
                'features' => json_encode(['projector', 'whiteboard', 'wifi', 'video_conferencing']),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('services')->insert($services);
    }
}