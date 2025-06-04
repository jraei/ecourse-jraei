
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="relative py-20 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Video Container */}
                <Card className="relative group bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {/* Video Placeholder */}
                    <div className="relative aspect-video bg-gradient-to-br from-secondary/20 to-secondary/40 flex items-center justify-center overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
                            <div className="grid grid-cols-12 gap-2 h-full opacity-20">
                                {[...Array(48)].map((_, i) => (
                                    <div key={i} className="bg-primary/10 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                        </div>
                        
                        {/* Play Button */}
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="group relative z-10 flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 backdrop-blur-sm border border-primary/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-20 animate-pulse" />
                            <div className="relative z-10 w-8 h-8 lg:w-10 lg:h-10 ml-1">
                                {isPlaying ? (
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-full bg-primary-foreground rounded" />
                                        <div className="w-1.5 h-full bg-primary-foreground rounded" />
                                    </div>
                                ) : (
                                    <div className="w-0 h-0 border-l-[12px] lg:border-l-[16px] border-l-primary-foreground border-y-[8px] lg:border-y-[12px] border-y-transparent" />
                                )}
                            </div>
                        </button>

                        {/* Video Info Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-foreground/80">Demo Professional Editing</span>
                            </div>
                            <div className="text-sm text-muted-foreground">02:31</div>
                        </div>
                    </div>

                    {/* Glass Morphism Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-gradient-to-r from-primary to-accent" />
                        </div>
                        <div className="w-1 h-1 bg-muted/50 rounded-full" />
                    </div>
                </Card>

                {/* Secondary CTA */}
                <div className="text-center mt-12">
                    <Button 
                        variant="outline"
                        size="lg"
                        className="group relative min-w-[180px] h-12 bg-transparent border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    >
                        <span className="flex items-center gap-2">
                            Gabung Sekarang
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Button>
                </div>

                {/* Floating Animation Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-bounce delay-1000" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full animate-bounce delay-2000" />
            </div>
        </section>
    );
}
