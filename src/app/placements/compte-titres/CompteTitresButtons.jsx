'use client';

export default function CompteTitresButtons({ content, variant = 'hero' }) {
  const handleClick = () => {
    window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
  };

  if (variant === 'hero') {
    return (
      <button 
        onClick={handleClick}
        className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200"
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
          className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          {content?.cta?.primaryButton}
        </button>
        <button 
          onClick={handleClick}
          className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200"
        >
          {content?.cta?.secondaryButton}
        </button>
      </div>
    );
  }

  return null;
}

