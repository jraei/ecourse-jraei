
<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::resource('users', UserController::class, [
        'names' => [
            'index' => 'admin.users.index',
            'create' => 'admin.users.create',
            'store' => 'admin.users.store',
            'show' => 'admin.users.show',
            'edit' => 'admin.users.edit',
            'update' => 'admin.users.update',
            'destroy' => 'admin.users.destroy',
        ]
    ]);

    Route::resource('courses', CourseController::class, [
        'names' => [
            'index' => 'admin.courses.index',
            'create' => 'admin.courses.create',
            'store' => 'admin.courses.store',
            'show' => 'admin.courses.show',
            'edit' => 'admin.courses.edit',
            'update' => 'admin.courses.update',
            'destroy' => 'admin.courses.destroy',
        ]
    ]);

    Route::resource('modules', ModuleController::class, [
        'names' => [
            'index' => 'admin.modules.index',
            'create' => 'admin.modules.create',
            'store' => 'admin.modules.store',
            'show' => 'admin.modules.show',
            'edit' => 'admin.modules.edit',
            'update' => 'admin.modules.update',
            'destroy' => 'admin.modules.destroy',
        ]
    ]);
});
