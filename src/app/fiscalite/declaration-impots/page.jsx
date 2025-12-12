"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function DeclarationImpotsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Déclaration de revenus",
      description: "Guide complet pour déclarer vos impôts en toute sérénité. Découvrez les étapes, les documents nécessaires et nos conseils d'experts."
    },
    tabs: {
      tabs: [
        { id: "general", label: "Prélèvement à la source" },
        { id: "dates", label: "Régularisation" },
        { id: "documents", label: "Questions fréquentes" },
        { id: "erreurs", label: "Accompagnement" }
      ]
    },
    steps: {
      steps: [
        {
          step: "1",
          title: "Rassemblement des documents",
          description: "Collectez tous vos justificatifs de revenus, charges et investissements",
          details: ["Bulletins de salaire", "Attestations de loyer", "Relevés bancaires", "Quittances de charges"]
        },
        {
          step: "2",
          title: "Choix du mode de déclaration",
          description: "Optez pour la méthode qui vous convient le mieux",
          details: ["Déclaration en ligne (recommandée)", "Déclaration papier", "Déclaration par téléphone"]
        }
      ]
    },
    cta: {
      title: "Besoin d'aide pour votre déclaration ?",
      description: "Nos experts fiscaux vous accompagnent dans toutes vos démarches de déclaration d'impôts.",
      buttonText: "Demander une assistance"
    }
  };

  useEffect(() => {
    // Set static content
    setContent(defaultContent);
  }, []);

  // Use dynamic tabs from CMS or default
  const tabs = content.tabs?.tabs || defaultContent.tabs.tabs;

  const declarationSteps = [
    {
      step: "1",
      title: "Rassemblement des documents",
      description: "Collectez tous vos justificatifs de revenus, charges et investissements",
      details: ["Bulletins de salaire", "Attestations de loyer", "Relevés bancaires", "Quittances de charges"]
    },
    {
      step: "2",
      title: "Choix du mode de déclaration",
      description: "Optez pour la méthode qui vous convient le mieux",
      details: ["Déclaration en ligne (recommandée)", "Déclaration papier", "Déclaration par téléphone"]
    },
    {
      step: "3",
      title: "Saisie des informations",
      description: "Remplissez tous les champs avec précision",
      details: ["Revenus d'activité", "Revenus du patrimoine", "Charges déductibles", "Crédits d'impôt"]
    },
    {
      step: "4",
      title: "Vérification et validation",
      description: "Relisez attentivement avant de valider définitivement",
      details: ["Contrôle des montants", "Vérification des informations", "Validation finale"]
    }
  ];

  const calendarData = [
    {
      month: "Mai",
      dates: [
        { day: "15", description: "Départements 01 à 19" },
        { day: "22", description: "Départements 20 à 54" },
        { day: "29", description: "Départements 55 à 976" }
      ]
    },
    {
      month: "Juin",
      dates: [
        { day: "5", description: "Départements 01 à 19" },
        { day: "12", description: "Départements 20 à 54" },
        { day: "19", description: "Départements 55 à 976" }
      ]
    }
  ];

  const commonErrors = [
    {
      error: "Oubli de déclarer des revenus",
      impact: "Risque de redressement fiscal",
      solution: "Vérifiez tous vos comptes et sources de revenus"
    },
    {
      error: "Erreur dans le calcul des charges",
      impact: "Perte d'avantages fiscaux",
      solution: "Conservez tous vos justificatifs de charges"
    },
    {
      error: "Mauvaise catégorisation des revenus",
      impact: "Taux d'imposition incorrect",
      solution: "Consultez la notice explicative ou un professionnel"
    }
  ];

  return (
    <>
      {/* Loading indicator */}
      
      <Header />

      {/* Hero Section with Gradient Background */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block bg-[#B99066] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Guide complet
            </span>
          </div>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight mb-4 sm:mb-6">
            {content.hero?.title || defaultContent.hero.title}
          </h1>
          <p className="max-w-4xl mx-auto text-white text-base sm:text-lg leading-relaxed mb-8">
            {content.hero?.description || defaultContent.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="bg-[#253F60] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A2A4A] transition-colors duration-200"
              onClick={() => window.location.href = '/outils/calculatrice-impots'}
            >
              Simuler ma déclaration
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Cards */}
      <div className="relative -mt-8 sm:-mt-12">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10 text-center">
                <p className="text-white/90 text-sm uppercase tracking-wide mb-2">Régularisation</p>
                <p className="text-white text-2xl font-semibold mb-2">Septembre</p>
                <p className="text-white/80 text-xs">Remboursement ou complément</p>
              </div>
            </div>
            <div className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10 text-center">
                <p className="text-white/90 text-sm uppercase tracking-wide mb-2">Prélèvement</p>
                <p className="text-white text-2xl font-semibold mb-2">À la source</p>
                <p className="text-white/80 text-xs">Depuis 2019</p>
              </div>
            </div>
            <div className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
              <div className="relative z-10 text-center">
                <p className="text-white/90 text-sm uppercase tracking-wide mb-2">Obligatoire</p>
                <p className="text-white text-2xl font-semibold mb-2">Déclaration</p>
                <p className="text-white/80 text-xs">Même avec prélèvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white shadow-lg"
                    : "bg-white border-2 border-[#253F60] text-[#253F60] hover:bg-[#253F60] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "general" && (
              <div className="space-y-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-3 sm:mb-4">Prélèvement à la source depuis 2019</h2>
                  <p className="text-[#686868] text-sm sm:text-base lg:text-lg">Les contribuables sont imposés au fil de l'eau, mais la déclaration reste obligatoire</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-white">
                  <h3 className="text-white text-lg sm:text-xl font-cairo font-semibold mb-3 sm:mb-4">Pourquoi la déclaration reste-t-elle obligatoire ?</h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                    Depuis la mise en place du prélèvement à la source, les contribuables sont imposés au fil de l'eau. 
                    Pourtant, la déclaration reste obligatoire car elle permet de régulariser la situation.
                  </p>
                  <p className="text-white/90 text-base leading-relaxed">
                    Cette régularisation s'explique par la prise en compte, lors de la déclaration, des réductions et crédits d'impôt 
                    (emploi à domicile, dons, investissements, etc.), mais aussi des revenus non soumis à prélèvement à la source 
                    (dividendes, plus-values, revenus fonciers).
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] text-white rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-white text-lg font-cairo font-semibold">Vous avez payé trop d'impôt</h3>
                      </div>
                      <p className="text-white/90 text-sm mb-3">
                        Vous recevez un remboursement de la part du Trésor Public (généralement fin juillet ou début août).
                      </p>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                        <p className="text-white font-semibold">Remboursement automatique</p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] text-white rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-white text-lg font-cairo font-semibold">Vous n'avez pas assez payé</h3>
                      </div>
                      <p className="text-white/90 text-sm mb-3">
                        Vous devez verser un complément, prélevé directement en septembre, éventuellement échelonné sur plusieurs mois si le solde est important.
                      </p>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                        <p className="text-white font-semibold">Prélèvement complémentaire</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "dates" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">Régularisation en septembre</h2>
                  <p className="text-[#686868] text-lg">Comprendre les mécanismes de régularisation et le taux de prélèvement</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl shadow-xl p-8 mb-8 text-white">
                  <h3 className="text-white text-xl font-cairo font-semibold mb-4">Question fréquente : "Dois-je baisser mon taux de prélèvement si je suis remboursé ?"</h3>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-l-4 border-[#B99066]">
                    <p className="text-white text-lg font-semibold mb-3">La réponse est <strong>NON</strong></p>
                    <p className="text-white/90 text-base leading-relaxed mb-4">
                      Le remboursement est souvent lié aux réductions ou crédits d'impôt auxquels vous avez droit. 
                      Le taux de prélèvement à la source est calculé sur vos revenus imposables, sans anticiper ces avantages fiscaux.
                    </p>
                    <p className="text-white/90 text-base leading-relaxed">
                      Ainsi, même si vous êtes remboursé, il est normal de conserver le même taux, sauf changement significatif 
                      de vos revenus ou de votre situation familiale.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-cairo font-semibold mb-4 flex items-center gap-2">
                        Calcul du taux de prélèvement
                      </h3>
                      <ul className="space-y-2 text-white/90 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Basé sur les revenus imposables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Sans anticiper les avantages fiscaux</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Calculé sur l'année précédente</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Peut être ajusté sur demande</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-cairo font-semibold mb-4 flex items-center gap-2">
                        Risques d'une déclaration incomplète
                      </h3>
                      <ul className="space-y-2 text-white/90 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Régularisations défavorables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Risque de redressement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Perte d'avantages fiscaux</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-[#253F60] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>Majorations de retard</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">Questions fréquentes sur la déclaration de revenus</h2>
                  <p className="text-[#686868] text-lg">Les réponses aux questions les plus courantes</p>
                </div>
                
                <div className="space-y-6">
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-cairo font-semibold mb-3">Pourquoi dois-je encore faire une déclaration si je suis déjà prélevé à la source ?</h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        Le prélèvement à la source ne prend pas en compte toutes les réductions, crédits d'impôt et revenus exceptionnels. 
                        La déclaration de revenus reste donc obligatoire afin de régulariser la situation fiscale.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-cairo font-semibold mb-3">Pourquoi suis-je remboursé alors que je paie déjà l'impôt chaque mois ?</h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        Le remboursement correspond généralement à l'application de crédits et réductions d'impôt (emploi à domicile, dons, investissements, etc.) 
                        ou à des acomptes trop élevés. Le taux de prélèvement appliqué par défaut ne tient pas compte de ces avantages fiscaux.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-cairo font-semibold mb-3">Dois-je modifier mon taux de prélèvement si je reçois un remboursement ?</h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        Non. Le taux de prélèvement est calculé sur vos revenus imposables avant réductions et crédits d'impôt. 
                        Être remboursé ne signifie pas que votre taux est trop élevé, mais simplement que vos avantages fiscaux sont venus réduire le montant final de l'impôt. 
                        En revanche, si vos revenus ou votre situation familiale changent (mariage, naissance, hausse ou baisse de revenus), 
                        il est nécessaire de mettre à jour votre taux sur impots.gouv.fr.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "erreurs" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">Accompagnement par un conseiller en gestion de patrimoine</h2>
                  <p className="text-[#686868] text-lg">Transformez votre déclaration en véritable outil d'optimisation patrimoniale</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-xl shadow-xl p-8 mb-8 text-white">
                  <h3 className="text-white text-xl font-cairo font-semibold mb-4">Quel est l'intérêt de se faire accompagner par un CGP ?</h3>
                  <p className="text-white/90 text-base leading-relaxed mb-6">
                    Un CGP peut simuler votre impôt réel en intégrant vos réductions, déductions et investissements à venir. 
                    Cela permet d'obtenir un taux de prélèvement plus proche de votre charge fiscale effective.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="group relative rounded-2xl p-6 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        </div>
                        <h4 className="text-white font-cairo font-semibold mb-2">Taux optimisé</h4>
                        <p className="text-white/90 text-sm">Plus proche de votre charge fiscale effective</p>
                      </div>
                    </div>
                    
                    <div className="group relative rounded-2xl p-6 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        </div>
                        <h4 className="text-white font-cairo font-semibold mb-2">Éviter les surprises</h4>
                        <p className="text-white/90 text-sm">Pas de mauvaises surprises lors de la régularisation</p>
                      </div>
                    </div>
                    
                    <div className="group relative rounded-2xl p-6 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                        </div>
                        <h4 className="text-white font-cairo font-semibold mb-2">Stratégie patrimoniale</h4>
                        <p className="text-white/90 text-sm">Anticiper et optimiser sur plusieurs années</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl p-8 text-white text-center shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-cairo font-semibold mb-4">
                      {content.cta?.title || defaultContent.cta.title}
                    </h3>
                    <p className="text-base mb-6 opacity-90">
                      {content.cta?.description || defaultContent.cta.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        className="bg-[#B99066] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A67C52] transition-colors duration-200 shadow-lg"
                        onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      >
                        {content.cta?.buttonText || defaultContent.cta.buttonText}
                      </button>
                      <button 
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-200 shadow-lg"
                        onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                      >
                        Prendre rendez-vous
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                Conclusion : La déclaration de revenus, un moment clé
              </h2>
              <p className="text-white text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                La déclaration de revenus n'est pas qu'une simple formalité administrative : elle constitue un moment clé pour ajuster, 
                comprendre et optimiser sa fiscalité. Bien réalisée, elle peut permettre de récupérer des sommes importantes et d'anticiper 
                la charge fiscale de l'année suivante.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                <h3 className="text-white text-xl font-cairo font-semibold mb-3">Évaluez dès maintenant votre impôt réel avec un conseiller Azalée Patrimoine</h3>
                <p className="text-white/90 text-sm">
                  Transformez votre déclaration en véritable outil d'optimisation patrimoniale
                </p>
              </div>
              <button 
                className="bg-[#B99066] text-white px-8 py-4 rounded-full font-source-sans font-semibold text-lg hover:bg-[#A67C52] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 