<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\DrafController;



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('datas', [ContentController::class, 'index'])->name('datas.index');
    Route::get('/datas/create', [ContentController::class, 'create'])->name('datas.create');
    Route::post('/datas', [ContentController::class, 'store'])->name('datas.store');
    Route::get('/datas/{id}/edit', [ContentController::class, 'edit'])->name('datas.edit');
    Route::put('/datas/{id}', [ContentController::class, 'update'])->name('datas.update');
    Route::delete('/datas/{id}', [ContentController::class, 'destroy'])->name('datas.destroy');


    Route::get('/drafs', [DrafController::class, 'index'])->name('drafs.index');
    Route::put('/drafs/publish/{id}', [DrafController::class, 'publish'])->name('datas.publish');
     Route::delete('/drafs/{id}', [DrafController::class, 'destroy'])->name('drafs.destroy');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
