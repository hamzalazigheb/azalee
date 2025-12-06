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
    "sommaire",
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
                  <h1 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
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
                    <button className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200">
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
      case "sommaire":
        return (
          <section key="sommaire" className="w-full bg-white py-8 sm:py-12 lg:py-16">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">Sommaire</h2>
                <ol className="space-y-2 text-[#686868] font-inter">
                  {(defaultContent.sommaire?.items || []).map((item, idx) => (
                    <li className="flex items-start gap-2" key={idx}>
                      <span className="text-[#B99066] font-semibold">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        );
      case "imageBlock":
        return (
          <section key="imageBlock" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 sm:mb-12">
                <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6 sm:p-8 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-[#112033] text-lg sm:text-xl font-cairo font-semibold mb-4">
                        {imageBlock.title}
                      </h3>
                      <p className="text-[#686868] font-inter mb-4">{imageBlock.intro}</p>
                      <ul className="text-[#686868] font-inter space-y-2">
                        {(imageBlock.bullets || []).map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#59E2E4] mt-1">•</span>
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
          <section key="exemple" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {defaultContent.exemple?.title}
                </h2>
                <div className="bg-[#253F60] rounded-lg p-6 sm:p-8 text-white">
                  <p className="text-lg mb-6">{defaultContent.exemple?.description}</p>
                  <div className="bg-[#B99066] rounded-lg p-4">
                    <p className="text-sm text-white">{defaultContent.exemple?.conclusion}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "plusValue":
        return (
          <section key="plusValue" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {defaultContent.plusValue?.title}
                </h2>
                <div className="space-y-6 text-[#686868] font-inter">
                  {(defaultContent.plusValue?.paragraphs || []).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {(defaultContent.plusValue?.bullets || []).length > 0 && (
                    <ul className="list-disc pl-6 space-y-2">
                      {defaultContent.plusValue.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      case "avantages":
        return (
          <section key="avantages" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {defaultContent.avantages?.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(defaultContent.avantages?.cards || []).map((card, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-3">{card.title}</h3>
                      <ul className="text-[#686868] text-sm font-inter space-y-2">
                        {(card.bullets || []).map((b, j) => (
                          <li key={j}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case "conditions":
        return (
          <section key="conditions" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.conditions?.title}
                </h2>
                <div className="space-y-6 text-[#686868] font-inter">
                  {(content.conditions?.cards || []).map((card, i) => (
                    <div key={i} className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] p-6 rounded-lg">
                      <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-4">{card.title}</h3>
                      <ul className="space-y-2">
                        {(card.bullets || []).map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-[#59E2E4] mt-1">•</span>
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
              <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.declaration?.title}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {(content.declaration?.cards || []).map((card, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-[#112033] font-cairo font-semibold text-xl mb-4">{card.title}</h3>
                      <ul className="space-y-3 text-[#686868] font-inter">
                        {(card.bullets || []).map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className={i === 0 ? "text-[#59E2E4] mt-1" : "text-[#B99066] mt-1"}>•</span>
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
          <section key="comparaison" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {defaultContent.comparaison?.title}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {(defaultContent.comparaison?.options || []).map((option, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-[#112033] font-cairo font-semibold text-xl mb-4">{option.title}</h3>
                      <ul className="space-y-3 text-[#686868] font-inter">
                        {(option.bullets || []).map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className={i === 0 ? "text-[#59E2E4] mt-1" : "text-[#B99066] mt-1"}>•</span>
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
      case "residences":
        return (
          <section key="residences" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.residences?.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {(content.residences?.items || []).map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-md text-center">
                      <h3 className="text-[#112033] font-cairo font-semibold mb-2">{item.title}</h3>
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
          <section key="conseil" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {defaultContent.conseil?.title}
                </h2>
                <div className="space-y-6">
                  {(defaultContent.conseil?.paragraphs || []).map((p, i) => (
                    <div key={i} className="bg-[#B99066] rounded-lg p-4">
                      <p className="text-white text-lg">{p}</p>
                    </div>
                  ))}
                  {(defaultContent.conseil?.bullets || []).length > 0 && (
                    <div className="bg-[#B99066] rounded-lg p-4">
                      <ul className="list-disc pl-6 space-y-2 text-white">
                        {defaultContent.conseil.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {defaultContent.conseil?.conclusion && (
                    <div className="bg-[#B99066] rounded-lg p-4">
                      <p className="text-sm text-white">{defaultContent.conseil.conclusion}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      case "inconvenients":
        return (
          <section key="inconvenients" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {defaultContent.inconvenients?.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(defaultContent.inconvenients?.cards || []).map((card, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-3">{card.title}</h3>
                      <ul className="text-[#686868] text-sm font-inter space-y-2">
                        {(card.bullets || []).map((b, j) => (
                          <li key={j}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case "faq":
        return (
          <section key="faq" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
                <h2 className="text-[#112033] text-lg sm:text-xl lg:text-2xl font-cairo font-semibold mb-6">
                  {content.faq?.title}
                </h2>
                <div className="space-y-6">
                  {(content.faq?.items || []).map((f, i) => (
                    <div key={i} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6">
                      <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-3">{f.q}</h3>
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
          <section key="finalCta" className="w-full bg-white py-0">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-8 sm:p-10 lg:p-12 text-center">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6">
                  {defaultContent.finalCta?.title}
                </h2>
                <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {defaultContent.finalCta?.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#A67C52] transition-colors duration-200">
                    {defaultContent.finalCta?.primaryButton}
                  </button>
                  <button 
                    onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#A67C52] transition-colors duration-200"
                  >
                    {defaultContent.finalCta?.secondaryButton}
                  </button>
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