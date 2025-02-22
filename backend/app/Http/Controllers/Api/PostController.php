<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Like;
use App\Models\User;
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
        $request->validate([
            'user_id' => 'required',
            'content' => 'required'
        ]);
        $post = Post::create([
            'user_id' => $request->user_id,
            'content' => $request->content
        ]);
        $user = User::all();
        
        foreach ($user as $value) {
            $like = Like::create([
                'user_id' => $value->id,
                'post_id' => $post->id,
                'is_liked' => 0
            ]);
        }

        return response()->json($post);
    }

    public function getPostByForeignKey($id){
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
    public function getByForeignKey(){
        $posts = Post::join('users', 'posts.user_id', '=', 'users.id')
             ->select('users.firstName','users.lastName')
             ->orderBy('posts.id', 'asc')
             ->get();
        return response()->json($posts);
    }
    public function getPostsByID($id){
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
        $request->validate([
            'content' => 'required'
        ]);
        $post = Post::findorFail($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        $post->update([
            'content' => $request->content
        ]);
        return response()->json($post);
    }
    public function updateLikesCount(Request $request,$id){
        $request->validate([
            'like_count' => 'required',
            'post_id' => 'required'
        ]);
        $post = Post::findorfail($id);
        $liked = Like::where('post_id', $id)->where('user_id', $request->user_id)->first();
        $liked->update([
            'is_liked' => !$liked->is_liked
        ]);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        if ($liked->is_liked) {
            $post->update([
                'like_count' => $post->like_count + 1
            ]);
            $liked->update([
                'post_like_count' => $liked->post_like_count + 1
            ]);
        }else{
            $post->update([
                'like_count' => $post->like_count - 1
            ]);
            $liked->update([
                'post_like_count' => $liked->post_like_count - 1
            ]);
        }
        return response()->json($post);
    }
    public function updateCommentCount(Request $request,$id){
        $request->validate([
            'comment_count' => 'required',
        ]);
        $post = Post::findorfail($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        $post->update([
            'comment_count' => $post->comment_count + 1
        ]);
        return response()->json($post);
    }
}
