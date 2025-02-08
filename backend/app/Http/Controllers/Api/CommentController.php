<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function createComment(Request $request){
        $request->validate([
            'user_id' => 'required',
            'post_id' => 'required',
            'content' => 'required'
        ]);
        $comment = Comment::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'content' => $request->content
        ]);
        return response()->json($comment);
    }

    public function getCommentsAll(){
        $comments = Comment::all();
        return response()->json($comments);
    }
    public function getComments($id){
        $comments = Comment::join('users', 'comments.user_id', '=', 'users.id')
             ->select('comments.*','users.firstName','users.lastName')
             ->where('comments.post_id', $id)
             ->orderBy('comments.id', 'asc')
             ->get();
        if ($comments) {
            return response()->json($comments);
        }
        return response()->json(['message' => 'There is no comments for this post'], 404);
    }
    public function deleteComment(Request $request,$id){
        $request->validate([
            'id' => 'required'
        ]);
        $comment = Comment::findOrFail($id);
        if ($comment) {
            $post = Post::findOrFail($request->id);
            $comment->delete();
            $post->update([
                'comment_count' => $post->comment_count > 0 ? $post->comment_count - 1 : 0
            ]);
            return response()->json($post);
        }
    }
}
