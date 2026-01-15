import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

const defaultContent = {
  hero: {
    title: "LMNP (Loueur Meublé Non Professionnel) : un dispositif fiscal avantageux pour investir dans l'immobilier locatif",
    subtitle: "Le statut de Loueur Meublé Non Professionnel (LMNP) est l'un des dispositifs fiscaux les plus attractifs pour les investisseurs particuliers. Il permet de louer un logement meublé (studio, colocation, résidence gérée…) tout en bénéficiant d'un régime fiscal très favorable.",
    description: "Contrairement à la location nue, les loyers perçus sont déclarés non pas en revenus fonciers, mais en BIC (Bénéfices Industriels et Commerciaux). Cette distinction ouvre la possibilité d'amortir le bien et le mobilier, réduisant fortement – voire annulant – l'imposition sur les loyers pendant plusieurs années.",
    example: "Exemple simple : un studio acheté 120 000 € et loué 550 €/mois. Grâce à l'amortissement, les loyers sont quasi non imposés pendant 15 à 20 ans.",
    button: "Simuler votre projet LMNP",
  },
  rightCard: {
    title: "Nos experts à votre service",
    benefits: [
      "Fiscalité très avantageuse avec amortissement",
      "Loyers quasi exonérés d'impôt pendant 15-20 ans",
      "Flexibilité d'investissement (studio, résidence gérée)",
      "Revenus complémentaires sécurisés",
    ],
    floatingText: "0 € →\nAnalyse personnalisée gratuite",
  },
  sommaire: {
    items: [
      "Les avantages du LMNP",
      "Les inconvénients et points de vigilance",
      "Le nouveau traitement de la plus-value en LMNP",
      "Exemple concret",
      "LMNP en direct ou en résidence gérée ?",
      "Conseil Azalée Patrimoine",
    ],
  },
  avantages: {
    title: "Les avantages du LMNP",
    subtitle: "Découvrez les bénéfices du dispositif LMNP pour votre patrimoine",
    cards: [
      {
        title: "Fiscalité très avantageuse",
        bullets: [
          "L'amortissement du bien et du mobilier permet de gommer une grande partie du bénéfice imposable",
          "En pratique, les loyers encaissés sont souvent exonérés d'impôt pendant 15 à 20 ans",
        ],
      },
      {
        title: "Flexibilité d'investissement",
        bullets: [
          "Le LMNP s'applique aussi bien à un studio classique qu'à des résidences gérées (étudiantes, seniors, EHPAD, tourisme)",
          "Vous pouvez investir en direct ou via un exploitant professionnel",
        ],
      },
      {
        title: "Revenus complémentaires sécurisés",
        bullets: [
          "En location meublée classique, vous fixez librement le loyer et choisissez vos locataires",
          "En résidence gérée, vous signez un bail commercial avec un exploitant qui vous verse un loyer régulier, que le logement soit occupé ou non",
        ],
      },
      {
        title: "Transmission facilitée",
        bullets: [
          "Le LMNP reste une activité non professionnelle, donc plus simple à transmettre qu'un statut professionnel (LMP)",
        ],
      },
    ],
  },
  inconvenients: {
    title: "Les inconvénients et points de vigilance",
    subtitle: "Points de vigilance à connaître avant de vous lancer",
    cards: [
      {
        title: "Gestion plus lourde en direct",
        bullets: [
          "Recherche de locataires",
          "Turnover plus élevé (étudiants, jeunes actifs)",
          "Entretien du mobilier",
        ],
      },
      {
        title: "Dépendance à l'exploitant en résidence gérée",
        bullets: [
          "Si la société de gestion connaît des difficultés, vos loyers peuvent être impactés",
        ],
      },
      {
        title: "Risque de vacance locative",
        bullets: [
          "En direct, un logement mal placé ou mal meublé peut rester vide plusieurs mois",
        ],
      },
      {
        title: "Revente encadrée",
        bullets: [
          "En résidence gérée, le marché secondaire peut être moins liquide que pour un logement classique",
        ],
      },
    ],
  },
  plusValue: {
    title: "Le nouveau traitement de la plus-value en LMNP",
    subtitle: "Comprendre les évolutions réglementaires et leurs impacts",
    bulletsSectionTitle: "Points essentiels à retenir",
    paragraphs: [
      "Jusqu'ici, l'un des grands atouts du LMNP était que l'amortissement pratiqué sur le bien n'était pas réintégré dans le calcul de la plus-value. Autrement dit, vous profitiez d'années de loyers quasi exonérés d'impôt sans pénalité à la revente.",
      "Désormais, l'administration fiscale a précisé que l'amortissement doit être pris en compte dans certaines conditions lors du calcul de la plus-value en cas de cession. Cela signifie que la plus-value imposable peut être plus élevée que prévu.",
      "Toutefois, il est essentiel de garder une vision long terme :",
    ],
    bullets: [
      "Le LMNP reste une stratégie sur 15 à 20 ans",
      "Les avantages fiscaux immédiats (loyers peu ou pas imposés) compensent largement cet ajustement à la sortie",
      "La revente peut toujours être optimisée via une bonne anticipation et une détention longue",
    ],
  },
  exemple: {
    title: "Exemple concret",
    subtitle: "Un exemple concret pour mieux comprendre le dispositif",
    description: "Un investisseur achète un studio 120 000 € en LMNP, financé par crédit. Loué 550 €/mois, il perçoit 6 600 € par an. Grâce à l'amortissement (environ 4 000 €/an), son revenu imposable est nul. Pendant 15 ans, il encaisse plus de 90 000 € de loyers quasi exonérés d'impôt.",
    conclusion: "À la revente, la fiscalité sur la plus-value doit intégrer une partie des amortissements pratiqués. Mais l'investisseur a déjà largement profité d'une fiscalité allégée pendant 15 ans, ce qui compense ce traitement.",
  },
  comparaison: {
    title: "LMNP en direct ou en résidence gérée ?",
    subtitle: "Comparez les deux approches pour choisir celle qui vous convient",
    options: [
      {
        title: "En direct (studio, colocation, petite surface en ville)",
        bullets: [
          "Plus de liberté dans le choix du locataire et du loyer",
          "Rentabilité brute généralement plus élevée",
          "Gestion plus chronophage",
        ],
      },
      {
        title: "En résidence gérée (tourisme, étudiant, EHPAD, seniors)",
        bullets: [
          "Revenus sécurisés par un bail commercial avec un exploitant",
          "Zéro gestion locative",
          "Rentabilité légèrement inférieure et dépendance à la santé financière de l'exploitant",
        ],
      },
    ],
  },
  conseil: {
    title: "Conseil Azalée Patrimoine",
    subtitle: "Expertise et accompagnement personnalisé pour votre projet LMNP",
    bulletsSectionTitle: "Chez Azalée Patrimoine, nous vous aidons à :",
    paragraphs: [
      "Le LMNP reste un des dispositifs fiscaux les plus efficaces pour se constituer des revenus complémentaires. L'impact du nouveau traitement de la plus-value ne doit pas faire oublier que le cœur de la stratégie se joue sur le long terme : lissage des revenus, fiscalité allégée et patrimoine constitué sur 15 à 20 ans.",
    ],
    bullets: [
      "Choisir entre investissement en direct ou en résidence gérée",
      "Sécuriser vos loyers grâce à un bon emplacement ou un exploitant solide",
      "Anticiper la fiscalité de la revente pour éviter les mauvaises surprises",
    ],
    conclusion: "Le LMNP est un outil puissant pour diversifier vos revenus et préparer votre retraite sereinement.",
  },
  finalCta: {
    title: "Prêt à investir en LMNP ?",
    subtitle: "Nos experts Azalée Patrimoine vous accompagnent pour construire votre stratégie d'investissement LMNP et optimiser votre défiscalisation immobilière.",
    primaryButton: "Simuler mon projet LMNP",
    secondaryButton: "Planifiez votre consultation gratuite",
  },
  seo: {
    metaTitle: "LMNP - Loueur Meublé Non Professionnel | Azalée Patrimoine",
    metaDescription: "Découvrez le statut LMNP, un dispositif fiscal avantageux pour investir dans l'immobilier locatif meublé. Conseils d'experts Azalée Patrimoine.",
    keywords: ["LMNP", "loueur meublé non professionnel", "investissement locatif", "défiscalisation", "immobilier meublé"],
  },
};

