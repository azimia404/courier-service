<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CourierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => "GED".random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9),
            'delivered' => random_int(1,10),
            'in_progress' => random_int(1,10),
            'failed' => random_int(1,10),
        ];
    }
}
