<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PricesSeeder extends Seeder
{
    public \Faker\Generator $faker;
    
    public function __construct() {
        $this->faker = \Faker\Factory::create();
    }
    
    public function run()
    {
        // Get a user to associate with
        $user = DB::table('users')->first();
        $services = DB::table('services')->get();

        $prices = [];

        foreach ($services as $service) {
            $category = DB::table('categories')->where('id', $service->category_id)->first();
            $priceConfig = $this->getPriceConfig($category->name ?? 'default');
            
            $prices[] = [
                'user_id' => $user->id,
                'service_id' => $service->id,
                'name' => 'Standard Rate',
                'amount' => $priceConfig['amount'],
                'type' => $priceConfig['type'],
                'is_default' => true,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Add a discounted price for some services
            if ($this->faker->boolean(30)) {
                $prices[] = [
                    'user_id' => $user->id,
                    'service_id' => $service->id,
                    'name' => 'Off-Peak Discount',
                    'amount' => $priceConfig['amount'] * 0.8, // 20% discount
                    'type' => $priceConfig['type'],
                    'is_default' => false,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('prices')->insert($prices);
    }

    protected function getPriceConfig(string $categoryName): array
    {
        return match($categoryName) {
            'Studios' => ['type' => 'hourly', 'amount' => 80.00],
            'Meeting Rooms' => ['type' => 'hourly', 'amount' => 60.00],
            'Equipment' => ['type' => 'hourly', 'amount' => 25.00],
            'Appointments' => ['type' => 'fixed', 'amount' => 100.00],
            default => ['type' => 'fixed', 'amount' => 75.00],
        };
    }
}