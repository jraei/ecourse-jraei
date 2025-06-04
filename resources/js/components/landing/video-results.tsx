
import { useState } from 'react';
import { Play, Eye, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoResult {
    id: string;
    title: string;
    thumbnail: string;
    views: string;
    duration: string;
    description: string;
}

const videoResults: VideoResult[] = [
    {
        id: '1',
        title: 'Cinematic Color Grading Masterclass',
        thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop',
        views: '2.1M',
        duration: '12:45',
        description: 'Advanced color grading techniques used in Hollywood productions'
    },
    {
        id: '2',
        title: 'Motion Graphics & Text Animation',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop',
        views: '1.8M',
        duration: '15:32',
        description: 'Creating professional motion graphics and text animations'
    },
    {
        id: '3',
        title: 'Audio Mixing & Sound Design',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
        views: '1.5M',
        duration: '18:22',
        description: 'Professional audio editing and sound design techniques'
    },
    {
        id: '4',
        title: 'Advanced Transitions & Effects',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop',
        views: '2.3M',
        duration: '14:18',
        description: 'Seamless transitions and professional visual effects'
    },
    {
        id: '5',
        title: 'Multicam Editing Workflow',
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop',
        views: '1.2M',
        duration: '16:55',
        description: 'Professional multicamera editing workflow optimization'
    },
    {
        id: '6',
        title: 'Export Settings & Optimization',
        thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop',
        views: '980K',
        duration: '11:30',
        description: 'Optimal export settings for different platforms'
    }
];

interface VideoCardProps {
    video: VideoResult;
    delay: number;
}

function VideoCard({ video, delay }: VideoCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-2xl',
                'bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm',
                'border border-border/30 hover:border-primary/40',
                'transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2',
                'hover:shadow-2xl hover:shadow-primary/20',
                'animate-fade-in cursor-pointer'
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Video Thumbnail Container */}
            <div className="relative aspect-video overflow-hidden">
                {/* Loading skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 animate-pulse" />
                )}
                
                {/* Thumbnail Image */}
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={cn(
                        'h-full w-full object-cover transition-all duration-700',
                        'group-hover:scale-110',
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play Button with Glow Effect */}
                <div className={cn(
                    'absolute inset-0 flex items-center justify-center',
                    'transition-all duration-500',
                    isHovered ? 'opacity-100' : 'opacity-0'
                )}>
                    <div className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-full',
                        'bg-primary/90 backdrop-blur-sm',
                        'border-2 border-primary/50',
                        'transition-all duration-300',
                        'hover:scale-110 hover:bg-primary',
                        'shadow-2xl shadow-primary/40',
                        isHovered && 'animate-pulse'
                    )}>
                        <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                </div>

                {/* Video Stats */}
                <div className="absolute top-3 right-3 flex gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
                        <Eye className="h-3 w-3 text-white/80" />
                        <span className="text-xs text-white/80">{video.views}</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
                        <Clock className="h-3 w-3 text-white/80" />
                        <span className="text-xs text-white/80">{video.duration}</span>
                    </div>
                </div>

                {/* Animated Border Glow */}
                <div className={cn(
                    'absolute inset-0 rounded-2xl',
                    'bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    'animate-gradient-x'
                )} style={{ padding: '1px' }}>
                    <div className="h-full w-full rounded-2xl bg-card" />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-3">
                <h3 className={cn(
                    'font-semibold text-foreground leading-tight',
                    'group-hover:text-primary transition-colors duration-300',
                    'line-clamp-2'
                )}>
                    {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {video.description}
                </p>

                {/* Hover Action Bar */}
                <div className={cn(
                    'flex items-center justify-between pt-2',
                    'opacity-0 group-hover:opacity-100 transition-all duration-300',
                    'transform translate-y-2 group-hover:translate-y-0'
                )}>
                    <span className="text-xs text-primary font-medium">Watch Now</span>
                    <div className="h-px flex-1 mx-3 bg-gradient-to-r from-primary/30 to-transparent" />
                    <Play className="h-4 w-4 text-primary" />
                </div>
            </div>

            {/* Floating Glow Effect */}
            <div className={cn(
                'absolute -top-1 -right-1 h-6 w-6 rounded-full',
                'bg-primary/20 blur-lg',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                'animate-pulse'
            )} />
        </div>
    );
}

export function VideoResults() {
    return (
        <section className="relative py-20 lg:py-32">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="text-center space-y-6">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 backdrop-blur-sm">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm font-medium text-primary">Hasil Video Siswa</span>
                            </div>
                        </div>

                        <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                                <span className="block">Video Results dari</span>
                                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                                    Alumni Kami
                                </span>
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Lihat transformasi luar biasa dari video amatir menjadi konten berkualitas profesional 
                                setelah menguasai teknik editing tingkat tinggi.
                            </p>
                        </div>
                    </div>

                    {/* Video Grid */}
                    <div className={cn(
                        'grid gap-8',
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                        'animate-fade-in'
                    )} style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                        {videoResults.map((video, index) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                delay={600 + index * 100}
                            />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'both' }}>
                        <p className="text-muted-foreground mb-6">
                            Ingin hasil seperti ini? Bergabunglah dengan ribuan creator yang sudah merasakan transformasi.
                        </p>
                        <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 px-6 py-3 backdrop-blur-sm">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full bg-primary/20 border-2 border-primary/30" />
                                ))}
                            </div>
                            <span className="text-sm text-foreground">
                                <span className="font-semibold text-primary">12,000+</span> alumni sudah bergabung
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
