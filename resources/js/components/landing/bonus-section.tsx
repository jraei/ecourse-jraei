import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CtaButton } from '@/components/ui/cta-button';
import { Clock, Gift, Play, Star, Trophy, Users, Zap } from 'lucide-react';

interface CourseItemProps {
    thumbnail: string;
    number: string;
    title: string;
    duration: string;
    description: string;
    delay?: number;
}

function CourseItem({ thumbnail, number, title, duration, description, delay = 0 }: CourseItemProps) {
    return (
        <div
            className={cn(
                'group flex items-start gap-4 rounded-xl p-4',
                'bg-card/20 border border-border/30 backdrop-blur-sm',
                'hover:bg-card/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
                'transition-all duration-500 hover:-translate-y-1',
                'animate-fade-in'
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0">
                <div className="aspect-video w-24 overflow-hidden rounded-lg border border-border/50 bg-muted/50 sm:w-32">
                    <img 
                        src={thumbnail} 
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Play className="h-6 w-6 text-white" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                    <span className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs font-bold">
                        {number}
                    </span>
                    <h4 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h4>
                </div>
                
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">{duration}</span>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

interface BonusCardProps {
    bonusNumber: string;
    title: string;
    value: string;
    description: string;
    image: string;
    delay?: number;
}

function BonusCard({ bonusNumber, title, value, description, image, delay = 0 }: BonusCardProps) {
    return (
        <Card 
            className={cn(
                'group relative overflow-hidden border-border/30 bg-card/20 backdrop-blur-sm',
                'hover:bg-card/40 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/20',
                'transition-all duration-500 hover:-translate-y-2',
                'animate-fade-in'
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {bonusNumber}
                    </Badge>
                    <Badge variant="outline" className="bg-accent/20 text-accent border-accent/50">
                        {value}
                    </Badge>
                </div>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg border border-border/50">
                    <img 
                        src={image} 
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
                
                <CardDescription className="text-muted-foreground leading-relaxed">
                    {description}
                </CardDescription>
                
                <CtaButton variant="secondary" size="default" className="w-full group border-primary/50">
                    <Zap className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Gabung Sekarang
                </CtaButton>
            </CardContent>
        </Card>
    );
}

export function BonusSection() {
    const courseItems = [
        {
            thumbnail: "/storage/landing/youtube-course/thumbnail-1.jpg",
            number: "01",
            title: "Full Course YouTube Fundamentals",
            duration: "1 jam 46 menit",
            description: "Pelajari dasar-dasar YouTube dari nol hingga mahir, termasuk setup channel yang optimal dan strategi awal."
        },
        {
            thumbnail: "/storage/landing/youtube-course/thumbnail-2.jpg", 
            number: "02",
            title: "Thumbnail Design Mastery",
            duration: "58 menit",
            description: "Rahasia membuat thumbnail yang eye-catching dan meningkatkan CTR hingga 300%."
        },
        {
            thumbnail: "/storage/landing/youtube-course/thumbnail-3.jpg",
            number: "03", 
            title: "Scriptwriting & Storytelling",
            duration: "1 jam 23 menit",
            description: "Teknik menulis script yang engaging dan storytelling yang membuat viewer tidak bisa skip video."
        },
        {
            thumbnail: "/storage/landing/youtube-course/thumbnail-4.jpg",
            number: "04",
            title: "YouTube Algorithm Secrets", 
            duration: "1 jam 12 menit",
            description: "Cara kerja algoritma YouTube 2024 dan strategi untuk mendapat lebih banyak views organik."
        }
    ];

    return (
        <>
            {/* Bonus Introduction */}
            <section className="relative py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12 text-center">
                        {/* Badge */}
                        <div className="animate-fade-in">
                            <div className="bg-accent/10 border-accent/30 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                                <Gift className="h-4 w-4 text-accent animate-pulse" />
                                <span className="text-accent text-sm font-medium">Additional Bonus</span>
                            </div>
                        </div>

                        {/* Headlines */}
                        <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                            <h2 className="text-foreground text-4xl font-bold md:text-5xl lg:text-6xl">
                                But wait... 
                                <span className="from-accent via-accent/80 to-accent bg-gradient-to-r bg-clip-text text-transparent">
                                    {' '}There's more!
                                </span>
                            </h2>
                            
                            <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl">
                                You'll get extra bonuses along with the main content. These bonuses will help you a lot on your editing journey.
                            </p>
                        </div>

                        {/* 2x2 Bonus Preview Grid */}
                        <div 
                            className="animate-fade-in mx-auto grid max-w-4xl grid-cols-2 gap-4 md:gap-6" 
                            style={{ animationDelay: '400ms', animationFillMode: 'both' }}
                        >
                            {[
                                { icon: Users, label: "YouTube Course", color: "text-red-400" },
                                { icon: Trophy, label: "Premium Templates", color: "text-yellow-400" },
                                { icon: Zap, label: "Exclusive Community", color: "text-blue-400" },
                                { icon: Star, label: "Lifetime Updates", color: "text-purple-400" }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'group flex flex-col items-center gap-3 rounded-2xl p-6',
                                        'bg-card/20 border border-border/30 backdrop-blur-sm',
                                        'hover:bg-card/40 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
                                        'transition-all duration-500 hover:-translate-y-2'
                                    )}
                                >
                                    <div className={cn(
                                        'flex h-12 w-12 items-center justify-center rounded-full',
                                        'bg-primary/10 border border-primary/20',
                                        'group-hover:bg-primary/20 group-hover:scale-110',
                                        'transition-all duration-300'
                                    )}>
                                        <item.icon className={cn('h-6 w-6', item.color)} />
                                    </div>
                                    <span className="text-foreground text-sm font-medium group-hover:text-primary transition-colors duration-300">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Bonus Content */}
            <section className="border-border/50 relative border-t py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16">
                        
                        {/* Bonus 1 - Complex Course List */}
                        <div className="animate-fade-in space-y-8" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                            <div className="text-center space-y-4">
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                                    Bonus 1
                                </Badge>
                                <h3 className="text-foreground text-3xl font-bold md:text-4xl">
                                    Full Course Value: For YouTubers Only
                                </h3>
                                <Badge variant="outline" className="bg-accent/20 text-accent border-accent/50 text-base px-4 py-2">
                                    Value Equivalent to: IDR 1,500,000
                                </Badge>
                                <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
                                    You will gain access to the Full Exclusive YouTube Course, which covers all aspects of YouTube, 
                                    from video ideas, thumbnails, hooks, scriptwriting, and more.
                                </p>
                            </div>
                            
                            <div className="mx-auto max-w-4xl space-y-4">
                                {courseItems.map((course, index) => (
                                    <CourseItem 
                                        key={index}
                                        {...course}
                                        delay={800 + (index * 100)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bonuses 2-4 */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <BonusCard
                                bonusNumber="Bonus 2"
                                title="Premium Video Templates Pack"
                                value="Equivalent to: Rp 750,000"
                                description="Koleksi template video premium yang siap pakai untuk berbagai jenis konten, menghemat waktu editing hingga 70%."
                                image="/storage/landing/bonus/templates.jpg"
                                delay={1200}
                            />
                            
                            <BonusCard
                                bonusNumber="Bonus 3"
                                title="Exclusive Community Access"
                                value="Equivalent to: Rp 500,000"
                                description="Akses ke komunitas ekslusif editor profesional, sharing tips, feedback, dan networking dengan sesama kreator."
                                image="/storage/landing/bonus/community.jpg"
                                delay={1400}
                            />
                            
                            <BonusCard
                                bonusNumber="Bonus 4"
                                title="Lifetime Course Updates"
                                value="Equivalent to: Rp 1,000,000"
                                description="Dapatkan update materi selamanya tanpa biaya tambahan, selalu up-to-date dengan trend dan teknologi terbaru."
                                image="/storage/landing/bonus/updates.jpg"
                                delay={1600}
                            />
                        </div>

                        {/* Total Value Box */}
                        <div 
                            className="animate-fade-in mx-auto max-w-2xl" 
                            style={{ animationDelay: '1800ms', animationFillMode: 'both' }}
                        >
                            <Card className="border-accent/50 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent shadow-2xl shadow-accent/20">
                                <CardHeader className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 border border-accent/30">
                                        <Trophy className="h-8 w-8 text-accent" />
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl text-foreground">
                                        Total Bonus Value
                                    </CardTitle>
                                </CardHeader>
                                
                                <CardContent className="text-center space-y-4">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground">Nilai total semua bonus yang Anda dapatkan:</p>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-accent text-2xl font-medium">Rp</span>
                                            <span className="text-foreground text-5xl font-bold tracking-tight lg:text-6xl">3.750.000</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            *Belum termasuk nilai course utama Editor Amplifier
                                        </p>
                                    </div>
                                    
                                    <div className="bg-primary/10 border-primary/20 rounded-lg border p-4">
                                        <p className="text-primary text-sm font-medium">
                                            🎯 Investasi Anda hari ini: Hanya Rp 294.000
                                        </p>
                                        <p className="text-muted-foreground text-xs mt-1">
                                            Hemat lebih dari 90% dari nilai sebenarnya!
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}