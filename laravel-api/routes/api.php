<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\AvailabilityController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Booking
    Route::post('/book', [BookingController::class, 'bookSlot']);
    Route::get('/slots', [BookingController::class, 'getSlots']);
    Route::get('/bookings', [BookingController::class, 'index']);

    // Availability
    Route::get('/availabilities', [AvailabilityController::class, 'index']);
    Route::put('/availabilities/{availability}', [AvailabilityController::class, 'update']);
});
