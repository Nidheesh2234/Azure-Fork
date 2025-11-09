import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, Maximize2 } from 'lucide-react';
import SimpleYouTubePlayer from './SimpleYouTubePlayer';

const MusicPlayer = ({ currentSong, isPlaying, setIsPlaying }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isLiked, setIsLiked] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) {
    return (
      <div className="bg-gray-900 border-t border-gray-800 p-4 flex items-center justify-center text-gray-400">
        <p>Select a song to start playing</p>
      </div>
    );
  }

  const togglePlay = () => {
    console.log('togglePlay called with:', currentSong);
    if (currentSong && currentSong.youtubeId) {
      console.log('Opening modal for:', currentSong.youtubeId);
      setShowPlayerModal(true);
      setIsPlaying(!isPlaying);
    } else {
      console.log('No song or youtubeId available');
    }
  };

  const openPlayer = () => {
    console.log('openPlayer called');
    if (currentSong && currentSong.youtubeId) {
      setShowPlayerModal(true);
    }
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Currently Playing */}
        <div className="flex items-center space-x-4 flex-1">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="min-w-0 cursor-pointer" onClick={openPlayer}>
            <h4 className="text-white font-medium truncate hover:underline">{currentSong.title}</h4>
            <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`transition-colors ${isLiked ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              id="main-play-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Main play button clicked!', currentSong);
                if (currentSong && currentSong.youtubeId) {
                  const youtubeUrl = `https://www.youtube.com/watch?v=${currentSong.youtubeId}`;
                  console.log('Opening YouTube URL:', youtubeUrl);
                  window.open(youtubeUrl, '_blank');
                } else {
                  console.log('No song or YouTube ID available');
                }
              }}
              className="bg-white rounded-full p-3 hover:scale-105 transition-transform shadow-lg"
              title={`Play ${currentSong?.title} on YouTube`}
            >
              <Play className="w-6 h-6 text-black fill-current" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400">
              {Math.floor((progress * parseInt(currentSong.duration.split(':')[0]) * 60 + progress * parseInt(currentSong.duration.split(':')[1])) / 100 / 60)}:
              {String(Math.floor(((progress * parseInt(currentSong.duration.split(':')[0]) * 60 + progress * parseInt(currentSong.duration.split(':')[1])) / 100) % 60)).padStart(2, '0')}
            </span>
            <div className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer">
              <div
                className="bg-white rounded-full h-1 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400">{currentSong.duration}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <button 
            onClick={openPlayer}
            className="text-gray-400 hover:text-white transition-colors"
            title="Open Full Player"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
          <div className="w-24 bg-gray-600 rounded-full h-1">
            <div
              className="bg-white rounded-full h-1"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Simple YouTube Player */}
      <SimpleYouTubePlayer
        currentSong={currentSong}
        isOpen={showPlayerModal}
        onClose={() => setShowPlayerModal(false)}
      />
    </div>
  );
};

export default MusicPlayer;