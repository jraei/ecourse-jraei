
import { AppShell } from '@/components/app-shell';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { type ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <AppShell variant="sidebar">
                <AdminSidebar />
                <SidebarInset>
                    <AdminHeader title={title} />
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </SidebarInset>
            </AppShell>
        </div>
    );
}
