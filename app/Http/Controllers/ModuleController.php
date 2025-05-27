<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Module::with('course:id,name');
        
        if ($request->has('course_id')) {
            $query->where('course_id', $request->course_id);
            $selectedCourse = Course::find($request->course_id);
        }
        
        $modules = $query->orderBy('order')->get()->map(function ($module) {
            $module->course_name = $module->course->name ?? 'Unknown Course';
            return $module;
        });
        
        $courses = Course::select('id', 'name')->get();
        
        return Inertia::render('admin/modules/index', [
            'modules' => $modules,
            'courses' => $courses,
            'selectedCourse' => $selectedCourse ?? null,
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'order' => 'nullable|integer',
        ]);

        $order = $request->order ?: (Module::where('course_id', $request->course_id)->max('order') + 1);

        Module::create([
            'title' => $request->title,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'course_id' => $request->course_id,
            'order' => $order,
        ]);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Module $module)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Module $module)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'order' => 'nullable|integer',
        ]);

        $module->update([
            'title' => $request->title,
            'description' => $request->description,
            'video_url' => $request->video_url,
            'course_id' => $request->course_id,
            'order' => $request->order ?: $module->order,
        ]);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        $module->delete();

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module deleted successfully.');
    }
}
