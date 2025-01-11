<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_xx_xx_create_followers_table.php
public function up()
{
    Schema::create('followers', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('follower_id'); // Foreign key for the follower user
        $table->unsignedBigInteger('followed_id'); // Foreign key for the followed user
        $table->timestamps();

        // Foreign key constraints without using `constrained`
        $table->foreign('follower_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('followed_id')->references('id')->on('users')->onDelete('cascade');

        // Unique constraint for the combination of follower_id and followed_id
        $table->unique(['follower_id', 'followed_id']);
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followers');
    }
};
