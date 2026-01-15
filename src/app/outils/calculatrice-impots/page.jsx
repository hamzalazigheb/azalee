"use client";
import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

export default function CalculatriceImpotsPage() {
  const [activeTab, setActiveTab] = useState('revenus');
  const [revenus, setRevenus] = useState({
    salaires: '',
    pensions: '',
    fonciers: '',
    capitaux: ''
  });
  const [charges, setCharges] = useState({
    per: '',
    pensionsAlimentaires: '',
    csg: '',
    fraisAccueil: ''
  });
  const [reductions, setReductions] = useState({
    dons: '',
    investissements: ''
  });
  const [patrimoine, setPatrimoine] = useState({
    biensImmo: '',
    partsSCI: '',
    partsSCPI: '',
    partsOPCI: '',
    usufruits: '',
    dettes: ''
  });
  const [partsFiscales, setPartsFiscales] = useState(1);
  const [resultats, setResultats] = useState({
    revenuBrut: 0,
    quotientFamilial: 0,
    impotIR: 0,
    tauxEffectif: 0,
    patrimoineNet: 0,
    ifi: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Helper function to handle number input and replace zero
  const handleNumberChange = (value, setter, state, key) => {
    // If the field is empty or the value is empty, allow it
    if (value === '') {
      setter({ ...state, [key]: '' });
      return;
    }
    
    // Remove leading zeros (except if the value is just "0")
    let cleanValue = value;
    if (cleanValue.startsWith('0') && cleanValue.length > 1 && cleanValue !== '0') {
      cleanValue = cleanValue.replace(/^0+/, '') || '0';
    }
    
    const numValue = Number(cleanValue);
    if (!isNaN(numValue) && numValue >= 0) {
      setter({ ...state, [key]: numValue });
    }
  };

  const calculateTax = () => {
    const revenuBrut = Object.values(revenus).reduce((sum, val) => sum + (val || 0), 0);
    const totalCharges = Object.values(charges).reduce((sum, val) => sum + (val || 0), 0);
    const totalReductions = Object.values(reductions).reduce((sum, val) => sum + (val || 0), 0);
    const revenuNet = revenuBrut - totalCharges;
    const quotientFamilial = revenuNet / partsFiscales;
    
    let impotIR = 0;
    if (quotientFamilial > 180294) {
      impotIR = (quotientFamilial - 180294) * 0.45 + (180294 - 83824) * 0.41 + (83824 - 29316) * 0.30 + (29316 - 11498) * 0.11;
    } else if (quotientFamilial > 83824) {
      impotIR = (quotientFamilial - 83824) * 0.41 + (83824 - 29316) * 0.30 + (29316 - 11498) * 0.11;
    } else if (quotientFamilial > 29316) {
      impotIR = (quotientFamilial - 29316) * 0.30 + (29316 - 11498) * 0.11;
    } else if (quotientFamilial > 11498) {
      impotIR = (quotientFamilial - 11498) * 0.11;
    }
    
    const impotFinal = Math.max(0, (impotIR * partsFiscales) - totalReductions);
    const tauxEffectif = revenuBrut > 0 ? (impotFinal / revenuBrut) * 100 : 0;
    
    // Calcul IFI
    const patrimoineBrut = Object.values(patrimoine).reduce((sum, val) => sum + (val || 0), 0);
    const patrimoineNet = patrimoineBrut - (patrimoine.dettes || 0);
    let ifi = 0;
    
    if (patrimoineNet > 1300000) {
      const base = patrimoineNet - 1300000;
      if (base <= 800000) {
        ifi = base * 0.005;
      } else if (base <= 1700000) {
        ifi = 800000 * 0.005 + (base - 800000) * 0.007;
      } else {
        ifi = 800000 * 0.005 + 900000 * 0.007 + (base - 1700000) * 0.015;
      }
    }
    
    setResultats({
      revenuBrut,
      quotientFamilial,
      impotIR: impotFinal,
      tauxEffectif,
      patrimoineNet,
      ifi
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Advanced Financial Calculations Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8 sm:mb-12">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#253F60] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-[#112033] text-sm sm:text-base">Simulation Plus-values</h4>
                </div>
                <p className="text-[#4A5568] text-xs sm:text-sm leading-relaxed">
                  Calculez précisément vos plus-values sur tous vos supports d'investissement avec prise en compte des frais et de la fiscalité.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#B99066] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-[#112033] text-sm sm:text-base">Comparaison Enveloppes</h4>
                </div>
                <p className="text-[#4A5568] text-xs sm:text-sm leading-relaxed">
                  Comparez l'efficacité fiscale de vos différents placements : assurance-vie, PER, PEA, CTO, etc.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#253F60] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm sm:text-lg font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-[#112033] text-sm sm:text-base">Aide à la Décision</h4>
                </div>
                <p className="text-[#4A5568] text-xs sm:text-sm leading-relaxed">
                  Obtenez des recommandations personnalisées pour optimiser votre stratégie fiscale et patrimoniale.
                </p>
              </div>
            </div>
          </div>

          {/* Simulateur Fiscal Personnalisé */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#112033] text-center">Simulateur Fiscal Azalée Patrimoine</h3>
              <p className="text-sm sm:text-base lg:text-lg text-[#4A5568] mb-6 sm:mb-8 max-w-2xl mx-auto text-center">
                Calculez précisément vos impôts et optimisez votre stratégie fiscale.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Input Section */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Tabs */}
                  <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setActiveTab('revenus')}
                      className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                        activeTab === 'revenus'
                          ? 'bg-[#253F60] text-white'
                          : 'text-[#4A5568] hover:text-[#253F60]'
                      }`}
                    >
                      Revenus
                    </button>
                    <button
                      onClick={() => setActiveTab('charges')}
                      className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                        activeTab === 'charges'
                          ? 'bg-[#253F60] text-white'
                          : 'text-[#4A5568] hover:text-[#253F60]'
                      }`}
                    >
                      Charges & Réductions
                    </button>
                    <button
                      onClick={() => setActiveTab('famille')}
                      className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                        activeTab === 'famille'
                          ? 'bg-[#253F60] text-white'
                          : 'text-[#4A5568] hover:text-[#253F60]'
                      }`}
                    >
                      Famille
                    </button>
                    <button
                      onClick={() => setActiveTab('patrimoine')}
                      className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                        activeTab === 'patrimoine'
                          ? 'bg-[#253F60] text-white'
                          : 'text-[#4A5568] hover:text-[#253F60]'
                      }`}
                    >
                      Patrimoine
                    </button>
                  </div>

                  {/* Revenus Tab */}
                  {activeTab === 'revenus' && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-[#112033] mb-3">Salaires</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-[#4A5568] mb-1">Montant brut annuel (€)</label>
                            <input
                              type="number"
                              value={revenus.salaires}
                              onChange={(e) => handleNumberChange(e.target.value, setRevenus, revenus, 'salaires')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60]"
                              placeholder="Ex: 45000"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-[#112033] mb-3">Pensions</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-[#4A5568] mb-1">Montant annuel (€)</label>
                            <input
                              type="number"
                              value={revenus.pensions}
                              onChange={(e) => handleNumberChange(e.target.value, setRevenus, revenus, 'pensions')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60]"
                              placeholder="Ex: 25000"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-[#112033] mb-3">Revenus fonciers</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-[#4A5568] mb-1">Loyers perçus (€)</label>
                            <input
                              type="number"
                              value={revenus.fonciers}
                              onChange={(e) => handleNumberChange(e.target.value, setRevenus, revenus, 'fonciers')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60]"
                              placeholder="Ex: 12000"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-[#112033] mb-3">Revenus de capitaux mobiliers</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-[#4A5568] mb-1">Montant annuel (€)</label>
                            <input
                              type="number"
                              value={revenus.capitaux}
                              onChange={(e) => handleNumberChange(e.target.value, setRevenus, revenus, 'capitaux')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60]"
                              placeholder="Ex: 5000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Charges & Réductions Tab */}
                  {activeTab === 'charges' && (
                    <div className="space-y-4">
                      {/* Charges déductibles */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3 text-white">Charges déductibles du revenu global</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Versements PER/PERP/PREFON (€)</label>
                            <input
                              type="number"
                              value={charges.per}
                              onChange={(e) => handleNumberChange(e.target.value, setCharges, charges, 'per')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 5000"
                            />
                            <p className="text-xs text-white/80 mt-1">Plafond 2025: 10% des revenus ou 4626€</p>
                          </div>
                          <div>
                            <label className="block text-sm text-white mb-1">Pensions alimentaires versées (€)</label>
                            <input
                              type="number"
                              value={charges.pensionsAlimentaires}
                              onChange={(e) => handleNumberChange(e.target.value, setCharges, charges, 'pensionsAlimentaires')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 5000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white mb-1">CSG déductible (€)</label>
                            <input
                              type="number"
                              value={charges.csg}
                              onChange={(e) => handleNumberChange(e.target.value, setCharges, charges, 'csg')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 1000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white mb-1">Frais d'accueil personne âgée (€)</label>
                            <input
                              type="number"
                              value={charges.fraisAccueil}
                              onChange={(e) => handleNumberChange(e.target.value, setCharges, charges, 'fraisAccueil')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 3000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Réductions d'impôt */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3 text-white">Réductions d'impôt</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Dons aux œuvres (€)</label>
                            <input
                              type="number"
                              value={reductions.dons}
                              onChange={(e) => handleNumberChange(e.target.value, setReductions, reductions, 'dons')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 500"
                            />
                            <p className="text-xs text-white/80 mt-1">Réduction de 66% sur les dons aux partis politiques et associations cultuelles</p>
                          </div>
                          <div>
                            <label className="block text-sm text-white mb-1">Investissements défiscalisants (€)</label>
                            <input
                              type="number"
                              value={reductions.investissements}
                              onChange={(e) => handleNumberChange(e.target.value, setReductions, reductions, 'investissements')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 2000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Patrimoine Tab */}
                  {activeTab === 'patrimoine' && (
                    <div className="space-y-4">
                      {/* IFI Info */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-[#112033] mb-3">Impôt sur la Fortune Immobilière (IFI)</h4>
                        <p className="text-sm text-[#4A5568]">
                          L'IFI s'applique si votre patrimoine immobilier net dépasse 1,3 M€ au 1er janvier 2025. 
                          Barème progressif de 0,5% à 1,5% selon les tranches.
                        </p>
                      </div>

                      {/* Biens immobiliers */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3 text-white">Biens immobiliers détenus en direct</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Valeur des biens (€)</label>
                            <input
                              type="number"
                              value={patrimoine.biensImmo}
                              onChange={(e) => handleNumberChange(e.target.value, setPatrimoine, patrimoine, 'biensImmo')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 800000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Parts de SCI */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3">Parts de SCI</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Valeur des parts (€)</label>
                            <input
                              type="number"
                              value={patrimoine.partsSCI}
                              onChange={(e) => handleNumberChange(e.target.value, setPatrimoine, patrimoine, 'partsSCI')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 200000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Parts de SCPI */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3">Parts de SCPI</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Valeur des parts (€)</label>
                            <input
                              type="number"
                              value={patrimoine.partsSCPI}
                              onChange={(e) => handleNumberChange(e.target.value, setPatrimoine, patrimoine, 'partsSCPI')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 150000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Parts d'OPCI */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3">Parts d'OPCI</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Valeur des parts (€)</label>
                            <input
                              type="number"
                              value={patrimoine.partsOPCI}
                              onChange={(e) => handleNumberChange(e.target.value, setPatrimoine, patrimoine, 'partsOPCI')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 100000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Usufruits immobiliers */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3">Usufruits immobiliers</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Valeur en pleine propriété (€)</label>
                            <input
                              type="number"
                              value={patrimoine.usufruits}
                              onChange={(e) => handleNumberChange(e.target.value, setPatrimoine, patrimoine, 'usufruits')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 300000"
                            />
                          </div>
                          <p className="text-xs text-white/80">L'usufruitier déclare la valeur en pleine propriété du bien à l'IFI</p>
                        </div>
                      </div>

                      {/* Dettes déductibles */}
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3">Dettes déductibles</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Montant des dettes (€)</label>
                            <input
                              type="number"
                              value={patrimoine.dettes}
                              onChange={(e) => handleNumberChange(e.target.value, setPatrimoine, patrimoine, 'dettes')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 200000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Famille Tab */}
                  {activeTab === 'famille' && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 rounded-lg text-white">
                        <h4 className="font-semibold mb-3 text-white">Situation familiale</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-white mb-1">Nombre de parts fiscales</label>
                            <input
                              type="number"
                              value={partsFiscales}
                              onChange={(e) => {
                                const value = e.target.value === '' ? 1 : Number(e.target.value);
                                if (!isNaN(value) && value >= 0) {
                                  setPartsFiscales(value);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#253F60] bg-white text-[#112033]"
                              placeholder="Ex: 1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      calculateTax();
                      setShowResults(true);
                      setShowPopup(true);
                    }}
                    className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:from-[#1E2F4A] hover:to-[#A67A5A] transition-all duration-200 shadow-lg shadow-[#253F60]/30 text-sm sm:text-base"
                  >
                    Calculer mes impôts
                  </button>
                </div>

                {/* Results Section */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Barème 2025 */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-[#112033] mb-3 text-sm sm:text-base">Barème 2025</h4>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span>Jusqu'à 11 498€</span>
                        <span className="text-[#253F60] font-medium">0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>De 11 498€ à 29 315€</span>
                        <span className="text-[#253F60] font-medium">11%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>De 29 316€ à 83 823€</span>
                        <span className="text-[#253F60] font-medium">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>De 83 824€ à 180 294€</span>
                        <span className="text-[#253F60] font-medium">41%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plus de 180 295€</span>
                        <span className="text-[#253F60] font-medium">45%</span>
                      </div>
                    </div>
                  </div>

                  {/* Résultats */}
                  <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] p-4 sm:p-6 rounded-lg text-white">
                    <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Résultats Fiscaux 2025</h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Revenu brut global</span>
                        <span className="font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Parts fiscales</span>
                        <span className="font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Quotient familial</span>
                        <span className="font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Impôt IR</span>
                        <span className="font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Total impôts</span>
                        <span className="font-semibold text-sm sm:text-lg">{showResults ? resultats.impotIR.toLocaleString() + '€' : '***'}</span>
                      </div>
                      <div className="text-xs sm:text-sm opacity-90">
                        {showResults ? 'Prendre RDV pour connaître le détail' : '***€/mois • Taux effectif: ***%'}
                      </div>
                    </div>
                  </div>

                  {/* IFI Results */}
                  <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] p-4 sm:p-6 rounded-lg text-white">
                    <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Résultats IFI 2025</h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Patrimoine immobilier net</span>
                        <span className="font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Impôt IFI</span>
                        <span className="font-semibold text-sm sm:text-lg">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</span>
                      </div>
                      {resultats.patrimoineNet > 1300000 && (
                        <div className="text-xs sm:text-sm opacity-90">
                          {showResults ? 'Prendre RDV pour connaître le détail' : 'Seuil dépassé de ***€'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tax Bracket Chart */}
                  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                    <h4 className="font-semibold text-[#112033] mb-3 sm:mb-4 text-sm sm:text-base">Votre position dans le barème progressif</h4>
                    <div className="space-y-3 sm:space-y-4">
                      {/* Chart Bars */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">0% - 11 498€</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.min(100, (11498 / Math.max(resultats.quotientFamilial, 11498)) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">0%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">11% - 29 315€</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.min(100, Math.max(0, (Math.min(resultats.quotientFamilial, 29315) - 11498) / (29315 - 11498)) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">11%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">30% - 83 823€</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.min(100, Math.max(0, (Math.min(resultats.quotientFamilial, 83823) - 29316) / (83823 - 29316)) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">30%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">41% - 180 294€</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.min(100, Math.max(0, (Math.min(resultats.quotientFamilial, 180294) - 83824) / (180294 - 83824)) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">41%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">45% - 180 295€+</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.max(0, (resultats.quotientFamilial - 180295) / 100000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">45%</span>
                        </div>
                      </div>
                      
                      {/* Current Position Indicator */}
                      {resultats.quotientFamilial > 0 && (
                        <div className="mt-3 sm:mt-4 p-3 bg-[#253F60] text-white rounded-lg">
                          <div className="text-xs sm:text-sm">
                            <strong>Votre quotient familial:</strong> {resultats.quotientFamilial.toLocaleString()}€
                          </div>
                          <div className="text-xs opacity-90 mt-1">
                            Taux marginal: {resultats.quotientFamilial <= 11498 ? '0%' : 
                                          resultats.quotientFamilial <= 29315 ? '11%' :
                                          resultats.quotientFamilial <= 83823 ? '30%' :
                                          resultats.quotientFamilial <= 180294 ? '41%' : '45%'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* IFI Chart */}
                  {resultats.patrimoineNet > 0 && (
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                      <h4 className="font-semibold text-[#112033] mb-3 sm:mb-4 text-sm sm:text-base">Barème IFI 2025</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">Exonéré - 1 300 000€</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.min(100, (1300000 / Math.max(resultats.patrimoineNet, 1300000)) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">0%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">0,5% - 2 100 000€</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.min(100, Math.max(0, (Math.min(resultats.patrimoineNet, 2100000) - 1300000) / 800000) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">0,5%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">0,7% - 2 600 000€</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.min(100, Math.max(0, (Math.min(resultats.patrimoineNet, 2600000) - 2100000) / 500000) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">0,7%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-[#4A5568]">1,5% - 2 600 000€+</span>
                          <div className="flex-1 mx-2 sm:mx-4">
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-full relative">
                              <div 
                                className="h-3 sm:h-4 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full"
                                style={{ width: `${Math.max(0, (resultats.patrimoineNet - 2600000) / 1000000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#253F60]">1,5%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-[#253F60] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Prêt à optimiser vos investissements ?</h3>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4 sm:mb-6 max-w-2xl mx-auto">
                Utilisez nos outils professionnels pour prendre les meilleures décisions fiscales et patrimoniales.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#A67A5A] transition-colors text-sm sm:text-base"
                >
                  Planifiez votre consultation gratuite
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#253F60] transition-colors text-sm sm:text-base"
                >
                  Consulter un expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-[#112033] mb-4">
                Simulation terminée
              </h3>
              <p className="text-[#4A5568] mb-6">
                Pour connaître le détail de vos résultats fiscaux et obtenir des conseils personnalisés, prenez rendez-vous avec nos experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
                    setShowPopup(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#253F60] to-[#B99066] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#1E2F4A] hover:to-[#A67A5A] transition-all duration-200 shadow-lg"
                >
                  Planifiez votre consultation gratuite
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 border-2 border-[#253F60] text-[#253F60] py-3 px-6 rounded-lg font-semibold hover:bg-[#253F60] hover:text-white transition-all duration-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 