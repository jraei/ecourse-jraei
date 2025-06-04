
import { Card, CardContent } from '@/components/ui/card';
import { MoneyBackGuarantee, FeatureChecklist, ShieldCheck } from 'lucide-react';

const benefits = [
    {
        icon: MoneyBackGuarantee,
        title: "Gratis",
        description: "Akses selamanya tanpa biaya bulanan"
    },
    {
        icon: FeatureChecklist,
        title: "Fitur Lengkap",
        description: "Semua tools professional editing tersedia"
    },
    {
        icon: ShieldCheck,
        title: "Reliable",
        description: "Software stabil dengan performa tinggi"
    }
];

export function LearningSection() {
    return (
        <section className="relative py-20 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Image */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <Card className="group relative bg-gradient-to-br from-card/50 to-card/30 border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/20 to-secondary/40 overflow-hidden">
                                {/* DaVinci Resolve Workspace Mockup */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
                                    {/* Timeline */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gray-800 border-t border-primary/20">
                                        <div className="flex h-full">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="flex-1 border-r border-gray-600 relative">
                                                    <div className="absolute bottom-2 left-1 right-1 h-8 bg-gradient-to-r from-primary/60 to-accent/60 rounded" />
                                                    <div className="absolute top-2 left-1 right-1 h-4 bg-blue-500/40 rounded" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Preview Window */}
                                    <div className="absolute top-4 left-4 right-4 h-1/2 bg-black rounded border border-primary/20 flex items-center justify-center">
                                        <div className="text-primary/60 text-sm">Video Preview</div>
                                    </div>
                                    
                                    {/* Tools Panel */}
                                    <div className="absolute top-4 right-4 w-16 h-32 bg-gray-700 rounded border border-primary/20">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="w-8 h-8 m-2 bg-primary/20 rounded" />
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Overlay Label */}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                                    <span className="text-xs font-medium text-primary">DaVinci Resolve</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
                        {/* Section Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent" />
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    Kalian akan belajar
                                </h2>
                            </div>
                            
                            <div className="space-y-3">
                                <p className="text-lg lg:text-xl font-semibold text-foreground/90">
                                    Software Editing Professional Grade
                                </p>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    Menguasai DaVinci Resolve dari basic hingga advanced techniques yang digunakan oleh editor Hollywood
                                </p>
                            </div>
                        </div>

                        {/* Benefits List */}
                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <Card key={index} className="group p-6 bg-gradient-to-br from-card/30 to-card/10 border-border/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/40 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]">
                                    <CardContent className="p-0">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                                <benefit.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
