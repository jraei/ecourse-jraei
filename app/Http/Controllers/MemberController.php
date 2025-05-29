
<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $courses = Course::select([
                'id',
                'name', 
                'description',
                'thumbnail',
                'order',
                'status'
            ])
            ->where('status', 'active')
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
}
