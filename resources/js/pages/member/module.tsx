
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoPlayer } from '@/components/video-player';
import { ModuleNavigation } from '@/components/module-navigation';
import { Icon } from '@/components/icon';
import { type Module, type Course, type PageProps } from '@/types';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { CheckCircle, Clock, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModulePageProps extends PageProps {
    module: Module & {
        course: Course;
        video_duration: number;
        video_path: string;
    };
    course: Course;
    modules: Module[];
    previousModule?: Module;
    nextModule?: Module;
    courseProgress: number;
}

export default function ModulePage({ 
    module, 
    course, 
    modules, 
    previousModule, 
    nextModule, 
    courseProgress 
}: ModulePageProps) {
    const [videoProgress, setVideoProgress] = useState(0);
    const [isManuallyCompleted, setIsManuallyCompleted] = useState(module.is_completed || false);

    const breadcrumbs = [
        { title: 'Courses', href: '/' },
        { title: course.name, href: `/course/${course.slug}` },
        { title: module.name }
    ];

    const handleVideoProgress = (currentTime: number, duration: number) => {
        const progress = (currentTime / duration) * 100;
        setVideoProgress(progress);
    };

    const handleVideoComplete = () => {
        if (!isManuallyCompleted) {
            setIsManuallyCompleted(true);
            // Here you would typically update the backend
            // router.patch(`/module/${module.id}/complete`);
        }
    };

    const handleManualComplete = () => {
        setIsManuallyCompleted(true);
        // Here you would typically update the backend
        // router.patch(`/module/${module.id}/complete`);
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={`${module.name} - ${course.name}`} />
            
            <div className="min-h-screen bg-black text-white">
                {/* Hero Section with Video */}
                <div className="relative">
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-black pointer-events-none"></div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 py-8">
                        {/* Module Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span className="text-yellow-500 text-sm font-medium uppercase tracking-wider">
                                    {course.name}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {module.name}
                            </h1>
                            
                            {/* Module Stats */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Icon iconNode={Clock} className="w-4 h-4 text-yellow-500" />
                                    <span>{module.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon iconNode={BookOpen} className="w-4 h-4 text-yellow-500" />
                                    <span>Module {modules.findIndex(m => m.id === module.id) + 1} of {modules.length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon iconNode={Users} className="w-4 h-4 text-yellow-500" />
                                    <span>Course Progress: {courseProgress}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Video Player */}
                        <div className="mb-8">
                            <VideoPlayer
                                src={module.video_path}
                                duration={module.video_duration}
                                isCompleted={isManuallyCompleted}
                                onProgress={handleVideoProgress}
                                onComplete={handleVideoComplete}
                                className="aspect-video w-full max-w-5xl mx-auto"
                            />
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                {/* Progress Indicator */}
                                <div className="flex items-center gap-3">
                                    <div className="relative w-16 h-16">
                                        <svg className="w-16 h-16 transform -rotate-90">
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                                className="text-gray-700"
                                            />
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                                strokeDasharray={`${2 * Math.PI * 28}`}
                                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - videoProgress / 100)}`}
                                                className="text-yellow-500 transition-all duration-300"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">
                                                {Math.round(videoProgress)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Video Progress</p>
                                        <p className="text-white font-medium">
                                            {Math.round(videoProgress)}% watched
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Completion Button */}
                            <Button
                                onClick={handleManualComplete}
                                disabled={isManuallyCompleted}
                                className={cn(
                                    "px-6 py-3 font-medium transition-all duration-300",
                                    isManuallyCompleted
                                        ? "bg-green-500 hover:bg-green-600 text-white"
                                        : "bg-yellow-500 hover:bg-yellow-400 text-black hover:shadow-lg hover:shadow-yellow-500/25"
                                )}
                            >
                                <Icon 
                                    iconNode={CheckCircle} 
                                    className="w-5 h-5 mr-2" 
                                />
                                {isManuallyCompleted ? 'Completed' : 'Mark Complete'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Module Content Section */}
                <div className="max-w-7xl mx-auto px-4 pb-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Module Description */}
                            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">About This Module</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 leading-relaxed">
                                        This comprehensive module covers advanced concepts and practical applications. 
                                        You'll learn industry best practices, explore real-world scenarios, and gain 
                                        hands-on experience with cutting-edge tools and techniques. Perfect for taking 
                                        your skills to the next level.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Learning Objectives */}
                            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">Learning Objectives</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[
                                            'Master core concepts and principles',
                                            'Apply knowledge to practical scenarios',
                                            'Develop problem-solving skills',
                                            'Build confidence in real-world applications'
                                        ].map((objective, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-black text-xs font-bold">{index + 1}</span>
                                                </div>
                                                <span className="text-gray-300">{objective}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Navigation Sidebar */}
                        <div className="lg:col-span-1">
                            <ModuleNavigation
                                modules={modules}
                                currentModule={module}
                                previousModule={previousModule}
                                nextModule={nextModule}
                                courseProgress={courseProgress}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
