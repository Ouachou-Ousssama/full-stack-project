<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Models\User;
use Error;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function getById($id){
        $userById = User::where('id',$id)->first();
        if ($userById) {
            return response()->json($userById);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'dateOfBirth' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:7',
        ]);
        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'dateOfBirth' => $request->dateOfBirth,
            'email' => $request->email,
            'password' => $request->password
        ]);
        return response()->json($user);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'is_online' => 'required'
        ]);

        $formFileds = $request->all();

        $user = User::where('email', $formFileds['email'])->where('password', $formFileds['password'])->first();
        if ($user) {
            $user->update([
                'is_online' => $formFileds['is_online']
            ]);
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }
        throw new Error('User not found');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function updateProfile(Request $request, $id){
        $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'dateOfBirth' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:7',
        ]);
        $user = User::findorfail($id);
        if ($user) {
            $user->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'dateOfBirth' => $request->dateOfBirth,
                'email' => $request->email,
                'password' => $request->password
            ]);
            return response()->json($user);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    public function logOut(Request $request){
        $user = User::where('id', $request->id)->first();
        //dd($user);
        if ($user) {
            $user->update([
                'is_online' => false
            ]);
            return response()->json(['message' => 'Logged out']);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
