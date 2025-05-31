
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head } from '@inertiajs/react';
import { type Course, type Module } from '@/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { Play, CheckCircle, ChevronDown, Clock, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface CoursePageProps {
    course: Course & {
        modules: (Module & {
            is_completed: boolean;
            duration: string;
        })[];
    };
}

function CourseMobileSidebar({ course }: { course: CoursePageProps['course'] }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    
    return (
        <div className="flex h-full flex-col bg-black">
            {/* Course Header */}
            <div className="relative p-6 pb-4">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800">
                    <img 
                        src={course.thumbnail} 
                        alt={course.name}
                        className="w-full h-32 object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-xs text-white font-medium">{course.completion_percentage}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Info */}
            <div className="px-6 pb-4">
                <h1 className="text-xl font-bold text-primary mb-2 leading-tight">{course.name}</h1>
                
                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-neutral-400">Progress</span>
                        <span className="text-sm font-medium text-primary">{course.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-primary via-yellow-400 to-primary rounded-full transition-all duration-700 animate-glow-pulse"
                            style={{ width: `${course.completion_percentage}%` }}
                        />
                    </div>
                </div>

                {/* Description */}
                {course.description && (
                    <div className="space-y-2">
                        <button
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            className="flex items-center justify-between w-full text-left"
                        >
                            <span className="text-sm font-medium text-neutral-300">About</span>
                            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${isDescriptionExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${isDescriptionExpanded ? 'max-h-96 opacity-100' : 'max-h-16 opacity-70'}`}>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {course.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Back to Dashboard */}
            <div className="mt-auto p-6">
                <Link href="/">
                    <Button variant="outline" className="w-full bg-neutral-900 border-neutral-700 hover:bg-neutral-800 text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Button>
                </Link>
            </div>
        </div>
    );
}

function ModuleCard({ module, index }: { module: CoursePageProps['course']['modules'][0]; index: number }) {
    return (
        <div className="group relative bg-gradient-to-r from-neutral-900/50 to-black/50 border border-neutral-800/50 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover-scale-102">
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center space-x-4">
                {/* Module Number */}
                <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        module.is_completed 
                            ? 'bg-green-500/20 text-green-400 border-2 border-green-500/30' 
                            : 'bg-neutral-800 text-neutral-400 border-2 border-neutral-700 group-hover:border-primary/50'
                    }`}>
                        {module.is_completed ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <span>{index + 1}</span>
                        )}
                    </div>
                </div>

                {/* Module Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors duration-300 truncate">
                        {module.name}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1 text-neutral-400">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{module.duration}</span>
                        </div>
                        {module.is_completed && (
                            <span className="text-xs text-green-400 font-medium">Completed</span>
                        )}
                    </div>
                </div>

                {/* Play Button */}
                <div className="flex-shrink-0">
                    <button className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-black hover:scale-110 group-hover:animate-glow-pulse">
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Course({ course }: CoursePageProps) {
    const [openModules, setOpenModules] = useState<number[]>([0]); // First module open by default

    const toggleModule = (moduleIndex: number) => {
        setOpenModules(prev => 
            prev.includes(moduleIndex) 
                ? prev.filter(i => i !== moduleIndex)
                : [...prev, moduleIndex]
        );
    };

    // Group modules into sections (for demo purposes, grouping every 3-4 modules)
    const moduleSections = course.modules.reduce((sections: any[], module, index) => {
        const sectionIndex = Math.floor(index / 4);
        if (!sections[sectionIndex]) {
            sections[sectionIndex] = {
                title: `Section ${sectionIndex + 1}`,
                modules: []
            };
        }
        sections[sectionIndex].modules.push({ ...module, originalIndex: index });
        return sections;
    }, []);

    const mobileSidebarContent = <CourseMobileSidebar course={course} />;

    return (
        <AppHeaderLayout 
            mobileSidebarContent={mobileSidebarContent}
            breadcrumbs={[
                { title: 'Courses', href: '/' },
                { title: course.name }
            ]}
        >
            <Head title={course.name} />
            
            <div className="min-h-screen bg-black">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                    
                    <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-12 md:pt-16 md:pb-20">
                        <div className="lg:hidden mb-6">
                            <Link href="/">
                                <Button variant="ghost" className="text-neutral-400 hover:text-white p-0">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Courses
                                </Button>
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Course Info */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="animate-fade-in">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                        <span className="bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent animate-gradient-x">
                                            {course.name}
                                        </span>
                                    </h1>
                                    
                                    {course.description && (
                                        <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl">
                                            {course.description}
                                        </p>
                                    )}
                                </div>

                                {/* Course Stats */}
                                <div className="flex flex-wrap gap-6 py-6 border-t border-b border-neutral-800">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">{course.modules.length}</div>
                                        <div className="text-sm text-neutral-400">Modules</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">{course.completion_percentage}%</div>
                                        <div className="text-sm text-neutral-400">Complete</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">{course.modules.filter(m => m.is_completed).length}</div>
                                        <div className="text-sm text-neutral-400">Finished</div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Thumbnail - Desktop Only */}
                            <div className="hidden lg:block">
                                <div className="sticky top-8">
                                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 group">
                                        <img 
                                            src={course.thumbnail} 
                                            alt={course.name}
                                            className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        
                                        {/* Progress Overlay */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-white font-medium">Progress</span>
                                                <span className="text-sm font-bold text-primary">{course.completion_percentage}%</span>
                                            </div>
                                            <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-primary via-yellow-400 to-primary rounded-full transition-all duration-1000 animate-glow-pulse"
                                                    style={{ width: `${course.completion_percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules Section */}
                <div className="mx-auto max-w-6xl px-4 pb-16">
                    <div className="space-y-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-white mb-2">Course Modules</h2>
                            <p className="text-neutral-400">Expand sections to view individual modules</p>
                        </div>

                        {/* Module Sections */}
                        <div className="space-y-4">
                            {moduleSections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="animate-fade-in" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
                                    <Collapsible 
                                        open={openModules.includes(sectionIndex)}
                                        onOpenChange={() => toggleModule(sectionIndex)}
                                    >
                                        <CollapsibleTrigger className="w-full group">
                                            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-neutral-900/80 to-black/80 border border-neutral-800 rounded-xl transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                                                        <span className="text-primary font-bold">{sectionIndex + 1}</span>
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                                                            {section.title}
                                                        </h3>
                                                        <p className="text-sm text-neutral-400">
                                                            {section.modules.length} modules • {section.modules.filter((m: any) => m.is_completed).length} completed
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`w-6 h-6 text-neutral-400 group-hover:text-primary transition-all duration-300 ${openModules.includes(sectionIndex) ? 'rotate-180' : ''}`} />
                                            </div>
                                        </CollapsibleTrigger>
                                        
                                        <CollapsibleContent className="overflow-hidden">
                                            <div className="mt-4 space-y-3 pl-6">
                                                {section.modules.map((module: any, moduleIndex: number) => (
                                                    <ModuleCard 
                                                        key={module.id} 
                                                        module={module} 
                                                        index={module.originalIndex}
                                                    />
                                                ))}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
