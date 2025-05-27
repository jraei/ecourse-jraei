import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Zap, Database } from 'lucide-react';

interface Course {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    modules_count?: number;
}

interface CoursesPageProps {
    courses: Course[];
}

export default function CoursesPage({ courses }: CoursesPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        description: '',
        thumbnail: '',
        order: 0,
        status: 'active' as 'active' | 'inactive'
    });

    const breadcrumbs = [
        { title: 'Admin', href: '/admin' },
        { title: 'Courses' }
    ];

    const columns = [
        {
            key: 'name' as keyof Course,
            label: 'Course Name',
            sortable: true,
            render: (value: string, course: Course) => (
                <div className="flex items-center gap-4">
                    {course.thumbnail ? (
                        <div className="relative group">
                            <img 
                                src={course.thumbnail} 
                                alt={value} 
                                className="w-12 h-12 rounded-xl object-cover ring-2 ring-zinc-700 group-hover:ring-cyan-400 transition-all duration-300" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl flex items-center justify-center ring-2 ring-zinc-600 hover:ring-cyan-400 transition-all duration-300 group">
                            <BookOpen className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                        </div>
                    )}
                    <div>
                        <p className="font-semibold text-white group-hover:text-cyan-200 transition-colors">{value}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <Database className="w-3 h-3 text-gray-500" />
                            <p className="text-xs text-gray-400 font-mono">{course.modules_count || 0} modules</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'description' as keyof Course,
            label: 'Description',
            render: (value: string) => (
                <p className="text-sm text-gray-300 max-w-xs truncate font-mono">{value}</p>
            )
        },
        {
            key: 'status' as keyof Course,
            label: 'Status',
            sortable: true,
            render: (value: string) => (
                <Badge 
                    className={`
                        ${value === 'active' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                            : 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 shadow-lg shadow-gray-500/25'
                        }
                        px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider
                        hover:scale-105 transition-transform duration-200
                    `}
                >
                    <div className={`w-2 h-2 rounded-full mr-2 ${value === 'active' ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
                    {value}
                </Badge>
            )
        },
        {
            key: 'created_at' as keyof Course,
            label: 'Created',
            sortable: true,
            render: (value: string) => (
                <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    {new Date(value).toLocaleDateString()}
                </div>
            )
        }
    ];

    const handleAdd = () => {
        reset();
        setEditingCourse(null);
        setIsModalOpen(true);
    };

    const handleEdit = (course: Course) => {
        setData({
            name: course.name,
            description: course.description,
            thumbnail: course.thumbnail,
            order: course.order,
            status: course.status
        });
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleDelete = (course: Course) => {
        if (confirm('Are you sure you want to delete this course?')) {
            destroy(`/admin/courses/${course.id}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingCourse) {
            put(`/admin/courses/${editingCourse.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        } else {
            post('/admin/courses', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Course Management" />
            
            <div className="p-6 relative">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 w-60 h-60 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10">
                    <DataTable
                        data={courses}
                        columns={columns}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        title="Course Management"
                        addButtonText="Add Course"
                        searchPlaceholder="Search courses..."
                    />
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-gradient-to-br from-zinc-900/95 via-zinc-800/50 to-zinc-900/95 border border-zinc-700/50 text-white max-w-md backdrop-blur-sm">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                            <Zap className="w-6 h-6 text-cyan-400" />
                            {editingCourse ? 'Modify Course' : 'Create Course'}
                        </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-300 font-mono text-sm uppercase tracking-wider">Course Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="bg-zinc-800/50 border-zinc-700/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg backdrop-blur-sm"
                                placeholder="Enter course name"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1 font-mono">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-300 font-mono text-sm uppercase tracking-wider">Description</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="bg-zinc-800/50 border-zinc-700/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg backdrop-blur-sm"
                                placeholder="Enter description"
                            />
                            {errors.description && <p className="text-red-400 text-sm mt-1 font-mono">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="thumbnail" className="text-gray-300 font-mono text-sm uppercase tracking-wider">Thumbnail URL</Label>
                            <Input
                                id="thumbnail"
                                value={data.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.value)}
                                className="bg-zinc-800/50 border-zinc-700/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg backdrop-blur-sm"
                                placeholder="Enter thumbnail URL"
                            />
                            {errors.thumbnail && <p className="text-red-400 text-sm mt-1 font-mono">{errors.thumbnail}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-gray-300 font-mono text-sm uppercase tracking-wider">Order</Label>
                            <Input
                                id="order"
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                className="bg-zinc-800/50 border-zinc-700/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20 rounded-lg backdrop-blur-sm"
                                placeholder="Enter order"
                            />
                            {errors.order && <p className="text-red-400 text-sm mt-1 font-mono">{errors.order}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-gray-300 font-mono text-sm uppercase tracking-wider">Status</Label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                className="w-full bg-zinc-800/50 border border-zinc-700/50 text-white rounded-lg px-3 py-2 focus:border-cyan-400 focus:outline-none backdrop-blur-sm"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {errors.status && <p className="text-red-400 text-sm mt-1 font-mono">{errors.status}</p>}
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 border-zinc-600/50 text-white hover:bg-zinc-700/50 backdrop-blur-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                            >
                                {processing ? 'Processing...' : (editingCourse ? 'Update' : 'Create')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
