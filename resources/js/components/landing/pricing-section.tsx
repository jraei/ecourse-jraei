import { CtaButton } from '@/components/ui/cta-button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Check, Rocket, Star, Zap } from 'lucide-react';
import { useState } from 'react';

const benefits = [
    {
        title: '15+ Video Tutorial Lengkap',
        description: 'Tutorial step-by-step dari basic hingga advanced editing techniques',
    },
    {
        title: 'Template & Preset Premium',
        description: 'Akses ke library template dan preset senilai $500+ gratis',
    },
    {
        title: 'Private Community Access',
        description: 'Bergabung dengan 12,000+ video creator di komunitas eksklusif',
    },
    {
        title: 'Lifetime Updates',
        description: 'Dapatkan update materi terbaru selamanya tanpa biaya tambahan',
    },
    {
        title: 'Expert Mentoring Support',
        description: 'Konsultasi langsung dengan mentor profesional kapan saja',
    },
    {
        title: 'Certificate of Completion',
        description: 'Sertifikat resmi untuk portofolio dan karir Anda',
    },
];

interface BenefitItemProps {
    benefit: (typeof benefits)[0];
    index: number;
}

function BenefitItem({ benefit, index }: BenefitItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={cn(
                        'group flex items-start gap-4 rounded-xl p-4 transition-all duration-500',
                        'hover:bg-primary/5 hover:border-primary/20 border border-transparent',
                        'animate-fade-in cursor-pointer',
                    )}
                    style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'both' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-full',
                            'bg-primary/20 border-primary/50 flex-shrink-0 border-2',
                            'transition-all duration-300',
                            'group-hover:bg-primary/30 group-hover:border-primary',
                            'group-hover:shadow-primary/30 group-hover:shadow-lg',
                        )}
                    >
                        <Check className={cn('text-primary h-3 w-3 transition-all duration-300', isHovered && 'scale-110')} />
                    </div>
                    <div className="flex-1 space-y-1">
                        <h4 className="text-foreground group-hover:text-primary leading-tight font-medium transition-colors duration-300">
                            {benefit.title}
                        </h4>
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
                <p className="text-sm">{benefit.description}</p>
            </TooltipContent>
        </Tooltip>
    );
}

export function PricingSection() {
    const [isCardHovered, setIsCardHovered] = useState(false);

    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="via-primary/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
                <div className="bg-primary/10 absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="space-y-6 text-center">
                        <div className="animate-fade-in">
                            <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                                <Star className="text-primary h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
                                <span className="text-primary text-sm font-medium">Investasi Terbaik</span>
                            </div>
                        </div>

                        <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                            <h2 className="text-foreground text-4xl font-bold md:text-5xl lg:text-6xl">
                                <span className="block">Akses Selamanya</span>
                                <span className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-transparent">
                                    Harga Spesial
                                </span>
                            </h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                                Dapatkan akses lifetime ke semua materi premium dengan harga yang tidak akan pernah terulang lagi.
                            </p>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="animate-fade-in mx-auto max-w-2xl" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                        <div
                            className={cn(
                                'relative overflow-visible rounded-3xl',
                                'from-card/80 to-card/40 bg-gradient-to-br backdrop-blur-sm',
                                'border-2 transition-all duration-700',
                                isCardHovered
                                    ? 'border-primary/60 shadow-primary/30 scale-[1.02] shadow-2xl'
                                    : 'border-primary/30 shadow-primary/20 shadow-xl',
                            )}
                            onMouseEnter={() => setIsCardHovered(true)}
                            onMouseLeave={() => setIsCardHovered(false)}
                        >
                            {/* Animated Background Glow */}
                            <div
                                className={cn(
                                    'from-primary/20 via-primary/10 to-primary/20 absolute inset-0 bg-gradient-to-r',
                                    'opacity-0 transition-opacity duration-700',
                                    isCardHovered && 'animate-gradient-x opacity-100',
                                )}
                            />

                            {/* Lifetime Badge */}
                            <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                                <div className="bg-primary text-primary-foreground shadow-primary/40 rounded-full px-2 py-2 text-sm font-bold shadow-lg sm:px-4 lg:px-6">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        LIFETIME ACCESS
                                    </div>
                                </div>
                            </div>

                            <div className="relative space-y-8 p-8 lg:p-12">
                                {/* Price Display */}
                                <div className="space-y-4 text-center">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-muted-foreground text-2xl line-through">Rp 2.999.000</span>
                                            <span className="bg-destructive/20 text-destructive rounded-md px-2 py-1 text-sm font-medium">-83%</span>
                                        </div>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-primary text-2xl font-medium">Rp</span>
                                            <span className="text-foreground text-6xl font-bold tracking-tight lg:text-7xl">499.000</span>
                                        </div>
                                        <p className="text-muted-foreground text-lg">Akses selamanya • Tanpa biaya bulanan</p>
                                    </div>
                                </div>

                                {/* Benefits Grid */}
                                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                                    {benefits.map((benefit, index) => (
                                        <BenefitItem key={benefit.title} benefit={benefit} index={index} />
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className="space-y-4 text-center">
                                    <CtaButton
                                        variant="primary"
                                        size="lg"
                                        className={cn(
                                            'relative w-full overflow-hidden px-16 lg:w-auto',
                                            'shadow-primary/40 hover:shadow-primary/60 shadow-2xl',
                                            'animate-glow-pulse',
                                        )}
                                    >
                                        Join Sekarang
                                        <Rocket className="ms-2 inline h-5 w-5" />
                                        <div className="bg-primary absolute top-0 right-0 h-3 w-3 animate-ping rounded-full" />
                                    </CtaButton>

                                    <div className="text-muted-foreground flex items-center justify-center gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Check className="text-primary h-4 w-4" />
                                            30-day money back
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="text-primary h-4 w-4" />
                                            Instant access
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Glow Effects */}
                            <div className="bg-primary/20 absolute top-0 left-0 h-32 w-32 -translate-x-16 -translate-y-16 rounded-full blur-2xl" />
                            <div
                                className="bg-primary/20 absolute right-0 bottom-0 h-32 w-32 translate-x-16 translate-y-16 rounded-full blur-2xl"
                                style={{ animationDelay: '1s' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
