import React, { useState } from 'react';
import { Camera, Upload, MapPin, Calendar, User, Heart, MessageCircle, Share, Plus } from 'lucide-react';

const PujaPics = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [pujaPics, setPujaPics] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      devotee: 'Ramesh Kumar',
      location: 'Home Temple, Hyderabad',
      date: '2024-01-15',
      occasion: 'Daily Evening Aarti',
      description: 'Beautiful darshan of Swamy during evening prayers with divine glow',
      likes: 45,
      comments: 8,
      isLiked: false,
      uploadedAt: '2 days ago'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      devotee: 'Priya Menon',
      location: 'Sri Dharmasastha Temple, Bangalore',
      date: '2024-01-12',
      occasion: 'Mandala Kalam Special Puja',
      description: 'Swamy adorned with special decorations during 41-day vratham',
      likes: 67,
      comments: 12,
      isLiked: true,
      uploadedAt: '5 days ago'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      devotee: 'Ayyappa Devotees Group',
      location: 'Community Temple, Chennai',
      date: '2024-01-10',
      occasion: 'Makaravilakku Preparation',
      description: 'Swamy blessed with divine light during Makaravilakku festival preparations',
      likes: 89,
      comments: 15,
      isLiked: false,
      uploadedAt: '1 week ago'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      devotee: 'Srinivas Rao',
      location: 'Ayyappa Swamy Temple, Vijayawada',
      date: '2024-01-08',
      occasion: 'Pournami Special Darshan',
      description: 'Swamy during full moon special abhishekam with sacred flowers',
      likes: 34,
      comments: 6,
      isLiked: true,
      uploadedAt: '1 week ago'
    }
  ]);

  const filters = [
    { id: 'all', name: 'All Pictures', icon: '📸' },
    { id: 'recent', name: 'Recent', icon: '🕐' },
    { id: 'home-temple', name: 'Home Temples', icon: '🏠' },
    { id: 'temple', name: 'Temple Visits', icon: '🏛️' },
    { id: 'festival', name: 'Festivals', icon: '🎉' }
  ];

  const handleLike = (id) => {
    setPujaPics(pics => pics.map(pic => 
      pic.id === id 
        ? { ...pic, isLiked: !pic.isLiked, likes: pic.isLiked ? pic.likes - 1 : pic.likes + 1 }
        : pic
    ));
  };

  const handleShare = async (pic) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pic.occasion} by ${pic.devotee}`,
          text: pic.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const filteredPics = selectedFilter === 'all' 
    ? pujaPics 
    : selectedFilter === 'recent'
    ? pujaPics.filter(pic => pic.uploadedAt.includes('days ago') || pic.uploadedAt.includes('hours ago'))
    : selectedFilter === 'home-temple'
    ? pujaPics.filter(pic => pic.location.toLowerCase().includes('home'))
    : selectedFilter === 'temple'
    ? pujaPics.filter(pic => pic.location.toLowerCase().includes('temple') && !pic.location.toLowerCase().includes('home'))
    : pujaPics.filter(pic => pic.occasion.toLowerCase().includes('festival') || pic.occasion.toLowerCase().includes('makar'));

  return (
    <div className="flex-1 overflow-y-auto relative p-8 text-gray-800"
>
      
      {/* Header */}
      <div className="mb-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-orange-800 flex items-center space-x-3">
              <Camera className="w-10 h-10" />
              <span>Puja Pictures</span>
            </h1>
            <p className="text-orange-600 text-lg">Share your sacred moments with Swamy • One picture per devotee</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Share Puja Pic</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedFilter === filter.id
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

      {/* Community Stats */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Camera className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-700">{pujaPics.length} Sacred Pictures</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-semibold text-blue-700">{pujaPics.reduce((sum, pic) => sum + pic.likes, 0)} Total Blessings</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-blue-700">{pujaPics.length} Devotees Shared</span>
            </div>
          </div>
          <p className="text-blue-600 text-sm">🕉️ Each devotee can share one sacred picture</p>
        </div>
      </div>

      {/* Pictures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPics.map((pic) => (
          <div
            key={pic.id}
            className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all"
          >
            {/* Image */}
            <div className="relative aspect-square">
              <img
                src={pic.image}
                alt={pic.occasion}
                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
              />
              <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                {pic.uploadedAt}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Occasion & Date */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{pic.occasion}</h3>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>{new Date(pic.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Location & Devotee */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{pic.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2 text-green-500" />
                  <span>Shared by <span className="font-medium text-gray-700">{pic.devotee}</span></span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{pic.description}</p>

              {/* Actions */}
              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(pic.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      pic.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${pic.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{pic.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{pic.comments}</span>
                  </button>
                </div>
                <button
                  onClick={() => handleShare(pic)}
                  className="text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Guidelines */}
      <div className="mt-12 bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Puja Picture Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
          <div>
            <h4 className="font-semibold mb-2">✅ What to Share:</h4>
            <ul className="space-y-1">
              <li>• Sacred pictures of Lord Ayyappa</li>
              <li>• Temple darshan moments</li>
              <li>• Home puja setups</li>
              <li>• Festival celebrations</li>
              <li>• Special occasion pujas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📋 Important Notes:</h4>
            <ul className="space-y-1">
              <li>• One picture per devotee only</li>
              <li>• Include date and venue details</li>
              <li>• Respectful and devotional content</li>
              <li>• Clear, good quality images</li>
              <li>• Brief description of the occasion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <PujaPicUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onPicUploaded={(newPic) => {
            setPujaPics([newPic, ...pujaPics]);
            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
};

// Upload Modal Component
const PujaPicUploadModal = ({ isOpen, onClose, onPicUploaded }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [picDetails, setPicDetails] = useState({
    occasion: '',
    location: '',
    date: '',
    description: '',
    devotee: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!imageFile || !picDetails.occasion || !picDetails.location || !picDetails.date) {
      alert('Please fill all required fields');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPic = {
      id: Date.now(),
      image: imagePreview,
      devotee: picDetails.devotee || 'Anonymous Devotee',
      location: picDetails.location,
      date: picDetails.date,
      occasion: picDetails.occasion,
      description: picDetails.description,
      likes: 0,
      comments: 0,
      isLiked: false,
      uploadedAt: 'Just now'
    };

    onPicUploaded(newPic);
    setIsUploading(false);
  };

  const resetForm = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setPicDetails({
      occasion: '',
      location: '',
      date: '',
      description: '',
      devotee: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <Camera className="w-6 h-6 text-orange-600" />
            <span>Share Your Puja Picture</span>
          </h3>
          <p className="text-gray-600 text-sm mt-1">One sacred picture per devotee • Share your divine moment</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Picture of Swamy *</label>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Click to upload picture</p>
                  <p className="text-sm text-gray-500">JPG, PNG, WEBP (Max 10MB)</p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <button
                  onClick={() => {
                    URL.revokeObjectURL(imagePreview);
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occasion *</label>
              <input
                type="text"
                value={picDetails.occasion}
                onChange={(e) => setPicDetails({...picDetails, occasion: e.target.value})}
                placeholder="e.g., Daily Aarti, Mandala Kalam"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={picDetails.date}
                onChange={(e) => setPicDetails({...picDetails, date: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue/Location *</label>
            <input
              type="text"
              value={picDetails.location}
              onChange={(e) => setPicDetails({...picDetails, location: e.target.value})}
              placeholder="e.g., Home Temple, Sri Dharmasastha Temple, Hyderabad"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name (Optional)</label>
            <input
              type="text"
              value={picDetails.devotee}
              onChange={(e) => setPicDetails({...picDetails, devotee: e.target.value})}
              placeholder="e.g., Ramesh Kumar"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={picDetails.description}
              onChange={(e) => setPicDetails({...picDetails, description: e.target.value})}
              placeholder="Brief description of the moment, special significance, or blessings received..."
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800">
              <strong>Remember:</strong> Each devotee can share only one sacred picture. This creates a 
              meaningful community gallery where every image is special and represents a devotee's devotion.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !imageFile}
              className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Share Picture</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PujaPics;