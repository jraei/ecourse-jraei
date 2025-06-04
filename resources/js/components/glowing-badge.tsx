
import { cn } from '@/lib/utils';

interface GlowingBadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function GlowingBadge({ children, className }: GlowingBadgeProps) {
    return (
        <div className={cn(
            "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
            "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30",
            "backdrop-blur-sm shadow-lg animate-glow-pulse",
            "transition-all duration-300 hover:scale-105 hover:shadow-primary/25",
            className
        )}>
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            {children}
        </div>
    );
}