export async function generateMetadata() {
  const content = await getPageContent('immobilier/lmnp', defaultContent);
  
  return {
    title: content?.seo?.metaTitle,
    description: content?.seo?.metaDescription,
    keywords: content?.seo?.keywords?.join(', '),
  };
}

export default async function LMNPPage() {
  const content = await getPageContent('immobilier/lmnp', defaultContent);
  
  if (!content) {
    notFound();
  }

  const hero = content.hero;
  const rightCard = content.rightCard;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                {hero?.title}
              </h1>
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-8 sm:mb-10 text-center lg:text-left">
                {hero?.subtitle}
              </p>
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                {hero?.description}
              </p>
              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <p className="text-white text-xs sm:text-sm font-inter">
                  {hero?.example}
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  {hero?.button}
                </CTAButton>
              </div>
            </div>
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  {rightCard?.title}
                </h2>
              </div>
              <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                  <span className="hidden sm:block">{(rightCard?.floatingText || "").split("\n")[0]}<br /></span>
                  <span className="sm:hidden">0€</span>
                  <span className="hidden sm:block">{(rightCard?.floatingText || "").split("\n")[1]}</span>
                </div>
              </div>
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  {(rightCard?.benefits || []).map((benefit, index) => (
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

      {/* Avantages Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
              {content.avantages?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.avantages?.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(content.avantages?.cards || []).map((card, i) => (
              <div 
                key={i} 
                className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                  i % 2 === 0 
                    ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white' 
                    : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white'
                }`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${
                  i % 2 === 0 ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                } rounded-bl-full`}></div>
                
                <h3 className="font-cairo font-bold text-xl sm:text-2xl mb-6 relative z-10">{card.title}</h3>
                <ul className="space-y-3 sm:space-y-4 relative z-10">
                  {(card.bullets || []).map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className={`mt-1 font-bold text-xl ${
                        i % 2 === 0 ? 'text-[#B99066]' : 'text-[#253F60]'
                      }`}>•</span>
                      <span className="text-base sm:text-lg font-inter leading-relaxed flex-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inconvénients Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
              {content.inconvenients?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.inconvenients?.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(content.inconvenients?.cards || []).map((card, i) => (
              <div 
                key={i} 
                className={`relative rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-l-4 ${
                  i % 2 === 0 
                    ? 'bg-gradient-to-br from-white via-[#F9FAFB] to-white border-[#253F60]' 
                    : 'bg-gradient-to-br from-white via-[#F9FAFB] to-white border-[#B99066]'
                }`}
              >
                <div className={`absolute top-0 right-0 w-20 h-20 ${
                  i % 2 === 0 ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5'
                } rounded-bl-full`}></div>
                
                <h3 className={`font-cairo font-bold text-xl sm:text-2xl mb-6 relative z-10 ${
                  i % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'
                }`}>{card.title}</h3>
                <ul className="space-y-3 sm:space-y-4 relative z-10">
                  {(card.bullets || []).map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className={`mt-1 font-bold text-xl ${
                        i % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'
                      }`}>•</span>
                      <span className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed flex-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plus-Value Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
              {content.plusValue?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.plusValue?.subtitle}
            </p>
          </div>
          
          <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border-l-4 border-[#253F60] overflow-hidden">
            <div className="space-y-6 sm:space-y-8 text-[#686868] font-inter relative z-10">
              {(content.plusValue?.paragraphs || []).map((p, i) => (
                <p key={i} className="text-lg sm:text-xl leading-relaxed">{p}</p>
              ))}
              
              {(content.plusValue?.bullets || []).length > 0 && (
                <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl p-8 sm:p-10 mt-8 shadow-lg overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                      <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold">
                        {content.plusValue?.bulletsSectionTitle}
                      </h3>
                    </div>
                    <ul className="space-y-4 sm:space-y-5">
                      {content.plusValue.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                          <span className="text-white text-lg sm:text-xl leading-relaxed flex-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Exemple Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
              {content.exemple?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.exemple?.subtitle}
            </p>
          </div>
          
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
            <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-8 sm:p-10 mb-6 sm:mb-8 border border-white/20 shadow-lg">
              <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed">
                {content.exemple?.description}
              </p>
            </div>
            
            <div className="relative bg-gradient-to-r from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-xl p-8 sm:p-10 border-l-4 border-white shadow-lg overflow-hidden">
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 w-1 h-full bg-white rounded-full min-h-[60px]"></div>
                <p className="text-white text-base sm:text-lg lg:text-xl font-inter leading-relaxed font-medium flex-1">
                  {content.exemple?.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparaison Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
              {content.comparaison?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.comparaison?.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {(content.comparaison?.options || []).map((option, i) => (
              <div 
                key={i} 
                className={`relative rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                  i === 0 
                    ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white' 
                    : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white'
                }`}
              >
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                  i === 0 ? 'bg-[#B99066] text-white' : 'bg-[#253F60] text-white'
                }`}>
                  {i === 0 ? 'Option 1' : 'Option 2'}
                </div>
                
                <h3 className="font-cairo font-bold text-2xl sm:text-3xl mb-6 sm:mb-8 relative z-10">{option.title}</h3>
                <ul className="space-y-4 sm:space-y-5 relative z-10">
                  {(option.bullets || []).map((b, j) => (
                    <li key={j} className="flex items-start gap-4 group">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 shadow-lg ${
                        i === 0 ? 'bg-[#B99066]' : 'bg-[#253F60]'
                      }`}>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-lg sm:text-xl font-inter leading-relaxed flex-1 pt-0.5">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conseil Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
              {content.conseil?.title}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              {content.conseil?.subtitle}
            </p>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {(content.conseil?.paragraphs || []).map((p, i) => (
              <div 
                key={i} 
                className="relative rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white"
              >
                <p className="text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed relative z-10 font-light">
                  {p}
                </p>
              </div>
            ))}
            
            {(content.conseil?.bullets || []).length > 0 && (
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold">
                      {content.conseil?.bulletsSectionTitle}
                    </h3>
                  </div>
                  <ul className="space-y-4 sm:space-y-5">
                    {content.conseil.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center mt-0.5 shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white text-lg sm:text-xl font-inter leading-relaxed flex-1 pt-0.5">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {content.conseil?.conclusion && (
              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl">
                <div className="relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full bg-[#253F60] rounded-full min-h-[60px]"></div>
                    <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed font-medium italic">
                      {content.conseil.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-10 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#B99066]/20 rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-tl-full"></div>
            
            <div className="relative z-10">
              <div className="inline-block mb-6">
                <div className="w-20 h-1 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-full mx-auto"></div>
              </div>
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 sm:mb-8">
                {content.finalCta?.title}
              </h2>
              <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-inter mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                {content.finalCta?.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  variant="white"
                >
                  {content.finalCta?.primaryButton}
                </CTAButton>
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  variant="secondary"
                >
                  {content.finalCta?.secondaryButton}
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
