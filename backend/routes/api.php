<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategorieController;
use Illuminate\Support\Facades\Route;

// Route::get('/potato', function () {
//     return 'hello, these are blogs';
// })->middleware('auth:sanctum');

// Route::get('/blogs', function () {
//     return 'hello, these are blogs';
// });

// Apply auth middleware only to store, update, and destroy methods
Route::resource("blogs", BlogController::class)->except(['index', 'show'])->middleware('auth:sanctum');

// Index and show actions can be accessed without authentication
Route::resource("blogs", BlogController::class)->only(['index', 'show']);

Route::post("/sign_in", [AuthController::class, "sign_in"]);
Route::post("/login", [AuthController::class, "login"]);
