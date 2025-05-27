
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Users, BookOpen, PlayCircle } from 'lucide-react';

const adminNavItems = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Courses',
        href: '/admin/courses',
        icon: BookOpen,
    },
    {
        title: 'Modules',
        href: '/admin/modules',
        icon: PlayCircle,
    },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating" className="border-yellow-500/20">
            <SidebarHeader className="border-b border-yellow-500/20">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" className="text-yellow-400 hover:text-yellow-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-900 font-bold text-sm">EA</span>
                                    </div>
                                    <span className="font-semibold">Editor Amplifier</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="space-y-1">
                    {adminNavItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className="hover:bg-yellow-500/10 hover:text-yellow-400">
                                <Link href={item.href}>
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-yellow-500/20">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/dashboard" className="text-gray-400 hover:text-gray-300">
                                Back to App
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
