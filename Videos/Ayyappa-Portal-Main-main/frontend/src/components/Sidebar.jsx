import React from 'react';
import { Home, Search, Library, Plus, Heart, Download } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Your Library' }
  ];

  const devotionalItems = [
    { id: 'puja-guide', label: 'Puja Guide' },
    { id: 'live-streams', label: 'Live Pujas' },
    { id: 'puja-pics', label: 'Puja Pics' }
  ];

  const libraryItems = [
    { id: 'liked', icon: Heart, label: 'Liked Songs' },
    { id: 'downloads', icon: Download, label: 'Downloaded' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-screen flex flex-col relative z-10 transition-colors duration-300">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-orange-400">🕉️ Ayyappa Music</h1>
      </div>
      
      {/* Main Navigation */}
      <nav className="px-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              activeTab === item.id ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <item.icon size={24} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Separator */}
  <div className="border-t border-gray-200 dark:border-gray-800 my-4 mx-6"></div>

      {/* Create Playlist */}
      <div className="px-3 space-y-2">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Plus size={24} />
          <span className="font-medium">Create Playlist</span>
        </button>
        
        {libraryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
              activeTab === item.id ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <item.icon size={24} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Devotional Features */}
      <div className="px-3 mt-6">
        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium px-3 mb-2">DEVOTIONAL</div>
        <div className="space-y-2">
          {devotionalItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                activeTab === item.id ? 'bg-orange-50 text-orange-600 dark:bg-orange-600 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <span className="text-orange-400 dark:text-orange-300">🕉️</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div className="px-3 mt-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium px-3">PLAYLISTS</div>
          {['Morning Prayers', 'Telugu Bhajans', 'SPB Classics', 'Sabarimala Yatra', 'K.J. Yesudas Collection', 'Evening Aarti'].map((playlist, index) => (
            <button
              key={index}
              className="block w-full text-left p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {playlist}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;