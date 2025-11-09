import React, { useState } from 'react';
import { X, Download, Search, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, BookOpen, Share } from 'lucide-react';

const PDFReader = ({ book, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [showControls, setShowControls] = useState(true);

  if (!isOpen || !book) return null;

  const handleDownload = () => {
    // Create download link
    const link = document.createElement('a');
    link.href = book.pdfUrl;
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out this devotional book: ${book.title} by ${book.author}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col z-50">
      {/* Header Controls */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-orange-400" />
            <div>
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-gray-300 text-sm">by {book.author}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in book..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Share Book"
          >
            <Share className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 flex items-center justify-center bg-gray-800 p-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-full max-h-full overflow-auto">
          <iframe
            src={book.pdfUrl}
            className="w-full h-full min-w-[800px] min-h-[600px]"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
            title={book.title}
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm">
              Page <input 
                type="number" 
                value={currentPage} 
                onChange={(e) => setCurrentPage(parseInt(e.target.value) || 1)}
                className="bg-gray-800 text-white w-16 px-2 py-1 text-center rounded border-none focus:ring-2 focus:ring-orange-400"
              /> of {book.pages || '—'}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <span>{book.language.charAt(0).toUpperCase() + book.language.slice(1)}</span>
          <span>•</span>
          <span>{book.fileSize}</span>
          <span>•</span>
          <span>{book.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowControls(!showControls)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {showControls ? 'Hide Controls' : 'Show Controls'}
          </button>
        </div>
      </div>

      {/* Reading Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
        <div 
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${(currentPage / (parseInt(book.pages) || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PDFReader;