
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
                // For now, we'll simulate completion percentage
                // In a real app, this would be calculated based on user progress
                $course->completion_percentage = rand(0, 100);

                // Add placeholder thumbnails for courses without images
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
        // Load course with modules and simulate progress data
        $course->load(['modules' => function ($query) {
            $query->where('status', 'published')
                ->orderBy('order', 'asc')
                ->orderBy('name', 'asc');
        }]);

        // Add placeholder thumbnail if none exists
        if (!$course->thumbnail) {
            $placeholders = [
                'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
                'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
                'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
                'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80'
            ];
            $course->thumbnail = $placeholders[array_rand($placeholders)];
        }

        // Simulate completion data for modules
        $course->modules->transform(function ($module) {
            $module->is_completed = rand(0, 1) === 1;
            $module->duration = rand(5, 45) . ' min';
            return $module;
        });

        // Calculate overall progress
        $totalModules = $course->modules->count();
        $completedModules = $course->modules->where('is_completed', true)->count();
        $course->completion_percentage = $totalModules > 0 ? round(($completedModules / $totalModules) * 100) : 0;

        return Inertia::render('member/course', [
            'course' => $course
        ]);
    }

    public function module(Module $module)
    {
        // Load the module with its course and all course modules
        $module->load([
            'course' => function ($query) {
                $query->select('id', 'name', 'slug', 'description', 'thumbnail');
            },
            'course.modules' => function ($query) {
                $query->where('status', 'published')
                    ->orderBy('order', 'asc')
                    ->orderBy('name', 'asc')
                    ->select('id', 'name', 'slug', 'course_id', 'order', 'video_path');
            }
        ]);

        // Simulate module data
        $module->is_completed = rand(0, 1) === 1;
        $module->duration = rand(5, 45) . ' min';
        $module->video_url = $module->video_path ?: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

        // Simulate completion data for all course modules
        $module->course->modules->transform(function ($siblingModule) use ($module) {
            $siblingModule->is_completed = $siblingModule->id === $module->id ? $module->is_completed : rand(0, 1) === 1;
            $siblingModule->duration = rand(5, 45) . ' min';
            $siblingModule->is_current = $siblingModule->id === $module->id;
            return $siblingModule;
        });

        // Calculate course progress
        $totalModules = $module->course->modules->count();
        $completedModules = $module->course->modules->where('is_completed', true)->count();
        $module->course->completion_percentage = $totalModules > 0 ? round(($completedModules / $totalModules) * 100) : 0;

        // Find current module index and determine navigation
        $modulesList = $module->course->modules->toArray();
        $currentIndex = array_search($module->id, array_column($modulesList, 'id'));
        
        $prevModule = $currentIndex > 0 ? $modulesList[$currentIndex - 1] : null;
        $nextModule = $currentIndex < count($modulesList) - 1 ? $modulesList[$currentIndex + 1] : null;

        return Inertia::render('member/module', [
            'module' => $module,
            'prevModule' => $prevModule,
            'nextModule' => $nextModule
        ]);
    }
}
