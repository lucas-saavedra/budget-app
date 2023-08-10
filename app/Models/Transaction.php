<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'amount',
        'transaction_type',
        'category_id',
        'datetime',
        'account_id_from',
        'account_id_to',
        'user_id'

    ];
}
