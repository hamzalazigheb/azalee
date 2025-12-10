"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
export default function ContratCapitalisationPage() {

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
                Le contrat de capitalisation : un outil patrimonial puissant et complémentaire à l'assurance-vie
            </h1>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                Souvent éclipsé par la notoriété de l'assurance-vie, le <strong>contrat de capitalisation</strong> est pourtant un instrument patrimonial incontournable pour diversifier son épargne et optimiser sa fiscalité.
              </p>
              <div className="bg-[#E8F4F8] border-l-4 border-[#B99066] p-4 rounded-r-lg mb-8">
                <p className="text-[#112033] text-sm font-inter">
                  👉 Bien maîtrisé, le contrat de capitalisation est un <strong>levier discret mais redoutablement efficace</strong> pour les investisseurs avertis.
            </p>
          </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Analyser mon patrimoine
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-transparent border-2 border-[#B99066] text-[#B99066] px-6 py-3 rounded-lg font-inter font-medium hover:bg-[#B99066] hover:text-white transition-colors duration-200"
                >
                  En savoir plus
                </button>
              </div>
            </div>

            {/* Right: Key Features Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
              </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Complémentaire</h3>
                  <p className="text-[#686868] text-sm mb-2">À l'assurance-vie</p>
                  <p className="text-[#B99066] text-xl font-bold">Transmission</p>
                  <p className="text-[#686868] text-xs">Continuité patrimoniale</p>
          </div>
          
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
              </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Personnes morales</h3>
                  <p className="text-[#686868] text-sm mb-2">SCI, holdings</p>
                  <p className="text-[#B99066] text-xl font-bold">Trésorerie</p>
                  <p className="text-[#686868] text-xs">Placement performant</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Supports identiques</h3>
                  <p className="text-[#686868] text-sm mb-2">Fonds euros, UC</p>
                  <p className="text-[#B99066] text-xl font-bold">Fiscalité</p>
                  <p className="text-[#686868] text-xs">Même régime que AV</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <h3 className="text-[#112033] text-lg font-semibold mb-2">Antériorité fiscale</h3>
                  <p className="text-[#686868] text-sm mb-2">Conservée</p>
                  <p className="text-[#B99066] text-xl font-bold">Héritiers</p>
                  <p className="text-[#686868] text-xs">Reprennent le contrat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Points communs avec l'assurance-vie Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 text-center">
              Points communs avec l'assurance-vie
            </h2>
            <p className="text-[#686868] text-lg max-w-4xl mx-auto">
              Le contrat de capitalisation reprend <strong>tous les avantages financiers et fiscaux de l'assurance-vie</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Supports d'investissement */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#3A5A7A] rounded-lg shadow-lg p-8 text-white">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#253F60] font-bold text-xl">1</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Supports d'investissement identiques</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li>• Fonds en euros sécurisés</li>
                <li>• Unités de compte (UC) : actions, ETF, SCPI</li>
                <li>• OPCI, produits structurés, obligations</li>
              </ul>
            </div>

            {/* Fiscalité des rachats */}
            <div className="bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-lg shadow-lg p-8 text-white">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#B99066] font-bold text-xl">2</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Fiscalité des rachats</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li>• Imposition uniquement sur les gains</li>
                <li>• PFU de 30% ou barème progressif</li>
                <li>• Abattement 4 600 €/9 200 € après 8 ans</li>
              </ul>
            </div>

            {/* Souplesse */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#3A5A7A] rounded-lg shadow-lg p-8 text-white">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#253F60] font-bold text-xl">3</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Souplesse</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li>• Versements libres ou programmés</li>
                <li>• Durée illimitée</li>
                <li>• Rachats partiels ou totaux à tout moment</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-[#E8F4F8] border-l-4 border-[#B99066] p-6 rounded-r-lg">
            <p className="text-[#112033] text-lg font-semibold text-center">
              👉 Sur le plan fiscal et financier, un contrat de capitalisation <strong>fonctionne comme une assurance-vie</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Les différences fondamentales Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 text-center">
              Les différences fondamentales avec l'assurance-vie
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Succession */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#B99066]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#253F60] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-[#112033] text-xl font-semibold">Succession</h3>
                  <p className="text-[#B99066] font-bold">Continuité patrimoniale</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#686868] text-sm">
                  Contrairement à l'assurance-vie, le contrat de capitalisation <strong>ne s'éteint pas au décès</strong>.
                </p>
                  <p className="text-[#686868] text-sm">
                  Il <strong>entre dans l'actif successoral</strong> et se transmet aux héritiers avec son antériorité fiscale.
                </p>
                <div className="bg-[#E8F4F8] p-3 rounded-lg">
                  <p className="text-[#112033] text-xs">
                    Pas d'abattement de 152 500 € par bénéficiaire, mais continuité fiscale intéressante.
                  </p>
                </div>
                </div>
              </div>

            {/* Clause bénéficiaire */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#B99066]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#B99066] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-[#112033] text-xl font-semibold">Clause bénéficiaire</h3>
                  <p className="text-[#B99066] font-bold">Transmission classique</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#686868] text-sm">
                  L'assurance-vie permet de désigner librement des bénéficiaires (même en dehors de la famille).
                </p>
                  <p className="text-[#686868] text-sm">
                  Le contrat de capitalisation <strong>ne comporte pas de clause bénéficiaire</strong>.
                </p>
                <div className="bg-[#FFF8E1] p-3 rounded-lg">
                  <p className="text-[#112033] text-xs">
                    Transmission selon les règles classiques de la succession.
                  </p>
                </div>
              </div>
              </div>

            {/* Souscription par personnes morales */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#59E2E4]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#253F60] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-[#112033] text-xl font-semibold">Souscription par personnes morales</h3>
                  <p className="text-[#B99066] font-bold">LA grande différence</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#686868] text-sm">
                  Une <strong>SCI à l'IS</strong> ou une société patrimoniale peut souscrire un contrat de capitalisation.
                </p>
                  <p className="text-[#686868] text-sm">
                  Ce qui en fait un outil de <strong>placement de trésorerie</strong> idéal pour les structures familiales.
                </p>
                <div className="bg-[#E8F4F8] p-3 rounded-lg">
                  <p className="text-[#112033] text-xs">
                    Accessible aux sociétés : SCI, holdings patrimoniales, sociétés à l'IS.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg shadow-lg p-8 text-white">
            <h3 className="text-xl font-semibold mb-6 text-center">
              👉 En résumé :
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">Assurance-vie</h4>
                <p className="text-sm">Outil de transmission hors succession, très souple</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">Contrat de capitalisation</h4>
                <p className="text-sm">Outil de continuité patrimoniale, transmissible et accessible aux sociétés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCI à l'IS et contrat de capitalisation Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="text-[#4EBBBD] text-3xl">🏛️</span>
              Contrat de capitalisation et SCI à l'IS : un atout discret
            </h2>
            <p className="text-[#686868] text-lg max-w-4xl mx-auto">
              Une <strong>SCI à l'IS</strong> peut souscrire un contrat de capitalisation pour placer sa trésorerie.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg shadow-lg p-8 text-white mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Avantages pour une SCI à l'IS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#4EBBBD] text-xl">📊</span>
                </div>
                <h4 className="font-semibold mb-2">Accès à une grande variété de supports</h4>
                <p className="text-sm">Fonds euros, UC, SCPI, produits structurés</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#4EBBBD] text-xl">💰</span>
                </div>
                <h4 className="font-semibold mb-2">Fiscalité maîtrisée à l'IS</h4>
                <p className="text-sm">Amortissement des parts de SCPI, réintégration progressive</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#4EBBBD] text-xl">📈</span>
                </div>
                <h4 className="font-semibold mb-2">Meilleure rentabilité</h4>
                <p className="text-sm">Que des liquidités laissées sur un compte courant</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#4EBBBD]">
            <h3 className="text-[#112033] text-xl font-semibold mb-6">
              Exemple concret
            </h3>
            
            <div className="bg-[#E8F4F8] p-6 rounded-lg mb-6">
              <p className="text-[#112033] text-lg font-semibold mb-4">
                👉 Exemple : une SCI familiale à l'IS détient 300 000 € de trésorerie suite à une vente immobilière.
              </p>
              <p className="text-[#686868] mb-4">
                Plutôt que de laisser dormir ces fonds sur un compte bancaire faiblement rémunéré, elle les place dans un contrat de capitalisation, diversifié entre fonds euros et SCPI.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-[#112033] font-semibold text-center">
                  Résultat : un rendement net supérieur, avec une gestion souple et adaptée à l'horizon patrimonial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages et inconvénients Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Avantages */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500">
              <h3 className="text-[#112033] text-xl font-semibold mb-8 flex items-center gap-3">
                <span className="text-green-500 text-3xl">✅</span>
                Les avantages du contrat de capitalisation
                  </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Souplesse fiscale identique à l'assurance-vie
                    </h4>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Transmissibilité avec conservation de l'antériorité fiscale
                    </h4>
                    <p className="text-[#686868] text-sm">
                      Les héritiers reprennent le contrat tel quel
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Adapté aux personnes morales
                    </h4>
                  <p className="text-[#686868] text-sm">
                      SCI, holdings, sociétés à l'IS
                  </p>
                </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Diversification patrimoniale
                    </h4>
                    <p className="text-[#686868] text-sm">
                      En complément de l'assurance-vie
                    </p>
                </div>
              </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Outil de trésorerie performant
                    </h4>
                    <p className="text-[#686868] text-sm">
                      Pour les sociétés patrimoniales
                    </p>
                  </div>
                </div>
              </div>
                </div>

            {/* Inconvénients */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500">
              <h3 className="text-[#112033] text-xl font-semibold mb-8 flex items-center gap-3">
                <span className="text-red-500 text-3xl">⚠️</span>
                Les inconvénients et contre-indications
                  </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">⚠</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Pas d'abattement 152 500 €
                    </h4>
                  <p className="text-[#686868] text-sm">
                      À la transmission, contrairement à l'assurance-vie
                  </p>
                </div>
              </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">⚠</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Soumis aux droits de succession
                    </h4>
                  <p className="text-[#686868] text-sm">
                      Comme tout autre actif
                  </p>
                </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">⚠</span>
                  </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Moins connu que l'assurance-vie
                    </h4>
                    <p className="text-[#686868] text-sm">
                      Certains investisseurs passent à côté de son intérêt stratégique
                    </p>
                </div>
              </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">⚠</span>
                </div>
                  <div>
                    <h4 className="text-[#112033] font-semibold mb-2">
                      Nécessite une bonne anticipation
                    </h4>
                  <p className="text-[#686868] text-sm">
                      Dans une stratégie globale, sinon usage peut sembler redondant avec une assurance-vie
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemple concret Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="text-[#4EBBBD] text-3xl">💡</span>
              Exemple concret
            </h2>
          </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg shadow-lg p-8 text-white mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Monsieur A, 68 ans, détient 400 000 € répartis entre assurance-vie et liquidités
              </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <h4 className="font-semibold mb-4 text-center">Assurance-vie</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Versement :</span>
                    <span className="font-bold">200 000 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avantage :</span>
                    <span className="text-sm">Transmission optimisée</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bénéfice :</span>
                    <span className="text-sm">Abattement 152 500 € par bénéficiaire</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <h4 className="font-semibold mb-4 text-center">Contrat de capitalisation</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement :</span>
                    <span className="font-bold">200 000 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avantage :</span>
                    <span className="text-sm">Continuité patrimoniale</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bénéfice :</span>
                    <span className="text-sm">Antériorité fiscale conservée</span>
                  </div>
                </div>
              </div>
            </div>
            </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#4EBBBD]">
            <h3 className="text-[#112033] text-xl font-semibold mb-6">
              Résultat de cette stratégie duale :
              </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#E8F4F8] p-6 rounded-lg">
                <h4 className="text-[#112033] font-semibold mb-3">Assurance-vie</h4>
                <p className="text-[#686868] text-sm">
                  Assure une <strong>transmission optimisée</strong> grâce à l'abattement de 152 500 € par bénéficiaire.
                </p>
              </div>
              
              <div className="bg-[#E8F4F8] p-6 rounded-lg">
                <h4 className="text-[#112033] font-semibold mb-3">Contrat de capitalisation</h4>
              <p className="text-[#686868] text-sm">
                  Permet aux héritiers de continuer à profiter de l'antériorité fiscale du contrat (abattement 4 600 €/9 200 € après 8 ans).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseil Azalée Patrimoine Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6 flex items-center justify-center gap-3">
              <span className="text-[#4EBBBD] text-3xl">🎯</span>
              Conseil Azalée Patrimoine
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-[#112033] text-xl font-semibold mb-6 text-center">
              Le <strong>contrat de capitalisation</strong> est l'outil idéal pour :
              </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#4EBBBD] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <h4 className="text-[#112033] font-semibold mb-2">Diversification des enveloppes fiscales</h4>
              <p className="text-[#686868] text-sm">
                  Les investisseurs souhaitant diversifier leurs enveloppes fiscales
              </p>
            </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">🔄</span>
                </div>
                <h4 className="text-[#112033] font-semibold mb-2">Continuité patrimoniale</h4>
              <p className="text-[#686868] text-sm">
                  Les familles qui veulent assurer une continuité patrimoniale sans perdre l'antériorité fiscale
              </p>
            </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#59E2E4] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">🏢</span>
                </div>
                <h4 className="text-[#112033] font-semibold mb-2">Sociétés patrimoniales</h4>
              <p className="text-[#686868] text-sm">
                  Les sociétés patrimoniales (SCI à l'IS, holdings) qui cherchent un placement de trésorerie performant
              </p>
              </div>
            </div>
            </div>

          <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-lg shadow-lg p-8 text-white">
            <h3 className="text-xl font-semibold mb-6 text-center">
              👉 L'assurance-vie et le contrat de capitalisation ne s'opposent pas : ils se complètent.
              </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">L'assurance-vie</h4>
                <p className="text-sm">L'outil phare de la transmission hors succession</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">Le contrat de capitalisation</h4>
                <p className="text-sm">Un instrument de continuité patrimoniale et d'investissement sociétaire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
              Contactez un conseiller Azalée Patrimoine
            </h2>
            <p className="text-[#686868] text-lg max-w-4xl mx-auto">
              Pour savoir comment intégrer un contrat de capitalisation dans votre stratégie patrimoniale ou dans la trésorerie de votre société.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <h3 className="text-[#112033] text-xl font-semibold mb-3">Appelez-nous</h3>
                <p className="text-[#686868] text-sm mb-4">
                  Un conseiller vous accompagne dans votre stratégie patrimoniale.
                </p>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#253F60] text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-[#1A2A4A] transition-colors duration-200"
                >
                  Prendre rendez-vous
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📧</span>
                </div>
                <h3 className="text-[#112033] text-xl font-semibold mb-3">Écrivez-nous</h3>
                <p className="text-[#686868] text-sm mb-4">
                  Obtenez une analyse personnalisée de votre patrimoine.
                </p>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Analyser mon patrimoine
                </button>
              </div>
            </div>
            
            <div className="mt-8 bg-[#E8F4F8] border-l-4 border-[#4EBBBD] p-6 rounded-r-lg">
              <p className="text-[#112033] text-center font-semibold">
                📩 <strong>Contactez un conseiller Azalée Patrimoine</strong> pour savoir comment intégrer un contrat de capitalisation dans votre stratégie patrimoniale ou dans la trésorerie de votre société.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-[#B99066] to-[#253F60] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            Prêt à intégrer un contrat de capitalisation dans votre stratégie ?
          </h2>
          <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
            Nos experts vous accompagnent pour définir la meilleure stratégie patrimoniale en combinant assurance-vie et contrat de capitalisation, 
            ou pour optimiser la trésorerie de votre société.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Analyser mon patrimoine
            </button>
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:bg-white hover:text-[#253F60] transition-colors duration-200"
            >
              Prendre rendez-vous
          </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 