
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GlowingBadge } from '@/components/glowing-badge';
import { VideoHero } from '@/components/video-hero';
import { FeatureListItem } from '@/components/feature-list-item';
import { MonitorPlay, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Editor Amplifier - Belajar Editing Video Tingkat Tinggi">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700&display=swap" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-background text-foreground overflow-hidden">
                {/* Navigation */}
                <header className="relative z-50 w-full border-b border-border/50 backdrop-blur-xl bg-background/80">
                    <div className="container mx-auto px-6 lg:px-8">
                        <nav className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-2">
                                <MonitorPlay className="w-8 h-8 text-primary" />
                                <span className="text-xl font-bold">Editor Amplifier</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link href={route('member.index')}>
                                        <Button variant="outline" size="sm">
                                            Member area
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')}>
                                            <Button variant="ghost" size="sm">
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button size="sm">
                                                Register
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Background Effects */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
                </div>

                <main className="relative z-10">
                    {/* Headline Section */}
                    <section className="pt-20 pb-16 px-6 lg:px-8">
                        <div className="container mx-auto text-center max-w-5xl">
                            <div className="animate-fade-in">
                                <GlowingBadge className="mb-8">
                                    🚀 Premium Video Editing Course
                                </GlowingBadge>
                                
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                                    Belajar Editing Tingkat Tinggi Dan{' '}
                                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                                        Tingkatkan Views Video Youtube Sebanyak 31%
                                    </span>
                                </h1>
                                
                                <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                                    Dibimbing dari 0 sampai menguasai software editing baru
                                </p>
                                
                                <Button 
                                    size="lg" 
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                                >
                                    Pelajari Lebih Dalam
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Hero Video Section */}
                    <section className="py-16 px-6 lg:px-8">
                        <div className="container mx-auto">
                            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                                <VideoHero />
                            </div>
                        </div>
                    </section>

                    {/* Kalian akan belajar Section */}
                    <section className="py-20 px-6 lg:px-8">
                        <div className="container mx-auto">
                            <div className="grid lg:grid-cols-5 gap-12 items-center">
                                {/* Left Column - Image */}
                                <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                                        <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                                            <CardContent className="p-0">
                                                <img
                                                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop"
                                                    alt="DaVinci Resolve Workspace"
                                                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                {/* Right Column - Content */}
                                <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                            <MonitorPlay className="w-6 h-6 text-primary" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold">
                                            Kalian akan belajar
                                        </h2>
                                    </div>
                                    
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-semibold text-foreground mb-3">
                                            DaVinci Resolve
                                        </h3>
                                        <p className="text-lg text-muted-foreground mb-2">
                                            Software editing video profesional yang digunakan di Hollywood
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Gratis, powerful, dan mudah dipelajari untuk pemula
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <FeatureListItem
                                            icon={DollarSign}
                                            title="Gratis"
                                            description="Tidak perlu membayar lisensi mahal"
                                        />
                                        <FeatureListItem
                                            icon={CheckCircle2}
                                            title="Fitur Lengkap"
                                            description="Color grading, visual effects, dan audio editing"
                                        />
                                        <FeatureListItem
                                            icon={ShieldCheck}
                                            title="Reliable"
                                            description="Digunakan oleh profesional di seluruh dunia"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Spacer for more sections */}
                    <div className="h-20" />
                </main>
            </div>
        </>
    );
}
