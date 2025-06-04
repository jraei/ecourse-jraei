<?php

namespace App\Http\Controllers\Auth;

use Midtrans\Snap;
use App\Models\User;
use Inertia\Inertia;
use Midtrans\Config;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function getSnapToken(Request $request)
    {
        // 1. Validasi data form
        $validated = $request->validate([
            'username' => 'required|string|max:255|alpha_dash|unique:users',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255|min_digits:8',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 2. Konfigurasi Midtrans
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // 3. Buat parameter Snap
        $params = [
            'transaction_details' => [
                'order_id' => 'REG-' . time(),
                'gross_amount' => env('COURSE_PRICE'), // harga pendaftaran
            ],
            'customer_details' => [
                'first_name' => $validated['name'],
                'email' => $validated['email'],
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        // 4. Kirim Snap Token + data form ke React
        return response()->json([
            'snapToken' => $snapToken,
            'formData' => $validated,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|alpha_dash|unique:users',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255|min_digits:8',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        event(new Registered($user));

        Auth::login($user);

        return to_route('member.index')->with('success', 'Registration successful!');
    }
}
