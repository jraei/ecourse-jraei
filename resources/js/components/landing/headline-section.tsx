
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function HeadlineSection() {
    return (
        <section className="relative py-20 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                {/* Glowing Badge */}
                <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
                    <Badge 
                        variant="outline" 
                        className="relative px-6 py-2 text-sm font-medium bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-primary backdrop-blur-sm animate-glow-pulse"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl" />
                        <span className="relative z-10">🚀 Course Premium Video Editing</span>
                    </Badge>
                </div>

                {/* Main Headline */}
                <h1 className="relative mb-8 text-4xl sm:text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in delay-200">
                    <span className="block">Belajar Editing</span>
                    <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                        Tingkat Tinggi
                    </span>
                    <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2">
                        Dan Tingkatkan Views Video Youtube
                    </span>
                    <span className="inline-block mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary text-3xl sm:text-4xl lg:text-5xl font-bold">
                        Sebanyak 31%
                    </span>
                </h1>

                {/* Supporting Subheadline */}
                <p className="max-w-3xl mx-auto mb-12 text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-in delay-400">
                    Dibimbing dari 0 sampai menguasai software editing baru dengan teknik profesional yang terbukti meningkatkan engagement dan views secara signifikan
                </p>

                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-600">
                    <Button 
                        size="lg"
                        className="group relative min-w-[200px] h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-primary/40"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Pelajari Lebih Dalam
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-20 blur-xl" />
                    </Button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping delay-1000" />
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent rounded-full animate-ping delay-2000" />
            </div>
        </section>
    );
}
