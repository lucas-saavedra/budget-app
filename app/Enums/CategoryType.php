<?php

namespace App\Enums;

enum CategoryType: string
{
    case income = 'income';
    case expense = 'expense';
    case transfer = 'transfer';
    case adjustment = 'adjustment';
    case other = 'other';
}
