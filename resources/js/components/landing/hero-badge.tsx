
import { cn } from '@/lib/utils';
import { Rocket } from 'lucide-react';

interface HeroBadgeProps {
    text: string;
    className?: string;
}

export function HeroBadge({ text, className }: HeroBadgeProps) {
    return (
        <div className={cn(
            'bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
            'animate-glow-pulse hover:border-primary/40 transition-all duration-500',
            'backdrop-blur-sm shadow-lg shadow-primary/10',
            className
        )}>
            <Rocket className="h-4 w-4" />
            <span>{text}</span>
        </div>
    );
}
