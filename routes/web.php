<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ModuleMaterialController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::post('/register/get-snap-token', [RegisteredUserController::class, 'getSnapToken'])->name('register.get-snap-token');

Route::middleware(['auth', 'verified'])->group(function () {
    // Member routes
    Route::prefix('member')->name('member.')->group(function () {
        Route::get('/', [MemberController::class, 'index'])->name('index');
        Route::get('course/{course:slug}', [MemberController::class, 'course'])->name('course');
        Route::get('module/{module:slug}', [MemberController::class, 'module'])->name('module');
        Route::post('module/complete/{module}', [MemberController::class, 'markComplete'])->name('module.complete');
    });

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', function () {
            $stats = [
                'total_users' => \App\Models\User::count(),
                'total_courses' => \App\Models\Course::count(),
                'total_modules' => \App\Models\Module::count(),
                'active_courses' => \App\Models\Course::where('status', 'active')->count(),
            ];

            return Inertia::render('admin/dashboard', [
                'stats' => $stats
            ]);
        })->name('dashboard');

        Route::resource('courses', CourseController::class);
        Route::resource('modules', ModuleController::class);
        Route::resource('module-materials', ModuleMaterialController::class);
        Route::resource('users', UserController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
