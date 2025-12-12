"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function CreditImmobilierPTZPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#112033] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                Crédit immobilier et PTZ : le levier incontournable
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Le <strong>crédit immobilier</strong> est au cœur de toute stratégie patrimoniale. Il permet de réaliser un projet immobilier important sans disposer immédiatement de la totalité des fonds. Grâce à l'<strong>effet de levier du crédit</strong>, il est possible d'acheter un bien d'une valeur de 200 000 € avec seulement 20 000 € d'apport.
              </p>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                En parallèle, l'État soutient les primo-accédants grâce au <strong>PTZ (Prêt à Taux Zéro)</strong>. Ce dispositif d'aide permet de financer jusqu'à 40 % du prix d'un logement neuf sans payer d'intérêts, rendant l'accession à la propriété plus accessible.
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
                <div className="w-8 h-8 sm:w-9 sm:h-9">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  Nos experts à votre service
                </h2>
              </div>
              
              <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                  <span className="hidden sm:block">Effet →<br /></span>
                  <span className="sm:hidden">x10</span>
                  <span className="hidden sm:block">de levier</span>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">1</span>
                    <span>Effet de levier financier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">1</span>
                    <span>PTZ jusqu'à 40% sans intérêts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">1</span>
                    <span>Constitution de patrimoine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">1</span>
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
          
          {/* Les avantages du crédit immobilier */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                Les avantages du crédit immobilier
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                Découvrez les bénéfices de l'effet de levier financier
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="group relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-white font-cairo font-bold text-xl mb-4 text-center">Effet de levier financier</h3>
                  <p className="text-white text-base font-inter leading-relaxed">
                    Le crédit permet d'investir dans un bien immobilier d'une valeur bien supérieure à vos fonds propres. Avec 20 000 € d'apport, vous pouvez financer un projet de 200 000 € et bénéficier des loyers et de la valorisation du bien.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-white font-cairo font-bold text-xl mb-4 text-center">Constitution de patrimoine</h3>
                  <p className="text-white text-base font-inter leading-relaxed">
                    Chaque mensualité rembourse une partie de votre emprunt. À terme, vous devenez pleinement propriétaire d'un bien qui peut être transmis à vos enfants ou revendu avec une plus-value.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-white font-cairo font-bold text-xl mb-4 text-center">Optimisation fiscale</h3>
                  <p className="text-white text-base font-inter leading-relaxed">
                    Dans certains régimes (par exemple pour une SCI à l'IS), les intérêts d'emprunt sont déductibles, ce qui réduit l'imposition des loyers perçus.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 shadow-xl text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-white font-cairo font-bold text-xl mb-4 text-center">Sécurité du placement</h3>
                  <p className="text-white text-base font-inter leading-relaxed">
                    L'immobilier est un actif tangible. Contrairement aux placements financiers volatils, un bien immobilier conserve une valeur patrimoniale, surtout si son emplacement est bien choisi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Les inconvénients et risques */}
          <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Les inconvénients et risques du crédit immobilier
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Points de vigilance essentiels à connaître avant de s'engager
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl">Endettement</h3>
                  </div>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">
                    Un emprunt engage sur le long terme (15 à 25 ans), ce qui réduit la capacité d'emprunt future.
                  </p>
                </div>
                
                <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl">Risque de taux</h3>
                  </div>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">
                    La hausse des taux d'intérêt peut augmenter le coût total du crédit et réduire la rentabilité.
                  </p>
                </div>
                
                <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl">Assurance emprunteur</h3>
                  </div>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">
                    Souvent coûteuse, elle peut représenter une charge importante si elle n'est pas renégociée.
                  </p>
                </div>
                
                <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl">Vacance locative</h3>
                  </div>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">
                    Dans le cas d'un investissement locatif, l'absence de locataire peut déséquilibrer votre trésorerie.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Le PTZ */}
          <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Le PTZ (Prêt à Taux Zéro)
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Un coup de pouce pour les primo-accédants
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-lg border-2 border-[#E5E7EB] overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
                <p className="text-[#686868] text-lg sm:text-xl font-inter leading-relaxed mb-8 text-center">
                  Le <strong>Prêt à Taux Zéro</strong> est un dispositif de l'État destiné aux ménages achetant leur <strong>résidence principale</strong> pour la première fois. Il finance jusqu'à 40 % du prix du logement <strong>sans intérêts</strong>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
                  <div className="group bg-white rounded-2xl p-8 shadow-xl text-center border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl font-bold">40%</span>
                    </div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-2">Financement</h3>
                    <p className="text-[#686868] text-base font-inter">Jusqu'à 40% du prix du logement</p>
                  </div>
                  
                  <div className="group bg-white rounded-2xl p-8 shadow-xl text-center border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl font-bold">0%</span>
                    </div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-2">Taux d'intérêt</h3>
                    <p className="text-[#686868] text-base font-inter">Aucun intérêt à payer</p>
                  </div>
                  
                  <div className="group bg-white rounded-2xl p-8 shadow-xl text-center border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-2">Logements éligibles</h3>
                    <p className="text-[#686868] text-base font-inter">Neufs ou anciens avec travaux</p>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl p-6 sm:p-8 text-white shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                      <h3 className="text-2xl sm:text-3xl font-cairo font-bold">Exemple concret</h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <p className="text-base sm:text-lg leading-relaxed">
                        Un couple achète un logement neuf à 220 000 € dans une zone éligible. Le PTZ finance 88 000 € sans intérêts, le reste est couvert par un crédit classique. Leur charge mensuelle est réduite, ce qui sécurise leur budget et facilite l'accession à la propriété.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Exemple concret d'effet de levier */}
          <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Exemple concret d'effet de levier
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Illustration pratique du potentiel de l'investissement immobilier
                </p>
              </div>
            <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">
                Un investisseur achète un appartement de 200 000 € avec 20 000 € d'apport et un prêt de 180 000 € sur 20 ans.
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Loyer perçu</h4>
                  <p className="text-lg font-bold">900 €/mois</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Mensualité crédit</h4>
                  <p className="text-lg font-bold">1 000 €/mois</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Effort d'épargne</h4>
                  <p className="text-lg font-bold">100 €/mois</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">Résultat après 20 ans</h4>
                <p className="text-sm mb-2">
                  L'investisseur est pleinement propriétaire d'un bien valorisé <strong>240 000 €</strong> grâce à la revalorisation du marché.
                </p>
                <p className="text-sm">
                  Son effort total d'épargne a été de <strong>24 000 €</strong>, pour un patrimoine net <strong>dix fois supérieur</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

          {/* Conseil Azalée Patrimoine */}
          <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Conseil Azalée Patrimoine
            </h2>
            <div className="space-y-6">
              <p className="text-[#686868] text-lg">
                Le crédit immobilier est un <strong>outil de richesse incomparable</strong>, mais il doit être utilisé avec prudence. La clé est d'adapter le montant emprunté, la durée et le type de crédit à votre situation et à vos objectifs patrimoniaux.
              </p>
              
              <p className="text-[#686868] text-lg">
                Chez <strong>Azalée Patrimoine</strong>, nous aidons nos clients à :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#253F60] rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Négocier les meilleures conditions</h3>
                  <p className="text-sm text-white">De crédit (taux, assurance, durée)</p>
                </div>
                <div className="bg-[#253F60] rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Optimiser l'effet de levier</h3>
                  <p className="text-sm text-white">Tout en gardant une trésorerie saine</p>
                </div>
                <div className="bg-[#253F60] rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Profiter des dispositifs d'aide</h3>
                  <p className="text-sm text-white">Comme le PTZ lorsqu'ils sont éligibles</p>
                </div>
                <div className="bg-[#253F60] rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Intégrer le financement</h3>
                  <p className="text-sm text-white">Dans une stratégie patrimoniale globale</p>
                </div>
              </div>
              
              <div className="bg-[#253F60] rounded-lg p-4 text-center">
                <p className="text-sm text-white">
                  Bien maîtrisé, le crédit immobilier n'est pas une charge : c'est un <strong>levier patrimonial</strong> qui vous permet de transformer une petite mise de départ en un patrimoine solide et transmissible.
                </p>
              </div>
            </div>
          </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-8 sm:p-10 lg:p-12 text-center shadow-xl">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6">
              Prêt à financer votre projet immobilier ?
            </h2>
            <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-2xl mx-auto">
              Nos experts Azalée Patrimoine vous accompagnent pour simuler votre capacité d'emprunt et découvrir la meilleure stratégie de financement pour vos projets immobiliers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-white text-[#112033] px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Prendre rendez-vous
              </button>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-white hover:text-[#112033] transition-colors duration-200"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
            </div>
          </section>
      
      <Footer />
    </>
  );
}