'use client';

export default function AssuranceVieLuxembourgButtons({ content, variant = 'hero' }) {
  const handleClick = () => {
    window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
  };

  if (variant === 'hero') {
    return (
      <button 
        onClick={handleClick}
        className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
      >
        {content?.hero?.button}
      </button>
    );
  }

  if (variant === 'cta') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={handleClick}
          className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200 text-lg"
        >
          {content?.cta?.primaryButton}
        </button>
        <button 
          onClick={handleClick}
          className="border-2 border-[#B99066] text-[#B99066] px-8 py-4 rounded-lg font-medium hover:bg-[#B99066] hover:text-white transition-colors duration-200 text-lg"
        >
          {content?.cta?.secondaryButton}
        </button>
      </div>
    );
  }

  return null;
}

