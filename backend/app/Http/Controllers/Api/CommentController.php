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
        // $comment = Post::join('comments','posts.id','=','comments.post_id')
        //     ->where('comments.id',$id)
        //     ->where('posts.id',$request->id)
        //     ->first()
        // ;
        // if ($comment) {
        //     $comment->delete();
        // }
        $comment = Comment::findOrFail($id);
        if ($comment) {
            $post = Post::findOrFail($request->id);
            //$isDeleted = $comment->delete();
            $comment->delete();
            $post->update([
                'comment_count' => $post->comment_count > 0 ? $post->comment_count - 1 : 0
            ]);
            // if ($isDeleted) {
            // }
            return response()->json($post);
        }
    }
}
