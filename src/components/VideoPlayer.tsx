"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideControls = () => {
    if (isPlaying) {
      setIsControlsVisible(false);
    }
  };

  const showControls = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(hideControls, 3000);
  };
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };
    const setVideoDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoDuration);

    const handleFullscreenChange = () => {
        const fullscreenElement = document.fullscreenElement;
        setIsFullscreen(!!fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoDuration);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    showControls();
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (videoRef.current) videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        if (videoRef.current) videoRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    showControls();
    if (videoRef.current) {
      const currentlyMuted = !videoRef.current.muted;
      videoRef.current.muted = currentlyMuted;
      setIsMuted(currentlyMuted);
      if (currentlyMuted && volume === 0) setVolume(1);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    const playerContainer = playerContainerRef.current;
    if (!playerContainer) return;
    
    if (!document.fullscreenElement) {
        playerContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  return (
    <div 
      ref={playerContainerRef} 
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group/player"
      onMouseMove={showControls}
      onMouseLeave={hideControls}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity",
        isPlaying ? "opacity-0 group-hover/player:opacity-100" : "opacity-100",
        isControlsVisible ? "" : "opacity-0"
      )}>
        <Button variant="ghost" size="icon" className="w-20 h-20 text-white" onClick={togglePlay}>
          {isPlaying ? <Pause className="w-12 h-12"/> : <Play className="w-12 h-12"/>}
        </Button>
      </div>
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity",
        isControlsVisible ? "opacity-100" : "opacity-0",
      )}>
        <div className="flex flex-col gap-2">
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
            />
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:text-white hover:bg-white/10">
                  {isPlaying ? <Pause /> : <Play />}
                </Button>
                <div className="flex items-center gap-2 w-32">
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:text-white hover:bg-white/10">
                    {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.05}
                  />
                </div>
                <span className="text-sm font-mono w-24">
                  {formatTime(videoRef.current?.currentTime ?? 0)} / {formatTime(duration)}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:text-white hover:bg-white/10">
                {isFullscreen ? <Minimize /> : <Maximize />}
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
