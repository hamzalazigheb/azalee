import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

const defaultContent = {
  hero: { 
    title: "SCI : un outil de gestion et de transmission patrimoniale", 
    subtitle: "La Société Civile Immobilière (SCI) est une structure juridique très utilisée par les familles et les investisseurs pour acheter, gérer et transmettre un bien immobilier à plusieurs.",
    subtitle2: "La SCI est ainsi devenue un véritable outil de stratégie patrimoniale, que ce soit pour acquérir un bien avec des proches, préparer sa succession ou optimiser la fiscalité de ses revenus immobiliers.",
    button1: "Les avantages", 
    button2: "IR ou IS ?" 
  },
  rightCard: { 
    title: "SCI : gérez et transmettez", 
    subtitle: "Outil puissant de gestion et de transmission patrimoniale", 
    benefits: ["Souplesse familiale", "Gestion simplifiée", "Optimisation fiscale IR/IS"], 
    button1: "Conseil expert", 
    button2: "Fiscalité" 
  },
  avantages: { 
    title: "Les avantages de la SCI",
    subtitle: "Découvrez les bénéfices de cette structure patrimoniale",
    items: [
      { title: "Souplesse familiale", description: "La SCI facilite la transmission d'un patrimoine. Les associés peuvent donner progressivement des parts sociales à leurs enfants, tout en bénéficiant de l'abattement de 100 000 € par parent et par enfant, renouvelable tous les 15 ans." },
      { title: "Gestion simplifiée", description: "Contrairement à l'indivision, source fréquente de blocages entre héritiers, la SCI offre une gouvernance claire : un gérant est désigné, et les règles de prise de décision sont fixées dans les statuts." },
      { title: "Optimisation fiscale", description: "La SCI offre la possibilité de choisir entre deux régimes fiscaux : SCI à l'IR (revenus imposés directement chez les associés) ou SCI à l'IS (amortissement possible du bien)." }
    ] 
  },
  inconvenients: { 
    title: "Les inconvénients de la SCI",
    subtitle: "Points de vigilance essentiels à connaître avant de créer une SCI",
    items: [
      { title: "Formalités de création et de gestion", description: "Une SCI nécessite des statuts, une assemblée générale annuelle et une comptabilité plus stricte qu'une détention en direct." },
      { title: "Responsabilité des associés", description: "Chacun est indéfiniment responsable des dettes sociales, à hauteur de sa participation." },
      { title: "Choix fiscal piégeux", description: "Le passage à l'IS peut sembler attractif, mais il entraîne une fiscalité lourde sur la plus-value à la revente." }
    ] 
  },
  fiscalite: { 
    title: "SCI à l'IR ou SCI à l'IS : quel régime choisir ?",
    subtitle: "Comparez les deux régimes fiscaux pour choisir celui qui vous convient",
    ir: { title: "SCI à l'IR", description: "Adaptée pour des investisseurs qui perçoivent des loyers modestes ou qui souhaitent profiter du déficit foncier.", avantages: "Fiscalité simple, déficit foncier possible", inconvenients: "Fiscalité lourde si revenus élevés" },
    is: { title: "SCI à l'IS", description: "Intéressante pour des projets générant beaucoup de loyers ou nécessitant d'importants travaux.", avantages: "Amortissement possible, réduction du bénéfice imposable", inconvenients: "Sortie pénalisante, plus-value calculée sur valeur réduite" }
  },
  exemple: { 
    title: "Exemple concret",
    subtitle: "Un cas pratique pour mieux comprendre l'utilité de la SCI",
    description: "Deux frères héritent d'un immeuble évalué à 600 000 €",
    sansSci: ["Chaque décision doit être prise à l'unanimité", "Risque de blocages familiaux", "Gestion complexe", "Transmission difficile"],
    avecSci: ["Création d'une SCI avec statuts clairs", "Choix du régime IR (abattements durée)", "Gérant désigné avec pouvoirs définis", "Évite les blocages familiaux"],
    conclusion: "Les statuts définissent les pouvoirs du gérant et évitent les blocages familiaux. Les frères peuvent anticiper la transmission progressive à leurs enfants."
  },
  conseil: { 
    title: "Conseil Azalée Patrimoine",
    subtitle: "Expertise et accompagnement personnalisé pour votre projet",
    paragraphs: ["La SCI est un outil puissant de gestion et de transmission, mais elle doit être maniée avec précaution.", "Chez Azalée Patrimoine, nous accompagnons nos clients pour :"],
    items: ["Créer leur SCI avec des statuts adaptés à leur situation familiale", "Choisir le régime fiscal le plus pertinent (IR ou IS)", "Anticiper la transmission de leurs biens immobiliers"],
    conclusion: "La SCI n'est pas une simple boîte à outils juridique : bien pensée, elle devient un véritable levier patrimonial."
  },
  finalCta: { 
    title: "Prêt à créer votre SCI ?", 
    subtitle: "Nos experts vous accompagnent pour définir la fiscalité la plus avantageuse.", 
    primaryButton: "Planifiez votre consultation gratuite", 
    secondaryButton: "Nous écrire" 
  },
  seo: { metaTitle: "SCI - Société Civile Immobilière | Azalée Patrimoine", metaDescription: "La SCI est un outil de gestion et de transmission patrimoniale. Découvrez ses avantages avec Azalée Patrimoine." }
};

