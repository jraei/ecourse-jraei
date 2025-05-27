
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, GraduationCap, PlayCircle, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: route('admin.dashboard'),
    },
];

export default function AdminDashboard() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-900 min-h-screen">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <div className="text-sm text-gray-400">Welcome to the administration panel</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Users</p>
                                <p className="text-2xl font-bold text-white">1,234</p>
                            </div>
                            <Users className="h-8 w-8 text-yellow-500" />
                        </div>
                        <p className="text-xs text-green-400 mt-2">↑ 12% from last month</p>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Active Courses</p>
                                <p className="text-2xl font-bold text-white">42</p>
                            </div>
                            <GraduationCap className="h-8 w-8 text-yellow-500" />
                        </div>
                        <p className="text-xs text-green-400 mt-2">↑ 5% from last month</p>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Modules</p>
                                <p className="text-2xl font-bold text-white">156</p>
                            </div>
                            <PlayCircle className="h-8 w-8 text-yellow-500" />
                        </div>
                        <p className="text-xs text-green-400 mt-2">↑ 8% from last month</p>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Revenue</p>
                                <p className="text-2xl font-bold text-white">$12,345</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-yellow-500" />
                        </div>
                        <p className="text-xs text-green-400 mt-2">↑ 15% from last month</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {[
                                { action: 'New user registered', time: '2 minutes ago', type: 'user' },
                                { action: 'Course "React Basics" published', time: '1 hour ago', type: 'course' },
                                { action: 'Module "Advanced Hooks" added', time: '3 hours ago', type: 'module' },
                                { action: 'User subscription upgraded', time: '5 hours ago', type: 'user' },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 text-sm">
                                    <div className={`w-2 h-2 rounded-full ${
                                        activity.type === 'user' ? 'bg-blue-500' :
                                        activity.type === 'course' ? 'bg-green-500' :
                                        'bg-yellow-500'
                                    }`} />
                                    <span className="text-gray-300 flex-1">{activity.action}</span>
                                    <span className="text-gray-500">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-3 px-4 rounded-lg transition-colors text-left">
                                Create New Course
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                                Add Module
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                                Manage Users
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-left">
                                View Reports
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
