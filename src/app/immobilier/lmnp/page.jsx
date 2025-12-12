"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

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
    icon: null, // Using SVG inline instead
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
    description: "Un investisseur achète un studio 120 000 € en LMNP, financé par crédit. Loué 550 €/mois, il perçoit 6 600 € par an. Grâce à l'amortissement (environ 4 000 €/an), son revenu imposable est nul. Pendant 15 ans, il encaisse plus de 90 000 € de loyers quasi exonérés d'impôt.",
    conclusion: "À la revente, la fiscalité sur la plus-value doit intégrer une partie des amortissements pratiqués. Mais l'investisseur a déjà largement profité d'une fiscalité allégée pendant 15 ans, ce qui compense ce traitement.",
  },
  comparaison: {
    title: "LMNP en direct ou en résidence gérée ?",
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
    paragraphs: [
      "Le LMNP reste un des dispositifs fiscaux les plus efficaces pour se constituer des revenus complémentaires. L'impact du nouveau traitement de la plus-value ne doit pas faire oublier que le cœur de la stratégie se joue sur le long terme : lissage des revenus, fiscalité allégée et patrimoine constitué sur 15 à 20 ans.",
      "Chez Azalée Patrimoine, nous vous aidons à :",
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
    secondaryButton: "Prendre rendez-vous",
  },
  sectionOrder: [
    "hero",
    "avantages",
    "inconvenients",
    "plusValue",
    "exemple",
    "comparaison",
    "conseil",
    "finalCta",
  ],
};

