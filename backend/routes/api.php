<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/blogs', function () {
//     return 'hello, these are blogs';
// })->middleware('auth:sanctum');

// Route::get('/blogs', function () {
//     return 'hello, these are blogs';
// });

Route::resource("blogs", BlogController::class);
Route::resource("categories", CategorieController::class);

Route::post("/sign_in", [UserController::class, "sign_in"]);
