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
        $formFileds = $request->all();
        //dd($formFileds);
        $user = User::create($formFileds);
        return response()->json($user);
    }

    public function login(Request $request)
    {
        $formFileds = $request->all();
        //dd($formFileds);
        $user = User::where('email', $formFileds['email'])->where('password', $formFileds['password'])->first();
        if ($user) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }

        // $user = User::where('email', $formFileds['email'])->where('password', $formFileds['password'])->first();
        // if ($user) {
        //     // $token = $user->createToken('auth_token')->plainTextToken;
        //     // return [
        //     //     'user' => $user,
        //     //     'token' => $token
        //     // ];
        // }
        throw new Error('User not found');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guest $guest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        //
    }
}
