import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import SectionHeader from '../../../components/common/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';

// Default content (fallback)
const defaultContent = {
  hero: {
    title: "Immobilier neuf: investir dans la modernité et la fiscalité",
    subtitle: "Découvrez les opportunités d'investissement dans l'immobilier neuf avec nos experts. De la VEFA aux dispositifs fiscaux avantageux comme Pinel, Scellier et Robien, nous vous accompagnons dans vos projets d'investissement immobilier moderne.",
    backgroundImage: "/images/modern.webp",
    ctaText: "Planifiez votre consultation gratuite",
    badgeText: "0 €",
    badgeSubtext: "Analyse gratuite"
  },
  introduction: {
    title: "Qu'est-ce que l'immobilier neuf ?",
    content: "L'immobilier neuf représente une opportunité d'investissement moderne qui combine avantages fiscaux, garanties constructeur et valorisation patrimoniale. Que vous souhaitiez investir en VEFA (Vente en l'État Futur d'Achèvement) ou faire construire sur votre propre terrain, nos experts vous accompagnent dans chaque étape de votre projet."
  },
  dispositifsFiscaux: {
    title: "Les dispositifs fiscaux : Pinel, Scellier, Robien",
    subtitle: "Découvrez les dispositifs fiscaux avantageux pour l'investissement immobilier neuf",
    dispositifs: [
      {
        name: "Pinel",
        title: "Loi Pinel",
        description: "Réduction d'impôt jusqu'à 12% du prix d'acquisition sur 12 ans maximum",
        features: [
          "Investissement locatif neuf",
          "Réduction d'impôt progressive",
          "Engagement de location 6 à 12 ans",
          "Plafonds de loyer et de ressources"
        ],
        linkText: "",
        linkUrl: ""
      },
      {
        name: "Scellier",
        title: "Loi Scellier",
        description: "Dispositif fiscal pour l'investissement locatif dans le neuf (discontinué)",
        features: [
          "Réduction d'impôt sur le revenu",
          "Investissement locatif neuf",
          "Engagement de location 9 ans",
          "Dispositif historique"
        ],
        linkText: "Découvrir Scellier",
        linkUrl: "/immobilier/scellier"
      },
      {
        name: "Robien",
        title: "Loi Robien",
        description: "Ancien dispositif fiscal pour l'investissement locatif dans le neuf",
        features: [
          "Réduction d'impôt sur le revenu",
          "Investissement locatif neuf",
          "Engagement de location 5 ans",
          "Dispositif historique"
        ],
        linkText: "Découvrir Robien",
        linkUrl: "/immobilier/robien"
      }
    ]
  },
  vefa: {
    title: "VEFA : Vente en l'État Futur d'Achèvement",
    subtitle: "Investissez dans un bien immobilier neuf avant sa construction",
    description: "La VEFA vous permet d'acquérir un bien immobilier neuf avant même sa construction, avec des avantages fiscaux et financiers significatifs.",
    advantages: [
      {
        title: "Avantages fiscaux",
        description: "Bénéficiez des dispositifs Pinel, Scellier ou Robien selon votre situation"
      },
      {
        title: "Paiement échelonné",
        description: "Paiement progressif au fur et à mesure de l'avancement des travaux"
      },
      {
        title: "Garanties constructeur",
        description: "Garantie de parfait achèvement, garantie biennale et décennale"
      },
      {
        title: "Valorisation",
        description: "Potentiel de plus-value à la livraison du bien"
      }
    ],
    linkText: "Découvrir la VEFA",
    linkUrl: "/immobilier/vefa"
  },
  faireConstruire: {
    title: "Faire construire : terrain + maison",
    subtitle: "Construire sa maison sur son propre terrain offre de nombreux avantages : personnalisation totale, économies d'impôts, et investissement patrimonial durable",
    linkText: "Découvrir faire construire",
    linkUrl: "/immobilier/faire-construire"
  },
  advantages: {
    title: "Les avantages de l'investissement immobilier neuf",
    advantages: [
      {
        title: "Avantages fiscaux",
        description: "Bénéficiez de réductions d'impôt importantes avec les dispositifs Pinel, Scellier ou Robien",
        icon: "💰"
      },
      {
        title: "Garanties constructeur",
        description: "Protection maximale avec garantie de parfait achèvement, biennale et décennale",
        icon: "🛡️"
      },
      {
        title: "Modernité",
        description: "Bien conforme aux dernières normes énergétiques et de sécurité",
        icon: "🏗️"
      },
      {
        title: "Valorisation",
        description: "Potentiel de plus-value à la livraison et valorisation patrimoniale",
        icon: "📈"
      },
      {
        title: "Personnalisation",
        description: "Choix des finitions et aménagements selon vos préférences",
        icon: "🎨"
      },
      {
        title: "Maintenance réduite",
        description: "Pas de travaux de rénovation immédiats, tout est neuf",
        icon: "🔧"
      }
    ]
  },
  conclusion: {
    title: "Conclusion",
    content: "L'<strong>investissement immobilier</strong> n'est pas monolithique : il existe une stratégie adaptée à chaque objectif.",
    objectives: [
      {
        title: "Réduire vos impôts",
        description: "→ Loi Pinel, déficit foncier, LMNP"
      },
      {
        title: "Préparer votre retraite",
        description: "→ Investissement locatif, LMNP, SCI familiale"
      },
      {
        title: "Valoriser rapidement votre capital",
        description: "→ Immeubles de rapport, plus-value immobilière"
      }
    ],
    finalText: "Chez <strong>Azalée Patrimoine</strong>, nous analysons votre profil fiscal, patrimonial et vos objectifs pour bâtir une stratégie sur mesure.",
    primaryCta: {
      text: "Demander un bilan gratuit",
      url: "https://calendly.com/rdv-azalee-patrimoine/30min"
    },
    secondaryCta: {
      text: "Planifiez votre consultation gratuite",
      url: "https://calendly.com/rdv-azalee-patrimoine/30min"
    }
  },
  seo: {
    metaTitle: "Immobilier Neuf - Programmes Neufs | Azalée Patrimoine",
    metaDescription: "Immobilier neuf avec Azalée Patrimoine : programmes neufs sélectionnés, avantages fiscaux, garanties constructeur. Investissez dans l'immobilier neuf.",
    keywords: "immobilier neuf, programmes neufs, investissement immobilier, défiscalisation, Azalée Patrimoine",
    openGraphTitle: "Immobilier Neuf - Programmes Neufs | Azalée Patrimoine",
    openGraphDescription: "Immobilier neuf : programmes neufs sélectionnés, avantages fiscaux, garanties constructeur.",
    openGraphImage: "/images/modern.webp"
  },
  relatedLinks: {
    title: "Pages connexes",
    links: [
      { text: "VEFA", url: "/immobilier/vefa" },
      { text: "Scellier", url: "/immobilier/scellier" },
      { text: "Robien", url: "/immobilier/robien" },
      { text: "Faire construire", url: "/immobilier/faire-construire" },
      { text: "Investissement locatif", url: "/immobilier/investissement-locatif" }
    ]
  }
};

