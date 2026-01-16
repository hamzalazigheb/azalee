'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';


export default function AssuranceVieVsPerClient({ content }) {
  const [activeTab, setActiveTab] = useState('simulateur');
  const [simulationData, setSimulationData] = useState({
    // Informations personnelles
    ageActuel: 0,
    ageRetraite: 0,
    situationFamiliale: 'celibataire',
    nombreEnfants: 0,
    statutProfessionnel: 'salarie',
    
    // Situation financière
    revenusBruts: 0,
    revenusNets: 0,
    tmiActuelle: 0,
    tmiRetraite: 0,
    epargneActuelle: 0,
    epargneMensuelle: 0,
    
    // Profil d'investissement
    profilRisque: 'equilibre',
    rendementEspere: 0,
    fondsEuros: 0,
    unitesCompte: 0,
    
    // Assurance-vie
    primeInitialeAV: 0,
    valeurActuelleAV: 0,
    totalPrimesAV: 0,
    ancienneteAV: 0,
    
    // PER
    versementsAnnuelPER: 0,
    abondementEmployeur: 0,
    plafondDeduction: 0,
    strategieSortie: 'capital',
    deblocageAnticipe: 'aucun'
  });
  const [resultats, setResultats] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const calculateComparison = () => {
    const { 
      ageActuel, ageRetraite, epargneMensuelle, epargneActuelle, rendementEspere,
      primeInitialeAV, valeurActuelleAV, totalPrimesAV, ancienneteAV,
      versementsAnnuelPER, abondementEmployeur, tmiActuelle, tmiRetraite
    } = simulationData;
    
    const duree = ageRetraite - ageActuel;
    const versementsAnnuelAV = epargneMensuelle * 12;
    
    // Calculs pour Assurance-vie
    const capitalFinalAV = valeurActuelleAV * Math.pow(1 + rendementEspere/100, duree) + 
                          versementsAnnuelAV * ((Math.pow(1 + rendementEspere/100, duree) - 1) / (rendementEspere/100));
    
    // Calculs pour PER
    const capitalFinalPER = versementsAnnuelPER * ((Math.pow(1 + rendementEspere/100, duree) - 1) / (rendementEspere/100));
    
    // Fiscalité différente
    const impotAV = ancienneteAV >= 8 ? capitalFinalAV * 0.075 : capitalFinalAV * 0.30; // 7.5% après 8 ans, sinon 30%
    const impotPER = capitalFinalPER * (tmiRetraite/100); // TMI à la retraite
    
    const netAV = capitalFinalAV - impotAV;
    const netPER = capitalFinalPER - impotPER;
    
    setResultats({
      capitalFinalAV: capitalFinalAV,
      capitalFinalPER: capitalFinalPER,
      impotAV: impotAV,
      impotPER: impotPER,
      netAV: netAV,
      netPER: netPER,
      difference: netAV - netPER,
      duree: duree
    });
  };

  useEffect(() => {
    calculateComparison();
  }, [simulationData]);

    return (
      <div className="min-h-screen bg-gray-50">
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes bounceIn1 {
            0% { transform: translateY(30px); opacity: 0; }
            50% { transform: translateY(-10px); opacity: 0.8; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes bounceIn2 {
            0% { transform: translateY(30px); opacity: 0; }
            25% { transform: translateY(30px); opacity: 0; }
            75% { transform: translateY(-10px); opacity: 0.8; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes bounceIn3 {
            0% { transform: translateY(30px); opacity: 0; }
            50% { transform: translateY(30px); opacity: 0; }
            75% { transform: translateY(-10px); opacity: 0.8; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out;
          }
          .animate-slide-down {
            animation: slideDown 0.6s ease-out;
          }
          .animate-slide-up {
            animation: slideUp 0.6s ease-out 0.2s both;
          }
          .animate-fade-in-delay {
            animation: fadeIn 0.8s ease-out 0.4s both;
          }
          .animate-bounce-in-1 {
            animation: bounceIn1 0.8s ease-out 0.6s both;
          }
          .animate-bounce-in-2 {
            animation: bounceIn2 0.8s ease-out 0.8s both;
          }
          .animate-bounce-in-3 {
            animation: bounceIn3 0.8s ease-out 1s both;
          }
        `}</style>
        <Header />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Assurance-vie vs PER
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Comparez l'efficacité fiscale de l'assurance-vie et du Plan d'Épargne Retraite pour optimiser votre stratégie patrimoniale.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('simulateur')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                activeTab === 'simulateur'
                  ? 'bg-[#253F60] text-white'
                  : 'text-[#253F60] hover:bg-[#253F60]/10'
              }`}
            >
              Simulateur Comparatif
            </button>
            <button
              onClick={() => setActiveTab('avantages')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                activeTab === 'avantages'
                  ? 'bg-[#253F60] text-white'
                  : 'text-[#253F60] hover:bg-[#253F60]/10'
              }`}
            >
              Avantages & Inconvénients
            </button>
            <button
              onClick={() => setActiveTab('strategie')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                activeTab === 'strategie'
                  ? 'bg-[#253F60] text-white'
                  : 'text-[#253F60] hover:bg-[#253F60]/10'
              }`}
            >
              Stratégie Optimale
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Simulateur Tab */}
          {activeTab === 'simulateur' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Input Section */}
              <div className="space-y-4 sm:space-y-6">
                {/* Informations personnelles */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-[#B99066]/50 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#253F60] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-[#112033] text-sm sm:text-base">Informations personnelles</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A5568] mb-3 sm:mb-4">Vos données personnelles pour personnaliser les calculs</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Âge actuel</label>
                      <input
                        type="number"
                        value={simulationData.ageActuel}
                        onChange={(e) => setSimulationData({...simulationData, ageActuel: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Âge de départ à la retraite</label>
                      <input
                        type="number"
                        value={simulationData.ageRetraite}
                        onChange={(e) => setSimulationData({...simulationData, ageRetraite: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Situation financière */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-[#B99066]/50 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#B99066] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-[#112033] text-sm sm:text-base">Situation financière</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A5568] mb-3 sm:mb-4">Vos revenus et épargne actuelle</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Revenus annuels bruts (€)</label>
                      <input
                        type="number"
                        value={simulationData.revenusBruts}
                        onChange={(e) => setSimulationData({...simulationData, revenusBruts: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Épargne mensuelle (€)</label>
                      <input
                        type="number"
                        value={simulationData.epargneMensuelle}
                        onChange={(e) => setSimulationData({...simulationData, epargneMensuelle: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Assurance-vie */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-[#B99066]/50 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#253F60] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-[#112033] text-sm sm:text-base">Assurance-vie</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A5568] mb-3 sm:mb-4">Paramètres de votre contrat d'assurance-vie</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Valeur actuelle du contrat (€)</label>
                      <input
                        type="number"
                        value={simulationData.valeurActuelleAV}
                        onChange={(e) => setSimulationData({...simulationData, valeurActuelleAV: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Ancienneté du contrat (années)</label>
                      <input
                        type="number"
                        value={simulationData.ancienneteAV}
                        onChange={(e) => setSimulationData({...simulationData, ancienneteAV: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Plan d'Épargne Retraite */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-[#B99066]/50 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#B99066] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">4</span>
                    </div>
                    <h4 className="font-semibold text-[#112033] text-sm sm:text-base">Plan d'Épargne Retraite (PER)</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A5568] mb-3 sm:mb-4">Paramètres de votre PER</p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Versements annuels actuels (€)</label>
                      <input
                        type="number"
                        value={simulationData.versementsAnnuelPER}
                        onChange={(e) => setSimulationData({...simulationData, versementsAnnuelPER: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Rendement espéré (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={simulationData.rendementEspere}
                        onChange={(e) => setSimulationData({...simulationData, rendementEspere: Number(e.target.value)})}
                        className="w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#253F60]/20 focus:border-[#253F60] transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    calculateComparison();
                    setShowResults(true);
                    setShowPopup(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:from-[#1E2F4A] hover:to-[#A67A5A] transition-all duration-200 shadow-lg shadow-[#253F60]/30 text-sm sm:text-base"
                >
                  Lancer la comparaison
                </button>
              </div>

              {/* Results Section */}
              <div className="space-y-4 sm:space-y-6">
                {/* Assurance-vie Results */}
                <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 sm:p-6 rounded-2xl text-white">
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Assurance-vie</h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Capital final</span>
                      <span className="font-semibold">{showResults ? resultats.capitalFinalAV?.toLocaleString() + '€' : '***'}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Impôt (7.5%)</span>
                      <span className="font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg border-t border-white/20 pt-2 sm:pt-3">
                      <span>Net après impôt</span>
                      <span className="font-bold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                    </div>
                  </div>
                </div>

                {/* PER Results */}
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] p-4 sm:p-6 rounded-2xl text-white">
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Plan d'Épargne Retraite</h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Capital final</span>
                      <span className="font-semibold">{showResults ? resultats.capitalFinalPER?.toLocaleString() + '€' : '***'}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Impôt (30%)</span>
                      <span className="font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg border-t border-white/20 pt-2 sm:pt-3">
                      <span>Net après impôt</span>
                      <span className="font-bold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                    </div>
                  </div>
                </div>

                {/* Comparison avec CTA fort */}
                <div className="bg-gradient-to-br from-[#FEF3E2] to-[#FDE9D0] p-4 sm:p-6 rounded-2xl shadow-lg border-2 border-[#B99066]">
                  <h4 className="text-lg sm:text-xl font-bold mb-4 text-[#253F60] text-center">Résultat de la comparaison</h4>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#B99066] mb-3">
                      {showResults ? 'Votre simulation est prête' : '***€'}
                    </div>
                    <p className="text-sm sm:text-base text-[#4A5568] mb-5">
                      Obtenez une analyse personnalisée et découvrez quelle solution est la plus adaptée à votre situation.
                    </p>
                    <button
                      onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      className="w-full bg-[#253F60] text-white py-3.5 px-6 rounded-xl font-bold text-base sm:text-lg hover:bg-[#1a2d47] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      Planifiez votre consultation gratuite
                    </button>
                    <p className="text-xs text-[#686868] mt-3">
                      30 min - 100% gratuit - Sans engagement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Avantages Tab */}
          {activeTab === 'avantages' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="text-center px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#112033] mb-3 sm:mb-4">Comparaison détaillée</h2>
                <p className="text-sm sm:text-base text-[#4A5568] max-w-2xl mx-auto">
                  Découvrez les avantages et inconvénients de chaque dispositif pour faire le meilleur choix selon votre situation.
                </p>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Assurance-vie */}
                <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Assurance-vie</h3>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                        Avantages
                      </h4>
                      <ul className="space-y-1 sm:space-y-2 text-white/90 text-sm sm:text-base">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Fiscalité avantageuse après 8 ans (7.5%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Flexibilité des versements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Possibilité de rachat partiel</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Transmission facilitée</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Pas de plafond de versement</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                        Inconvénients
                      </h4>
                      <ul className="space-y-1 sm:space-y-2 text-white/90 text-sm sm:text-base">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Pas de réduction d'impôt immédiate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Frais de gestion variables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#B99066] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Fiscalité moins avantageuse avant 8 ans</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PER */}
                <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Plan d'Épargne Retraite</h3>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                        Avantages
                      </h4>
                      <ul className="space-y-1 sm:space-y-2 text-white/90 text-sm sm:text-base">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Réduction d'impôt immédiate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Plafond de versement (10% des revenus)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Capital garanti à la retraite</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Possibilité de sortie en capital ou rente</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                        Inconvénients
                      </h4>
                      <ul className="space-y-1 sm:space-y-2 text-white/90 text-sm sm:text-base">
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Fiscalité à la sortie (30%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Blocage jusqu'à la retraite</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Pas de rachat partiel possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#253F60] rounded-full mt-2 flex-shrink-0"></span>
                          <span>Plafond de versement limité</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stratégie Tab */}
          {activeTab === 'strategie' && (
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#112033] text-center animate-slide-down">Stratégie optimale</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 sm:p-6 rounded-lg text-white animate-slide-up">
                    <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 animate-pulse">🎯 PER ou assurance-vie ? Les deux !</h4>
                    <p className="text-sm sm:text-base text-white/90 animate-fade-in-delay">
                      Optimisez votre épargne retraite en combinant PER (réduction d'impôt jusqu'à 45%) et assurance-vie (disponibilité + transmission optimisée). 
                      Découvrez la stratégie adaptée à votre tranche d'imposition pour maximiser vos avantages fiscaux dès maintenant.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-[#253F60] hover:to-[#B99066] hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-lg animate-bounce-in-1">
                      <div className="text-xl sm:text-2xl font-bold text-[#253F60] mb-2 hover:text-white transition-colors duration-300">1</div>
                      <h5 className="font-semibold mb-2 text-sm sm:text-base">Maximiser le PER</h5>
                      <p className="text-xs sm:text-sm text-[#4A5568] hover:text-white/90 transition-colors duration-300">Versez le maximum au PER pour bénéficier de la réduction d'impôt</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-[#B99066] hover:to-[#A67A5A] hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-lg animate-bounce-in-2">
                      <div className="text-xl sm:text-2xl font-bold text-[#253F60] mb-2 hover:text-white transition-colors duration-300">2</div>
                      <h5 className="font-semibold mb-2 text-sm sm:text-base">Compléter en AV</h5>
                      <p className="text-xs sm:text-sm text-[#4A5568] hover:text-white/90 transition-colors duration-300">Placez le surplus en assurance-vie pour la flexibilité</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-[#253F60] hover:to-[#B99066] hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-lg animate-bounce-in-3">
                      <div className="text-xl sm:text-2xl font-bold text-[#253F60] mb-2 hover:text-white transition-colors duration-300">3</div>
                      <h5 className="font-semibold mb-2 text-sm sm:text-base">Optimiser la sortie</h5>
                      <p className="text-xs sm:text-sm text-[#4A5568] hover:text-white/90 transition-colors duration-300">Planifiez la sortie du PER en capital ou rente selon vos besoins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Besoin d'un conseil personnalisé ?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Nos experts vous accompagnent pour choisir la stratégie la plus adaptée à votre situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="https://calendly.com/azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#253F60] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Planifiez votre consultation gratuite
            </a>
            <a
              href="mailto:contact@azalee-patrimoine.fr"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#253F60] transition-colors text-sm sm:text-base"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* Popup Modal avec CTA engageant */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl animate-slide-up">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#253F60] mb-3">
                Votre simulation est prête !
              </h3>
              <p className="text-sm sm:text-base text-[#4A5568] mb-6 leading-relaxed">
                Nos experts peuvent maintenant vous accompagner pour <strong>optimiser votre stratégie d'épargne</strong> et choisir la meilleure solution entre Assurance-vie et PER.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
                    setShowPopup(false);
                  }}
                  className="w-full bg-[#253F60] text-white py-4 px-6 rounded-xl font-bold text-base sm:text-lg hover:bg-[#1a2d47] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Planifiez votre consultation gratuite
                </button>
                <p className="text-xs text-[#686868]">
                  30 min - 100% gratuit - Sans engagement
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full text-[#4A5568] py-2 font-medium hover:text-[#253F60] transition-colors duration-200 text-sm"
                >
                  Voir mes résultats d'abord
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
