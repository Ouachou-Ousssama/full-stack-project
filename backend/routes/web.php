<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('test', function () {
    event(new App\Events\PrivateChannelEvent('hello',1));
});