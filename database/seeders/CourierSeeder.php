<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CourierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 100; $i++) {
            DB::table('couriers')->insert([
                'name' => "GED".random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9),
                'delivered' => random_int(1,10),
                'in_progress' => random_int(1,10),
                'failed' => random_int(1,10),
            ]);
        }
    }
}
