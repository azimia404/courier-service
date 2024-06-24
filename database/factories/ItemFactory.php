<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Courier;

class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $picked = $this->faker->dateTime($max = 'now');
        $delivered = random_int(0, 10) > 5 ? date_modify($picked, "+ ".random_int(1, 10)." hours") : null;
        $status = $delivered ? "delivered" : (random_int(0,9) > 5 ? "failed" : "in_progress");
        return [
            'track_code' => "OTNGE".random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9).random_int(0,9)."YQ",
            'status' => $status,
            'courier_id' => Courier::inRandomOrder()->first('id')->id,
            'picked_up' => $picked,
            'dropped_off' => $delivered,
        ];
    }
}
