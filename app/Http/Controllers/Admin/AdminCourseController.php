
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCourseController extends Controller
{
    public function index()
    {
        $courses = Course::withCount('modules')
            ->select(['id', 'name', 'description', 'status', 'order', 'created_at'])
            ->orderBy('order')
            ->paginate(20);
            
        return Inertia::render('admin/courses/index', [
            'courses' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:active,inactive',
            'order' => 'nullable|integer',
        ]);

        Course::create($validated);

        return redirect()->back()->with('success', 'Course created successfully');
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:active,inactive',
            'order' => 'nullable|integer',
        ]);

        $course->update($validated);

        return redirect()->back()->with('success', 'Course updated successfully');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->back()->with('success', 'Course deleted successfully');
    }
}
