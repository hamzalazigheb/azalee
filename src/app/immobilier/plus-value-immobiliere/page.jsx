"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function PlusValueImmobilierePage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                Plus-value immobilière : comprendre la fiscalité et optimiser sa revente
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Lorsqu'un particulier revend un bien immobilier, il réalise souvent une <strong>plus-value</strong> : c'est la différence entre le prix de vente et le prix d'acquisition (majoré des frais et des travaux). En France, cette plus-value est soumise à une fiscalité spécifique, avec des <strong>abattements pour durée de détention</strong> qui allègent progressivement l'impôt.
              </p>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Connaître les règles de la plus-value immobilière est essentiel pour <strong>anticiper la fiscalité de vos ventes</strong>, choisir le bon moment pour céder un bien et intégrer la revente dans une stratégie patrimoniale globale.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
            
            {/* Right Card */}
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  Nos experts à votre service
                </h2>
              </div>
              
              <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                  <span className="hidden sm:block">36.2% →<br /></span>
                  <span className="sm:hidden">36.2%</span>
                  <span className="hidden sm:block">Fiscalité totale</span>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>IR : 19% + PS : 17,2%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Abattements durée détention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Exonération après 22-30 ans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Optimisation fiscale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Les règles générales */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                Les règles générales de la plus-value immobilière
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                Comprendre la fiscalité applicable lors de la revente d'un bien immobilier
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-lg border-2 border-[#E5E7EB] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
              <p className="text-[#686868] text-lg sm:text-xl font-inter leading-relaxed mb-8 text-center">
                En cas de revente d'un logement (hors résidence principale), la plus-value est imposée à deux niveaux :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div className="group relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-3xl font-bold">19%</span>
                    </div>
                    <h3 className="text-white font-cairo font-bold text-xl mb-2">Impôt sur le revenu (IR)</h3>
                    <p className="text-white text-base font-inter">Taux de base</p>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-3xl font-bold">17,2%</span>
                    </div>
                    <h3 className="text-white font-cairo font-bold text-xl mb-2">Prélèvements sociaux (PS)</h3>
                    <p className="text-white text-base font-inter">Taux de base</p>
                  </div>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl p-6 sm:p-8 text-white shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-cairo font-bold mb-6 text-center">Soit une fiscalité totale de 36,2%</h3>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <p className="text-base sm:text-lg leading-relaxed">
                      <strong>Exemple simple :</strong> un appartement acheté 150 000 € en 2000 et revendu 250 000 € en 2025. La plus-value brute est de 100 000 €. Sans abattement, l'impôt serait de 19 000 € et les prélèvements sociaux de 17 200 €, soit <strong>36 200 €</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Les abattements pour durée de détention */}
          <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Les abattements pour durée de détention
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  La fiscalité diminue à mesure que vous conservez le bien
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div className="group relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                      <h3 className="text-2xl sm:text-3xl font-cairo font-bold">Exonération totale d'impôt (19%)</h3>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-center">Après 22 ans de détention</p>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-[#253F60] rounded-full"></div>
                      <h3 className="text-2xl sm:text-3xl font-cairo font-bold">Exonération totale de prélèvements sociaux (17,2%)</h3>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-center">Après 30 ans de détention</p>
                  </div>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl p-6 sm:p-8 text-white shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <p className="text-base sm:text-lg leading-relaxed">
                      <strong>Exemple :</strong> un appartement acheté 150 000 € et revendu 250 000 € après 25 ans. La plus-value de 100 000 € est totalement exonérée d'impôt, et les prélèvements sociaux sont réduits grâce aux abattements. Résultat : l'investisseur ne paie aucun impôt sur sa revente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Les exceptions et cas particuliers */}
          <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Les exceptions et cas particuliers
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Situations spécifiques bénéficiant d'exonérations ou d'avantages fiscaux
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="group relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-cairo font-bold">Résidence principale</h3>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed">Exonération totale, quelle que soit la durée de détention.</p>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-cairo font-bold">Montant inférieur à 15 000 €</h3>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed">Exonération automatique (utile pour des garages ou petites dépendances).</p>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-[#253F60] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-cairo font-bold">Première cession résidence secondaire</h3>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed">Exonération possible sous conditions (remploi du prix dans l'acquisition de la résidence principale).</p>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-[#253F60] rounded-full"></div>
                      <h3 className="text-xl sm:text-2xl font-cairo font-bold">Travaux et frais</h3>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed">Certains peuvent être ajoutés au prix d'acquisition pour réduire la plus-value taxable (frais réels ou forfait de 15% après 5 ans de détention).</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Avantages et inconvénients */}
          <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Avantages */}
                <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 border-2 border-[#E5E7EB] shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
                  <div className="text-center mb-8">
                    <div className="inline-block mb-4">
                      <div className="w-12 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold text-[#253F60] mb-4">
                      Avantages de la fiscalité sur la plus-value
                    </h2>
                  </div>
                  <ul className="space-y-4 text-[#686868] font-inter">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#253F60] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed"><strong>Incitation à conserver ses biens</strong> : plus la durée de détention est longue, plus l'imposition baisse.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#253F60] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed"><strong>Exonérations attractives</strong> après 22 ou 30 ans.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#253F60] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Possibilité d'optimiser le calcul en intégrant des <strong>frais de travaux</strong>.</span>
                    </li>
                  </ul>
                </div>

                {/* Inconvénients */}
                <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 border-2 border-[#E5E7EB] shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/5 rounded-bl-full"></div>
                  <div className="text-center mb-8">
                    <div className="inline-block mb-4">
                      <div className="w-12 h-1 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-full mx-auto"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold text-[#253F60] mb-4">
                      Inconvénients et contraintes
                    </h2>
                  </div>
                  <ul className="space-y-4 text-[#686868] font-inter">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#B99066] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Fiscalité lourde en cas de <strong>revente rapide</strong> : 36,2% sans abattement.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#B99066] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Les prélèvements sociaux restent dus jusqu'à 30 ans de détention.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#B99066] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Gestion administrative parfois complexe pour justifier les frais et travaux.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Exemple concret */}
          <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Exemple concret
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Un cas pratique pour mieux comprendre le calcul de la plus-value
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-10 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-2xl sm:text-3xl font-cairo font-bold">
                      Un investisseur achète un appartement en 2005 pour 200 000 €, avec 15 000 € de travaux. En 2025, il revend le bien 320 000 €.
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg text-center">
                      <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Prix d'acquisition corrigé</h4>
                      <p className="text-3xl sm:text-4xl font-bold text-[#B99066]">215 000 €</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg text-center">
                      <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Prix de vente</h4>
                      <p className="text-3xl sm:text-4xl font-bold text-[#B99066]">320 000 €</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg text-center">
                      <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Plus-value brute</h4>
                      <p className="text-3xl sm:text-4xl font-bold text-[#B99066]">105 000 €</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 sm:p-8 border-l-4 border-white shadow-lg">
                    <p className="text-base sm:text-lg text-center leading-relaxed font-medium">
                      Après 20 ans, il bénéficie d'abattements importants, réduisant l'impôt dû à moins de 10 000 €.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conseil Azalée Patrimoine */}
          <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Conseil Azalée Patrimoine
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Expertise et accompagnement personnalisé pour votre projet
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
                
                <div className="relative z-10 space-y-8 sm:space-y-10">
                  <p className="text-xl sm:text-2xl text-center leading-relaxed font-light">
                    La fiscalité des plus-values immobilières peut représenter un <strong>coût important</strong> si la revente est mal anticipée. Le choix du moment de vente (après 22 ans ou 30 ans), la prise en compte des travaux et l'utilisation des exonérations spécifiques sont des leviers puissants pour réduire ou annuler l'impôt.
                  </p>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-xl sm:text-2xl font-cairo font-bold">Chez <strong>Azalée Patrimoine</strong>, nous aidons nos clients à :</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-cairo font-bold text-xl mb-3">Simuler la fiscalité</h3>
                      <p className="text-base text-white/90">De leur revente avant de prendre une décision</p>
                    </div>
                    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <h3 className="font-cairo font-bold text-xl mb-3">Identifier les stratégies</h3>
                      <p className="text-base text-white/90">D'optimisation (report d'une vente, travaux, changement de résidence principale)</p>
                    </div>
                    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-cairo font-bold text-xl mb-3">Réinvestir intelligemment</h3>
                      <p className="text-base text-white/90">Le capital issu de la cession dans des solutions patrimoniales adaptées</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 sm:p-8 border-l-4 border-white shadow-lg">
                    <p className="text-base sm:text-lg text-center leading-relaxed font-medium">
                      Bien gérer la fiscalité de vos plus-values, c'est <strong>garder davantage de capital pour financer vos projets futurs</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-10 sm:p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-[#B99066]/20 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-tl-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B99066]/5 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="inline-block mb-6">
                    <div className="w-20 h-1 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-full mx-auto"></div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 sm:mb-8">
                    Prêt à optimiser votre plus-value immobilière ?
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                    Nos experts Azalée Patrimoine vous accompagnent pour évaluer la fiscalité de votre prochaine revente et découvrir comment optimiser vos plus-values immobilières.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <button 
                      onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      className="group bg-white text-[#253F60] px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-[#F9FAFB] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px]"
                    >
                      Calculer ma plus-value
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
      </section>
      
      <Footer />
    </>
  );
}