'use client';
import { useState, useRef, useEffect } from 'react';

export default function ImageUpload({ onUploadSuccess, initialImageUrl = '' }) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
  const [preview, setPreview] = useState(initialImageUrl || null);
  const fileInputRef = useRef(null);
  const uniqueId = useRef(`image-file-upload-${Math.random().toString(36).substr(2, 9)}`);

  // Update when initialImageUrl changes
  useEffect(() => {
    setImageUrl(initialImageUrl || '');
    setPreview(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleUrlChange = (e) => {
    let url = e.target.value;
    
    // Convert Windows file paths to web paths
    // If user enters: C:\Users\...\public\images\reunion.webp
    // Convert to: /images/azalee-patrimoine-reunion.webp
    if (url.includes('public\\images\\') || url.includes('public/images/')) {
      const match = url.match(/[\\/]images[\\/]([^\\/]+)$/);
      if (match) {
        url = `/images/${match[1]}`;
        console.log('CloudinaryUpload: Converted file path to web path:', url);
      }
    }
    // Also handle paths that start with the workspace root
    else if (url.includes('azalee demo') && url.includes('images')) {
      const match = url.match(/images[\\/]([^\\/]+)$/);
      if (match) {
        url = `/images/${match[1]}`;
        console.log('CloudinaryUpload: Converted workspace path to web path:', url);
      }
    }
    
    setImageUrl(url);
    setPreview(url || null);
    // Call callback immediately when URL changes (even if empty to clear)
    if (onUploadSuccess) {
      console.log('CloudinaryUpload: Calling onUploadSuccess with URL:', url);
      onUploadSuccess(url || '');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      e.target.value = '';
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 10MB');
      e.target.value = '';
      return;
    }

    // Upload to server instead of base64
    try {
      console.log('📤 Uploading image to /public/images/...');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'images'); // Upload to /public/images/
      
      // Get auth token from localStorage
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('Session expirée. Veuillez vous reconnecter.');
        return;
      }
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success && data.url) {
        console.log('✅ Image uploaded successfully:', data.url);
        setImageUrl(data.url);
        setPreview(data.url);
        
        if (onUploadSuccess) {
          console.log('CloudinaryUpload: Calling onUploadSuccess with URL:', data.url);
          onUploadSuccess(data.url);
        }
        
        alert(`✅ Image uploadée avec succès !\nChemin : ${data.url}`);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert(`Erreur lors de l'upload : ${error.message}`);
      e.target.value = '';
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center bg-gray-50 dark:bg-gray-700">
      {/* URL Input */}
      <div className="mb-4">
        <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
          URL de l'image
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="/images/nom-image.webp ou https://example.com/image.jpg ou sélectionnez depuis votre appareil"
          className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* File Input */}
      <div>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff"
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="hidden"
          id={uniqueId.current}
        />
        <label
          htmlFor={uniqueId.current}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white rounded-lg hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-cairo font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          📤 Upload depuis votre appareil
        </label>
      </div>

      {/* Preview - Always show if there's an imageUrl */}
      {(preview || imageUrl) && (
        <div className="mt-4">
          {/* Warning for base64 images */}
          {imageUrl && imageUrl.startsWith('data:image/') && (
            <div className="mb-2 p-2 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded text-xs text-yellow-800 dark:text-yellow-200">
              ⚠️ Image en base64 détectée. Pour de meilleures performances, utilisez un chemin web comme <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">/images/nom-fichier.jpg</code>
            </div>
          )}
          {/* Success message for web paths */}
          {imageUrl && imageUrl.startsWith('/images/') && (
            <div className="mb-2 p-2 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded text-xs text-green-800 dark:text-green-200">
              ✅ Chemin web valide détecté
            </div>
          )}
          <div className="relative min-h-[128px] flex items-center justify-center">
            {(preview || imageUrl) ? (
              <img 
                key={preview || imageUrl} 
                src={preview || imageUrl} 
                alt="Preview" 
                className="max-w-full max-h-32 object-contain mx-auto rounded-md border border-gray-200 dark:border-gray-600" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  const parent = e.target.parentNode;
                  if (!parent.querySelector('.error-message')) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message text-red-500 text-sm text-center p-2';
                    errorDiv.textContent = 'Impossible de charger l\'image. Vérifiez l\'URL.';
                    parent.appendChild(errorDiv);
                  }
                }}
                onLoad={(e) => {
                  const parent = e.target.parentNode;
                  const errorMsg = parent.querySelector('.error-message');
                  if (errorMsg) {
                    errorMsg.remove();
                  }
                  e.target.style.display = 'block';
                }}
              />
            ) : null}
          </div>
          {imageUrl && (
            <div className="mt-2">
              {imageUrl.length > 100 ? (
                <details className="text-xs text-gray-500 dark:text-gray-400">
                  <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                    URL (cliquez pour voir)
                  </summary>
                  <p className="mt-1 break-all max-h-20 overflow-y-auto p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    {imageUrl}
                  </p>
                </details>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 break-all">
                  {imageUrl}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
