import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, CirclePlay, Clock, Play, Star, Users } from 'lucide-react';
import { useState } from 'react';

interface CurriculumModule {
    id: string;
    number: number;
    title: string;
    videoCount: number;
    duration: string;
    description: string;
    thumbnail: string;
    topics: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    students: number;
}

const curriculumModules: CurriculumModule[] = [
    {
        id: '1',
        number: 1,
        title: 'DaVinci Resolve Fundamentals',
        videoCount: 12,
        duration: '2.5 jam',
        description:
            'Pelajari dasar-dasar DaVinci Resolve dari instalasi hingga navigasi workspace. Modul ini akan membekali Anda dengan fondasi kuat untuk editing profesional.',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        topics: ['Interface Overview', 'Project Setup', 'Media Import', 'Timeline Basics', 'Keyboard Shortcuts'],
        difficulty: 'Beginner',
        students: 15420,
    },
    {
        id: '2',
        number: 2,
        title: 'Advanced Cutting & Assembly',
        videoCount: 18,
        duration: '4.2 jam',
        description: 'Teknik cutting profesional, multicam editing, dan assembly workflow yang digunakan di industri film Hollywood.',
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop',
        topics: ['Multicam Sync', 'Advanced Trimming', 'J & L Cuts', 'Match Frame', 'Audio Sync'],
        difficulty: 'Intermediate',
        students: 12850,
    },
    {
        id: '3',
        number: 3,
        title: 'Color Grading Mastery',
        videoCount: 24,
        duration: '6.8 jam',
        description: 'Menguasai color grading tingkat Hollywood dengan teknik primary dan secondary correction, plus LUT management profesional.',
        thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',
        topics: ['Primary Correction', 'Secondary Grading', 'LUT Application', 'Skin Tone Correction', 'Creative Looks'],
        difficulty: 'Advanced',
        students: 9640,
    },
    {
        id: '4',
        number: 4,
        title: 'Motion Graphics & Animation',
        videoCount: 16,
        duration: '3.7 jam',
        description: 'Buat motion graphics yang memukau dengan Fusion. Dari text animation hingga complex compositing untuk hasil yang cinematic.',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        topics: ['Fusion Basics', 'Text Animation', 'Shape Animation', 'Particle Systems', 'Compositing'],
        difficulty: 'Advanced',
        students: 8320,
    },
    {
        id: '5',
        number: 5,
        title: 'Audio Post-Production',
        videoCount: 14,
        duration: '3.1 jam',
        description: 'Audio mixing, sound design, dan Fairlight workflow untuk menghasilkan audio berkualitas broadcast standard.',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
        topics: ['Audio Mixing', 'Sound Design', 'Noise Reduction', 'EQ & Compression', 'Surround Sound'],
        difficulty: 'Intermediate',
        students: 7890,
    },
    {
        id: '6',
        number: 6,
        title: 'Delivery & Export Optimization',
        videoCount: 8,
        duration: '1.8 jam',
        description: 'Optimasi export untuk berbagai platform dengan render settings yang tepat untuk YouTube, Instagram, dan platform lainnya.',
        thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
        topics: ['Render Settings', 'Platform Optimization', 'Batch Export', 'Quality Control', 'Archive Workflow'],
        difficulty: 'Beginner',
        students: 11250,
    },
];

const difficultyColors = {
    Beginner: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    Intermediate: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
    Advanced: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400',
};

interface CurriculumCardProps {
    module: CurriculumModule;
    delay: number;
}

