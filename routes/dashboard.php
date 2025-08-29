<?php

use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->name("dashboard.")->prefix('dashboard')->group(function () {
    Route::resource('services', ServiceController::class)->names("services");
});
