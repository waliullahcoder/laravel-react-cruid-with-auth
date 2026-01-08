<?php
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);  
Route::post('/product/store', [ProductController::class, 'store']);  
Route::get('/product/show/{id}', [ProductController::class, 'show']);  
Route::post('/product/update/{id}', [ProductController::class, 'update']);  
Route::get('/product/delete/{id}', [ProductController::class, 'destroy']);  

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
