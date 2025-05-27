
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminModuleController extends Controller
{
    public function index()
    {
        $modules = Module::with('course:id,name')
            ->select(['id', 'name', 'course_id', 'video_url', 'status', 'order', 'created_at'])
            ->orderBy('course_id')
            ->orderBy('order')
            ->paginate(20);
            
        $courses = Course::select(['id', 'name'])->orderBy('name')->get();
            
        return Inertia::render('admin/modules/index', [
            'modules' => $modules,
            'courses' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'video_url' => 'nullable|string|url',
            'status' => 'required|string|in:active,inactive',
            'order' => 'nullable|integer',
        ]);

        Module::create($validated);

        return redirect()->back()->with('success', 'Module created successfully');
    }

    public function update(Request $request, Module $module)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'video_url' => 'nullable|string|url',
            'status' => 'required|string|in:active,inactive',
            'order' => 'nullable|integer',
        ]);

        $module->update($validated);

        return redirect()->back()->with('success', 'Module updated successfully');
    }

    public function destroy(Module $module)
    {
        $module->delete();
        return redirect()->back()->with('success', 'Module deleted successfully');
    }
}
