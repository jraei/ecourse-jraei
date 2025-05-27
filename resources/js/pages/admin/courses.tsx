
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/admin/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar } from 'lucide-react';

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
        { label: 'Admin', href: '/admin' },
        { label: 'Courses' }
    ];

    const columns = [
        {
            key: 'name' as keyof Course,
            label: 'Course Name',
            sortable: true,
            render: (value: string, course: Course) => (
                <div className="flex items-center gap-3">
                    {course.thumbnail ? (
                        <img src={course.thumbnail} alt={value} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                        <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                        </div>
                    )}
                    <div>
                        <p className="font-medium">{value}</p>
                        <p className="text-sm text-gray-400">{course.modules_count || 0} modules</p>
                    </div>
                </div>
            )
        },
        {
            key: 'description' as keyof Course,
            label: 'Description',
            render: (value: string) => (
                <p className="text-sm text-gray-300 max-w-xs truncate">{value}</p>
            )
        },
        {
            key: 'status' as keyof Course,
            label: 'Status',
            sortable: true,
            render: (value: string) => (
                <Badge 
                    variant={value === 'active' ? 'default' : 'secondary'}
                    className={value === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}
                >
                    {value}
                </Badge>
            )
        },
        {
            key: 'created_at' as keyof Course,
            label: 'Created',
            sortable: true,
            render: (value: string) => (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
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
            
            <div className="p-6">
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-yellow-400">
                            {editingCourse ? 'Edit Course' : 'Add New Course'}
                        </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-gray-300">Course Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white focus:border-yellow-400"
                                placeholder="Enter course name"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-gray-300">Description</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white focus:border-yellow-400"
                                placeholder="Enter description"
                            />
                            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <Label htmlFor="thumbnail" className="text-gray-300">Thumbnail URL</Label>
                            <Input
                                id="thumbnail"
                                value={data.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.value)}
                                className="bg-zinc-800 border-zinc-700 text-white focus:border-yellow-400"
                                placeholder="Enter thumbnail URL"
                            />
                            {errors.thumbnail && <p className="text-red-400 text-sm mt-1">{errors.thumbnail}</p>}
                        </div>

                        <div>
                            <Label htmlFor="order" className="text-gray-300">Order</Label>
                            <Input
                                id="order"
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                className="bg-zinc-800 border-zinc-700 text-white focus:border-yellow-400"
                                placeholder="Enter order"
                            />
                            {errors.order && <p className="text-red-400 text-sm mt-1">{errors.order}</p>}
                        </div>

                        <div>
                            <Label htmlFor="status" className="text-gray-300">Status</Label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 focus:border-yellow-400 focus:outline-none"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            {errors.status && <p className="text-red-400 text-sm mt-1">{errors.status}</p>}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 border-zinc-600 text-white hover:bg-zinc-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                            >
                                {processing ? 'Saving...' : (editingCourse ? 'Update' : 'Create')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
