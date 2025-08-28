<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'name' => 'Recording Studio A',
                'slug' => Str::slug('Recording Studio A'),
                'type' => 'studio',
                'description' => 'Professional recording studio with state-of-the-art equipment',
                'max_capacity' => 5,
                'features' => json_encode([
                    'sound_proofing', 'mixing_board', 'instruments', 'vocal_booth'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Photo Studio B',
                'slug' => Str::slug('Photo Studio B'),
                'type' => 'studio',
                'description' => 'Spacious photo studio with natural lighting options',
                'max_capacity' => 8,
                'features' => json_encode([
                    'natural_light', 'backdrops', 'lighting_equipment', 'changing_room'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Conference Room C',
                'slug' => Str::slug('Conference Room C'),
                'type' => 'room',
                'description' => 'Professional meeting space for business presentations',
                'max_capacity' => 12,
                'features' => json_encode([
                    'projector', 'whiteboard', 'wifi', 'video_conferencing'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('services')->insert($services);
    }
}