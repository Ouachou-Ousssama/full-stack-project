<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
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
}
