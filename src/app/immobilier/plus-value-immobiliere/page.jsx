import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

const defaultContent = {
  hero: { 
    title: "Plus-value immobilière : comprendre la fiscalité et optimiser sa revente", 
    subtitle: "Lorsqu'un particulier revend un bien immobilier, il réalise souvent une **plus-value** : c'est la différence entre le prix de vente et le prix d'acquisition (majoré des frais et des travaux). En France, cette plus-value est soumise à une fiscalité spécifique, avec des **abattements pour durée de détention** qui allègent progressivement l'impôt.", 
    subtitle2: "Connaître les règles de la plus-value immobilière est essentiel pour **anticiper la fiscalité de vos ventes**, choisir le bon moment pour céder un bien et intégrer la revente dans une stratégie patrimoniale globale.", 
    button: "Calculer ma plus-value" 
  },
  rightCard: { title: "Optimisation fiscale", floatingText: "22 ans →\nExonération IR", benefits: ["Calcul personnalisé", "Stratégies d'exonération", "Abattements pour durée", "Accompagnement expert"] },
  definition: { title: "Qu'est-ce que la plus-value immobilière ?", subtitle: "Comprendre la fiscalité applicable lors de la revente d'un bien immobilier", description: "La plus-value est la différence entre le prix de vente et le prix d'acquisition. Elle est soumise à l'impôt sur le revenu (19%) et aux prélèvements sociaux (17,2%)." },
  calcul: { title: "Comment calculer la plus-value ?", etapes: [{ titre: "Prix de vente", description: "Prix net vendeur après déduction des frais." }, { titre: "Prix d'acquisition", description: "Prix d'achat majoré des frais de notaire et travaux." }, { titre: "Plus-value brute", description: "Prix de vente - Prix d'acquisition." }, { titre: "Abattements", description: "Réduction selon la durée de détention." }] },
  abattements: { title: "Abattements pour durée de détention", subtitle: "La fiscalité diminue à mesure que vous conservez le bien", description: "La plus-value est progressivement réduite selon la durée de détention.", ir: "Exonération totale après 22 ans de détention pour l'impôt sur le revenu.", ps: "Exonération totale après 30 ans pour les prélèvements sociaux." },
  exonerations: { title: "Cas d'exonération", subtitle: "Situations spécifiques bénéficiant d'exonérations ou d'avantages fiscaux", items: ["Résidence principale : exonération totale", "Première vente d'un logement autre que RP (sous conditions)", "Vente inférieure à 15 000 €", "Expropriation avec remploi"] },
  exempleSection: { title: "Exemple concret", subtitle: "Un cas pratique pour mieux comprendre le calcul de la plus-value" },
  conseil: { title: "Conseil Azalée Patrimoine", subtitle: "Expertise et accompagnement personnalisé pour votre projet", content: "Anticiper la fiscalité de la revente est essentiel. Nous vous accompagnons pour optimiser le timing de vente et maximiser votre gain net." },
  finalCta: { title: "Optimisez votre plus-value immobilière", subtitle: "Nos experts vous aident à calculer et anticiper la fiscalité de votre revente.", primaryButton: "Calculer ma plus-value", secondaryButton: "Planifiez votre consultation gratuite" },
  seo: { metaTitle: "Plus-value Immobilière | Azalée Patrimoine", metaDescription: "Comprenez et optimisez votre plus-value immobilière avec Azalée Patrimoine." }
};

export async function generateMetadata() {
  const content = await getPageContent('immobilier/plus-value-immobiliere', defaultContent);
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
  };
}

export default async function PlusValueImmobilierePage() {
  const content = await getPageContent('immobilier/plus-value-immobiliere', defaultContent);
  
  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {content.hero?.title}
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left" dangerouslySetInnerHTML={{__html: content.hero?.subtitle?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || ''}} />
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left" dangerouslySetInnerHTML={{__html: content.hero?.subtitle2?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || ''}} />
              
              <div className="flex justify-center lg:justify-start">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  {content.hero?.button}
                </CTAButton>
              </div>
            </div>
            
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  {content.rightCard?.title}
                </h2>
              </div>
              
              {content.rightCard?.floatingText && (
                <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                  <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                    {content.rightCard.floatingText.split('\n').map((line, index, arr) => (
                      <span key={index}>{line}{index < arr.length - 1 && <br />}</span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  {(content.rightCard?.benefits || []).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-white mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Définition */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.definition?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.definition?.subtitle}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 text-white shadow-xl">
            <p className="text-lg font-inter leading-relaxed text-center">{content.definition?.description}</p>
          </div>
        </div>
      </section>

      {/* Calcul */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.calcul?.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.calcul?.etapes || []).map((etape, index) => (
              <div key={index} className={`rounded-2xl p-6 shadow-lg text-white ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]'}`}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="font-cairo font-bold text-lg mb-3 text-center">{etape.titre}</h3>
                <p className="text-white/90 text-sm font-inter text-center">{etape.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abattements */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.abattements?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.abattements?.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 text-white shadow-xl">
              <h3 className="font-cairo font-bold text-xl mb-4">Impôt sur le revenu (IR)</h3>
              <p className="text-white/90 font-inter">{content.abattements?.ir}</p>
            </div>
            <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-8 text-white shadow-xl">
              <h3 className="font-cairo font-bold text-xl mb-4">Prélèvements sociaux (PS)</h3>
              <p className="text-white/90 font-inter">{content.abattements?.ps}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exonérations */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.exonerations?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.exonerations?.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(content.exonerations?.items || []).map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#B99066] hover:shadow-xl transition-all duration-300">
                <p className="text-[#253F60] font-inter font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conseil */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.conseil?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.conseil?.subtitle}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-8 text-white shadow-xl">
            <p className="text-lg font-inter leading-relaxed text-center">{content.conseil?.content}</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gradient-to-br from-[#253F60] to-[#1a2d47] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6">{content.finalCta?.title}</h2>
          <p className="text-white/90 text-lg sm:text-xl font-inter mb-8 max-w-2xl mx-auto">{content.finalCta?.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="white">
              {content.finalCta?.primaryButton}
            </CTAButton>
            <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="secondary">
              {content.finalCta?.secondaryButton}
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
