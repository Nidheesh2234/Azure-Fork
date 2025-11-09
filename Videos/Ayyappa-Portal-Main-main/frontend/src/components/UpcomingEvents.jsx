import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Utensils, Star, Bell, Plus } from 'lucide-react';
import AddEventModal from './AddEventModal';

const UpcomingEvents = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [events, setEvents] = useState([]);
  
  // Mock data for Visakhapatnam events
  const upcomingEvents = [
    {
      id: 1,
      title: "Mandala Kalam Special Pooja",
      type: "pooja",
      temple: "Sri Ayyappa Swamy Temple",
      location: "MVP Colony, Visakhapatnam",
      date: "2024-11-08",
      time: "6:00 AM - 8:00 AM",
      description: "Special abhishekam and decorations during 41-day vratham period",
      organizer: "Temple Committee",
      contact: "+91 891-2345678",
      expectedDevotees: 200,
      specialFeatures: ["108 Kalasha Abhishekam", "Panchamrita Offering", "Mass Aarti"],
      isToday: false,
      daysLeft: 2
    },
    {
      id: 2,
      title: "Free Annadanam Service",
      type: "annadanam",
      temple: "Dharmasastha Temple",
      location: "Dwaraka Nagar, Visakhapatnam",
      date: "2024-11-06",
      time: "12:00 PM - 3:00 PM",
      description: "Free meals for all devotees with special prasadam distribution",
      organizer: "Ayyappa Devotees Association",
      contact: "+91 891-9876543",
      expectedDevotees: 500,
      specialFeatures: ["Traditional South Indian Meals", "Payasam Distribution", "Take-home Prasadam"],
      isToday: true,
      daysLeft: 0
    },
    {
      id: 3,
      title: "Sabarimala Yatra Blessing Ceremony",
      type: "pooja",
      temple: "Sri Manikanta Temple",
      location: "Siripuram, Visakhapatnam",
      date: "2024-11-10",
      time: "5:30 AM - 7:00 AM",
      description: "Special blessing ceremony for devotees going to Sabarimala pilgrimage",
      organizer: "Yatra Organizing Committee",
      contact: "+91 891-1234567",
      expectedDevotees: 150,
      specialFeatures: ["Irumudi Blessing", "Mala Dharanam", "Group Photo"],
      isToday: false,
      daysLeft: 4
    },
    {
      id: 4,
      title: "Weekly Bhajan Session & Annadanam",
      type: "both",
      temple: "Community Hall",
      location: "Madhurawada, Visakhapatnam",
      date: "2024-11-09",
      time: "6:30 PM - 9:00 PM",
      description: "Community bhajan session followed by free dinner for all attendees",
      organizer: "Visakha Ayyappa Devotees",
      contact: "+91 891-5555666",
      expectedDevotees: 100,
      specialFeatures: ["Traditional Bhajans", "Community Singing", "Free Dinner"],
      isToday: false,
      daysLeft: 3
    },
    {
      id: 5,
      title: "Makaravilakku Preparation Pooja",
      type: "pooja",
      temple: "Swamy Ayyappa Devasthanam",
      location: "Gajuwaka, Visakhapatnam",
      date: "2024-11-12",
      time: "4:00 AM - 6:00 AM",
      description: "Special early morning pooja for Makaravilakku festival preparations",
      organizer: "Temple Trust",
      contact: "+91 891-7777888",
      expectedDevotees: 300,
      specialFeatures: ["Makara Jyothi Lighting", "Special Naivedyam", "Divine Hymns"],
      isToday: false,
      daysLeft: 6
    },
    {
      id: 6,
      title: "Children's Special Annadanam",
      type: "annadanam",
      temple: "Bal Ayyappa Temple",
      location: "Rushikonda, Visakhapatnam",
      date: "2024-11-07",
      time: "11:00 AM - 2:00 PM",
      description: "Special annadanam focusing on children and families with cultural programs",
      organizer: "Youth Devotees Group",
      contact: "+91 891-3333444",
      expectedDevotees: 250,
      specialFeatures: ["Kids Cultural Program", "Family Meals", "Story Telling Session"],
      isToday: false,
      daysLeft: 1
    }
  ];

  const filters = [
    { id: 'all', name: 'All Events', icon: '📅', color: 'blue' },
    { id: 'today', name: 'Today', icon: '🔥', color: 'red' },
    { id: 'pooja', name: 'Poojas', icon: '🕉️', color: 'orange' },
    { id: 'annadanam', name: 'Annadanams', icon: '🍛', color: 'green' },
    { id: 'this-week', name: 'This Week', icon: '📆', color: 'purple' }
  ];

  const allEvents = [...upcomingEvents, ...events];
  const filteredEvents = allEvents.filter(event => {
    switch (selectedFilter) {
      case 'today':
        return event.isToday;
      case 'pooja':
        return event.type === 'pooja';
      case 'annadanam':
        return event.type === 'annadanam';
      case 'this-week':
        return event.daysLeft <= 7;
      default:
        return true;
    }
  }).sort((a, b) => a.daysLeft - b.daysLeft);

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'pooja': return 'bg-orange-500';
      case 'annadanam': return 'bg-green-500';
      case 'both': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'pooja': return <Star className="w-4 h-4" />;
      case 'annadanam': return <Utensils className="w-4 h-4" />;
      case 'both': return <Users className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getDaysLeftText = (daysLeft, isToday) => {
    if (isToday) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    return `${daysLeft} days left`;
  };

  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-orange-800 flex items-center space-x-2">
            <Calendar className="w-7 h-7" />
            <span>Upcoming Events</span>
          </h2>
          <p className="text-orange-600 text-sm mt-1">📍 Visakhapatnam • Poojas & Annadanams</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition-colors shadow-sm"
          title="Add New Event"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              selectedFilter === filter.id
                ? `bg-${filter.color}-600 text-white shadow-md`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{filter.icon}</span>
            <span>{filter.name}</span>
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`p-4 rounded-lg border-l-4 ${
              event.isToday 
                ? 'bg-red-50 border-l-red-500 shadow-md' 
                : 'bg-gray-50 border-l-gray-300 hover:bg-orange-50 hover:border-l-orange-400'
            } transition-all cursor-pointer group`}
          >
            {/* Event Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`${getEventTypeColor(event.type)} text-white p-2 rounded-lg flex-shrink-0`}>
                  {getEventTypeIcon(event.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 group-hover:text-orange-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {event.isToday && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    TODAY
                  </span>
                )}
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  event.isToday 
                    ? 'bg-red-100 text-red-700' 
                    : event.daysLeft <= 2 
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {getDaysLeftText(event.daysLeft, event.isToday)}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 col-span-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>{event.temple}, {event.location}</span>
              </div>
            </div>

            {/* Special Features */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {event.specialFeatures.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>~{event.expectedDevotees} devotees</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Org: {event.organizer}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-orange-600 hover:text-orange-700 transition-colors">
                  <Bell className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.open(`tel:${event.contact}`)}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>📍 All events in Visakhapatnam area</span>
          <div className="flex items-center space-x-4">
            <span>🕉️ {filteredEvents.filter(e => e.type === 'pooja' || e.type === 'both').length} Poojas</span>
            <span>🍛 {filteredEvents.filter(e => e.type === 'annadanam' || e.type === 'both').length} Annadanams</span>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onEventAdded={(newEvent) => {
          setEvents([newEvent, ...events]);
          setShowAddModal(false);
        }}
      />
    </div>
  );
};

export default UpcomingEvents;