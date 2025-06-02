
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';
import { 
    Play, 
    Pause, 
    Volume2, 
    VolumeX, 
    SkipBack, 
    SkipForward, 
    Maximize, 
    Settings,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
    src: string;
    duration: number;
    isCompleted: boolean;
    onProgress: (currentTime: number, duration: number) => void;
    onComplete: () => void;
    className?: string;
}

export function VideoPlayer({ 
    src, 
    duration, 
    isCompleted, 
    onProgress, 
    onComplete, 
    className 
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [quality, setQuality] = useState('auto');
    const [showSettings, setShowSettings] = useState(false);
    
    const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();

    // Format time helper
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Auto-hide controls
    const resetHideTimer = () => {
        setShowControls(true);
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
        hideControlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    // Play/Pause handler
    const togglePlayPause = () => {
        if (!videoRef.current) return;
        
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Skip functionality
    const skip = (seconds: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime += seconds;
    };

    // Volume controls
    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Video event handlers
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        
        setCurrentTime(current);
        onProgress(current, total);
        
        // Auto-complete at 95%
        if (current / total >= 0.95 && !isCompleted) {
            onComplete();
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    };

    // Progress bar click handler
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = percent * videoRef.current.duration;
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const progressPercent = videoRef.current ? (currentTime / videoRef.current.duration) * 100 : 0;

    return (
        <div 
            className={cn(
                "relative bg-black rounded-xl overflow-hidden group",
                "shadow-2xl border border-gray-800",
                "hover:shadow-yellow-500/20 transition-all duration-500",
                className
            )}
            onMouseMove={resetHideTimer}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlayPause}
                disablePictureInPicture
                controlsList="nodownload"
            />

            {/* Completion Badge */}
            {isCompleted && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 animate-fade-in">
                    <Icon iconNode={Check} className="w-4 h-4" />
                    Completed
                </div>
            )}

            {/* Center Play Button */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                        onClick={togglePlayPause}
                        size="lg"
                        className="w-20 h-20 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110"
                    >
                        <Icon iconNode={Play} className="w-8 h-8 ml-1" />
                    </Button>
                </div>
            )}

            {/* Controls Overlay */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent",
                "transition-opacity duration-300",
                showControls ? "opacity-100" : "opacity-0"
            )}>
                {/* Progress Bar */}
                <div className="absolute bottom-16 left-4 right-4">
                    <div 
                        className="h-2 bg-gray-600 rounded-full cursor-pointer overflow-hidden"
                        onClick={handleProgressClick}
                    >
                        <div 
                            className="h-full bg-yellow-500 transition-all duration-150 relative"
                            style={{ width: `${progressPercent}%` }}
                        >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Play/Pause */}
                        <Button
                            onClick={togglePlayPause}
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-yellow-500 hover:bg-white/10"
                        >
                            <Icon iconNode={isPlaying ? Pause : Play} className="w-5 h-5" />
                        </Button>

                        {/* Skip Buttons */}
                        <Button
                            onClick={() => skip(-10)}
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-yellow-500 hover:bg-white/10"
                        >
                            <Icon iconNode={SkipBack} className="w-5 h-5" />
                        </Button>
                        
                        <Button
                            onClick={() => skip(10)}
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-yellow-500 hover:bg-white/10"
                        >
                            <Icon iconNode={SkipForward} className="w-5 h-5" />
                        </Button>

                        {/* Volume */}
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={toggleMute}
                                variant="ghost"
                                size="icon"
                                className="text-white hover:text-yellow-500 hover:bg-white/10"
                            >
                                <Icon iconNode={isMuted ? VolumeX : Volume2} className="w-5 h-5" />
                            </Button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>

                        {/* Time Display */}
                        <span className="text-white text-sm font-medium">
                            {formatTime(currentTime)} / {formatTime(videoRef.current?.duration || 0)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Settings */}
                        <Button
                            onClick={() => setShowSettings(!showSettings)}
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-yellow-500 hover:bg-white/10"
                        >
                            <Icon iconNode={Settings} className="w-5 h-5" />
                        </Button>

                        {/* Fullscreen */}
                        <Button
                            onClick={toggleFullscreen}
                            variant="ghost"
                            size="icon"
                            className="text-white hover:text-yellow-500 hover:bg-white/10"
                        >
                            <Icon iconNode={Maximize} className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                    <div className="absolute bottom-20 right-4 bg-black/90 border border-gray-600 rounded-lg p-4 min-w-48">
                        <h4 className="text-white font-medium mb-3">Quality</h4>
                        <div className="space-y-2">
                            {['auto', '1080p', '720p', '480p'].map((q) => (
                                <button
                                    key={q}
                                    onClick={() => setQuality(q)}
                                    className={cn(
                                        "block w-full text-left px-3 py-2 rounded text-sm transition-colors",
                                        quality === q 
                                            ? "bg-yellow-500 text-black" 
                                            : "text-white hover:bg-white/10"
                                    )}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Slider Styles */}
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #eab308;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 0 8px rgba(234, 179, 8, 0.5);
                }
                .slider::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #eab308;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 0 8px rgba(234, 179, 8, 0.5);
                }
            `}</style>
        </div>
    );
}
