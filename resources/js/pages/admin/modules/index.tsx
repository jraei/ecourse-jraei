
import { DataTable } from '@/components/ui/data-table';
import { CrudModal } from '@/components/crud-modal';
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus, Edit, Trash2, ArrowUpDown, PlayCircle, GripVertical } from 'lucide-react';
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

interface Module {
    id: number;
    title: string;
    description: string;
    video_url: string;
    order: number;
    course_id: number;
    course_name?: string;
    created_at: string;
}

interface ModulesIndexProps {
    modules: Module[];
    courses: Array<{ id: number; name: string }>;
    selectedCourse?: { id: number; name: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: route('admin.dashboard'),
    },
    {
        title: 'Modules',
        href: route('admin.modules.index'),
    },
];

const moduleFormFields = [
    { name: 'title', label: 'Module Title', type: 'text' as const, required: true, placeholder: 'Enter module title' },
    { name: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Enter module description' },
    { name: 'video_url', label: 'Video URL', type: 'text' as const, placeholder: 'Enter video URL' },
    { name: 'order', label: 'Order', type: 'text' as const, placeholder: 'Enter display order' },
];

export default function ModulesIndex({ modules, courses, selectedCourse }: ModulesIndexProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingModule, setEditingModule] = React.useState<Module | null>(null);
    const { data, setData, post, put, processing, reset } = useForm({
        title: '',
        description: '',
        video_url: '',
        order: '',
        course_id: selectedCourse?.id || '',
    });

    const dynamicFormFields = [
        ...moduleFormFields,
        { 
            name: 'course_id', 
            label: 'Course', 
            type: 'select' as const, 
            required: true,
            options: courses.map(course => ({ value: course.id.toString(), label: course.name }))
        },
    ];

    const handleCreate = () => {
        setEditingModule(null);
        reset();
        setData(prev => ({ ...prev, course_id: selectedCourse?.id || '' }));
        setIsModalOpen(true);
    };

    const handleEdit = (module: Module) => {
        setEditingModule(module);
        setData({
            title: module.title,
            description: module.description || '',
            video_url: module.video_url || '',
            order: module.order?.toString() || '',
            course_id: module.course_id.toString(),
        });
        setIsModalOpen(true);
    };

    const handleDelete = (module: Module) => {
        if (window.confirm('Are you sure you want to delete this module?')) {
            router.delete(route('admin.modules.destroy', module.id));
        }
    };

    const handleSubmit = (formData: Record<string, any>) => {
        if (editingModule) {
            put(route('admin.modules.update', editingModule.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.modules.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const getVideoThumbnail = (videoUrl: string) => {
        if (!videoUrl) return null;
        
        // Handle YouTube URLs
        const youtubeMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
        if (youtubeMatch) {
            return `https://img.youtube.com/vi/${youtubeMatch[1]}/mqdefault.jpg`;
        }
        
        return null;
    };

    const columns: ColumnDef<Module>[] = [
        {
            accessorKey: 'order',
            header: 'Order',
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <GripVertical className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-300 font-mono">{row.getValue('order')}</span>
                </div>
            ),
        },
        {
            accessorKey: 'video_url',
            header: 'Preview',
            cell: ({ row }) => {
                const videoUrl = row.getValue('video_url') as string;
                const thumbnail = getVideoThumbnail(videoUrl);
                
                return (
                    <div className="relative w-16 h-12 bg-gray-700 rounded overflow-hidden">
                        {thumbnail ? (
                            <>
                                <img 
                                    src={thumbnail} 
                                    alt="Video thumbnail" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="h-6 w-6 text-white opacity-80" />
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <PlayCircle className="h-6 w-6 text-gray-500" />
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-gray-300 hover:text-yellow-400 p-0"
                >
                    Module Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-medium text-white">{row.getValue('title')}</div>
            ),
        },
        {
            accessorKey: 'course_name',
            header: 'Course',
            cell: ({ row }) => (
                <div className="text-gray-300">
                    {row.getValue('course_name') || 'Unknown Course'}
                </div>
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
                const module = row.original;
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
                                onClick={() => handleEdit(module)}
                                className="text-gray-300 hover:bg-gray-700 hover:text-yellow-400 cursor-pointer"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handleDelete(module)}
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

    const pageTitle = selectedCourse ? `${selectedCourse.name} - Modules` : 'Modules Management';
    const pageDescription = selectedCourse 
        ? `Manage modules for ${selectedCourse.name}` 
        : 'Manage learning modules across all courses';

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={pageTitle} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-900 min-h-screen">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{pageTitle}</h1>
                        <p className="text-gray-400 mt-1">{pageDescription}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        {selectedCourse && (
                            <Button 
                                variant="outline"
                                onClick={() => router.get(route('admin.modules.index'))}
                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                                View All Modules
                            </Button>
                        )}
                        <Button 
                            onClick={handleCreate}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Module
                        </Button>
                    </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <DataTable
                        columns={columns}
                        data={modules}
                        searchColumn="title"
                        searchPlaceholder="Search modules..."
                    />
                </div>

                <CrudModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    title={editingModule ? 'Edit Module' : 'Create New Module'}
                    description={editingModule ? 'Update module information.' : 'Add a new module to the course.'}
                    fields={dynamicFormFields}
                    initialData={data}
                    isLoading={processing}
                />
            </div>
        </AdminLayout>
    );
}
