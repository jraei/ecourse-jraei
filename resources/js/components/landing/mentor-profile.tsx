
import { useState } from 'react';
import { CheckCircle, Award, Users, Play, Youtube, Instagram, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Credential {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    verified: boolean;
}

interface Achievement {
    id: string;
    image: string;
    title: string;
    description: string;
}

const credentials: Credential[] = [
    {
        id: '1',
        title: 'Professional Video Editor',
        description: '8+ tahun pengalaman di industri kreatif',
        icon: <Award className="h-5 w-5" />,
        verified: true
    },
    {
        id: '2',
        title: 'DaVinci Resolve Certified Trainer',
        description: 'Tersertifikasi langsung dari Blackmagic Design',
        icon: <CheckCircle className="h-5 w-5" />,
        verified: true
    },
    {
        id: '3',
        title: '50,000+ Students Taught',
        description: 'Telah mengajar lebih dari 50,000 siswa worldwide',
        icon: <Users className="h-5 w-5" />,
        verified: true
    },
    {
        id: '4',
        title: 'Content Creator',
        description: '2M+ total views di platform YouTube',
        icon: <TrendingUp className="h-5 w-5" />,
        verified: true
    }
];

const achievements: Achievement[] = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
        title: 'Hollywood Project',
        description: 'Color grading for indie film'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop',
        title: 'Netflix Series',
        description: 'Post-production supervisor'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        title: 'Music Video',
        description: 'Grammy nominated artist'
    },
    {
        id: '4',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
        title: 'Commercial Work',
        description: 'Fortune 500 companies'
    },
    {
        id: '5',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop',
        title: 'Documentary',
        description: 'Award winning documentary'
    },
    {
        id: '6',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        title: 'Training Content',
        description: 'Educational video series'
    }
];

interface CredentialItemProps {
    credential: Credential;
    delay: number;
}

