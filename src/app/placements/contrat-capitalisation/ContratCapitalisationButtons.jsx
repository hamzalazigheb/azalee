'use client';

export default function ContratCapitalisationButtons({ content, variant = 'hero' }) {
  const handleClick = () => {
    window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
  };

  if (variant === 'hero') {
    return (
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={handleClick}
          className="px-8 py-4 bg-[#B99066] hover:bg-[#A67A5A] text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          {content?.hero?.button}
        </button>
        <button 
          onClick={handleClick}
          className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#253F60] text-white rounded-lg font-semibold transition-all duration-300"
        >
          {content?.hero?.secondaryButton}
        </button>
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        <button 
          onClick={handleClick}
          className="px-8 py-4 bg-[#B99066] text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          {content?.cta?.primaryButton}
        </button>
        <button 
          onClick={handleClick}
          className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold transition-all"
        >
          {content?.cta?.secondaryButton}
        </button>
      </div>
    );
  }

  return null;
}

