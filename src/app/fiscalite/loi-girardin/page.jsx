import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from "@/components/ui/CTAButton";
import { getPageContent } from '@/lib/cms-server';

// Default content structure
export const defaultContent = {
  hero: {
    title: "Loi Girardin industriel",
    subtitle: "Financer l'économie ultramarine via des investissements productifs",
    description: "La loi Girardin industriel offre une réduction d'impôt \"one shot\" supérieure à l'investissement (jusqu'à 110% du montant investi). Un dispositif fiscal puissant pour contribuables très fortement imposés acceptant un placement à fonds perdus mais sûr juridiquement.",
    button: "En savoir plus",
    image: "/images/loi-girardin-hero.jpg"
  },
  overview: {
    title: "Présentation de la loi Girardin",
    description: "La loi Girardin est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans les départements et collectivités d'outre-mer français (DOM-TOM).",
    keyPoints: [
      "Réduction d'impôt jusqu'à 25%",
      "Investissement dans l'outre-mer français",
      "Durée d'engagement de 5 ans",
      "Contribution au développement local"
    ]
  },
  benefits: {
    title: "Avantages fiscaux",
    benefits: [
      {
        title: "Réduction d'impôt",
        description: "Jusqu'à 25% du montant investi",
        percentage: "25%"
      },
      {
        title: "Plafond d'investissement",
        description: "Variable selon le projet",
        amount: "Variable"
      },
      {
        title: "Durée d'engagement",
        description: "5 ans minimum",
        duration: "5 ans"
      }
    ]
  },
  conditions: {
    title: "Conditions d'éligibilité",
    description: "Pour bénéficier de la Loi Girardin, plusieurs conditions doivent être respectées :",
    points: [
      "Investissement dans l'outre-mer français",
      "Projet d'investissement productif",
      "Engagement de 5 ans minimum",
      "Respect des normes environnementales"
    ]
  },
  cta: {
    title: "Besoin d'aide pour votre investissement ?",
    description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Girardin.",
    buttonText: "Demander une consultation gratuite"
  }
};

export async function generateMetadata() {
  const content = await getPageContent('fiscalite/loi-girardin', defaultContent);
  return {
    title: content.seo?.metaTitle || "Loi Girardin | Azalée Patrimoine",
    description: content.seo?.metaDescription || "La loi Girardin industriel pour défiscaliser en investissant dans les DOM-TOM.",
  };
}

export default async function LoiGirardinPage() {
  const content = await getPageContent('fiscalite/loi-girardin', defaultContent);

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
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.overview.title}
            subtitle={content.overview.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content.overview.keyPoints.map((point, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold relative z-10">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.benefits.title}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {content.benefits.benefits.map((benefit, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 3 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#253F60]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 relative z-10">
                  {benefit.percentage || benefit.amount || benefit.duration}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 relative z-10">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-white/90 relative z-10">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.conditions.title}
            subtitle={content.conditions.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {content.conditions.points.map((point, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="flex items-start relative z-10">
                  <div className="text-white mr-3 mt-1 text-xl font-bold">✓</div>
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-white leading-relaxed">{point}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {content.cta.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            {content.cta.description}
          </p>
          <CTAButton 
            externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
            variant="primary"
            className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Planifiez votre consultation gratuite
          </CTAButton>
        </div>
      </section>

      <Footer />
    </>
  );
}
