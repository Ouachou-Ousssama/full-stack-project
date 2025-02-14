<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\PostMail;
use App\Models\User;

class MailController extends Controller
{
    public function sendMail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'lastName' => 'required',
            'firstName' => 'required',
        ]);

        $user = User::where('email', $request->email)
        ->where('firstName',$request->firstName)
        ->where('lastName',$request->lastName)
        ->first();

        $details = [
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'password' => $user->password
        ];

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        Mail::to($request->email)->send(new PostMail($details));

        return response()->json(['message' => 'Email Sent Successfully']);
    }
}