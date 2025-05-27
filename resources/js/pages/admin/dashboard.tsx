
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Play, TrendingUp } from 'lucide-react';

interface AdminDashboardProps {
    stats: {
        total_users: number;
        total_courses: number;
        total_modules: number;
        active_courses: number;
    };
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
    const breadcrumbs = [
        { label: 'Admin', href: '/admin' },
        { label: 'Dashboard' }
    ];

    const statCards = [
        {
            title: 'Total Users',
            value: stats.total_users,
            icon: Users,
            color: 'text-yellow-400'
        },
        {
            title: 'Total Courses',
            value: stats.total_courses,
            icon: BookOpen,
            color: 'text-yellow-400'
        },
        {
            title: 'Total Modules',
            value: stats.total_modules,
            icon: Play,
            color: 'text-yellow-400'
        },
        {
            title: 'Active Courses',
            value: stats.active_courses,
            icon: TrendingUp,
            color: 'text-green-400'
        }
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            <div className="p-6 space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage your e-course platform</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                                        <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-lg bg-zinc-800 ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <a href="/admin/courses" className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group">
                                    <BookOpen className="w-5 h-5 text-yellow-400" />
                                    <span className="text-white group-hover:text-yellow-400 transition-colors">Manage Courses</span>
                                </a>
                                <a href="/admin/users" className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group">
                                    <Users className="w-5 h-5 text-yellow-400" />
                                    <span className="text-white group-hover:text-yellow-400 transition-colors">Manage Users</span>
                                </a>
                                <a href="/admin/modules" className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group">
                                    <Play className="w-5 h-5 text-yellow-400" />
                                    <span className="text-white group-hover:text-yellow-400 transition-colors">Manage Modules</span>
                                </a>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-gray-300">New course created</span>
                                    <Badge variant="secondary" className="ml-auto">2 min ago</Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <span className="text-gray-300">Module updated</span>
                                    <Badge variant="secondary" className="ml-auto">5 min ago</Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span className="text-gray-300">User registered</span>
                                    <Badge variant="secondary" className="ml-auto">10 min ago</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
