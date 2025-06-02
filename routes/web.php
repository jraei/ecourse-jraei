<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ModuleMaterialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MemberController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [MemberController::class, 'index'])->name('index');
Route::get('course/{course:slug}', [MemberController::class, 'course'])->name('member.course');
Route::get('module/{module:slug}', [MemberController::class, 'module'])->name('member.module');
Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');

    // Member routes

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
