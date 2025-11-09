import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Users, Utensils, Star, Upload } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    type: 'pooja',
    temple: '',
    location: '',
    date: '',
    time: '',
    description: '',
    organizer: '',
    contact: '',
    expectedDevotees: '',
    specialFeatures: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const eventTypes = [
    { id: 'pooja', name: 'Pooja/Ceremony', icon: '🕉️', color: 'orange' },
    { id: 'annadanam', name: 'Annadanam', icon: '🍛', color: 'green' },
    { id: 'both', name: 'Pooja + Annadanam', icon: '🎪', color: 'purple' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newEvent = {
        id: Date.now(),
        ...eventDetails,
        expectedDevotees: parseInt(eventDetails.expectedDevotees) || 50,
        specialFeatures: eventDetails.specialFeatures.split(',').map(f => f.trim()).filter(f => f),
        isToday: eventDetails.date === new Date().toISOString().split('T')[0],
        daysLeft: Math.ceil((new Date(eventDetails.date) - new Date()) / (1000 * 60 * 60 * 24)),
        location: `${eventDetails.temple}, ${eventDetails.location}`
      };

      onEventAdded(newEvent);
      
      toast({
        title: "Event Added Successfully!",
        description: `"${newEvent.title}" has been added to upcoming events.`,
      });

      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: "Failed to Add Event",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEventDetails({
      title: '',
      type: 'pooja',
      temple: '',
      location: '',
      date: '',
      time: '',
      description: '',
      organizer: '',
      contact: '',
      expectedDevotees: '',
      specialFeatures: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">Add New Event</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Event Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Event Type *</label>
            <div className="grid grid-cols-3 gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setEventDetails({...eventDetails, type: type.id})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    eventDetails.type === type.id
                      ? `border-${type.color}-500 bg-${type.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
              <input
                type="text"
                value={eventDetails.title}
                onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
                placeholder="e.g., Mandala Kalam Special Pooja"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temple/Venue *</label>
              <input
                type="text"
                value={eventDetails.temple}
                onChange={(e) => setEventDetails({...eventDetails, temple: e.target.value})}
                placeholder="e.g., Sri Ayyappa Swamy Temple"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area/Location *</label>
              <input
                type="text"
                value={eventDetails.location}
                onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})}
                placeholder="e.g., MVP Colony, Visakhapatnam"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={eventDetails.date}
                onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
              <input
                type="text"
                value={eventDetails.time}
                onChange={(e) => setEventDetails({...eventDetails, time: e.target.value})}
                placeholder="e.g., 6:00 AM - 8:00 AM"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={eventDetails.description}
              onChange={(e) => setEventDetails({...eventDetails, description: e.target.value})}
              placeholder="Brief description of the event, special significance, what devotees can expect..."
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>
          </div>

          {/* Organizer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organizer *</label>
              <input
                type="text"
                value={eventDetails.organizer}
                onChange={(e) => setEventDetails({...eventDetails, organizer: e.target.value})}
                placeholder="e.g., Temple Committee, Devotees Association"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
              <input
                type="tel"
                value={eventDetails.contact}
                onChange={(e) => setEventDetails({...eventDetails, contact: e.target.value})}
                placeholder="e.g., +91 891-2345678"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Devotees</label>
              <input
                type="number"
                value={eventDetails.expectedDevotees}
                onChange={(e) => setEventDetails({...eventDetails, expectedDevotees: e.target.value})}
                placeholder="e.g., 200"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
              <input
                type="text"
                value={eventDetails.specialFeatures}
                onChange={(e) => setEventDetails({...eventDetails, specialFeatures: e.target.value})}
                placeholder="e.g., Abhishekam, Prasadam, Mass Aarti (comma separated)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Event Guidelines
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Only add legitimate Ayyappa-related events in Visakhapatnam area</li>
              <li>• Ensure you have permission to publish event details</li>
              <li>• Provide accurate contact information for devotees to reach organizers</li>
              <li>• Include specific location details for easy navigation</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding Event...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Add Event</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;