import React, { useState } from 'react';
import { Search, Play, Plus } from 'lucide-react';
import { featuredSongs, categories } from '../data/mockData';

const SearchPage = ({ songs, setCurrentSong, setIsPlaying }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase()) ||
        song.category.toLowerCase().includes(query.toLowerCase()) ||
        song.language.toLowerCase().includes(query.toLowerCase()) ||
        // Handle common abbreviations
        (query.toLowerCase() === 'spb' && song.artist.toLowerCase().includes('balasubrahmanyam')) ||
        (query.toLowerCase() === 'yesudas' && song.artist.toLowerCase().includes('yesudas'))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const addToLibrary = (song) => {
    try {
      const raw = localStorage.getItem('library') || '[]';
      const list = JSON.parse(raw);
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
    <div className="flex-1 overflow-y-auto relative p-8 text-gray-800"
>
      {/* Search Header */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-300 bg-opacity-50 rounded-full blur group-hover:bg-opacity-70 transition-all duration-300"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-700 w-5 h-5 transition-all duration-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search bhajans, artists, or devotional songs..."
                className="w-full bg-white/95 backdrop-blur-md rounded-full py-4 pl-12 pr-12 text-gray-800 placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 border border-orange-200/50 shadow-lg
                  text-lg transition-all duration-300
                  hover:shadow-orange-200/50 hover:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-700 hover:text-orange-900 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Search suggestions */}
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute mt-2 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orange-200/50 py-2 z-50">
              <div className="max-h-64 overflow-y-auto">
                {searchResults.slice(0, 5).map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center px-4 py-2 hover:bg-orange-50 cursor-pointer transition-colors"
                    onClick={() => handlePlaySong(song)}
                  >
                    <div className="mr-3 text-orange-600">
                      <Play className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{song.title}</div>
                      <div className="text-sm text-gray-500">{song.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {searchQuery ? (
        /* Search Results */
        <div>
          <h2 className="text-2xl font-bold mb-6 text-orange-800">Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                  onClick={() => handlePlaySong(song)}
                >
                  <div className="w-8 text-gray-400 group-hover:text-white">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <Play className="w-4 h-4 hidden group-hover:block fill-current" />
                  </div>
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{song.title}</h4>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>
                  <span className="text-gray-400 text-sm capitalize px-2 py-1 bg-gray-700 rounded-full">
                    {song.category}
                  </span>
                  <div className="text-gray-400 text-sm">{song.duration}</div>
                  <button className="opacity-0 group-hover:opacity-100 hover:text-white transition-all" onClick={() => addToLibrary(song)}>
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching for devotional songs, artists, or albums</p>
            </div>
          )}
        </div>
      ) : (
        /* Browse Categories */
        <div>
          <h2 className="text-2xl font-bold mb-6 text-orange-800 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-orange-200 inline-block">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform"
                style={{ backgroundColor: category.color }}
              >
                <div className="aspect-square p-4 flex flex-col justify-between">
                  <h3 className="text-white font-bold text-xl">{category.name}</h3>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 rounded-lg object-cover self-end opacity-80 transform rotate-12"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Searches */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4">Recent Searches</h3>
            <div className="space-y-2">
              {['Harivarasanam', 'Telugu Bhajans', 'S.P. Balasubrahmanyam', 'Sharanu Gosha', 'K.J. Yesudas'].map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="block text-left text-gray-300 hover:text-white transition-colors p-2 rounded hover:bg-gray-800"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;