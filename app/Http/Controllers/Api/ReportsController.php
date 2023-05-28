<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = User::with('accounts.incomes', 'accounts.expenses')->where('id', auth()->user()->id)->first();
        $incomes = [];
        $expenses = [];
        foreach ($user->accounts as $acc) {
            array_push($incomes, $acc->incomes->sum('amount') + $acc->initial_balance);
            array_push($expenses, $acc->expenses->sum('amount'));
        }
        return response()->json([
            "status" => true,
            "message" => "Report",
            "data" => [
                'incomes' => array_sum($incomes),
                'expenses' => array_sum($expenses),
                'date' => now()
            ],

        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
