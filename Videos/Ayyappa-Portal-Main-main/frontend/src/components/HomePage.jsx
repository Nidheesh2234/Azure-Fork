import React from 'react';
import { Play, Plus } from 'lucide-react';
import { featuredSongs, playlists, categories, recentlyPlayed } from '../data/mockData';

const HomePage = ({ songs, setCurrentSong, setIsPlaying }) => {
  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const addToLibrary = (song) => {
    try {
      const raw = localStorage.getItem('library') || '[]';
      const list = JSON.parse(raw);
      // store minimal song info to avoid large storage
      const entry = { id: song.id, title: song.title, artist: song.artist };
      if (!list.find(s => s.id === song.id)) {
        list.unshift(entry);
        localStorage.setItem('library', JSON.stringify(list.slice(0, 200)));
        console.log('Added to library:', entry);
      } else {
        console.log('Already in library:', song.id);
      }
    } catch (err) {
      console.error('Failed to add to library', err);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto relative text-gray-800" 
>
      <div className="p-8 relative z-10">
        {/* Main Content */}
        <div>
        {/* Hero Section */}
        <div className="mb-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
          <h1 className="text-4xl font-bold mb-2 text-orange-800">Good Evening, Devotee</h1>
          <p className="text-orange-600 text-lg">Continue your spiritual journey</p>
        </div>

        {/* Recently Played */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-800">Recently Played</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyPlayed.map((item) => (
              <div
                key={item.id}
                className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-100 hover:shadow-lg transition-all cursor-pointer group border border-orange-200"
                onClick={(e) => {
                  e.stopPropagation();
                  const song = songs.find(s => s.id === item.id);
                  if (song) {
                    console.log('Playing song:', song);
                    handlePlaySong(song);
                  } else {
                    console.log('Song not found for ID:', item.id, 'Available songs:', songs);
                  }
                }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.artist}</p>
                  </div>
                  <button 
                    className="opacity-0 group-hover:opacity-100 bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      const song = songs.find(s => s.id === item.id);
                      if (song) {
                        console.log('Playing song via button:', song);
                        handlePlaySong(song);
                      }
                    }}
                  >
                    <Play className="w-5 h-5 text-white fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browse Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-800">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform"
                style={{ backgroundColor: category.color }}
              >
                <div className="aspect-square p-4 flex flex-col justify-between">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 rounded-lg object-cover self-end opacity-80"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-800">Made for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 hover:bg-opacity-100 hover:shadow-lg transition-all cursor-pointer group border border-orange-200"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.image}
                    alt={playlist.title}
                    className="w-full aspect-square rounded-md object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // play the first song of the playlist if available
                      const firstId = playlist.songs && playlist.songs[0];
                      const song = songs.find(s => s.id === firstId);
                      if (song) {
                        handlePlaySong(song);
                      } else {
                        console.log('No song found for playlist', playlist.id);
                      }
                    }}
                    className="absolute bottom-2 right-2 bg-orange-500 rounded-full p-2 opacity-0 group-hover:opacity-100 hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0"
                    title={`Play ${playlist.title}`}
                  >
                    <Play className="w-5 h-5 text-white fill-current" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{playlist.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{playlist.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Songs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-800">Popular Ayyappa Songs</h2>
          <div className="space-y-2">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center space-x-4 p-3 rounded-lg bg-white bg-opacity-60 hover:bg-opacity-90 hover:shadow-md transition-all cursor-pointer group border border-orange-100 mb-2"
              >
                <div 
                  className="w-8 text-gray-600 group-hover:text-orange-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Playing song from list:', song);
                    handlePlaySong(song);
                  }}
                >
                  <span className="group-hover:hidden">{index + 1}</span>
                  <Play className="w-4 h-4 hidden group-hover:block fill-current" />
                </div>
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Playing song from title click:', song);
                    handlePlaySong(song);
                  }}
                >
                  <h4 className="text-gray-800 font-medium hover:text-orange-700 transition-colors">{song.title}</h4>
                  <p className="text-gray-600 text-sm">{song.artist}</p>
                </div>
                <div className="text-gray-600 text-sm">{song.duration}</div>
                <button
                  onClick={() => addToLibrary(song)}
                  className="opacity-0 group-hover:opacity-100 hover:text-orange-600 transition-all text-gray-600"
                  title="Add to library"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;