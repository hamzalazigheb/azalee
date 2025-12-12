"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function InvestissementLocatifPage() {
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
                Investissement locatif : un levier puissant pour bâtir votre patrimoine
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                L'<strong>investissement locatif</strong> est la stratégie immobilière la plus répandue en France. Elle consiste à acquérir un bien immobilier – appartement, maison ou immeuble – dans le but de le louer, que ce soit en <strong>location nue</strong> (bail classique de 3 ans) ou en <strong>location meublée</strong> (plus flexible et fiscalement avantageuse).
              </p>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Ce type d'investissement attire de nombreux épargnants car il permet à la fois de <strong>percevoir des revenus complémentaires</strong>, de <strong>réduire sa fiscalité</strong> et de <strong>constituer un patrimoine transmissible</strong>.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Calculer ma rentabilité
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
                    <span className="text-white mt-1">✓</span>
                    <span>Revenus complémentaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Effet de levier du crédit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Patrimoine tangible et transmissible</span>
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
          
          {/* Pourquoi investir dans l'immobilier locatif */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                Pourquoi investir dans l'immobilier locatif ?
              </h2>
              <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                Découvrez les bénéfices de cette stratégie d'investissement patrimonial
              </p>
            </div>
            
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
              <div className="relative z-10 space-y-6 sm:space-y-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold">Génération de revenus réguliers</h3>
                  </div>
                  <p className="text-white text-base sm:text-lg leading-relaxed">
                    L'un des premiers atouts de l'investissement locatif est la <strong>génération de revenus réguliers</strong>. Les loyers perçus peuvent financer une partie ou la totalité des mensualités de crédit, tout en offrant un revenu complémentaire à long terme.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold">Effet de levier du crédit immobilier</h3>
                  </div>
                  <p className="text-white text-base sm:text-lg leading-relaxed">
                    De plus, grâce à l'<strong>effet de levier du crédit immobilier</strong>, vous investissez avec peu d'apport personnel : ce sont vos locataires, associés aux avantages fiscaux, qui remboursent une grande partie du prêt.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 sm:p-8 border-l-4 border-white">
                  <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-4">Exemple simple</h3>
                  <p className="text-white text-base sm:text-lg leading-relaxed">
                    Vous achetez un bien à <strong>200 000 €</strong> financé par un prêt de <strong>180 000 €</strong>. Avec un loyer de <strong>900 €/mois</strong> et une mensualité de crédit de <strong>1 000 €</strong>, votre effort d'épargne n'est que de <strong>100 €/mois</strong>. En contrepartie, vous construisez un patrimoine qui prendra de la valeur au fil des années.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold">Stratégie de valorisation patrimoniale</h3>
                  </div>
                  <p className="text-white text-base sm:text-lg leading-relaxed">
                    Enfin, l'investissement locatif est une stratégie de <strong>valorisation patrimoniale</strong> : à mesure que le capital de votre emprunt diminue, la valeur de votre bien augmente, surtout si vous avez choisi un emplacement porteur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Les avantages de l'investissement locatif */}
          <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Les avantages de l'investissement locatif
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Découvrez les bénéfices de cette stratégie d'investissement
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="group text-center bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4">Revenus complémentaires</h3>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">Loyer mensuel qui constitue une source de revenus stable et prévisible</p>
                </div>
                
                <div className="group text-center bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4">Effet de levier du crédit</h3>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">Possibilité de se constituer un patrimoine important sans immobiliser trop de capital</p>
                </div>
                
                <div className="group text-center bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4">Patrimoine tangible</h3>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">L'immobilier reste un actif concret, sécurisant et transmissible à vos héritiers</p>
                </div>
                
                <div className="group text-center bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                  <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4">Optimisation fiscale</h3>
                  <p className="text-[#686868] text-base font-inter leading-relaxed">Régime réel, déficit foncier, ou statut LMNP qui permet d'amortir la valeur du bien</p>
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
                  Les inconvénients et risques à anticiper
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Points de vigilance essentiels à connaître avant d'investir
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 lg:p-12 shadow-lg border-2 border-[#E5E7EB] overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
                <p className="text-[#686868] text-lg sm:text-xl font-inter leading-relaxed mb-8 text-center">
                  Comme tout placement, l'investissement locatif présente aussi des contraintes :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Risque de vacance locative</h3>
                    <p className="text-[#686868] text-base font-inter leading-relaxed text-center">
                      Si le bien est mal situé ou si le marché est saturé.
                    </p>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Gestion chronophage</h3>
                    <p className="text-[#686868] text-base font-inter leading-relaxed text-center">
                      Rechercher des locataires, gérer les entrées et sorties, suivre les réparations ou les impayés peut vite devenir une seconde activité.
                    </p>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Impayés de loyers</h3>
                    <p className="text-[#686868] text-base font-inter leading-relaxed text-center">
                      Qui impactent la trésorerie si vous n'avez pas souscrit une assurance loyers impayés (GLI).
                    </p>
                  </div>
                  
                  <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Rentabilité très variable</h3>
                    <p className="text-[#686868] text-base font-inter leading-relaxed text-center">
                      Selon l'emplacement : investir dans un studio étudiant à Lyon n'a pas le même rendement qu'une maison familiale en zone rurale.
                    </p>
                  </div>
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
                  Un cas pratique pour mieux comprendre la rentabilité réelle
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-10 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-2xl sm:text-3xl font-cairo font-bold">
                      Un appartement acheté 180 000 € loué 800 €/mois, avec une mensualité de crédit de 950 €/mois
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg text-center">
                      <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Loyer mensuel</h4>
                      <p className="text-3xl sm:text-4xl font-bold text-[#B99066]">800 €</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg text-center">
                      <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Mensualité crédit</h4>
                      <p className="text-3xl sm:text-4xl font-bold text-[#B99066]">950 €</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg text-center">
                      <h4 className="font-cairo font-bold text-lg sm:text-xl mb-4 text-white">Effort d'épargne</h4>
                      <p className="text-3xl sm:text-4xl font-bold text-[#B99066]">150 €/mois</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 sm:p-8 border-l-4 border-white shadow-lg">
                    <h4 className="font-cairo font-bold text-xl sm:text-2xl mb-4 text-white">Résultat après 20 ans</h4>
                    <p className="text-base sm:text-lg text-white leading-relaxed">
                      Le bien est totalement remboursé et valorisé à <strong>220 000 €</strong> : vous avez créé un patrimoine net, tout en investissant peu chaque mois.
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
                    Chez <strong>Azalée Patrimoine</strong>, nous savons que la réussite d'un investissement locatif dépend à <strong>80 % de l'emplacement et du type de logement</strong>.
                  </p>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20">
                    <p className="text-base sm:text-lg text-center leading-relaxed">
                      Un bien mal choisi peut rapidement devenir une source de stress et de perte financière : vacance locative, loyers trop bas, travaux mal anticipés…
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                    <h3 className="text-xl sm:text-2xl font-cairo font-bold">Notre rôle est de vous aider à :</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#253F60] text-2xl font-bold">1</span>
                      </div>
                      <h3 className="font-cairo font-bold text-xl mb-3">Sélectionner le bon bien</h3>
                      <p className="text-base text-white/90">(ville, quartier, typologie)</p>
                    </div>
                    
                    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#253F60] text-2xl font-bold">2</span>
                      </div>
                      <h3 className="font-cairo font-bold text-xl mb-3">Optimiser le financement</h3>
                      <p className="text-base text-white/90">Pour maximiser l'effet de levier du crédit</p>
                    </div>
                    
                    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#253F60] text-2xl font-bold">3</span>
                      </div>
                      <h3 className="font-cairo font-bold text-xl mb-3">Réduire la fiscalité</h3>
                      <p className="text-base text-white/90">Grâce aux dispositifs adaptés (LMNP, déficit foncier, Pinel)</p>
                    </div>
                    
                    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-[#253F60] text-2xl font-bold">4</span>
                      </div>
                      <h3 className="font-cairo font-bold text-xl mb-3">Anticiper la gestion</h3>
                      <p className="text-base text-white/90">Pour éviter que cet investissement ne devienne une charge mentale</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 sm:p-8 border-l-4 border-white">
                    <p className="text-base sm:text-lg text-center leading-relaxed font-medium">
                      L'investissement locatif peut être une formidable machine à créer de la richesse, à condition d'être bien accompagné.
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
                    Prêt à vous lancer dans l'investissement locatif ?
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                    Nos experts Azalée Patrimoine vous accompagnent pour construire une stratégie locative adaptée à votre profil, vos objectifs et votre fiscalité.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <button 
                      onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      className="group bg-white text-[#253F60] px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-[#F9FAFB] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px]"
                    >
                      Calculer ma rentabilité
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