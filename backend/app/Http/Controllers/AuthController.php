<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function sign_in(Request $request){
        if ($request->name && $request->email && $request->password){
            $formdata = $request->validate([
                'name' => 'min:6',
                'email' => 'email|unique:users',
                'password' => 'min:8'
            ],
        [
            'email.unique' => 'email'
        ]);
                $user = User::create($formdata);
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'username' => $request->name,
                    'email' => $request->email
                ]);
        }
        else {
            return 'enter name, email, password';

        }
    }
    public function login(Request $request){
        $formdata = $request->validate([
            'email' => 'email|exists:users',
            'password' => 'min:8'
        ],[
            'email.exists' => 'email',
            'password.min' => 'password'
        ]
    );
    
        if (!Auth::attempt($formdata)) {
            return response()->json(['message' => 'wrong password'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'username' => $user->name,
            'email' => $user->email,
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }
}
