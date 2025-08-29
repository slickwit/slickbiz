<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PricesSeeder extends Seeder
{
    public function run()
    {
        $user = DB::table('users')->first();
        $services = DB::table('services')->get();

        $prices = [];

        foreach ($services as $service) {
            $category = DB::table('categories')->where('id', $service->category_id)->first();
            $priceConfig = $this->getPriceConfig($category->name ?? 'default');
            
            $prices[] = [
                'user_id' => $user->id,
                'service_id' => $service->id,
                'amount' => $priceConfig['amount'],
                'type' => $priceConfig['type'],
                'duration' => in_array($priceConfig['type'], ['hourly', 'daily']) ? 1 : null,
                'buffer_time_before' => in_array($priceConfig['type'], ['hourly', 'daily']) ? 15 : null,
                'buffer_time_after' => in_array($priceConfig['type'], ['hourly', 'daily']) ? 30 : null,
            ];
        }

        DB::table('prices')->insert($prices);

        // Add conditional pricing (avoiding overlap with main price)
        $this->addConditionalPricing($user->id);
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

    protected function addConditionalPricing($userId)
    {
        $conditionalPricings = [];
        
        // Get all hourly services (only these can have conditional pricing)
        $hourlyServices = DB::table('prices')
            ->where('type', 'hourly')
            ->get();

        foreach ($hourlyServices as $price) {
            // Add conditional pricing for durations 2, 4, 8 (avoiding duration 1 which is main price)
            $conditionalPricings[] = [
                'user_id' => $userId,
                'service_id' => $price->service_id,
                'type' => 'hourly',
                'duration' => 2,
                'amount' => $price->amount * 2 * 0.9, // 2 hours with 10% discount
            ];
            $conditionalPricings[] = [
                'user_id' => $userId,
                'service_id' => $price->service_id,
                'type' => 'hourly',
                'duration' => 4,
                'amount' => $price->amount * 4 * 0.85, // 4 hours with 15% discount
            ];
            $conditionalPricings[] = [
                'user_id' => $userId,
                'service_id' => $price->service_id,
                'type' => 'hourly',
                'duration' => 8,
                'amount' => $price->amount * 8 * 0.8, // 8 hours with 20% discount
            ];
        }

        if (!empty($conditionalPricings)) {
            DB::table('conditional_pricings')->insert($conditionalPricings);
        }
    }
}