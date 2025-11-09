import React, { useState } from 'react';
import { Bell, X, MapPin, Calendar, Clock, Users } from 'lucide-react';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'live-puja',
      title: 'Live Puja Starting Soon',
      message: 'Daily Evening Aarti at Sri Dharmasastha Temple, Hyderabad',
      time: '5 minutes ago',
      location: 'Hyderabad',
      isNew: true,
      icon: '🕉️'
    },
    {
      id: 2,
      type: 'annadanam',
      title: 'Annadanam Tomorrow',
      message: 'Free meal service at Ayyappa Temple, Bangalore from 12 PM',
      time: '2 hours ago',
      location: 'Bangalore',
      isNew: true,
      icon: '🍛'
    },
    {
      id: 3,
      type: 'festival',
      title: 'Makaravilakku Celebration',
      message: 'Special darshan and abhishekam at local temple',
      time: '1 day ago',
      location: 'Chennai',
      isNew: false,
      icon: '🎉'
    },
    {
      id: 4,
      type: 'bhajan',
      title: 'Community Bhajan Session',
      message: 'Join us for Ayyappa bhajans every Friday at 7 PM',
      time: '2 days ago',
      location: 'Vijayawada',
      isNew: false,
      icon: '🎵'
    }
  ]);

  const newNotificationCount = notifications.filter(n => n.isNew).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isNew: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'live-puja': return 'border-l-orange-500 bg-orange-50';
      case 'annadanam': return 'border-l-green-500 bg-green-50';
      case 'festival': return 'border-l-purple-500 bg-purple-50';
      case 'bhajan': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-orange-700 hover:text-orange-600 transition-colors"
      >
        <Bell size={24} />
        {newNotificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {newNotificationCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setShowNotifications(false)}
          ></div>
          
          {/* Notifications Panel */}
          <div className="fixed right-4 top-16 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-hidden z-[9999]">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-orange-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Devotional Updates</h3>
                <div className="flex items-center space-x-2">
                  {newNotificationCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${getNotificationColor(notification.type)} ${
                        notification.isNew ? 'bg-opacity-30' : 'bg-opacity-10'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{notification.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-semibold ${notification.isNew ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            {notification.isNew && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className={`text-sm ${notification.isNew ? 'text-gray-700' : 'text-gray-600'} mb-2`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{notification.location}</span>
                            </div>
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No new notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <button className="text-sm text-orange-600 hover:text-orange-700 transition-colors font-medium">
                  Manage Notification Settings
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;