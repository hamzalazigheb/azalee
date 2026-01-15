import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";
import { getPageContent } from '@/lib/cms-server';

// Default content structure
export const defaultContent = {
  hero: {
    title: "Loi Pinel",
    subtitle: "Investir dans le neuf pour réduire ses impôts",
    description: "La loi Pinel est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans l'immobilier neuf locatif. Elle offre une réduction d'impôt de 12% du montant investi par an pendant 9 ans.",
    button: "En savoir plus",
    image: "/images/loi-pinel-hero.jpg"
  },
  overview: {
    title: "Présentation de la loi Pinel",
    description: "La loi Pinel est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans l'immobilier neuf locatif. Elle vise à stimuler la construction de logements neufs et à favoriser l'investissement locatif.",
    keyPoints: [
      "Réduction d'impôt de 12% par an",
      "Investissement dans le neuf uniquement",
      "Engagement de location de 9 ans",
      "Plafond de 300 000€ par an"
    ]
  },
  benefits: {
    title: "Avantages fiscaux",
    benefits: [
      {
        title: "Réduction d'impôt",
        description: "12% du montant investi par an",
        percentage: "12%"
      },
      {
        title: "Plafond d'investissement",
        description: "300 000€ par an",
        amount: "300k€"
      },
      {
        title: "Durée d'engagement",
        description: "9 ans minimum",
        duration: "9 ans"
      }
    ]
  },
  conditions: {
    title: "Conditions d'éligibilité",
    description: "Pour bénéficier de la Loi Pinel, plusieurs conditions doivent être respectées :",
    points: [
      "Investissement dans un bien neuf",
      "Location à usage d'habitation principale",
      "Engagement de location de 9 ans minimum",
      "Respect des plafonds de loyer"
    ]
  },
  cta: {
    title: "Besoin d'aide pour votre investissement ?",
    description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Pinel.",
    buttonText: "Demander une consultation gratuite"
  }
};

export async function generateMetadata() {
  const content = await getPageContent('fiscalite/loi-pinel', defaultContent);
  return {
    title: content.seo?.metaTitle || "Loi Pinel | Azalée Patrimoine",
    description: content.seo?.metaDescription || "La loi Pinel est un dispositif de défiscalisation pour l'investissement locatif neuf.",
  };
}

export default async function LoiPinelPage() {
  const content = await getPageContent('fiscalite/loi-pinel', defaultContent);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                {content.hero.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white mb-3 sm:mb-4 leading-relaxed">
                {content.hero.subtitle}
              </p>
              <p className="text-sm sm:text-base text-white mb-6 sm:mb-8">
                {content.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.overview.title}
            subtitle={content.overview.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {content.overview.keyPoints.map((point, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 4 === 0 || index % 4 === 2 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 text-center">
                  <p className="text-base sm:text-lg font-semibold">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.benefits.title}
            subtitle="Les avantages fiscaux de la loi Pinel"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {content.benefits.benefits.map((benefit, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl sm:text-5xl font-bold mb-4">
                    {benefit.percentage || benefit.amount || benefit.duration}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-white/90 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.conditions.title}
            subtitle={content.conditions.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {content.conditions.points.map((point, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-8 h-8 ${index % 2 === 0 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-base sm:text-lg font-semibold">{point}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                {content.cta.title}
              </h2>
              <p className="text-white text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {content.cta.description}
              </p>
              <CTAButton 
                externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                variant="primary"
                className="px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {content.cta.buttonText}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
