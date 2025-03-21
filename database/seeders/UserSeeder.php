<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ownCompany = Company::where("name", "slickwit")->first();
        User::factory()->create([
            'company_id' => $ownCompany->id,
            'username' => 'slickwit',
            'first_name' => 'Kenneth Ryan',
            'middle_name' => 'Dumayas',
            'last_name' => 'Dy',
            'email' => 'dykennethryan@gmail.com',
            'password' => Hash::make('123123'),
            'country' => $ownCompany->country,
            'city' => $ownCompany->city,
            'state' => $ownCompany->state,
            'zip' => $ownCompany->zip,
            'phone' => $ownCompany->phone,
            'status' => 'active'
        ]);
        User::factory(499)->create();
    }
}
