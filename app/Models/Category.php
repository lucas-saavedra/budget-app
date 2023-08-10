<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'label',
        'parent_category',
        'user_id',
        'description',
        'type'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
