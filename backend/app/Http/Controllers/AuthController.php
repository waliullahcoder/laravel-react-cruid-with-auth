<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Log;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validate request with custom messages
            $validatedData = $request->validate([
                'name'     => 'required|string',
                'email'    => 'required|email|unique:users,email',
                'password' => 'required|min:6',
            ], [
                'name.required'     => 'Name is required',
                'name.string'       => 'Name must be a string',
                'email.required'    => 'Email is required',
                'email.email'       => 'Email must be a valid email address',
                'email.unique'      => 'This email is already registered',
                'password.required' => 'Password is required',
                'password.min'      => 'Password must be at least 6 characters',
            ]);
        } catch (ValidationException $e) {
            // Return JSON response for validation errors
            return response()->json([
                'status'  => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        }

        // Create the user
        $user = User::create([
            'name'     => $validatedData['name'],
            'email'    => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Return success JSON response
        return response()->json([
            'status'  => true,
            'message' => 'User registered successfully',
            'user'    => $user
        ], 201);
    }

    public function login(Request $request)
    {
      Log::info(["Data",$request->all()]);
       try {
            // Validate request with custom messages
            $validatedData = $request->validate([
                'email'    => 'required',
                'password' => 'required',
            ], [
                'email.required'    => 'Email is required',
                'password.required' => 'Password is required',
                'password.min'      => 'Password must be at least 6 characters',
            ]);
        } catch (ValidationException $e) {
            // Return JSON response for validation errors
            return response()->json([
                'status'  => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message'=>'Invalid credentials'], 401);
        }

        $token = $user->createToken('api_token')->plainTextToken;
  
        return response()->json(['message' => 'Login successful','token'=>$token,'user' => $user]);
    }




    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'Logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
    public function products(Request $request)
    {
       $products = Product::all();
        return response()->json($products);
    }
}
