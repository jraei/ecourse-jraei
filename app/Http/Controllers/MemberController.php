<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $courses = Course::select([
            'id',
            'name',
            'slug',
            'description',
            'thumbnail',
            'order',
            'status'
        ])
            ->where('status', 'active')
            ->whereHas('modules', function ($query) {
                $query->where('status', 'published');
            })
            ->withCount('modules as module_count')
            ->orderBy('order', 'asc')
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($course) {
                $course->completion_percentage = rand(0, 100);

                if (!$course->thumbnail) {
                    $placeholders = [
                        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
                        'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
                        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
                        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80'
                    ];
                    $course->thumbnail = $placeholders[array_rand($placeholders)];
                }

                return $course;
            });

        return Inertia::render('member/index', [
            'courses' => $courses
        ]);
    }

    public function course(Course $course)
    {
        $course->load(['modules' => function ($query) {
            $query->where('status', 'published')
                ->orderBy('order', 'asc')
                ->orderBy('name', 'asc');
        }]);

        if (!$course->thumbnail) {
            $placeholders = [
                'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
                'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
                'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
                'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80'
            ];
            $course->thumbnail = $placeholders[array_rand($placeholders)];
        }

        $course->modules->transform(function ($module) {
            $module->is_completed = rand(0, 1) === 1;
            $module->duration = rand(5, 45) . ' min';
            return $module;
        });

        $totalModules = $course->modules->count();
        $completedModules = $course->modules->where('is_completed', true)->count();
        $course->completion_percentage = $totalModules > 0 ? round(($completedModules / $totalModules) * 100) : 0;

        return Inertia::render('member/course', [
            'course' => $course
        ]);
    }

    public function module(Module $module)
    {
        $module->load(['course.modules' => function ($query) {
            $query->where('status', 'published')
                ->orderBy('order', 'asc')
                ->orderBy('name', 'asc');
        }]);

        $module->is_completed = rand(0, 1) === 1;
        $module->duration = rand(5, 45) . ' min';
        $module->video_duration = rand(300, 2700); // 5-45 minutes in seconds

        if (!$module->video_path) {
            $module->video_path = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        }

        $module->course->modules->transform(function ($siblingModule) use ($module) {
            $siblingModule->is_completed = rand(0, 1) === 1;
            $siblingModule->duration = rand(5, 45) . ' min';
            $siblingModule->is_current = $siblingModule->id === $module->id;
            return $siblingModule;
        });

        $modules = $module->course->modules;
        $currentIndex = $modules->search(function ($item) use ($module) {
            return $item->id === $module->id;
        });

        $previousModule = $currentIndex > 0 ? $modules[$currentIndex - 1] : null;
        $nextModule = $currentIndex < $modules->count() - 1 ? $modules[$currentIndex + 1] : null;

        $totalModules = $modules->count();
        $completedModules = $modules->where('is_completed', true)->count();
        $courseProgress = $totalModules > 0 ? round(($completedModules / $totalModules) * 100) : 0;

        return Inertia::render('member/module', [
            'module' => $module,
            'course' => $module->course,
            'modules' => $modules,
            'previousModule' => $previousModule,
            'nextModule' => $nextModule,
            'courseProgress' => $courseProgress
        ]);
    }
}