export async function generateMetadata() {
  const content = await getPageContent('immobilier/sci', defaultContent);
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
  };
}

export default async function Page() {
  const content = await getPageContent('immobilier/sci', defaultContent);
  
  if (!content) {
    notFound();
  }

  const iconPaths = {
    avantages: [
      "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ],
    inconvenients: [
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ]
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
                {content.hero?.title}
              </h1>
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {content.hero?.subtitle}
              </p>
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {content.hero?.subtitle2}
              </p>
              {/* Boutons de scroll supprimés - sections juste en dessous */}
            </div>
            
            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight mb-2">{content.rightCard?.title}</h2>
              <p className="text-sm opacity-90 mb-4">{content.rightCard?.subtitle}</p>
              <ul className="space-y-2 text-sm font-source-sans font-semibold">
                {(content.rightCard?.benefits || []).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2"><span>✓</span><span>{benefit}</span></li>
                ))}
              </ul>
              <div className="mt-6">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  {content.rightCard?.button1}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.avantages?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.avantages?.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(content.avantages?.items || []).map((item, index) => {
              const isEven = index % 2 === 0;
              const borderClass = isEven ? 'hover:border-[#253F60]' : 'hover:border-[#B99066]';
              const bgClass = isEven ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5';
              const gradientClass = isEven ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';
              
              return (
                <div key={index} className={`group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] ${borderClass} transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-20 h-20 ${bgClass} rounded-bl-full`}></div>
                  <div className={`w-16 h-16 ${gradientClass} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths.avantages[index] || iconPaths.avantages[0]} />
                    </svg>
                  </div>
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">{item.title}</h3>
                  <p className="text-[#686868] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{__html: item.description?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || ''}} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inconvénients */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.inconvenients?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.inconvenients?.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(content.inconvenients?.items || []).map((item, index) => {
              const isEven = index % 2 === 0;
              const borderClass = isEven ? 'hover:border-[#253F60]' : 'hover:border-[#B99066]';
              const bgClass = isEven ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5';
              const gradientClass = isEven ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';
              
              return (
                <div key={index} className={`group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] ${borderClass} transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-20 h-20 ${bgClass} rounded-bl-full`}></div>
                  <div className={`w-16 h-16 ${gradientClass} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths.inconvenients[index] || iconPaths.inconvenients[0]} />
                    </svg>
                  </div>
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">{item.title}</h3>
                  <p className="text-[#686868] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{__html: item.description?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || ''}} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fiscalité IR vs IS */}
      <section id="fiscalite" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.fiscalite?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.fiscalite?.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                  <h3 className="text-2xl sm:text-3xl font-cairo font-bold">{content.fiscalite?.ir?.title}</h3>
                </div>
                <p className="text-base sm:text-lg mb-6 leading-relaxed">{content.fiscalite?.ir?.description}</p>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Avantages :</strong> {content.fiscalite?.ir?.avantages}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Inconvénients :</strong> {content.fiscalite?.ir?.inconvenients}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[#253F60] rounded-full"></div>
                  <h3 className="text-2xl sm:text-3xl font-cairo font-bold">{content.fiscalite?.is?.title}</h3>
                </div>
                <p className="text-base sm:text-lg mb-6 leading-relaxed">{content.fiscalite?.is?.description}</p>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Avantages :</strong> {content.fiscalite?.is?.avantages}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base"><strong>Inconvénients :</strong> {content.fiscalite?.is?.inconvenients}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemple concret */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.exemple?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.exemple?.subtitle}</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl">
            <p className="text-xl sm:text-2xl font-cairo font-bold mb-8 text-center">{content.exemple?.description}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-cairo font-bold mb-4 text-[#B99066]">❌ Sans SCI (indivision)</h4>
                <ul className="space-y-3">
                  {(content.exemple?.sansSci || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B99066]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-cairo font-bold mb-4 text-green-400">✓ Avec SCI</h4>
                <ul className="space-y-3">
                  {(content.exemple?.avecSci || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6">
              <p className="text-white font-inter">{content.exemple?.conclusion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conseil */}
      <section id="conseil" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">{content.conseil?.title}</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">{content.conseil?.subtitle}</p>
          </div>
          
          <div className="space-y-6">
            {(content.conseil?.paragraphs || []).map((p, i) => (
              <div key={i} className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 text-white shadow-xl">
                <p className="text-lg font-inter leading-relaxed">{p}</p>
              </div>
            ))}
            
            <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 text-white shadow-xl">
              <ul className="space-y-4">
                {(content.conseil?.items || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#B99066] text-xl">✓</span>
                    <span className="text-lg font-inter">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {content.conseil?.conclusion && (
              <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-2xl p-8 text-white shadow-xl">
                <p className="text-lg font-inter leading-relaxed italic">{content.conseil.conclusion}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 lg:py-24">
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
