
import { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Rocket, CirclePercent } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageProps, Course } from '@/types';

interface MemberDashboardProps extends PageProps {
    courses: Course[];
}

function CourseCardSkeleton() {
    return (
        <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="aspect-video relative">
                <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-2 w-full" />
            </CardContent>
        </Card>
    );
}

function CourseCard({ course }: { course: Course }) {
    const progressColor = course.completion_percentage > 75 
        ? 'bg-primary' 
        : course.completion_percentage > 50 
        ? 'bg-yellow-500' 
        : 'bg-orange-500';

    return (
        <Card className={cn(
            "group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm",
            "hover:border-primary/50 hover:bg-card/70 hover:shadow-2xl hover:shadow-primary/10",
            "transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1",
            "cursor-pointer relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
            course.completion_percentage === 100 && "ring-1 ring-primary/30 animate-glow-pulse"
        )}>
            <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-secondary to-muted">
                {course.thumbnail ? (
                    <img 
                        src={course.thumbnail}
                        alt={course.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary to-muted">
                        <div className="text-center space-y-2">
                            <Rocket className="w-12 h-12 mx-auto text-primary/60" />
                            <div className="w-16 h-1 bg-primary/30 mx-auto rounded-full animate-pulse" />
                        </div>
                    </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Progress badge */}
                <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/70 text-white border-primary/30">
                        <CirclePercent className="w-3 h-3 mr-1" />
                        {course.completion_percentage}%
                    </Badge>
                </div>
            </div>
            
            <CardContent className="p-6 space-y-4">
                <div>
                    <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {course.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Rocket className="w-4 h-4" />
                            <span>{course.module_count} Modules</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                            <div className={cn("w-2 h-2 rounded-full", progressColor)} />
                            <span>
                                {course.completion_percentage === 100 
                                    ? 'Complete' 
                                    : course.completion_percentage === 0 
                                    ? 'Not Started' 
                                    : 'In Progress'
                                }
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Progress bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.completion_percentage}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                            className={cn(
                                "h-full transition-all duration-1000 rounded-full relative overflow-hidden",
                                progressColor,
                                course.completion_percentage > 0 && "animate-pulse"
                            )}
                            style={{ width: `${course.completion_percentage}%` }}
                        >
                            {course.completion_percentage > 0 && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-data-flow" />
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function MemberDashboard({ courses = [] }: MemberDashboardProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const filteredCourses = useMemo(() => {
        if (!searchQuery.trim()) return courses;
        
        return courses.filter(course =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [courses, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <Head title="Member Dashboard" />
            
            <AppLayout>
                <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-background via-primary/5 to-background border-b border-border/50">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
                        
                        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                            <div className="text-center space-y-4 animate-fade-in">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                                    <Rocket className="w-4 h-4" />
                                    <span>Learning Dashboard</span>
                                </div>
                                
                                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient-x">
                                    Your Learning Journey
                                </h1>
                                
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Continue your progress and explore new courses to advance your skills
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
                        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                            <div className="relative max-w-md mx-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="pl-10 pr-4 py-3 bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl text-base backdrop-blur-sm"
                                />
                                {searchQuery && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <Badge variant="outline" className="text-xs">
                                            {filteredCourses.length} found
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <CourseCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <div className="text-center py-16 space-y-4">
                                <div className="w-24 h-24 mx-auto bg-secondary/20 rounded-full flex items-center justify-center">
                                    <Search className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    {searchQuery ? 'No courses found' : 'No courses available'}
                                </h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    {searchQuery 
                                        ? `No courses match "${searchQuery}". Try a different search term.`
                                        : 'There are no courses available at the moment. Check back later!'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in">
                                {filteredCourses.map((course, index) => (
                                    <div 
                                        key={course.id}
                                        style={{ 
                                            animationDelay: `${index * 100}ms`,
                                            animationFillMode: 'both'
                                        }}
                                        className="animate-fade-in"
                                    >
                                        <CourseCard course={course} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
