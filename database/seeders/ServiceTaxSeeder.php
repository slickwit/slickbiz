<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceTaxSeeder extends Seeder
{
    public function run()
    {
        // Get taxes
        $salesTax = DB::table('taxes')->where('name', 'Sales Tax')->first();
        $cityTax = DB::table('taxes')->where('name', 'City Tax')->first();
        $serviceFee = DB::table('taxes')->where('name', 'Service Fee')->first();

        // Get all services
        $services = DB::table('services')->get();

        $serviceTaxes = [];

        foreach ($services as $service) {
            // All services get sales tax
            $serviceTaxes[] = [
                'service_id' => $service->id,
                'tax_id' => $salesTax->id,
            ];

            // Studios also get city tax
            if ($service->type === 'studio') {
                $serviceTaxes[] = [
                    'service_id' => $service->id,
                    'tax_id' => $cityTax->id,
                ];
            }

            // All services get service fee
            $serviceTaxes[] = [
                'service_id' => $service->id,
                'tax_id' => $serviceFee->id,
            ];
        }

        DB::table('service_tax')->insert($serviceTaxes);
    }
}