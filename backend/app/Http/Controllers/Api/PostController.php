<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){
        $posts = Post::all();
        return response()->json($posts);
    }
    public function create(Request $request){
        $formFileds = $request->all();
        $post = Post::create($formFileds);
        return response()->json($post);
    }

    public function getPostByForeignKey($id){
        $id = $id;
        $posts = Post::join('users', 'posts.user_id', '=', 'users.id')
             ->select('users.*')
             ->where('posts.user_id', $id)
             ->orderBy('posts.id', 'asc')
             ->get();
        if ($posts) {
            return response()->json($posts);
        }
        return response()->json(['message' => 'There is no posts from this user'], 404);
    }
    public function getByForeignKey(Request $request){
        $id = $request->all();
        $posts = Post::join('users', 'posts.user_id', '=', 'users.id')
             ->select('users.firstName','users.lastName')
             ->orderBy('posts.id', 'asc')
             ->get();
        return response()->json($posts);
    }
    public function getPostsByID($id){
        $id = $id;
        $posts = Post::join('users', 'posts.user_id', '=', 'users.id')
             ->select('posts.*')
             ->where('posts.user_id', $id)
             ->orderBy('posts.id', 'asc')
             ->get();
        if ($posts) {
            return response()->json($posts);
        }
        return response()->json(['message' => 'There is no posts from this user'], 404);
    }
}
