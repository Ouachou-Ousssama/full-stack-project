<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function message(Request $request){
        //dd($request->all());
        event(new Message($request->message));

        return [];
    }
}
