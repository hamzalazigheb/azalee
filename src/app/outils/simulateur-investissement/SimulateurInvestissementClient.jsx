"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../../components/common/Header';

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatPercentage = (value) => {
  return `${typeof value === 'number' && !isNaN(value) ? value.toFixed(2) : '0.00'}%`;
};

const calculateInvestmentGrowth = (initialAmount, monthlyContribution, annualReturn, years) => {
  const monthlyReturn = annualReturn / 12 / 100;
  const totalMonths = years * 12;
  
  let totalAmount = initialAmount;
  const monthlyData = [];
  
  for (let month = 1; month <= totalMonths; month++) {
    totalAmount = (totalAmount + monthlyContribution) * (1 + monthlyReturn);
    if (month % 12 === 0) {
      monthlyData.push({
        year: month / 12,
        amount: totalAmount,
        totalInvested: initialAmount + (monthlyContribution * month),
        growth: totalAmount - (initialAmount + (monthlyContribution * month))
      });
    }
  }
  
  return {
    finalAmount: totalAmount,
    totalInvested: initialAmount + (monthlyContribution * totalMonths),
    totalGrowth: totalAmount - (initialAmount + (monthlyContribution * totalMonths)),
    annualData: monthlyData
  };
};

export default function SimulateurInvestissementClient({ content }) {
  const [formData, setFormData] = useState({
    montantInitial: 10000,
    versementMensuel: 500,
    rendementAnnuel: 7,
    duree: 20
  });

  const [results, setResults] = useState(null);
  const [cmsContent, setCmsContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  // Load CMS content from database
  useEffect(() => {
    const loadCmsContent = async () => {
      try {
        const response = await fetch(`/api/pages/content?path=/outils/simulateur-investissement&type=cms`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.content) {
            setCmsContent(JSON.parse(data.content.content));
          }
        }
      } catch (error) {
        console.log('No CMS content found, using defaults');
      } finally {
        setIsLoading(false);
      }
    };

    loadCmsContent();
  }, []);

  // Default content if CMS content is not available
  const pageContent = cmsContent || {
    hero: {
      title: "Simulateur d'Investissement",
      subtitle: "Planifiez votre avenir financier avec précision",
      description: "Outil professionnel de simulation d'investissement pour optimiser votre stratégie de placement et maximiser votre patrimoine."
    },
    interface: {
      titrePrincipal: "Simulation d'Investissement",
      sousTitre: "Analysez la croissance de vos placements sur le long terme",
      boutonCalculer: "Lancer la simulation",
      boutonReset: "Réinitialiser"
    },
    champsSaisie: [
      {
        id: "montantInitial",
        label: "Capital initial",
        type: "number",
        placeholder: "10000",
        unite: "€",
        description: "Montant de départ de votre investissement"
      },
      {
        id: "versementMensuel",
        label: "Versement mensuel",
        type: "number",
        placeholder: "500",
        unite: "€",
        description: "Montant investi chaque mois"
      },
      {
        id: "rendementAnnuel",
        label: "Rendement annuel",
        type: "number",
        placeholder: "7",
        unite: "%",
        description: "Taux de rendement annuel moyen"
      },
      {
        id: "duree",
        label: "Durée d'investissement",
        type: "number",
        placeholder: "20",
        unite: "ans",
        description: "Période de placement en années"
      }
    ],
    resultats: {
      titre: "Analyse de votre simulation",
      description: "Résultats détaillés de votre stratégie d'investissement",
      sections: {
        montantFinal: "Capital final",
        totalInvesti: "Total investi",
        plusValue: "Plus-value générée",
        rendementTotal: "Performance globale"
      }
    },
    informations: {
      titre: "Informations et recommandations",
      contenu: [
        "Cette simulation utilise un modèle de rendement constant sur la période",
        "Les résultats ne prennent pas en compte l'inflation et la volatilité des marchés",
        "Les frais de gestion et la fiscalité ne sont pas inclus dans le calcul",
        "Consultez un conseiller financier pour une analyse personnalisée"
      ]
    }
  };

  const handleCalculate = () => {
    const results = calculateInvestmentGrowth(
      formData.montantInitial,
      formData.versementMensuel,
      formData.rendementAnnuel,
      formData.duree
    );
    setResults(results);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#253F60] border-t-transparent mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Chargement de l'outil de simulation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Professional Hero Section */}
      <section className="relative bg-gradient-to-r from-[#253F60] to-[#B99066] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066] rounded-full opacity-10 transform translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b99066] rounded-full opacity-10 transform -translate-x-32 translate-y-32"></div>
        
        <div className="relative max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#B99066] rounded-full mr-2"></span>
              Outil professionnel
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {pageContent.hero.title}
            </h1>
            <p className="text-2xl font-light mb-8 text-gray-100">
              {pageContent.hero.subtitle}
            </p>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
              {pageContent.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="py-20 -mt-10">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-2xl mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-4xl font-cairo font-semibold text-[#253F60] mb-4">
                {pageContent.interface.titrePrincipal}
              </h2>
              <p className="text-xl text-[#686868] max-w-2xl mx-auto">
                {pageContent.interface.sousTitre}
              </p>
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                {pageContent.champsSaisie.slice(0, 2).map((champ) => (
                  <div key={champ.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      {champ.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData[champ.id]}
                        onChange={(e) => handleInputChange(champ.id, Number(e.target.value))}
                        className="w-full px-4 py-4 pr-16 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-[#253F60] focus:ring-opacity-20 focus:border-[#253F60] transition-all duration-200 text-lg font-medium"
                        placeholder={champ.placeholder}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        {champ.unite}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {champ.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                {pageContent.champsSaisie.slice(2, 4).map((champ) => (
                  <div key={champ.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      {champ.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData[champ.id]}
                        onChange={(e) => handleInputChange(champ.id, Number(e.target.value))}
                        className="w-full px-4 py-4 pr-16 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-[#253F60] focus:ring-opacity-20 focus:border-[#253F60] transition-all duration-200 text-lg font-medium"
                        placeholder={champ.placeholder}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        {champ.unite}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {champ.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleCalculate}
                className="px-10 py-4 bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white font-inter font-semibold rounded-xl hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                {pageContent.interface.boutonCalculer}
              </button>
              <button
                onClick={() => {
                  setIsResetting(true);
                  setTimeout(() => {
                    setFormData({
                      montantInitial: 10000,
                      versementMensuel: 500,
                      rendementAnnuel: 7,
                      duree: 20
                    });
                    setResults(null);
                    setIsResetting(false);
                  }, 400);
                }}
                disabled={isResetting}
                className={`px-10 py-4 border-2 border-[#253F60] font-inter font-semibold rounded-xl transition-all duration-300 text-lg ${
                  isResetting 
                    ? 'bg-[#253F60] text-white cursor-wait animate-pulse' 
                    : 'text-[#253F60] hover:bg-[#253F60] hover:text-white active:scale-95'
                }`}
              >
                {isResetting ? 'Réinitialisation...' : pageContent.interface.boutonReset}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="py-20">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-cairo font-semibold text-[#253F60] mb-4">
                {pageContent.resultats.titre}
              </h2>
              <p className="text-xl text-[#686868] max-w-3xl mx-auto">
                {pageContent.resultats.description}
              </p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 border border-[#253F60] shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatCurrency(results.finalAmount)}
                  </div>
                  <div className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                    {pageContent.resultats.sections.montantFinal}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-8 border border-[#B99066] shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatCurrency(results.totalInvested)}
                  </div>
                  <div className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                    {pageContent.resultats.sections.totalInvesti}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 border border-[#253F60] shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatCurrency(results.totalGrowth)}
                  </div>
                  <div className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                    {pageContent.resultats.sections.plusValue}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-8 border border-[#B99066] shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatPercentage((results.totalGrowth / results.totalInvested) * 100)}
                  </div>
                  <div className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                    {pageContent.resultats.sections.rendementTotal}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Investment Timeline */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-cairo font-semibold text-[#253F60] mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg mr-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  Évolution temporelle
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {results.annualData.slice(-8).map((yearData, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#253F60] rounded-full mr-3"></div>
                        <span className="font-semibold text-gray-900">Année {yearData.year}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(yearData.amount)}</div>
                        <div className="text-sm text-green-600 font-medium">
                          +{formatCurrency(yearData.growth)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Summary */}
              <div className="bg-[#253F60] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-cairo font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg mr-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Résumé de l'investissement
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-600">
                    <span className="text-gray-300">Capital initial</span>
                    <span className="font-bold text-xl">{formatCurrency(formData.montantInitial)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-600">
                    <span className="text-gray-300">Versements totaux</span>
                    <span className="font-bold text-xl">{formatCurrency(formData.versementMensuel * 12 * formData.duree)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-600">
                    <span className="text-gray-300">Rendement annuel</span>
                    <span className="font-bold text-xl text-[#B99066]">{formData.rendementAnnuel}%</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-300">Durée</span>
                    <span className="font-bold text-xl">{formData.duree} ans</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-16">
              <h3 className="text-2xl font-cairo font-semibold text-[#253F60] mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-lg mr-3 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                Aperçu de la performance
              </h3>
              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl p-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">{formatPercentage((results.totalGrowth / results.totalInvested) * 100)}</div>
                    <div className="text-sm opacity-90">Rendement total</div>
                  </div>
                  <div className="border-l border-r border-white border-opacity-30">
                    <div className="text-4xl font-bold mb-2">{formatCurrency(results.totalGrowth)}</div>
                    <div className="text-sm opacity-90">Plus-value générée</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">{formatCurrency(results.finalAmount)}</div>
                    <div className="text-sm opacity-90">Capital final</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB]">
              <h3 className="text-2xl font-cairo font-semibold text-[#253F60] mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg mr-3 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {pageContent.informations.titre}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageContent.informations.contenu.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#686868] leading-relaxed">{info}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section après résultats */}
            <div className="bg-gradient-to-br from-[#FEF3E2] to-[#FDE9D0] rounded-2xl p-8 border-2 border-[#B99066] mt-8">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-cairo font-semibold text-[#253F60] mb-4">
                  Optimisez votre stratégie d'investissement
                </h3>
                <p className="text-[#4A5568] mb-6 leading-relaxed">
                  Nos conseillers experts peuvent vous aider à définir la meilleure allocation d'actifs et à maximiser le rendement de vos placements selon votre profil.
                </p>
                <button
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#253F60] text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#1a2d47] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Planifiez votre consultation gratuite
                </button>
                <p className="text-xs text-[#686868] mt-4">
                  30 min - 100% gratuit - Sans engagement
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      
    </div>
  );
}
