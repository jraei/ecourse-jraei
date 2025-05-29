
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
    public function index()
    {
        $modules = Module::with('course')
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get();

        $courses = Course::orderBy('name')->get();

        return Inertia::render('admin/modules', [
            'modules' => $modules,
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return redirect()->route('admin.modules.index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_path' => 'nullable|url',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:draft,published',
            'course_id' => 'required|exists:courses,id'
        ]);

        Module::create($validated);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        return redirect()->route('admin.modules.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Module $module)
    {
        return redirect()->route('admin.modules.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Module $module)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_path' => 'nullable|url',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:draft,published',
            'course_id' => 'required|exists:courses,id'
        ]);

        $module->update($validated);

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
