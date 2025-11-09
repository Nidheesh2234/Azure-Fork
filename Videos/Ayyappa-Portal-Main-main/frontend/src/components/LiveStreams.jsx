import React, { useState } from 'react';
import { Video, Plus, MapPin, Clock, Users, ExternalLink, Calendar } from 'lucide-react';

const LiveStreams = () => {
  const [showAddStreamModal, setShowAddStreamModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock live streams data
  const liveStreams = [
    {
      id: 1,
      title: "Daily Evening Aarti",
      temple: "Sri Dharmasastha Temple",
      location: "Hyderabad, Telangana",
      devotee: "Ramesh Kumar",
      streamUrl: "https://www.youtube.com/watch?v=BOjJGALm2kQ",
      thumbnail: "https://img.youtube.com/vi/BOjJGALm2kQ/maxresdefault.jpg",
      scheduledTime: "6:30 PM",
      status: "live",
      viewers: 45,
      description: "Traditional evening aarti with full bhajan session",
      language: "telugu",
      category: "daily-puja"
    },
    {
      id: 2,
      title: "Mandala Kalam Special Puja",
      temple: "Local Community Temple",
      location: "Bangalore, Karnataka",
      devotee: "Priya Menon",
      streamUrl: "https://www.youtube.com/watch?v=RktD86M3ZQM",
      thumbnail: "https://img.youtube.com/vi/RktD86M3ZQM/maxresdefault.jpg",
      scheduledTime: "7:00 AM",
      status: "scheduled",
      viewers: 0,
      description: "41-day vratham special ceremonies",
      language: "malayalam",
      category: "special-puja",
      date: "Tomorrow"
    },
    {
      id: 3,
      title: "Sabarimala Bhajan Session",
      temple: "Home Temple",
      location: "Chennai, Tamil Nadu",
      devotee: "Ayyappa Devotees Group",
      streamUrl: "https://www.youtube.com/watch?v=4vPGd-6N3CQ",
      thumbnail: "https://img.youtube.com/vi/4vPGd-6N3CQ/maxresdefault.jpg",
      scheduledTime: "8:00 PM",
      status: "live",
      viewers: 23,
      description: "Community bhajan session with traditional songs",
      language: "tamil",
      category: "bhajan-session"
    },
    {
      id: 4,
      title: "Makaravilakku Preparation Puja",
      temple: "Ayyappa Swamy Temple",
      location: "Vijayawada, Andhra Pradesh",
      devotee: "Temple Committee",
      streamUrl: "https://www.youtube.com/watch?v=ZqjshggfkoI",
      thumbnail: "https://img.youtube.com/vi/ZqjshggfkoI/maxresdefault.jpg",
      scheduledTime: "5:30 AM",
      status: "completed",
      viewers: 78,
      description: "Special preparation rituals for Makaravilakku festival",
      language: "telugu",
      category: "festival"
    }
  ];

  const filters = [
    { id: 'all', name: 'All Streams', icon: '📺' },
    { id: 'live', name: 'Live Now', icon: '🔴' },
    { id: 'scheduled', name: 'Scheduled', icon: '⏰' },
    { id: 'daily-puja', name: 'Daily Puja', icon: '🕉️' },
    { id: 'special-puja', name: 'Special Pujas', icon: '🎊' },
    { id: 'bhajan-session', name: 'Bhajans', icon: '🎵' },
    { id: 'festival', name: 'Festivals', icon: '🎉' }
  ];

  const filteredStreams = activeFilter === 'all' 
    ? liveStreams 
    : liveStreams.filter(stream => 
        activeFilter === 'live' ? stream.status === 'live' :
        activeFilter === 'scheduled' ? stream.status === 'scheduled' :
        stream.category === activeFilter
      );

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'scheduled': return 'SCHEDULED';
      case 'completed': return 'COMPLETED';
      default: return status.toUpperCase();
    }
  };

  const openStream = (stream) => {
    window.open(stream.streamUrl, '_blank');
  };

  return (
    <div className="flex-1 overflow-y-auto relative p-8 text-gray-800"
>
      
      {/* Header */}
      <div className="mb-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-orange-800 flex items-center space-x-3">
              <Video className="w-10 h-10" />
              <span>Live Puja Streams</span>
            </h1>
            <p className="text-orange-600 text-lg">Connect with devotees worldwide • Share your local temple pujas</p>
          </div>
          <button
            onClick={() => setShowAddStreamModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Stream</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white bg-opacity-80 text-gray-700 hover:bg-orange-100'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Status Banner */}
      <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-red-700">
            {liveStreams.filter(s => s.status === 'live').length} Live Pujas • 
            {liveStreams.filter(s => s.status === 'scheduled').length} Scheduled Today
          </span>
        </div>
      </div>

      {/* Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStreams.map((stream) => (
          <div
            key={stream.id}
            className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => openStream(stream)}
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop';
                }}
              />
              
              {/* Status Badge */}
              <div className={`absolute top-3 left-3 ${getStatusColor(stream.status)} text-white px-2 py-1 rounded text-xs font-bold`}>
                {getStatusText(stream.status)}
              </div>
              
              {/* Viewers Count */}
              {stream.status === 'live' && (
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{stream.viewers}</span>
                </div>
              )}

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-red-600 rounded-full p-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-orange-700 transition-colors">
                  {stream.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{stream.description}</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  <span>{stream.temple}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{stream.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{stream.scheduledTime}</span>
                  {stream.date && <span className="ml-2 text-blue-600 font-medium">({stream.date})</span>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  by <span className="font-medium text-gray-700">{stream.devotee}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                    {stream.language}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Stream Instructions */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-2">📹 Share Your Local Puja</h3>
        <p className="text-blue-700 mb-4">
          Help connect devotees worldwide by streaming your temple or home pujas:
        </p>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Daily temple aarti and puja ceremonies</li>
          <li>Special occasion and festival celebrations</li>
          <li>Community bhajan sessions</li>
          <li>Vratham and special observances</li>
        </ul>
        <p className="text-blue-600 text-sm mt-3">
          💡 Tip: Use YouTube or Facebook Live to stream, then share the link here for all devotees to join.
        </p>
      </div>

      {/* Add Stream Modal */}
      {showAddStreamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Video className="w-6 h-6 text-red-600" />
              <span>Add Live Stream</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stream Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Daily Evening Aarti"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temple/Location Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Sri Dharmasastha Temple"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City, State *</label>
                <input
                  type="text"
                  placeholder="e.g., Hyderabad, Telangana"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stream URL *</label>
                <input
                  type="url"
                  placeholder="YouTube Live / Facebook Live URL"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400">
                    <option value="daily-puja">Daily Puja</option>
                    <option value="special-puja">Special Puja</option>
                    <option value="bhajan-session">Bhajan Session</option>
                    <option value="festival">Festival</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows="3"
                  placeholder="Brief description of the puja/ceremony"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                ></textarea>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800">
                  <strong>Note:</strong> Please ensure you have permission to stream from the temple/location. 
                  Streams should be respectful and follow traditional protocols.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddStreamModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Stream</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreams;