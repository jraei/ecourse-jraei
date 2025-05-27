<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::withCount('modules')->latest()->get();
        
        return Inertia::render('admin/courses/index', [
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive,draft',
        ]);

        Course::create([
            'name' => $request->name,
            'description' => $request->description,
            'thumbnail' => $request->thumbnail,
            'status' => $request->status,
            'order' => Course::max('order') + 1,
        ]);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive,draft',
        ]);

        $course->update([
            'name' => $request->name,
            'description' => $request->description,
            'thumbnail' => $request->thumbnail,
            'status' => $request->status,
        ]);

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('admin.courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}
