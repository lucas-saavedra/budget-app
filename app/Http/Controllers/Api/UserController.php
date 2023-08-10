<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;



class UserController extends Controller
{
    private function createCategories($user_id)
    {
        $categories = Config::get('categories');
        foreach ($categories['income'] as $incomeCategory) {
            Category::create([
                'name' => $incomeCategory['name'],
                'label' => $incomeCategory['label'],
                'icon' => $incomeCategory['icon'],
                'user_id' => $user_id, // Cambia esto según tus necesidades
                'type' => 'income',
            ]);
        }

        foreach ($categories['expense'] as $expenseCategory) {
            Category::create([
                'name' => $expenseCategory['name'],
                'label' => $expenseCategory['label'],
                'icon' => $expenseCategory['icon'],
                'user_id' => $user_id, // Cambia esto según tus necesidades
                'type' => 'income',
            ]);
        }
    }
    public function register(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            "email" => 'required | email |unique:users',
            'password' => 'required | confirmed'
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $user->save();
            $this->createCategories($user->id);
            auth()->login($user);
            $token =  $user->createToken("auth_token")->plainTextToken;
            DB::commit();

            return response()->json([
                "status" => true,
                "message" => "!Welcome! " . $user->name,
                "data" => [
                    "access_token" => $token,
                    "user" => $user,
                ]
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response($e->getMessage());
        }
    }
    public
    function login(Request $request)
    {
        $request->validate([
            "email" => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', "=", $request->email)->first();

        if (isset($user->id)) {

            if (Hash::check($request->password, $user->password)) {
                $token =  $user->createToken("auth_token")->plainTextToken;

                return response()->json([
                    "status" => true,
                    "message" => "!Welcome! " . $user->name,
                    "data" => [
                        "access_token" => $token,
                        "user" => $user,
                    ]
                ], 200);
            } else {
                return response()->json([
                    "status" => 0,
                    "message" => "Invalid Password.",
                    "data" => [],
                ], 404);
            };
        } else {
            return response()->json([
                "status" => false,
                "message" => "The user with that email does not exists.",
                "data" => []
            ], 404);
        }
    }

    public
    function profile()
    {
        return response()->json([
            "status" => 1,
            "user" => auth()->user(),
        ]);
    }

    public
    function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => 1,
            "msg" => "Sesión cerrada correctamente."
        ]);
    }
}
