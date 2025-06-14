<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('posts:publish', function () {
    \Illuminate\Support\Facades\DB::table('posts')
        ->where('is_draft', 0)
        ->where('is_published', 0)
        ->whereNotNull('scheduled_at')
        ->where('scheduled_at', '<=', now())
        ->update([
            'is_published' => 1,
            'published_at' => \Illuminate\Support\Facades\DB::raw('scheduled_at'),
        ]);

    $this->info('Scheduled posts have been published.');
})->purpose('Publishes scheduled posts');

