"use client";
import React, { useState } from 'react';

// Media Manager Component for CMS
export default function MediaManager({ onSelect, isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [uploadedImages, setUploadedImages] = useState([
    '/images/immobilier-hero.webp',
    '/images/immobilier-intro.webp',
    '/images/placements-hero.webp',
    '/images/patrimoine-hero.webp',
    '/images/retraite-hero.webp',
    '/images/outils-hero.webp',
    '/images/azalee-patrimoine-paris-luxury-office.webp',
    '/images/azalee-patrimoine-family-trust-meeting.webp',
    '/images/azalee-patrimoine-private-banking-consultation.webp'
  ]);

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleConfirm = () => {
    if (selectedImage && onSelect) {
      onSelect(selectedImage);
    }
    onClose();
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages(prev => [...prev, imageUrl]);
      setSelectedImage(imageUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Gestionnaire de Médias
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedImage}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              Sélectionner
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Upload Section */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Ajouter une image</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600">Cliquez pour télécharger une image</p>
                <p className="text-sm text-gray-500">PNG, JPG, WEBP jusqu'à 10MB</p>
              </label>
            </div>
          </div>

          {/* Image Gallery */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Images disponibles</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${selectedImage === imageUrl
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm hidden">
                    Image non trouvée
                  </div>
                  {selectedImage === imageUrl && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* URL Input */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-900 mb-3">Ou saisir une URL</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => setSelectedImage('')}
                className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Effacer
              </button>
            </div>
          </div>

          {/* Preview */}
          {selectedImage && (
            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Aperçu</h4>
              <div className="border rounded-lg p-4 bg-gray-50">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="max-w-xs h-32 object-cover rounded border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-red-500 text-sm hidden">
                  Impossible de charger l'image
                </div>
                <p className="text-sm text-gray-600 mt-2 break-all">
                  {selectedImage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
