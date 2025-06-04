
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { HeroSection } from '@/components/landing/hero-section';
import { HeadlineSection } from '@/components/landing/headline-section';
import { LearningSection } from '@/components/landing/learning-section';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Editor Amplifier - Belajar Editing Tingkat Tinggi">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800,900" rel="stylesheet" />
                <meta name="description" content="Tingkatkan views YouTube sampai 31% dengan teknik editing tingkat tinggi. Dibimbing dari 0 hingga menguasai software editing profesional." />
            </Head>
            
            <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden">
                {/* Navigation Header */}
                <header className="relative z-50 w-full p-6 lg:p-8">
                    <nav className="flex items-center justify-end gap-4 max-w-7xl mx-auto">
                        {auth.user ? (
                            <Link
                                href={route('member.index')}
                                className="group relative inline-flex items-center justify-center rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20"
                            >
                                <span className="relative z-10">Member Area</span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('login')}
                                    className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-foreground hover:scale-105"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="group relative inline-flex items-center justify-center rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20"
                                >
                                    <span className="relative z-10">Daftar</span>
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </Link>
                            </div>
                        )}
                    </nav>
                </header>

                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
                </div>

                {/* Main Content */}
                <main className="relative z-10">
                    <HeadlineSection />
                    <HeroSection />
                    <LearningSection />
                </main>

                {/* Floating particles animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-data-flow"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