function CredentialItem({ credential, delay }: CredentialItemProps) {
    return (
        <div
            className={cn(
                'group flex items-start gap-4 rounded-xl p-4',
                'bg-gradient-to-r from-card/40 to-card/20 backdrop-blur-sm',
                'border border-border/30 hover:border-primary/40',
                'transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10',
                'animate-fade-in cursor-pointer'
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <div className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full shrink-0',
                'bg-primary/10 border border-primary/20 text-primary',
                'group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-110',
                'transition-all duration-300'
            )}>
                {credential.icon}
            </div>
            
            <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {credential.title}
                    </h4>
                    {credential.verified && (
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/20 border border-primary/30">
                            <CheckCircle className="h-3 w-3 text-primary" />
                        </div>
                    )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {credential.description}
                </p>
            </div>
        </div>
    );
}

interface AchievementImageProps {
    achievement: Achievement;
    delay: number;
}

function AchievementImage({ achievement, delay }: AchievementImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-xl',
                'bg-card/30 border border-border/30 hover:border-primary/40',
                'transition-all duration-500 hover:scale-105 hover:-translate-y-1',
                'hover:shadow-xl hover:shadow-primary/10',
                'animate-fade-in cursor-pointer'
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                {/* Loading skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 animate-pulse" />
                )}
                
                <img
                    src={achievement.image}
                    alt={achievement.title}
                    className={cn(
                        'h-full w-full object-cover transition-all duration-700',
                        'group-hover:scale-110',
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h4 className="font-semibold text-white mb-1">{achievement.title}</h4>
                    <p className="text-xs text-white/80">{achievement.description}</p>
                </div>

                {/* Play Icon Overlay */}
                <div className={cn(
                    'absolute inset-0 flex items-center justify-center',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                )}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm border border-primary/30">
                        <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MentorProfile() {
    const [profileImageLoaded, setProfileImageLoaded] = useState(false);

    return (
        <section className="relative py-20 lg:py-32">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="text-center space-y-6">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 backdrop-blur-sm">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm font-medium text-primary">Meet Your Mentor</span>
                            </div>
                        </div>

                        <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                                <span className="block">Belajar dari</span>
                                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                                    Expert Professional
                                </span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Dipandu langsung oleh professional editor dengan pengalaman Hollywood dan portfolio 
                                internasional yang telah dipercaya oleh brand-brand ternama dunia.
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left Side - Profile */}
                        <div className="space-y-8">
                            {/* Profile Image with Depth Effect */}
                            <div className="animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                                <div className="relative">
                                    {/* Background Glow */}
                                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-2xl rounded-full" />
                                    
                                    {/* Main Image Container */}
                                    <div className="relative">
                                        <div className={cn(
                                            'relative aspect-square overflow-hidden rounded-2xl',
                                            'bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm',
                                            'border-2 border-primary/20 shadow-2xl shadow-primary/10'
                                        )}>
                                            {/* Loading skeleton */}
                                            {!profileImageLoaded && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 animate-pulse" />
                                            )}
                                            
                                            <img
                                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop&crop=face"
                                                alt="Professional Video Editor"
                                                className={cn(
                                                    'h-full w-full object-cover transition-all duration-700',
                                                    'hover:scale-105',
                                                    profileImageLoaded ? 'opacity-100' : 'opacity-0'
                                                )}
                                                onLoad={() => setProfileImageLoaded(true)}
                                                loading="lazy"
                                            />

                                            {/* Subtle Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                        </div>

                                        {/* Floating Status Badge */}
                                        <div className="absolute -bottom-4 -right-4">
                                            <div className="flex items-center gap-2 rounded-full bg-primary border-2 border-primary/30 px-4 py-2 shadow-lg backdrop-blur-sm">
                                                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                                <span className="text-sm font-medium text-primary-foreground">Available</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Nameplate */}
                            <div className="animate-fade-in text-center space-y-4" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground mb-2">Sarah Johnson</h3>
                                    <p className="text-lg text-primary font-medium">Senior Video Editor & Trainer</p>
                                    <p className="text-muted-foreground">Hollywood | Netflix | YouTube</p>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex items-center gap-2 rounded-full bg-card/30 border border-border/30 px-3 py-2 backdrop-blur-sm">
                                        <Youtube className="h-4 w-4 text-red-500" />
                                        <span className="text-sm text-muted-foreground">2.1M subscribers</span>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-full bg-card/30 border border-border/30 px-3 py-2 backdrop-blur-sm">
                                        <Instagram className="h-4 w-4 text-pink-500" />
                                        <span className="text-sm text-muted-foreground">850K followers</span>
                                    </div>
                                </div>
                            </div>

                            {/* Credentials */}
                            <div className="animate-fade-in space-y-4" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                                <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Credentials & Achievements
                                </h4>
                                <div className="space-y-3">
                                    {credentials.map((credential, index) => (
                                        <CredentialItem
                                            key={credential.id}
                                            credential={credential}
                                            delay={1000 + index * 100}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Portfolio Grid */}
                        <div className="space-y-8">
                            <div className="animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'both' }}>
                                <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                    <Play className="h-5 w-5 text-primary" />
                                    Portfolio & Recent Works
                                </h4>
                            </div>

                            {/* Achievement Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {achievements.map((achievement, index) => (
                                    <AchievementImage
                                        key={achievement.id}
                                        achievement={achievement}
                                        delay={1400 + index * 100}
                                    />
                                ))}
                            </div>

                            {/* Trust Indicators */}
                            <div className="animate-fade-in space-y-6" style={{ animationDelay: '2000ms', animationFillMode: 'both' }}>
                                <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 p-6 backdrop-blur-sm">
                                    <h5 className="font-bold text-foreground mb-4">Mengapa Memilih Sarah?</h5>
                                    <div className="space-y-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                            <span>8+ tahun pengalaman di industri Hollywood & Netflix</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                            <span>50,000+ siswa telah berhasil menguasai editing professional</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                            <span>Tersertifikasi langsung dari Blackmagic Design</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                            <span>Portfolio internasional dengan brand Fortune 500</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Quote */}
                                <div className="relative rounded-2xl bg-card/30 border border-border/30 p-6 backdrop-blur-sm">
                                    <div className="absolute -top-2 -left-2 text-4xl text-primary/30 font-serif">"</div>
                                    <blockquote className="text-foreground italic leading-relaxed pl-6">
                                        Video editing bukan hanya tentang teknik, tapi tentang bercerita. 
                                        Saya akan mengajarkan Anda cara mengubah footage mentah menjadi 
                                        karya yang memukau dan memorable.
                                    </blockquote>
                                    <div className="mt-4 text-right">
                                        <cite className="text-sm text-muted-foreground not-italic">- Sarah Johnson</cite>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