function CurriculumCard({ module, delay }: CurriculumCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-2xl',
                'from-card/90 to-card/50 bg-gradient-to-br backdrop-blur-sm',
                'border-border/30 hover:border-primary/40 border',
                'transition-[transform,box-shadow] duration-700 hover:-translate-y-1 hover:scale-[1.01]',
                'hover:shadow-primary/10 hover:shadow-2xl',
                'animate-fade-in',
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            {/* Floating Number Badge */}
            <div className="absolute -top-1 -left-1 z-10">
                <div
                    className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-2xl',
                        'from-primary to-primary/80 bg-gradient-to-br',
                        'border-primary/30 shadow-primary/20 border shadow-lg',
                        'text-primary-foreground text-lg font-bold',
                        'transition-transform duration-300 group-hover:scale-110',
                    )}
                >
                    {module.number}
                </div>
            </div>

            <div className="p-6 md:flex md:gap-6">
                {/* Thumbnail Section */}
                <div className="mb-6 md:mb-0 md:w-2/5">
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                        {/* Loading skeleton */}
                        {!imageLoaded && <div className="from-muted/20 via-muted/10 to-muted/20 absolute inset-0 animate-pulse bg-gradient-to-r" />}

                        <img
                            src={module.thumbnail}
                            alt={module.title}
                            className={cn(
                                'h-full w-full object-cover transition-all duration-700',
                                'group-hover:scale-110',
                                imageLoaded ? 'opacity-100' : 'opacity-0',
                            )}
                            onLoad={() => setImageLoaded(true)}
                            loading="lazy"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Play Button */}
                        {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="bg-primary/90 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm">
                                <Play className="text-primary-foreground ml-0.5 h-5 w-5" fill="currentColor" />
                            </div>
                        </div> */}

                        {/* Stats Overlay */}
                        <div className="absolute right-3 bottom-3 left-3 flex justify-between">
                            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
                                <Play className="h-3 w-3 text-white/80" />
                                <span className="text-xs text-white/80">{module.videoCount} videos</span>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
                                <Clock className="h-3 w-3 text-white/80" />
                                <span className="text-xs text-white/80">{module.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4 md:w-3/5">
                    {/* Header */}
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors duration-300">
                                {module.title}
                            </h3>
                            <div
                                className={cn(
                                    'rounded-full border px-2 py-1 text-xs font-medium',
                                    'bg-gradient-to-r backdrop-blur-sm',
                                    difficultyColors[module.difficulty],
                                )}
                            >
                                {module.difficulty}
                            </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">{module.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="text-muted-foreground flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{module.students.toLocaleString()} siswa</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <span>4.9 rating</span>
                        </div>
                    </div>

                    {/* Expandable Topics */}
                    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-3">
                        <CollapsibleTrigger asChild>
                            <div
                                role="button"
                                tabIndex={0}
                                className="bg-muted/20 hover:bg-muted/30 flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left transition-colors"
                            >
                                <span className="text-foreground text-sm font-medium">
                                    <CirclePlay className="me-2 inline-block" />
                                    {module.topics.length} topik pembelajaran
                                </span>
                                {isOpen ? (
                                    <ChevronDown className="text-muted-foreground h-4 w-4 transition-transform duration-200" />
                                ) : (
                                    <ChevronRight className="text-muted-foreground h-4 w-4 transition-transform duration-200" />
                                )}
                            </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-2">
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {module.topics.map((topic, index) => (
                                    <div key={index} className="bg-card/50 flex items-center gap-2 rounded-lg px-3 py-2 text-xs">
                                        <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                                        <span className="text-muted-foreground">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div
                className="from-primary/20 to-primary/20 absolute -inset-px rounded-2xl bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ pointerEvents: 'none' }}
            />
        </div>
    );
}

export function CurriculumSection() {
    const totalVideos = curriculumModules.reduce((sum, module) => sum + module.videoCount, 0);
    const totalDuration = curriculumModules.reduce((sum, module) => {
        const hours = parseFloat(module.duration.replace(' jam', ''));
        return sum + hours;
    }, 0);

    return (
        <section className="relative py-20 lg:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_50%)]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    {/* Section Header */}
                    <div className="space-y-6 text-center">
                        <div className="animate-fade-in">
                            <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                                <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                                <span className="text-primary text-sm font-medium">Kurikulum Komprehensif</span>
                            </div>
                        </div>

                        <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                            <h2 className="text-foreground text-4xl font-bold md:text-5xl lg:text-6xl">
                                <span className="block">Kurikulum Editing</span>
                                <span className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-transparent">
                                    Tingkat Professional
                                </span>
                            </h2>
                            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
                                Roadmap pembelajaran terstruktur dari basic hingga advanced, dirancang khusus untuk menghasilkan editor professional
                                dalam waktu singkat.
                            </p>
                        </div>

                        {/* Course Stats */}
                        <div className="animate-fade-in flex justify-center" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                            <div className="bg-card/30 border-border/30 inline-flex items-center gap-8 rounded-2xl border px-8 py-4 backdrop-blur-sm">
                                <div className="text-center">
                                    <div className="text-primary text-2xl font-bold">{curriculumModules.length}</div>
                                    <div className="text-muted-foreground text-xs">Modul</div>
                                </div>
                                <div className="bg-border/30 h-8 w-px" />
                                <div className="text-center">
                                    <div className="text-primary text-2xl font-bold">{totalVideos}</div>
                                    <div className="text-muted-foreground text-xs">Video</div>
                                </div>
                                <div className="bg-border/30 h-8 w-px" />
                                <div className="text-center">
                                    <div className="text-primary text-2xl font-bold">{totalDuration.toFixed(1)}h</div>
                                    <div className="text-muted-foreground text-xs">Durasi</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Curriculum Cards */}
                    <div className="space-y-8">
                        {curriculumModules.map((module, index) => (
                            <CurriculumCard key={module.id} module={module} delay={600 + index * 100} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="animate-fade-in space-y-6 text-center" style={{ animationDelay: '1400ms', animationFillMode: 'both' }}>
                        <div className="from-primary/10 via-primary/5 to-primary/10 border-primary/20 rounded-2xl border bg-gradient-to-r p-8 backdrop-blur-sm">
                            <h3 className="text-foreground mb-4 text-2xl font-bold">Siap Mulai Journey Editing Professional Anda?</h3>
                            <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
                                Bergabung dengan ribuan creator yang sudah mentransformasi skill editing mereka dan meningkatkan engagement video
                                hingga 300%.
                            </p>
                            <div className="text-muted-foreground flex items-center justify-center gap-4 text-sm">
                                <span>✓ Akses seumur hidup</span>
                                <span>✓ Update konten gratis</span>
                                <span>✓ Komunitas eksklusif</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
