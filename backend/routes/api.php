<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GuestController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\MessageController;
use App\Models\Post;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->get('/getGuests',[GuestController::class,'index']);
Route::middleware(['auth:sanctum'])->get('/getUserById/{id}',[GuestController::class,'getById']);
Route::middleware(['auth:sanctum'])->get('/getPostsByForeignKey/{id}',[PostController::class,'getPostByForeignKey']);
Route::middleware(['auth:sanctum'])->post('/createPost',[PostController::class,'create']);
Route::middleware(['auth:sanctum'])->get('/getPosts',[PostController::class,'index']);
Route::middleware(['auth:sanctum'])->get('/getByForeignKey',[PostController::class,'getByForeignKey']);
Route::middleware(['auth:sanctum'])->get('/getPosts/{id}', [PostController::class,'getPostsByID']);
Route::post('/craeteGuests', [GuestController::class,'create']);
Route::post('/loginGuests', [GuestController::class,'login']);
Route::post('/messages', [MessageController::class,'message']);




