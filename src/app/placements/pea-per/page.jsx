"use client";
import React, { useState } from "react";
import Footer from "../../../components/common/Footer";
export default function PeaPerPage() {
  const [activeTab, setActiveTab] = useState("pea");

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
                Le PEA (Plan d'Épargne en Actions)
              </h1>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                Le <strong>PEA (Plan d'Épargne en Actions)</strong> est une <strong>spécificité française</strong> : c'est une enveloppe fiscale créée en 1992 pour <strong>encourager les particuliers à investir dans les actions européennes</strong>.
              </p>
              <p className="text-white text-base font-inter leading-relaxed mb-8">
                Il permet de loger des titres (actions, ETF, OPCVM, non coté éligible) avec une fiscalité avantageuse après 5 ans.
              </p>
              <div className="bg-white/20 border-l-4 border-white p-4 rounded-r-lg mb-8">
                <p className="text-white text-sm font-inter">
                  Le PEA est aujourd'hui l'un des outils fiscaux les plus puissants pour développer un patrimoine en actions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Ouvrir un PEA
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200"
                >
                  En savoir plus
                </button>
              </div>
            </div>
            
            {/* Right: PEA/PER Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#1A2F4A] transition-colors duration-300">
                    <span className="text-white text-2xl font-bold">PEA</span>
                  </div>
                  <h3 className="text-[#253F60] text-lg font-semibold mb-2">PEA</h3>
                  <p className="text-[#686868] text-sm mb-2">Plan d'Épargne en Actions</p>
                  <p className="text-[#B99066] text-xl font-bold">150 000 €</p>
                  <p className="text-[#686868] text-xs">Plafond de versements</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#A67A5A] transition-colors duration-300">
                    <span className="text-white text-2xl font-bold">PME</span>
                  </div>
                  <h3 className="text-[#253F60] text-lg font-semibold mb-2">PEA-PME</h3>
                  <p className="text-[#686868] text-sm mb-2">Complément PME</p>
                  <p className="text-[#B99066] text-xl font-bold">225 000 €</p>
                  <p className="text-[#686868] text-xs">Plafond complémentaire</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:from-[#1A2F4A] hover:to-[#A67A5A] transition-colors duration-300">
                    <span className="text-white text-2xl font-bold">PER</span>
                  </div>
                  <h3 className="text-[#253F60] text-lg font-semibold mb-2">PER</h3>
                  <p className="text-[#686868] text-sm mb-2">Plan d'Épargne Retraite</p>
                  <p className="text-[#B99066] text-xl font-bold">8 000 €</p>
                  <p className="text-[#686868] text-xs">Plafond annuel</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#1A2F4A] transition-colors duration-300">
                    <span className="text-white text-2xl font-bold">€</span>
                  </div>
                  <h3 className="text-[#253F60] text-lg font-semibold mb-2">Total PEA</h3>
                  <p className="text-[#686868] text-sm mb-2">Maximum possible</p>
                  <p className="text-[#B99066] text-xl font-bold">375 000 €</p>
                  <p className="text-[#686868] text-xs">Par foyer fiscal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full bg-white py-8">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveTab("pea")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "pea" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              PEA
            </button>
            <button 
              onClick={() => setActiveTab("pea-pme")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "pea-pme" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              PEA-PME
            </button>
            <button 
              onClick={() => setActiveTab("avantages")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "avantages" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Avantages
            </button>
            <button 
              onClick={() => setActiveTab("entrepreneurs")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "entrepreneurs" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Entrepreneurs
            </button>
            <button 
              onClick={() => setActiveTab("per")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "per" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              PER
            </button>
            <button 
              onClick={() => setActiveTab("azalee")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "azalee" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Azalée Patrimoine
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "pea" && (
            <div className="space-y-12">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Définition du PEA
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Le <strong>PEA (Plan d'Épargne en Actions)</strong> est une <strong>spécificité française</strong> : c'est une enveloppe fiscale créée en 1992 pour <strong>encourager les particuliers à investir dans les actions européennes</strong>.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-[#253F60] text-xl font-semibold mb-6">Caractéristiques principales</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Spécificité française</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Créé en 1992 pour encourager l'investissement en actions européennes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Titres éligibles</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Actions, ETF, OPCVM, non coté éligible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Fiscalité avantageuse</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Après 5 ans de détention</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#253F60] to-[#3A5A7A] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6">Plafonds et limites</h3>
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">PEA classique</h4>
                      <p className="text-sm">Plafond de versements : <strong>150 000 €</strong></p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">PEA-PME</h4>
                      <p className="text-sm">Plafond complémentaire : <strong>225 000 €</strong></p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Total possible</h4>
                      <p className="text-sm"><strong>375 000 €</strong> par foyer fiscal (hors valorisation)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pea-pme" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  Le PEA-PME : soutenir l'économie réelle
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto">
                  En 2014, l'État a créé le <strong>PEA-PME</strong> pour diriger une partie de l'épargne des Français vers les <strong>PME et ETI</strong> (Entreprises de Taille Intermédiaire).
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">PEA classique</h3>
                    <p className="text-xl font-bold">150 000 €</p>
                  </div>
                  <p className="text-sm mb-4">Plafond de versements</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">PEA-PME</h3>
                    <p className="text-xl font-bold">225 000 €</p>
                  </div>
                  <p className="text-sm mb-4">Plafond complémentaire</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Total</h3>
                    <p className="text-xl font-bold">375 000 €</p>
                  </div>
                  <p className="text-sm mb-4">Par foyer fiscal</p>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-lg p-8">
                <h3 className="text-[#253F60] text-xl font-semibold mb-4">Titres éligibles au PEA-PME</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Actions de PME</h4>
                    <p className="text-sm text-[#686868] leading-relaxed">Cotées ou non cotées</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Fonds spécialisés</h4>
                    <p className="text-sm text-[#686868] leading-relaxed">Parts de fonds PME/ETI</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Obligations convertibles</h4>
                    <p className="text-sm text-[#686868] leading-relaxed">Titres de dette convertibles</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "avantages" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Avantages du PEA
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-semibold mb-2 text-lg">Exonération d'impôt</h3>
                      <p className="text-[#686868] text-sm leading-relaxed">
                        Sur les plus-values et dividendes après <strong>5 ans</strong> (hors prélèvements sociaux).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-semibold mb-2 text-lg">Effet boule de neige</h3>
                      <p className="text-[#686868] text-sm leading-relaxed">
                        Réinvestir les gains dans le PEA permet de capitaliser sans fiscalité intermédiaire.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-semibold mb-2 text-lg">Diversification</h3>
                      <p className="text-[#686868] text-sm leading-relaxed">
                        Actions européennes, ETF éligibles, non coté.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-semibold mb-2 text-lg">Transmission optimisée</h3>
                      <p className="text-[#686868] text-sm leading-relaxed">
                        Possibilité de purger des plus-values latentes en cas de donation des titres.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-semibold mb-2 text-lg">Prise à date stratégique</h3>
                      <p className="text-[#686868] text-sm leading-relaxed">
                        Ouvrir un PEA le plus tôt possible pour bénéficier du régime fiscal après 5 ans.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#253F60] font-semibold mb-2 text-lg">PEA transférable</h3>
                      <p className="text-[#686868] text-sm leading-relaxed">
                        Possibilité de changer d'établissement tout en conservant <strong>l'antériorité fiscale</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <h3 className="text-[#253F60] text-lg font-semibold mb-3">Inconvénients et limites du PEA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Plafonds contraignants</h4>
                    <p className="text-sm text-[#686868]">150 000 € pour le PEA, 225 000 € pour le PEA-PME</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Fermeture en cas de retrait</h4>
                    <p className="text-sm text-[#686868]">Avant 5 ans (sauf exceptions)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Uniquement titres européens</h4>
                    <p className="text-sm text-[#686868]">Pas d'accès direct aux actions américaines ou asiatiques</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Frais variables</h4>
                    <p className="text-sm text-[#686868]">Frais de garde, courtage, transfert → réduisent la performance nette</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "entrepreneurs" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Le PEA, un atout stratégique pour les entrepreneurs
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto">
                  Le PEA est un <strong>outil clé pour les dirigeants et créateurs d'entreprise</strong>.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6">1. La prise à date : un enjeu essentiel</h3>
                  <p className="text-sm mb-4">
                    Le délai fiscal de <strong>5 ans</strong> court à partir de l'ouverture du PEA.
                  </p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-sm">
                        Pour un entrepreneur, ouvrir un PEA le plus tôt possible (même avec 100 € symboliques) permet de <strong>prendre date</strong> et de bénéficier du régime fiscal allégé dès la cinquième année.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6">2. Loger ses actions d'entreprise au bon moment</h3>
                  <p className="text-sm mb-4">
                    Un entrepreneur peut loger ses <strong>propres actions</strong> dans son PEA si elles sont éligibles.
                  </p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-sm">
                        C'est une stratégie particulièrement efficace pour les <strong>startuppers, repreneurs ou fondateurs de PME</strong> qui anticipent une forte valorisation de leur société.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-[#253F60] text-xl font-semibold mb-6">L'intérêt stratégique</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Si la valeur de l'entreprise est encore faible</h4>
                    <p className="text-sm text-[#686868] mb-3">
                      (ex. au lancement, avant que les titres ne valent 150 K€), le dirigeant peut loger un maximum de titres.
                    </p>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                      <p className="text-sm text-green-800">
                        En cas de forte croissance, la <strong>plus-value sera exonérée d'impôt</strong> après 5 ans (hors prélèvements sociaux).
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Les frais du PEA</h4>
                    <p className="text-sm text-[#686868] mb-3">
                      Depuis la loi Pacte, les frais des PEA sont <strong>encadrés</strong> :
                    </p>
                    <ul className="text-sm text-[#686868] space-y-1">
                      <li>• Ouverture : maximum <strong>10 €</strong></li>
                      <li>• Tenue de compte : <strong>0,4 % par an</strong> du montant</li>
                      <li>• Transactions : <strong>0,5 % par ordre</strong> en ligne</li>
                    </ul>
                    <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <p className="text-sm text-yellow-800">
                          Attention : certains établissements appliquent encore des frais annexes (transfert, clôture, garde sur titres non cotés).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "per" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  PER (Plan d'Épargne Retraite)
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto">
                  Le <strong>PER (Plan d'Épargne Retraite)</strong> est une enveloppe créée par la <strong>loi Pacte de 2019</strong>.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white mb-8">
                <h3 className="text-xl font-semibold mb-4">Définition</h3>
                <p className="text-sm mb-4">
                  Il a remplacé et <strong>regroupé les anciens dispositifs retraite</strong> (PERP, contrats Madelin, Article 83, PERCO) pour simplifier l'épargne retraite en France.
                </p>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Objectif : offrir une <strong>solution unique et flexible</strong> pour préparer ses revenus à la retraite.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">PER individuel</h3>
                    <p className="text-sm">(ex-PERP / Madelin)</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Ouvert à tous, salarié, TNS, fonctionnaire, retraité</li>
                    <li>• Permet de verser librement pour préparer sa retraite</li>
                    <li>• Versements déductibles du revenu imposable</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">PER collectif</h3>
                    <p className="text-sm">(ex-PERCO)</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Mis en place dans l'entreprise</li>
                    <li>• Alimenté par l'épargne salariale : intéressement, participation, abondement employeur</li>
                    <li>• Facultatif pour les salariés</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">PER obligatoire</h3>
                    <p className="text-sm">(ex-Article 83)</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Mis en place par l'employeur, obligatoire pour certaines catégories de salariés</li>
                    <li>• Cotisations obligatoires déductibles fiscalement</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Avantages du PER
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Avantage fiscal immédiat</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Les versements volontaires sont déductibles du revenu imposable</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Souplesse</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Possibilité de sortie en capital, en rente ou mixte</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Portabilité</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Tous les PER sont transférables d'un établissement à l'autre</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#253F60] text-xl font-semibold mb-6">Inconvénients et limites du PER</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Blocage de l'épargne</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Jusqu'à la retraite (hors cas de sortie anticipée)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Fiscalité à la sortie</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Capital : imposé sur la part déductible + prélèvements sociaux</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#253F60] font-semibold mb-1 text-lg">Frais variables</h4>
                        <p className="text-[#686868] text-sm leading-relaxed">Frais d'entrée, de gestion, d'arbitrage → parfois élevés</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">Exemple pratique : simulation retraite avec PER</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Versement annuel</h4>
                    <p className="text-sm">Un cadre supérieur verse <strong>10 000 € par an</strong> sur un PER</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Gain fiscal immédiat</h4>
                    <p className="text-sm">Environ <strong>4 100 €</strong> par an (si tranche marginale à 41 %)</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Capital après 20 ans</h4>
                    <p className="text-sm"><strong>300 000 €</strong> (hypothèse 4 % net/an)</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold">
                      Résultat : double avantage, <strong>fiscal immédiat + revenu complémentaire sécurisé à la retraite</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "azalee" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  L'accompagnement Azalée Patrimoine
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6">Pour le PEA</h3>
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Accompagnement des entrepreneurs</h4>
                      <p className="text-sm">Dans la structuration de leur PEA et PEA-PME</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Travail avec plusieurs établissements</h4>
                      <p className="text-sm">Pour trouver les conditions les plus adaptées (frais, gestion, services)</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Optimisation des transferts</h4>
                      <p className="text-sm">Pour préserver l'antériorité fiscale</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Logement stratégique</h4>
                      <p className="text-sm">Des actions d'entreprise avant qu'elles ne dépassent 150 K€</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6">Pour le PER</h3>
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Vision globale de la retraite</h4>
                      <p className="text-sm">Le PER n'est pas isolé, il s'intègre dans une stratégie complète</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Intégration complète</h4>
                      <p className="text-sm">PER d'entreprise, anciens dispositifs, immobilier, assurance-vie</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Simulations personnalisées</h4>
                      <p className="text-sm">De revenus à la retraite pour visualiser les ressources futures</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Optimisation fiscale</h4>
                      <p className="text-sm">Selon la tranche d'imposition et les objectifs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-[#253F60] text-xl font-semibold mb-6">Notre approche repose sur :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Simulations personnalisées</h4>
                    <p className="text-sm text-[#686868] leading-relaxed">De revenus futurs en intégrant tous les leviers</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Arbitrage capital/rente</h4>
                    <p className="text-sm text-[#686868] leading-relaxed">Selon les besoins et la situation</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Optimisation fiscale</h4>
                    <p className="text-sm text-[#686868] leading-relaxed">Selon la tranche d'imposition</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2 text-lg">Sécurisation des revenus</h4>
                    <p className="text-sm text-[#686868] leading-relaxed">Avant et après 70 ans</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* En résumé Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
              En résumé
            </h2>
            <div className="text-[#686868] text-lg max-w-4xl mx-auto space-y-4">
              <p>
                Le <strong>PEA est une enveloppe unique en Europe</strong>, spécifiquement française.
              </p>
              <p>
                Il favorise l'investissement en actions européennes, avec une fiscalité ultra-attractive après 5 ans.
              </p>
              <p>
                Le <strong>PEA-PME</strong> complète l'outil en orientant l'épargne vers les PME et ETI.
              </p>
              <p>
                C'est une <strong>arme redoutable pour les entrepreneurs</strong>, surtout s'il est ouvert tôt et utilisé pour loger des actions non cotées.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xl font-semibold">
                  Azalée Patrimoine accompagne ses clients dans l'ouverture, le transfert et la gestion optimisée de leur PEA, pour transformer cet outil en <strong>véritable levier patrimonial</strong>.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-[#253F60] text-xl font-semibold mb-4">Pour le PER</h3>
                <div className="space-y-3 text-sm text-[#686868]">
                  <p>• Le <strong>PER</strong> a remplacé l'ancien mille-feuille de dispositifs retraite grâce à la <strong>loi Pacte</strong></p>
                  <p>• Il offre <strong>déduction fiscale à l'entrée</strong> et <strong>souplesse à la sortie</strong> (capital ou rente)</p>
                  <p>• C'est un outil adapté aussi bien aux <strong>salariés</strong> qu'aux <strong>indépendants</strong></p>
                  <p>• Mais il doit être géré dans une <strong>vision globale</strong> avec les autres leviers</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-[#253F60] text-xl font-semibold mb-4">Notre approche</h3>
                <div className="space-y-3 text-sm text-[#686868]">
                  <p>• <strong>Simulations personnalisées</strong> de revenus futurs</p>
                  <p>• <strong>Construction d'une stratégie retraite</strong> optimisée</p>
                  <p>• <strong>Intégration</strong> : épargne salariale, assurance-vie, immobilier, SCPI</p>
                  <p>• <strong>Accompagnement</strong> dans l'ouverture et la gestion des enveloppes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            Prêt à optimiser votre épargne retraite ?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Nos experts vous accompagnent dans l'ouverture et la gestion de vos enveloppes PEA et PER 
            pour maximiser vos avantages fiscaux et préparer votre retraite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-lg font-cairo font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Ouvrir un PEA
            </button>
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-cairo font-semibold text-lg hover:bg-white hover:text-[#253F60] transition-colors duration-200"
            >
              Planifiez votre consultation gratuite
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 