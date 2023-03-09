<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\Contracts\HasApiTokens;

class Account extends Model
{
    use HasFactory;
    protected $table = 'accounts';
    protected $fillable = [
        'name',
        'initial_balance',
        'user_id',
        'color',
        'type',
        'currency',
        'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
