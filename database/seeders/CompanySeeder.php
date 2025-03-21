<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::factory()->create([
            'name' => 'slickwit',
            'email' => 'slickwit.dev',
            'country' => 'Philippines',
            'city' => 'Davao',
            'website' => 'kennethdy.dev',
            'state' => 'Davao Del Sur',
            'zip' => 8000,
            'phone' => '09632898001',
        ]);
        Company::factory(3)->create();
    }
}
