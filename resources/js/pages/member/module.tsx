import { Button } from '@/components/ui/button';
import { VideoPlayer } from '@/components/video-player';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type Module } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Clock, Play } from 'lucide-react';
import { useState } from 'react';

interface ModulePageProps {
    module: Module & {
        is_completed: boolean;
        duration: string;
        video_path: string;
        materials: {
            id: number;
            name: string;
            module_id: number;
            url: string;
            text: string;
        };
        course: {
            id: number;
            name: string;
            slug: string;
            description?: string;
            thumbnail?: string;
            completion_percentage: number;
            modules: (Module & {
                is_completed: boolean;
                duration: string;
                is_current: boolean;
            })[];
        };
    };
    prevModule?: { id: number; name: string; slug: string } | null;
    nextModule?: { id: number; name: string; slug: string } | null;
}

function ModuleCard({ module }: { module: ModulePageProps['module']['course']['modules'][0] }) {
    const visitModule = () => {
        router.get(route('member.module', { module: module.slug }));
    };

    return (
        <div
            className={`group hover:shadow-primary/10 relative cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:shadow-2xl ${
                module.is_current
                    ? 'border-primary/50 from-primary/10 shadow-primary/20 bg-gradient-to-r to-yellow-400/5 shadow-lg'
                    : 'hover:border-primary/30 border-neutral-800/50 bg-gradient-to-r from-neutral-900/50 to-black/50'
            }`}
            onClick={visitModule}
        >
            {/* Animated border effect */}
            <div className="from-primary/0 via-primary/5 to-primary/0 absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-center space-x-4">
                {/* Play/Status Icon */}
                <div className="flex-shrink-0">
                    {module.is_completed ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-500/30 bg-green-500/20">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                    ) : module.is_current ? (
                        <div className="border-primary/50 bg-primary/20 animate-glow-pulse flex h-10 w-10 items-center justify-center rounded-full border-2">
                            <Play className="text-primary ml-0.5 h-5 w-5" fill="currentColor" />
                        </div>
                    ) : (
                        <div className="group-hover:border-primary/50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-800 transition-all duration-300">
                            <Play className="group-hover:text-primary ml-0.5 h-4 w-4 text-neutral-400" fill="currentColor" />
                        </div>
                    )}
                </div>

                {/* Module Info */}
                <div className="min-w-0 flex-1">
                    <h3
                        className={`truncate font-semibold transition-colors duration-300 ${
                            module.is_current ? 'text-primary' : 'group-hover:text-primary text-white'
                        }`}
                    >
                        {module.name}
                    </h3>
                    <div className="mt-1 flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-neutral-400">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">{module.duration} min</span>
                        </div>
                        {module.is_completed == true && <span className="text-xs font-medium text-green-400">Completed</span>}
                        {module.is_current && <span className="text-primary text-xs font-medium">Currently Playing</span>}
                    </div>
                </div>

                {/* Navigation Arrow */}
                <div className="flex-shrink-0">
                    <ChevronRight
                        className={`h-5 w-5 transition-all duration-300 ${
                            module.is_current ? 'text-primary' : 'group-hover:text-primary text-neutral-600 group-hover:translate-x-1'
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}

export default function Module({ module, prevModule, nextModule }: ModulePageProps) {
    const [isCompleted, setIsCompleted] = useState(module.is_completed);
    const [videoProgress, setVideoProgress] = useState(0);

    const handleVideoProgress = (progress: number) => {
        setVideoProgress(progress);
    };

    const handleVideoComplete = () => {
        if (!isCompleted) {
            setIsCompleted(true);
            // Here you would typically make an API call to update completion status
            console.log('Module completed automatically');
        }
    };

    const markComplete = () => {
        setIsCompleted(true);
        // Here you would typically make an API call to update completion status
        console.log('Module marked complete manually');
    };

    const navigateToModule = (moduleSlug: string) => {
        router.get(route('member.module', { module: moduleSlug }));
    };

    const navigateToMaterials = (url: string) => {
        router.visit(url);
    };

    return (
        <AppHeaderLayout
            breadcrumbs={[
                { title: 'Courses', href: '/' },
                { title: module.course.name, href: route('member.course', { course: module.course.slug }) },
                { title: module.name },
            ]}
        >
            <Head title={`${module.name} - ${module.course.name}`} />

            <div className="min-h-screen overflow-hidden bg-black">
                {/* Video Hero Section */}
                <div className="relative">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="bg-primary/10 absolute top-20 left-1/4 h-32 w-32 animate-pulse rounded-full blur-3xl" />
                        <div
                            className="absolute right-1/3 bottom-10 h-24 w-24 animate-pulse rounded-full bg-cyan-500/10 blur-2xl"
                            style={{ animationDelay: '1s' }}
                        />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-12">
                        {/* Back Navigation */}
                        <div className="mb-6">
                            <Link href={route('member.course', { course: module.course.slug })}>
                                <Button variant="ghost" className="p-0 text-neutral-400 hover:text-white">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to {module.course.name}
                                </Button>
                            </Link>
                        </div>

                        {/* Module Header */}
                        <div className="mb-8">
                            <div className="mb-2 flex items-center space-x-2">
                                <BookOpen className="text-primary h-5 w-5" />
                                <span className="text-primary text-sm font-medium">{module.course.name}</span>
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                                <span className="from-primary animate-gradient-x bg-gradient-to-r to-yellow-400 bg-clip-text text-wrap text-transparent">
                                    {module.name}
                                </span>
                            </h1>
                            <div className="flex items-center space-x-6 text-neutral-400">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{module.duration} min</span>
                                </div>
                                {isCompleted == true && (
                                    <div className="flex items-center space-x-2 text-green-400">
                                        <CheckCircle className="h-4 w-4" />
                                        <span>Completed</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Video Player */}
                        <div className="relative mb-8">
                            <VideoPlayer
                                src={'/storage/' + module.video_path}
                                title={module.name}
                                onProgress={handleVideoProgress}
                                onComplete={handleVideoComplete}
                                className="aspect-video w-full lg:h-[600px]"
                            />

                            {/* Completion Actions */}
                            {!isCompleted && (
                                <div className="absolute top-4 right-4">
                                    <Button
                                        onClick={markComplete}
                                        className="bg-primary/20 border-primary/50 text-primary hover:bg-primary border text-xs transition-all duration-300 hover:text-black lg:text-sm"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark Complete
                                    </Button>
                                </div>
                            )}
                        </div>
                        {/* Navigation Controls */}
                        <div className="mb-12 flex items-center justify-between">
                            {prevModule ? (
                                <Button
                                    onClick={() => navigateToModule(prevModule.slug)}
                                    variant="outline"
                                    className="group hover:border-primary/50 hover:bg-primary/10 border-neutral-700 bg-neutral-900/50 text-wrap text-white"
                                >
                                    <ArrowLeft className="group-hover:text-primary mr-2 h-4 w-4 transition-colors" />
                                    Previous
                                </Button>
                            ) : (
                                <div />
                            )}

                            {nextModule && (
                                <Button
                                    onClick={() => navigateToModule(nextModule.slug)}
                                    className="group bg-primary/20 border-primary/50 text-primary hover:bg-primary border text-wrap hover:text-black"
                                >
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Course Modules Section */}
                <div className="mx-auto max-w-7xl px-4 pb-16">
                    <div className="space-y-8">
                        <div className="text-center lg:text-left">
                            <h2 className="mb-2 text-3xl font-bold text-white">Course Modules</h2>
                            <p className="text-neutral-400">
                                {module.course.modules.filter((m) => m.is_completed).length} of {module.course.modules.length} modules completed
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-white">Course Progress</span>
                                <span className="text-primary text-sm font-bold">{module.course.completion_percentage}%</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-800 backdrop-blur-sm">
                                <div
                                    className="from-primary animate-glow-pulse h-full rounded-full bg-gradient-to-r via-yellow-400 to-yellow-400 transition-all duration-1000"
                                    style={{ width: `${module.course.completion_percentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Modules List */}
                        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                            {module.course.modules.map((courseModule, index) => (
                                <div key={courseModule.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                    <ModuleCard module={courseModule} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
