<?php

namespace App\Enums;

enum OperationType: string
{

    case income = 'income';
    case expense = 'expense';
    case adjustment = 'adjustment';
    case transfer = 'transfer';
    case balance = 'balance';
}
