<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id' => '9e36109f-9563-4d05-95e2-c9f1a92e78t9',
            'firstName' => 'Admin',
            'lastName' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin123',
            'role' => 'admin',
            'is_online' => false,
            'created_at' => now(),
            'updated_at' => now(),
            'dateOfBirth' => now(),
        ]);
    }
}
