<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceTaxSeeder extends Seeder
{
    public function run()
    {
        $salesTax = DB::table('taxes')->where('name', 'Sales Tax')->first();
        $cityTax = DB::table('taxes')->where('name', 'City Tax')->first();
        $serviceFee = DB::table('taxes')->where('name', 'Service Fee')->first();

        $services = DB::table('services')->get();
        $serviceTaxes = [];

        foreach ($services as $service) {
            // All services get sales tax as default
            $serviceTaxes[] = [
                'service_id' => $service->id,
                'tax_id' => $salesTax->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Studios also get city tax (but not default)
            if (str_contains(strtolower($service->name), 'studio')) {
                $serviceTaxes[] = [
                    'service_id' => $service->id,
                    'tax_id' => $cityTax->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            // All services get service fee (not default)
            $serviceTaxes[] = [
                'service_id' => $service->id,
                'tax_id' => $serviceFee->id,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('service_taxes')->insert($serviceTaxes);
    }
}