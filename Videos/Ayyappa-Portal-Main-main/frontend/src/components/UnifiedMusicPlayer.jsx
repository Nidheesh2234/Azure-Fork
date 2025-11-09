import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, Upload } from 'lucide-react';

const UnifiedMusicPlayer = ({ currentSong, isPlaying, setIsPlaying }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isLiked, setIsLiked] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef(null);
  const youtubePlayerRef = useRef(null);

  useEffect(() => {
    if (isPlaying && currentSong) {
      if (currentSong.type === 'local' && audioRef.current) {
        audioRef.current.play();
      } else if (currentSong.type === 'youtube' || currentSong.youtubeId) {
        setShowPlayer(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) {
    return (
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
        <p>Select a song to start playing</p>
      </div>
    );
  }

  const togglePlay = () => {
    if (currentSong.type === 'local') {
      // Handle local audio file
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      // Handle YouTube content - show embedded player
      setShowPlayer(true);
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-4 flex-1">
          <img
            src={currentSong.image || currentSong.thumbnail}
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="min-w-0">
            <h4 className="text-gray-900 dark:text-white font-medium truncate">{currentSong.title}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm truncate">{currentSong.artist}</p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              {currentSong.type === 'local' ? '📁 Local File' : '🎬 YouTube'}
            </p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`transition-colors ${isLiked ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="bg-orange-500 dark:bg-orange-500 text-white rounded-full p-3 hover:bg-orange-600 dark:hover:bg-orange-600 transition-all hover:scale-105 transform shadow-lg"
              title={`${isPlaying ? 'Pause' : 'Play'} ${currentSong.title}`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 fill-current" />
              )}
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              <SkipForward className="w-5 h-6" />
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {currentSong.type === 'local' && audioRef.current ? 
                `${Math.floor((progress * audioRef.current.duration / 100) / 60)}:${String(Math.floor(((progress * audioRef.current.duration / 100) % 60))).padStart(2, '0')}` :
                '0:00'
              }
            </span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1 cursor-pointer">
              <div
                className="bg-orange-500 rounded-full h-1"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{currentSong.duration || '0:00'}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div
              className="bg-orange-500 rounded-full h-1"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element for Local Files */}
      {currentSong.type === 'local' && currentSong.audioUrl && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={handleAudioTimeUpdate}
          onEnded={handleAudioEnded}
          onLoadedMetadata={handleAudioTimeUpdate}
        />
      )}

      {/* YouTube Embedded Player */}
      {showPlayer && (currentSong.type === 'youtube' || currentSong.youtubeId) && (
        <div className="fixed inset-0 bg-black/80 dark:bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transition-colors duration-300">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white">
              <div>
                <h3 className="text-lg font-bold">{currentSong.title}</h3>
                <p className="text-orange-100 dark:text-orange-200">{currentSong.artist}</p>
              </div>
              <button
                onClick={() => setShowPlayer(false)}
                className="text-white hover:text-orange-200 dark:hover:text-orange-300 text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                ref={youtubePlayerRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                title={currentSong.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🎬 Playing from YouTube • {currentSong.language} • {currentSong.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedMusicPlayer;