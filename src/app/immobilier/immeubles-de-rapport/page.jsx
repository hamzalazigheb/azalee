import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

const defaultContent = {
  hero: { title: "Immeubles de rapport : investir dans le collectif", subtitle: "L'immeuble de rapport est un investissement locatif où vous achetez un bâtiment entier comprenant plusieurs logements.", button: "Découvrir les opportunités" },
  rightCard: { title: "Investissement collectif", benefits: ["Rentabilité élevée", "Mutualisation des risques", "Économies d'échelle", "Plus-value importante"] },
  definition: { title: "Qu'est-ce qu'un immeuble de rapport ?", description: "Un immeuble de rapport est un bâtiment comprenant plusieurs logements destinés à la location." },
  avantages: { title: "Les avantages", subtitle: "Découvrez les bénéfices de cette stratégie d'investissement", items: [{ title: "Rentabilité", description: "Prix au m² souvent inférieur à l'achat en copropriété." }, { title: "Mutualisation", description: "Un logement vacant n'impacte pas totalement les revenus." }, { title: "Autonomie", description: "Pas de copropriété, vous êtes seul décisionnaire." }, { title: "Plus-value", description: "Potentiel de valorisation important après rénovation." }] },
  inconvenients: { title: "Les points de vigilance", subtitle: "Points de vigilance essentiels à connaître avant d'investir", items: [{ title: "Capital initial", description: "Investissement plus important." }, { title: "Gestion", description: "Multiplication des locataires à gérer." }, { title: "Travaux", description: "Rénovation souvent nécessaire." }, { title: "Financement", description: "Dossier bancaire plus complexe." }] },
  exempleSection: { title: "Exemple concret", subtitle: "Un cas pratique pour mieux comprendre la rentabilité réelle" },
  conseil: { title: "Conseil Azalée Patrimoine", subtitle: "Expertise et accompagnement personnalisé pour votre projet", content: "L'immeuble de rapport est réservé aux investisseurs avertis mais offre des perspectives de rentabilité exceptionnelles." },
  finalCta: { title: "Investir dans un immeuble de rapport", subtitle: "Nos experts vous accompagnent pour identifier les meilleures opportunités.", primaryButton: "Découvrir les opportunités", secondaryButton: "Planifiez votre consultation gratuite" },
  seo: { metaTitle: "Immeubles de Rapport | Azalée Patrimoine", metaDescription: "Investissez dans un immeuble de rapport avec Azalée Patrimoine." },
  heroBadge: "Investissement immobilier"
};

export async function generateMetadata() {
  const content = await getPageContent('immobilier/immeubles-de-rapport', defaultContent);
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
  };
}

export default async function ImmeublesDeRapportPage() {
  const content = await getPageContent('immobilier/immeubles-de-rapport', defaultContent);
  
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
              <span className="inline-block bg-[#B99066] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                {content.heroBadge || defaultContent.heroBadge}
              </span>
              <h1 className="text-[#253F60] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {content.heroTitle || content.hero?.title}
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left" dangerouslySetInnerHTML={{__html: (content.heroSubtitle || content.hero?.subtitle || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
              
              <div className="flex justify-center lg:justify-start gap-4">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  {content.heroButton1 || content.hero?.button}
                </CTAButton>
              </div>
            </div>
            
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  {content.rightCardTitle || content.rightCard?.title}
                </h2>
              </div>
              
              <p className="text-white/80 text-sm mb-6">{content.rightCardSubtitle || content.rightCard?.subtitle}</p>
              
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  {(content.rightCardBenefits || content.rightCard?.benefits || []).map((benefit, index) => (
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.definitionTitle || content.definition?.title}</h2>
              </div>
          
          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 text-white shadow-xl">
            <p className="text-lg font-inter leading-relaxed text-center">{content.definitionText1 || content.definition?.description}</p>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
              <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-block mb-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                  </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.avantages?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.avantages?.subtitle}</p>
                </div>
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.avantages?.items || []).map((item, index) => (
              <div key={index} className={`rounded-2xl p-6 shadow-xl text-white ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]'}`}>
                <h3 className="font-cairo font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-white/90 text-sm font-inter">{item.description}</p>
              </div>
            ))}
                </div>
              </div>
            </section>

      {/* Inconvénients */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
              <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-block mb-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                  </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.inconvenients?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.inconvenients?.subtitle}</p>
                </div>
              
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.inconvenients?.items || []).map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#B99066] hover:shadow-xl transition-all duration-300">
                <h3 className="text-[#253F60] font-cairo font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-[#686868] text-sm font-inter">{item.description}</p>
              </div>
            ))}
                </div>
              </div>
            </section>

      {/* Conseil */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
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
