
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function VideoHero() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="max-w-6xl mx-auto relative group">
            {/* Video Container with Glass Morphism */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl border border-primary/20 shadow-2xl">
                {/* Placeholder Video */}
                <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center relative">
                    {/* Play/Pause Button with Glass Effect */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={cn(
                            "absolute z-10 flex items-center justify-center w-20 h-20 rounded-full",
                            "bg-black/20 backdrop-blur-md border border-white/20",
                            "transition-all duration-500 hover:scale-110 hover:bg-black/30",
                            "shadow-xl group-hover-glow",
                            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                        )}
                    >
                        {isPlaying ? (
                            <Pause className="w-8 h-8 text-white ml-0" />
                        ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                        )}
                    </button>

                    {/* Video Placeholder Content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                    <img
                        src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=675&fit=crop"
                        alt="Video Editing Demo"
                        className="w-full h-full object-cover opacity-80"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
            </div>

            {/* Secondary CTA with Particle Effect */}
            <div className="flex justify-center mt-8 relative">
                <div className="absolute inset-0 animate-data-flow opacity-20">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
                <Button
                    size="lg"
                    className="bg-secondary/80 backdrop-blur-sm border border-primary/30 hover:bg-secondary/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 relative z-10"
                >
                    Gabung sekarang
                </Button>
            </div>
        </div>
    );
}
