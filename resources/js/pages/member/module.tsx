
import { Button } from '@/components/ui/button';
import { VideoPlayer } from '@/components/video-player';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type Module } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Clock, Play, ChevronRight, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface ModulePageProps {
    module: Module & {
        is_completed: boolean;
        duration: string;
        video_url: string;
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
            className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 ${
                module.is_current
                    ? 'border-primary/50 bg-gradient-to-r from-primary/10 to-yellow-400/5 shadow-lg shadow-primary/20'
                    : 'border-neutral-800/50 bg-gradient-to-r from-neutral-900/50 to-black/50 hover:border-primary/30'
            }`}
            onClick={visitModule}
        >
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-center space-x-4">
                {/* Play/Status Icon */}
                <div className="flex-shrink-0">
                    {module.is_completed ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-500/30 bg-green-500/20">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                    ) : module.is_current ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/20 animate-glow-pulse">
                            <Play className="h-5 w-5 text-primary ml-0.5" fill="currentColor" />
                        </div>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-800 group-hover:border-primary/50 transition-all duration-300">
                            <Play className="h-4 w-4 text-neutral-400 group-hover:text-primary ml-0.5" fill="currentColor" />
                        </div>
                    )}
                </div>

                {/* Module Info */}
                <div className="min-w-0 flex-1">
                    <h3 className={`truncate font-semibold transition-colors duration-300 ${
                        module.is_current ? 'text-primary' : 'text-white group-hover:text-primary'
                    }`}>
                        {module.name}
                    </h3>
                    <div className="mt-1 flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-neutral-400">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">{module.duration}</span>
                        </div>
                        {module.is_completed && <span className="text-xs font-medium text-green-400">Completed</span>}
                        {module.is_current && <span className="text-xs font-medium text-primary">Currently Playing</span>}
                    </div>
                </div>

                {/* Navigation Arrow */}
                <div className="flex-shrink-0">
                    <ChevronRight className={`h-5 w-5 transition-all duration-300 ${
                        module.is_current ? 'text-primary' : 'text-neutral-600 group-hover:text-primary group-hover:translate-x-1'
                    }`} />
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

    return (
        <AppHeaderLayout breadcrumbs={[
            { title: 'Courses', href: '/' },
            { title: module.course.name, href: route('member.course', { course: module.course.slug }) },
            { title: module.name }
        ]}>
            <Head title={`${module.name} - ${module.course.name}`} />

            <div className="min-h-screen bg-black">
                {/* Video Hero Section */}
                <div className="relative">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-1/4 h-32 w-32 animate-pulse rounded-full bg-primary/10 blur-3xl" />
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
                            <div className="flex items-center space-x-2 mb-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium text-primary">{module.course.name}</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                                    {module.name}
                                </span>
                            </h1>
                            <div className="flex items-center space-x-6 text-neutral-400">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{module.duration}</span>
                                </div>
                                {isCompleted && (
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
                                src={module.video_url}
                                title={module.name}
                                onProgress={handleVideoProgress}
                                onComplete={handleVideoComplete}
                                className="aspect-video w-full lg:h-[600px]"
                            />

                            {/* Completion Actions */}
                            {!isCompleted && videoProgress > 0 && (
                                <div className="absolute bottom-4 right-4">
                                    <Button
                                        onClick={markComplete}
                                        className="bg-primary/20 border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark Complete
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex justify-between items-center mb-12">
                            {prevModule ? (
                                <Button
                                    onClick={() => navigateToModule(prevModule.slug)}
                                    variant="outline"
                                    className="group border-neutral-700 bg-neutral-900/50 text-white hover:border-primary/50 hover:bg-primary/10"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                                    Previous: {prevModule.name}
                                </Button>
                            ) : (
                                <div />
                            )}

                            {nextModule && (
                                <Button
                                    onClick={() => navigateToModule(nextModule.slug)}
                                    className="group bg-primary/20 border border-primary/50 text-primary hover:bg-primary hover:text-black"
                                >
                                    Next: {nextModule.name}
                                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                                {module.course.modules.filter(m => m.is_completed).length} of {module.course.modules.length} modules completed
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
                                    className="h-full rounded-full bg-gradient-to-r from-primary to-yellow-400 via-yellow-400 animate-glow-pulse transition-all duration-1000"
                                    style={{ width: `${module.course.completion_percentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Modules List */}
                        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                            {module.course.modules.map((courseModule, index) => (
                                <div
                                    key={courseModule.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
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
