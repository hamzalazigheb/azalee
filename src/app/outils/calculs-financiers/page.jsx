"use client";

import React, { useMemo, useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
      isFinite(amount) ? amount : 0
    );
  } catch (e) {
    return `${amount.toFixed ? amount.toFixed(0) : amount} €`;
  }
}

function clampNumber(value, min = 0, max = Number.POSITIVE_INFINITY) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function getCompoundingLabel(periods) {
  switch (periods) {
    case 1:
      return "annuelle";
    case 4:
      return "trimestrielle";
    case 12:
      return "mensuelle";
    default:
      return `${periods}x/an`;
  }
}

function computeFutureValue({ principal, annualRatePct, years, periodsPerYear, contributionPerPeriod }) {
  const n = Math.max(0, Math.round(periodsPerYear * years));
  const r = Math.max(0, annualRatePct) / 100;
  const i = periodsPerYear > 0 ? r / periodsPerYear : 0;

  if (n === 0) {
    const totalContrib = contributionPerPeriod * n;
    const fv = principal + totalContrib; // no growth
    return { futureValue: fv, interestEarned: 0, periods: n, totalContrib };
  }

  if (i === 0) {
    const totalContrib = contributionPerPeriod * n;
    const fv = principal + totalContrib;
    const interest = 0;
    return { futureValue: fv, interestEarned: interest, periods: n, totalContrib };
  }

  const growth = Math.pow(1 + i, n);
  const fvPrincipal = principal * growth;
  const fvContrib = contributionPerPeriod * ((growth - 1) / i);
  const futureValue = fvPrincipal + fvContrib;
  const totalContrib = contributionPerPeriod * n;
  const interestEarned = futureValue - (principal + totalContrib);

  return { futureValue, interestEarned, periods: n, totalContrib };
}

