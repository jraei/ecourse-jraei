<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'video_path' => 'required|file|mimetypes:video/avi,video/mp4,video/mpeg,video/quicktime|max:202400',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:draft,published',
            'course_id' => 'required|exists:courses,id'
        ]);


        // Simpan video ke storage
        if ($request->hasFile('video_path')) {
            $path = $request->file('video_path')->store('videos', 'public');
            $validated['video_path'] = $path;
        }

        $slug = str()->slug($request->name);
        $validated['slug'] = $slug;

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
        // dd($request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'video_path' => 'nullable|file|mimetypes:video/avi,video/mp4,video/mpeg,video/quicktime|max:202400',
            'order' => 'nullable|integer|min:0',
            'status' => 'required|in:draft,published',
            'course_id' => 'required|exists:courses,id'
        ]);

        // Jika user upload file baru
        if ($request->hasFile('video_path')) {
            // Optional: hapus file lama jika ada
            if ($module->video_path && Storage::disk('public')->exists($module->video_path)) {
                Storage::disk('public')->delete($module->video_path);
            }

            $path = $request->file('video_path')->store('videos', 'public');
            $validated['video_path'] = $path;
        }

        $slug = str()->slug($request->name);
        $validated['slug'] = $slug;

        $module->update($validated);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {

        // delete video
        if ($module->video_path && Storage::disk('public')->exists($module->video_path)) {
            Storage::disk('public')->delete($module->video_path);
        }

        $module->delete();

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module deleted successfully.');
    }
}
