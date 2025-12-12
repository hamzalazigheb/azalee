"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

const LOCAL_STORAGE_KEY = 'immeubles-de-rapportPageContent';

const defaultContent = {
  heroTitle: "Immeubles de rapport : Investissement immobilier",
  heroSubtitle: "Investissez dans des immeubles de rapport pour générer des revenus locatifs stables.",
  heroButton1: "Nos immeubles",
  heroButton2: "Calculer la rentabilité",
  rightCardTitle: "Immeubles de rapport : revenus stables",
  rightCardSubtitle: "Générez des revenus locatifs stables avec les immeubles de rapport.",
  rightCardBenefits: [
    "Revenus stables",
    "Plus-value immobilière",
    "Gestion simplifiée",
    "Diversification"
  ],
  rightCardButton1: "Demander un devis",
  rightCardButton2: "En savoir plus",
  essentielTitle: "L'essentiel",
  essentielItems: [
    "Informations essentielles sur immeubles de rapport",
    "Avantages et bénéfices",
    "Conditions et critères",
    "Démarches et procédures"
  ],
  sommaireTitle: "Sommaire",
  sommaireItems: [
    "1. Qu'est-ce que immeubles de rapport ?",
    "2. Avantages et bénéfices",
    "3. Conditions d'éligibilité",
    "4. Démarches et procédures",
    "5. Exemples concrets",
    "6. Questions-réponses"
  ],
  definitionTitle: "Qu'est-ce que immeubles de rapport ?",
  definitionText1: "Définition et explication de immeubles de rapport.",
  definitionText2: "Présentation des avantages et des modalités.",
  definitionSavoirTitle: "À savoir",
  definitionSavoirItems: [
    "Points importants à retenir",
    "Conditions spécifiques",
    "Avantages clés",
    "Points d'attention"
  ]
};

