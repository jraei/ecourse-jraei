import AppLogo from '@/components/app-logo';
import { CurriculumSection } from '@/components/landing/curriculum-section';
import { FaqSection } from '@/components/landing/faq-section';
import { HeroBadge } from '@/components/landing/hero-badge';
import { LearningBenefits } from '@/components/landing/learning-benefits';
import { MentorProfile } from '@/components/landing/mentor-profile';
import { PricingSection } from '@/components/landing/pricing-section';
import { VideoResults } from '@/components/landing/video-results';
import { CtaButton } from '@/components/ui/cta-button';
import { VideoPlayer } from '@/components/video-player';
import { useAnalytics } from '@/hooks/use-analytics';
import { useDwellTime } from '@/hooks/use-dwell-time';
import { useScrollTracking } from '@/hooks/use-scroll-tracking';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Youtube } from 'lucide-react';
import { useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { trackVisit, trackEngagement } = useAnalytics();

    // Initialize tracking hooks
    useScrollTracking();
    const hasEngaged = useDwellTime(15000);

    // Track page visit on mount
    useEffect(() => {
        trackVisit();
    }, [trackVisit]);

    // Track CTA button click
    const handleCtaClick = () => {
        trackEngagement('cta_click', {
            button_text: 'Gabung sekarang',
            location: 'hero_section',
        });
    };

    return (
        <>
            <Head title="Editor Amplifier - Belajar Editing Tingkat Tinggi">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="from-background via-background to-secondary/10 min-h-screen bg-gradient-to-br">
                {/* Navigation */}
                <header className="border-border/50 bg-background/80 relative z-50 border-b backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AppLogo />
                            </div>

                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('member.index')}
                                        className="border-border/50 text-foreground hover:border-primary/30 hover:bg-card/50 inline-block rounded-lg border px-4 py-2 text-sm leading-normal transition-all duration-300"
                                    >
                                        Member area
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-muted-foreground hover:text-foreground inline-block rounded-lg px-4 py-2 text-sm leading-normal transition-colors duration-300"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="border-border/50 text-foreground hover:border-primary/30 hover:bg-card/50 inline-block rounded-lg border px-4 py-2 text-sm leading-normal transition-all duration-300"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Headline Section */}
                <section className="relative overflow-hidden pt-20 lg:pt-12">
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="space-y-8 text-center">
                            <div className="animate-fade-in">
                                <HeroBadge text="Premium Video Editing Course" />
                            </div>

                            <div className="animate-fade-in space-y-6" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                                <h1 className="text-foreground mx-auto max-w-5xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                                    <span className="block">Belajar Editing Tingkat Tinggi</span>
                                    <span className="mt-2 block">
                                        Dan Tingkatkan Views <span className="text-primary">Video</span>
                                    </span>
                                    <span className="from-primary via-primary/80 to-primary animate-gradient-x bg-gradient-to-r bg-clip-text text-transparent">
                                        Youtube Sebanyak 71%
                                    </span>
                                </h1>

                                <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed md:text-xl">
                                    Harga Early Access Berlaku Tanggal 9 Agustus 2025 - 16 Agustus 2025 Khusus Untuk 50 Orang Pertama
                                </p>
                            </div>

                            {/* <div className="animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                                <CtaButton variant="secondary" size="lg" className="group border-primary/50">
                                    Gabung sekarang
                                    <ArrowRight className="ms-2 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </CtaButton>
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* Hero Video Section */}
                <section className="relative py-8 lg:pt-12 lg:pb-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="space-y-12">
                            <div className="animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                                {/* <VideoPlayer /> */}
                                <VideoPlayer
                                    src="/storage/landing/heroVideo/video.mp4"
                                    title={'VSL - Belajar Editing Tingkat Tinggi'}
                                    className="aspect-video w-full lg:h-[600px]"
                                />
                            </div>

                            <div className="animate-fade-in text-center" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                                <Link href={route('register')} onClick={handleCtaClick}>
                                    <CtaButton variant="secondary" size="lg" className="group border-primary/50">
                                        <Youtube className="me-2 inline transition-transform duration-300 group-hover:scale-110" />
                                        Gabung sekarang
                                        <div className="bg-primary absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full" />
                                    </CtaButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Learning Benefits Section */}
                <section className="border-border/50 relative border-t py-16 lg:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
                            {/* Left column - Image (40%) */}
                            <div className="animate-fade-in lg:col-span-2" style={{ animationDelay: '1000ms', animationFillMode: 'both' }}>
                                <div className="relative">
                                    <div className="border-border/50 shadow-primary/10 aspect-[4/3] overflow-hidden rounded-2xl border shadow-2xl">
                                        <img
                                            src="/storage/landing/davinci.png"
                                            alt="DaVinci Resolve workspace"
                                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Floating elements */}
                                    <div className="bg-primary/10 border-primary/20 absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-full border backdrop-blur-sm" />
                                    <div
                                        className="bg-primary/5 border-primary/10 absolute -bottom-6 -left-6 h-16 w-16 animate-pulse rounded-full border backdrop-blur-sm"
                                        style={{ animationDelay: '1s' }}
                                    />
                                </div>
                            </div>

                            {/* Right column - Content (60%) */}
                            <div className="animate-fade-in lg:col-span-3" style={{ animationDelay: '1200ms', animationFillMode: 'both' }}>
                                <LearningBenefits />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Results Section */}
                <VideoResults />

                {/* Curriculum Section */}
                <CurriculumSection />

                {/* Mentor Profile Section */}
                <MentorProfile />

                {/* Pricing Section */}
                <PricingSection />

                {/* FAQ Section */}
                <FaqSection />

                {/* Footer */}
                <footer className="border-border/50 bg-card/30 relative border-t backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-4 flex items-center justify-center gap-3">
                                <div className="flex items-center justify-center rounded-lg">
                                    {/* <Youtube className="text-primary h-4 w-4" /> */}
                                    <AppLogo />
                                </div>
                                {/* <span className="text-foreground text-xl font-bold">Editor Amplifier</span> */}
                            </div>
                            <p className="text-muted-foreground text-sm">© 2024 Editor Amplifier. Tingkatkan skills video editing Anda.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
