import React, { useState } from 'react';
import { Upload, Music, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AudioUpload = ({ isOpen, onClose, onAddSong }) => {
  const [uploadStep, setUploadStep] = useState(1);
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [songDetails, setSongDetails] = useState({
    title: '',
    artist: '',
    album: '',
    category: 'bhajans',
    language: 'telugu',
    description: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('audio/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an audio file (MP3, WAV, etc.)",
          variant: "destructive"
        });
        return;
      }

      // Check file size (limit to 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an audio file smaller than 50MB",
          variant: "destructive"
        });
        return;
      }

      setAudioFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAudioPreview(previewUrl);
      
      // Auto-fill title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setSongDetails(prev => ({
        ...prev,
        title: prev.title || fileName
      }));
      
      setUploadStep(2);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    try {
      // In a real implementation, you would upload to your server
      // For now, we'll simulate the upload and create a local entry
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload
      
      // Create song object with local file URL
      const newSong = {
        id: Date.now(),
        title: songDetails.title,
        artist: songDetails.artist || 'Unknown Artist',
        album: songDetails.album || 'User Uploads',
        duration: '0:00', // Would be calculated from actual file
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        audioUrl: audioPreview, // In production, this would be the server URL
        type: 'local',
        category: songDetails.category,
        language: songDetails.language,
        description: songDetails.description,
        uploadedBy: 'Current User',
        uploadedAt: new Date().toISOString()
      };

      onAddSong(newSong);
      
      toast({
        title: "Upload Successful!",
        description: `"${newSong.title}" has been added to your collection.`,
      });

      // Reset form
      resetForm();
      onClose();
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setUploadStep(1);
    setAudioFile(null);
    setAudioPreview(null);
    setSongDetails({
      title: '',
      artist: '',
      album: '',
      category: 'bhajans',
      language: 'telugu',
      description: ''
    });
  };

  const handleClose = () => {
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
    }
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Music className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">Upload Devotional Audio</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${uploadStep >= 1 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${uploadStep >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-sm font-medium">Select File</span>
            </div>
            <div className={`flex-1 h-0.5 ${uploadStep >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${uploadStep >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${uploadStep >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm font-medium">Add Details</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {uploadStep === 1 ? (
            /* File Upload Step */
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Your Devotional Recording</h3>
                <p className="text-gray-600 mb-6">Upload your own bhajans, keerthanams, or devotional songs</p>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  id="audio-upload"
                  accept="audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Click to upload audio file</p>
                  <p className="text-sm text-gray-500">Supports MP3, WAV, OGG, M4A (Max 50MB)</p>
                </label>
              </div>

              {/* Guidelines */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📿 Upload Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Only devotional content related to Lord Ayyappa</li>
                  <li>• Ensure you have rights to share the recording</li>
                  <li>• Good audio quality preferred</li>
                  <li>• Include proper attribution if not original</li>
                </ul>
              </div>
            </div>
          ) : (
            /* Details Step */
            <div className="space-y-6">
              {/* File Preview */}
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded">
                    <Music className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{audioFile?.name}</p>
                    <p className="text-sm text-gray-500">
                      {(audioFile?.size / (1024 * 1024)).toFixed(2)} MB • {audioFile?.type}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                
                {/* Audio Preview */}
                {audioPreview && (
                  <audio controls className="w-full mt-3">
                    <source src={audioPreview} type={audioFile?.type} />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>

              {/* Song Details Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Song Title *</label>
                  <input
                    type="text"
                    value={songDetails.title}
                    onChange={(e) => setSongDetails({...songDetails, title: e.target.value})}
                    placeholder="e.g., Swamiye Saranam Ayyappa"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Artist/Singer</label>
                    <input
                      type="text"
                      value={songDetails.artist}
                      onChange={(e) => setSongDetails({...songDetails, artist: e.target.value})}
                      placeholder="e.g., Your name or original artist"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Album/Collection</label>
                    <input
                      type="text"
                      value={songDetails.album}
                      onChange={(e) => setSongDetails({...songDetails, album: e.target.value})}
                      placeholder="e.g., Home Recordings"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={songDetails.category}
                      onChange={(e) => setSongDetails({...songDetails, category: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="bhajans">Bhajans</option>
                      <option value="keerthanams">Keerthanams</option>
                      <option value="stotrams">Stotrams</option>
                      <option value="mantras">Mantras</option>
                      <option value="aarti">Aarti</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={songDetails.language}
                      onChange={(e) => setSongDetails({...songDetails, language: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="telugu">Telugu</option>
                      <option value="malayalam">Malayalam</option>
                      <option value="tamil">Tamil</option>
                      <option value="sanskrit">Sanskrit</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={songDetails.description}
                    onChange={(e) => setSongDetails({...songDetails, description: e.target.value})}
                    placeholder="Brief description about the song, occasion, or significance..."
                    rows="3"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  ></textarea>
                </div>
              </div>

              {/* Upload Button */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setUploadStep(1)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!songDetails.title || isUploading}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>Upload Song</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;