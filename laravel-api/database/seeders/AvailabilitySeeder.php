<?php

namespace Database\Seeders;

use App\Models\Availability;
use Illuminate\Database\Seeder;

class AvailabilitySeeder extends Seeder
{
    public function run(): void
    {
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        foreach ($days as $day) {
            Availability::create([
                'day' => $day,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
            ]);
        }
    }
}
