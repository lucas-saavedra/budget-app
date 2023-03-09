<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;



class UserController extends Controller
{

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
            DB::commit();

            return response()->json([
                "status" => 1,
                "msg" => "¡Registro exitoso! Bienvenido " . $user->name,
            ]);
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
                    "status" => 1,
                    "msg" => "!Bienvenido! " . $user->name,
                    "access_token" => $token,
                    "user" => $user,
                ]);
            } else {
                return response()->json([
                    "status" => 0,
                    "msg" => "Contraseña incorrecta."
                ], 404);
            };
        } else {
            return response()->json([
                "status" => 0,
                "msg" => "El usuario con ese email no existe."
            ]);
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
