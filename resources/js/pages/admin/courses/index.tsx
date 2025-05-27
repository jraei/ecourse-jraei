
import { DataTable } from '@/components/ui/data-table';
import { CrudModal } from '@/components/crud-modal';
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus, Edit, Trash2, ArrowUpDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: route('admin.dashboard'),
    },
    {
        title: 'Courses',
        href: route('admin.courses.index'),
    },
];

interface Course {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    status: string;
    created_at: string;
    modules_count?: number;
}

interface CoursesIndexProps {
    courses: Course[];
}

const courseFormFields = [
    { name: 'name', label: 'Course Name', type: 'text' as const, required: true, placeholder: 'Enter course name' },
    { name: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Enter course description' },
    { name: 'thumbnail', label: 'Thumbnail URL', type: 'text' as const, placeholder: 'Enter thumbnail URL' },
    { 
        name: 'status', 
        label: 'Status', 
        type: 'select' as const, 
        required: true,
        options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'draft', label: 'Draft' },
        ]
    },
];

export default function CoursesIndex({ courses }: CoursesIndexProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingCourse, setEditingCourse] = React.useState<Course | null>(null);
    const { data, setData, post, put, processing, reset } = useForm({
        name: '',
        description: '',
        thumbnail: '',
        status: 'active',
    });

    const handleCreate = () => {
        setEditingCourse(null);
        reset();
        setIsModalOpen(true);
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setData({
            name: course.name,
            description: course.description || '',
            thumbnail: course.thumbnail || '',
            status: course.status,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (course: Course) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            router.delete(route('admin.courses.destroy', course.id));
        }
    };

    const handleSubmit = (formData: Record<string, any>) => {
        if (editingCourse) {
            put(route('admin.courses.update', editingCourse.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.courses.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: 'bg-green-500/20 text-green-400 border-green-500/30',
            inactive: 'bg-red-500/20 text-red-400 border-red-500/30',
            draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        };
        
        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${statusConfig[status as keyof typeof statusConfig] || statusConfig.draft}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const columns: ColumnDef<Course>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-gray-300 hover:text-yellow-400 p-0"
                >
                    Course Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-medium text-white">{row.getValue('name')}</div>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => (
                <div className="text-gray-300 max-w-xs truncate">
                    {row.getValue('description') || 'No description'}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-gray-300 hover:text-yellow-400 p-0"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => getStatusBadge(row.getValue('status')),
        },
        {
            accessorKey: 'modules_count',
            header: 'Modules',
            cell: ({ row }) => (
                <div className="text-gray-400">
                    {row.getValue('modules_count') || 0} modules
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-gray-300 hover:text-yellow-400 p-0"
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="text-gray-400">
                    {new Date(row.getValue('created_at')).toLocaleDateString()}
                </div>
            ),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const course = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-yellow-400">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                            <DropdownMenuLabel className="text-gray-300">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem 
                                onClick={() => router.get(route('admin.modules.index', { course_id: course.id }))}
                                className="text-gray-300 hover:bg-gray-700 hover:text-yellow-400 cursor-pointer"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View Modules
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handleEdit(course)}
                                className="text-gray-300 hover:bg-gray-700 hover:text-yellow-400 cursor-pointer"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handleDelete(course)}
                                className="text-red-400 hover:bg-gray-700 hover:text-red-300 cursor-pointer"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-900 min-h-screen">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Courses Management</h1>
                        <p className="text-gray-400 mt-1">Manage e-learning courses and content</p>
                    </div>
                    <Button 
                        onClick={handleCreate}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                    </Button>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <DataTable
                        columns={columns}
                        data={courses}
                        searchColumn="name"
                        searchPlaceholder="Search courses..."
                    />
                </div>

                <CrudModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    title={editingCourse ? 'Edit Course' : 'Create New Course'}
                    description={editingCourse ? 'Update course information.' : 'Add a new course to the platform.'}
                    fields={courseFormFields}
                    initialData={data}
                    isLoading={processing}
                />
            </div>
        </AdminLayout>
    );
}
