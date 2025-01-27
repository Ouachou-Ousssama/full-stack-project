<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){
        $posts = Post::select('posts.*')
        ->orderBy('id', 'desc')
        ->get();
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
    public function delete($id){
        $post = Post::findorFail($id);
        $post->delete();
        return response()->json(
            'Post Deleted Successfully'
        );
    }
    public function getPostById($id){
        $post = Post::findorFail($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        return response()->json($post);
    }
    public function update(Request $request,$id){
        $post = Post::findorFail($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        $post->update($request->all());
        return response()->json($post);
    }
}
