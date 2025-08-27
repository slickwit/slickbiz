<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PricesSeeder extends Seeder
{
    public function run()
    {
        // Get pricing models
        $hourlyModel = DB::table('pricing_models')->where('name', 'Per Hour')->first();
        $dailyModel = DB::table('pricing_models')->where('name', 'Per Day')->first();
        $fixedModel = DB::table('pricing_models')->where('name', 'Fixed Rate')->first();
        $personModel = DB::table('pricing_models')->where('name', 'Per Person')->first();

        // Get services
        $recordingStudio = DB::table('services')->where('name', 'Recording Studio A')->first();
        $photoStudio = DB::table('services')->where('name', 'Photo Studio B')->first();
        $conferenceRoom = DB::table('services')->where('name', 'Conference Room C')->first();

        $prices = [
            // Recording Studio - Hourly
            [
                'id' => Str::uuid(),
                'service_id' => $recordingStudio->id,
                'pricing_model_id' => $hourlyModel->id,
                'amount' => 80.00,
                'min_amount' => 40.00, // minimum 30 min charge
                'max_amount' => null,
                'min_quantity' => 1,
                'max_quantity' => 24, // max 24 hours
                'valid_from' => null,
                'valid_until' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Recording Studio - Daily
            [
                'id' => Str::uuid(),
                'service_id' => $recordingStudio->id,
                'pricing_model_id' => $dailyModel->id,
                'amount' => 500.00,
                'min_amount' => null,
                'max_amount' => null,
                'min_quantity' => 1,
                'max_quantity' => 7, // max 7 days
                'valid_from' => null,
                'valid_until' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Photo Studio - Hourly
            [
                'id' => Str::uuid(),
                'service_id' => $photoStudio->id,
                'pricing_model_id' => $hourlyModel->id,
                'amount' => 60.00,
                'min_amount' => 30.00,
                'max_amount' => null,
                'min_quantity' => 1,
                'max_quantity' => 12,
                'valid_from' => null,
                'valid_until' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Photo Studio - Per Person
            [
                'id' => Str::uuid(),
                'service_id' => $photoStudio->id,
                'pricing_model_id' => $personModel->id,
                'amount' => 10.00, // $10 per additional person
                'min_amount' => null,
                'max_amount' => null,
                'min_quantity' => 1,
                'max_quantity' => 5, // max 5 additional people
                'valid_from' => null,
                'valid_until' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Conference Room - Fixed Rate
            [
                'id' => Str::uuid(),
                'service_id' => $conferenceRoom->id,
                'pricing_model_id' => $fixedModel->id,
                'amount' => 200.00,
                'min_amount' => null,
                'max_amount' => null,
                'min_quantity' => 1,
                'max_quantity' => 1,
                'valid_from' => null,
                'valid_until' => null,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('prices')->insert($prices);
    }
}