"use client";
import React, { useState, useId } from "react";

/**
 * SEO-optimized Accordion component
 * Content remains in DOM for Google indexing (uses CSS visibility instead of conditional rendering)
 */
export default function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();
  const buttonId = useId();

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-[#112033] font-semibold text-lg">{title}</span>
        <svg
          className={`w-5 h-5 text-[#253F60] transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Content always in DOM for SEO - hidden with CSS when collapsed */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`
          transition-all duration-300 ease-in-out
          ${isOpen 
            ? 'max-h-[2000px] opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
          }
        `}
      >
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}

