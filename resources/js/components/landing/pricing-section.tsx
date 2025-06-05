
import { cn } from '@/lib/utils';
import { Check, Star, Zap } from 'lucide-react';
import { useState } from 'react';
import { CtaButton } from '@/components/ui/cta-button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    benefit: typeof benefits[0];
    index: number;
}

function BenefitItem({ benefit, index }: BenefitItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={cn(
                        'group flex items-start gap-4 p-4 rounded-xl transition-all duration-500',
                        'hover:bg-primary/5 hover:border-primary/20 border border-transparent',
                        'animate-fade-in cursor-pointer'
                    )}
                    style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'both' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-full',
                            'bg-primary/20 border-2 border-primary/50 flex-shrink-0',
                            'transition-all duration-300',
                            'group-hover:bg-primary/30 group-hover:border-primary',
                            'group-hover:shadow-lg group-hover:shadow-primary/30'
                        )}
                    >
                        <Check
                            className={cn(
                                'h-3 w-3 text-primary transition-all duration-300',
                                isHovered && 'scale-110'
                            )}
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <h4 className="text-foreground font-medium leading-tight group-hover:text-primary transition-colors duration-300">
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
        <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="via-primary/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="text-center space-y-6">
                        <div className="animate-fade-in">
                            <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                                <Star className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
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
                    <div
                        className="animate-fade-in mx-auto max-w-2xl"
                        style={{ animationDelay: '400ms', animationFillMode: 'both' }}
                    >
                        <div
                            className={cn(
                                'relative overflow-hidden rounded-3xl',
                                'from-card/80 to-card/40 bg-gradient-to-br backdrop-blur-sm',
                                'border-2 transition-all duration-700',
                                isCardHovered 
                                    ? 'border-primary/60 shadow-2xl shadow-primary/30 scale-[1.02]' 
                                    : 'border-primary/30 shadow-xl shadow-primary/20'
                            )}
                            onMouseEnter={() => setIsCardHovered(true)}
                            onMouseLeave={() => setIsCardHovered(false)}
                        >
                            {/* Animated Background Glow */}
                            <div
                                className={cn(
                                    'absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20',
                                    'opacity-0 transition-opacity duration-700',
                                    isCardHovered && 'opacity-100 animate-gradient-x'
                                )}
                            />

                            {/* Lifetime Badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-primary/40 animate-pulse">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        LIFETIME ACCESS
                                    </div>
                                </div>
                            </div>

                            <div className="relative p-8 lg:p-12 space-y-8">
                                {/* Price Display */}
                                <div className="text-center space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-muted-foreground line-through text-2xl">Rp 2.999.000</span>
                                            <span className="bg-destructive/20 text-destructive text-sm px-2 py-1 rounded-md font-medium">
                                                -83%
                                            </span>
                                        </div>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-primary text-2xl font-medium">Rp</span>
                                            <span className="text-foreground text-6xl lg:text-7xl font-bold tracking-tight">
                                                499.000
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-lg">
                                            Akses selamanya • Tanpa biaya bulanan
                                        </p>
                                    </div>
                                </div>

                                {/* Benefits Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    {benefits.map((benefit, index) => (
                                        <BenefitItem key={benefit.title} benefit={benefit} index={index} />
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className="text-center space-y-4">
                                    <CtaButton 
                                        variant="primary" 
                                        size="lg2" 
                                        className={cn(
                                            'w-full lg:w-auto px-16 relative overflow-hidden',
                                            'shadow-2xl shadow-primary/40 hover:shadow-primary/60',
                                            'animate-glow-pulse'
                                        )}
                                    >
                                        <Zap className="me-2 h-5 w-5" />
                                        Join Sekarang
                                        <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full animate-ping" />
                                    </CtaButton>
                                    
                                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" />
                                            30-day money back
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" />
                                            Instant access
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Glow Effects */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-x-16 -translate-y-16 animate-pulse" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl translate-x-16 translate-y-16 animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
