'use client';
import { useState, useEffect } from 'react';

export default function TextEditor({ value = '', onChange, placeholder = 'Écrivez votre texte...' }) {
  const [text, setText] = useState('');

  // Initialize: convert HTML to plain text
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      // Strip HTML tags and get plain text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = value || '';
      const plainText = tempDiv.textContent || tempDiv.innerText || '';
      
      if (plainText !== text) {
        setText(plainText);
      }
    } else {
      setText('');
    }
  }, [value]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    // Return plain text without HTML formatting
    onChange(newText);
  };

  return (
    <div className="text-editor-wrapper">
      {/* Simple Textarea - No formatting toolbar */}
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
      />
    </div>
  );
}
