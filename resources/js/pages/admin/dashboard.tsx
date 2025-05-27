
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Play, TrendingUp, Zap, Activity } from 'lucide-react';

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
        { title: 'Admin', href: '/admin' },
        { title: 'Dashboard' }
    ];

    const statCards = [
        {
            title: 'Total Users',
            value: stats.total_users,
            icon: Users,
            color: 'from-cyan-400 to-blue-500',
            glow: 'shadow-cyan-500/20'
        },
        {
            title: 'Total Courses',
            value: stats.total_courses,
            icon: BookOpen,
            color: 'from-purple-400 to-pink-500',
            glow: 'shadow-purple-500/20'
        },
        {
            title: 'Total Modules',
            value: stats.total_modules,
            icon: Play,
            color: 'from-green-400 to-emerald-500',
            glow: 'shadow-green-500/20'
        },
        {
            title: 'Active Courses',
            value: stats.active_courses,
            icon: TrendingUp,
            color: 'from-yellow-400 to-orange-500',
            glow: 'shadow-yellow-500/20'
        }
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            <div className="p-6 space-y-8 relative">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Header with futuristic styling */}
                <div className="relative">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                            Command Center
                        </h1>
                        <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </div>
                    <p className="text-gray-400 ml-6 font-mono">SYSTEM STATUS: OPERATIONAL</p>
                </div>

                {/* Enhanced stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <Card key={index} className={`
                            bg-gradient-to-br from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 
                            border border-zinc-700/50 hover:border-cyan-400/50 
                            transition-all duration-500 hover:scale-105 
                            hover:shadow-2xl ${stat.glow} 
                            backdrop-blur-sm group cursor-pointer
                            animate-fade-in
                        `} style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="p-6 relative overflow-hidden">
                                {/* Card glow effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-300">
                                            {stat.value.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className={`
                                        p-4 rounded-xl bg-gradient-to-r ${stat.color} 
                                        group-hover:scale-110 transition-transform duration-300
                                        shadow-lg
                                    `}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                
                                {/* Progress indicator */}
                                <div className="mt-4 h-1 bg-zinc-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000`}
                                    ></div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Enhanced Quick Actions */}
                    <Card className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 border border-zinc-700/50 hover:border-cyan-400/30 transition-all duration-500 backdrop-blur-sm">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Activity className="w-6 h-6 text-cyan-400" />
                                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                                    Quick Actions
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { href: "/admin/courses", icon: BookOpen, label: "Manage Courses", color: "from-purple-500 to-pink-500" },
                                    { href: "/admin/users", icon: Users, label: "Manage Users", color: "from-blue-500 to-cyan-500" },
                                    { href: "/admin/modules", icon: Play, label: "Manage Modules", color: "from-green-500 to-emerald-500" }
                                ].map((action, index) => (
                                    <a 
                                        key={index}
                                        href={action.href} 
                                        className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-102"
                                    >
                                        <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                                            <action.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-white group-hover:text-cyan-200 transition-colors font-medium">{action.label}</span>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Enhanced Recent Activity */}
                    <Card className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 border border-zinc-700/50 hover:border-cyan-400/30 transition-all duration-500 backdrop-blur-sm">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                                    System Activity
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { status: "success", message: "New course created", time: "2 min ago", color: "green" },
                                    { status: "warning", message: "Module updated", time: "5 min ago", color: "yellow" },
                                    { status: "info", message: "User registered", time: "10 min ago", color: "blue" }
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/30 hover:bg-zinc-700/30 transition-colors border border-zinc-700/20">
                                        <div className={`w-3 h-3 bg-${activity.color}-400 rounded-full animate-pulse`}></div>
                                        <span className="text-gray-300 flex-1 font-mono text-sm">{activity.message}</span>
                                        <Badge variant="secondary" className="bg-zinc-700/50 text-gray-400 font-mono text-xs">
                                            {activity.time}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
