'use client';
import { useEffect } from 'react';

export default function Notification({ message, type = 'success', isOpen, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess 
    ? 'bg-gradient-to-r from-[#253F60] to-[#1a2d47]' 
    : 'bg-gradient-to-r from-red-600 to-red-700';
  const borderColor = isSuccess 
    ? 'border-[#B99066]' 
    : 'border-red-500';
  const iconColor = isSuccess 
    ? 'text-[#B99066]' 
    : 'text-red-200';

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
      <div className={`
        ${bgColor}
        border-2 ${borderColor}
        rounded-xl
        shadow-2xl
        p-4
        min-w-[320px]
        max-w-md
        backdrop-blur-sm
      `}>
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={`
            flex-shrink-0
            w-10 h-10
            rounded-full
            ${isSuccess ? 'bg-[#B99066]/20' : 'bg-red-500/20'}
            flex items-center justify-center
          `}>
            {isSuccess ? (
              <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          {/* Message */}
          <div className="flex-1">
            <p className="text-white font-cairo font-semibold text-sm">
              {message}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`
              flex-shrink-0
              w-6 h-6
              rounded-full
              ${isSuccess ? 'hover:bg-[#B99066]/20' : 'hover:bg-red-500/20'}
              flex items-center justify-center
              transition-colors
            `}
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

