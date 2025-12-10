"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function LoisFiscalesPage() {
  const [selectedLaw, setSelectedLaw] = useState("pinel");
  
  // Mock data for selected law
  const selectedLawData = {
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
  };
  const [selectedCategory, setSelectedCategory] = useState("immobilier");
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Lois fiscales",
      subtitle: "Guide complet",
      description: "Optimiser sa fiscalité, c'est protéger et valoriser durablement son patrimoine. Les dispositifs fiscaux d'investissement immobilier offrent des leviers puissants pour réduire son imposition, préparer sa retraite ou transmettre plus efficacement. Ce guide décrypte les 7 principaux régimes en vigueur, à jour des dernières réformes, pour vous aider à arbitrer en toute connaissance de cause."
    },
    categories: [
      { id: "immobilier", label: "Immobilier" },
      { id: "entreprise", label: "Entreprise" },
      { id: "patrimoine", label: "Patrimoine" },
      { id: "retraite", label: "Retraite" }
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
      emailSubtitle: "Prendre rendez-vous pour un arbitrage personnalisé",
      buttons: [
        { text: "Prendre rendez-vous", type: "primary" },
        { text: "Nous écrire", type: "secondary" }
      ]
    }
  };

  useEffect(() => {
    // Set static content
    setContent(defaultContent);
  }, []);

  return (
    <>
      <Header />

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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
            {[
              { id: 1, shortName: "Pinel" },
              { id: 2, shortName: "Malraux" },
              { id: 3, shortName: "Cosse" },
              { id: 4, shortName: "Denormandie" },
              { id: 5, shortName: "Girardin" },
              { id: 6, shortName: "Monument" },
              { id: 7, shortName: "LLI" }
            ].map((law, index) => {
              // Définir les couleurs pour chaque cercle
              const circleColors = [
                "bg-[#B99066]", // Pinel - Or AZALEE
                "bg-[#B99066]", // Malraux - Or AZALEE
                "bg-[#B99066]", // Cosse - Or AZALEE
                "bg-[#B99066]", // Denormandie - Or AZALEE
                "bg-[#B99066]", // Girardin - Or AZALEE
                "bg-[#B99066]", // Monument - Or AZALEE
                "bg-[#B99066]" // LLI - Or AZALEE
              ];
              
              return (
              <div key={law.id} className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className={`w-12 h-12 ${circleColors[index]} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2`}>
                  {law.shortName.charAt(0)}
                </div>
                <p className="text-[#112033] text-xs font-medium">{law.shortName}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'immobilier', label: 'Immobilier' },
              { id: 'entreprise', label: 'Entreprise' },
              { id: 'patrimoine', label: 'Patrimoine' },
              { id: 'retraite', label: 'Retraite' }
            ].map((category) => (
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
      <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Laws List */}
            <div className="lg:col-span-1">
              <h2 className="text-[#112033] text-xl font-semibold mb-6">Dispositifs disponibles</h2>
              <div className="space-y-3">
                {[
                  { id: 1, name: "Loi Pinel", category: "immobilier" },
                  { id: 2, name: "Loi Malraux", category: "immobilier" },
                  { id: 3, name: "Loi Cosse", category: "immobilier" },
                  { id: 4, name: "Loi Denormandie", category: "immobilier" },
                  { id: 5, name: "Loi Girardin", category: "immobilier" },
                  { id: 6, name: "Monument Historique", category: "immobilier" },
                  { id: 7, name: "LLI", category: "immobilier" }
                ].filter(law => selectedCategory === 'immobilier' || selectedCategory === law.category).map((law) => (
                  <button
                    key={law.id}
                    onClick={() => setSelectedLaw(law.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedLaw === law.id
                        ? "bg-[#253F60] text-white shadow-lg"
                        : "bg-white text-[#112033] hover:bg-gray-50 shadow-md"
                    }`}
                  >
                    <h3 className="font-semibold mb-1">{law.name}</h3>
                    <p className={`text-sm ${selectedLaw === law.id ? 'text-white/80' : 'text-[#686868]'}`}>
                      {law.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Law Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                <div className="mb-6">
                  <span className="inline-block bg-[#253F60] text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </span>
                  <h2 className="text-[#112033] text-2xl font-semibold mb-2">{selectedLawData.name}</h2>
                  <p className="text-[#686868] text-lg">{selectedLawData.description}</p>
                </div>

                {/* Avantages et Conditions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {selectedLawData.avantages && (
                    <div className="bg-gradient-to-br from-[#E8F5E8] to-[#D4EDDA] rounded-lg p-6">
                      <h3 className="text-[#112033] text-lg font-semibold mb-4 flex items-center gap-2">
                        Avantages
                      </h3>
                      <ul className="space-y-2">
                        {selectedLawData.avantages.map((avantage, index) => (
                          <li key={index} className="text-[#112033] text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#4EBBBD] rounded-full mt-2 flex-shrink-0"></span>
                            {avantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedLawData.conditions && (
                    <div className="bg-gradient-to-br from-[#FFEFD5] to-[#FFE4B5] rounded-lg p-6">
                      <h3 className="text-[#112033] text-lg font-semibold mb-4 flex items-center gap-2">
                        Conditions
                      </h3>
                      <ul className="space-y-2">
                        {selectedLawData.conditions.map((condition, index) => (
                          <li key={index} className="text-[#112033] text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Taux et Plafonds */}
                {selectedLawData.taux && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg font-semibold mb-4">Taux de réduction</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedLawData.taux.map((taux, index) => (
                        <div key={index} className="bg-[#B99066] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000">
                          <div className="text-2xl font-bold text-white mb-1">{taux.reduction}</div>
                          <div className="text-white text-sm font-medium">{taux.annees}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Plafonds */}
                {selectedLawData.plafonds && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg font-semibold mb-4">Plafonds applicables</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(selectedLawData.plafonds).map(([key, value]) => (
                        <div key={key} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="text-[#686868] text-xs uppercase mb-1">{key}</div>
                          <div className="text-[#112033] font-semibold">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risques */}
                {selectedLawData.risques && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg font-semibold mb-4 flex items-center gap-2">
                      Risques
                    </h3>
                    <div className="bg-gradient-to-br from-[#FFE4E1] to-[#FFCCCB] rounded-lg p-6">
                      <ul className="space-y-2">
                        {selectedLawData.risques.map((risque, index) => (
                          <li key={index} className="text-[#112033] text-sm flex items-start gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                            {risque}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Cas pratique */}
                {selectedLawData.cas_pratique && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg font-semibold mb-4 flex items-center gap-2">
                      Cas pratique
                    </h3>
                    <div className="bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] rounded-lg p-6 border-l-4 border-[#4EBBBD]">
                      <p className="text-[#112033] text-sm leading-relaxed">{selectedLawData.cas_pratique}</p>
                    </div>
                  </div>
                )}

                {/* Recommandation Azalée */}
                {selectedLawData.recommandation && (
                  <div className="mb-8">
                    <h3 className="text-[#112033] text-lg font-semibold mb-4 flex items-center gap-2">
                      Recommandation Azalée
                    </h3>
                    <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000">
                      <p className="text-sm leading-relaxed opacity-90">{selectedLawData.recommandation}</p>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg p-6 text-white text-center">
                  <h3 className="text-xl font-semibold mb-2">{content.cta?.title || defaultContent.cta.title}</h3>
                  <p className="text-sm opacity-90 mb-6">
                    {content.cta?.subtitle || defaultContent.cta.subtitle}
                  </p>
                  <div className="flex justify-center">
                    <button 
                      className="bg-[#B99066] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#A67C52] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
                      onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    >
                      Prendre rendez-vous
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
            Questions fréquentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-[#112033] text-lg font-semibold mb-3">Puis-je cumuler plusieurs dispositifs ?</h3>
              <p className="text-[#686868] text-sm">
                Oui, dans certains cas, vous pouvez cumuler plusieurs dispositifs fiscaux. 
                Par exemple, la loi Pinel peut être combinée avec le prêt à taux zéro (PTZ) 
                ou d'autres aides régionales.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-[#112033] text-lg font-semibold mb-3">Quand dois-je m'engager ?</h3>
              <p className="text-[#686868] text-sm">
                L'engagement de location doit généralement être pris dès l'acquisition du bien. 
                La durée varie selon le dispositif : 6, 9 ou 12 ans pour Pinel, 9 ans pour Malraux, etc.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-[#112033] text-lg font-semibold mb-3">Quels sont les risques ?</h3>
              <p className="text-[#686868] text-sm">
                Les principaux risques sont la non-respect des conditions d'engagement, 
                la baisse de la valeur du bien, et les évolutions législatives qui peuvent 
                modifier les avantages fiscaux.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-[#112033] text-lg font-semibold mb-3">Quels documents fournir ?</h3>
              <p className="text-[#686868] text-sm">
                Vous devrez fournir les justificatifs d'acquisition, les contrats de location, 
                les attestations de loyer, et respecter les déclarations fiscales annuelles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F2F2F2] to-[#E5E5E5]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
            <h2 className="text-[#112033] text-2xl lg:text-3xl font-semibold mb-4">
              {content.finalCta?.title || defaultContent.finalCta.title}
            </h2>
            <p className="text-[#686868] text-lg mb-8 max-w-3xl mx-auto">
              {content.finalCta?.description || defaultContent.finalCta.description}
            </p>
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-6 text-white mb-8">
              <h3 className="text-xl font-semibold mb-3">{content.finalCta?.email || defaultContent.finalCta.email}</h3>
              <p className="text-sm opacity-90">{content.finalCta?.emailSubtitle || defaultContent.finalCta.emailSubtitle}</p>
            </div>
            <div className="flex justify-center">
              <button 
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67C52] transition-colors duration-200 text-lg shadow-lg"
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              >
                Prendre un rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 
