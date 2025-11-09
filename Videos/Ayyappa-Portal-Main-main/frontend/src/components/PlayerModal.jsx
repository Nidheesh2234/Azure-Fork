import React, { useState } from 'react';
import { X, ExternalLink, Play, Pause } from 'lucide-react';

const PlayerModal = ({ currentSong, isOpen, onClose, isPlaying, setIsPlaying }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  
  if (!isOpen || !currentSong) return null;

  const handleOpenInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${currentSong.youtubeId}`, '_blank');
  };

  const handlePlayInApp = () => {
    setShowPlayer(true);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{currentSong.title}</h2>
              <p className="text-gray-600">{currentSong.artist}</p>
              <p className="text-sm text-gray-500">{currentSong.album}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenInYouTube}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <ExternalLink size={16} />
              <span>Open in YouTube</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* YouTube Player */}
        <div className="p-6">
          {showPlayer ? (
            <div className="bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                title={currentSong.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-80 rounded-lg"
              ></iframe>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-8 text-center border-2 border-dashed border-orange-300">
              <div className="mb-4">
                <img
                  src={`https://img.youtube.com/vi/${currentSong.youtubeId}/maxresdefault.jpg`}
                  alt={currentSong.title}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${currentSong.youtubeId}/hqdefault.jpg`;
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-orange-800 mb-2">{currentSong.title}</h3>
              <p className="text-orange-600 mb-6">by {currentSong.artist}</p>
              <button
                onClick={handlePlayInApp}
                className="flex items-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full transition-colors mx-auto shadow-lg"
              >
                <Play className="w-6 h-6 fill-current" />
                <span className="text-lg font-medium">Play Devotional Song</span>
              </button>
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="p-6 pt-0">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-semibold text-orange-800">Duration:</span>
                <p className="text-gray-700">{currentSong.duration}</p>
              </div>
              <div>
                <span className="font-semibold text-orange-800">Category:</span>
                <p className="text-gray-700 capitalize">{currentSong.category}</p>
              </div>
              <div>
                <span className="font-semibold text-orange-800">Language:</span>
                <p className="text-gray-700 capitalize">{currentSong.language}</p>
              </div>
              <div>
                <span className="font-semibold text-orange-800">Album:</span>
                <p className="text-gray-700">{currentSong.album}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-6 pb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">🕉️ Devotional Listening Guide</h3>
            <p className="text-blue-700 text-sm">
              This is an authentic recording of {currentSong.artist} singing {currentSong.title}. 
              For the best spiritual experience, listen with devotion and focus on Lord Ayyappa. 
              {showPlayer ? 'Use the YouTube controls to pause, seek, or adjust volume.' : 'Click "Play Devotional Song" to start the embedded player.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;