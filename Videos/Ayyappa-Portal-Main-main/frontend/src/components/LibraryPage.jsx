import React, { useState } from 'react';
import { Play, Grid, List, Plus, Search, Upload } from 'lucide-react';
import { playlists, featuredSongs } from '../data/mockData';

const LibraryPage = ({ setCurrentSong, setIsPlaying, onAddYouTube, onUploadAudio }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' }
  ];

  const handlePlayPlaylist = (playlist) => {
    const firstSong = featuredSongs.find(song => playlist.songs.includes(song.id));
    if (firstSong) {
      setCurrentSong(firstSong);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto relative p-8 text-gray-800"
>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <div className="flex bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilter === filter.id
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Recently Played */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg cursor-pointer hover:from-orange-500 hover:to-orange-300 transition-all group">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
            <span className="text-2xl">❤️</span>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">Liked Songs</h3>
            <p className="text-orange-100">5 liked songs</p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 rounded-full p-3 transition-all">
            <Play className="w-6 h-6 text-white fill-current" />
          </button>
        </div>
      </div>

      {/* Playlists */}
      <div>
        <h2 className="text-xl font-bold mb-4">Made by You</h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all cursor-pointer group"
                onClick={() => handlePlayPlaylist(playlist)}
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.image}
                    alt={playlist.title}
                    className="w-full aspect-square rounded-md object-cover"
                  />
                  <button className="absolute bottom-2 right-2 bg-orange-500 rounded-full p-3 opacity-0 group-hover:opacity-100 hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <Play className="w-5 h-5 text-white fill-current" />
                  </button>
                </div>
                <h3 className="font-semibold text-white mb-1 truncate">{playlist.title}</h3>
                <p className="text-gray-400 text-sm">{playlist.songCount} songs</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                onClick={() => handlePlayPlaylist(playlist)}
              >
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="w-14 h-14 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium">{playlist.title}</h4>
                  <p className="text-gray-400 text-sm">{playlist.songCount} songs • {playlist.description}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-all">
                  <Play className="w-4 h-4 text-white fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all group">
          <Plus className="w-6 h-6 text-gray-400 group-hover:text-white" />
          <span className="text-gray-400 group-hover:text-white font-medium">Create Playlist</span>
        </button>
        <button 
          onClick={onAddYouTube}
          className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white rounded-lg p-6 transition-all group"
        >
          <Plus className="w-6 h-6" />
          <span className="font-medium">Add YouTube Song</span>
        </button>
        <button 
          onClick={onUploadAudio}
          className="flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-6 transition-all group"
        >
          <Upload className="w-6 h-6" />
          <span className="font-medium">Upload Audio File</span>
        </button>
      </div>
    </div>
  );
};

export default LibraryPage;