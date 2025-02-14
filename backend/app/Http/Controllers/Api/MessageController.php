<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function message(Request $request){
        $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'message' => 'required',
        ]);
        $newMsg = Message::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);
        return response()->json([
            'message' => 'Message sent successfully',
            'status' => 200,
            'data' => $newMsg
        ]);
    }
    public function getMessages(Request $request){
        $request->validate([
            'user_ids' => 'required|array',
        ]);

        $userIds = $request->input('user_ids');
    
        $messages = Message::whereIn('sender_id', $userIds)
        ->whereIn('receiver_id', $userIds)
        ->get();

        return response()->json($messages);
        //    $user = User::where('email', $formFileds['email'])->where('password', $formFileds['password'])
    } 
}
