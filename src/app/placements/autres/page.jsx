"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function AutresPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section with diverse products */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-6">
              Autres Solutions de Placement
            </h1>
            <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed max-w-4xl mx-auto">
              Découvrez nos solutions d'investissement alternatives et spécialisées
            </p>
          </div>
          
          {/* Product Categories Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#A67A5A] transition-colors duration-300">
                <span className="text-white text-2xl font-bold">PE</span>
              </div>
              <h3 className="text-[#112033] text-lg font-semibold mb-2">Private Equity</h3>
              <p className="text-[#686868] text-sm">Investissement dans des entreprises non cotées</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#A67A5A] transition-colors duration-300">
                <span className="text-white text-2xl font-bold">FA</span>
              </div>
              <h3 className="text-[#112033] text-lg font-semibold mb-2">Foncière Agricole</h3>
              <p className="text-[#686868] text-sm">Investissement dans les terres agricoles</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="w-16 h-16 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:from-[#1A2F4A] hover:to-[#A67A5A] transition-colors duration-300">
                <span className="text-white text-2xl font-bold">MP</span>
              </div>
              <h3 className="text-[#112033] text-lg font-semibold mb-2">Matières Premières</h3>
              <p className="text-[#686868] text-sm">Or, argent, pétrole et autres commodités</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#A67A5A] transition-colors duration-300">
                <span className="text-white text-2xl font-bold">AC</span>
              </div>
              <h3 className="text-[#112033] text-lg font-semibold mb-2">Art & Collection</h3>
              <p className="text-[#686868] text-sm">Œuvres d'art et objets de collection</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#B99066] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-lg hover:bg-[#A67A5A] transition-colors duration-200">
              Découvrir nos solutions
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

      {/* Alternative Investments Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Solutions d'investissement alternatives"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Private Equity */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 text-white group hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-source-sans font-semibold mb-2">Private Equity</h3>
              </div>
              <p className="text-sm mb-4 leading-relaxed">
                Investissement dans des entreprises non cotées en phase de croissance.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#B99066] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Potentiel de croissance élevé</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#B99066] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Durée d'investissement : 5-10 ans</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#B99066] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ticket d'entrée : €50,000+</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#B99066] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gestion déléguée</span>
                </li>
              </ul>
            </div>

            {/* Agricultural Real Estate */}
            <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl shadow-lg p-8 text-white group hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-source-sans font-semibold mb-2">Foncière Agricole</h3>
              </div>
              <p className="text-sm mb-4 leading-relaxed">
                Investissement dans des terres agricoles et exploitations.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Revenus locatifs stables</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Plus-value foncière</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Diversification géographique</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Impact environnemental positif</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commodities Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Matières premières et métaux précieux"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gold */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#B99066]">
              <h3 className="text-[#112033] text-xl font-source-sans font-semibold mb-4">Or</h3>
              <p className="text-[#B99066] font-bold text-lg mb-4">+15.2% sur 1 an</p>
              <p className="text-[#686868] text-sm mb-4 leading-relaxed">
                Valeur refuge par excellence, protection contre l'inflation.
              </p>
              <ul className="space-y-2 text-sm text-[#686868]">
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Actif refuge</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Protection inflation</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Diversification</span>
                </li>
              </ul>
            </div>

            {/* Silver */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#B99066]">
              <h3 className="text-[#112033] text-xl font-source-sans font-semibold mb-4">Argent</h3>
              <p className="text-[#B99066] font-bold text-lg mb-4">+8.7% sur 1 an</p>
              <p className="text-[#686868] text-sm mb-4 leading-relaxed">
                Métal industriel et précieux, usage technologique.
              </p>
              <ul className="space-y-2 text-sm text-[#686868]">
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Usage industriel</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Volatilité élevée</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Potentiel de croissance</span>
                </li>
              </ul>
            </div>

            {/* Oil */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#B99066]">
              <h3 className="text-[#112033] text-xl font-source-sans font-semibold mb-4">Pétrole</h3>
              <p className="text-[#B99066] font-bold text-lg mb-4">+12.3% sur 1 an</p>
              <p className="text-[#686868] text-sm mb-4 leading-relaxed">
                Énergie fossile, impact géopolitique important.
              </p>
              <ul className="space-y-2 text-sm text-[#686868]">
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Énergie fossile</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Volatilité géopolitique</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transition énergétique</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Art & Collection Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Art Investment */}
            <div>
              <h2 className="text-[#112033] text-2xl sm:text-3xl lg:text-4xl font-source-sans font-semibold mb-8">
                Art et objets de collection
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-source-sans font-semibold mb-2 text-lg">
                      Plus-value potentielle
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Les œuvres d'art peuvent prendre de la valeur 
                      de manière significative sur le long terme.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-source-sans font-semibold mb-2 text-lg">
                      Diversification
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Corrélation faible avec les marchés financiers 
                      traditionnels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-source-sans font-semibold mb-2 text-lg">
                      Expertise requise
                    </h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Nécessite une expertise spécialisée et 
                      une connaissance du marché de l'art.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Art Categories */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-[#B99066] transition-colors duration-300">
              <h3 className="text-[#112033] text-xl font-source-sans font-semibold mb-6">
                Catégories d'art
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#112033] text-sm font-medium">Art contemporain</span>
                    <span className="text-[#B99066] font-bold text-lg">+18.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] h-3 rounded-full transition-all duration-500" style={{width: '85%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#112033] text-sm font-medium">Art moderne</span>
                    <span className="text-[#B99066] font-bold text-lg">+12.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] h-3 rounded-full transition-all duration-500" style={{width: '65%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#112033] text-sm font-medium">Art classique</span>
                    <span className="text-[#253F60] font-bold text-lg">+8.7%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] h-3 rounded-full transition-all duration-500" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk & Benefits Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Risques et avantages"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border-l-4 border-[#B99066] hover:shadow-xl transition-all duration-300">
              <h3 className="text-[#253F60] text-2xl font-source-sans font-semibold mb-6 text-center">
                Avantages
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#112033] font-medium">Diversification du portefeuille</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#112033] font-medium">Potentiel de rendement élevé</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#112033] font-medium">Protection contre l'inflation</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#112033] font-medium">Corrélation faible avec les marchés</span>
                </div>
              </div>
            </div>

            {/* Risks */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-xl transition-all duration-300">
              <h3 className="text-[#253F60] text-2xl font-source-sans font-semibold mb-6 text-center">
                Risques
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#112033] font-medium">Liquidité limitée</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#112033] font-medium">Volatilité élevée</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#112033] font-medium">Expertise spécialisée requise</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#112033] font-medium">Frais de gestion élevés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Comment investir dans les alternatives ?"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#B99066]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-[#112033] font-source-sans font-semibold mb-2 text-lg">
                Évaluation du profil
              </h3>
              <p className="text-[#686868] text-sm leading-relaxed">
                Analyse de votre profil de risque et de vos objectifs d'investissement
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#B99066]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-[#112033] font-source-sans font-semibold mb-2 text-lg">
                Sélection des produits
              </h3>
              <p className="text-[#686868] text-sm leading-relaxed">
                Choix des solutions alternatives adaptées à votre situation
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#B99066]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-[#112033] font-source-sans font-semibold mb-2 text-lg">
                Mise en place
              </h3>
              <p className="text-[#686868] text-sm leading-relaxed">
                Souscription et configuration de vos investissements alternatifs
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#B99066]">
              <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-[#112033] font-source-sans font-semibold mb-2 text-lg">
                Suivi et optimisation
              </h3>
              <p className="text-[#686868] text-sm leading-relaxed">
                Accompagnement continu et ajustements selon l'évolution des marchés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-source-sans font-semibold mb-6">
            Prêt à explorer les investissements alternatifs ?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Nos experts vous accompagnent dans la découverte et la mise en place 
            de solutions d'investissement alternatives adaptées à votre profil.
          </p>
          <button className="bg-[#B99066] text-white px-8 py-4 rounded-lg shadow-lg font-source-sans font-semibold text-lg hover:bg-[#A67A5A] transition-colors duration-200">
            Découvrir nos solutions
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 