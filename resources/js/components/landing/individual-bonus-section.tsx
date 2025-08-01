import { Badge } from '@/components/ui/badge';
import { CtaButton } from '@/components/ui/cta-button';
import { Link } from '@inertiajs/react';
import { CheckCircle, Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface BonusData {
    id: number;
    badge: string;
    title: string;
    value: string;
    description: string;
    image: string;
    features: string[];
}

interface IndividualBonusSectionProps {
    bonus: BonusData;
    index: number;
}

export function IndividualBonusSection({ bonus, index }: IndividualBonusSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const isEven = index % 2 === 0;

    return (
        <section
            ref={sectionRef}
            className={`relative overflow-hidden py-20 lg:py-32 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cosmic Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
            
            {/* Floating cosmic particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div 
                    className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 animate-float ${
                        isHovered ? 'bg-primary/20' : 'bg-primary/10'
                    }`}
                    style={{
                        top: '20%',
                        left: isEven ? '10%' : '70%',
                        animationDelay: `${index * 0.5}s`
                    }}
                />
                <div 
                    className={`absolute w-80 h-80 rounded-full blur-3xl transition-all duration-1000 animate-float ${
                        isHovered ? 'bg-accent/20' : 'bg-accent/10'
                    }`}
                    style={{
                        bottom: '20%',
                        right: isEven ? '10%' : '70%',
                        animationDelay: `${index * 0.7}s`,
                        animationDirection: 'reverse'
                    }}
                />
            </div>

            {/* Section Glow Effect */}
            <div 
                className={`absolute inset-0 transition-all duration-700 ${
                    isHovered 
                        ? 'shadow-[0_0_100px_rgba(217,165,20,0.3)] border-primary/20' 
                        : 'shadow-[0_0_50px_rgba(217,165,20,0.1)]'
                } rounded-3xl`}
                style={{
                    background: isHovered 
                        ? 'linear-gradient(135deg, rgba(217,165,20,0.05) 0%, transparent 50%, rgba(217,165,20,0.05) 100%)'
                        : 'transparent'
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`grid items-center gap-12 lg:gap-16 ${isEven ? 'lg:grid-cols-5' : 'lg:grid-cols-5'}`}>
                    
                    {/* Content Section */}
                    <div className={`space-y-8 lg:col-span-3 ${!isEven ? 'lg:order-2' : ''}`}>
                        
                        {/* Floating Bonus Badge */}
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-sm">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                                <span className="text-sm font-medium text-primary">{bonus.badge}</span>
                            </div>
                        </div>

                        {/* Bold Title */}
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                <span className="block text-foreground">{bonus.title.split(' ').slice(0, 2).join(' ')}</span>
                                <span className="mt-2 block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                                    {bonus.title.split(' ').slice(2).join(' ')}
                                </span>
                            </h2>

                            {/* Value Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 to-accent/20 px-6 py-3">
                                <Tag className="h-5 w-5 text-primary" />
                                <span className="font-bold text-primary">Value Senilai {bonus.value}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xl leading-relaxed text-muted-foreground max-w-2xl">
                            {bonus.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-3">
                            {bonus.features.map((feature, idx) => (
                                <div 
                                    key={idx} 
                                    className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-foreground font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-6">
                            <Link href={route('register')}>
                                <CtaButton 
                                    variant="primary" 
                                    size="lg" 
                                    className="group transform transition-all duration-300 hover:scale-105"
                                >
                                    <span className="relative z-10">Gabung Sekarang</span>
                                    
                                    {/* Button glow effect */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                                    
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full" />
                                </CtaButton>
                            </Link>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className={`lg:col-span-2 ${!isEven ? 'lg:order-1' : ''}`}>
                        <div className="group relative">
                            
                            {/* Image Container with Cosmic Glow */}
                            <div 
                                className={`relative overflow-hidden rounded-3xl transition-all duration-700 ${
                                    isHovered 
                                        ? 'shadow-2xl shadow-primary/30 scale-105' 
                                        : 'shadow-xl shadow-primary/10'
                                }`}
                            >
                                
                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-accent/30 p-[2px]">
                                    <div className="h-full w-full rounded-3xl bg-card/90 backdrop-blur-sm" />
                                </div>

                                {/* Main Image */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                                    <img
                                        src={`https://images.unsplash.com/${bonus.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
                                        alt={bonus.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    
                                    {/* Image Overlay with Cosmic Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-primary/10" />
                                    
                                    {/* Floating Value Badge on Image */}
                                    <div className="absolute top-6 right-6">
                                        <div className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-bold text-primary-foreground backdrop-blur-sm">
                                            {bonus.value}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}