"use client";
import CTAButton from "@/components/ui/CTAButton";

export default function ScpiOpciHeroButtons({ content }) {
  const handleScrollToAzalee = () => {
    if (typeof window !== 'undefined' && window.scrollToAzalee) {
      window.scrollToAzalee();
    } else {
      // Fallback: scroll direct si la fonction n'est pas encore disponible
      setTimeout(() => {
        const element = document.getElementById("azalee-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {content?.hero?.primaryButton && (
        <CTAButton 
          externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
          variant="primary"
        >
          {content.hero.primaryButton}
        </CTAButton>
      )}
      {content?.hero?.secondaryButton && (
        <button 
          onClick={handleScrollToAzalee}
          className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200 cursor-pointer"
        >
          {content.hero.secondaryButton}
        </button>
      )}
    </div>
  );
}

