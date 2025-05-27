
import { DataTable } from '@/components/ui/data-table';
import { CrudModal } from '@/components/crud-modal';
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus, Edit, Trash2, ArrowUpDown } from 'lucide-react';
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
        title: 'Users',
        href: route('admin.users.index'),
    },
];

interface UsersIndexProps {
    users: User[];
}

const userFormFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'Enter full name' },
    { name: 'email', label: 'Email', type: 'email' as const, required: true, placeholder: 'Enter email address' },
    { name: 'password', label: 'Password', type: 'password' as const, placeholder: 'Enter password (leave blank to keep current)' },
];

export default function UsersIndex({ users }: UsersIndexProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<User | null>(null);
    const { data, setData, post, put, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleCreate = () => {
        setEditingUser(null);
        reset();
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
        });
        setIsModalOpen(true);
    };

    const handleDelete = (user: User) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const handleSubmit = (formData: Record<string, any>) => {
        if (editingUser) {
            put(route('admin.users.update', editingUser.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-gray-300 hover:text-yellow-400 p-0"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-medium text-white">{row.getValue('name')}</div>
            ),
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="text-gray-300 hover:text-yellow-400 p-0"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="text-gray-300">{row.getValue('email')}</div>
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
                const user = row.original;
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
                                onClick={() => handleEdit(user)}
                                className="text-gray-300 hover:bg-gray-700 hover:text-yellow-400 cursor-pointer"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onClick={() => handleDelete(user)}
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
            <Head title="Users Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-900 min-h-screen">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Users Management</h1>
                        <p className="text-gray-400 mt-1">Manage platform users and their permissions</p>
                    </div>
                    <Button 
                        onClick={handleCreate}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <DataTable
                        columns={columns}
                        data={users}
                        searchColumn="name"
                        searchPlaceholder="Search users..."
                    />
                </div>

                <CrudModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    title={editingUser ? 'Edit User' : 'Create New User'}
                    description={editingUser ? 'Update user information.' : 'Add a new user to the platform.'}
                    fields={userFormFields}
                    initialData={data}
                    isLoading={processing}
                />
            </div>
        </AdminLayout>
    );
}