export default function LMNPPage() {
  const [content] = useState(defaultContent);

  // Use static content directly
  const hero = defaultContent.hero;
  const rightCard = defaultContent.rightCard;
  const imageBlock = defaultContent.imageBlock;
  const sections = defaultContent.sectionOrder;

  const renderSection = (key) => {
    switch (key) {
      case "hero":
        return (
          <section key="hero" className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
                  <h1 className="text-[#253F60] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                    {hero.title}
                  </h1>
                  <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-8 sm:mb-10 text-center lg:text-left">
                    {hero.subtitle}
                  </p>
                  <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                    {hero.description}
                  </p>
                  <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <p className="text-white text-xs sm:text-sm font-inter">
                      {hero.example}
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-start">
                    <button 
                    onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
                  >
                      {hero.button}
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                      {rightCard.title}
                    </h2>
                  </div>
                  <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                    <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                      <span className="hidden sm:block">{(rightCard.floatingText || "").split("\n")[0]}<br /></span>
                      <span className="sm:hidden">0€</span>
                      <span className="hidden sm:block">{(rightCard.floatingText || "").split("\n")[1]}</span>
                    </div>
                  </div>
                  <div className="mt-8 sm:mt-12">
                    <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                      {(rightCard.benefits || []).map((benefit, index) => (
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
        );
      case "imageBlock":
        return (
          <section key="imageBlock" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 sm:mb-12">
                <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-lg p-6 sm:p-8 overflow-hidden border border-[#E5E7EB]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-[#253F60] text-lg sm:text-xl font-cairo font-semibold mb-4">
                        {imageBlock.title}
                      </h3>
                      <p className="text-[#686868] font-inter mb-4">{imageBlock.intro}</p>
                      <ul className="text-[#686868] font-inter space-y-2">
                        {(imageBlock.bullets || []).map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#253F60] mt-1">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <img
                        src={imageBlock.image}
                        alt="Investissement immobilier LMNP - Exemple"
                        className="w-full h-auto rounded-lg object-cover shadow-lg"
                        style={{ maxHeight: "300px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "exemple":
        return (
          <section key="exemple" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                  {defaultContent.exemple?.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Un exemple concret pour mieux comprendre le dispositif
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
                
                {/* Description card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-8 sm:p-10 mb-6 sm:mb-8 border border-white/20 shadow-lg">
                  <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed">
                    {defaultContent.exemple?.description}
                  </p>
                </div>
                
                {/* Conclusion card */}
                <div className="relative bg-gradient-to-r from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-xl p-8 sm:p-10 border-l-4 border-white shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="flex-shrink-0 w-1 h-full bg-white rounded-full min-h-[60px]"></div>
                    <p className="text-white text-base sm:text-lg lg:text-xl font-inter leading-relaxed font-medium flex-1">
                      {defaultContent.exemple?.conclusion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "plusValue":
        return (
          <section key="plusValue" className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                  {defaultContent.plusValue?.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Comprendre les évolutions réglementaires et leurs impacts
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border-l-4 border-[#253F60] overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#253F60]/5 rounded-bl-full"></div>
                
                <div className="space-y-6 sm:space-y-8 text-[#686868] font-inter relative z-10">
                  {(defaultContent.plusValue?.paragraphs || []).map((p, i) => (
                    <p key={i} className="text-lg sm:text-xl leading-relaxed">{p}</p>
                  ))}
                  
                  {(defaultContent.plusValue?.bullets || []).length > 0 && (
                    <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl p-8 sm:p-10 mt-8 shadow-lg overflow-hidden">
                      {/* Decorative border */}
                      <div className="absolute inset-0 rounded-xl border-2 border-[#B99066]/30"></div>
                      <div className="absolute top-0 left-0 w-24 h-24 bg-[#B99066]/20 rounded-br-full"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                          <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold">
                            Points essentiels à retenir
                          </h3>
                        </div>
                        <ul className="space-y-4 sm:space-y-5">
                          {defaultContent.plusValue.bullets.map((b, i) => (
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
        );
      case "avantages":
        return (
          <section key="avantages" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                  {defaultContent.avantages?.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Découvrez les bénéfices du dispositif LMNP pour votre patrimoine
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {(defaultContent.avantages?.cards || []).map((card, i) => (
                  <div 
                    key={i} 
                    className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                      i % 2 === 0 
                        ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white' 
                        : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white'
                    }`}
                  >
                    {/* Decorative corner */}
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
        );
      case "conditions":
        return (
          <section key="conditions" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.conditions?.title}
                </h2>
                <div className="space-y-6 text-[#686868] font-inter">
                  {(content.conditions?.cards || []).map((card, i) => (
                    <div key={i} className="bg-gradient-to-br from-[#F9FAFB] to-white p-6 rounded-lg border border-[#E5E7EB]">
                      <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-4">{card.title}</h3>
                      <ul className="space-y-2">
                        {(card.bullets || []).map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-[#253F60] mt-1">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case "declaration":
        return (
          <section key="declaration" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border border-[#E5E7EB]">
                <h2 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.declaration?.title}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {(content.declaration?.cards || []).map((card, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-[#253F60] font-cairo font-semibold text-xl mb-4">{card.title}</h3>
                      <ul className="space-y-3 text-[#686868] font-inter">
                        {(card.bullets || []).map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-[#253F60] mt-1">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case "comparaison":
        return (
          <section key="comparaison" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                  {defaultContent.comparaison?.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Comparez les deux approches pour choisir celle qui vous convient
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {(defaultContent.comparaison?.options || []).map((option, i) => (
                  <div 
                    key={i} 
                    className={`relative rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                      i === 0 
                        ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white' 
                        : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white'
                    }`}
                  >
                    {/* Decorative corner */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${
                      i === 0 ? 'bg-[#B99066]/10' : 'bg-[#253F60]/10'
                    } rounded-bl-full`}></div>
                    
                    {/* Badge */}
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                      i === 0 ? 'bg-[#B99066] text-white' : 'bg-[#253F60] text-white'
                    }`}>
                      {i === 0 ? 'Option 1' : 'Option 2'}
                    </div>
                    
                    <h3 className="font-cairo font-bold text-2xl sm:text-3xl mb-6 sm:mb-8 relative z-10">{option.title}</h3>
                    <ul className="space-y-4 sm:space-y-5 relative z-10">
                      {(option.bullets || []).map((b, j) => (
                        <li key={j} className="flex items-start gap-4 group">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300 ${
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
        );
      case "residences":
        return (
          <section key="residences" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border border-[#E5E7EB]">
                <h2 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.residences?.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {(content.residences?.items || []).map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-md text-center">
                      <h3 className="text-[#253F60] font-cairo font-semibold mb-2">{item.title}</h3>
                      <p className="text-[#686868] text-sm font-inter">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case "conseil":
        return (
          <section key="conseil" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                  {defaultContent.conseil?.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Expertise et accompagnement personnalisé pour votre projet LMNP
                </p>
              </div>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Premier paragraphe - Gradient bleu avec effet premium */}
                {(defaultContent.conseil?.paragraphs || []).map((p, i) => (
                  <div 
                    key={i} 
                    className={`relative rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden ${
                      i === 0 
                        ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white' 
                        : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white'
                    }`}
                  >
                    {/* Decorative element */}
                    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 ${
                      i === 0 ? 'bg-[#B99066]' : 'bg-[#253F60]'
                    } rounded-full -mr-16 -mt-16`}></div>
                    <p className="text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed relative z-10 font-light">
                      {p}
                    </p>
                  </div>
                ))}
                
                {/* Liste à puces - Design premium avec gradient */}
                {(defaultContent.conseil?.bullets || []).length > 0 && (
                  <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
                    {/* Decorative border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#B99066]/30"></div>
                    {/* Decorative corner */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-[#B99066]/20 rounded-br-full"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6 sm:mb-8">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                        <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold">
                          Chez Azalée Patrimoine, nous vous aidons à :
                        </h3>
                      </div>
                      <ul className="space-y-4 sm:space-y-5">
                        {defaultContent.conseil.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-4 group">
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center mt-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                
                {/* Conclusion - Design premium doré */}
                {defaultContent.conseil?.conclusion && (
                  <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
                    {/* Decorative border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#253F60]/30"></div>
                    {/* Decorative element */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#253F60]/10 rounded-tl-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-start gap-3">
                        <div className="w-1 h-full bg-[#253F60] rounded-full min-h-[60px]"></div>
                        <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed font-medium italic">
                          {defaultContent.conseil.conclusion}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      case "inconvenients":
        return (
          <section key="inconvenients" className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                  {defaultContent.inconvenients?.title}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Points de vigilance à connaître avant de vous lancer
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {(defaultContent.inconvenients?.cards || []).map((card, i) => (
                  <div 
                    key={i} 
                    className={`relative rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-l-4 ${
                      i % 2 === 0 
                        ? 'bg-gradient-to-br from-white via-[#F9FAFB] to-white border-[#253F60]' 
                        : 'bg-gradient-to-br from-white via-[#F9FAFB] to-white border-[#B99066]'
                    }`}
                  >
                    {/* Decorative element */}
                    <div className={`absolute top-0 right-0 w-20 h-20 ${
                      i % 2 === 0 ? 'bg-[#253F60]/5' : 'bg-[#B99066]/5'
                    } rounded-bl-full`}></div>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${
                      i % 2 === 0 ? 'bg-[#253F60]/10' : 'bg-[#B99066]/10'
                    } flex items-center justify-center mb-6`}>
                      <svg className={`w-6 h-6 ${
                        i % 2 === 0 ? 'text-[#253F60]' : 'text-[#B99066]'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    
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
        );
      case "faq":
        return (
          <section key="faq" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.faq?.title}
                </h2>
                <div className="space-y-6">
                  {(content.faq?.items || []).map((f, i) => (
                    <div key={i} className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-lg p-6 border border-[#E5E7EB]">
                      <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3">{f.q}</h3>
                      <p className="text-[#686868] font-inter">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case "finalCta":
        return (
          <section key="finalCta" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-10 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-[#B99066]/20 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-tl-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B99066]/5 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="inline-block mb-6">
                    <div className="w-20 h-1 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-full mx-auto"></div>
                  </div>
                  <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 sm:mb-8">
                    {defaultContent.finalCta?.title}
                  </h2>
                  <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-inter mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                    {defaultContent.finalCta?.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <button 
                      onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      className="group bg-white text-[#253F60] px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-inter font-bold text-base sm:text-lg hover:bg-[#F9FAFB] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px]"
                    >
                      {defaultContent.finalCta?.primaryButton}
                    </button>
                    <button 
                      onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      className="group border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-inter font-bold text-base sm:text-lg hover:bg-white hover:text-[#253F60] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]"
                    >
                      {defaultContent.finalCta?.secondaryButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      

      
      {/* Map ordered sections */}
      {sections.map((s) => renderSection(s))}
      
      <Footer />
    </>
  );
} 