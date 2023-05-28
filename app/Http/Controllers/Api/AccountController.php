<?php

namespace App\Http\Controllers\Api;

use App\Enums\AccountType;
use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::whereBelongsTo(auth()->user())->get();

        return response()->json([
            "success" => true,
            "message" => "Accounts list.",
            "data" => $accounts
        ]);
    }
    public function show($id)
    {
        $account = Account::whereBelongsTo(auth()->user())->where('id', $id)->first();
        return response()->json([
            "success" => true,
            "message" => "Account",
            "data" => $account
        ]);
    }
    public function store(Request $request)
    {
        $validation = $request->validate([
            'name' => 'required|string|max:191',
            'type' => 'required|alpha_num|max:20',
            'type' => [new Enum(AccountType::class)],
            'initial_balance' => 'required|numeric',
            'color' => 'required|string|max:191',
            'description' => 'nullable|string|max:255',
            'currency' => 'sometimes|string|min:1|max:3',
        ]);

        $validation['user_id'] = auth()->user()->id;
        $account = Account::create($validation);

        return response()->json([
            "success" => true,
            "message" => "Account updated successfully.",
            "data" => $account
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Account $account)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:255 |',
            'type' => [new Enum(AccountType::class)],
            'initial_balance' => 'sometimes|numeric',
            'color' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'currency' => 'sometimes|string|min:1|max:4',
        ]);
        if ($validator->fails()) {
            return  response($validator->errors(), 422);
        }
        $account->update($validator->validated());

        return response()->json([
            "success" => true,
            "message" => "Account updated successfully.",
            "data" => $account
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        Account::whereBelongsTo(auth()->user())->where('id', $id)->delete();
        return response()->json([
            "ok" => true,
            "msg" => "¡Account successfully deleted!"
        ]);
    }
}