export default function CalculsFinanciersPage() {
  const [activeTab, setActiveTab] = useState("capitalisation"); // capitalisation | amortissement | roi
  const [cmsContent, setCmsContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [principal, setPrincipal] = useState(10000);
  const [annualRatePct, setAnnualRatePct] = useState(3);
  const [years, setYears] = useState(5);
  const [periodsPerYear, setPeriodsPerYear] = useState(12);
  const [contributionPerPeriod, setContributionPerPeriod] = useState(0);

  // Load CMS content from database
  useEffect(() => {
    const loadCmsContent = async () => {
      try {
        const response = await fetch(`/api/pages/content?path=/outils/calculs-financiers&type=cms`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.content) {
            console.log('CMS Content loaded:', data.content);
            const parsedContent = JSON.parse(data.content.content);
            console.log('Parsed CMS Content:', parsedContent);
            setCmsContent(parsedContent);
          } else {
            console.log('No CMS content found in response:', data);
          }
        } else {
          console.log('CMS API response not ok:', response.status);
        }
      } catch (error) {
        console.log('Error loading CMS content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCmsContent();
  }, []);

  // Default content if CMS content is not available
  const content = cmsContent || {
    hero: {
      title: "Calculs financiers divers",
      subtitle: "Simulez vos investissements et prêts avec nos outils financiers",
      description: "Utilisez nos calculateurs pour planifier vos investissements, évaluer vos prêts et analyser la rentabilité de vos projets. Des outils précis et faciles à utiliser.",
      ctaPrimary: "Commencer la simulation",
      ctaSecondary: "En savoir plus"
    },
    calculator: {
      title: "Calculateur financier",
      tabs: [
        { id: "capitalisation", label: "Capitalisation composée", description: "Calculez la valeur future de vos investissements" },
        { id: "amortissement", label: "Amortissement de prêt", description: "Simulez le remboursement de vos emprunts" },
        { id: "roi", label: "Analyse ROI", description: "Évaluez la rentabilité de vos investissements" }
      ]
    },
    capitalisation: {
      parameters: {
        montantInitial: { label: "Montant initial", description: "Capital de départ pour votre investissement" },
        tauxAnnuel: { label: "Taux annuel (%)", description: "Rendement annuel de votre placement" },
        duree: { label: "Durée (années)", description: "Horizon de placement en années" },
        capitalisation: { label: "Capitalisation", description: "Périodicité des intérêts composés" },
        versementPeriodique: { label: "Versement périodique", description: "Apport régulier à votre investissement" }
      },
      results: {
        sections: {
          montantFinal: "Montant final",
          interetsGeneres: "Intérêts générés",
          capitalInitial: "Capital initial",
          versements: "Versements totaux",
          cagr: "CAGR"
        }
      }
    },
    methodology: {
      title: "Détails et méthodologie",
      description: "Comprendre les calculs et formules utilisées",
      content: [
        "La capitalisation composée utilise la formule : VF = VP × (1 + r)^n + PMT × [(1 + r)^n - 1] / r",
        "L'amortissement de prêt calcule les échéances selon le système français d'amortissement constant",
        "Le ROI se calcule comme : (Gains - Coûts) / Coûts × 100",
        "Tous les calculs sont effectués avec une précision de 2 décimales"
      ]
    },
    faq: {
      title: "Questions fréquentes",
      questions: [
        {
          question: "Comment fonctionne la capitalisation composée ?",
          answer: "La capitalisation composée permet à vos intérêts de générer à leur tour des intérêts, créant un effet boule de neige sur votre capital."
        },
        {
          question: "Quelle est la différence entre taux nominal et taux effectif ?",
          answer: "Le taux nominal est le taux annuel affiché, tandis que le taux effectif prend en compte la fréquence de capitalisation des intérêts."
        },
        {
          question: "Comment interpréter le ROI ?",
          answer: "Un ROI positif indique un investissement rentable. Plus le pourcentage est élevé, plus l'investissement est intéressant."
        }
      ]
    },
    actions: {
      reset: "Réinitialiser",
      export: "Exporter (PDF)",
      start: "Commencer",
      learnMore: "En savoir plus"
    }
  };

  // Ensure content structure is complete with fallbacks
  const safeContent = {
    hero: {
      title: content.hero?.title || "Calculs financiers divers",
      subtitle: content.hero?.subtitle || "Simulez vos investissements et prêts avec nos outils financiers",
      description: content.hero?.description || "Utilisez nos calculateurs pour planifier vos investissements, évaluer vos prêts et analyser la rentabilité de vos projets.",
      ctaPrimary: content.hero?.ctaPrimary || "Commencer la simulation",
      ctaSecondary: content.hero?.ctaSecondary || "En savoir plus"
    },
    calculator: {
      title: content.calculator?.title || "Calculateur financier",
      tabs: content.calculator?.tabs || [
        { id: "capitalisation", label: "Capitalisation composée", description: "Calculez la valeur future de vos investissements" },
        { id: "amortissement", label: "Amortissement de prêt", description: "Simulez le remboursement de vos emprunts" },
        { id: "roi", label: "Analyse ROI", description: "Évaluez la rentabilité de vos investissements" }
      ]
    },
    capitalisation: {
      parameters: {
        montantInitial: content.capitalisation?.parameters?.montantInitial || { label: "Montant initial", description: "Capital de départ pour votre investissement" },
        tauxAnnuel: content.capitalisation?.parameters?.tauxAnnuel || { label: "Taux annuel (%)", description: "Rendement annuel de votre placement" },
        duree: content.capitalisation?.parameters?.duree || { label: "Durée (années)", description: "Horizon de placement en années" },
        capitalisation: content.capitalisation?.parameters?.capitalisation || { label: "Capitalisation", description: "Périodicité des intérêts composés" },
        versementPeriodique: content.capitalisation?.parameters?.versementPeriodique || { label: "Versement périodique", description: "Apport régulier à votre investissement" }
      },
      results: {
        sections: content.capitalisation?.results?.sections || {
          montantFinal: "Montant final",
          interetsGeneres: "Intérêts générés",
          capitalInitial: "Capital initial",
          versements: "Versements totaux",
          cagr: "CAGR"
        }
      }
    },
    methodology: {
      title: content.methodology?.title || "Détails et méthodologie",
      description: content.methodology?.description || "Comprendre les calculs et formules utilisées",
      content: content.methodology?.content || [
        "La capitalisation composée utilise la formule : VF = VP × (1 + r)^n + PMT × [(1 + r)^n - 1] / r",
        "L'amortissement de prêt calcule les échéances selon le système français d'amortissement constant",
        "Le ROI se calcule comme : (Gains - Coûts) / Coûts × 100",
        "Tous les calculs sont effectués avec une précision de 2 décimales"
      ]
    },
    faq: {
      title: content.faq?.title || "Questions fréquentes",
      questions: content.faq?.questions || [
        {
          question: "Comment fonctionne la capitalisation composée ?",
          answer: "La capitalisation composée permet à vos intérêts de générer à leur tour des intérêts, créant un effet boule de neige sur votre capital."
        },
        {
          question: "Quelle est la différence entre taux nominal et taux effectif ?",
          answer: "Le taux nominal est le taux annuel affiché, tandis que le taux effectif prend en compte la fréquence de capitalisation des intérêts."
        },
        {
          question: "Comment interpréter le ROI ?",
          answer: "Un ROI positif indique un investissement rentable. Plus le pourcentage est élevé, plus l'investissement est intéressant."
        }
      ]
    },
    actions: {
      reset: content.actions?.reset || "Réinitialiser",
      export: content.actions?.export || "Exporter (PDF)",
      start: content.actions?.start || "Commencer",
      learnMore: content.actions?.learnMore || "En savoir plus"
    }
  };

  // Debug logging
  console.log('Original content:', content);
  console.log('Safe content:', safeContent);
  console.log('Capitalisation parameter check:', safeContent.capitalisation?.parameters?.capitalisation);

  const { futureValue, interestEarned, cagr, totalContrib } = useMemo(() => {
    const p = clampNumber(Number(principal) || 0);
    const r = clampNumber(Number(annualRatePct) || 0, 0, 100);
    const y = clampNumber(Number(years) || 0, 0, 100);
    const m = clampNumber(Number(periodsPerYear) || 1, 1, 365);
    const c = clampNumber(Number(contributionPerPeriod) || 0, 0, 1_000_000_000);

    const { futureValue, interestEarned, totalContrib } = computeFutureValue({
      principal: p,
      annualRatePct: r,
      years: y,
      periodsPerYear: m,
      contributionPerPeriod: c
    });

    // CAGR meaningful only without contributions and with time > 0
    let cagr = 0;
    if (c === 0 && y > 0 && p > 0) {
      cagr = Math.pow(futureValue / p, 1 / y) - 1;
    }

    return { futureValue, interestEarned, cagr, totalContrib };
  }, [principal, annualRatePct, years, periodsPerYear, contributionPerPeriod]);

  function resetInputs() {
    setPrincipal(10000);
    setAnnualRatePct(3);
    setYears(5);
    setPeriodsPerYear(12);
    setContributionPerPeriod(0);
    setShowResults(false);
  }

  function calculateResults() {
    setShowResults(true);
    setShowPopup(true);
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4EBBBD] mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du contenu...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Distinct dark hero */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
            {safeContent.hero.title}
          </h1>
          <p className="max-w-3xl mx-auto text-white text-base sm:text-lg font-inter leading-relaxed mb-6">
            {safeContent.hero.description}
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="#calcul" className="inline-flex items-center justify-center bg-[#B99066] text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200">
              {safeContent.hero.ctaPrimary}
            </a>
            <a href="#details" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200">
              {safeContent.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Floating stats */}
      <div className="relative -mt-10 sm:-mt-12 lg:-mt-14">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <p className="text-[#686868] text-xs uppercase tracking-wide mb-1">Valeur future</p>
              <p className="text-[#253F60] text-2xl font-cairo font-semibold">{showResults ? formatCurrency(futureValue) : '***'}</p>
              <p className="text-[#686868] text-xs mt-1">Montant final</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="text-[#686868] text-xs uppercase tracking-wide mb-1">Intérêts générés</div>
              <p className="text-[#253F60] text-2xl font-cairo font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</p>
              <p className="text-[#686868] text-xs mt-1">Gains totaux</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <p className="text-[#686868] text-xs uppercase tracking-wide mb-1">Versements</p>
              <p className="text-[#253F60] text-2xl font-cairo font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</p>
              <p className="text-[#686868] text-xs mt-1">Apports totaux</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed calculator card */}
      <section id="calcul" className="w-full py-12 lg:py-16 bg-[#F9FAFB]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-2 p-2 bg-[#F9FAFB]">
              {safeContent.calculator.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-inter font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-[#253F60] shadow-sm border border-[#E5E7EB]"
                      : "text-[#686868] hover:text-[#253F60]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            {activeTab === "capitalisation" && (
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Parameters */}
                  <div>
                    <h2 className="text-[#253F60] text-xl font-cairo font-semibold mb-4">Paramètres</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-[#686868] text-sm font-medium mb-2">
                          {safeContent.capitalisation.parameters.montantInitial.label}
                        </label>
                        <p className="text-[#686868] text-xs mb-2">
                          {safeContent.capitalisation.parameters.montantInitial.description}
                        </p>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={principal}
                          onChange={(e) => setPrincipal(Number(e.target.value))}
                          placeholder="€10,000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#686868] text-sm font-medium mb-2">
                            {safeContent.capitalisation.parameters.tauxAnnuel.label}
                          </label>
                          <p className="text-[#686868] text-xs mb-2">
                            {safeContent.capitalisation.parameters.tauxAnnuel.description}
                          </p>
                          <input
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            value={annualRatePct}
                            onChange={(e) => setAnnualRatePct(Number(e.target.value))}
                            placeholder="3.00"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-[#686868] text-sm font-medium mb-2">
                            {safeContent.capitalisation.parameters.duree.label}
                          </label>
                          <p className="text-[#686868] text-xs mb-2">
                            {safeContent.capitalisation.parameters.duree.description}
                          </p>
                          <input
                            type="number"
                            inputMode="decimal"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            placeholder="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#686868] text-sm font-medium mb-2">
                            {safeContent.capitalisation.parameters.capitalisation.label}
                          </label>
                          <p className="text-[#686868] text-xs mb-2">
                            {safeContent.capitalisation.parameters.capitalisation.description}
                          </p>
                          <select
                            value={periodsPerYear}
                            onChange={(e) => setPeriodsPerYear(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                          >
                            <option value={1}>Annuelle</option>
                            <option value={4}>Trimestrielle</option>
                            <option value={12}>Mensuelle</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[#686868] text-sm font-medium mb-2">
                            {safeContent.capitalisation.parameters.versementPeriodique.label}
                          </label>
                          <p className="text-[#686868] text-xs mb-2">
                            {safeContent.capitalisation.parameters.versementPeriodique.description}
                          </p>
                          <input
                            type="number"
                            inputMode="decimal"
                            value={contributionPerPeriod}
                            onChange={(e) => setContributionPerPeriod(Number(e.target.value))}
                            placeholder="€200"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={resetInputs}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-transparent border-2 border-[#253F60] text-[#253F60] text-sm font-inter font-semibold hover:bg-[#253F60] hover:text-white transition-all duration-200"
                        >
                          {safeContent.actions.reset}
                        </button>
                        <button
                          onClick={calculateResults}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white text-sm font-inter font-semibold hover:from-[#1a2d47] hover:to-[#253F60] transition-all duration-200 shadow-lg"
                        >
                          Calculer mes résultats
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h2 className="text-[#253F60] text-xl font-cairo font-semibold mb-4">Résultats</h2>
                    <div className="rounded-xl border border-gray-200 p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-[#6B7280] text-xs uppercase tracking-wide mb-1">
                            {safeContent.capitalisation.results.sections.montantFinal}
                          </p>
                          <p className="text-[#253F60] text-3xl font-cairo font-semibold">{showResults ? formatCurrency(futureValue) : '***'}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] text-xs uppercase tracking-wide mb-1">
                            {safeContent.capitalisation.results.sections.interetsGeneres}
                          </p>
                          <p className="text-[#253F60] text-3xl font-cairo font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-[#F9FAFB] rounded-lg p-4">
                          <p className="text-[#6B7280] text-xs uppercase tracking-wide mb-1">
                            {safeContent.capitalisation.results.sections.capitalInitial}
                          </p>
                          <p className="text-[#253F60] font-inter font-semibold">{showResults ? formatCurrency(principal) : '***'}</p>
                        </div>
                        <div className="bg-[#F9FAFB] rounded-lg p-4">
                          <p className="text-[#6B7280] text-xs uppercase tracking-wide mb-1">
                            {safeContent.capitalisation.results.sections.versements}
                          </p>
                          <p className="text-[#253F60] font-inter font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</p>
                        </div>
                        <div className="bg-[#F9FAFB] rounded-lg p-4">
                          <p className="text-[#6B7280] text-xs uppercase tracking-wide mb-1">
                            {safeContent.capitalisation.results.sections.cagr}
                          </p>
                          <p className="text-[#253F60] font-inter font-semibold">{showResults ? 'Prendre RDV pour connaître le détail' : '***'}</p>
                        </div>
                      </div>

                      <p className="text-[#686868] text-xs mt-4">
                        {safeContent.methodology.content[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "amortissement" && (
              <div className="p-10 text-center">
                <h2 className="text-[#253F60] text-2xl font-cairo font-semibold mb-3">
                  {safeContent.calculator.tabs.find(t => t.id === 'amortissement')?.label}
                </h2>
                <p className="text-[#686868] max-w-2xl mx-auto">
                  {safeContent.calculator.tabs.find(t => t.id === 'amortissement')?.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-3">
                  <button 
                    onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white text-sm font-inter font-semibold hover:from-[#A67A5A] hover:to-[#B99066] transition-all duration-200 shadow-lg"
                  >
                    {safeContent.actions.start}
                  </button>
                  <button 
                    onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="px-4 py-2 rounded-lg bg-white border-2 border-[#253F60] text-[#253F60] text-sm font-inter font-semibold hover:bg-[#253F60] hover:text-white transition-all duration-200"
                  >
                    {safeContent.actions.learnMore}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "roi" && (
              <div className="p-10 text-center">
                <h2 className="text-[#253F60] text-2xl font-cairo font-semibold mb-3">
                  {safeContent.calculator.tabs.find(t => t.id === 'roi')?.label}
                </h2>
                <p className="text-[#686868] max-w-2xl mx-auto">
                  {safeContent.calculator.tabs.find(t => t.id === 'roi')?.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-3">
                  <button 
                    onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white text-sm font-inter font-semibold hover:from-[#A67A5A] hover:to-[#B99066] transition-all duration-200 shadow-lg"
                  >
                    {safeContent.actions.start}
                  </button>
                  <button 
                    onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="px-4 py-2 rounded-lg bg-white border-2 border-[#253F60] text-[#253F60] text-sm font-inter font-semibold hover:bg-[#253F60] hover:text-white transition-all duration-200"
                  >
                    {safeContent.actions.learnMore}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Methodology / details */}
          <div id="details" className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
              <h3 className="text-[#253F60] text-xl font-cairo font-semibold mb-3">
                {safeContent.methodology.title}
              </h3>
              <p className="text-[#686868] text-sm leading-relaxed mb-4">
                {safeContent.methodology.description}
              </p>
              <ul className="list-disc list-inside text-[#686868] text-sm space-y-1">
                {safeContent.methodology.content.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-[#253F60] text-xl font-cairo font-semibold mb-3">
                {safeContent.faq.title}
              </h3>
              <div className="space-y-3 text-sm">
                {safeContent.faq.questions.map((item, index) => (
                  <div key={index}>
                    <p className="text-[#253F60] font-inter font-medium">{item.question}</p>
                    <p className="text-[#686868]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-cairo font-semibold text-[#253F60] mb-3 sm:mb-4">
                Calcul terminé
              </h3>
              <p className="text-sm sm:text-base text-[#686868] mb-4 sm:mb-6">
                Pour connaître le détail de vos calculs financiers et obtenir des conseils personnalisés, prenez rendez-vous avec nos experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
                    setShowPopup(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#253F60] to-[#B99066] text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:from-[#1E2F4A] hover:to-[#A67A5A] transition-all duration-200 shadow-lg text-sm sm:text-base"
                >
                  Prendre rendez-vous
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 border-2 border-[#253F60] text-[#253F60] py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-[#253F60] hover:text-white transition-all duration-200 text-sm sm:text-base"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
} 