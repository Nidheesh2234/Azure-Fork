import React, { useState, useEffect } from 'react';
import { Book, Upload, Download, Clock, CheckCircle, Star, FileText, Eye } from 'lucide-react';
import PDFBookUpload from './PDFBookUpload';
import PDFReader from './PDFReader';
import { pdfBooks } from '../data/mockData';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PujaGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const [showPDFReader, setShowPDFReader] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [uploadedBooks, setUploadedBooks] = useState(pdfBooks);

  // Mock puja guides data - you can upload your book content here
  const pujaGuides = [
    {
      id: 1,
      title: "Complete Ayyappa Puja Vidhanam",
      description: "Step-by-step guide for daily and special occasion pujas",
      author: "Traditional Procedures",
      pages: 45,
      language: "Telugu/Malayalam",
      category: "daily-puja",
      sections: [
        "Morning Puja Procedure",
        "Evening Aarti",
        "Special Occasion Pujas",
        "Mantras and Stotrams",
        "Puja Items Required"
      ],
      content: {
        "Morning Puja Procedure": {
          steps: [
            "Clean the puja area and light the lamp",
            "Place Lord Ayyappa's photo/idol facing east",
            "Offer fresh flowers and tulasi leaves",
            "Chant 'Om Swamiye Saranam Ayyappa' 108 times",
            "Offer prasadam (sweet rice or fruits)",
            "Conclude with aarti and prayers"
          ],
          mantras: [
            "Swamiye Saranam Ayyappa",
            "Harivarasanam Viswamohanam",
            "Om Manikanda Namaha"
          ],
          items: ["Lamp", "Flowers", "Incense", "Prasadam", "Water", "Tulasi"]
        }
      }
    },
    {
      id: 2,
      title: "Mandala Kalam Special Pujas",
      description: "41-day vratham procedures and special pujas",
      author: "Temple Traditions",
      pages: 32,
      language: "Telugu",
      category: "special-occasions",
      sections: [
        "Vratham Rules",
        "Daily Procedures",
        "Special Days",
        "Breaking the Vratham"
      ]
    },
    {
      id: 3,
      title: "Makaravilakku Celebrations",
      description: "Procedures for the sacred Makaravilakku festival",
      author: "Sabarimala Traditions",
      pages: 18,
      language: "Malayalam",
      category: "festivals"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Guides', icon: '📚' },
    { id: 'daily-puja', name: 'Daily Puja', icon: '🕉️' },
    { id: 'special-occasions', name: 'Special Occasions', icon: '🎊' },
    { id: 'festivals', name: 'Festivals', icon: '🎉' },
    { id: 'pdf-books', name: 'PDF Books', icon: '📖' },
    { id: 'traditional-procedures', name: 'Traditional', icon: '🏛️' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const allContent = [...pujaGuides, ...uploadedBooks];
  const filteredContent = activeCategory === 'all' 
    ? allContent 
    : activeCategory === 'pdf-books'
    ? uploadedBooks
    : pujaGuides.filter(item => item.category === activeCategory);

  const openGuide = (guide) => {
    setSelectedGuide(guide);
  };

  const openBook = (book) => {
    setSelectedBook(book);
    setShowPDFReader(true);
  };

  const handleBookUploaded = (newBook) => {
    setUploadedBooks([newBook, ...uploadedBooks]);
  };

  return (
    <div className="flex-1 overflow-y-auto relative p-8 text-gray-800"
>
      
      {!selectedGuide ? (
        <>
          {/* Header */}
          <div className="mb-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-orange-800 flex items-center space-x-3">
                  <Book className="w-10 h-10" />
                  <span>Ayyappa Puja Guide</span>
                </h1>
                <p className="text-orange-600 text-lg">Traditional procedures and step-by-step instructions</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Guide</span>
                </button>
                <button
                  onClick={() => setShowPDFUpload(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>Upload PDF Book</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white bg-opacity-80 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => item.type === 'pdf-book' ? openBook(item) : openGuide(item)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${item.type === 'pdf-book' ? 'bg-red-100' : 'bg-orange-100'}`}>
                    {item.type === 'pdf-book' ? (
                      <FileText className="w-8 h-8 text-red-600" />
                    ) : (
                      <Book className="w-8 h-8 text-orange-600" />
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {item.type === 'pdf-book' ? (
                          item.fileSize
                        ) : (
                          `${item.pages} pages`
                        )}
                      </span>
                    </div>
                    {item.type === 'pdf-book' && (
                      <div className="text-xs text-red-600 font-medium mt-1">PDF Book</div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-1" />
                    <span>By {item.author}</span>
                  </div>
                  <div className="text-sm text-orange-600 font-medium">{item.language}</div>
                  {item.uploadedAt && (
                    <div className="text-xs text-gray-400">
                      Uploaded: {new Date(item.uploadedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {item.sections && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Sections:</h4>
                    <div className="space-y-1">
                      {item.sections.slice(0, 3).map((section, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {section}
                        </div>
                      ))}
                      {item.sections.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{item.sections.length - 3} more sections
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button className={`w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center space-x-2 ${
                  item.type === 'pdf-book' 
                    ? 'bg-red-50 hover:bg-red-100 text-red-700' 
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-700'
                }`}>
                  {item.type === 'pdf-book' ? (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Read PDF Book</span>
                    </>
                  ) : (
                    <span>Open Guide</span>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Upload Instructions */}
          <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-2">📖 Upload Your Puja Guide</h3>
            <p className="text-blue-700 mb-4">
              Share your traditional puja procedures and help fellow devotees. You can upload:
            </p>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Step-by-step puja procedures</li>
              <li>Traditional mantras and stotrams</li>
              <li>Special occasion puja guidelines</li>
              <li>Regional variations and customs</li>
            </ul>
          </div>
        </>
      ) : (
        /* Selected Guide View */
        <div>
          <button
            onClick={() => setSelectedGuide(null)}
            className="mb-6 bg-white bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-lg text-orange-700 hover:bg-orange-100 transition-colors"
          >
            ← Back to Guides
          </button>
          
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-orange-200">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedGuide.title}</h1>
              <p className="text-gray-600 mb-4">{selectedGuide.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By {selectedGuide.author}</span>
                <span>•</span>
                <span>{selectedGuide.pages} pages</span>
                <span>•</span>
                <span>{selectedGuide.language}</span>
              </div>
            </div>

            {selectedGuide.content && selectedGuide.content["Morning Puja Procedure"] && (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-orange-800 mb-4">Morning Puja Procedure</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Steps:</h3>
                      <ol className="space-y-2">
                        {selectedGuide.content["Morning Puja Procedure"].steps.map((step, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Essential Mantras:</h3>
                        <div className="space-y-2">
                          {selectedGuide.content["Morning Puja Procedure"].mantras.map((mantra, index) => (
                            <div key={index} className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                              <span className="text-orange-800 font-medium">🕉️ {mantra}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Required Items:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedGuide.content["Morning Puja Procedure"].items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Upload Puja Guide</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Guide Title"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />
              <textarea
                placeholder="Description"
                rows="3"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              ></textarea>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full p-3 border rounded-lg"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Book Upload Modal */}
      <PDFBookUpload
        isOpen={showPDFUpload}
        onClose={() => setShowPDFUpload(false)}
        onBookUploaded={handleBookUploaded}
      />

      {/* PDF Reader */}
      <PDFReader
        book={selectedBook}
        isOpen={showPDFReader}
        onClose={() => {
          setShowPDFReader(false);
          setSelectedBook(null);
        }}
      />
    </div>
  );
};

export default PujaGuide;