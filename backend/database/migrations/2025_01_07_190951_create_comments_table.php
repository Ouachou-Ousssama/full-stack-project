<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_comments_table.php
public function up()
{
    Schema::create('comments', function (Blueprint $table) {
        $table->id();
        $table->uuid('user_id'); // Foreign key for the user who commented
        $table->unsignedBigInteger('post_id'); // Foreign key for the post being commented on
        $table->text('content'); // Comment content
        $table->timestamps();

        // Foreign key constraints without using `constrained`
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
