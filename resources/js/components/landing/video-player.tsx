
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import { useState } from 'react';

export function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative mx-auto max-w-6xl">
            <div className={cn(
                'relative aspect-video overflow-hidden rounded-2xl border border-border/50',
                'bg-gradient-to-br from-secondary via-muted to-secondary/50',
                'shadow-2xl shadow-primary/20 transition-all duration-700 hover:shadow-primary/30',
                'group'
            )}>
                {/* Video placeholder with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/30" />
                
                {/* Demo content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&fit=crop"
                        alt="Video editing demonstration"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>

                {/* Glass morphism play controls */}
                <div className={cn(
                    'absolute inset-0 flex items-center justify-center',
                    'bg-black/20 backdrop-blur-sm transition-opacity duration-500',
                    isPlaying ? 'opacity-0' : 'opacity-100 group-hover:opacity-80'
                )}>
                    <button
                        onClick={togglePlay}
                        className={cn(
                            'flex h-20 w-20 items-center justify-center rounded-full',
                            'bg-primary/90 border border-primary/50 shadow-2xl shadow-primary/40',
                            'transition-all duration-300 hover:scale-110 hover:bg-primary',
                            'backdrop-blur-md group-hover:animate-pulse'
                        )}
                    >
                        {isPlaying ? (
                            <Pause className="h-8 w-8 text-primary-foreground ml-0" />
                        ) : (
                            <Play className="h-8 w-8 text-primary-foreground ml-1" />
                        )}
                    </button>
                </div>

                {/* Particle animation overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="animate-data-flow absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/30" />
                    <div className="animate-data-flow absolute top-3/4 right-1/4 h-1 w-1 rounded-full bg-primary/20" style={{ animationDelay: '1s' }} />
                    <div className="animate-data-flow absolute top-1/2 left-3/4 h-1.5 w-1.5 rounded-full bg-primary/25" style={{ animationDelay: '2s' }} />
                </div>
            </div>
        </div>
    );
}
