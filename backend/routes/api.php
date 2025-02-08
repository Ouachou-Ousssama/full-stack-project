<?php

use App\Http\Controllers\Api\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GuestController;
use App\Http\Controllers\Api\MessageController as ApiMessageController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\MessageController;
use App\Models\Comment;
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
    Route::put('/updateProfile/{id}', [GuestController::class,'updateProfile']);
    Route::put('/updateLikesCount/{id}',[PostController::class,'updateLikesCount']);
    Route::get('/getComments/{id}', [CommentController::class,'getComments']);
    Route::post('/createComment', [CommentController::class,'createComment']);
    Route::put('/updateCommentCount/{id}',[PostController::class,'updateCommentCount']);
    Route::post('/createMessage',[MessageController::class,'message']);
    Route::delete('/deleteComment/{id}',[CommentController::class,'deleteComment']);
    Route::get('/getMessages',[MessageController::class,'getMessages']);
});
Route::post('/craeteGuests', [GuestController::class,'create']);
Route::post('/loginGuests', [GuestController::class,'login']);
Route::post('/logOut',[GuestController::class,'logOut']);



