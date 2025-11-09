import React, { useState } from 'react';
import { X, ExternalLink, Play } from 'lucide-react';

const SimpleYouTubePlayer = ({ currentSong, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  console.log('SimpleYouTubePlayer render:', { isOpen, currentSong: currentSong?.title });

  if (!isOpen || !currentSong) return null;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleOpenYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${currentSong.youtubeId}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4" 
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-orange-600 text-white">
          <div className="flex items-center space-x-3">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-lg font-bold">{currentSong.title}</h2>
              <p className="text-orange-100 text-sm">{currentSong.artist}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenYouTube}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm flex items-center space-x-1 transition-colors"
            >
              <ExternalLink size={14} />
              <span>YouTube</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-orange-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Player Content */}
        <div className="p-6">
          {isPlaying ? (
            <div className="relative">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
                title={currentSong.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          ) : (
            <div className="text-center">
              <div className="relative mb-6">
                <img
                  src={`https://img.youtube.com/vi/${currentSong.youtubeId}/maxresdefault.jpg`}
                  alt={currentSong.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${currentSong.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                  <button
                    onClick={handlePlay}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Play className="w-12 h-12 fill-current" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentSong.title}</h3>
                  <p className="text-xl text-gray-600 mb-1">{currentSong.artist}</p>
                  <p className="text-gray-500">{currentSong.album}</p>
                </div>
                
                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  <span className="bg-orange-100 px-3 py-1 rounded-full">
                    {currentSong.category.charAt(0).toUpperCase() + currentSong.category.slice(1)}
                  </span>
                  <span className="bg-blue-100 px-3 py-1 rounded-full">
                    {currentSong.language.charAt(0).toUpperCase() + currentSong.language.slice(1)}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    {currentSong.duration}
                  </span>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 max-w-lg mx-auto">
                  <p className="text-sm text-orange-800 text-center">
                    🕉️ <strong>Authentic Recording</strong><br/>
                    Click the play button to start this devotional song by {currentSong.artist}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleYouTubePlayer;