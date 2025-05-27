
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AdminHeaderProps {
    title?: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-yellow-500/20 bg-gray-900/50 px-4">
            <SidebarTrigger className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10" />
            {title && (
                <div className="flex items-center gap-2">
                    <div className="w-px h-6 bg-yellow-500/20" />
                    <h1 className="text-lg font-semibold text-yellow-400">{title}</h1>
                </div>
            )}
        </header>
    );
}
