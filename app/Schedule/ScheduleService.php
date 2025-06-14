<?php

namespace App\Schedule;

use Illuminate\Console\Scheduling\Schedule;

class ScheduleService
{
    public function schedule(Schedule $schedule): void
    {
        // Memanggil command artisan 'posts:publish' setiap menit
        $schedule->command('posts:publish')->everyMinute();
    }
}
