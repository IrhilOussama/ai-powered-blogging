<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function sign_in(Request $request){
        if ($request->name && $request->email && $request->password){
            $formdata = $request->validate([
                'name' => 'min:6',
                'email' => 'email|unique:users',
                'password' => 'min:8'
            ]);
                $user = User::create($formdata);
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]);
        }
        else {
            return 'enter name, email, password';

        }
    }
}
