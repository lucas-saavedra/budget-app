<?php

use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ReportsController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserController::class, 'register'])
    ->middleware('guest');

Route::post('login', [UserController::class, 'login'])->name('login')
    ->middleware('guest');

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get('profile', [UserController::class, 'profile']);
    Route::post('logout', [UserController::class, 'logout']);
    //accounts
    Route::apiResource('accounts', AccountController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('transactions', TransactionController::class);
    Route::apiResource('reports', ReportsController::class);
});
