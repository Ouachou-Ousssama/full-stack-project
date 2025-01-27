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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/getGuests',[GuestController::class,'index']);
    Route::get('/getUserById/{id}',[GuestController::class,'getById']);
    Route::get('/getPostsByForeignKey/{id}',[PostController::class,'getPostByForeignKey']);
    Route::post('/createPost',[PostController::class,'create']);
    Route::get('/getPosts',[PostController::class,'index']);
    Route::get('/getByForeignKey',[PostController::class,'getByForeignKey']);
    Route::get('/getPosts/{id}', [PostController::class,'getPostsByID']);
    Route::delete('/deletePost/{id}', [PostController::class,'delete']);
    Route::get('/getPostById/{id}', [PostController::class,'getPostById']);
    Route::put('/updatePost/{id}', [PostController::class,'update']);
});
Route::post('/craeteGuests', [GuestController::class,'create']);
Route::post('/loginGuests', [GuestController::class,'login']);
Route::post('/messages', [MessageController::class,'message']);




