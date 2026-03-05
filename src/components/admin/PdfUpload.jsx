'use client';
import { useState, useRef, useEffect } from 'react';

export default function PdfUpload({ onUploadSuccess, initialPdfUrl = '' }) {
  const [pdfUrl, setPdfUrl] = useState(initialPdfUrl || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const uniqueId = useRef(`pdf-file-upload-${Math.random().toString(36).substr(2, 9)}`);

  // Update when initialPdfUrl changes
  useEffect(() => {
    setPdfUrl(initialPdfUrl || '');
  }, [initialPdfUrl]);

  const handleUrlChange = (e) => {
    let url = e.target.value;
    
    // Convert Windows file paths to web paths
    // If user enters: C:\Users\...\public\pdfs\guide.pdf
    // Convert to: /pdfs/guide.pdf
    if (url.includes('public\\pdfs\\') || url.includes('public/pdfs/')) {
      const match = url.match(/[\\/]pdfs[\\/]([^\\/]+)$/);
      if (match) {
        url = `/pdfs/${match[1]}`;
        console.log('PdfUpload: Converted file path to web path:', url);
      }
    }
    // Also handle paths that start with the workspace root
    else if (url.includes('azalee demo') && url.includes('pdfs')) {
      const match = url.match(/pdfs[\\/]([^\\/]+)$/);
      if (match) {
        url = `/pdfs/${match[1]}`;
        console.log('PdfUpload: Converted workspace path to web path:', url);
      }
    }
    
    setPdfUrl(url);
    // Call callback immediately when URL changes
    if (onUploadSuccess) {
      console.log('PdfUpload: Calling onUploadSuccess with URL:', url);
      onUploadSuccess(url || '');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Veuillez sélectionner un fichier PDF');
      e.target.value = '';
      return;
    }

    // Validate file size (max 50MB for PDFs)
    if (file.size > 50 * 1024 * 1024) {
      alert('Le PDF ne doit pas dépasser 50MB');
      e.target.value = '';
      return;
    }

    setUploading(true);

    try {
      // Récupérer le token d'authentification
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Vous devez être connecté pour uploader un fichier. Veuillez vous reconnecter.');
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'pdfs'); // Store PDFs in pdfs folder

      // Upload to API endpoint avec authentification
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401 || response.status === 403) {
          throw new Error(errorData.message || 'Session expirée. Veuillez vous reconnecter.');
        }
        throw new Error(errorData.message || 'Erreur lors de l\'upload');
      }

      const data = await response.json();
      
      if (data.success && data.url) {
        setPdfUrl(data.url);
        if (onUploadSuccess) {
          onUploadSuccess(data.url);
        }
        // Message de succès
        alert('PDF uploadé avec succès !');
      } else {
        throw new Error(data.message || 'Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      // Message d'erreur simple
      alert(error.message || 'Erreur lors de l\'upload du PDF. Veuillez réessayer.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
      {/* URL Input */}
      <div className="mb-4">
        <label className="block text-sm font-cairo font-semibold text-[#253F60] dark:text-[#B99066] mb-2">
          URL du PDF
        </label>
        <input
          type="text"
          value={pdfUrl}
          onChange={handleUrlChange}
          placeholder="/pdfs/guide-patrimoine.pdf ou https://example.com/guide.pdf"
          className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Pour les PDFs dans public/pdfs/, utilisez: <strong>/pdfs/nom-du-fichier.pdf</strong><br/>
          (Les chemins Windows seront automatiquement convertis)
        </p>
      </div>

      {/* File Input */}
      <div>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="hidden"
          id={uniqueId.current}
          disabled={uploading}
        />
        <label
          htmlFor={uniqueId.current}
          className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-cairo font-semibold ${
            uploading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white hover:from-[#1a2d47] hover:to-[#253F60]'
          }`}
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Upload en cours...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Sélectionner un fichier PDF
            </>
          )}
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          PDF jusqu'à 50MB
        </p>
      </div>

      {/* Preview/Link */}
      {pdfUrl && (
        <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">PDF configuré:</p>
          {pdfUrl.startsWith('/pdfs/') || pdfUrl.startsWith('http') ? (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm break-all"
              >
                {pdfUrl.length > 60 ? `${pdfUrl.substring(0, 60)}...` : pdfUrl}
              </a>
            </div>
          ) : pdfUrl.startsWith('data:application/pdf') ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">PDF en base64</span>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded text-xs text-yellow-800 dark:text-yellow-200">
                ⚠️ PDF en base64 détecté. Pour de meilleures performances, utilisez un chemin web comme <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">/pdfs/nom-fichier.pdf</code>
              </div>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm"
              >
                Ouvrir le PDF
              </a>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400 break-all">
              {pdfUrl}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

