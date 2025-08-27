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
                'id' => Str::uuid(),
                'name' => 'Recording Studio A',
                'type' => 'studio',
                'description' => 'Professional recording studio with state-of-the-art equipment',
                'max_capacity' => 5,
                'images' => json_encode([
                    'https://example.com/images/studio1-1.jpg',
                    'https://example.com/images/studio1-2.jpg'
                ]),
                'features' => json_encode([
                    'sound_proofing', 'mixing_board', 'instruments', 'vocal_booth'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Photo Studio B',
                'type' => 'studio',
                'description' => 'Spacious photo studio with natural lighting options',
                'max_capacity' => 8,
                'images' => json_encode([
                    'https://example.com/images/studio2-1.jpg',
                    'https://example.com/images/studio2-2.jpg'
                ]),
                'features' => json_encode([
                    'natural_light', 'backdrops', 'lighting_equipment', 'changing_room'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Conference Room C',
                'type' => 'room',
                'description' => 'Professional meeting space for business presentations',
                'max_capacity' => 12,
                'images' => json_encode([
                    'https://example.com/images/room1-1.jpg'
                ]),
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