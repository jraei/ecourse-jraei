
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/icon';
import { type Module } from '@/types';
import { Link } from '@inertiajs/react';
import { Play, Check, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleNavigationProps {
    modules: Module[];
    currentModule: Module;
    previousModule?: Module;
    nextModule?: Module;
    courseProgress: number;
}

export function ModuleNavigation({ 
    modules, 
    currentModule, 
    previousModule, 
    nextModule, 
    courseProgress 
}: ModuleNavigationProps) {
    const completedModules = modules.filter(m => m.is_completed).length;

    return (
        <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Course Progress</h3>
                    <span className="text-yellow-500 font-medium">{courseProgress}%</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 ease-out relative"
                        style={{ width: `${courseProgress}%` }}
                    >
                        <div className="absolute inset-0 bg-yellow-400 animate-pulse opacity-50"></div>
                    </div>
                </div>
                
                <div className="flex justify-between mt-3 text-sm text-gray-400">
                    <span>{completedModules} of {modules.length} modules completed</span>
                    <span>{modules.length - completedModules} remaining</span>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-4">
                {previousModule ? (
                    <Link 
                        href={`/module/${previousModule.slug}`}
                        className="flex-1"
                    >
                        <Button 
                            variant="outline" 
                            className="w-full border-gray-600 bg-gray-800/50 hover:bg-gray-700 hover:border-yellow-500 transition-all group"
                        >
                            <Icon iconNode={ChevronLeft} className="w-4 h-4 mr-2 group-hover:text-yellow-500" />
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Previous</div>
                                <div className="text-sm font-medium truncate">{previousModule.name}</div>
                            </div>
                        </Button>
                    </Link>
                ) : (
                    <div className="flex-1"></div>
                )}

                {nextModule ? (
                    <Link 
                        href={`/module/${nextModule.slug}`}
                        className="flex-1"
                    >
                        <Button 
                            variant="outline" 
                            className="w-full border-gray-600 bg-gray-800/50 hover:bg-gray-700 hover:border-yellow-500 transition-all group"
                        >
                            <div className="text-right">
                                <div className="text-xs text-gray-400">Next</div>
                                <div className="text-sm font-medium truncate">{nextModule.name}</div>
                            </div>
                            <Icon iconNode={ChevronRight} className="w-4 h-4 ml-2 group-hover:text-yellow-500" />
                        </Button>
                    </Link>
                ) : (
                    <div className="flex-1"></div>
                )}
            </div>

            {/* Module List */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">All Modules</h3>
                <div className="space-y-3">
                    {modules.map((module, index) => (
                        <Link 
                            key={module.id} 
                            href={`/module/${module.slug}`}
                            className="block"
                        >
                            <Card className={cn(
                                "transition-all duration-300 hover:scale-[1.02] cursor-pointer group",
                                "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50",
                                module.id === currentModule.id 
                                    ? "border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20" 
                                    : "hover:border-gray-600",
                                module.is_completed && "border-green-500/50 bg-green-500/5"
                            )}>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        {/* Module Number */}
                                        <div className={cn(
                                            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                                            module.is_completed 
                                                ? "bg-green-500 text-white" 
                                                : module.id === currentModule.id
                                                    ? "bg-yellow-500 text-black"
                                                    : "bg-gray-600 text-gray-300 group-hover:bg-gray-500"
                                        )}>
                                            {module.is_completed ? (
                                                <Icon iconNode={Check} className="w-5 h-5" />
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>

                                        {/* Module Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className={cn(
                                                "font-medium text-sm mb-1 truncate",
                                                module.id === currentModule.id 
                                                    ? "text-yellow-500" 
                                                    : "text-white group-hover:text-gray-200"
                                            )}>
                                                {module.name}
                                            </h4>
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Icon iconNode={Clock} className="w-3 h-3" />
                                                    <span>{module.duration}</span>
                                                </div>
                                                {module.is_completed && (
                                                    <span className="text-green-400 font-medium">Completed</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Play Icon */}
                                        <div className={cn(
                                            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                            module.id === currentModule.id
                                                ? "bg-yellow-500 text-black"
                                                : "bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-white"
                                        )}>
                                            <Icon iconNode={Play} className="w-4 h-4" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
