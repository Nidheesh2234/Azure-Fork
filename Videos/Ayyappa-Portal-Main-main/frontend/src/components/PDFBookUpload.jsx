import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle, Book, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const PDFBookUpload = ({ isOpen, onClose, onBookUploaded }) => {
  const [uploadStep, setUploadStep] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    description: '',
    category: 'traditional-procedures',
    language: 'telugu'
  });
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF file",
          variant: "destructive"
        });
        return;
      }

      // Check file size (limit to 100MB for books)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a PDF file smaller than 100MB",
          variant: "destructive"
        });
        return;
      }

      setPdfFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPdfPreview(previewUrl);
      
      // Auto-fill title from filename
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setBookDetails(prev => ({
        ...prev,
        title: prev.title || fileName
      }));
      
      setUploadStep(2);
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create book object
      const newBook = {
        id: Date.now(),
        title: bookDetails.title,
        author: bookDetails.author || 'Traditional Source',
        description: bookDetails.description,
        category: bookDetails.category,
        language: bookDetails.language,
        pdfUrl: pdfPreview, // In production, this would be the server URL
        fileSize: (pdfFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        pages: 'Processing...', // Would be calculated from actual PDF
        uploadedAt: new Date().toISOString(),
        type: 'pdf-book'
      };

      onBookUploaded(newBook);
      
      toast({
        title: "Book Uploaded Successfully!",
        description: `"${newBook.title}" is now available in your Puja Guide.`,
      });

      resetForm();
      onClose();
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your book. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setUploadStep(1);
    setPdfFile(null);
    if (pdfPreview) {
      URL.revokeObjectURL(pdfPreview);
    }
    setPdfPreview(null);
    setBookDetails({
      title: '',
      author: '',
      description: '',
      category: 'traditional-procedures',
      language: 'telugu'
    });
  };

  const handleClose = () => {
    if (pdfPreview) {
      URL.revokeObjectURL(pdfPreview);
    }
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
            <Book className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-800">Upload Devotional Book (PDF)</h2>
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
              <span className="text-sm font-medium">Upload PDF</span>
            </div>
            <div className={`flex-1 h-0.5 ${uploadStep >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${uploadStep >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${uploadStep >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm font-medium">Book Details</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {uploadStep === 1 ? (
            /* PDF Upload Step */
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Your Devotional Book</h3>
                <p className="text-gray-600 mb-6">Share traditional puja procedures, mantras, and spiritual guidance with the community</p>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-xl font-medium text-gray-700 mb-2">Click to upload PDF book</p>
                  <p className="text-sm text-gray-500">Supports PDF files up to 100MB</p>
                </label>
              </div>

              {/* Upload Guidelines */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Book Upload Guidelines
                </h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• <strong>Content:</strong> Devotional books related to Lord Ayyappa, puja procedures, mantras</li>
                  <li>• <strong>Language:</strong> Telugu, Malayalam, Tamil, Sanskrit, or Hindi</li>
                  <li>• <strong>Quality:</strong> Clear, readable PDF with good resolution</li>
                  <li>• <strong>Copyright:</strong> Ensure you have rights to share the content</li>
                  <li>• <strong>Format:</strong> Well-organized with clear chapters/sections</li>
                </ul>
              </div>

              {/* Examples */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">📚 Perfect for:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-orange-700">
                  <div>• Daily puja procedures</div>
                  <div>• Ayyappa Ashtottarams</div>
                  <div>• Traditional keerthanams</div>
                  <div>• Mantras with meanings</div>
                  <div>• Festival celebrations</div>
                  <div>• Regional customs</div>
                </div>
              </div>
            </div>
          ) : (
            /* Book Details Step */
            <div className="space-y-6">
              {/* PDF Preview */}
              <div className="bg-gray-50 rounded-lg p-6 border">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{pdfFile?.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>Size: {(pdfFile?.size / (1024 * 1024)).toFixed(2)} MB</div>
                      <div>Type: PDF Document</div>
                    </div>
                    
                    {/* PDF Preview */}
                    {pdfPreview && (
                      <div className="mt-4">
                        <iframe
                          src={pdfPreview}
                          className="w-full h-32 border rounded"
                          title="PDF Preview"
                        />
                        <p className="text-xs text-gray-500 mt-1">PDF preview (first page)</p>
                      </div>
                    )}
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                </div>
              </div>

              {/* Book Details Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Book Title *</label>
                  <input
                    type="text"
                    value={bookDetails.title}
                    onChange={(e) => setBookDetails({...bookDetails, title: e.target.value})}
                    placeholder="e.g., Complete Ayyappa Puja Vidhanam"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author/Source</label>
                    <input
                      type="text"
                      value={bookDetails.author}
                      onChange={(e) => setBookDetails({...bookDetails, author: e.target.value})}
                      placeholder="e.g., Traditional Source, Your Name"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={bookDetails.language}
                      onChange={(e) => setBookDetails({...bookDetails, language: e.target.value})}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={bookDetails.category}
                    onChange={(e) => setBookDetails({...bookDetails, category: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="traditional-procedures">Traditional Puja Procedures</option>
                    <option value="mantras-stotrams">Mantras & Stotrams</option>
                    <option value="festival-celebrations">Festival Celebrations</option>
                    <option value="spiritual-stories">Spiritual Stories & Significance</option>
                    <option value="regional-customs">Regional Customs</option>
                    <option value="complete-guide">Complete Devotional Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={bookDetails.description}
                    onChange={(e) => setBookDetails({...bookDetails, description: e.target.value})}
                    placeholder="Brief description of the book content, what devotees will learn, special features..."
                    rows="4"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  ></textarea>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Important Note</h4>
                    <p className="text-sm text-amber-700">
                      Please ensure you have the right to share this content. Traditional devotional books 
                      that are in public domain or your original work are welcome. This will help preserve 
                      and share authentic devotional knowledge with the community.
                    </p>
                  </div>
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
                  disabled={!bookDetails.title || isUploading}
                  className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading Book...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>Upload Book</span>
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

export default PDFBookUpload;