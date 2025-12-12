"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { processHTMLForRender } from '../../lib/utils/htmlConverter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Filler
} from 'chart.js';
import { Bar as ChartBar } from 'react-chartjs-2';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend,
  Filler
);



export default function ImmobilierPage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch content from CMS API
        const response = await fetch(`/api/cms/content?path=immobilier&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          // API returns { success: true, data: page.content }
          if (data.data) {
            setContent(data.data);
          } else if (data.content) {
            setContent(data.content);
          } else {
            console.warn('No content found in response, using empty object');
            setContent({});
          }
        } else {
          console.error('Failed to fetch content');
          setContent({});
        }
      } catch (e) {
        console.error("Failed to fetch immobilier page content:", e);
        setError(e.message);
        setContent({});
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    // Set up polling to refresh content every 5 seconds when page is visible
    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchContent();
      }
    }, 5000);

    // Listen for storage events (when CMS saves content, it can trigger a refresh)
    const handleStorageChange = () => {
      fetchContent();
    };
    window.addEventListener('storage', handleStorageChange);

    // Listen for custom event from CMS page (if on same origin)
    const handleContentUpdate = () => {
      fetchContent();
    };
    window.addEventListener('cmsContentUpdated', handleContentUpdate);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cmsContentUpdated', handleContentUpdate);
    };
  }, []);


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
  if (error) return <div className="text-center py-10 text-red-500">Erreur: {error}</div>;
  
  // Use CMS content with fallback
  const pageContent = content || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left card */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Contenu */}
              <div>
                <h1 className="text-[#112033] text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
                  {pageContent.hero?.h1 || "Investir dans l'immobilier avec Azalée Patrimoine"}
                </h1>
                <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                  {pageContent.hero?.description || "L'immobilier, pilier de votre indépendance financière et de la transmission familiale. Chez Azalée Patrimoine, nous considérons l'immobilier comme un socle fondamental d'un patrimoine équilibré : tangible, résilient et porteur de sens. Notre rôle est de transformer vos projets immobiliers — qu'ils soient locatifs, neufs ou patrimoniaux — en véritables stratégies d'enrichissement à long terme, intégrant rendement, fiscalité et transmission."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => window.open(pageContent.hero?.ctaButton1Link || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="inline-flex items-center justify-center bg-[#B99066] text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors"
                  >
                    {pageContent.hero?.ctaButton1 || "Demandez votre audit patrimonial personnalisé"}
                  </button>
                  <a href={pageContent.hero?.ctaButton2Link || "#pourquoi-investir"} className="inline-flex items-center justify-center bg-transparent border-2 border-[#253F60] text-[#253F60] px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#253F60] hover:text-white transition-colors">
                    {pageContent.hero?.ctaButton2 || "Découvrir nos solutions"}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right card */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white relative overflow-visible min-h-[300px]">
              {/* Cercle en coin de bloc */}
              <div className="absolute -top-6 -right-6 w-36 h-36 sm:w-44 sm:h-44 bg-white rounded-full flex items-center justify-center shadow-xl z-20">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center">
                  <div className="text-center px-2">
                    <div className="text-3xl sm:text-4xl font-cairo font-bold text-white mb-1">
                      {pageContent.hero?.rightCard?.percentage || "61,2%"}
                    </div>
                    <p className="text-[9px] sm:text-[11px] font-inter font-semibold text-white leading-tight">
                      {pageContent.hero?.rightCard?.text || "des français"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contenu principal */}
              <div className="relative z-10 pt-2">
                <p className="text-base sm:text-lg font-inter font-medium mb-8 leading-relaxed pr-24 sm:pr-32">
                  {pageContent.hero?.rightCard?.description || "61.2% des français possèdent un ou plusieurs biens immobiliers."}
                </p>
                
                <a 
                  href={pageContent.hero?.rightCard?.buttonLink || '/outils-financiers/guide-defiscalisation'}
                  className="w-full bg-white text-[#253F60] px-5 py-3 rounded-lg font-inter font-semibold hover:bg-[#F9FAFB] transition-colors text-center text-sm sm:text-base shadow-md block"
                >
                  {pageContent.hero?.rightCard?.buttonText || "Téléchargez le guide complet pour bâtir et optimiser votre patrimoine"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 : Pourquoi investir dans l'immobilier aujourd'hui ? */}
      <section id="pourquoi-investir" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              {pageContent.section2?.h2 || "Pourquoi investir dans l'immobilier aujourd'hui ?"}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-12">
            <p className="text-lg sm:text-xl lg:text-2xl font-inter text-[#374151] leading-relaxed text-center">
              {pageContent.section2?.intro || "L'immobilier reste l'actif préféré des Français, et ce n'est pas un hasard :"}
            </p>

            {/* Statistique principale */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#2d4a6b] rounded-xl p-8 sm:p-10 lg:p-12 text-white text-center shadow-xl">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-cairo mb-4 text-[#B99066]">
                {pageContent.section2?.statistic?.value || "61,2%"}
          </div>
              <p className="text-xl sm:text-2xl font-inter font-semibold mb-2">
                {pageContent.section2?.statistic?.text || "des ménages possèdent un bien immobilier"}
              </p>
              <p className="text-sm sm:text-base text-white/80 font-inter">
                {pageContent.section2?.statistic?.source || "INSEE 2024"}
              </p>
            </div>

            {/* Points clés en grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="bg-[#F9FAFB] rounded-lg p-6 border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Rendement locatif brut moyen
                    </h3>
                    <p className="text-[#374151] font-inter leading-relaxed">
                      <strong className="text-[#253F60]">5 à 6 %</strong>, voire plus selon la localisation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] rounded-lg p-6 border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Effet de levier du crédit immobilier
                    </h3>
                    <p className="text-[#374151] font-inter leading-relaxed">
                      Investir <strong className="text-[#253F60]">sans mobiliser tout son capital</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] rounded-lg p-6 border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Fiscalité avantageuse
                    </h3>
                    <p className="text-[#374151] font-inter leading-relaxed">
                      Via des dispositifs spécifiques (<strong className="text-[#253F60]">LMNP, Pinel, déficit foncier…</strong>).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] rounded-lg p-6 border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Protection et transmission
                    </h3>
                    <p className="text-[#374151] font-inter leading-relaxed">
                      Protection contre l'inflation et création d'un <strong className="text-[#253F60]">actif transmissible</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mention SCPI */}
            {pageContent.section2?.scpiMention && (
              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-8 border-2 border-[#E5E7EB] mt-10">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="azaleeGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#253F60" />
                          <stop offset="100%" stopColor="#B99066" />
                        </linearGradient>
                      </defs>
                      {/* Document avec pointeur */}
                      <rect x="5" y="3" width="14" height="18" rx="1.5" fill="url(#azaleeGradient5)" stroke="url(#azaleeGradient5)" strokeWidth="1.5"/>
                      <path d="M8 7h8M8 10h8M8 13h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M11.5 20L8 24H15L11.5 20Z" fill="url(#azaleeGradient5)"/>
                      <path d="M11.5 20L8 24H15L11.5 20Z" stroke="url(#azaleeGradient5)" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed italic text-left flex-1" dangerouslySetInnerHTML={{ __html: processHTMLForRender(`"${pageContent.section2.scpiMention}"`) }} />
                </div>
              </div>
            )}

            {/* Message Azalée avec SVG dégradé */}
            <div className="text-center mt-10 mb-8">
              <div className="inline-flex items-start gap-3 max-w-4xl mx-auto">
                <div className="flex-shrink-0 mt-2">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="azaleeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#253F60" />
                        <stop offset="100%" stopColor="#B99066" />
                      </linearGradient>
                    </defs>
                    {/* Bulle de chat avec pointeur */}
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="url(#azaleeGradient)" stroke="url(#azaleeGradient)" strokeWidth="1.5"/>
                    <path d="M10 20L8 24h4l-2-4z" fill="url(#azaleeGradient)"/>
                  </svg>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl font-inter text-[#253F60] leading-relaxed font-medium text-left" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section2?.azaleeMessage || "Chez Azalée Patrimoine, nous intégrons chaque actif immobilier dans une vision globale — financière, fiscale et humaine — pour bâtir la liberté patrimoniale de demain.") }} />
              </div>
            </div>
          </div>

          {/* CTA Formulaire Tally */}
          {pageContent.section2?.ctaTitle && (
            <div className="text-center mt-12">
              <p className="text-xl sm:text-2xl font-cairo font-semibold text-[#253F60] mb-6">
                {pageContent.section2.ctaTitle}
              </p>
              <button 
                onClick={() => {
                  window.open(pageContent.section2?.ctaLink || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
                }}
                className="bg-[#253F60] hover:bg-[#1a2d47] text-white font-inter font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {pageContent.section2?.ctaButton || "Faire le test de profil"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section 3 : Investir dans les SCPI */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              {pageContent.section3?.h2 || "Investir dans les SCPI : la pierre sans les contraintes"}
            </h2>
                </div>

          <div className="max-w-4xl mx-auto space-y-10 mb-12">
            {/* Introduction */}
            {pageContent.section3?.intro && (
              <div className="text-center space-y-4">
                {Array.isArray(pageContent.section3.intro) ? (
                  pageContent.section3.intro.map((paragraph, index) => (
                    <p key={index} className="text-lg sm:text-xl lg:text-2xl font-inter text-[#374151] leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                  ))
                ) : (
                  <p className="text-lg sm:text-xl lg:text-2xl font-inter text-[#374151] leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section3.intro) }} />
                )}
              </div>
            )}

            {/* Avantages clés en grille */}
            {pageContent.section3?.advantages && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {pageContent.section3.advantages.map((advantage, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 border-2 border-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#B99066]">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center shadow-md">
                      </div>
                      <div>
                        <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                          {advantage.title}
                        </h3>
                        <p className="text-[#374151] font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(advantage.description) }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Exemples de SCPI */}
            {pageContent.section3?.scpiExamples && (
              <div className="bg-gradient-to-br from-[#253F60] to-[#2d4a6b] rounded-xl p-8 sm:p-10 text-white shadow-xl mt-10">
                <h3 className="text-2xl font-cairo font-bold mb-6 text-center">
                  {pageContent.section3.scpiExamples.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(pageContent.section3.scpiExamples.scpis || []).map((scpi, index) => {
                    // Mapping des noms de SCPI
                    const scpiMapping = {
                      'Amundi Immobilier': 'Transition Europe',
                      'Corum Origin': 'Comète',
                      'Épargne Pierre': 'Sofidynamic',
                      'Primovie': 'Wemo One'
                    };
                    const displayName = scpiMapping[scpi] || scpi;
                    return (
                      <div 
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20"
                      >
                        <p className="font-inter font-semibold text-sm sm:text-base">{displayName}</p>
                      </div>
                    );
                  })}
                </div>
                {pageContent.section3.scpiExamples.note && (
                  <p className="text-center mt-6 text-white/80 text-sm font-inter italic">
                    {pageContent.section3.scpiExamples.note}
                  </p>
                )}
              </div>
            )}

            {/* Citation */}
            {pageContent.section3?.quote && (
              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-8 border-l-4 border-[#B99066] shadow-md mt-10">
                <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed italic text-center" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section3.quote) }} />
              </div>
            )}

            {/* Graphique comparatif Chart.js */}
            <div className="bg-white rounded-xl p-8 border-2 border-[#E5E7EB] shadow-lg mt-10">
              <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-6 text-center">
                Rendement moyen des SCPI vs immobilier locatif direct
              </h3>
              <div className="h-80 sm:h-96">
                <ChartBar
                  data={{
                    labels: ['Rendement brut', 'Rendement net (après charges)', 'Rendement net fiscal', 'Rendement avec effet de levier'],
                    datasets: [
                      {
                        label: 'SCPI',
                        data: [4.6, 4.2, 3.5, 4.8],
                        backgroundColor: 'rgba(185, 144, 102, 0.8)',
                        borderColor: '#B99066',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                      },
                      {
                        label: 'Immobilier locatif direct',
                        data: [5.5, 4.0, 3.5, 6.2],
                        backgroundColor: 'rgba(37, 63, 96, 0.8)',
                        borderColor: '#253F60',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                        labels: {
                          font: {
                            family: 'Inter',
                            size: 14,
                            weight: '600'
                          },
                          color: '#374151',
                          padding: 15,
                          usePointStyle: true,
                          pointStyle: 'circle'
                        }
                      },
                      tooltip: {
                        backgroundColor: '#F9FAFB',
                        titleColor: '#253F60',
                        bodyColor: '#374151',
                        borderColor: '#E5E7EB',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                          label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' %';
                          }
                        }
                      },
                      title: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 7,
                        ticks: {
                          callback: function(value) {
                            return value + ' %';
                          },
                          color: '#6B7280',
                          font: {
                            family: 'Inter',
                            size: 12
                          },
                          stepSize: 1
                        },
                        grid: {
                          color: '#E5E7EB',
                          drawBorder: false
                        },
                        title: {
                          display: true,
                          text: 'Rendement (%)',
                          color: '#374151',
                          font: {
                            family: 'Inter',
                            size: 13,
                            weight: '600'
                          }
                        }
                      },
                      x: {
                        ticks: {
                          color: '#6B7280',
                          font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                          }
                        },
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-6 bg-gradient-to-r from-[#F9FAFB] to-white rounded-lg p-4 border-l-4 border-[#B99066]">
                <p className="text-sm font-inter text-[#374151] leading-relaxed">
                  <strong className="text-[#253F60] font-semibold">Note Azalée</strong> : Les rendements varient selon le type de SCPI, la localisation du bien locatif et la fiscalité appliquée. L'effet de levier du crédit peut significativement améliorer la rentabilité de l'immobilier direct.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          {pageContent.section3?.ctaButton && (
            <div className="text-center mt-12">
              <button 
                onClick={() => window.open(pageContent.section3?.ctaLink || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#253F60] hover:bg-[#1a2d47] text-white font-inter font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {pageContent.section3.ctaButton}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section 5 : Rendement immobilier */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Rendement immobilier : ce que rapportent vraiment vos placements
            </h2>
            <h3 className="text-xl sm:text-2xl font-inter text-[#374151] font-medium max-w-3xl mx-auto leading-relaxed">
              Pour bâtir une stratégie équilibrée, il faut comparer le rendement brut, net de charges et net d'impôts.
            </h3>
          </div>

          {/* Tableau comparatif */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-[#E5E7EB]">
              {/* En-tête du tableau */}
              <div className="bg-gradient-to-r from-[#253F60] to-[#2d4a6b] text-white">
                <div className="grid grid-cols-4 gap-4 p-6">
                  <div className="font-cairo font-bold text-lg sm:text-xl">Type d'investissement</div>
                  <div className="font-cairo font-bold text-lg sm:text-xl text-center">Rendement brut moyen</div>
                  <div className="font-cairo font-bold text-lg sm:text-xl text-center">Rendement net estimé</div>
                  <div className="font-cairo font-bold text-lg sm:text-xl text-center">Fiscalité principale</div>
                </div>
              </div>

              {/* Corps du tableau */}
              <div className="divide-y divide-[#E5E7EB]">
                {/* Immobilier locatif */}
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors duration-200">
                  <div className="font-inter font-semibold text-[#253F60] text-base sm:text-lg">
                    Immobilier locatif
                  </div>
                  <div className="text-center font-inter font-bold text-[#B99066] text-xl sm:text-2xl">
                    5,5 %
                  </div>
                  <div className="text-center font-inter font-semibold text-[#374151] text-lg sm:text-xl">
                    3,5 %
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Revenus fonciers
                  </div>
                </div>

                {/* SCPI */}
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors duration-200 bg-[#F9FAFB]/50">
                  <div className="font-inter font-semibold text-[#253F60] text-base sm:text-lg">
                    SCPI
                  </div>
                  <div className="text-center font-inter font-bold text-[#B99066] text-xl sm:text-2xl">
                    4,6 %
                  </div>
                  <div className="text-center font-inter font-semibold text-[#374151] text-lg sm:text-xl">
                    3,8 %
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Revenus fonciers / IR
                  </div>
                </div>

                {/* Assurance vie */}
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors duration-200">
                  <div className="font-inter font-semibold text-[#253F60] text-base sm:text-lg">
                    Assurance vie (fonds euros)
                  </div>
                  <div className="text-center font-inter font-bold text-[#B99066] text-xl sm:text-2xl">
                    2,5 %
                  </div>
                  <div className="text-center font-inter font-semibold text-[#374151] text-lg sm:text-xl">
                    2 %
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Flat tax
                  </div>
                </div>

                {/* ETF immobilier */}
                <div className="grid grid-cols-4 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors duration-200 bg-[#F9FAFB]/50">
                  <div className="font-inter font-semibold text-[#253F60] text-base sm:text-lg">
                    ETF immobilier
                  </div>
                  <div className="text-center font-inter font-bold text-[#B99066] text-xl sm:text-2xl">
                    6 %
                  </div>
                  <div className="text-center font-inter font-semibold text-[#374151] text-lg sm:text-xl">
                    4,5 %
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Plus-values mobilières
                  </div>
                </div>
              </div>
            </div>

            {/* Astuce Azalée */}
            <div className="mt-10 bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-8 border-l-4 border-[#B99066] shadow-md">
              <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4">
                Astuce Azalée
              </h3>
              <p className="text-lg font-inter text-[#374151] leading-relaxed">
                Pensez à comparer les rendements <strong className="text-[#253F60] font-semibold">"ajustés du risque"</strong> : la SCPI offre une <strong className="text-[#253F60] font-semibold">meilleure stabilité de revenu</strong> que l'immobilier direct.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 : SCPI, LMNP, Pinel… quelle stratégie pour quel profil ? */}
      <section id="strategies" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              SCPI, LMNP, Pinel… quelle stratégie pour quel profil ?
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Chaque stratégie répond à un objectif patrimonial distinct. Azalée vous aide à définir la bonne combinaison selon votre horizon, votre fiscalité et votre appétence au risque.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Profil 1 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenProfile(openProfile === 1 ? null : 1)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold text-[#253F60]">
                    "Je veux créer un capital sans contraintes"
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={`w-6 h-6 text-[#B99066] transform transition-transform duration-300 ${
                      openProfile === 1 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openProfile === 1 && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full mt-3"></div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed mb-4">
                        <strong className="text-[#253F60] font-semibold">→ SCPI de rendement ou SCPI européennes.</strong>
                      </p>
                      <p className="text-base sm:text-lg font-inter text-[#6B7280] leading-relaxed">
                        Les SCPI vous permettent d'investir dans l'immobilier professionnel sans gérer de biens. Vous percevez des revenus réguliers (trimestriels) et bénéficiez d'une diversification géographique et sectorielle. Idéal pour ceux qui recherchent un placement passif et régulier.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profil 2 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenProfile(openProfile === 2 ? null : 2)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold text-[#253F60]">
                    "Je veux réduire mes impôts"
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={`w-6 h-6 text-[#B99066] transform transition-transform duration-300 ${
                      openProfile === 2 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openProfile === 2 && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full mt-3"></div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed mb-4">
                        <strong className="text-[#253F60] font-semibold">→ LMNP ou Pinel, selon le taux marginal d'imposition.</strong>
                      </p>
                      <p className="text-base sm:text-lg font-inter text-[#6B7280] leading-relaxed mb-4">
                        Le <strong className="text-[#253F60]">LMNP (Loueur Meublé Non Professionnel)</strong> permet de déduire l'amortissement du bien, réduisant significativement votre impôt sur le revenu. Le <strong className="text-[#253F60]">Pinel</strong> offre une réduction d'impôt jusqu'à 21% du prix d'acquisition sur 12 ans, sous conditions de location.
                      </p>
                      <p className="text-base sm:text-lg font-inter text-[#6B7280] leading-relaxed">
                        Le choix entre LMNP et Pinel dépend de votre TMI (Taux Marginal d'Imposition) et de votre horizon d'investissement.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profil 3 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenProfile(openProfile === 3 ? null : 3)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4 flex-1">
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold text-[#253F60]">
                    "Je veux transmettre et structurer"
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={`w-6 h-6 text-[#B99066] transform transition-transform duration-300 ${
                      openProfile === 3 ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openProfile === 3 && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full mt-3"></div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed mb-4">
                        <strong className="text-[#253F60] font-semibold">→ SCI à l'IS ou démembrement temporaire.</strong>
                      </p>
                      <p className="text-base sm:text-lg font-inter text-[#6B7280] leading-relaxed mb-4">
                        La <strong className="text-[#253F60]">SCI (Société Civile Immobilière)</strong> à l'IS permet de structurer votre patrimoine immobilier, de préparer la transmission et d'optimiser la fiscalité. Le <strong className="text-[#253F60]">démembrement temporaire</strong> permet de transmettre la nue-propriété tout en conservant l'usufruit, réduisant les droits de succession.
                      </p>
                      <p className="text-base sm:text-lg font-inter text-[#6B7280] leading-relaxed">
                        Ces structures sont particulièrement adaptées aux patrimoines importants et aux projets de transmission familiale.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message de conclusion */}
          <div className="text-center mt-12 max-w-3xl mx-auto">
            <div className="inline-flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="azaleeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#253F60" />
                      <stop offset="100%" stopColor="#B99066" />
                    </linearGradient>
                  </defs>
                  {/* Bulle de chat avec pointeur */}
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="url(#azaleeGradient2)" stroke="url(#azaleeGradient2)" strokeWidth="1.5"/>
                  <path d="M10 20L8 24h4l-2-4z" fill="url(#azaleeGradient2)"/>
                </svg>
              </div>
              <p className="text-lg sm:text-xl font-inter text-[#253F60] leading-relaxed font-medium text-left">
                Azalée vous aide à définir la bonne combinaison selon votre horizon, votre fiscalité et votre appétence au risque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 : Crédits immobiliers */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Crédits immobiliers : le levier le plus sous-estimé
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Contenu texte */}
              <div className="space-y-6">
                <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed">
                  L'immobilier est l'un des <strong className="text-[#253F60] font-semibold">rares actifs que l'on peut financer à crédit</strong>.
                </p>
                <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed">
                  Cet <strong className="text-[#253F60] font-semibold">effet de levier</strong> permet de se constituer un patrimoine <strong className="text-[#253F60] font-semibold">sans immobiliser tout son capital</strong>.
                </p>

                {/* Exemple concret */}
                <div className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl p-6 sm:p-8 border-2 border-[#E5E7EB] shadow-lg mt-8">
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4">
                    Exemple concret :
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full mt-2"></div>
                      <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                        Un investissement de <strong className="text-[#253F60] font-semibold">200 000 €</strong> financé à <strong className="text-[#253F60] font-semibold">90 % par emprunt</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full mt-2"></div>
                      <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                        Avec un <strong className="text-[#253F60] font-semibold">rendement locatif de 5 %</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full mt-2"></div>
                      <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                        Permet de générer <strong className="text-[#253F60] font-semibold">plus de 60 000 € de capital net</strong> après 20 ans
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full mt-2"></div>
                      <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                        Tout en profitant de la <strong className="text-[#253F60] font-semibold">déductibilité des intérêts d'emprunt</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Citation */}
                <div className="bg-gradient-to-r from-[#253F60] to-[#2d4a6b] rounded-xl p-6 sm:p-8 text-white shadow-xl mt-6">
                  <div className="flex items-start gap-3 justify-center">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="azaleeGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#B99066" />
                            <stop offset="100%" stopColor="#A67A5A" />
                          </linearGradient>
                        </defs>
                        {/* Document avec pointeur */}
                        <rect x="5" y="3" width="14" height="18" rx="1.5" fill="url(#azaleeGradient3)" stroke="url(#azaleeGradient3)" strokeWidth="1.5"/>
                        <path d="M8 7h8M8 10h8M8 13h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M11.5 20L8 24H15L11.5 20Z" fill="url(#azaleeGradient3)"/>
                        <path d="M11.5 20L8 24H15L11.5 20Z" stroke="url(#azaleeGradient3)" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-lg sm:text-xl font-inter italic leading-relaxed text-left flex-1">
                      "L'argent de la banque travaille pour vous : c'est la <strong className="text-[#B99066] font-semibold not-italic">magie du levier patrimonial</strong>."
                    </p>
                  </div>
                </div>
              </div>

              {/* Zone visuelle */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl p-4 sm:p-6 border-2 border-[#E5E7EB] shadow-xl overflow-hidden">
                  <img 
                    src="/images/signat.png" 
                    alt="Main signant un dossier de prêt" 
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <button 
                onClick={() => {
                  // TODO: Lien vers simulateur de financement immobilier
                  window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
                }}
                className="bg-[#253F60] hover:bg-[#1a2d47] text-white font-inter font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Simuler mon financement immobilier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 : Marché immobilier 2025 */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Marché immobilier 2025 : opportunités et mutations
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Introduction */}
            <div className="text-center mb-10">
              <p className="text-lg sm:text-xl lg:text-2xl font-inter text-[#374151] leading-relaxed">
                L'année 2024 marque un <strong className="text-[#253F60] font-semibold">tournant</strong> : baisse des prix dans certaines zones, remontée des taux, mais <strong className="text-[#253F60] font-semibold">forte tension locative</strong> dans les métropoles régionales.
              </p>
            </div>

            {/* Tendances clés en grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Paris et grandes métropoles */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#B99066]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center">
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Paris et grandes métropoles
                    </h3>
                    <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                      Correction modérée <strong className="text-[#253F60] font-semibold">(-3 à -5 %)</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Villes moyennes */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#B99066]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center">
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Villes moyennes
                    </h3>
                    <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                      Attractivité accrue <strong className="text-[#253F60] font-semibold">(Rennes, Bordeaux, Annecy…)</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Immobilier locatif */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#B99066]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center">
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Immobilier locatif
                    </h3>
                    <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                      Rendement moyen de <strong className="text-[#253F60] font-semibold">5,8 %</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Investissement "pierre papier" */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-[#E5E7EB] shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#B99066]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center">
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Investissement "pierre papier"
                    </h3>
                    <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                      <strong className="text-[#253F60] font-semibold">Stabilité des revenus</strong> et diversification européenne
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-6 sm:p-8 border-l-4 border-[#B99066] shadow-md mt-10">
              <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                <strong className="text-[#253F60] font-semibold">Source :</strong> PAPERS.immo, Notaires de France, INSEE 2024.
              </p>
            </div>

            {/* Loi de finance 2026 */}
            {pageContent.section8?.perspective2026 && (
              <div className="bg-gradient-to-br from-[#253F60] to-[#2d4a6b] rounded-xl p-8 sm:p-10 text-white shadow-xl mt-10">
                <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section8.perspective2026.title || "Perspective 2026") }} />
                <p className="text-lg sm:text-xl font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section8.perspective2026.paragraph1 || "Sur 2025, on observe une légère reprise grâce à l'inflexion des taux d'intérêt, mais la <strong className=\"text-[#B99066] font-semibold\">prochaine loi de finance (2026)</strong> risque de mettre un coup d'arrêt à la dynamique d'investissement qui s'était relancée.") }} />
                <p className="text-lg sm:text-xl font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.section8.perspective2026.paragraph2 || "En effet, la <strong className=\"text-[#B99066] font-semibold\">suppression de l'amortissement sur les meublés</strong> va impacter à nouveau le choix des investisseurs. L'objectif est de redonner un peu de souffle à la location nue qui devrait bénéficier d'un meilleur abattement.") }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 9 : L'immobilier papier */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              L'immobilier papier : SCPI, OPCI, REITs
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Les 3 formes d'investissement immobilier collectif
            </p>
          </div>

          {/* Tableau comparatif */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-[#E5E7EB]">
              {/* En-tête du tableau */}
              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] text-white">
                <div className="grid grid-cols-5 gap-4 p-6">
                  <div className="font-cairo font-bold text-lg sm:text-xl">Type</div>
                  <div className="font-cairo font-bold text-lg sm:text-xl text-center">Support</div>
                  <div className="font-cairo font-bold text-lg sm:text-xl text-center">Liquidité</div>
                  <div className="font-cairo font-bold text-lg sm:text-xl text-center">Rendement</div>
                  <div className="font-cairo font-bold text-lg sm:text-xl text-center">Risque principal</div>
                </div>
              </div>

              {/* Corps du tableau */}
              <div className="divide-y divide-[#E5E7EB]">
                {/* SCPI */}
                <div className="grid grid-cols-5 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors duration-200">
                  <div className="font-inter font-semibold text-[#253F60] text-base sm:text-lg">
                    SCPI
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Pierre gérée
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Moyenne
                  </div>
                  <div className="text-center font-inter font-bold text-[#B99066] text-lg sm:text-xl">
                    4-6 %
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Valeur des parts
                  </div>
                </div>

                {/* OPCI */}
                <div className="grid grid-cols-5 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors duration-200 bg-[#F9FAFB]/50">
                  <div className="font-inter font-semibold text-[#253F60] text-base sm:text-lg">
                    OPCI
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Mix pierre / finance
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Bonne
                  </div>
                  <div className="text-center font-inter font-bold text-[#B99066] text-lg sm:text-xl">
                    3-5 %
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Volatilité
                  </div>
                </div>

                {/* REITs */}
                <div className="grid grid-cols-5 gap-4 p-6 hover:bg-[#F9FAFB] transition-colors duration-200">
                  <div className="font-inter font-semibold text-[#253F60] text-base sm:text-lg">
                    REITs
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Actions cotées
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Élevée
                  </div>
                  <div className="text-center font-inter font-bold text-[#B99066] text-lg sm:text-xl">
                    6-8 %
                  </div>
                  <div className="text-center font-inter text-[#374151] text-sm sm:text-base">
                    Marché boursier
                  </div>
                </div>
              </div>
            </div>

            {/* Citation */}
            <div className="mt-10 bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-8 border-l-4 border-[#B99066] shadow-md">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="azaleeGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#253F60" />
                        <stop offset="100%" stopColor="#B99066" />
                      </linearGradient>
                    </defs>
                    {/* Document avec pointeur */}
                    <rect x="5" y="3" width="14" height="18" rx="1.5" fill="url(#azaleeGradient4)" stroke="url(#azaleeGradient4)" strokeWidth="1.5"/>
                    <path d="M8 7h8M8 10h8M8 13h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M11.5 20L8 24H15L11.5 20Z" fill="url(#azaleeGradient4)"/>
                    <path d="M11.5 20L8 24H15L11.5 20Z" stroke="url(#azaleeGradient4)" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed italic text-left flex-1">
                  "Ces solutions permettent de profiter de la <strong className="text-[#253F60] font-semibold not-italic">solidité du marché immobilier</strong> sans contraintes de gestion."
                </p>
              </div>
            </div>

            {/* Zone pour infographie */}
            <div className="mt-10 bg-gradient-to-br from-[#F9FAFB] via-white to-[#F9FAFB] rounded-xl p-8 border-2 border-[#E5E7EB] shadow-lg">
              <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-6 text-center">
                Infographie comparative SCPI / OPCI / REITs
              </h3>
              
              {/* Données pour les graphiques */}
              {(() => {
                const barData = [
                  { name: 'Rendement (%)', SCPI: 5, OPCI: 4, REITs: 7 },
                  { name: 'Liquidité', SCPI: 3, OPCI: 4, REITs: 5 },
                  { name: 'Stabilité', SCPI: 5, OPCI: 3, REITs: 2 },
                  { name: 'Accessibilité', SCPI: 4, OPCI: 4, REITs: 5 }
                ];

                const radarData = [
                  { subject: 'Rendement', SCPI: 80, OPCI: 60, REITs: 100, fullMark: 100 },
                  { subject: 'Liquidité', SCPI: 60, OPCI: 80, REITs: 100, fullMark: 100 },
                  { subject: 'Stabilité', SCPI: 100, OPCI: 60, REITs: 40, fullMark: 100 },
                  { subject: 'Diversification', SCPI: 80, OPCI: 70, REITs: 50, fullMark: 100 },
                  { subject: 'Gestion', SCPI: 90, OPCI: 70, REITs: 60, fullMark: 100 }
                ];

                return (
                  <div className="space-y-8">
                    {/* Graphique en barres groupées */}
                    <div className="bg-white rounded-lg p-4 sm:p-6 border border-[#E5E7EB]">
                      <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-4 text-center">
                        Comparaison par critères
                      </h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#374151', fontSize: 12 }}
                            stroke="#9CA3AF"
                          />
                          <YAxis 
                            tick={{ fill: '#374151', fontSize: 12 }}
                            stroke="#9CA3AF"
                            domain={[0, 5]}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#F9FAFB', 
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              color: '#253F60'
                            }}
                          />
                          <Legend 
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                          />
                          <Bar 
                            dataKey="SCPI" 
                            fill="#B99066" 
                            radius={[4, 4, 0, 0]}
                            name="SCPI"
                          />
                          <Bar 
                            dataKey="OPCI" 
                            fill="#253F60" 
                            radius={[4, 4, 0, 0]}
                            name="OPCI"
                          />
                          <Bar 
                            dataKey="REITs" 
                            fill="#A67A5A" 
                            radius={[4, 4, 0, 0]}
                            name="REITs"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Graphique radar */}
                    <div className="bg-white rounded-lg p-4 sm:p-6 border border-[#E5E7EB]">
                      <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-4 text-center">
                        Profil comparatif global
                      </h4>
                      <ResponsiveContainer width="100%" height={350}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#E5E7EB" />
                          <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: '#374151', fontSize: 12 }}
                          />
                          <PolarRadiusAxis 
                            angle={90} 
                            domain={[0, 100]}
                            tick={{ fill: '#9CA3AF', fontSize: 10 }}
                          />
                          <Radar 
                            name="SCPI" 
                            dataKey="SCPI" 
                            stroke="#B99066" 
                            fill="#B99066" 
                            fillOpacity={0.6}
                            strokeWidth={2}
                          />
                          <Radar 
                            name="OPCI" 
                            dataKey="OPCI" 
                            stroke="#253F60" 
                            fill="#253F60" 
                            fillOpacity={0.6}
                            strokeWidth={2}
                          />
                          <Radar 
                            name="REITs" 
                            dataKey="REITs" 
                            stroke="#A67A5A" 
                            fill="#A67A5A" 
                            fillOpacity={0.6}
                            strokeWidth={2}
                          />
                          <Legend 
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#F9FAFB', 
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              color: '#253F60'
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>


      {/* Section 10 : Avis et retours d'expérience */}
      {pageContent.section10 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
                {pageContent.section10.h2 || "Avis et retours d'expérience"}
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Témoignages */}
              {pageContent.section10.testimonials && Array.isArray(pageContent.section10.testimonials) && pageContent.section10.testimonials.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {pageContent.section10.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#E5E7EB] hover:shadow-xl hover:border-[#B99066] transition-all duration-300">
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed italic mb-6" dangerouslySetInnerHTML={{ __html: processHTMLForRender(testimonial.text || '') }} />
                      </div>
                      <div className="border-t border-[#E5E7EB] pt-4">
                        <p className="font-cairo font-bold text-[#253F60] text-lg">
                          — {testimonial.name || ''}
                        </p>
                        <p className="font-inter text-[#6B7280] text-sm sm:text-base">
                          {testimonial.role || ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Note moyenne */}
              {pageContent.section10.averageRating && (
                <div className="bg-gradient-to-br from-[#253F60] to-[#2d4a6b] rounded-xl p-8 sm:p-10 text-white shadow-xl text-center mb-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-4xl sm:text-5xl font-cairo font-bold text-[#B99066]">{pageContent.section10.averageRating.value || "4,9"}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl sm:text-3xl">/</span>
                      <span className="text-2xl sm:text-3xl">{pageContent.section10.averageRating.max || "5"}</span>
                    </div>
                  </div>
                  <p className="text-lg sm:text-xl font-inter font-semibold mb-2">
                    {pageContent.section10.averageRating.label || "Note moyenne"}
                  </p>
                  <p className="text-sm sm:text-base font-inter text-white/80">
                    {pageContent.section10.averageRating.source || "(avis clients Azalée)"}
                  </p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {pageContent.section10.ctaButton && (
                <div className="text-center">
                  <button 
                    onClick={() => window.open(pageContent.section10.ctaLink || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="bg-[#253F60] hover:bg-[#1a2d47] text-white font-inter font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {pageContent.section10.ctaButton || "Demandez un comparatif SCPI personnalisé"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Section 13 : Les trois leviers de la stratégie immobilière Azalée */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Les trois leviers de la stratégie immobilière Azalée
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Chaque levier répond à un besoin précis : créer du capital, réduire la fiscalité ou protéger son patrimoine familial.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Levier 1 : Créer et valoriser */}
              <div className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 cursor-pointer">
                <a href="/immobilier/immobilier-neuf" className="block">
                  <div className="relative h-48 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/construction-building.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                        Créer et valoriser votre patrimoine
                      </h3>
                      <p className="text-base font-inter text-[#374151] leading-relaxed mb-4">
                        Immobilier neuf, VEFA, construction, dispositifs Scellier
                      </p>
                    </div>
                    <div className="flex items-center text-[#B99066] font-inter font-semibold">
                      <span>Découvrir</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

              {/* Levier 2 : Optimiser votre fiscalité */}
              <div className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 cursor-pointer">
                <a href="/immobilier/investissement-locatif" className="block">
                  <div className="relative h-48 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/apartment-keys.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                        Optimiser votre fiscalité
                      </h3>
                      <p className="text-base font-inter text-[#374151] leading-relaxed mb-4">
                        Investissement locatif, LMNP, plus-value immobilière, déficit foncier
                      </p>
                    </div>
                    <div className="flex items-center text-[#B99066] font-inter font-semibold">
                      <span>Découvrir</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

              {/* Levier 3 : Structurer et transmettre */}
              <div className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 cursor-pointer">
                <a href="/immobilier/sci" className="block">
                  <div className="relative h-48 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/family-house.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                        Structurer et transmettre durablement
                      </h3>
                      <p className="text-base font-inter text-[#374151] leading-relaxed mb-4">
                        SCI, immeubles de rapport, financement, PTZ
                      </p>
                    </div>
                    <div className="flex items-center text-[#B99066] font-inter font-semibold">
                      <span>Découvrir</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 14 : La méthode Azalée */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              La méthode Azalée : une approche patrimoniale globale
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Nous ne proposons pas de "produits", mais une stratégie complète, sur mesure et durable.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Processus avec flèches */}
            <div className="relative">
              {/* Étapes avec flèches */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 relative">
                {/* Étape 1 */}
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#E5E7EB] text-center relative z-10 hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:from-[#B99066] group-hover:to-[#253F60] transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                    Diagnostic patrimonial
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed">
                    Analyse de votre situation et de vos objectifs
                  </p>
                </div>

                {/* Flèche 1 */}
                <div className="hidden md:flex items-center justify-center z-20">
                  <svg className="w-8 h-8 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Étape 2 */}
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#E5E7EB] text-center relative z-10 hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:from-[#B99066] group-hover:to-[#253F60] transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                    Élaboration d'une stratégie sur mesure
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed">
                    Rendement, fiscalité, transmission
                  </p>
                </div>

                {/* Flèche 2 */}
                <div className="hidden md:flex items-center justify-center z-20">
                  <svg className="w-8 h-8 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Étape 3 */}
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#E5E7EB] text-center relative z-10 hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:from-[#B99066] group-hover:to-[#253F60] transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                    Sélection des supports adaptés
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed">
                    Immobilier direct, LMNP, SCI, SCPI, assurance vie…
                  </p>
                </div>

                {/* Flèche 3 */}
                <div className="hidden md:flex items-center justify-center z-20">
                  <svg className="w-8 h-8 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Étape 4 */}
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#E5E7EB] text-center relative z-10 hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:from-[#B99066] group-hover:to-[#253F60] transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                    Accompagnement juridique et fiscal
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed">
                    Démembrement, SCI, clauses bénéficiaires
                  </p>
                </div>

                {/* Flèche 4 */}
                <div className="hidden md:flex items-center justify-center z-20">
                  <svg className="w-8 h-8 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Étape 5 */}
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#E5E7EB] text-center relative z-10 hover:shadow-2xl hover:border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 w-full md:w-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:from-[#B99066] group-hover:to-[#253F60] transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                    Suivi continu et reporting
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed">
                    Réajustement annuel de la stratégie
                  </p>
                </div>
              </div>
            </div>

            {/* Message différenciant */}
            <div className="mt-12 bg-gradient-to-r from-[#253F60] to-[#2d4a6b] rounded-xl p-8 text-white shadow-xl">
              <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-4 text-center">
                La différence Azalée
              </h3>
              <p className="text-lg sm:text-xl font-inter leading-relaxed text-center">
                Une vision d'ensemble qui marie <strong className="text-[#B99066] font-semibold">finance, fiscalité et sérénité</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 15 : Témoignages et cas concrets */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Témoignages et cas concrets
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Témoignage 1 */}
              <div className="bg-gradient-to-br from-white to-[#F9FAFB] rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#E5E7EB] hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed italic">
                    « Grâce à Azalée, j'ai optimisé mon investissement locatif tout en réduisant mon impôt sur le revenu. Leur accompagnement va bien au-delà du simple achat. »
                  </p>
                </div>
                <div className="border-t border-[#E5E7EB] pt-4">
                  <p className="font-cairo font-bold text-[#253F60] text-lg">
                    — Laurent D.
                  </p>
                  <p className="font-inter text-[#6B7280] text-sm sm:text-base">
                    Chef d'entreprise à Lyon
                  </p>
                </div>
              </div>

              {/* Témoignage 2 */}
              <div className="bg-gradient-to-br from-white to-[#F9FAFB] rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#E5E7EB] hover:shadow-xl transition-all duration-300">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed italic">
                    « J'avais un projet LMNP, ils m'ont aidée à le rendre rentable, sécurisé et transmissible. »
                  </p>
                </div>
                <div className="border-t border-[#E5E7EB] pt-4">
                  <p className="font-cairo font-bold text-[#253F60] text-lg">
                    — Sophie B.
                  </p>
                  <p className="font-inter text-[#6B7280] text-sm sm:text-base">
                    Cadre supérieure à Paris
                  </p>
                </div>
              </div>
            </div>

            {/* Statistique */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl p-8 text-white shadow-xl text-center">
              <p className="text-xl sm:text-2xl font-cairo font-bold mb-2">
                🔸 Plus de 200 familles accompagnées
              </p>
              <p className="text-lg sm:text-xl font-inter">
                dans la création et la transmission de leur patrimoine immobilier
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 16 : Nos expertises immobilières */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Nos expertises immobilières
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Explorez nos expertises et entrez dans le détail de chaque stratégie
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* 3 premières cartes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Immobilier neuf & VEFA */}
              <a href="/immobilier/immobilier-neuf" className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300">
                <div className="relative h-40 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/construction-site.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                    Immobilier neuf & VEFA
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed mb-4">
                    Investir dans le neuf pour profiter des garanties, des dispositifs fiscaux (Pinel, Scellier) et valoriser votre patrimoine sur le long terme.
                  </p>
                  <div className="flex items-center text-[#B99066] font-inter font-semibold text-sm">
                    <span>En savoir plus</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Investissement locatif & LMNP */}
              <a href="/immobilier/investissement-locatif" className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300">
                <div className="relative h-40 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/modern-apartment.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                    Investissement locatif & LMNP
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed mb-4">
                    Devenir investisseur rentable, optimiser sa fiscalité et générer des revenus complémentaires.
                  </p>
                  <div className="flex items-center text-[#B99066] font-inter font-semibold text-sm">
                    <span>En savoir plus</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* SCI & transmission patrimoniale */}
              <a href="/immobilier/sci" className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300">
                <div className="relative h-40 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/notary-signing.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                    SCI & transmission patrimoniale
                  </h3>
                  <p className="text-sm font-inter text-[#374151] leading-relaxed mb-4">
                    Structurer votre patrimoine, protéger vos proches et préparer la transmission familiale.
                  </p>
                  <div className="flex items-center text-[#B99066] font-inter font-semibold text-sm">
                    <span>En savoir plus</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            {/* 2 dernières cartes centrées */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {/* Crédit immobilier & PTZ */}
                <a href="/immobilier/credit-immobilier-ptz" className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300">
                  <div className="relative h-40 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/mortgage-documents.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                      Crédit immobilier & PTZ
                    </h3>
                    <p className="text-sm font-inter text-[#374151] leading-relaxed mb-4">
                      Profitez du levier de l'endettement pour accélérer la constitution de patrimoine.
                    </p>
                    <div className="flex items-center text-[#B99066] font-inter font-semibold text-sm">
                      <span>En savoir plus</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Immeubles de rapport & plus-value */}
                <a href="/immobilier/immeubles-de-rapport" className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300">
                  <div className="relative h-40 bg-gradient-to-br from-[#F9FAFB] to-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/paris-building-facade.jpg')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-2 group-hover:text-[#B99066] transition-colors duration-300">
                      Immeubles de rapport & plus-value immobilière
                    </h3>
                    <p className="text-sm font-inter text-[#374151] leading-relaxed mb-4">
                      Accédez à des actifs à haut potentiel et maîtrisez la fiscalité sur les plus-values.
                    </p>
                    <div className="flex items-center text-[#B99066] font-inter font-semibold text-sm">
                      <span>En savoir plus</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 17 : Ressources gratuites pour aller plus loin */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Ressources gratuites pour aller plus loin
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Téléchargez votre guide exclusif
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Liste des ressources */}
            <div className="space-y-6 mb-10">
              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-6 border-l-4 border-[#B99066] shadow-md">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Les 7 stratégies immobilières pour faire fructifier votre patrimoine
                    </h3>
                    <p className="text-base font-inter text-[#374151] leading-relaxed">
                      Guide complet téléchargeable gratuitement
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-6 border-l-4 border-[#B99066] shadow-md">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Simulez votre rendement locatif
                    </h3>
                    <p className="text-base font-inter text-[#374151] leading-relaxed">
                      Grâce à notre calculateur interactif. <a href="/outils" className="text-[#B99066] font-semibold hover:underline">Lien vers Outils</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-6 border-l-4 border-[#B99066] shadow-md">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-2">
                      Faites le test
                    </h3>
                    <p className="text-base font-inter text-[#374151] leading-relaxed">
                      Quel type d'investissement immobilier est fait pour vous ? (Questionnaire Tally avec réponse gmail via ChatGPT)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4">
              <a 
                href="/outils-financiers/guide-defiscalisation"
                className="inline-block bg-[#253F60] hover:bg-[#1a2d47] text-white font-inter font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 mr-4"
              >
                Télécharger le guide
              </a>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] hover:bg-[#A67A5A] text-white font-inter font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 18 : Faites confiance à un partenaire indépendant */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Faites confiance à un partenaire indépendant
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Chez Azalée Patrimoine, nous défendons trois valeurs fortes
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* 3 valeurs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#E5E7EB] text-center hover:shadow-xl hover:border-[#B99066] transition-all duration-300">
                <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                  Indépendance
                </h3>
                <p className="text-base font-inter text-[#374151] leading-relaxed">
                  Aucun lien capitalistique avec des promoteurs
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#E5E7EB] text-center hover:shadow-xl hover:border-[#B99066] transition-all duration-300">
                <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                  Transparence
                </h3>
                <p className="text-base font-inter text-[#374151] leading-relaxed">
                  Nos analyses et recommandations sont documentées
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#E5E7EB] text-center hover:shadow-xl hover:border-[#B99066] transition-all duration-300">
                <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-3">
                  Accompagnement humain
                </h3>
                <p className="text-base font-inter text-[#374151] leading-relaxed">
                  Une relation durable, fondée sur la confiance
                </p>
              </div>
            </div>

            {/* Citation */}
            <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-8 border-l-4 border-[#B99066] shadow-md mb-10">
              <p className="text-lg sm:text-xl font-inter text-[#374151] leading-relaxed italic text-center mb-6">
                "Nous ne vendons pas des biens, nous construisons des projets patrimoniaux durables."
              </p>
            </div>

            {/* Exemple concret */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#2d4a6b] rounded-xl p-8 sm:p-10 text-white shadow-xl">
              <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-4">
                Exemple d'une famille qui a investi en 2017
              </h3>
              <p className="text-lg sm:text-xl font-inter leading-relaxed mb-4">
                Dans une résidence principale appartenant au patrimoine remarquable de sa ville. Travail d'optimisation grâce à l'obtention de labels qui ont permis d'obtenir <strong className="text-[#B99066] font-semibold">30% du budget travaux sous forme de crédit d'impôt</strong>.
              </p>
              <p className="text-base sm:text-lg font-inter text-white/90 italic">
                — Shirley Bruna, Fondatrice d'Azalée Patrimoine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 19 : FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              FAQ – Investir dans l'immobilier
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Question 1 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  Qu'est-ce qu'une SCPI ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 1 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                    Une SCPI (Société Civile de Placement Immobilier) est un placement collectif permettant d'investir dans un portefeuille immobilier géré par une société de gestion. Vous percevez des revenus locatifs réguliers, proportionnels à votre part dans la SCPI, sans avoir à gérer de biens.
                  </p>
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  Quel rendement peut-on espérer d'une SCPI ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 2 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                    Le rendement moyen des SCPI de rendement se situe entre <strong className="text-[#253F60] font-semibold">4 % et 6 % par an</strong> (source AMF 2024). Certaines SCPI thématiques comme Comète ou Sofidynamic affichent de meilleures performances grâce à une diversification européenne ou sectorielle.
                  </p>
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  Quels sont les risques d'un investissement en SCPI ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 3 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 3 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed mb-4">
                    Comme tout placement, les SCPI comportent des risques : la valeur des parts peut fluctuer, les loyers ne sont pas garantis, et la liquidité peut être limitée en cas de forte demande de revente.
                  </p>
                  <p className="text-base sm:text-lg font-inter text-[#253F60] font-semibold">
                    C'est pourquoi Azalée Patrimoine sélectionne des SCPI solides, diversifiées et bien capitalisées.
                  </p>
                </div>
              )}
            </div>

            {/* Question 4 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  SCPI, LMNP, Pinel… que choisir ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 4 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 4 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed mb-4">
                    Tout dépend de vos objectifs :
                  </p>
                  <ul className="space-y-2 text-base sm:text-lg font-inter text-[#374151]">
                    <li>• <strong className="text-[#253F60] font-semibold">Réduire vos impôts</strong> : LMNP ou Pinel</li>
                    <li>• <strong className="text-[#253F60] font-semibold">Générer un revenu complémentaire</strong> : SCPI de rendement</li>
                    <li>• <strong className="text-[#253F60] font-semibold">Transmettre un bien</strong> : SCI ou démembrement</li>
                  </ul>
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed mt-4">
                    Nos conseillers peuvent modéliser votre situation et définir la stratégie la plus pertinente.
                  </p>
                </div>
              )}
            </div>

            {/* Question 5 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  Peut-on financer un investissement en SCPI à crédit ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 5 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 5 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                    Oui. Certaines banques acceptent le crédit SCPI, souvent avec des durées plus courtes (10-15 ans). L'avantage : les intérêts d'emprunt sont déductibles de vos revenus fonciers, ce qui améliore la rentabilité nette.
                  </p>
                </div>
              )}
            </div>

            {/* Question 6 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  Quelle différence entre SCPI et OPCI ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 6 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 6 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                    Une OPCI (Organisme de Placement Collectif Immobilier) investit à la fois dans la pierre et les marchés financiers. Elle offre une meilleure liquidité mais un rendement généralement plus faible que les SCPI.
                  </p>
                </div>
              )}
            </div>

            {/* Question 7 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 7 ? null : 7)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  Les revenus d'une SCPI sont-ils imposables ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 7 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 7 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                    Oui. Ils sont considérés comme des revenus fonciers et imposés selon votre TMI. Il existe toutefois des stratégies de SCPI européennes ou logées dans l'assurance vie pour réduire la fiscalité.
                  </p>
                </div>
              )}
            </div>

            {/* Question 8 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === 8 ? null : 8)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-cairo font-bold text-[#253F60] pr-4">
                  Est-ce le bon moment pour investir dans l'immobilier ?
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openFaq === 8 ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === 8 && (
                <div className="px-6 pb-6 border-t border-[#E5E7EB] pt-6">
                  <p className="text-base sm:text-lg font-inter text-[#374151] leading-relaxed">
                    En 2025, les taux de crédit se stabilisent et les prix s'ajustent à la baisse : une opportunité pour investir à long terme. Les actifs bien situés et les SCPI résilientes conservent de très bonnes perspectives de rendement.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA en bas de section */}
          <div className="text-center mt-12">
            <p className="text-lg sm:text-xl font-inter text-[#374151] mb-6">
              Vous avez d'autres questions ?
            </p>
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-[#253F60] hover:bg-[#1a2d47] text-white font-inter font-semibold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Prenez rendez-vous avec un conseiller Azalée Patrimoine pour un audit personnalisé
            </button>
          </div>
        </div>
      </section>

      {/* Section 20 & 21 : Articles Blog */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              Articles et guides immobiliers
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              Découvrez nos articles détaillés pour approfondir vos connaissances sur l'investissement immobilier
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Article 1 : Investissement immobilier rentable */}
            <Link 
              href="/immobilier/investissement-immobilier-rentable"
              className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#253F60] to-[#2d4a6b] overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/investment-chart.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 bg-[#B99066] text-white px-3 py-1 rounded-full text-sm font-inter font-semibold">
                  Guide complet
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-cairo font-bold text-[#253F60] mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Investissement immobilier rentable : comment bâtir une stratégie durable
                </h3>
                <p className="text-base font-inter text-[#374151] leading-relaxed mb-4">
                  Découvrez comment construire un investissement immobilier rentable avec Azalée Patrimoine : SCPI, LMNP, crédit, fiscalité, rendement net et stratégies durables pour bâtir votre indépendance financière.
                </p>
                <div className="flex items-center text-[#B99066] font-inter font-semibold">
                  <span>Lire l'article complet</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Article 2 : LMNP 2025 */}
            <Link 
              href="/immobilier/lmnp-2025"
              className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#253F60] to-[#B99066] overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/furnished-apartment.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 bg-[#253F60] text-white px-3 py-1 rounded-full text-sm font-inter font-semibold">
                  Analyse 2025
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-cairo font-bold text-[#253F60] mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  LMNP 2025 : le meublé reste-t-il un bon investissement après la réforme ?
                </h3>
                <p className="text-base font-inter text-[#374151] leading-relaxed mb-4">
                  La réforme 2025 change la donne pour le LMNP : les amortissements sont désormais réintégrés à la revente. Découvrez comment investir intelligemment en location meublée non professionnelle malgré la nouvelle fiscalité.
                </p>
                <div className="flex items-center text-[#B99066] font-inter font-semibold">
                  <span>Lire l'article complet</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-[#253F60] to-[#B99066] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">{pageContent.cta?.ctaTitle || "Prêt à Investir dans l'Immobilier ?"}</h2>
          <p className="text-xl mb-8">{pageContent.cta?.ctaText || "Contactez nos experts pour une consultation personnalisée et découvrez comment optimiser votre patrimoine immobilier."}</p>
          <button 
            onClick={() => window.open(pageContent.cta?.ctaLink || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            className="bg-[#B99066] text-white hover:bg-[#A67A5A] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg"
          >
            {pageContent.cta?.ctaButton || "Demander une consultation"}
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}