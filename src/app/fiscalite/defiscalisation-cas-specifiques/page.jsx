import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from '@/components/ui/CTAButton';

const defaultContent = {
  hero: {
    title: "Défiscalisation - Cas spéciaux",
    subtitle: "Découvrez les dispositifs de défiscalisation spécifiques et les situations particulières qui peuvent vous permettre d'optimiser votre fiscalité.",
    button: "Étudier mon cas",
    image: "/images/fiscalite-cas-specifiques-hero.jpg"
  },
  casSpecifiques: {
    title: "Cas spéciaux de défiscalisation",
    items: [
      {
        nom: "Défiscalisation outre-mer",
        description: "Dispositifs spécifiques pour les investissements en outre-mer",
        avantages: ["Réduction jusqu'à 40%", "Investissement plafonné à 300k€", "Engagement 5 ans minimum"],
        conditions: ["Bien situé en outre-mer", "Location à usage d'habitation", "Investissement direct ou SCPI"]
      },
      {
        nom: "Défiscalisation monuments historiques",
        description: "Réduction d'impôt pour la rénovation de monuments classés",
        avantages: ["Réduction jusqu'à 30%", "Plafond 400k€", "Engagement 9 ans minimum"],
        conditions: ["Bien classé ou inscrit", "Rénovation aux normes", "Location 9 ans minimum"]
      },
      {
        nom: "Défiscalisation rénovation énergétique",
        description: "Réduction d'impôt pour les travaux de rénovation énergétique",
        avantages: ["Réduction jusqu'à 30%", "Plafond 8k€", "Engagement 3 ans"],
        conditions: ["Résidence principale", "Travaux énergétiques", "Engagement 3 ans"]
      }
    ]
  },
  situationsParticulieres: {
    title: "Situations particulières",
    items: [
      {
        situation: "Investisseur étranger",
        description: "Fiscalité spécifique pour les non-résidents",
        points: ["Imposition différente", "Conventions fiscales", "Obligations déclaratives"]
      },
      {
        situation: "Expatrié",
        description: "Optimisation fiscale pour les expatriés",
        points: ["Résidence fiscale", "Imposition des revenus", "Défiscalisation à distance"]
      },
      {
        situation: "Retraité",
        description: "Stratégies fiscales pour les retraités",
        points: ["TMI réduit", "Défiscalisation adaptée", "Transmission optimisée"]
      }
    ]
  },
  cta: {
    title: "Votre cas est-il éligible ?",
    subtitle: "Nos experts analysent votre situation pour identifier les dispositifs applicables",
    primaryButton: "Analyse gratuite",
    secondaryButton: "Consultation spécialisée"
  },
  seo: {
    metaTitle: "Défiscalisation Cas Spécifiques | Azalée Patrimoine",
    metaDescription: "Découvrez les dispositifs de défiscalisation spécifiques avec Azalée Patrimoine."
  }
};

export async function generateMetadata() {
  const content = await getPageContent('fiscalite/defiscalisation-cas-specifiques', defaultContent);
  return {
    title: content?.seo?.metaTitle || defaultContent.seo.metaTitle,
    description: content?.seo?.metaDescription || defaultContent.seo.metaDescription,
  };
}

export default async function DefiscalisationCasSpecifiquesPage() {
  const content = await getPageContent('fiscalite/defiscalisation-cas-specifiques', defaultContent);
  
  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-6xl font-cairo font-bold text-white mb-4 sm:mb-6">
                {content.hero?.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white mb-6 sm:mb-8 leading-relaxed">
                {content.hero?.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-inter font-semibold hover:bg-[#A67A5A] transition-colors text-sm sm:text-base shadow-lg"
                >
                  {content.hero?.button}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cas Spéciaux Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.casSpecifiques?.title}
            subtitle="Découvrez les dispositifs spécifiques adaptés à votre situation"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(content.casSpecifiques?.items || []).map((cas, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-cairo font-bold mb-4">{cas.nom}</h3>
                  <p className="text-white/90 text-sm mb-6 leading-relaxed">{cas.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-cairo font-semibold mb-3 text-base">Avantages</h4>
                    <ul className="space-y-2">
                      {(cas.avantages || []).map((avantage, idx) => (
                        <li key={idx} className="text-white/95 text-sm flex items-start gap-3">
                          <div className={`w-5 h-5 ${index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{avantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-cairo font-semibold mb-3 text-base">Conditions</h4>
                    <ul className="space-y-2">
                      {(cas.conditions || []).map((condition, idx) => (
                        <li key={idx} className="text-white/95 text-sm flex items-start gap-3">
                          <div className={`w-5 h-5 ${index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Situations Particulières Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.situationsParticulieres?.title}
            subtitle="Des solutions adaptées à chaque profil"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(content.situationsParticulieres?.items || []).map((situation, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-cairo font-bold mb-4">{situation.situation}</h3>
                  <p className="text-white/90 text-sm mb-6 leading-relaxed">{situation.description}</p>
                  <ul className="space-y-3">
                    {(situation.points || []).map((point, idx) => (
                      <li key={idx} className="text-white/95 text-sm flex items-start gap-3">
                        <div className={`w-5 h-5 ${index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
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
                {content.cta?.title}
              </h2>
              <p className="text-white text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {content.cta?.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  className="bg-[#B99066] text-white px-8 py-4 rounded-full font-source-sans font-semibold text-lg hover:bg-[#A67C52] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {content.cta?.primaryButton}
                </CTAButton>
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-source-sans font-semibold text-lg hover:bg-white/20 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {content.cta?.secondaryButton}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
