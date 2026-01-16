"use client";
import React, { useState, useEffect } from "react";
import SectionHeader from "../../../components/common/SectionHeader";
import Link from "next/link";

export default function LoisFiscalesClient({ content }) {
  const [selectedLaw, setSelectedLaw] = useState("pinel");
  const [selectedCategory, setSelectedCategory] = useState("immobilier");
  

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Lois fiscales",
      subtitle: "Guide complet",
      description: "Optimiser sa fiscalité, c'est protéger et valoriser durablement son patrimoine. Les dispositifs fiscaux d'investissement immobilier offrent des leviers puissants pour réduire son imposition, préparer sa retraite ou transmettre plus efficacement. Ce guide décrypte les 7 principaux régimes en vigueur, à jour des dernières réformes, pour vous aider à arbitrer en toute connaissance de cause."
    },
    laws: [
      { id: 1, name: "Loi Pinel", shortName: "Pinel", category: "immobilier", path: "/fiscalite/loi-pinel", color: "bg-[#B99066]" },
      { id: 2, name: "Loi Malraux", shortName: "Malraux", category: "immobilier", path: "/fiscalite/loi-malraux", color: "bg-[#B99066]" },
      { id: 3, name: "Loi Cosse", shortName: "Cosse", category: "immobilier", path: "/fiscalite/loi-cosse", color: "bg-[#B99066]" },
      { id: 4, name: "Loi Denormandie", shortName: "Denormandie", category: "immobilier", path: "/fiscalite/loi-denormandie", color: "bg-[#B99066]" },
      { id: 5, name: "Loi Girardin", shortName: "Girardin", category: "immobilier", path: "/fiscalite/loi-girardin", color: "bg-[#B99066]" },
      { id: 6, name: "Monument Historique", shortName: "Monument", category: "immobilier", path: "/fiscalite/monument-historique", color: "bg-[#B99066]" }
    ],
    categories: [
      { id: "immobilier", label: "Immobilier" },
      { id: "entreprise", label: "Entreprise" },
      { id: "patrimoine", label: "Patrimoine" },
      { id: "retraite", label: "Retraite" }
    ],
    selectedLawData: {
      name: "Loi Pinel",
      description: "Dispositif de défiscalisation immobilière",
      avantages: [
        "Réduction d'impôt de 12% par an",
        "Investissement dans le neuf uniquement",
        "Engagement de location de 9 ans"
      ],
      conditions: [
        "Plafond de 300 000€ par an",
        "Respect des plafonds de loyers",
        "Respect des plafonds de ressources des locataires"
      ],
      taux: [
        { reduction: "12%", annees: "6 ans" },
        { reduction: "12%", annees: "9 ans" },
        { reduction: "12%", annees: "12 ans" }
      ],
      plafonds: {
        "Plafond annuel": "300 000€",
        "Plafond loyer": "Selon zone",
        "Plafond ressources": "Selon zone"
      },
      risques: [
        "Non-respect des conditions d'engagement",
        "Baisse de la valeur du bien",
        "Évolutions législatives"
      ],
      cas_pratique: "Exemple : Investissement de 200 000€ dans un appartement Pinel à Paris. Réduction d'impôt de 24 000€ par an pendant 9 ans, soit 216 000€ au total.",
      recommandation: "La loi Pinel est un excellent dispositif pour réduire ses impôts tout en investissant dans l'immobilier neuf. Elle convient particulièrement aux contribuables imposés souhaitant diversifier leur patrimoine."
    },
    faq: [
      {
        question: "Puis-je cumuler plusieurs dispositifs ?",
        answer: "Oui, dans certains cas, vous pouvez cumuler plusieurs dispositifs fiscaux. Par exemple, la loi Pinel peut être combinée avec le prêt à taux zéro (PTZ) ou d'autres aides régionales."
      },
      {
        question: "Quand dois-je m'engager ?",
        answer: "L'engagement de location doit généralement être pris dès l'acquisition du bien. La durée varie selon le dispositif : 6, 9 ou 12 ans pour Pinel, 9 ans pour Malraux, etc."
      },
      {
        question: "Quels sont les risques ?",
        answer: "Les principaux risques sont la non-respect des conditions d'engagement, la baisse de la valeur du bien, et les évolutions législatives qui peuvent modifier les avantages fiscaux."
      },
      {
        question: "Quels documents fournir ?",
        answer: "Vous devrez fournir les justificatifs d'acquisition, les contrats de location, les attestations de loyer, et respecter les déclarations fiscales annuelles."
      }
    ],
    cta: {
      title: "Prêt à optimiser votre fiscalité ?",
      subtitle: "Nos experts vous accompagnent pour identifier le dispositif le plus adapté à votre situation.",
      buttons: [
        { text: "Simuler mes avantages", type: "primary" },
        { text: "Consulter un expert", type: "secondary" }
      ]
    },
    finalCta: {
      title: "Besoin d'un arbitrage personnalisé ?",
      description: "Chaque situation fiscale est unique. Chez Azalée, nous vous aidons à intégrer ces dispositifs dans une stratégie globale patrimoniale (transmission, SCI, IR/IFI, assurance vie...)",
      email: "contact@azalee-patrimoine.fr",
      emailSubtitle: "Planifiez votre consultation gratuite pour un arbitrage personnalisé",
      buttons: [
        { text: "Planifiez votre consultation gratuite", type: "primary" },
        { text: "Nous écrire", type: "secondary" }
      ]
    }
  };

  

  // Get content from CMS
  const laws = content.laws || defaultContent.laws || [];
  const categories = content.categories || defaultContent.categories;
  const faq = content.faq || defaultContent.faq || [];
  const selectedLawData = content.selectedLawData || defaultContent.selectedLawData || {};

  return (
    <>
      {/* Hero Section with Law Icons */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block bg-[#B99066] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              {content.hero?.subtitle || defaultContent.hero.subtitle}
            </span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight mb-4 sm:mb-6">
            {content.hero?.title || defaultContent.hero.title}
          </h1>
          <p className="max-w-4xl mx-auto text-white text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
            {content.hero?.description || defaultContent.hero.description}
          </p>
          
          {/* Law Icons Grid */}
          {laws.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
              {laws.map((law, index) => (
                <div key={law.id || index} className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 ${law.color || "bg-[#B99066]"} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2`}>
                    {law.shortName?.charAt(0) || law.name?.charAt(0) || "?"}
                  </div>
                  <p className="text-[#112033] text-xs font-medium">{law.shortName || law.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-[#253F60] text-white shadow-lg"
                    : "bg-gray-100 text-[#686868] hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Laws List */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-6 mb-6 shadow-xl">
                <h2 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-6">Dispositifs disponibles</h2>
              </div>
              <div className="space-y-3">
                {laws.filter(law => !law.category || selectedCategory === law.category || selectedCategory === 'immobilier').map((law) => (
                  <Link
                    key={law.id || law.name}
                    href={law.path || `#${law.id || law.name}`}
                    className={`block w-full text-left p-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      selectedLaw === (law.id || law.name)
                        ? "bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] text-white shadow-xl"
                        : "bg-white text-[#112033] hover:bg-gray-50 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <h3 className="font-cairo font-semibold mb-1">{law.name}</h3>
                    <p className={`text-sm ${selectedLaw === (law.id || law.name) ? 'text-white/80' : 'text-[#686868]'}`}>
                      {law.description || "Dispositif de défiscalisation"}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Law Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-2 border-[#253F60]/20">
                <div className="mb-8">
                  <span className="inline-block bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </span>
                  <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-bold mb-3">{selectedLawData.name || "Sélectionnez une loi"}</h2>
                  <p className="text-[#686868] text-lg">{selectedLawData.description || "Choisissez une loi dans la liste pour voir les détails"}</p>
                </div>

                {/* Avantages et Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {selectedLawData.avantages && (
                    <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <h3 className="text-white text-lg sm:text-xl font-cairo font-bold mb-4 flex items-center gap-2">
                          Avantages
                        </h3>
                        <ul className="space-y-3">
                          {selectedLawData.avantages.map((avantage, index) => (
                            <li key={index} className="text-white/90 text-sm sm:text-base flex items-start gap-3">
                              <span className="text-white mt-1 font-bold">•</span>
                              <span>{avantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedLawData.conditions && (
                    <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <h3 className="text-white text-lg sm:text-xl font-cairo font-bold mb-4 flex items-center gap-2">
                          Conditions
                        </h3>
                        <ul className="space-y-3">
                          {selectedLawData.conditions.map((condition, index) => (
                            <li key={index} className="text-white/90 text-sm sm:text-base flex items-start gap-3">
                              <span className="text-white mt-1 font-bold">•</span>
                              <span>{condition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Taux et Plafonds */}
                {selectedLawData.taux && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg sm:text-xl font-cairo font-bold mb-6">Taux de réduction</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                      {selectedLawData.taux.map((taux, index) => (
                        <div key={index} className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/20 rounded-bl-full"></div>
                          <div className="relative z-10">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{taux.reduction}</div>
                            <div className="text-white/90 text-sm sm:text-base font-medium">{taux.annees}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Plafonds */}
                {selectedLawData.plafonds && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg sm:text-xl font-cairo font-bold mb-6">Plafonds applicables</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                      {Object.entries(selectedLawData.plafonds).map(([key, value], index) => {
                        const isBlue = index % 2 === 0;
                        return (
                          <div key={key} className={`relative rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                            isBlue 
                              ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' 
                              : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                          }`}>
                            <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${
                              isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                            }`}></div>
                            <div className="relative z-10">
                              <div className={`text-xs uppercase mb-2 ${
                                isBlue ? 'text-white/80' : 'text-white/80'
                              }`}>{key}</div>
                              <div className={`font-bold text-lg sm:text-xl ${
                                isBlue ? 'text-white' : 'text-white'
                              }`}>{value}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Risques */}
                {selectedLawData.risques && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg sm:text-xl font-cairo font-bold mb-6 flex items-center gap-2">
                      Risques
                    </h3>
                    <div className="relative bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 rounded-2xl p-6 sm:p-8 shadow-xl border-l-4 border-amber-500 overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200/20 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <ul className="space-y-3">
                          {selectedLawData.risques.map((risque, index) => (
                            <li key={index} className="text-[#4B5563] text-sm sm:text-base flex items-start gap-3">
                              <span className="text-amber-600 mt-1 font-bold">⚠️</span>
                              <span>{risque}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cas pratique */}
                {selectedLawData.cas_pratique && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg sm:text-xl font-cairo font-bold mb-6 flex items-center gap-2">
                      Cas pratique
                    </h3>
                    <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">{selectedLawData.cas_pratique}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommandation Azalée */}
                {selectedLawData.recommandation && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg sm:text-xl font-cairo font-bold mb-6 flex items-center gap-2">
                      Recommandation Azalée
                    </h3>
                    <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#253F60]/20 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">{selectedLawData.recommandation}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/20 rounded-bl-full"></div>
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-3">{content.cta?.title || defaultContent.cta.title}</h3>
                    <p className="text-white/90 text-sm sm:text-base mb-6">
                      {content.cta?.subtitle || defaultContent.cta.subtitle}
                    </p>
                    <a
                      href="https://calendly.com/rdv-azalee-patrimoine/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                    >
                      Planifiez votre consultation gratuite
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Questions fréquentes"
            subtitle="Tout ce que vous devez savoir sur les lois fiscales"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {faq.length > 0 ? faq.map((faqItem, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div 
                  key={index}
                  className={`relative rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                    isBlue 
                      ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' 
                      : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                    }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${
                    isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                  }`}></div>
                  <div className="relative z-10">
                    <h3 className={`text-lg sm:text-xl font-cairo font-bold mb-3 ${
                      isBlue ? 'text-white' : 'text-white'
                    }`}>{faqItem.question}</h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isBlue ? 'text-white/90' : 'text-white/90'
                    }`}>
                      {faqItem.answer}
                    </p>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-2 text-center text-gray-500">
                Aucune question fréquente disponible pour le moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                {content.finalCta?.title || defaultContent.finalCta.title}
              </h2>
              <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                {content.finalCta?.description || defaultContent.finalCta.description}
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border-2 border-white/20 max-w-2xl mx-auto">
                <a 
                  href={`mailto:${content.finalCta?.email || defaultContent.finalCta.email}`}
                  className="text-xl sm:text-2xl font-cairo font-bold mb-2 block hover:text-[#B99066] transition-colors"
                >
                  {content.finalCta?.email || defaultContent.finalCta.email}
                </a>
                <p className="text-white/80 text-sm sm:text-base">{content.finalCta?.emailSubtitle || defaultContent.finalCta.emailSubtitle}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/rdv-azalee-patrimoine/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg"
                >
                  Prendre un rendez-vous
                </a>
                <a
                  href={`mailto:${content.finalCta?.email || defaultContent.finalCta.email}`}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg"
                >
                  Nous écrire
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
} 
