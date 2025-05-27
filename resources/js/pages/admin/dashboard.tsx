
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, PlayCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        {
            title: 'Total Users',
            value: '1,234',
            icon: Users,
            change: '+12%',
            changeType: 'positive' as const,
        },
        {
            title: 'Courses',
            value: '56',
            icon: BookOpen,
            change: '+3%',
            changeType: 'positive' as const,
        },
        {
            title: 'Modules',
            value: '234',
            icon: PlayCircle,
            change: '+8%',
            changeType: 'positive' as const,
        },
        {
            title: 'Completion Rate',
            value: '78%',
            icon: TrendingUp,
            change: '+5%',
            changeType: 'positive' as const,
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <Card key={stat.title} className="bg-gray-900 border-yellow-500/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-yellow-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <p className="text-xs text-green-400">
                                    {stat.change} from last month
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="bg-gray-900 border-yellow-500/30">
                    <CardHeader>
                        <CardTitle className="text-yellow-400">Welcome to Editor Amplifier Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300">
                            Manage your e-course platform with this futuristic admin interface. 
                            Navigate through users, courses, and modules using the sidebar.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
