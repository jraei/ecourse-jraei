
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureListItemProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    className?: string;
}

export function FeatureListItem({ icon: Icon, title, description, className }: FeatureListItemProps) {
    return (
        <div className={cn(
            "group flex items-start space-x-4 p-4 rounded-xl",
            "bg-card/30 backdrop-blur-sm border border-border/50",
            "transition-all duration-300 hover:bg-card/50 hover:scale-[1.02]",
            "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
            "cursor-pointer",
            className
        )}>
            <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                </h4>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
