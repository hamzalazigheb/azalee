"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function EtfProduitsFinanciersPage() {

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
                Produits financiers : actions, ETF, produits structurés
              </h1>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                Les <strong>supports dynamiques</strong> disponibles dans les enveloppes fiscales pour accéder à la <strong>croissance des marchés financiers</strong> avec une <strong>diversification optimale</strong>.
              </p>
              <div className="bg-white/20 border-l-4 border-white p-4 rounded-r-lg mb-8">
                <p className="text-white text-sm font-inter">
                  La réussite d'un placement dépend autant du support que de l'enveloppe fiscale choisie.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200">
                  Analyser mes placements
                </button>
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200">
                  En savoir plus
                </button>
              </div>
            </div>
            
            {/* Right: Product Types Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Actions</h3>
                  <p className="text-[#686868] text-sm mb-2">Titres vifs d'entreprises</p>
                  <p className="text-[#B99066] text-xl font-bold">Volatilité élevée</p>
                  <p className="text-[#686868] text-xs">Croissance potentielle</p>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">ETF</h3>
                  <p className="text-[#686868] text-sm mb-2">Fonds indiciels</p>
                  <p className="text-[#B99066] text-xl font-bold">Diversification</p>
                  <p className="text-[#686868] text-xs">Frais réduits</p>
                </div>
                
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Produits structurés</h3>
                  <p className="text-[#686868] text-sm mb-2">Instruments combinés</p>
                  <p className="text-[#B99066] text-xl font-bold">Rendement conditionnel</p>
                  <p className="text-[#686868] text-xs">Complexité variable</p>
                </div>
                
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Enveloppes fiscales</h3>
                  <p className="text-[#686868] text-sm mb-2">Assurance-vie, PEA, PER</p>
                  <p className="text-[#B99066] text-xl font-bold">Optimisation fiscale</p>
                  <p className="text-[#686868] text-xs">Stratégie patrimoniale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Définition Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Définition"
            subtitle="Les supports dynamiques disponibles dans les enveloppes fiscales."
            className="mb-12 sm:mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Actions */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-md">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Actions</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">
                <strong>Titres vifs d'entreprises</strong> donnant droit à une part du capital et des bénéfices.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Participation au capital</li>
                <li>• Dividendes possibles</li>
                <li>• Plus-value potentielle</li>
                <li>• Volatilité élevée</li>
              </ul>
            </div>

            {/* ETF */}
            <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-md">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">ETF (trackers)</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">
                <strong>Fonds indiciels</strong> répliquant un indice boursier de manière passive.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Réplication d'indices</li>
                <li>• Frais très faibles</li>
                <li>• Diversification automatique</li>
                <li>• Liquidité quotidienne</li>
              </ul>
            </div>

            {/* Produits structurés */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-md">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Produits structurés</h3>
              </div>
              <p className="text-sm mb-4 opacity-90">
                <strong>Instruments combinés</strong> actions, obligations et dérivés pour un rendement conditionnel.
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Combinaison d'actifs</li>
                <li>• Rendement conditionnel</li>
                <li>• Protection partielle</li>
                <li>• Complexité variable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages et Inconvénients Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Avantages et Inconvénients"
            className="mb-12"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Avantages */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border-l-4 border-[#253F60] hover:shadow-xl transition-all duration-300">
              <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Avantages
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">
                      Accès à la croissance des marchés financiers
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Participation directe à la performance des entreprises et des indices boursiers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">
                      Diversification (ETF)
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Accès à des centaines d'actions ou obligations avec un seul produit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">
                      Rendements potentiellement élevés
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Performance supérieure aux placements sécurisés sur le long terme.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inconvénients */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border-l-4 border-[#B99066] hover:shadow-xl transition-all duration-300">
              <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                Inconvénients / contre-indications
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">
                      Volatilité élevée (actions)
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Fluctuations importantes des cours pouvant générer du stress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">
                      Produits structurés parfois complexes et risqués
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Mécanismes sophistiqués nécessitant une compréhension approfondie.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">
                      Risque de perte en capital
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Possibilité de perdre une partie ou la totalité de l'investissement initial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseil Azalée Patrimoine Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Conseil Azalée Patrimoine"
            className="mb-12"
          />

          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-8 text-white mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-4">
                La réussite d'un placement ne dépend pas uniquement du <strong>support choisi</strong>, mais surtout de l'<strong>enveloppe fiscale</strong> dans laquelle il est logé.
              </h3>
              <p className="text-lg">
                Un ETF monde en assurance-vie, en PEA ou en CTO n'aura <strong>pas du tout le même rendement net après impôt</strong>.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border-l-4 border-[#253F60] hover:shadow-xl transition-all duration-300">
            <h3 className="text-[#112033] text-xl font-semibold mb-6">
              Chez <strong>Azalée Patrimoine</strong>, nous construisons avec vous une <strong>stratégie patrimoniale sur mesure</strong>, en choisissant :
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="text-[#112033] font-semibold mb-3 text-lg">La bonne enveloppe fiscale</h4>
                <p className="text-[#686868] text-sm leading-relaxed">
                  Assurance-vie, PEA, PER, CTO... selon votre situation et vos objectifs.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-[#112033] font-semibold mb-3 text-lg">Les bons supports</h4>
                <p className="text-[#686868] text-sm leading-relaxed">
                  ETF, SCPI, produits structurés, actions... adaptés à votre profil de risque.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h4 className="text-[#112033] font-semibold mb-3 text-lg">Le bon équilibre</h4>
                <p className="text-[#686868] text-sm leading-relaxed">
                  Entre <strong>sécurité, liquidité et performance</strong> selon vos besoins.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-6 rounded-r-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <p className="text-[#112033] text-lg font-semibold text-center">
                  Votre patrimoine mérite mieux qu'un simple placement : il mérite une <strong>stratégie patrimoniale cohérente</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Contactez un conseiller Azalée Patrimoine"
            subtitle="Pour définir la meilleure combinaison enveloppe / support et optimiser vos placements."
            className="mb-12"
          />

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-[#112033] text-xl font-semibold mb-3">Appelez-nous</h3>
                <p className="text-[#686868] text-sm mb-4 leading-relaxed">
                  Un conseiller vous accompagne dans votre stratégie patrimoniale.
                </p>
                <button className="bg-[#253F60] text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-[#1a2d47] transition-colors duration-200 shadow-md hover:shadow-lg">
                  Prendre rendez-vous
                </button>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-[#112033] text-xl font-semibold mb-3">Écrivez-nous</h3>
                <p className="text-[#686868] text-sm mb-4 leading-relaxed">
                  Obtenez une analyse personnalisée de vos placements actuels.
                </p>
                <button className="bg-[#B99066] text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200 shadow-md hover:shadow-lg">
                  Analyser mes placements
                </button>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-6 rounded-r-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[#112033] text-center font-semibold">
                  <strong>Contactez un conseiller Azalée Patrimoine</strong> pour définir la meilleure combinaison enveloppe / support et optimiser vos placements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            Prêt à optimiser vos produits financiers ?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Nos experts vous accompagnent dans la construction d'une <strong>stratégie patrimoniale cohérente</strong> 
            en choisissant la meilleure combinaison enveloppe fiscale / supports financiers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
              Analyser mes placements
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:bg-white hover:text-[#253F60] transition-colors duration-200">
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 