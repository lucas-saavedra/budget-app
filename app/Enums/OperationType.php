<?php

namespace App\Enums;

enum OperationType: string
{

    case Income = 'Income';
    case Expense = 'Expense';
    case Adjustment = 'Adjustment';
    case Transfer = 'Transfer';
}
