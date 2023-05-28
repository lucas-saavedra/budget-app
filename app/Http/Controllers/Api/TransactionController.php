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

        $accounts = Account::with('incomes','expenses')->whereBelongsTo(auth()->user())->get();

        return response()->json([
            "status" => true,
            "message" => "Incomes",
            "data" => $accounts
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'type' => 'required|string|max:50',
            'type' => [new Enum(OperationType::class)],
            'amount' => 'required|decimal:2',
            "account_id_from" => 'required|integer',
            "account_id_to" => 'required_if:type,transfer|integer',
            "datetime" => 'required|string'

        ]);
        if ($validator->fails()) {
            return  response($validator->errors(), 422);
        }
        $validation['user_id'] = auth()->user()->id;

        if ($validation['type'] === 'transfer') {
            $operation  = Transfer::create($validation);
        } else {
            $operation = Transaction::create($validation);
        }

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
