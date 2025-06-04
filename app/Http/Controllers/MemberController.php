<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
            'status',
            'completion_percentage'
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
                // $course->completion_percentage = rand(0, 100);

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

        $course->modules->transform(function ($module) {
            // change duration format from second into minute and second
            $module->duration = $this->formatDuration($module->duration);
            return $module;
        });

        // Calculate overall progress
        $totalModules = $course->modules->where('status', 'published')->count();
        $completedModules = $course->modules->where('status', 'published')->where('is_completed', true)->count();
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
                $query->select('id', 'name', 'slug', 'description', 'thumbnail', 'completion_percentage');
            },
            'course.modules' => function ($query) {
                $query->where('status', 'published')
                    ->orderBy('order', 'asc')
                    ->orderBy('name', 'asc')
                    ->select('id', 'name', 'slug', 'course_id', 'order', 'video_path', 'is_completed', 'duration', 'status');
            },
            'materials' => function ($query) {
                $query->select('id', 'name', 'module_id', 'url', 'text');
            }
        ]);

        $module->duration = $this->formatDuration($module->duration);

        // Simulate completion data for all course modules
        $module->course->modules->transform(function ($siblingModule) use ($module) {

            $siblingModule->is_current = $siblingModule->id === $module->id;
            $siblingModule->duration = $this->formatDuration($siblingModule->duration);

            return $siblingModule;
        });

        // Calculate course progress
        $totalModules = $module->course->modules->where('status', 'published')->count();
        $completedModules = $module->course->modules->where('status', 'published')->where('is_completed', 1)->count();
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

    public function markComplete(Request $request, Module $module)
    {
        try {
            $module->update(['is_completed' => true]);

            $course = $module->course()->with(['modules' => function ($query) {
                $query->where('status', 'published');
            }])->first();

            $totalModules = $course->modules->count();
            $completedModules = $course->modules->where('is_completed', true)->count();
            $completionPercentage = $totalModules > 0
                ? round(($completedModules / $totalModules) * 100)
                : 0;

            $course->update(['completion_percentage' => $completionPercentage]);

            // ✅ Return JSON response
            return response()->json([
                'success' => true,
                'completion_percentage' => $completionPercentage,
                'message' => 'Module has been completed.',
            ]);
        } catch (\Exception $e) {
            // ❌ Error response
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500); // Status code 500 untuk men-trigger onError
        }
    }

    private function formatDuration($seconds)
    {
        if (!$seconds) return '0 sec';
        $minutes = floor($seconds / 60);
        $remainingSeconds = $seconds % 60;
        return ($minutes > 0 ? "{$minutes} min " : '') . "{$remainingSeconds} sec";
    }
}
