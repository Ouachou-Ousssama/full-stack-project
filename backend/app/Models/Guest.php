<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'login',
        'password',
    ];
}
