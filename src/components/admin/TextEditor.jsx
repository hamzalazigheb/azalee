'use client';
import { useState, useRef, useEffect } from 'react';

export default function TextEditor({ value = '', onChange, placeholder = 'Écrivez votre texte...' }) {
  const [text, setText] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const textareaRef = useRef(null);
  const formatsRef = useRef([]); // Store formats: [{start, end, type: 'bold'|'italic'}]

  // Initialize: convert HTML to plain text and extract formats
  useEffect(() => {
    if (value !== undefined && value !== null && value !== '') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = value || '';
      const plainText = tempDiv.textContent || tempDiv.innerText || '';
      
      // Extract formats from HTML
      const formats = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(value, 'text/html');
      
      const extractFormats = (node, textOffset = 0) => {
        if (!node) return textOffset;
        
        let currentOffset = textOffset;
        
        for (const child of node.childNodes) {
          if (child.nodeType === 3) {
            // Text node
            currentOffset += child.textContent.length;
          } else if (child.nodeType === 1) {
            // Element node
            const tagName = child.tagName.toLowerCase();
            const childText = child.textContent || '';
            const childLength = childText.length;
            
            if (tagName === 'strong' || tagName === 'b') {
              formats.push({ start: currentOffset, end: currentOffset + childLength, type: 'bold' });
            } else if (tagName === 'em' || tagName === 'i') {
              formats.push({ start: currentOffset, end: currentOffset + childLength, type: 'italic' });
            }
            
            // Recursively process children
            currentOffset = extractFormats(child, currentOffset);
          }
        }
        
        return currentOffset;
      };
      
      extractFormats(doc.body, 0);
      formatsRef.current = formats;
      
      if (plainText !== text) {
        setText(plainText);
      }
    } else {
      setText('');
      formatsRef.current = [];
    }
  }, [value]);

  // Build HTML from plain text and formats
  const buildHTML = (plainText, formats) => {
    if (formats.length === 0) {
      return plainText;
    }

    // Sort formats by start position
    const sortedFormats = [...formats].sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return a.end - b.end;
    });

    // Merge overlapping formats
    const mergedFormats = [];
    for (const format of sortedFormats) {
      if (mergedFormats.length === 0) {
        mergedFormats.push(format);
      } else {
        const last = mergedFormats[mergedFormats.length - 1];
        if (format.start <= last.end) {
          // Overlapping or adjacent - merge if same type
          if (format.type === last.type) {
            last.end = Math.max(last.end, format.end);
          } else {
            // Different types - split
            if (format.start > last.start) {
              last.end = format.start;
            }
            mergedFormats.push(format);
          }
        } else {
          mergedFormats.push(format);
        }
      }
    }

    // Build HTML
    let html = '';
    let lastPos = 0;

    for (const format of mergedFormats) {
      // Add text before format
      if (format.start > lastPos) {
        html += plainText.substring(lastPos, format.start);
      }

      // Add formatted text
      const formattedText = plainText.substring(format.start, format.end);
      if (format.type === 'bold') {
        html += `<strong className="text-[#253F60]">${formattedText}</strong>`;
      } else if (format.type === 'italic') {
        html += `<em>${formattedText}</em>`;
      }

      lastPos = format.end;
    }

    // Add remaining text
    if (lastPos < plainText.length) {
      html += plainText.substring(lastPos);
    }

    return html;
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Adjust formats when text changes
    const textDiff = newText.length - text.length;
    if (textDiff !== 0) {
      // Simple adjustment: shift formats after the cursor
      const cursorPos = e.target.selectionStart;
      formatsRef.current = formatsRef.current
        .map(f => {
          if (f.end <= cursorPos) {
            return f; // Before cursor, unchanged
          } else if (f.start >= cursorPos) {
            // After cursor, shift
            return { ...f, start: Math.max(0, f.start + textDiff), end: Math.max(0, f.end + textDiff) };
          } else {
            // Overlaps cursor - remove format
            return null;
          }
        })
        .filter(f => f !== null && f.start < f.end && f.start >= 0 && f.end <= newText.length);
    }
    
    // Rebuild HTML
    const html = buildHTML(newText, formatsRef.current);
    onChange(html);
  };

  const handleSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setSelection({ start, end });
    }
  };

  const applyFormat = (type) => {
    if (selection.start === selection.end) {
      return;
    }

    const selectedText = text.substring(selection.start, selection.end);
    if (!selectedText.trim()) return;

    // Remove overlapping formats in selection
    const formats = formatsRef.current.filter(f => 
      !(f.start < selection.end && f.end > selection.start)
    );

    // Add new format
    formats.push({
      start: selection.start,
      end: selection.end,
      type: type
    });

    formatsRef.current = formats;

    // Rebuild HTML
    const html = buildHTML(text, formats);
    onChange(html);

    // Clear selection
    setTimeout(() => {
      if (textareaRef.current) {
        const newPosition = selection.end;
        textareaRef.current.setSelectionRange(newPosition, newPosition);
        textareaRef.current.focus();
        setSelection({ start: newPosition, end: newPosition });
      }
    }, 0);
  };

  const makeBold = () => applyFormat('bold');
  const makeItalic = () => applyFormat('italic');

  const hasSelection = selection.start !== selection.end;

  return (
    <div className="text-editor-wrapper">
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <button
          type="button"
          onClick={makeBold}
          disabled={!hasSelection}
          className={`
            px-3 py-1.5 rounded
            font-semibold text-sm
            transition-all
            ${hasSelection
              ? 'bg-[#253F60] text-white hover:bg-[#1a2d47]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
            }
          `}
          title="Mettre en gras (sélectionnez du texte d'abord)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={makeItalic}
          disabled={!hasSelection}
          className={`
            px-3 py-1.5 rounded
            font-semibold text-sm italic
            transition-all
            ${hasSelection
              ? 'bg-[#253F60] text-white hover:bg-[#1a2d47]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
            }
          `}
          title="Mettre en italique (sélectionnez du texte d'abord)"
        >
          I
        </button>
        {hasSelection && (
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            {selection.end - selection.start} caractère(s) sélectionné(s)
          </span>
        )}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        onSelect={handleSelection}
        onMouseUp={handleSelection}
        onKeyUp={handleSelection}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 border-2 border-[#253F60]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B99066] focus:border-[#B99066] transition-all font-inter bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
      />

      {/* Preview */}
      {value && (value.includes('<strong') || value.includes('<em')) && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Aperçu :</p>
          <div
            className="text-sm text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: value.replace(/className=/g, 'class=') }}
          />
        </div>
      )}
    </div>
  );
}
