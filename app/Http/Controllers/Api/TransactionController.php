<?php

namespace App\Http\Controllers\Api;

use App\Enums\OperationType;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {

        $transactions = Transaction::where('user_id', auth()->user()->id)->get();

        $user_id = auth()->user()->id;

        $totalIncome = Transaction::where('user_id', $user_id)
            ->where('transaction_type', 'income')
            ->sum('amount');

        $totalExpense = Transaction::where('user_id', $user_id)
            ->where('transaction_type', 'expense')
            ->sum('amount');

        return response()->json([
            "status" => true,
            "message" => "Transactions list.",
            "data" => [
                "transactions" => $transactions,
                "incomes" => (float) $totalIncome,
                "expenses" => (float)$totalExpense
            ]

        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'transaction_type' => 'required|string|max:50',
            'transaction_type' => [new Enum(OperationType::class)],
            'amount' => 'required|numeric',
            "account_id_from" => 'required|integer',
            "account_id_to" => 'required_if:type,transfer|nullable|integer',
            "datetime" => 'required|string',
            "category_id" => 'required|integer',
        ]);
        if ($validator->fails()) {
            return  response($validator->errors(), 422);
        }
        $validatedData = $validator->validated();
        $validatedData['user_id'] = auth()->user()->id;
        $operation  = Transaction::create($validatedData);
        //account_id_to
        $accountId = $request->account_id_from;
        $account = Account::where('id', $accountId)->first();
        $totalIncome = $account->incomes->sum('amount');
        $totalExpense = $account->expenses->sum('amount');
        $currentBalance = $account->balance + $totalIncome - $totalExpense;
        // Actualizamos el balance en la cuenta
        $account->balance = $currentBalance;
        $account->save();
        return response()->json([
            "success" => true,
            "message" => "Operation success.",
            "data" => $operation
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
