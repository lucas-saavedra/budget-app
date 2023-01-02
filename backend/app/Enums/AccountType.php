<?php

namespace App\Enums;

enum AccountType: string
{
    case bank_account = 'bank_account';
    case cash = 'cash';
    case credit_card = 'credit_card';
    case investment = 'investment';
    case ewallet = 'e-wallet';
    case savings = 'savings';
    case other = 'other';
}
