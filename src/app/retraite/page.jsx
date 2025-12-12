"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { processHTMLForRender } from "../../lib/utils/htmlConverter";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RetraitePage() {
  const [isSticky, setIsSticky] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Fonction pour remplacer "gratuit" par "offert" dans les textes (même depuis la base de données)
  const replaceGratuit = (text) => {
    if (!text) return text;
    if (typeof text === 'string') {
      return text.replace(/gratuit/gi, 'offert');
    }
    return text;
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=retraite&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setContent(data.data);
          } else if (data.content) {
            setContent(data.content);
          } else {
            setContent({});
          }
        } else {
          console.error('Failed to fetch content');
          setContent({});
        }
      } catch (error) {
        console.error("Failed to fetch retraite page content:", error);
        setContent({});
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  // Use CMS content with fallback
  const pageContent = content || {};

  // Données pour le graphique
  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: 'Versements cumulés bruts',
        data: Array.from({ length: 30 }, (_, i) => (i + 1) * 2400),
        backgroundColor: 'rgba(37, 63, 96, 0.8)',
        borderColor: '#253F60',
        borderWidth: 2,
      },
      {
        label: 'Intérêts cumulés',
        data: [
          0, 120, 360, 720, 1200, 1800, 2520, 3360, 4320, 5400,
          6600, 7920, 9360, 10920, 12600, 14400, 16320, 18360, 20520, 22800,
          25200, 27720, 30360, 33120, 36000, 39000, 42120, 45360, 48720, 52200
        ],
        backgroundColor: 'rgba(185, 144, 102, 0.8)',
        borderColor: '#B99066',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          color: '#253F60',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 250000,
        ticks: {
          stepSize: 50000,
          callback: function(value) {
            return value.toLocaleString('fr-FR') + ' €';
          },
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          color: '#4B5563',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          color: '#4B5563',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#253F60]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section - Pilier Retraite */}
      <section className="relative w-full min-h-[650px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-white/80 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors underline">Accueil</Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-[#B99066]">Retraite</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Carte gauche */}
            <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
              <h1 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8 tracking-tight">
                {pageContent.hero?.h1 || "Préparer sa retraite sereinement avec Azalée Patrimoine"}
              </h1>
              
              <div className="space-y-5 mb-10">
                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                  {pageContent.hero?.description1 || "Anticiper sa retraite, c'est protéger son niveau de vie futur tout en optimisant la gestion de son patrimoine. Dans un contexte de réformes successives et d'allongement des carrières, bien préparer sa retraite ne relève plus du confort, mais d'une véritable stratégie patrimoniale."}
                </p>
                
                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.hero?.description2 || "<strong className=\"text-[#253F60] font-semibold\">Azalée Patrimoine</strong> vous accompagne pour bâtir une stratégie fiscale cohérente, durable et adaptée à votre profil.") }} />
              </div>
              
              <div className="mt-10">
                <a
                  href={pageContent.hero?.ctaLink || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#253F60] text-white px-10 py-4 rounded-lg shadow-lg font-inter font-semibold text-base lg:text-lg hover:bg-[#1a2d47] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {replaceGratuit(pageContent.hero?.ctaButton) || "Demander un diagnostic offert"}
                </a>
              </div>
            </div>
            
            {/* Carte droite */}
            <div className="relative bg-[#253F60] rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
              {/* Bulle statistique 1666€ - Positionnée en haut à droite */}
              <div className="absolute -top-6 -right-6 w-48 h-32 sm:w-56 sm:h-36 z-20">
                <div className="bg-white rounded-2xl shadow-xl border-2 border-[#B99066] flex items-center justify-center h-full">
                  <div className="text-center px-4">
                    <p className="text-[#253F60] font-cairo font-bold text-lg sm:text-xl">
                      <span className="text-[#B99066] text-2xl sm:text-3xl">{pageContent.section1?.stats?.pensionMoyenne || "1666€"}</span>
                    </p>
                    <p className="text-[#4B5563] font-inter text-sm sm:text-base">{pageContent.section1?.stats?.pensionLabel || "net/mois"}</p>
                  </div>
                  {/* Flèche pointant vers le bas */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#B99066]"></div>
                  </div>
                </div>
              </div>

              {/* Bloc carré - L'évolution du système de retraite français */}
              <div className="bg-white rounded-lg p-6 border border-black mt-8 sm:mt-12">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
                  {pageContent.section1?.evolution?.h3 || "L'évolution du système de retraite français"}
                </h3>
                <div className="space-y-4">
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                    Le système français, historiquement fondé sur la répartition, fait face à des défis majeurs : vieillissement de la population, déséquilibre entre actifs et retraités, et allongement de la durée de cotisation.
                  </p>
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                    La réforme de 2023, repoussant l'âge légal à 64 ans, n'a fait qu'accentuer le besoin d'anticipation.
                  </p>
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                    L'État assure un socle minimal ; à chacun désormais de <strong>bâtir ses revenus complémentaires</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Pourquoi anticiper sa retraite dès aujourd'hui ? */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            {pageContent.section1?.h2 || "Pourquoi anticiper sa retraite dès aujourd'hui ?"}
          </h2>

          {/* CTA Simulateur */}
          {pageContent.section1?.ctaSimulateur && (
            <div className="mb-12 flex justify-center">
              <a
                href={pageContent.section1.ctaSimulateur.link || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-[#B99066] to-[#A67C52] hover:from-[#A67C52] hover:to-[#B99066] text-white px-10 py-5 rounded-xl shadow-2xl font-cairo font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-3xl uppercase overflow-hidden w-full lg:w-auto"
              >
                {/* Effet de brillance au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-3">
                  {pageContent.section1.ctaSimulateur.text || "SIMULER VOTRE PENSION RETRAITE"}
                </span>
              </a>
            </div>
          )}
            
          {/* H3.2: Préparer la liberté financière */}
          {pageContent.section1?.liberteFinanciere && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
              {/* Boîte sombre avec chiffres */}
              <div className="bg-gradient-to-br from-[#1a2d47] to-[#253F60] rounded-xl shadow-2xl p-8 sm:p-10 text-white">
                <div className="text-center space-y-6">
                  <div>
                    <p className="text-2xl sm:text-3xl font-cairo font-bold mb-2">{pageContent.section1.liberteFinanciere.salaire || "4 000 €"}</p>
                    <p className="text-lg font-inter uppercase">{pageContent.section1.liberteFinanciere.salaireLabel || "Net de salaire par mois"}</p>
                  </div>
                  <div className="w-16 h-1 bg-[#B99066] mx-auto my-6"></div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-cairo font-bold mb-2 text-red-300">{pageContent.section1.liberteFinanciere.pension || "MOINS DE 2000 €"}</p>
                    <p className="text-lg font-inter uppercase">{pageContent.section1.liberteFinanciere.pensionLabel || "De pension de retraite"}</p>
                  </div>
                </div>
              </div>

              {/* Texte explicatif */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section1.liberteFinanciere.h3 || "Préparer la liberté financière en anticipant l'impact du taux de remplacement"}
                </h3>
                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                  {pageContent.section1.liberteFinanciere.description1 || "Le taux de remplacement correspond au rapport entre votre dernière rémunération et votre pension retraite. Le taux de remplacement se situe aujourd'hui entre 40% et 60% pour la plupart des cadres."}
                </p>
                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                  {pageContent.section1.liberteFinanciere.description2 || "Anticiper, c'est combler cet écart dès aujourd'hui en constituant des revenus futurs de complément."}
                </p>
              </div>
            </div>
          )}

          {/* Calcul financier et graphique */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Colonne gauche - Calcul et texte */}
            <div className="lg:col-span-2 space-y-8">
              {/* Titre et données du calcul */}
              {pageContent.section1?.calcul && (
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-lg sm:text-xl font-cairo font-bold mb-6">
                    {pageContent.section1.calcul.h3 || "Avec un capital initial de 1000 €, en plaçant 200€ par mois pendant 30 ans à un taux de rendement net de 6,01%."}
                  </h3>
                  
                  {/* Tableau de données */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                      <p className="text-[#6B7280] text-sm font-inter mb-2">Épargne mensuelle</p>
                      <p className="text-[#253F60] text-xl font-cairo font-bold">{pageContent.section1.calcul.epargneMensuelle || "200 €"}</p>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                      <p className="text-[#6B7280] text-sm font-inter mb-2">Capital final</p>
                      <p className="text-[#B99066] text-xl font-cairo font-bold">{pageContent.section1.calcul.capitalFinal || "208 336 €"}</p>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                      <p className="text-[#6B7280] text-sm font-inter mb-2">Versements cumulés</p>
                      <p className="text-[#253F60] text-xl font-cairo font-bold">{pageContent.section1.calcul.versementsCumules || "72 000 €"}</p>
                    </div>
                    <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                      <p className="text-[#6B7280] text-sm font-inter mb-2">Intérêts cumulés</p>
                      <p className="text-[#B99066] text-xl font-cairo font-bold">{pageContent.section1.calcul.interetsCumules || "135 336 €"}</p>
                    </div>
                  </div>
                </div>
              )}

                {/* Graphique */}
                <div className="h-64 sm:h-80">
                  <Bar data={chartData} options={chartOptions} />
                </div>

              {/* H3: L'avantage de la préparation progressive */}
              {pageContent.section1?.avantage && (
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">
                    {pageContent.section1.avantage.h3 || "L'avantage de la préparation progressive"}
                  </h3>
                  {(pageContent.section1.avantage.paragraphs || [
                    "Plus on commence tôt, plus l'effort d'épargne est faible.",
                    "Grâce à l'effet de capitalisation, un effort régulier dès 35 ou 40 ans permet de sécuriser un capital solide pour l'avenir.",
                    "Azalée Patrimoine vous aide à définir le bon rythme d'investissement, en fonction de votre horizon, de vos revenus et de vos objectifs de vie."
                  ]).map((paragraph, index) => (
                    <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* H3: Bon à savoir */}
              {pageContent.section1?.bonASavoir && (
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">
                    {pageContent.section1.bonASavoir.h3 || "Bon à savoir"}
                  </h3>
                  {(pageContent.section1.bonASavoir.paragraphs || [
                    "Un cadre salarié perd en moyenne 30 à 40% de ses revenus à la retraite pour maintenir le même niveau de vie.",
                    "Prenons un exemple concret : si vous percevez 100 000 € de revenus annuels au moment de votre départ, votre pension représentera environ 60 000 € par an."
                  ]).map((paragraph, index) => (
                    <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              </div>

            {/* Colonne droite - FOCUS AZALÉE (sticky) */}
            {pageContent.section1?.focusAzalee && (
              <div className={`lg:col-span-1 ${isSticky ? 'lg:sticky lg:top-24' : ''}`}>
                <div className="bg-gradient-to-br from-[#1a2d47] to-[#253F60] rounded-xl shadow-2xl p-6 sm:p-8 text-white">
                  <h3 className="text-[#B99066] text-xl sm:text-2xl font-cairo font-bold mb-2 uppercase">
                    {pageContent.section1.focusAzalee.title || "Focus Azalée"}
                  </h3>
                  <h4 className="text-white text-lg font-cairo font-semibold mb-6">
                    {pageContent.section1.focusAzalee.h4 || "Le choc de revenus à la retraite"}
                  </h4>

                  {/* Le saviez-vous */}
                  {pageContent.section1.focusAzalee.leSaviezVous && (
                    <div className="mb-6 pb-6 border-b border-white/20">
                      <h5 className="text-[#B99066] font-cairo font-bold mb-3 text-sm uppercase">
                        {pageContent.section1.focusAzalee.leSaviezVous.title || "Le saviez-vous ?"}
                      </h5>
                      <p className="text-sm font-inter leading-relaxed">
                        {pageContent.section1.focusAzalee.leSaviezVous.text || "Un cadre salarié perd en moyenne 30 à 40% de son revenu au moment du passage à la retraite."}
                      </p>
                    </div>
                  )}

                  {/* Exemple concret */}
                  {pageContent.section1.focusAzalee.exemple && (
                    <div className="mb-6 pb-6 border-b border-white/20">
                      <h5 className="text-[#B99066] font-cairo font-bold mb-3 text-sm uppercase">
                        {pageContent.section1.focusAzalee.exemple.title || "Exemple concret"}
                      </h5>
                      <div className="space-y-2 text-sm font-inter">
                        <div>
                          <span className="text-[#B99066] font-semibold">{pageContent.section1.focusAzalee.exemple.revenuAvant || "Revenu avant retraite : 100 000 €/an"}</span>
                        </div>
                        <div>
                          <span className="text-[#B99066] font-semibold">{pageContent.section1.focusAzalee.exemple.pensionEstimee || "Pension estimée : 60 000 €/an"}</span>
                        </div>
                        <div>
                          <span className="text-red-300 font-semibold">{pageContent.section1.focusAzalee.exemple.perteAnnuelle || "Perte annuelle : 40 000 €"}</span>
                        </div>
                        {(pageContent.section1.focusAzalee.exemple.details || [
                          "Sur une espérance de vie moyenne de 25 ans, cela représente : près d'1 million d'euros de pouvoir d'achat en moins sur la durée de la retraite.",
                          "Et en tenant compte d'une fiscalité à 30%, la perte réelle s'élève à environ 28 000 € nets par an."
                        ]).map((detail, index) => (
                          <p key={index} className="text-xs leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pourquoi anticiper */}
                  {pageContent.section1.focusAzalee.pourquoiAnticiper && (
                    <div>
                      <h5 className="text-[#B99066] font-cairo font-bold mb-3 text-sm uppercase">
                        {pageContent.section1.focusAzalee.pourquoiAnticiper.title || "Pourquoi anticiper :"}
                      </h5>
                      <ul className="space-y-2 text-sm font-inter">
                        {(pageContent.section1.focusAzalee.pourquoiAnticiper.items || [
                          "Travaux d'amélioration du logement",
                          "Voyages, loisirs, activités associatives",
                          "Séjours en famille ou avec les petits-enfants"
                        ]).map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#B99066] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {pageContent.section1.focusAzalee.pourquoiAnticiper.conclusion && (
                        <p className="mt-4 text-xs italic leading-relaxed">
                          {pageContent.section1.focusAzalee.pourquoiAnticiper.conclusion}
                        </p>
                      )}
                    </div>
                  )}

                {/* Logo Azalée */}
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-xs font-cairo font-bold text-[#B99066]">AZALÉE PATRIMOINE</p>
                </div>
              </div>
              </div>
            )}
          </div>

          {/* Suite Section 1 - Perte de revenus */}
          {pageContent.section1?.perteRevenus && (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20 mb-8">
              <div className="flex items-start gap-4 mb-4">
                <svg className="w-6 h-6 text-[#253F60] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                  {pageContent.section1.perteRevenus.text || "Cela signifie une baisse de 40 000 € de revenus chaque année."}
                </p>
              </div>
              {(pageContent.section1.perteRevenus.paragraphs || [
                "Sur une espérance de vie moyenne de 23 ans à la retraite, cette perte de pouvoir d'achat atteint près d'un million d'euros cumulés.",
                "Et si l'on tient compte d'une <span className=\"font-semibold text-pink-600\">tranche marginale d'imposition</span> à 30%, la perte réelle de revenu disponible s'élève encore à environ 28 000 € nets par an.",
                "Certes, la retraite s'accompagne souvent d'une réduction des charges courantes — moins de crédits ou d'enfants à charge —, mais de nouvelles dépenses apparaissent :"
              ]).map((paragraph, index) => (
                <p key={index} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4 ml-10" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
              ))}
              {pageContent.section1.perteRevenus.depenses && (
                <ul className="list-disc list-inside text-[#4B5563] text-base font-inter space-y-2 ml-10 mb-4">
                  {(pageContent.section1.perteRevenus.depenses || []).map((depense, index) => (
                    <li key={index}>{depense}</li>
                  ))}
                </ul>
              )}
              {pageContent.section1.perteRevenus.conclusion && (
                <div className="mt-6">
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed font-semibold">
                    {pageContent.section1.perteRevenus.conclusion}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Section 2: Évaluer vos besoins futurs */}
      <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            {pageContent.section2?.h2 || "Évaluer vos besoins futurs"}
          </h2>

          {pageContent.section2?.simuler && (
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                {pageContent.section2.simuler.h3 || "Simuler sa pension de retraite"}
              </h3>
              {(pageContent.section2.simuler.paragraphs || [
                "Avant toute stratégie, il est essentiel de connaître le montant prévisionnel de sa pension.",
                "Azalée Patrimoine accompagne ses clients dans la lecture de leurs relevés de carrière et la simulation personnalisée de leur retraite.",
                "Vous pouvez également consulter les portails officiels tels que info-retraite.fr."
              ]).map((paragraph, index) => (
                <p key={index} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {pageContent.section2.simuler.link && (
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#253F60] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                    {pageContent.section2.simuler.link.text || "Pour aller plus loin : découvrez notre outil de"} <Link href={pageContent.section2.simuler.link.url || "/retraite/simulation"} className="font-semibold text-[#B99066] hover:text-[#D4A574] underline">{pageContent.section2.simuler.link.text?.includes("simulation") ? "simulation retraite" : "simulation retraite"}</Link> {pageContent.section2.simuler.link.text?.includes("estimer") ? "" : "pour estimer votre future pension."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: S'organiser pour partir à la retraite à 50 ans */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-8 text-center">
            {pageContent.section3?.h2 || "S'organiser pour partir à la retraite à 50 ans : un objectif atteignable avec une stratégie patrimoniale solide"}
            </h2>

          {/* Introduction */}
          {pageContent.section3?.intro && (
            <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl shadow-lg p-8 sm:p-10 mb-12 text-white">
              <p className="text-xl sm:text-2xl font-cairo font-bold mb-6">
                {pageContent.section3.intro.title || "Partir à la retraite à 50 ans, c'est possible."}
              </p>
              {(pageContent.section3.intro.paragraphs || [
                "En construisant une stratégie patrimoniale bien structurée — placements, fiscalité, revenus passifs — il est envisageable d'atteindre la liberté financière avant l'âge légal.",
                "Prendre sa retraite à 50 ans : un rêve pour beaucoup, une réalité pour certains.",
                "Atteindre la liberté financière à mi-parcours de sa vie professionnelle nécessite plus qu'une simple épargne. C'est une stratégie globale, structurée, et adaptée à chaque étape de votre parcours.",
                "Chez Azalée Patrimoine, nous accompagnons depuis plus de 20 ans les dirigeants, professions libérales et cadres supérieurs dans la construction d'une indépendance financière durable."
              ]).map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg font-inter leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* H3.1: Comprendre la différence */}
          {pageContent.section3?.comprendre && (
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                {pageContent.section3.comprendre.h3 || "Comprendre la différence entre retraite légale et indépendance financière"}
              </h3>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                {(pageContent.section3.comprendre.paragraphs || []).map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                ))}
              </div>
            </div>
          )}

          {/* H3.2: Pourquoi vouloir partir à 50 ans */}
          {pageContent.section3?.pourquoi && (
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                {pageContent.section3.pourquoi.h3 || "Pourquoi vouloir partir à 50 ans ?"}
              </h3>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                {(pageContent.section3.pourquoi.paragraphs || []).map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* H3.3: Combien faut-il */}
          {pageContent.section3?.combien && (
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                {pageContent.section3.combien.h3 || "Combien faut-il pour partir à la retraite à 50 ans ?"}
              </h3>
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20 mb-6">
                <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                  {pageContent.section3.combien.intro || "Le montant nécessaire pour prendre sa retraite à 50 ans dépend de votre train de vie, de votre capacité d'épargne et du rendement de vos placements."}
                </p>
                <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                  {pageContent.section3.combien.estimation || "Voici une estimation simple pour visualiser votre objectif, à 4% net de rendement :"}
                </p>

                {/* Tableau */}
                {pageContent.section3.combien.tableau && pageContent.section3.combien.tableau.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white">
                          <th className="border border-[#253F60] px-4 py-3 text-left font-cairo font-bold">Niveau de vie souhaité</th>
                          <th className="border border-[#253F60] px-4 py-3 text-left font-cairo font-bold">Capital estimé à 50 ans</th>
                          <th className="border border-[#253F60] px-4 py-3 text-left font-cairo font-bold">Rendement moyen net</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageContent.section3.combien.tableau.map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white hover:bg-[#F9FAFB]" : "bg-[#F9FAFB] hover:bg-white"}>
                            <td className="border border-[#E5E7EB] px-4 py-3 font-inter text-[#4B5563]">{row.niveau}</td>
                            <td className="border border-[#E5E7EB] px-4 py-3 font-cairo font-bold text-[#253F60]">{row.capital}</td>
                            <td className="border border-[#E5E7EB] px-4 py-3 font-inter text-[#4B5563]">{row.rendement}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {pageContent.section3.combien.note && (
                  <p className="text-[#6B7280] text-sm font-inter italic mt-4 mb-6">
                    {pageContent.section3.combien.note}
                  </p>
                )}

                {pageContent.section3.combien.cta && (
                  <a
                    href={pageContent.section3.combien.cta.link || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {pageContent.section3.combien.cta.text || "Simulez votre indépendance financière avec un conseiller Azalée Patrimoine"}
                  </a>
                )}
              </div>

              {/* H3: Calculez votre plan */}
              {pageContent.section3?.calculer && (
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl shadow-lg p-6 sm:p-8 mb-6 text-white">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#B99066] font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-cairo font-bold mb-3">
                        {pageContent.section3.calculer.h3 || "Calculez votre plan d'indépendance financière"}
                      </h3>
                      <p className="text-base font-inter leading-relaxed mb-4">
                        {pageContent.section3.calculer.description || "Découvrez combien vous devez épargner et comment structurer vos placements pour atteindre la liberté financière à 50 ans."}
                      </p>
                      {pageContent.section3.calculer.cta && (
                        <a
                          href={pageContent.section3.calculer.cta.link || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-white text-[#253F60] px-6 py-3 rounded-lg shadow-lg font-inter font-bold text-sm hover:bg-gray-100 transition-all duration-300"
                        >
                          {pageContent.section3.calculer.cta.text || "Prendre rendez-vous avec un conseiller Azalée"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* H3: Construire son plan */}
              {pageContent.section3?.construire && (
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
                  <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-6">
                    {pageContent.section3.construire.h3 || "Construire son plan d'indépendance financière"}
                  </h3>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                    {pageContent.section3.construire.intro || "Une stratégie de retraite anticipée s'appuie sur la structuration de ses revenus, la diversification des placements et l'optimisation fiscale."}
                  </p>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                    {pageContent.section3.construire.description || "Une retraite anticipée se prépare comme un projet d'entreprise. Voici les étapes clés :"}
                  </p>

                  {pageContent.section3.construire.etapes && pageContent.section3.construire.etapes.map((etape, index) => (
                    <div key={index} className={index < pageContent.section3.construire.etapes.length - 1 ? "mb-6 pb-6 border-b border-[#E5E7EB]" : ""}>
                      <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-3">
                        {etape.h4}
                      </h4>
                      {etape.text && (
                        <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                          {etape.text}
                        </p>
                      )}
                      {etape.items && (
                        <ul className="space-y-3 text-[#4B5563] text-base font-inter mt-3">
                          {etape.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <span className="text-[#B99066] mt-1 font-bold">•</span>
                              <span dangerouslySetInnerHTML={{ __html: processHTMLForRender(item) }} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Cas pratique */}
      {pageContent.section4 && (
        <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-green-600 text-3xl">★</span>
              {pageContent.section4.h2 || "Cas pratique : Philippe, kinésithérapeute accompagné par Azalée Patrimoine"}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {pageContent.section4.intro || "Exemple concret : comment une stratégie patrimoniale bien construite permet à un professionnel libéral de ralentir à 50 ans tout en conservant son confort de vie."}
              </p>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
                {pageContent.section4.contexte || "Philippe, kinésithérapeute libéral, a confié la gestion de sa stratégie patrimoniale à Azalée Patrimoine il y a 20 ans. Son objectif : se concentrer sur son métier, tout en construisant un patrimoine à long terme."}
              </p>

              {/* Notre accompagnement */}
              {pageContent.section4.accompagnement && (
                <div className="mb-8">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                    {pageContent.section4.accompagnement.h3 || "Notre accompagnement :"}
                  </h3>
                  <ul className="space-y-4 text-[#4B5563] text-base font-inter">
                    {(pageContent.section4.accompagnement.items || []).map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Résultats */}
              {pageContent.section4.resultats && (
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-6 text-[#B99066]">
                    {pageContent.section4.resultats.h3 || "Résultats 20 ans plus tard :"}
                  </h3>
                  <ul className="space-y-4 text-base font-inter">
                    {(pageContent.section4.resultats.items || []).map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                        <span dangerouslySetInnerHTML={{ __html: processHTMLForRender(item) }} />
                      </li>
                    ))}
                  </ul>
                  {(pageContent.section4.resultats.conclusion || pageContent.section4.resultats.secret) && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                      {pageContent.section4.resultats.conclusion && (
                        <p className="text-lg font-inter leading-relaxed mb-3">
                          {pageContent.section4.resultats.conclusion}
                        </p>
                      )}
                      {pageContent.section4.resultats.secret && (
                        <p className="text-base font-inter italic text-[#B99066]">
                          {pageContent.section4.resultats.secret}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Section 5: Les erreurs à éviter */}
      {pageContent.section5 && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-red-600 text-3xl">⛔</span>
              {pageContent.section5.h2 || "Les erreurs à éviter"}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-red-200">
              {pageContent.section5.errors && pageContent.section5.errors.length > 0 && (
                <ul className="space-y-6 text-[#4B5563] text-base sm:text-lg font-inter mb-8">
                  {pageContent.section5.errors.map((error, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="text-red-600 mt-1 font-bold text-xl">•</span>
                      <span dangerouslySetInnerHTML={{ __html: processHTMLForRender(error) }} />
                    </li>
                  ))}
                </ul>
              )}
              {pageContent.section5.conclusion && (
                <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-lg p-6 text-white">
                  <p className="text-base sm:text-lg font-inter leading-relaxed">
                    {pageContent.section5.conclusion}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Section 6: L'accompagnement Azalée Patrimoine */}
      {pageContent.section6 && (
        <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-pink-600 text-3xl">💬</span>
              {pageContent.section6.h2 || "L'accompagnement Azalée Patrimoine"}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8 text-center">
                {pageContent.section6.intro || "Azalée Patrimoine, cabinet indépendant de gestion de patrimoine, accompagne depuis plus de 20 ans les dirigeants et professions libérales dans leur stratégie de retraite et d'indépendance financière."}
              </p>

              {/* Nos engagements */}
              {pageContent.section6.engagements && (
                <div className="mb-8">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                    {pageContent.section6.engagements.h3 || "Nos engagements"}
                  </h3>
                  <div className="space-y-6">
                    {(pageContent.section6.engagements.items || []).map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 text-white font-cairo font-bold">
                          {item.number || (index + 1)}
                        </div>
                        <div>
                          <h4 className="text-[#253F60] font-cairo font-bold mb-2">{item.title}</h4>
                          <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Mission */}
              {pageContent.section6.mission && (
                <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl shadow-lg p-6 sm:p-8 text-white text-center">
                  <p className="text-xl sm:text-2xl font-cairo font-bold mb-4">
                    {pageContent.section6.mission.title || "Notre mission"}
                  </p>
                  <p className="text-lg sm:text-xl font-inter leading-relaxed">
                    {pageContent.section6.mission.text || "Transformer vos revenus en patrimoine, et votre patrimoine en liberté."}
                  </p>
                </div>
              )}
            </div>

            {/* Prêt à planifier */}
            {pageContent.section6.pret && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-6 h-6 bg-[#253F60] rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h2 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
                      {pageContent.section6.pret.h2 || "Prêt à planifier votre retraite à 50 ans ?"}
                    </h2>
                    <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                      {pageContent.section6.pret.question || "Prêt à construire votre indépendance financière ?"}
                    </p>
                    {pageContent.section6.pret.link && (
                      <a
                        href={pageContent.section6.pret.link.url || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white px-6 py-3 rounded-lg font-inter font-semibold hover:from-[#A67A5A] hover:to-[#B99066] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-4"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {pageContent.section6.pret.link.text || "Échangez avec un conseiller Azalée Patrimoine dès aujourd'hui."}
                      </a>
                    )}
                  </div>
                </div>

                {/* Contact */}
                {pageContent.section6.pret.contact && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#E5E7EB]">
                    {pageContent.section6.pret.contact.rendezVous && (
                      <div className="flex items-center gap-4">
                        <svg className="w-6 h-6 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <a
                          href={pageContent.section6.pret.contact.rendezVous.url || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B99066] font-inter font-semibold hover:text-[#A67C52] transition-colors"
                        >
                          {pageContent.section6.pret.contact.rendezVous.label || "Prendre rendez-vous"}
                        </a>
                      </div>
                    )}
                    {pageContent.section6.pret.contact.email && (
                      <div className="flex items-center gap-4">
                        <svg className="w-6 h-6 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a
                          href={pageContent.section6.pret.contact.email.url || "mailto:contact@azalee-patrimoine.fr"}
                          className="text-[#B99066] font-inter font-semibold hover:text-[#A67C52] transition-colors"
                        >
                          {pageContent.section6.pret.contact.email.label || "contact@azalee-patrimoine.fr"}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 7: Rachat de trimestres ou versement déductible dans le PER */}
      {pageContent.section7 && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-8 text-center">
              {pageContent.section7.h2 || "Rachat de trimestres ou versement déductible dans le PER ?"}
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {pageContent.section7.intro || "Lorsqu'il s'agit de préparer sa retraite, deux leviers fiscaux majeurs se présentent :"}
              </p>
              {pageContent.section7.leviers && pageContent.section7.leviers.length > 0 && (
                <ul className="space-y-4 mb-6">
                  {pageContent.section7.leviers.map((levier, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#B99066] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[#4B5563] text-base sm:text-lg font-inter">{levier}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                {pageContent.section7.description || "Tous deux permettent de réduire son impôt sur le revenu tout en améliorant sa retraite future — mais leur impact financier n'est pas du même ordre."}
              </p>
            </div>

          {/* H3.1: Le rachat de trimestres */}
          {pageContent.section7?.rachatTrimestres && (
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center text-white font-cairo font-bold text-sm">
                  ①
                </span>
                {pageContent.section7.rachatTrimestres.h3 || "Le rachat de trimestres : optimiser la retraite de base"}
              </h3>
              <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                {pageContent.section7.rachatTrimestres.description || "Le rachat de trimestres consiste à verser une somme à l'administration pour compléter des années incomplètes et atteindre le taux plein plus tôt."}
              </p>
              {pageContent.section7.rachatTrimestres.permet && pageContent.section7.rachatTrimestres.permet.length > 0 && (
                <>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                    Cela permet :
                  </p>
                  <ul className="space-y-3 text-[#4B5563] text-base font-inter mb-6">
                    {pageContent.section7.rachatTrimestres.permet.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {pageContent.section7.rachatTrimestres.important && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <p className="text-[#4B5563] text-sm font-inter leading-relaxed">
                    <strong className="text-[#253F60]">Important :</strong> {pageContent.section7.rachatTrimestres.important}
                  </p>
                </div>
              )}

              {/* Exemple concret */}
              {pageContent.section7.rachatTrimestres.exemple && (
                <div className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB] mb-6">
                  <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-4">
                    {pageContent.section7.rachatTrimestres.exemple.h4 || "Exemple concret"}
                  </h4>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                    {pageContent.section7.rachatTrimestres.exemple.contexte || "Un cadre ayant cotisé au plafond de la Sécurité sociale toute sa carrière, mais manquant de 8 trimestres (2 ans) pour atteindre le taux plein."}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pageContent.section7.rachatTrimestres.exemple.sansRachat && (
                      <div className="bg-white rounded-lg p-4 border-2 border-red-200">
                        <h5 className="text-red-600 font-cairo font-bold mb-3">{pageContent.section7.rachatTrimestres.exemple.sansRachat.title}</h5>
                        <p className="text-sm text-[#4B5563] mb-2">{pageContent.section7.rachatTrimestres.exemple.sansRachat.decote}</p>
                        <p className="text-lg font-cairo font-bold text-[#253F60]">{pageContent.section7.rachatTrimestres.exemple.sansRachat.montant}</p>
                      </div>
                    )}
                    {pageContent.section7.rachatTrimestres.exemple.avecRachat && (
                      <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                        <h5 className="text-green-600 font-cairo font-bold mb-3">{pageContent.section7.rachatTrimestres.exemple.avecRachat.title}</h5>
                        <p className="text-sm text-[#4B5563] mb-2">{pageContent.section7.rachatTrimestres.exemple.avecRachat.cout}</p>
                        <p className="text-lg font-cairo font-bold text-[#253F60]">{pageContent.section7.rachatTrimestres.exemple.avecRachat.montant}</p>
                        <p className="text-sm text-green-600 font-semibold mt-2">{pageContent.section7.rachatTrimestres.exemple.avecRachat.gain}</p>
                      </div>
                    )}
                  </div>
                  {pageContent.section7.rachatTrimestres.exemple.calcul && (
                    <div className="mt-4 p-4 bg-[#F5F0E8] rounded-lg">
                      <p className="text-sm text-[#4B5563] font-inter">
                        <strong className="text-[#253F60]">{pageContent.section7.rachatTrimestres.exemple.calcul.gainAnnuel}</strong> | <strong className="text-[#253F60]">{pageContent.section7.rachatTrimestres.exemple.calcul.amortissement}</strong>
                      </p>
                      {pageContent.section7.rachatTrimestres.exemple.calcul.profilFort && (
                        <p className="text-sm text-[#4B5563] font-inter mt-2">
                          <strong className="text-[#253F60]">Pour un profil à fort revenu (taux marginal 41%) :</strong> {pageContent.section7.rachatTrimestres.exemple.calcul.profilFort}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {pageContent.section7.rachatTrimestres.inconvenients && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <p className="text-sm text-[#4B5563] font-inter leading-relaxed">
                    <strong className="text-[#253F60]">Inconvénients :</strong> {pageContent.section7.rachatTrimestres.inconvenients}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* H3.2: Le versement déductible dans le PER */}
          {pageContent.section7?.versementPER && (
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center text-white font-cairo font-bold text-sm">
                  ②
                </span>
                {pageContent.section7.versementPER.h3 || "Le versement déductible dans le PER : capitaliser pour soi"}
              </h3>
              <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                {pageContent.section7.versementPER.description || "À l'inverse du rachat de trimestres, le PER individuel permet de déduire ses versements tout en investissant dans des supports dynamiques : fonds en euros, unités de compte, SCPI, produits structurés, etc."}
              </p>

              {/* Exemple PER */}
              {pageContent.section7.versementPER.exemple && (
                <div className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB] mb-6">
                  <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-4">
                    {pageContent.section7.versementPER.exemple.h4 || "Exemple (même contribuable à 50 ans, imposé à 41%, versant 35 000 € en PER)"}
                  </h4>
                  <div className="space-y-4">
                    {pageContent.section7.versementPER.exemple.economie && (
                      <div className="bg-white rounded-lg p-4 border-2 border-[#253F60]">
                        <p className="text-sm text-[#6B7280] mb-1">{pageContent.section7.versementPER.exemple.economie.label}</p>
                        <p className="text-2xl font-cairo font-bold text-[#253F60]">{pageContent.section7.versementPER.exemple.economie.montant}</p>
                        <p className="text-xs text-[#6B7280] mt-1">{pageContent.section7.versementPER.exemple.economie.note}</p>
                      </div>
                    )}
                    {pageContent.section7.versementPER.exemple.capital && (
                      <div className="bg-white rounded-lg p-4 border-2 border-[#B99066]">
                        <p className="text-sm text-[#6B7280] mb-1">{pageContent.section7.versementPER.exemple.capital.label}</p>
                        <p className="text-2xl font-cairo font-bold text-[#B99066]">{pageContent.section7.versementPER.exemple.capital.montant}</p>
                        <p className="text-xs text-[#6B7280] mt-1">{pageContent.section7.versementPER.exemple.capital.note}</p>
                      </div>
                    )}
                    {pageContent.section7.versementPER.exemple.hypothese && (
                      <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-lg p-4 text-white">
                        <p className="text-sm mb-1">{pageContent.section7.versementPER.exemple.hypothese.label}</p>
                        <p className="text-2xl font-cairo font-bold">{pageContent.section7.versementPER.exemple.hypothese.montant}</p>
                        <p className="text-xs mt-1 opacity-90">{pageContent.section7.versementPER.exemple.hypothese.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {pageContent.section7.versementPER.avantages && pageContent.section7.versementPER.avantages.length > 0 && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <p className="text-sm text-[#4B5563] font-inter leading-relaxed mb-3">
                    <strong className="text-[#253F60]">Avantages par rapport au rachat de trimestres :</strong>
                  </p>
                  <ul className="space-y-2 text-sm text-[#4B5563] font-inter">
                    {pageContent.section7.versementPER.avantages.map((avantage, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{avantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Quelle stratégie privilégier */}
          {pageContent.section7?.strategie && (
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                {pageContent.section7.strategie.h3 || "Quelle stratégie privilégier ?"}
              </h3>
              {pageContent.section7.strategie.points && pageContent.section7.strategie.points.length > 0 && (
                <ul className="space-y-4 text-[#4B5563] text-base font-inter mb-6">
                  {pageContent.section7.strategie.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#B99066] mt-1 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {pageContent.section7.strategie.astuce && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    <strong className="text-[#253F60]">Pour les profils patrimoniaux,</strong> {pageContent.section7.strategie.astuce}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tableau comparatif */}
          {pageContent.section7?.tableauComparatif && (
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                {pageContent.section7.tableauComparatif.h3 || "En résumé"}
              </h3>
              {pageContent.section7.tableauComparatif.criteres && pageContent.section7.tableauComparatif.criteres.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white">
                        <th className="border border-[#253F60] px-4 py-3 text-left font-cairo font-bold">Critère</th>
                        <th className="border border-[#253F60] px-4 py-3 text-left font-cairo font-bold">Rachat de trimestres</th>
                        <th className="border border-[#253F60] px-4 py-3 text-left font-cairo font-bold">Versement PER</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.section7.tableauComparatif.criteres.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white hover:bg-[#F9FAFB]" : "bg-[#F9FAFB] hover:bg-white"}>
                          <td className="border border-[#E5E7EB] px-4 py-3 font-inter font-semibold text-[#253F60]">{row.critere}</td>
                          <td className="border border-[#E5E7EB] px-4 py-3 font-inter text-[#4B5563]">{row.rachat}</td>
                          <td className="border border-[#E5E7EB] px-4 py-3 font-inter text-[#4B5563]">{row.per}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {pageContent.section7.tableauComparatif.liens && pageContent.section7.tableauComparatif.liens.length > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  {pageContent.section7.tableauComparatif.liens.map((lien, index) => (
                    <a
                      key={index}
                      href={lien.url}
                      target={lien.url.startsWith('http') ? '_blank' : undefined}
                      rel={lien.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-[#B99066] font-inter font-semibold hover:text-[#A67A5A] transition-colors"
                    >
                      {lien.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      )}

      {/* Section 8: Racheter des trimestres : est-ce rentable ? */}
      {pageContent.section8 && (
        <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-8 text-center">
              {pageContent.section8.h2 || "Racheter des trimestres : est-ce rentable ?"}
            </h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
              {pageContent.section8.paragraphs && pageContent.section8.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {pageContent.section8.enSavoirPlus && (
                <div className="flex items-start gap-4 bg-[#F5F0E8] border-l-4 border-[#B99066] p-4 rounded">
                  <svg className="w-6 h-6 text-[#B99066] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-[#253F60] font-inter font-semibold mb-1">{pageContent.section8.enSavoirPlus.label || "En savoir plus"}</p>
                    <Link href={pageContent.section8.enSavoirPlus.url || "/retraite/rachat-trimestres"} className="text-[#B99066] hover:text-[#D4A574] font-inter underline">
                      {pageContent.section8.enSavoirPlus.text || "Rachat de trimestres - optimiser sa fin de carrière"}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Déterminer le capital nécessaire */}
            {pageContent.section8.determiner && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section8.determiner.h3 || "Déterminer le capital nécessaire"}
                </h3>
                {pageContent.section8.determiner.paragraphs && pageContent.section8.determiner.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 9: Les solutions d'épargne retraite */}
      {pageContent.section9 && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* CTA en haut */}
            {pageContent.section9.cta && (
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-6 mb-12 text-white text-center">
                <p className="text-base sm:text-lg font-inter mb-4">
                  {pageContent.section9.cta.text || "Simulez votre retraite avec un conseiller Azalée Patrimoine :"}
                </p>
                {pageContent.section9.cta.link && (
                  <a
                    href={pageContent.section9.cta.link.url || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#B99066] font-inter font-semibold hover:text-[#A67C52] transition-colors underline decoration-wavy"
                  >
                    <span className="text-green-400">✓</span>
                    {pageContent.section9.cta.link.text || "Réaliser mon diagnostic retraite personnalisé"}
                  </a>
                )}
              </div>
            )}

            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {pageContent.section9.h2 || "Les solutions d'épargne retraite"}
            </h2>

            {/* H3: Le PER */}
            {pageContent.section9.per && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section9.per.h3 || "Le Plan Épargne Retraite (PER)"}
                </h3>
                <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                  {pageContent.section9.per.description || "Le PER individuel est aujourd'hui la solution la plus complète pour préparer sa retraite."}
                </p>
                {pageContent.section9.per.permet && pageContent.section9.per.permet.length > 0 && (
                  <>
                    <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                      Il permet :
                    </p>
                    <ul className="space-y-3 text-[#4B5563] text-base font-inter mb-6">
                      {pageContent.section9.per.permet.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {pageContent.section9.per.lien && (
                  <p className="text-[#4B5563] text-base font-inter">
                    À lire aussi : <Link href={pageContent.section9.per.lien.url || "/fiscalite/per"} className="text-[#B99066] hover:text-[#D4A574] underline">{pageContent.section9.per.lien.text || "Fiscalité du PER - optimiser ses déductions d'impôt"}</Link>.
                  </p>
                )}
              </div>
            )}
            
            {/* H3: L'assurance-vie */}
            {pageContent.section9.assuranceVie && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section9.assuranceVie.h3 || "L'assurance-vie à long terme"}
                </h3>
                <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                  {pageContent.section9.assuranceVie.description || "Souple et accessible, l'assurance-vie permet d'allier capitalisation et transmission. Elle constitue un complément idéal du PER, notamment pour les épargnants souhaitant garder une certaine liquidité avant la retraite."}
                </p>
                {pageContent.section9.assuranceVie.lien && (
                  <p className="text-[#4B5563] text-base font-inter">
                    En savoir plus sur <Link href={pageContent.section9.assuranceVie.lien.url || "/placements/assurance-vie"} className="text-[#B99066] hover:text-[#D4A574] underline">{pageContent.section9.assuranceVie.lien.text || "l'assurance-vie dans une stratégie patrimoniale"}</Link>.
                  </p>
                )}
              </div>
            )}

            {/* H3: L'investissement immobilier */}
            {pageContent.section9.immobilier && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section9.immobilier.h3 || "L'investissement immobilier locatif"}
                </h3>
                {pageContent.section9.immobilier.paragraphs && pageContent.section9.immobilier.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                ))}
                {pageContent.section9.immobilier.lien && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#253F60] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[#4B5563] text-base font-inter">
                      <Link href={pageContent.section9.immobilier.lien.url || "/immobilier"} className="text-[#B99066] hover:text-[#D4A574] underline font-semibold">{pageContent.section9.immobilier.lien.text || "Consultez notre page Investissement immobilier pour découvrir nos stratégies locatives durables."}</Link>
                    </p>
                  </div>
                )}
              </div>
            )}
          
            {/* H3: Les placements financiers */}
            {pageContent.section9.placements && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section9.placements.h3 || "Les placements financiers complémentaires"}
                </h3>
                {pageContent.section9.placements.paragraphs && pageContent.section9.placements.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 10: Comment défiscaliser */}
      {pageContent.section10 && (
        <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {pageContent.section10.h2 || "Comment défiscaliser en préparant sa retraite"}
            </h2>
            
            {/* H3: Le levier fiscal du PER */}
            {pageContent.section10.levierPER && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section10.levierPER.h3 || "Le levier fiscal du PER"}
                </h3>
                <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                  {pageContent.section10.levierPER.description || "Le PER permet une déduction fiscale immédiate des versements, souvent supérieure au rendement financier espéré."}
                </p>
                {pageContent.section10.levierPER.exemple && (
                  <div className="bg-[#F5F0E8] border-l-4 border-[#B99066] p-4 rounded mb-4">
                    <p className="text-[#4B5563] text-base font-inter" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section10.levierPER.exemple) }} />
                  </div>
                )}
                {pageContent.section10.levierPER.conclusion && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    {pageContent.section10.levierPER.conclusion}
                  </p>
                )}
              </div>
            )}
              
            {/* H3: Les dispositifs immobiliers */}
            {pageContent.section10.dispositifsImmo && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section10.dispositifsImmo.h3 || "Les dispositifs immobiliers adaptés"}
                </h3>
                <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                  {pageContent.section10.dispositifsImmo.description || "Certains investissements immobiliers permettent d'allier rendement et réduction d'impôt, tout en constituant un capital pour la retraite."}
                </p>
                {pageContent.section10.dispositifsImmo.intro && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                    {pageContent.section10.dispositifsImmo.intro}
                  </p>
                )}
                {pageContent.section10.dispositifsImmo.dispositifs && pageContent.section10.dispositifsImmo.dispositifs.length > 0 && (
                  <div className="space-y-6">
                    {pageContent.section10.dispositifsImmo.dispositifs.map((dispositif, index) => (
                      <div key={index}>
                        <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-3">
                          {dispositif.h4}
                        </h4>
                        <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                          {dispositif.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {pageContent.section10.dispositifsImmo.lien && (
                  <div className="mt-6">
                    <Link href={pageContent.section10.dispositifsImmo.lien.url || "/immobilier"} className="text-[#B99066] hover:text-[#D4A574] font-inter underline">
                      {pageContent.section10.dispositifsImmo.lien.text || "Découvrez nos stratégies combinant immobilier et retraite sur la page Investissement immobilier."}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* H3: Arbitrer entre économie d'impôt et liquidité */}
            {pageContent.section10.arbitrer && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section10.arbitrer.h3 || "Arbitrer entre économie d'impôt et liquidité"}
                </h3>
                {pageContent.section10.arbitrer.paragraphs && pageContent.section10.arbitrer.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
                {pageContent.section10.arbitrer.approche && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                    {pageContent.section10.arbitrer.approche}
                  </p>
                )}
                {pageContent.section10.arbitrer.produits && pageContent.section10.arbitrer.produits.length > 0 && (
                  <ul className="space-y-3 text-[#4B5563] text-base font-inter mb-6">
                    {pageContent.section10.arbitrer.produits.map((produit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span>{produit}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {pageContent.section10.arbitrer.lien && (
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#253F60] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[#4B5563] text-base font-inter">
                      {pageContent.section10.arbitrer.lien.text || "Pour aller plus loin : découvrez notre pilier"} <Link href={pageContent.section10.arbitrer.lien.url || "/fiscalite"} className="text-[#B99066] hover:text-[#D4A574] underline">Fiscalité</Link> {pageContent.section10.arbitrer.lien.text && !pageContent.section10.arbitrer.lien.text.includes("Fiscalité") ? "pour comprendre comment les solutions retraite s'intègrent à votre stratégie globale." : ""}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 11: Retraite, transmission et prévoyance */}
      {pageContent.section11 && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {pageContent.section11.h2 || "Retraite, transmission et prévoyance : penser globalement"}
            </h2>
            
            {/* H3: Anticiper la transmission */}
            {pageContent.section11.transmission && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section11.transmission.h3 || "Anticiper la transmission de son patrimoine retraite"}
                </h3>
                {pageContent.section11.transmission.paragraphs && pageContent.section11.transmission.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                ))}
                {pageContent.section11.transmission.intro && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                    {pageContent.section11.transmission.intro}
                  </p>
                )}
                {pageContent.section11.transmission.items && pageContent.section11.transmission.items.length > 0 && (
                  <ul className="space-y-3 text-[#4B5563] text-base font-inter mb-6">
                    {pageContent.section11.transmission.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {pageContent.section11.transmission.astuce && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-[#4B5563] text-sm font-inter italic">
                      {pageContent.section11.transmission.astuce}
                    </p>
                  </div>
                )}
              </div>
            )}
              
            {/* H3: Protéger sa famille */}
            {pageContent.section11.prevoyance && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section11.prevoyance.h3 || "Protéger sa famille avec la prévoyance"}
                </h3>
                {pageContent.section11.prevoyance.paragraphs && pageContent.section11.prevoyance.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                ))}
                {pageContent.section11.prevoyance.lien && (
                  <Link href={pageContent.section11.prevoyance.lien.url || "/retraite/prevoyance-protection"} className="text-[#B99066] hover:text-[#D4A574] font-inter underline">
                    {pageContent.section11.prevoyance.lien.text || "En savoir plus : Prévoyance et protection familiale."}
                  </Link>
                )}
              </div>
            )}

            {/* H3: Adapter sa stratégie */}
            {pageContent.section11.adapter && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section11.adapter.h3 || "Adapter sa stratégie au moment du départ"}
                </h3>
                {pageContent.section11.adapter.intro && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                    {pageContent.section11.adapter.intro}
                  </p>
                )}
                {pageContent.section11.adapter.items && pageContent.section11.adapter.items.length > 0 && (
                  <ul className="space-y-3 text-[#4B5563] text-base font-inter mb-6">
                    {pageContent.section11.adapter.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {pageContent.section11.adapter.conclusion && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    {pageContent.section11.adapter.conclusion}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 12: L'expertise Azalée Patrimoine */}
      {pageContent.section12 && (
        <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {pageContent.section12.h2 || "L'expertise Azalée Patrimoine"}
            </h2>
            
            {/* H3: Un accompagnement humain */}
            {pageContent.section12.accompagnement && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section12.accompagnement.h3 || "Un accompagnement humain, pédagogique et durable"}
                </h3>
                {pageContent.section12.accompagnement.intro && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                    {pageContent.section12.accompagnement.intro}
                  </p>
                )}
                {pageContent.section12.accompagnement.items && pageContent.section12.accompagnement.items.length > 0 && (
                  <ul className="space-y-3 text-[#4B5563] text-base font-inter mb-6">
                    {pageContent.section12.accompagnement.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#B99066] mt-1 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {pageContent.section12.accompagnement.conclusion && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section12.accompagnement.conclusion) }} />
                )}
              </div>
            )}

            {/* H3: Un diagnostic retraite */}
            {pageContent.section12.diagnostic && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section12.diagnostic.h3 || "Un diagnostic retraite sur mesure"}
                </h3>
                {pageContent.section12.diagnostic.description && (
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-6">
                    {pageContent.section12.diagnostic.description}
                  </p>
                )}
                {pageContent.section12.diagnostic.permet && pageContent.section12.diagnostic.permet.length > 0 && (
                  <>
                    <p className="text-[#4B5563] text-base font-inter leading-relaxed mb-4">
                      Ce diagnostic permet de :
                    </p>
                    <ul className="space-y-3 text-[#4B5563] text-base font-inter mb-6">
                      {pageContent.section12.diagnostic.permet.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#B99066] mt-1 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {pageContent.section12.diagnostic.cta && (
                  <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-lg p-6 text-white">
                    <p className="text-base font-inter mb-4">
                      {pageContent.section12.diagnostic.cta.text || "Réalisez votre audit retraite offert :"}
                    </p>
                    {pageContent.section12.diagnostic.cta.link && (
                      <a
                        href={pageContent.section12.diagnostic.cta.link.url || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white font-inter font-semibold hover:text-[#B99066] transition-colors underline"
                      >
                        <strong>{pageContent.section12.diagnostic.cta.link.text || "Prendre rendez-vous avec un conseiller Azalée Patrimoine"}</strong>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* H3: Des stratégies concrètes */}
            {pageContent.section12.strategies && (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                  {pageContent.section12.strategies.h3 || "Des stratégies concrètes selon votre profil"}
                </h3>

                {/* H4: Pour les salariés */}
                {pageContent.section12.strategies.salaries && (
                  <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                    <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-3">
                      {pageContent.section12.strategies.salaries.h4 || "Pour les salariés"}
                    </h4>
                    {pageContent.section12.strategies.salaries.paragraphs && pageContent.section12.strategies.salaries.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-[#4B5563] text-base font-inter leading-relaxed mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              
                {/* H4: Pour les indépendants */}
                {pageContent.section12.strategies.independants && (
                  <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                    <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-3">
                      {pageContent.section12.strategies.independants.h4 || "Pour les indépendants et professions libérales"}
                    </h4>
                    {pageContent.section12.strategies.independants.text && (
                      <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section12.strategies.independants.text) }} />
                    )}
                  </div>
                )}

                {/* H4: Pour les dirigeants */}
                {pageContent.section12.strategies.dirigeants && (
                  <div>
                    <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-3">
                      {pageContent.section12.strategies.dirigeants.h4 || "Pour les dirigeants d'entreprise"}
                    </h4>
                    {pageContent.section12.strategies.dirigeants.text && (
                      <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                        {pageContent.section12.strategies.dirigeants.text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 13: Questions fréquentes */}
      {pageContent.section13 && (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
              {pageContent.section13.h2 || "Questions fréquentes sur la retraite"}
            </h2>
            
            {pageContent.section13.questions && pageContent.section13.questions.length > 0 && (
              <div className="space-y-4">
                {pageContent.section13.questions.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg border-2 border-[#253F60]/20 overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
                    >
                      <h3 className="text-[#253F60] text-lg sm:text-xl font-cairo font-bold pr-4">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-6 h-6 text-[#253F60] flex-shrink-0 transition-transform duration-300 ${openQuestion === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(faq.answer) }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 14: En résumé */}
      <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            En résumé
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6 text-center">
              Bien préparer sa retraite, c'est construire aujourd'hui les fondations de votre sérénité future. Avec Azalée Patrimoine, vous bénéficiez d'un accompagnement global :
            </p>
            <ul className="space-y-4 text-[#4B5563] text-base font-inter mb-8">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                <span>une stratégie patrimoniale personnalisée,</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                <span>une expertise financière et fiscale reconnue,</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                <span>et un suivi humain, indépendant et durable.</span>
              </li>
            </ul>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-[#253F60] font-inter font-semibold mb-1">Être rappelé par un conseiller</p>
                  <a href="mailto:contact@azalee-patrimoine.fr" className="text-[#B99066] font-inter hover:text-[#A67C52] transition-colors">
                    contact@azalee-patrimoine.fr
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-[#253F60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <a
                  href="https://calendly.com/rdv-azalee-patrimoine/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B99066] font-inter font-semibold hover:text-[#A67C52] transition-colors"
                >
                  Prendre rendez-vous en ligne
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* CTA Final */}
      {pageContent.ctaFinal && (
        <section className="w-full bg-gradient-to-r from-[#253F60] via-[#1e3a5a] to-[#253F60] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-4 sm:mb-6">
                {pageContent.ctaFinal.h2 || "Prêt à préparer votre retraite sereinement ?"}
              </h2>
              {pageContent.ctaFinal.description && (
                <p className="text-[#4B5563] text-base sm:text-lg font-inter mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                  {pageContent.ctaFinal.description}
                </p>
              )}
              {pageContent.ctaFinal.buttons && pageContent.ctaFinal.buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {pageContent.ctaFinal.buttons.map((button, index) => (
                    button.style === "primary" ? (
                      <a
                        key={index}
                        href={button.link || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                        target={button.link?.startsWith("http") ? "_blank" : undefined}
                        rel={button.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto"
                      >
                        {replaceGratuit(button?.text) || "Demander un diagnostic offert"}
                      </a>
                    ) : (
                      <Link
                        key={index}
                        href={button.link || "/contact"}
                        className="bg-gradient-to-r from-[#B99066] to-[#A67C52] hover:from-[#A67C52] hover:to-[#B99066] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto"
                      >
                        {replaceGratuit(button?.text) || "Nous contacter"}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
} 