export async function generateMetadata() {
  const content = await getPageContent('immobilier/immobilier-neuf', defaultContent);
  
  return {
    title: content?.seo?.metaTitle || defaultContent.seo.metaTitle,
    description: content?.seo?.metaDescription || defaultContent.seo.metaDescription,
    keywords: content?.seo?.keywords || defaultContent.seo.keywords,
    openGraph: {
      title: content?.seo?.openGraphTitle || defaultContent.seo.openGraphTitle,
      description: content?.seo?.openGraphDescription || defaultContent.seo.openGraphDescription,
      images: [content?.seo?.openGraphImage || defaultContent.seo.openGraphImage],
    }
  };
}

export default async function ImmobilierNeufPage() {
  const content = await getPageContent('immobilier/immobilier-neuf', defaultContent);
  
  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Main Title */}
              <h1 className="text-[#112033] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {content.hero?.title}
              </h1>
              
              {/* Description */}
              <p className="text-[#374151] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-8 sm:mb-10 text-center lg:text-left">
                {content.hero?.subtitle}
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  {content.hero?.ctaText}
                </CTAButton>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-[467px] flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#B99066]/20 to-[#253F60]/20 rounded-2xl"></div>
                
                {/* Main image */}
                <img
                  src={content.hero?.backgroundImage}
                  alt="Immobilier neuf moderne - Architecture contemporaine et design élégant"
                  className="relative z-10 w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover border-4 border-white"
                  style={{ aspectRatio: '4/3' }}
                />
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#B99066] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-[#112033] font-semibold text-sm">{content.hero?.badgeText}</p>
                      <p className="text-[#4A5568] text-xs">{content.hero?.badgeSubtext}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <nav className="flex items-center text-xs sm:text-sm lg:text-base">
              <a href="/" className="text-[#253F60] font-source-sans font-semibold hover:underline">
                Accueil
              </a>
              <span className="text-[#686868] mx-2">{'>'}</span>
              <a href="/immobilier" className="text-[#253F60] font-source-sans font-semibold hover:underline">
                Immobilier
              </a>
              <span className="text-[#686868] mx-2">{'>'}</span>
              <span className="text-[#B99066] font-source-sans font-semibold">
                Immobilier Neuf
              </span>
            </nav>
          </div>

          {/* Introduction Section */}
          {content.introduction && (content.introduction.title || content.introduction.content) && (
            <div className="mb-8 sm:mb-12">
              <SectionHeader 
                title={content.introduction.title}
              />
              <div 
                className="text-[#374151] text-base sm:text-lg font-inter leading-relaxed max-w-4xl"
                dangerouslySetInnerHTML={{ __html: content.introduction.content }}
              />
            </div>
          )}

          {/* Dispositifs Fiscaux */}
          {content.dispositifsFiscaux && (
            <div className="mb-8 sm:mb-12">
              <SectionHeader 
                title={content.dispositifsFiscaux.title}
                subtitle={content.dispositifsFiscaux.subtitle}
              />
              {content.dispositifsFiscaux.dispositifs && content.dispositifsFiscaux.dispositifs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {content.dispositifsFiscaux.dispositifs.map((dispositif, index) => {
                    const gradientClass = index % 2 === 0 
                      ? "bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]"
                      : "bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]";
                    
                    return (
                      <div key={index} className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 group">
                        <div className={`h-48 ${gradientClass} flex items-center justify-center relative`}>
                          <div className={`absolute top-0 right-0 w-32 h-32 ${index % 2 === 0 ? 'bg-[#B99066]/10' : 'bg-[#253F60]/10'} rounded-bl-full`}></div>
                          <span className="text-white text-2xl font-bold relative z-10">{dispositif.name}</span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-[#253F60] font-cairo font-semibold text-xl mb-3">{dispositif.title}</h3>
                          <p className="text-[#374151] font-inter mb-4 leading-relaxed">{dispositif.description}</p>
                          {dispositif.features && dispositif.features.length > 0 && (
                            <ul className="text-[#374151] text-sm font-inter space-y-2">
                              {dispositif.features.map((feature, fIndex) => (
                                <li key={fIndex}>• {feature}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Aucun dispositif fiscal disponible
                </div>
              )}
              {content.dispositifsFiscaux.dispositifs && content.dispositifsFiscaux.dispositifs.some(d => d.linkText && d.linkUrl) && (
                <div className="text-center mt-8">
                  {content.dispositifsFiscaux.dispositifs
                    .filter(d => d.linkText && d.linkUrl)
                    .map((dispositif, index) => (
                      <a 
                        key={index}
                        href={dispositif.linkUrl} 
                        className={`inline-block ${index === 0 ? 'bg-[#B99066] hover:bg-[#A67A5A] mr-4' : 'bg-[#253F60] hover:bg-[#1E2F4A]'} text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-200`}
                      >
                        {dispositif.linkText}
                      </a>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* VEFA Section */}
          {content.vefa && (content.vefa.title || content.vefa.description) && (
            <div className="relative bg-gradient-to-br from-[#253F60]/10 via-[#F9FAFB] to-[#B99066]/10 rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border-l-4 border-[#253F60] shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
              <SectionHeader 
                title={content.vefa.title}
                subtitle={content.vefa.subtitle}
              />
              {content.vefa.description && (
                <div 
                  className="text-[#374151] text-base sm:text-lg font-inter leading-relaxed mb-6 relative z-10"
                  dangerouslySetInnerHTML={{ __html: content.vefa.description }}
                />
              )}
              {content.vefa.advantages && content.vefa.advantages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                  {content.vefa.advantages.map((advantage, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="text-[#253F60] font-cairo font-semibold text-lg mb-2">{advantage.title}</h4>
                      <p className="text-[#374151] font-inter text-sm">{advantage.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {content.vefa.linkText && content.vefa.linkUrl && (
                <div className="text-center mb-8 relative z-10">
                  <a 
                    href={content.vefa.linkUrl} 
                    className="inline-block bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {content.vefa.linkText}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Faire Construire */}
          {content.faireConstruire && (content.faireConstruire.title || content.faireConstruire.subtitle) && (
            <div className="relative bg-gradient-to-br from-[#253F60]/10 via-[#F9FAFB] to-[#B99066]/10 rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border-l-4 border-[#253F60] shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
              <SectionHeader 
                title={content.faireConstruire.title}
                subtitle={content.faireConstruire.subtitle}
              />
              {content.faireConstruire.linkText && content.faireConstruire.linkUrl && (
                <div className="text-center mb-8 relative z-10">
                  <a 
                    href={content.faireConstruire.linkUrl} 
                    className="inline-block bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {content.faireConstruire.linkText}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Advantages Section */}
          {content.advantages && content.advantages.advantages && content.advantages.advantages.length > 0 && (
            <div className="mb-8 sm:mb-12">
              <SectionHeader 
                title={content.advantages.title}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.advantages.advantages.map((advantage, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    {advantage.icon && (
                      <div className="text-4xl mb-4">{advantage.icon}</div>
                    )}
                    <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-2">{advantage.title}</h3>
                    <p className="text-[#374151] font-inter text-sm leading-relaxed">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {content.conclusion && (
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-center overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
              {content.conclusion.title && (
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6 relative z-10">
                  {content.conclusion.title}
                </h2>
              )}
              {content.conclusion.content && (
                <p 
                  className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed relative z-10"
                  dangerouslySetInnerHTML={{ __html: content.conclusion.content }}
                />
              )}
              
              {content.conclusion.objectives && content.conclusion.objectives.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                  {content.conclusion.objectives.map((objective, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h3 className="text-white font-cairo font-semibold text-lg mb-3">{objective.title}</h3>
                      <p className="text-white/90 text-sm font-inter mb-4">{objective.description}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {content.conclusion.finalText && (
                <p 
                  className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed relative z-10"
                  dangerouslySetInnerHTML={{ __html: content.conclusion.finalText }}
                />
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                {content.conclusion.primaryCta && content.conclusion.primaryCta.text && (
                  <CTAButton 
                    externalUrl={content.conclusion.primaryCta.url || 'https://calendly.com/rdv-azalee-patrimoine/30min'}
                    variant="white"
                  >
                    {content.conclusion.primaryCta.text}
                  </CTAButton>
                )}
                {content.conclusion.secondaryCta && content.conclusion.secondaryCta.text && (
                  <CTAButton 
                    externalUrl={content.conclusion.secondaryCta.url || 'https://calendly.com/rdv-azalee-patrimoine/30min'}
                    variant="secondary"
                  >
                    {content.conclusion.secondaryCta.text}
                  </CTAButton>
                )}
              </div>
            </div>
          )}

          {/* Related Links */}
          {content.relatedLinks && content.relatedLinks.links && content.relatedLinks.links.length > 0 && (
            <div className="mt-8 sm:mt-12">
              <h3 className="text-[#253F60] font-cairo font-semibold text-xl mb-4">
                {content.relatedLinks.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {content.relatedLinks.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-[#B99066] font-inter font-medium hover:underline"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
}
