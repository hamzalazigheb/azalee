"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
export default function BourseActionsPage() {
  const [activeTab, setActiveTab] = useState("introduction");
  const [marketData, setMarketData] = useState({
    cac40: { value: 0, change: 0, loading: true },
    sp500: { value: 0, change: 0, loading: true },
    msciWorld: { value: 0, change: 0, loading: true },
    averageReturn: 7.0,
    loading: true
  });

  // Fetch real market data from API
  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/market-data', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setMarketData({
            cac40: { ...result.data.cac40, loading: false },
            sp500: { ...result.data.sp500, loading: false },
            msciWorld: { ...result.data.msciWorld, loading: false },
            averageReturn: result.data.averageReturn,
            loading: false
          });
        }
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Keep loading state or use fallback values
    }
  };

  // Fetch data on mount and refresh every 60 seconds
  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(() => {
      fetchMarketData();
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
              La Bourse (actions, CAC 40, indices, ETF…) : guide pour débuter
            </h1>
            <p className="text-white text-lg font-inter leading-relaxed mb-8 max-w-4xl mx-auto">
              Investir en Bourse attire de plus en plus d'épargnants français. Entre l'<strong>attrait de la performance</strong> (bien supérieure aux livrets ou fonds en euros) et la possibilité de <strong>participer à la croissance des entreprises</strong>, la Bourse est un passage obligé pour diversifier son patrimoine.
            </p>
            <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg mb-8 max-w-4xl mx-auto">
              <p className="text-white text-sm font-inter">
                Mais la Bourse peut sembler complexe : actions, dividendes, CAC 40, indices mondiaux, ETF, volatilité… Cette page vous aide à <strong>décrypter les bases</strong> pour investir de manière éclairée.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200"
              >
                Commencer à investir
              </button>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200"
              >
                Voir nos analyses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="w-full bg-gradient-to-br from-[#F9FAFB] to-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* CAC 40 Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#253F60]/20">
              <h3 className="text-[#253F60] text-sm font-cairo font-semibold mb-3 uppercase tracking-wide">CAC 40</h3>
              {marketData.cac40.loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-[#10B981] text-3xl font-cairo font-bold mb-2">
                    {marketData.cac40.value > 0 ? marketData.cac40.value.toFixed(2) : '---'}
                  </p>
                  <p className={`text-sm font-inter font-semibold mb-4 ${marketData.cac40.change >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                    {marketData.cac40.change >= 0 ? '+' : ''}{marketData.cac40.change.toFixed(1)}%
                  </p>
                </>
              )}
              <p className="text-[#686868] text-xs font-inter leading-relaxed">40 plus grandes entreprises françaises</p>
            </div>

            {/* S&P 500 Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#253F60]/20">
              <h3 className="text-[#253F60] text-sm font-cairo font-semibold mb-3 uppercase tracking-wide">S&P 500</h3>
              {marketData.sp500.loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-[#10B981] text-3xl font-cairo font-bold mb-2">
                    {marketData.sp500.value > 0 ? marketData.sp500.value.toFixed(2) : '---'}
                  </p>
                  <p className={`text-sm font-inter font-semibold mb-4 ${marketData.sp500.change >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                    {marketData.sp500.change >= 0 ? '+' : ''}{marketData.sp500.change.toFixed(1)}%
                  </p>
                </>
              )}
              <p className="text-[#686868] text-xs font-inter leading-relaxed">500 plus grandes sociétés américaines</p>
            </div>

            {/* MSCI World Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#253F60]/20">
              <h3 className="text-[#253F60] text-sm font-cairo font-semibold mb-3 uppercase tracking-wide">MSCI World</h3>
              {marketData.msciWorld.loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                </div>
              ) : (
                <>
                  <p className="text-[#10B981] text-3xl font-cairo font-bold mb-2">
                    {marketData.msciWorld.value > 0 ? marketData.msciWorld.value.toFixed(2) : '---'}
                  </p>
                  <p className={`text-sm font-inter font-semibold mb-4 ${marketData.msciWorld.change >= 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                    {marketData.msciWorld.change >= 0 ? '+' : ''}{marketData.msciWorld.change.toFixed(1)}%
                  </p>
                </>
              )}
              <p className="text-[#686868] text-xs font-inter leading-relaxed">1 500 actions dans 23 pays développés</p>
            </div>

            {/* Rendement moyen Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-[#B99066]/20">
              <h3 className="text-[#253F60] text-sm font-cairo font-semibold mb-3 uppercase tracking-wide">Rendement moyen</h3>
              <p className="text-[#B99066] text-3xl font-cairo font-bold mb-2">{marketData.averageReturn.toFixed(1)}%</p>
              <p className="text-[#686868] text-sm font-inter mb-4">par an</p>
              <p className="text-[#686868] text-xs font-inter leading-relaxed">Performance historique S&P 500</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full bg-white py-8">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveTab("introduction")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "introduction" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Introduction
            </button>
            <button 
              onClick={() => setActiveTab("definition")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "definition" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Qu'est-ce que la Bourse ?
            </button>
            <button 
              onClick={() => setActiveTab("actions")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "actions" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Les actions
            </button>
            <button 
              onClick={() => setActiveTab("indices")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "indices" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Indices boursiers
            </button>
            <button 
              onClick={() => setActiveTab("investir")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "investir" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Comment investir ?
            </button>
            <button 
              onClick={() => setActiveTab("enveloppes")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "enveloppes" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              Enveloppes fiscales
            </button>
            <button 
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "faq" 
                  ? "bg-[#253F60] text-white" 
                  : "bg-gray-100 text-[#686868] hover:bg-gray-200"
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "introduction" && (
            <div className="space-y-12">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Introduction
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  Investir en Bourse attire de plus en plus d'épargnants français. Entre l'<strong>attrait de la performance</strong> (bien supérieure aux livrets ou fonds en euros) et la possibilité de <strong>participer à la croissance des entreprises</strong>, la Bourse est un passage obligé pour diversifier son patrimoine.
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 sm:p-10 shadow-xl border-2 border-[#E5E7EB] overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/5 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#253F60] to-[#1a2d47] rounded-full"></div>
                    <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold">Pourquoi investir en Bourse ?</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className={`group relative rounded-xl p-6 text-white overflow-hidden ${0 % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <h4 className="text-white font-cairo font-bold mb-2 text-lg">Performance supérieure</h4>
                        <p className="text-white/90 text-base leading-relaxed">
                          Rendement historique de 7% par an sur le S&P 500 depuis 50 ans, bien supérieur aux livrets.
                        </p>
                      </div>
                    </div>
                    <div className={`group relative rounded-xl p-6 text-white overflow-hidden ${1 % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                      <div className="relative z-10">
                        <h4 className="text-white font-cairo font-bold mb-2 text-lg">Participation à l'économie réelle</h4>
                        <p className="text-white/90 text-base leading-relaxed">
                          Investir dans la croissance des entreprises et participer à l'économie mondiale.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "definition" && (
            <div className="space-y-12">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-block mb-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
                  Qu'est-ce que la Bourse ?
                </h2>
                <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
                  La <strong>Bourse</strong> est un marché où s'échangent des titres financiers.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { title: "Actions", desc: "Parts de sociétés cotées", index: 0 },
                  { title: "Obligations", desc: "Titres de dette", index: 1 },
                  { title: "ETF et fonds", desc: "Panier de titres", index: 2 },
                  { title: "Produits dérivés", desc: "Options, turbos, warrants (pour investisseurs avertis)", index: 3 }
                ].map((item) => (
                  <div key={item.index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${item.index % 4 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : item.index % 4 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : item.index % 4 === 2 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-xl font-cairo font-bold mb-3">{item.title}</h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">Rôle de la Bourse</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Pour les entreprises</h4>
                    <p className="text-sm">
                      Se financer en émettant des actions
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pour les investisseurs</h4>
                    <p className="text-sm">
                      Placer leur argent dans l'économie réelle
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "actions" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  Les actions : le cœur de la Bourse
            </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto">
                  Une <strong>action</strong> est une part du capital d'une société cotée.
                </p>
          </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-[#112033] text-xl font-semibold mb-6">Détenir une action vous donne :</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div>
                        <h4 className="text-[#112033] font-semibold mb-1">Droit de vote</h4>
                        <p className="text-[#686868] text-sm">En assemblée générale</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div>
                        <h4 className="text-[#112033] font-semibold mb-1">Droit aux dividendes</h4>
                        <p className="text-[#686868] text-sm">Part des bénéfices distribuée aux actionnaires</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div>
                        <h4 className="text-[#112033] font-semibold mb-1">Espérance de plus-value</h4>
                        <p className="text-[#686868] text-sm">Si le cours de l'action augmente</p>
                      </div>
                    </div>
                  </div>
                </div>

            <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-xl font-semibold mb-6">Exemple concret : TotalÉnergies</h3>
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Achat</h4>
                      <p className="text-sm">Vous achetez 100 actions de TotalÉnergies à <strong>60 €</strong></p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Scénario positif</h4>
                      <p className="text-sm">Si le cours monte à <strong>70 €</strong> → Plus-value de <strong>1 000 €</strong></p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Scénario négatif</h4>
                      <p className="text-sm">Si le cours baisse à <strong>50 €</strong> → Perte de <strong>1 000 €</strong></p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm font-semibold">
                      L'action combine <strong>rendement (dividendes)</strong> et <strong>risque (fluctuation du cours)</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "indices" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  Les indices boursiers : CAC 40, S&P 500, MSCI World…
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto">
                  Les <strong>indices boursiers</strong> mesurent la performance d'un groupe d'actions représentatif d'un marché.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">CAC 40</h3>
                    <p className="text-xl font-bold">7,245.69</p>
                  </div>
                  <p className="text-sm mb-4">Les 40 plus grandes entreprises françaises cotées à Paris.</p>
              <ul className="space-y-2 text-sm">
                    <li>• TotalÉnergies</li>
                    <li>• LVMH</li>
                    <li>• Hermès</li>
                    <li>• L'Oréal</li>
              </ul>
            </div>

            <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
              <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">S&P 500</h3>
                    <p className="text-xl font-bold">4,783.35</p>
                  </div>
                  <p className="text-sm mb-4">Les 500 plus grandes sociétés américaines.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Apple</li>
                    <li>• Microsoft</li>
                    <li>• Amazon</li>
                    <li>• Tesla</li>
                  </ul>
                </div>
                
                <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">MSCI World</h3>
                    <p className="text-xl font-bold">2,156.78</p>
                  </div>
                  <p className="text-sm mb-4">Environ 1 500 actions dans 23 pays développés.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Diversification mondiale</li>
                    <li>• Pays développés</li>
                    <li>• Large capitalisation</li>
                    <li>• Référence internationale</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-lg p-8 text-center">
                <h3 className="text-[#112033] text-xl font-semibold mb-4">Rôle des indices</h3>
                <p className="text-[#686868] text-lg">
                  Un indice est un <strong>thermomètre</strong> du marché. Il permet de suivre l'évolution de la Bourse sans s'attarder sur chaque titre.
                </p>
              </div>
            </div>
          )}

          {activeTab === "investir" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  Comment investir en Bourse ?
                </h2>
                <p className="text-[#686868] text-lg max-w-4xl mx-auto">
                  Il existe plusieurs façons d'investir en Bourse selon votre profil et vos objectifs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">En direct</h3>
                  </div>
                  <p className="text-sm mb-4">Achat d'actions individuelles via un PEA ou CTO.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Plus risqué</li>
                    <li>• Nécessite du temps</li>
                    <li>• Demande des connaissances</li>
                    <li>• Sélection manuelle</li>
                  </ul>
                </div>
                
                <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Via des fonds / ETF</h3>
                  </div>
                  <p className="text-sm mb-4">Un ETF réplique la performance d'un indice (ex. CAC 40, S&P 500).</p>
              <ul className="space-y-2 text-sm">
                    <li>• <strong>Diversification automatique</strong></li>
                    <li>• Coûts réduits</li>
                    <li>• Simplicité</li>
                    <li>• Exemple : ETF MSCI World = 1 500 actions mondiales</li>
              </ul>
            </div>

            <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
              <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Produits structurés</h3>
                  </div>
                  <p className="text-sm mb-4">Combinent actions et protection partielle du capital.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Réservés aux investisseurs accompagnés</li>
                    <li>• Protection du capital</li>
                    <li>• Exposition aux marchés</li>
                    <li>• Complexité technique</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "enveloppes" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  PEA, CTO ou Assurance-vie : quelle enveloppe pour investir en Bourse ?
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#253F60]">
                  <h3 className="text-[#112033] text-xl font-semibold mb-4">PEA</h3>
                  <p className="text-[#686868] mb-4">Enveloppe fiscale française, idéale pour investir en actions européennes et ETF éligibles.</p>
                  <ul className="space-y-2 text-sm text-[#686868]">
                    <li>• Exonération d'impôt après 5 ans</li>
                    <li>• Limité aux actions européennes</li>
                    <li>• Plafond : 150 000 €</li>
                    <li>• Prélèvements sociaux : 17,2%</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#B99066]">
                  <h3 className="text-[#112033] text-xl font-semibold mb-4">CTO</h3>
                  <p className="text-[#686868] mb-4">Accès illimité à toutes les places boursières (US, Asie…), mais fiscalité plus lourde.</p>
                  <ul className="space-y-2 text-sm text-[#686868]">
                    <li>• Accès mondial</li>
                    <li>• Pas de plafond</li>
                    <li>• PFU : 30%</li>
                    <li>• Flexibilité totale</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#253F60]">
                  <h3 className="text-[#112033] text-xl font-semibold mb-4">Assurance-vie</h3>
                  <p className="text-[#686868] mb-4">Permet d'investir en ETF ou OPCVM tout en optimisant la fiscalité et la transmission.</p>
                  <ul className="space-y-2 text-sm text-[#686868]">
                    <li>• Fiscalité douce après 8 ans</li>
                    <li>• Abattement : 4 600 €/9 200 €</li>
                    <li>• Transmission optimisée</li>
                    <li>• Diversification</li>
              </ul>
                </div>
              </div>

              <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">Le choix dépend de vos objectifs :</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">PEA</h4>
                    <p className="text-sm">Long terme fiscalement optimisé</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">CTO</h4>
                    <p className="text-sm">Flexibilité totale</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Assurance-vie</h4>
                    <p className="text-sm">Retraite et transmission</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
                  FAQ – Investir en Bourse
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#253F60]">
                  <h3 className="text-[#112033] text-lg font-semibold mb-3">1. Comment débuter en Bourse avec 1 000 € ?</h3>
                  <p className="text-[#686868] mb-2">
                    Oui, il est possible de commencer en Bourse avec <strong>1 000 €</strong>.
                  </p>
                  <p className="text-[#686868] text-sm">
                    L'idéal est de privilégier un <strong>ETF (fonds indiciel)</strong>, par exemple un ETF qui réplique le <strong>CAC 40</strong> ou le <strong>MSCI World</strong>, afin d'obtenir une <strong>diversification immédiate</strong> sans devoir acheter plusieurs actions individuellement.
                  </p>
                  <div className="mt-3 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-3 rounded-r-lg">
                    <p className="text-[#112033] text-sm">
                      Avec un PEA ou une assurance-vie, vous pouvez loger cet investissement dans un cadre fiscal optimisé.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#B99066]">
                  <h3 className="text-[#112033] text-lg font-semibold mb-3">2. Le CAC 40 est-il un bon placement ?</h3>
                  <p className="text-[#686868] mb-2">
                    Le <strong>CAC 40</strong> est l'indice phare de la Bourse de Paris, composé des 40 plus grandes entreprises françaises.
                  </p>
                  <p className="text-[#686868] text-sm">
                    Investir dans le CAC 40 via un <strong>ETF CAC 40</strong> permet de miser sur l'économie française, mais la diversification reste limitée.
                  </p>
                  <div className="mt-3 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#B99066] p-3 rounded-r-lg">
                    <p className="text-[#112033] text-sm">
                      Pour équilibrer votre portefeuille, il est conseillé de compléter avec des indices mondiaux (S&P 500, MSCI World).
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#253F60]">
                  <h3 className="text-[#112033] text-lg font-semibold mb-3">3. Quelle est la différence entre un PEA et un CTO ?</h3>
                  <div className="space-y-2 text-[#686868] text-sm">
                    <p>• <strong>PEA</strong> : enveloppe fiscale française, très avantageuse après 5 ans, mais limitée aux actions et ETF européens.</p>
                    <p>• <strong>CTO</strong> : accès illimité à toutes les places boursières (USA, Asie, marchés émergents), mais fiscalité plus lourde (PFU 30 %).</p>
                  </div>
                  <div className="mt-3 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-3 rounded-r-lg">
                    <p className="text-[#112033] text-sm">
                      Le PEA est idéal pour le long terme, le CTO pour diversifier sans contrainte géographique.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#253F60]">
                  <h3 className="text-[#112033] text-lg font-semibold mb-3">4. Peut-on perdre tout son argent en Bourse ?</h3>
                  <p className="text-[#686868] mb-2">
                    La Bourse comporte un <strong>risque de perte en capital</strong>.
                  </p>
                  <div className="space-y-2 text-[#686868] text-sm">
                    <p>• Si vous investissez dans une seule action, oui, vous pouvez perdre beaucoup si l'entreprise fait faillite.</p>
                    <p>• Mais en investissant via des <strong>ETF diversifiés</strong>, le risque de perte totale est extrêmement faible.</p>
                  </div>
                  <div className="mt-3 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-3 rounded-r-lg">
                    <p className="text-[#112033] text-sm">
                      Le secret : investir <strong>progressivement</strong> et <strong>diversifier</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#B99066]">
                  <h3 className="text-[#112033] text-lg font-semibold mb-3">5. Quelle fiscalité sur les gains en Bourse ?</h3>
                  <div className="space-y-2 text-[#686868] text-sm">
                    <p>• <strong>CTO</strong> : gains taxés au <strong>PFU (30 %)</strong> ou au barème progressif.</p>
                    <p>• <strong>PEA</strong> : exonération d'impôt après 5 ans (hors prélèvements sociaux de 17,2 %).</p>
                    <p>• <strong>Assurance-vie</strong> : fiscalité douce après 8 ans avec abattement annuel (4 600 €/9 200 €).</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#253F60]">
                  <h3 className="text-[#112033] text-lg font-semibold mb-3">6. Faut-il investir en actions ou en ETF ?</h3>
                  <div className="space-y-2 text-[#686868] text-sm">
                    <p>• <strong>Actions individuelles</strong> : plus risquées, demandent du temps et des connaissances.</p>
                    <p>• <strong>ETF</strong> : fonds indiciels qui répliquent un indice (CAC 40, S&P 500, MSCI World), simples, peu chers, diversifiés.</p>
                  </div>
                  <div className="mt-3 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-3 rounded-r-lg">
                    <p className="text-[#112033] text-sm">
                      Pour un débutant, les <strong>ETF sont la meilleure porte d'entrée</strong> en Bourse.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#253F60]">
                  <h3 className="text-[#112033] text-lg font-semibold mb-3">7. Combien de temps faut-il investir en Bourse ?</h3>
                  <p className="text-[#686868] mb-2">
                    La Bourse est un <strong>placement long terme</strong>.
                  </p>
                  <div className="space-y-2 text-[#686868] text-sm">
                    <p>• À court terme (1-2 ans), les marchés peuvent être très volatils.</p>
                    <p>• Sur 10 ans ou plus, l'histoire montre que la Bourse offre en moyenne <strong>6-8 % de rendement annuel</strong>.</p>
                  </div>
                  <div className="mt-3 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-3 rounded-r-lg">
                    <p className="text-[#112033] text-sm">
                      Plus l'horizon est long, plus le risque est réduit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#253F60] rounded-lg shadow-lg p-8 text-white text-center">
                <p className="text-lg font-semibold">
                  Chez <strong>Azalée Patrimoine</strong>, nous accompagnons les épargnants débutants comme les investisseurs confirmés pour construire une stratégie boursière adaptée à leurs objectifs de <strong>performance, fiscalité et transmission</strong>.
                </p>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Avantages et Inconvénients Section */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Avantages */}
            <div>
              <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-8">
                Avantages de la Bourse
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Rendement historique supérieur</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Sur longue durée, la Bourse bat largement les livrets et l'immobilier (moyenne de <strong>7 %/an sur le S&P 500 depuis 50 ans</strong>).
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
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Liquidité</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Vous pouvez acheter/vendre vos titres rapidement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Diversification</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Accès à tous les secteurs et pays.
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
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Accessibilité</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Via un PEA, un CTO ou une assurance-vie en unités de compte.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inconvénients */}
            <div>
              <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-8">
                Inconvénients et risques
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Volatilité</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Les cours peuvent fortement fluctuer à court terme.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Risque de perte en capital</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Investir en actions n'est jamais garanti.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Effet psychologique</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Les débutants paniquent souvent en cas de baisse, et vendent au mauvais moment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#112033] font-semibold mb-2 text-lg">Fiscalité</h3>
                    <p className="text-[#686868] text-sm leading-relaxed">
                      Hors PEA/assurance-vie, les gains sont taxés au <strong>PFU de 30 %</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approche Azalée Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[#112033] text-2xl sm:text-3xl font-cairo font-semibold mb-6">
              La Bourse et la stratégie patrimoniale
            </h2>
            <p className="text-[#686868] text-lg max-w-4xl mx-auto">
              Chez <strong>Azalée Patrimoine</strong>, nous voyons la Bourse non pas comme un <strong>casino</strong>, mais comme un <strong>levier de construction patrimoniale</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 text-white group hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Allocation personnalisée</h3>
              </div>
              <p className="text-sm mb-4 leading-relaxed">Selon votre profil (prudent, équilibré, dynamique).</p>
            </div>

            <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl shadow-lg p-8 text-white group hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Intégration patrimoniale</h3>
              </div>
              <p className="text-sm mb-4 leading-relaxed">Avec vos autres actifs (immobilier, épargne retraite, SCPI).</p>
            </div>

            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl shadow-lg p-8 text-white group hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-10 h-10 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Simulations sur mesure</h3>
              </div>
              <p className="text-sm mb-4 leading-relaxed">De vos revenus futurs en intégrant Bourse + immobilier + retraite.</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-xl p-8 text-white text-center border-2 border-[#B99066]/30">
            <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Objectif</h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              Transformer la Bourse en un <strong>outil durable de croissance</strong>, adapté à votre horizon de vie et à vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            En résumé
          </h2>
          <div className="text-white text-lg mb-8 max-w-4xl mx-auto space-y-4">
            <p>
              La <strong>Bourse</strong> permet d'investir dans l'économie réelle à travers actions, indices et ETF.
            </p>
            <p>
              Elle offre un <strong>rendement élevé sur le long terme</strong>, mais implique une <strong>volatilité</strong> et un <strong>risque de perte en capital</strong>.
            </p>
            <p>
              Bien utilisée, elle constitue un <strong>pilier d'une stratégie patrimoniale équilibrée</strong>.
            </p>
            <p className="text-xl font-semibold">
              Chez <strong>Azalée Patrimoine</strong>, nous aidons nos clients à :
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-8 group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-[#112033]">Démarrer sereinement</h3>
              <p className="text-base text-center leading-relaxed text-[#686868] font-medium">en Bourse</p>
            </div>
            <div className="bg-white rounded-xl p-8 group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-[#112033]">Choisir la bonne enveloppe</h3>
              <p className="text-base text-center leading-relaxed text-[#686868] font-medium">(PEA, CTO, Assurance-vie)</p>
            </div>
            <div className="bg-white rounded-xl p-8 group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20">
              <div className="w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-[#112033]">Construire une stratégie</h3>
              <p className="text-base text-center leading-relaxed text-[#686868] font-medium">intégrant retraite, transmission et diversification</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-[#B99066] text-white px-8 py-4 rounded-lg shadow-lg font-cairo font-semibold text-lg hover:bg-[#A67C52] transition-colors duration-200"
            >
              Démarrer mon investissement
            </button>
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-cairo font-semibold text-lg hover:bg-white hover:text-[#253F60] transition-colors duration-200"
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