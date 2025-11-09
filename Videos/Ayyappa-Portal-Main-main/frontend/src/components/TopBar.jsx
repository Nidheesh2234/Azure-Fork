import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, User, Play, Clock, Music, Mic2, Tag, Calendar } from 'lucide-react';
import NotificationBell from './NotificationBell';
import ThemeSwitcher from './ThemeSwitcher';
import { featuredSongs, categories, playlists } from '../data/mockData';

const TopBar = ({ setCurrentSong, setIsPlaying }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState({
    songs: [],
    artists: [],
    categories: [],
    playlists: []
  });
  const searchRef = useRef(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setShowSuggestions(true);
      
      // Search through songs
      const songResults = featuredSongs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.language.toLowerCase().includes(query.toLowerCase())
      );

      // Get unique artists from matching songs
      const artistResults = [...new Set(songResults.map(song => song.artist))];

      // Search through categories
      const categoryResults = categories.filter(category =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );

      // Search through playlists
      const playlistResults = playlists.filter(playlist =>
        playlist.title.toLowerCase().includes(query.toLowerCase()) ||
        playlist.description.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults({
        songs: songResults.slice(0, 3),
        artists: artistResults.slice(0, 2),
        categories: categoryResults.slice(0, 2),
        playlists: playlistResults.slice(0, 2)
      });
    } else {
      setShowSuggestions(false);
    }
  };

  const addToRecentSearches = (term) => {
    const newRecent = [term, ...recentSearches.filter(item => item !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const handleItemClick = (type, item) => {
    if (type === 'song') {
      setCurrentSong(item);
      setIsPlaying(true);
    }
    addToRecentSearches(item.title || item.name);
    setShowSuggestions(false);
    setSearchQuery('');
  };
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-b from-orange-100 via-orange-50 to-transparent dark:from-gray-800 dark:via-gray-800/50 dark:to-transparent backdrop-blur-md border-b border-orange-200 dark:border-gray-700 relative z-50 transition-all duration-300">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="bg-white dark:bg-gray-800 bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md border border-orange-200 dark:border-gray-600"
          title="Back"
        >
          <ChevronLeft className="w-6 h-6 text-orange-700 dark:text-orange-400" />
        </button>
        <button
          onClick={() => window.history.forward()}
          className="bg-white dark:bg-gray-800 bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md border border-orange-200 dark:border-gray-600"
          title="Forward"
        >
          <ChevronRight className="w-6 h-6 text-orange-700 dark:text-orange-400" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for devotional songs, artists, playlists..."
            className="w-full bg-white/95 backdrop-blur-md rounded-full py-3 pl-10 pr-4 text-gray-800 
              placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 
              border border-orange-200/50 shadow-lg hover:shadow-orange-200/50 
              transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(false);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          )}

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute mt-2 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl 
              border border-orange-200/50 overflow-hidden z-50">
              
              {/* If there's a query, show search results */}
              {searchQuery ? (
                <div className="divide-y divide-gray-100">
                  {/* Songs Section */}
                  {searchResults.songs.length > 0 && (
                    <div className="px-4 py-3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Music className="w-4 h-4 mr-1" /> Songs
                      </div>
                      {searchResults.songs.map(song => (
                        <div
                          key={song.id}
                          onClick={() => handleItemClick('song', song)}
                          className="flex items-center space-x-3 p-2 hover:bg-orange-50 
                            rounded-lg cursor-pointer group"
                        >
                          <Play className="w-4 h-4 text-orange-600 opacity-0 group-hover:opacity-100" />
                          <img src={song.image} alt={song.title} className="w-8 h-8 rounded" />
                          <div>
                            <div className="text-sm font-medium">{song.title}</div>
                            <div className="text-xs text-gray-500">{song.artist}</div>
                          </div>
                          <div className="text-xs text-gray-400 ml-auto flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {song.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Artists Section */}
                  {searchResults.artists.length > 0 && (
                    <div className="px-4 py-3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Mic2 className="w-4 h-4 mr-1" /> Artists
                      </div>
                      {searchResults.artists.map((artist, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-orange-50 rounded-lg cursor-pointer"
                          onClick={() => handleItemClick('artist', { name: artist })}
                        >
                          <div className="text-sm font-medium">{artist}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Categories Section */}
                  {searchResults.categories.length > 0 && (
                    <div className="px-4 py-3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Tag className="w-4 h-4 mr-1" /> Categories
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.categories.map(category => (
                          <div
                            key={category.id}
                            onClick={() => handleItemClick('category', category)}
                            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full 
                              text-sm cursor-pointer hover:bg-orange-200"
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Show recent searches when no query */
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-3">Recent Searches</div>
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="flex items-center space-x-2 p-2 hover:bg-orange-50 
                        rounded-lg cursor-pointer"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{search}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <button
          onClick={() => {
            const event = new CustomEvent('toggle-upcoming-events');
            window.dispatchEvent(event);
          }}
          className="bg-white dark:bg-gray-800 bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md border border-orange-200 dark:border-gray-600"
          title="Upcoming Events"
        >
          <Calendar className="w-6 h-6 text-orange-700 dark:text-orange-400" />
        </button>
        <ThemeSwitcher />
        <button
          onClick={() => alert('User menu coming soon')}
          className="bg-orange-600 dark:bg-orange-500 rounded-full p-2 hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors shadow-md"
          title="User menu"
        >
          <User className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;