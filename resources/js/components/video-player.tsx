import { cn } from '@/lib/utils';
import { Maximize, Pause, Play, RotateCcw, RotateCw, Settings, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
    src: string;
    title: string;
    onProgress?: (progress: number) => void;
    onComplete?: () => void;
    className?: string;
}

export function VideoPlayer({ src, title, onProgress, onComplete, className }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const volumeBarRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [quality, setQuality] = useState('auto');
    const [isBuffering, setIsBuffering] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            const progress = (video.currentTime / video.duration) * 100;
            onProgress?.(progress);

            // Auto-complete at 95%
            if (progress >= 95) {
                onComplete?.();
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleWaiting = () => setIsBuffering(true);
        const handleCanPlay = () => setIsBuffering(false);

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('canplay', handleCanPlay);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, [onProgress, onComplete]);

    useEffect(() => {
        let hideControlsTimer: NodeJS.Timeout;

        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(hideControlsTimer);
            hideControlsTimer = setTimeout(() => {
                if (isPlaying) setShowControls(false);
            }, 3000);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', () => {
                if (isPlaying) setShowControls(false);
            });
        }

        return () => {
            clearTimeout(hideControlsTimer);
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [isPlaying]);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    };

    const skipTime = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    };

    const handleProgressClick = (e: React.MouseEvent) => {
        const bar = progressBarRef.current;
        const video = videoRef.current;
        if (!bar || !video) return;

        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    };

    const handleVolumeChange = (e: React.MouseEvent) => {
        const bar = volumeBarRef.current;
        const video = videoRef.current;
        if (!bar || !video) return;

        const rect = bar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setVolume(percent);
        video.volume = percent;
        setIsMuted(percent === 0);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isMuted) {
            video.volume = volume;
            setIsMuted(false);
        } else {
            video.volume = 0;
            setIsMuted(true);
        }
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!container) return;

        if (!isFullscreen) {
            container.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const changePlaybackRate = (rate: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = rate;
        setPlaybackRate(rate);
        setShowSettings(false);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div
            ref={containerRef}
            className={cn('group relative overflow-hidden rounded-2xl bg-black shadow-2xl', 'border border-neutral-800/50', className)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                className="h-full w-full object-contain"
                preload="metadata"
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                onClick={togglePlayPause}
            />

            {/* Loading Spinner */}
            {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="border-primary h-12 w-12 animate-spin rounded-full border-2 border-t-transparent" />
                </div>
            )}

            {/* Play/Pause Overlay */}
            <div
                className={cn(
                    'absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300',
                    showControls ? 'opacity-0' : 'opacity-100',
                )}
            >
                <button
                    onClick={togglePlayPause}
                    className="bg-primary/20 border-primary/50 text-primary hover:bg-primary flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 hover:text-black"
                >
                    {isPlaying ? <Pause className="ml-0.5 h-8 w-8" fill="currentColor" /> : <Play className="ml-1 h-8 w-8" fill="currentColor" />}
                </button>
            </div>

            {/* Controls Overlay */}
            <div
                className={cn(
                    'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 transition-all duration-300',
                    showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
                )}
            >
                {/* Progress Bar */}
                <div className="mb-4">
                    <div
                        ref={progressBarRef}
                        className="group/progress relative h-2 w-full cursor-pointer rounded-full bg-neutral-700 transition-all duration-200 hover:h-3"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="from-primary h-full rounded-full bg-gradient-to-r to-yellow-400 transition-all duration-200"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                        <div
                            className="bg-primary absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/progress:opacity-100"
                            style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                        />
                    </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Play/Pause */}
                        <button
                            onClick={togglePlayPause}
                            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
                        >
                            {isPlaying ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="ml-0.5 h-5 w-5" fill="currentColor" />}
                        </button>

                        {/* Skip Buttons */}
                        <button
                            onClick={() => skipTime(-10)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => skipTime(10)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
                        >
                            <RotateCw className="h-4 w-4" />
                        </button>

                        {/* Volume */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleMute}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
                            >
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </button>
                            <div ref={volumeBarRef} className="h-1 w-16 cursor-pointer rounded-full bg-neutral-600" onClick={handleVolumeChange}>
                                <div className="bg-primary h-full rounded-full" style={{ width: `${isMuted ? 0 : volume * 100}%` }} />
                            </div>
                        </div>

                        {/* Time */}
                        <div className="font-mono text-sm text-white">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Settings */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
                            >
                                <Settings className="h-4 w-4" />
                            </button>

                            {showSettings && (
                                <div className="absolute right-0 bottom-10 min-w-32 rounded-lg border border-neutral-700 bg-black/90 p-3 backdrop-blur-sm">
                                    <div className="mb-2 text-sm font-medium text-white">Playback Speed</div>
                                    <div className="space-y-1">
                                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                            <button
                                                key={rate}
                                                onClick={() => changePlaybackRate(rate)}
                                                className={cn(
                                                    'block w-full rounded px-2 py-1 text-left text-sm transition-colors hover:bg-white/20',
                                                    playbackRate === rate ? 'text-primary' : 'text-white',
                                                )}
                                            >
                                                {rate}x
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Fullscreen */}
                        <button
                            onClick={toggleFullscreen}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/20"
                        >
                            <Maximize className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                video::-webkit-media-controls {
                    display: none !important;
                }
                video::-webkit-media-controls-enclosure {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