export default function ImmeublesDeRapportPage() {
  const content = defaultContent;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Different Layout */}
      <section className="relative bg-gradient-to-r from-[#253F60] to-[#B99066] text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Investissement immobilier
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Immeubles de rapport : le placement à haut rendement, mais exigeant
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Acheter un <strong>immeuble de rapport</strong> consiste à acquérir un immeuble entier, composé de plusieurs appartements, pour le louer. C'est l'une des stratégies les plus rentables… mais aussi l'une des plus exigeantes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#A67A5A] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Calculer la rentabilité
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#253F60] transition-all duration-200"
                >
                  Consulter un expert
                </button>
              </div>
            </div>
            
            {/* Right Card - Different Position */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">{content.rightCardTitle}</h3>
              <p className="text-white/90 mb-6">{content.rightCardSubtitle}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {content.rightCardBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="w-full bg-[#B99066] text-white py-3 rounded-lg font-semibold hover:bg-[#A67A5A] transition-colors"
                >
                  {content.rightCardButton1}
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="w-full border border-white text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-[#253F60] transition-colors"
                >
                  {content.rightCardButton2}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'essentiel Section - Under Hero */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl shadow-xl border-2 border-[#E5E7EB] p-8 sm:p-10 lg:p-12 overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  {content.essentielTitle}
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Les points clés à retenir sur les immeubles de rapport
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {content.essentielItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="group relative flex items-start gap-3 text-[#686868] bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#B99066] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-sm sm:text-base font-inter leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Different Layout Structure */}
      <main className="w-full">
        <div className="max-w-[1368px] mx-auto">
          {/* Main Content Area - Different Structure */}
          <div className="space-y-0">
            
            {/* Les avantages des immeubles de rapport Section */}
            <section id="section-1" className="bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
              <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-block mb-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                    Les avantages des immeubles de rapport
                  </h2>
                  <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                    Découvrez les bénéfices de cette stratégie d'investissement
                  </p>
                </div>
              
                <div className="space-y-8 sm:space-y-10">
                  {/* Rentabilité supérieure */}
                  <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#B99066]/10 rounded-tr-full"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                        <h3 className="text-2xl sm:text-3xl font-cairo font-bold">Rentabilité supérieure</h3>
                      </div>
                      <p className="text-lg sm:text-xl mb-6 leading-relaxed">
                        Souvent entre <strong>7 et 10 % brut</strong>, contre 4 à 5 % pour un appartement isolé.
                      </p>
                      <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 border-l-4 border-white">
                        <p className="text-base sm:text-lg text-white leading-relaxed">
                          <strong>Exemple :</strong> un immeuble de 6 appartements acheté 400 000 €, loués 500 € chacun = 36 000 €/an de loyers, soit <strong>9 % brut</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Autres avantages */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4 text-center">Mutualisation des risques</h3>
                      <p className="text-[#686868] text-base leading-relaxed text-center">
                        Un locataire part ? Les 5 autres continuent à payer leur loyer.
                      </p>
                    </div>

                    <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4 text-center">Travaux optimisés</h3>
                      <p className="text-[#686868] text-base leading-relaxed text-center">
                        Rénover la toiture, la façade ou le chauffage profite à tout l'immeuble, avec une économie d'échelle.
                      </p>
                    </div>

                    <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4 text-center">Maîtrise totale</h3>
                      <p className="text-[#686868] text-base leading-relaxed text-center">
                        Vous êtes le seul propriétaire, donc pas de syndic de copropriété. Vous décidez des travaux, des loyers et de la stratégie de valorisation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Les risques et contraintes Section */}
            <section className="bg-white py-16 sm:py-20 lg:py-24">
              <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-block mb-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                    Les risques et contraintes à ne pas sous-estimer
                  </h2>
                  <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                    Points de vigilance essentiels à connaître avant d'investir
                  </p>
                </div>
              
                <div className="space-y-8 sm:space-y-10">
                  {/* Concentration du risque technique */}
                  <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                        <h3 className="text-2xl sm:text-3xl font-cairo font-bold">Concentration du risque technique</h3>
                      </div>
                      <p className="text-lg sm:text-xl leading-relaxed">
                        Si le chauffage collectif tombe en panne, ce sont <strong>tous les locataires</strong> qui sont impactés, et les réparations peuvent coûter cher.
                      </p>
                    </div>
                  </div>

                  {/* Gestion chronophage */}
                  <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 border-2 border-[#E5E7EB] shadow-lg overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-[#253F60] rounded-full"></div>
                        <h3 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60]">Gestion chronophage</h3>
                      </div>
                      <p className="text-lg sm:text-xl text-[#686868] mb-6 leading-relaxed">
                        Pour obtenir une rentabilité supérieure à 8 %, il faut <strong>gérer soi-même</strong> les entrées, sorties, relances de loyers et petits travaux.
                      </p>
                      <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 sm:p-8 border-l-4 border-[#253F60]">
                        <p className="text-white text-base sm:text-lg leading-relaxed">
                          Au début, c'est l'euphorie : vous touchez 6 loyers par mois. Mais rapidement, si vous avez un travail à côté, les appels de locataires pour une fuite, un dégât des eaux ou un impayé peuvent transformer ce qui semblait être une "machine à cash" en une <strong>seconde activité stressante</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Autres contraintes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4 text-center">Vacance locative multipliée</h3>
                      <p className="text-[#686868] text-base leading-relaxed text-center">
                        Un appartement vide = une partie de vos loyers disparaît, mais vos charges (assurances, taxe foncière, travaux) restent pleines.
                      </p>
                    </div>

                    <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4 text-center">Banques plus exigeantes</h3>
                      <p className="text-[#686868] text-base leading-relaxed text-center">
                        Un financement d'immeuble de rapport est parfois vu comme plus risqué qu'un simple appartement. Cela peut nécessiter un apport plus important ou des garanties solides.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Exemple concret Section */}
            <section className="bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
              <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-block mb-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                    Exemple concret
                  </h2>
                  <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                    Un cas pratique pour mieux comprendre la rentabilité réelle
                  </p>
                </div>
              
                <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1 h-10 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                      <h3 className="text-2xl sm:text-3xl font-cairo font-bold">
                        Un investisseur achète un immeuble de <strong>5 appartements à 300 000 €</strong>
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg">
                          <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Données de base</h4>
                          <div className="space-y-3 text-base sm:text-lg text-white">
                            <div className="flex justify-between items-center">
                              <span>Loyers mensuels :</span>
                              <span className="font-bold text-[#B99066]">2 000 €</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Rentabilité brute :</span>
                              <span className="font-bold text-[#B99066]">8 %</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg">
                          <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Gestion à prévoir</h4>
                          <div className="space-y-3 text-base sm:text-lg text-white">
                            <div className="flex justify-between items-center">
                              <span>5 baux différents</span>
                              <svg className="w-5 h-5 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Charges chauffage collectif :</span>
                              <span className="font-bold">6 000 €/an</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Vacance locative :</span>
                              <span className="font-bold">2 mois/an</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl p-8 sm:p-10 text-center border-2 border-white/50 shadow-xl">
                        <h4 className="font-cairo font-bold text-xl sm:text-2xl mb-6 text-white">Résultat réel</h4>
                        <p className="text-base sm:text-lg mb-6 text-white leading-relaxed">
                          La rentabilité <strong>nette</strong> réelle tombe autour de
                        </p>
                        <div className="text-5xl sm:text-6xl font-bold text-white mb-4">5,5 %</div>
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                          après déduction des frais de gestion, charges et aléas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Conseil Azalée Patrimoine Section */}
            <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
              <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-block mb-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                    Notre conseil Azalée Patrimoine
                  </h2>
                  <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                    Expertise et accompagnement personnalisé pour votre projet
                  </p>
                </div>
              
                <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
                  
                  <div className="relative z-10">
                    <p className="text-xl sm:text-2xl mb-8 sm:mb-10 text-white leading-relaxed font-light">
                      Les immeubles de rapport sont une excellente stratégie pour les investisseurs <strong>aguerris</strong>, qui ont :
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="group bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                        <h3 className="font-cairo font-bold text-xl sm:text-2xl mb-3 text-white">Du temps</h3>
                        <p className="text-base sm:text-lg text-white/90">Pour gérer eux-mêmes</p>
                      </div>
                      
                      <div className="group bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                        <h3 className="font-cairo font-bold text-xl sm:text-2xl mb-3 text-white">La capacité de déléguer</h3>
                        <p className="text-base sm:text-lg text-white/90">À une agence de gestion locative, en acceptant une rentabilité légèrement réduite</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
              <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-10 sm:p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-[#B99066]/20 rounded-br-full"></div>
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-tl-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B99066]/5 rounded-full"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-block mb-6">
                      <div className="w-20 h-1 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-full mx-auto"></div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 sm:mb-8">
                      Prêt à investir dans un immeuble de rapport ?
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                      Nos experts vous accompagnent pour évaluer la faisabilité et la rentabilité de votre projet
                    </p>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 sm:p-10 mb-8 sm:mb-12 max-w-4xl mx-auto border border-white/20 shadow-lg">
                      <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-6 sm:mb-8">
                        Chez <strong>Azalée Patrimoine</strong>, nous vous apportons :
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <p className="text-white text-base sm:text-lg font-medium">
                            Une <strong>analyse de rentabilité</strong> précise
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <p className="text-white text-base sm:text-lg font-medium">
                            Un <strong>accompagnement dans la gestion</strong>
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <p className="text-white text-base sm:text-lg font-medium">
                            Des <strong>solutions de financement</strong> adaptées
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                      <button 
                        onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                        className="group bg-white text-[#253F60] px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-[#F9FAFB] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px]"
                      >
                        Calculer la rentabilité
                      </button>
                      <button 
                        onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                        className="group border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-[#253F60] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[200px]"
                      >
                        Prendre rendez-vous
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
