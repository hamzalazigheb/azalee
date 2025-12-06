"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function PlacementsPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  
  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Fetch content from CMS
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=placements&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          // API returns { success: true, data: page.content }
          if (data && data.success && data.data) {
            setContent(data.data);
          } else if (data && data.content) {
            // Fallback for different API format
            setContent(data.content);
          } else {
            console.warn('No content found in response, using default');
            setContent(null);
          }
        } else {
          console.error('Failed to fetch content');
          setContent(null);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
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

  // Use CMS content with fallback to default
  const pageContent = content || {
    hero: {
      h1: "Construire son patrimoine",
      introText: "Construire son patrimoine, c'est bien plus qu'investir. C'est donner du sens à son argent, structurer ses actifs avec méthode et préparer l'avenir de sa famille. Chez Azalée Patrimoine, nous vous accompagnons à chaque étape, en alliant performance, fiscalité optimisée et indépendance pour transformer votre patrimoine en levier de sérénité et de performance sur le long terme.",
      question: "Que souhaitez-vous faire ?",
      objectives: [
        "Faire fructifier votre épargne",
        "Financer un projet",
        "Optimiser ma transmission",
        "Revenus complémentaires",
        "Réduire ma fiscalité",
        "Préparer la retraite"
      ]
    },
    section1: {
      h2: "Comprendre les placements patrimoniaux",
      introText: "Avant de parler de produits, parlons de stratégie. La réussite patrimoniale repose d'abord sur la bonne compréhension des outils disponibles et de leur articulation. Nous distinguons deux notions essentielles : les enveloppes et les supports d'investissement.",
      linkText: "Liens vers Section 8 : Les enveloppes - les Supports"
    },
    section2: {
      h2: "Les placements sans risques sont-ils vraiment les meilleurs placements ?",
      h3_inflation: {
        title: "Quel rôle joue l'inflation dans le choix d'un placement ?",
        content: "Les placements dits \"sans risque\", comme le Livret A, le LDDS ou les fonds euros, rassurent parce qu'ils garantissent le capital. Pourtant, leur rendement est souvent inférieur à l'inflation, ce qui signifie que votre argent perd de la valeur avec le temps.",
        inflation_explanation: "L'inflation, c'est l'augmentation générale des prix. Autrement dit, avec le même euro, vous pouvez acheter moins de choses qu'avant.",
        example: "Exemple : si une baguette coûtait 1 € il y a cinq ans et qu'elle coûte aujourd'hui 1,20 €, votre pouvoir d'achat a diminué de 20 %.",
        conclusion: "Ainsi, un placement \"sans risque\" peut cacher un risque invisible : celui de l'érosion du pouvoir d'achat.",
        strategy: "Pour faire fructifier votre épargne, l'objectif n'est pas d'éviter le risque, mais de le maîtriser intelligemment.",
        balanced_strategy: "Une stratégie équilibrée doit combiner liquidité, sécurité et rendement, selon votre horizon de placement et votre profil investisseur.",
        tip: "Astuce Azalée Patrimoine : conservez vos placements garantis pour votre épargne de précaution, et explorez des solutions plus performantes pour vos projets à moyen et long terme."
      },
      h3_test: {
        title: "Testez vos connaissances et découvrez votre profil investisseur",
        content: "Avant d'investir, il est essentiel de comprendre votre relation au risque et votre niveau de connaissance financière.",
        help_list: [
          "votre taux de tolérance au risque",
          "vos objectifs patrimoniaux",
          "et les placements adaptés à votre horizon de temps."
        ],
        ctas: [
          { text: "Découvrir mon profil investisseur avec un conseiller Azalée", link: "https://calendly.com/contact-azalee-patrimoine" }
        ]
      }
    }
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full bg-[#253F60] lg:bg-gradient-to-r lg:from-[#253F60] lg:to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: H1 and Intro Text */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6">
              {/* H1 */}
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-cairo font-bold leading-tight">
                {pageContent.hero?.h1 || "Construire son patrimoine"}
              </h1>
              
              {/* Introductory Text */}
              <p className="text-white/90 text-base sm:text-lg lg:text-xl font-inter leading-relaxed max-w-2xl">
                {pageContent.hero?.introText || (
                  <>
                    Construire son patrimoine, c'est bien plus qu'investir. C'est donner du sens à son argent, structurer ses actifs avec méthode et préparer l'avenir de sa famille. Chez Azalée Patrimoine, nous vous accompagnons à chaque étape, en alliant performance, fiscalité optimisée et indépendance pour transformer votre patrimoine en levier de sérénité et de performance sur le long terme.
                  </>
                )}
              </p>
            </div>

            {/* Right Column: Question Bubble and Objectives Grid */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8">
              {/* Or Azalée Question Bubble */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-[#B99066] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl font-inter font-semibold text-base sm:text-lg lg:text-xl whitespace-nowrap">
                  {pageContent.hero?.question || "Que souhaitez-vous faire ?"}
              </div>
            </div>
            
              {/* Objectives Grid with Azalée colors */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-white/30">
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {(pageContent.hero?.objectives || []).map((objective, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-5 sm:p-6 shadow-lg transition-all duration-300 text-left border-2 border-transparent"
                    >
                      <p className="text-[#253F60] text-sm sm:text-base lg:text-lg font-inter font-semibold leading-tight">
                        {objective}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Bouton Contactez-nous */}
                <div className="mt-6 text-center">
                  <a
                    href="https://calendly.com/contact-azalee-patrimoine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Contactez-nous, on s'occupe de tout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Comprendre les placements patrimoniaux */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* H2 Title */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
              {pageContent.section1?.h2 || "Comprendre les placements patrimoniaux"}
            </h2>
          </div>

          {/* Introductory Text */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center">
              {pageContent.section1?.introText || "Avant de parler de produits, parlons de stratégie. La réussite patrimoniale repose d'abord sur la bonne compréhension des outils disponibles et de leur articulation. Nous distinguons deux notions essentielles : les enveloppes et les supports d'investissement."}
            </p>
              </div>
              
          {/* Key Concepts Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* ENVELOPPES Box */}
            <Link href="#section8" className="group relative block">
              <div className="bg-gradient-to-br from-[#253F60] via-[#1e3a5a] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border-2 border-[#253F60] hover:border-[#B99066] hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B99066]/30 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#B99066]/30 to-transparent rounded-tr-full"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-[#B99066] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold uppercase text-center mb-4 group-hover:text-[#D4A574] transition-colors duration-300">
                    ENVELOPPES
                  </h3>
                  <div className="flex justify-center mt-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#B99066] to-[#D4A574] rounded-full"></div>
                </div>
              </div>
            </div>
            </Link>

            {/* Supports d'investissement Box */}
            <Link href="#section8" className="group relative block">
              <div className="bg-gradient-to-br from-[#253F60] via-[#1e3a5a] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border-2 border-[#253F60] hover:border-[#B99066] hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B99066]/30 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#B99066]/30 to-transparent rounded-tr-full"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-[#B99066] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold uppercase text-center mb-4 group-hover:text-[#D4A574] transition-colors duration-300">
                    Supports d'investissement
            </h3>
                  <div className="flex justify-center mt-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#B99066] to-[#D4A574] rounded-full"></div>
            </div>
          </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Les placements sans risques */}
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* H2 Title */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
              {pageContent.section2?.h2 || "Les placements sans risques sont-ils vraiment les meilleurs placements ?"}
            </h2>
            </div>
            
          {/* H3 - Inflation - FAQ Style */}
          <div className="mb-12 sm:mb-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('inflation')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  {pageContent.section2?.h3_inflation?.title || "Quel rôle joue l'inflation dans le choix d'un placement ?"}
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['inflation'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['inflation'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-6 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p>{pageContent.section2?.h3_inflation?.content}</p>
                    
                    {/* Inflation Explanation Box */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300">
                      <p className="font-semibold text-[#253F60] mb-2">💬 {pageContent.section2?.h3_inflation?.inflation_explanation}</p>
                    </div>
                    
                    {/* Example Box */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border-l-4 border-[#253F60] shadow-md hover:shadow-lg transition-shadow duration-300">
                      <p className="font-semibold text-[#253F60] mb-2">🥖 {pageContent.section2?.h3_inflation?.example}</p>
                    </div>
                    
                    <p className="font-semibold text-[#253F60]">{pageContent.section2?.h3_inflation?.conclusion}</p>
                    <p>{pageContent.section2?.h3_inflation?.strategy}</p>
                    <p>{pageContent.section2?.h3_inflation?.balanced_strategy}</p>
                    
                    {/* Tip Box */}
                    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border-l-4 border-[#B99066] p-8 rounded-xl shadow-lg">
                      <p className="font-semibold text-[#253F60]">💡 {pageContent.section2?.h3_inflation?.tip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* H3 - Test - FAQ Style */}
          <div className="mb-12 sm:mb-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('test')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  {pageContent.section2?.h3_test?.title || "Testez vos connaissances et découvrez votre profil investisseur"}
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['test'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['test'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-6 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p>{pageContent.section2?.h3_test?.content}</p>
                    
                    <p className="font-semibold text-[#253F60]">Nos conseillers vous accompagnent pour identifier :</p>
                    <ul className="list-none space-y-4 ml-2">
                      {(pageContent.section2?.h3_test?.help_list || []).map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#B99066] font-bold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTAs */}
                    <div className="flex justify-center mt-8">
                      {(pageContent.section2?.h3_test?.ctas || [])
                        .filter(cta => !cta.text.includes("Évaluer mes connaissances financières"))
                        .map((cta, index) => (
                        <a
                          key={index}
                          href={cta.link}
                          target={cta.link.startsWith('http') ? '_blank' : '_self'}
                          rel={cta.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          {cta.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Private equity */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24" id="section3">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
            {(pageContent.section3?.intro || []).map((paragraph, index) => {
              // Mettre en italique les paragraphes d'intro qui parlent du private equity
              const shouldBeItalic = typeof paragraph === 'string' && (
                paragraph.includes('private equity') || 
                paragraph.includes('capital-investissement') ||
                paragraph.includes('Parmi les placements')
              );
              return (
                <p key={index} className={`text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center ${shouldBeItalic ? 'italic' : ''} ${index > 0 ? 'mt-4' : ''} ${index === 2 ? 'text-[#253F60] font-bold' : ''}`}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* H2 */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
              {pageContent.section3?.h2 || "Private equity : effet de mode ou réelle opportunité ?"}
            </h2>
          </div>
          
          {/* FAQ Style pour le contenu principal */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('private-equity')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  En savoir plus sur le Private Equity
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['private-equity'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['private-equity'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-8 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    {(pageContent.section3?.paragraphs || []).map((paragraph, index) => {
                      // Mettre en italique les 3 premiers paragraphes (le bloc sur le private equity)
                      const shouldBeItalic = index < 3;
                      return (
                        <p key={index} className={`${shouldBeItalic ? "italic" : ""} ${index === 4 ? "font-semibold text-[#253F60]" : ""}`}>
                          {paragraph}
                        </p>
                      );
                    })}

                    {/* Azalée Quote */}
                    {pageContent.section3?.quote && (
                      <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300">
                        <p className="font-semibold text-[#253F60] mb-2">💬 {pageContent.section3.quote.text}</p>
                        <p className="mt-2">{pageContent.section3.quote.conclusion}</p>
                      </div>
                    )}
                    
                    {(pageContent.section3?.more_paragraphs || []).map((paragraph, index) => (
                      <p key={index} className={index === 3 ? "font-semibold text-[#253F60]" : index === 4 ? "font-bold text-[#253F60] text-xl" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* H3 - 4 questions */}
          {pageContent.section3?.questions && (
            <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
              <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-8 text-center">
                {pageContent.section3.questions.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(pageContent.section3.questions.items || []).map((item, index) => {
                  // Alternance des couleurs selon la charte graphique : bleu azalée et or azalée
                  const circleColors = [
                    'bg-[#253F60]', // Question 1 - Bleu azalée
                    'bg-[#B99066]', // Question 2 - Or azalée
                    'bg-[#253F60]', // Question 3 - Bleu azalée
                    'bg-[#B99066]'  // Question 4 - Or azalée
                  ];
                  const circleColor = circleColors[index] || circleColors[0];
                  
                  return (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#253F60]">
                      <h4 className="text-[#253F60] font-bold text-lg mb-4 flex items-center gap-3">
                        <div className={`w-8 h-8 ${circleColor} rounded-full flex-shrink-0`}></div>
                        <span>{item.question}</span>
                      </h4>
                      <p className="text-[#4B5563]">{item.content}</p>
                      <p className="mt-2 font-semibold text-[#253F60]">{item.conclusion}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Encadré pédagogique */}
          {pageContent.section3?.remember && (
            <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-10 text-white shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-cairo font-bold mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                  </svg>
                  {pageContent.section3.remember.title}
                </h3>
                {(pageContent.section3.remember.points || []).map((point, index) => (
                  <p key={index} className={`${index < 2 ? 'text-xl sm:text-2xl leading-relaxed font-light mb-4' : 'text-lg font-semibold'}`}>
                    {point}
                  </p>
                ))}
              </div>
            </div>
          )}
            
          {/* CTAs */}
          {pageContent.section3?.ctas && (
            <div className="mt-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
                  {(pageContent.section3.ctas || []).map((cta, index) => {
                    // Alternance des couleurs pour les boutons
                    const buttonColors = [
                      { bg: 'bg-[#253F60]', hover: 'hover:bg-[#1a2d47]' }, // Bleu
                      { bg: 'bg-[#B99066]', hover: 'hover:bg-[#A67A5A]' }  // Or
                    ];
                    const colors = buttonColors[index % 2];
                    
                    return (
                      <a
                        key={index}
                        href={cta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${colors.bg} ${colors.hover} text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300`}
                      >
                        {cta.text}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
            
          {/* Conclusion */}
          {pageContent.section3?.conclusion && (
            <>
              <div className="mt-12 space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                {(pageContent.section3.conclusion.paragraphs || []).map((paragraph, index) => {
                  // Détecter si le paragraphe contient "L'objectif :" pour ajouter un retour à la ligne
                  const hasObjectif = typeof paragraph === 'string' && paragraph.includes("L'objectif :");
                  return (
                    <p key={index} className={index === 3 ? "font-semibold" : ""}>
                      {hasObjectif ? (
                        <>
                          {paragraph.split("L'objectif :")[0]}
                          <br className="hidden sm:block" />
                          <span className="block mt-2">L'objectif :{paragraph.split("L'objectif :")[1]}</span>
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  );
                })}
                
                {pageContent.section3.conclusion.quote && (
                  <div className="bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066] mt-6">
                    <p className="font-semibold text-[#253F60]">💬 {pageContent.section3.conclusion.quote}</p>
                  </div>
                )}
              </div>
              
              {/* CTAs finaux */}
              {pageContent.section3.conclusion.ctas && (
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {(pageContent.section3.conclusion.ctas || []).map((cta, index) => (
                    <a
                      key={index}
                      href={cta.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${index === 0 ? 'bg-[#253F60] hover:bg-[#1a2d47]' : 'bg-[#B99066] hover:bg-[#A67A5A]'} text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300`}
                    >
                      {cta.text}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section 4: SCPI */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* H2 */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight">
              Peut-on enfin réinvestir en SCPI ou faut-il encore craindre une baisse des valorisations ?
            </h2>
          </div>

          <div className="space-y-6 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-12">
            <p>
              Les SCPI (Sociétés Civiles de Placement Immobilier) ont traversé une période mouvementée depuis 2022, marquée par la hausse brutale des taux d'intérêt et une revalorisation à la baisse de nombreuses parts.
            </p>
            <p>
              Mais faut-il pour autant s'en détourner ? Pas forcément. Comprendre le lien entre taux, immobilier et valorisation permet de replacer les choses dans leur contexte.
            </p>
          </div>
              
          {/* H3 - Taux et immobilier */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Quand les taux montent, la valeur de l'immobilier baisse : pourquoi ?
            </h3>
            
            <div className="space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p>Le lien de cause à effet est simple :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Lorsque les taux d'intérêt augmentent, les crédits immobiliers coûtent plus cher.</li>
                <li>Les acheteurs (particuliers ou institutionnels) peuvent donc emprunter moins, ce qui réduit la demande.</li>
                <li>Or, moins de demande = baisse mécanique des prix pour rétablir l'équilibre du marché.</li>
            </ul>
              <p>
                Dans le cas des SCPI, dont la valeur dépend des expertises immobilières, cette correction des prix se traduit par une réévaluation à la baisse des parts.
              </p>
            <p className="font-semibold">
                Certaines SCPI ont ainsi enregistré entre -5 % et -15 % de baisse depuis 2022, selon leur exposition (bureaux, commerces, logistique…).
            </p>
          </div>
        </div>

          {/* H3 - Réglementation */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              L'impact de la réglementation sur les valorisations depuis 2022
            </h3>
            
            <div className="space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p>
                Depuis 2022, la réglementation de l'Autorité des Marchés Financiers (AMF) impose davantage de transparence et de réalisme dans l'évaluation des SCPI.
              </p>
              <p className="font-semibold">Les sociétés de gestion doivent désormais :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>se baser sur des valeurs d'expertise actualisées au moins une fois par an ;</li>
                <li>ajuster la valeur de retrait des parts si elle s'écarte trop de la valeur réelle du patrimoine ;</li>
                <li>et communiquer un rendement global (ou rendement interne) plutôt qu'un simple taux de distribution, jugé parfois trompeur.</li>
              </ul>
              <div className="bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066] mt-4">
                <p className="font-semibold text-[#253F60]">👉 Résultat : les baisses de 2023–2024 ne traduisent pas une crise du marché, mais une mise à niveau comptable et réglementaire.</p>
                <p className="mt-2">Elles visent à rétablir la cohérence entre les prix affichés et la réalité économique.</p>
              </div>
            </div>
          </div>

          {/* H3 - Revente gré à gré */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Revente de gré à gré : une solution alternative en période d'illiquidité
            </h3>
            
            <div className="space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p>
                Depuis 2023, de nombreux épargnants se heurtent à un ralentissement du marché secondaire des SCPI, avec des délais de vente allongés.
              </p>
              <p>Dans ce contexte, la vente de gré à gré revient sur le devant de la scène.</p>
              <p>Ce mécanisme consiste à vendre directement ses parts à un autre investisseur, sans passer par le carnet d'ordres officiel de la société de gestion.</p>
              
              <p className="font-semibold mt-4">Elle présente plusieurs avantages :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>une plus grande flexibilité sur le prix de cession (souvent négocié à une légère décote, entre –5 % et –10 %),</li>
                <li>une rapidité d'exécution lorsqu'un acheteur est identifié,</li>
                <li>et une solution adaptée aux investisseurs souhaitant céder des parts anciennes ou moins liquides.</li>
              </ul>
              
              <p className="mt-4">
                Mais cette pratique suppose de bien évaluer la valeur réelle des parts et de maîtriser les aspects fiscaux et administratifs de la transaction (agrément de la société de gestion, frais, droits d'enregistrement).
              </p>
              
              <div className="bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066] mt-4">
                <p className="font-semibold text-[#253F60]">💬 Chez Azalée Patrimoine, nous accompagnons nos clients dans la revente de gré à gré pour garantir la sécurité juridique et financière de l'opération, tout en optimisant le prix de cession.</p>
          </div>
        </div>
          </div>

          {/* H3 - Réinvestir en 2025 */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Faut-il revenir sur les SCPI en 2025 ?
            </h3>
            
            <div className="space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p>
                Après plusieurs trimestres d'ajustement, le marché montre des signes de stabilisation.
              </p>
              <p>
                Les taux semblent proches de leur pic, et certaines SCPI commencent déjà à retrouver des opportunités d'achat à prix décoté.
              </p>
              <p className="font-semibold">
                C'est donc une période propice pour réinvestir avec discernement, en privilégiant :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>les SCPI diversifiées (secteurs, zones géographiques, types d'actifs),</li>
                <li>les SCPI à capital variable réactives,</li>
                <li>et celles ayant anticipé la remontée des taux par une gestion prudente de la dette.</li>
              </ul>
            </div>
            </div>
            
          {/* Encadré pédagogique */}
          <div className="mb-12 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Comprendre le cycle SCPI</h3>
            <div className="space-y-4 text-lg">
              <p className="font-semibold">À retenir :</p>
              <p>Les SCPI ne sont pas des placements à court terme.</p>
              <p>Elles suivent un cycle immobilier de 7 à 10 ans, avec des phases d'expansion, de correction et de stabilisation.</p>
              <div className="mt-4 space-y-2">
                <p>📉 Quand les taux montent → les valeurs baissent.</p>
                <p>📈 Quand les taux se stabilisent → les SCPI redeviennent attractives grâce à des rendements plus élevés sur les prix ajustés.</p>
              </div>
              <p className="mt-4 font-semibold">Chez Azalée Patrimoine, nous analysons les SCPI selon trois critères :</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Qualité du patrimoine (localisation, taux d'occupation, solidité des locataires)</li>
                <li>Politique de gestion (diversification, endettement, transparence)</li>
                <li>Potentiel de revalorisation à moyen terme</li>
              </ul>
                </div>
              </div>
              
          {/* Conclusion */}
          <div className="mb-8">
            <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
              Conclusion – Vers un réinvestissement raisonné
            </h3>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              Les SCPI ne sont pas en déclin, elles se réinventent dans un nouveau cycle économique.
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mt-2">
              Réinvestir aujourd'hui, c'est profiter de prix ajustés et de rendements potentiellement plus élevés, à condition d'être accompagné par un conseiller indépendant capable de décoder le marché.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://calendly.com/contact-azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Faire le point sur mes SCPI actuelles
            </a>
            <a
              href="https://calendly.com/contact-azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Identifier les opportunités 2025 avec un conseiller Azalée
            </a>
          </div>
        </div>
      </section>

      {/* Section 5: Assurance-vie luxembourgeoise */}
      <section id="assurance-vie-lux" className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* H2 */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight">
              Les contrats d'assurance-vie luxembourgeois : vers une démocratisation de l'exode ?
            </h2>
              </div>

          <div className="space-y-6 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-12">
            <p>
              Dans un contexte politique et fiscal incertain, de plus en plus de Français s'interrogent sur l'avenir de leur patrimoine.
            </p>
            <p>
              L'assurance-vie luxembourgeoise (AV Lux) attire ceux qui envisagent une expatriation, séduits par sa portabilité internationale et sa neutralité fiscale.
            </p>
            <p className="font-semibold">
              Mais est-ce réellement une solution pour tous ? Ou seulement un outil réservé aux patrimoines internationaux ?
            </p>
          </div>

          {/* H3 - Pourquoi */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Pourquoi l'Assurance Vie Lux peut faire sens
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500">
                <p className="font-semibold text-[#253F60] mb-2">✅ Sécurité renforcée</p>
                <p className="text-sm">le triangle de sécurité et le super-privilège protègent mieux les souscripteurs en cas de faillite de l'assureur.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500">
                <p className="font-semibold text-[#253F60] mb-2">✅ Portabilité et neutralité fiscale</p>
                <p className="text-sm">idéale pour ceux qui changent de résidence fiscale.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500">
                <p className="font-semibold text-[#253F60] mb-2">✅ Large univers d'investissement</p>
                <p className="text-sm">supports multi-devises, fonds institutionnels, gestion sur mesure.</p>
              </div>
                </div>
              </div>
              
          {/* H3 - Limites */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Les limites à connaître
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-yellow-500">
                <p className="font-semibold text-[#253F60] mb-2">⚠️ Ticket d'entrée élevé</p>
                <p className="text-sm">(souvent &gt; 250 000 €)</p>
                </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-yellow-500">
                <p className="font-semibold text-[#253F60] mb-2">⚠️ Frais plus importants</p>
                <p className="text-sm">pour les patrimoines inférieurs à 1 M€</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-yellow-500">
                <p className="font-semibold text-[#253F60] mb-2">⚠️ Arbitrages complexes</p>
                <p className="text-sm">à distance en cas d'expatriation</p>
            </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-yellow-500">
                <p className="font-semibold text-[#253F60] mb-2">⚠️ Fonds en euros</p>
                <p className="text-sm">peu accessibles ou moins performants</p>
          </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-yellow-500 md:col-span-2">
                <p className="font-semibold text-[#253F60] mb-2">⚠️ Liquidité réduite</p>
                <p className="text-sm">et gestion sous mandat fréquente</p>
        </div>
              </div>
            </div>
            
          {/* Le regard Azalée */}
          <div className="mb-12 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
            <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Le regard Azalée :</h3>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              Le contrat luxembourgeois est une belle invention patrimoniale — mais surtout pour les bi-nationaux, expatriés ou familles à patrimoine supérieur à 1 M€.
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mt-2">
              Pour un résident français, il faut se demander si l'on ne paie pas des fonctions dont on ne profitera jamais.
            </p>
          </div>

          {/* À retenir */}
          <div className="mb-12 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">💡 À retenir</h3>
            <p className="text-lg mb-4">
              L'assurance-vie luxembourgeoise est un outil stratégique si :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>vous préparez une expatriation,</li>
              <li>vous disposez d'un capital important,</li>
              <li>vous avez besoin d'une gestion sur mesure et internationale.</li>
            </ul>
            <p className="text-lg mt-4 font-semibold">
              Mais elle reste peu adaptée aux épargnants français cherchant un contrat souple, réactif et rentable à moindre coût.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://calendly.com/contact-azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Évaluer la pertinence d'un contrat luxembourgeois
            </a>
            <a
              href="https://calendly.com/contact-azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Comparer avec un contrat français haut de gamme
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: Or et métaux précieux */}
      <section id="or-metaux" className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* H2 */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight">
              L'or et les métaux précieux : après +50 % en 2025, est-il trop tard pour investir ?
            </h2>
          </div>

          <div className="space-y-6 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-12">
            <p>
              L'année 2025 a confirmé le retour en force de l'or et des métaux précieux.
            </p>
            <p>
              Entre inflation persistante, tensions géopolitiques et ralentissement économique mondial, l'or a progressé de plus de 50 % sur un an, atteignant de nouveaux sommets historiques.
            </p>
            <p className="font-semibold">
              Mais cette performance spectaculaire pose une question cruciale : est-il encore temps d'acheter, ou le train est-il déjà passé ?
            </p>
          </div>

          {/* H3 - Pourquoi l'or a flambé */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Pourquoi l'or a flambé en 2025
            </h3>
            
            <div className="space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p className="font-semibold">L'or reste avant tout une valeur refuge.</p>
              <p>Sa flambée récente s'explique par plusieurs facteurs conjoints :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><span className="font-semibold">📈 L'inflation durable</span> : même si elle ralentit, elle continue d'éroder le pouvoir d'achat des monnaies fiduciaires.</li>
                <li><span className="font-semibold">💸 Les politiques monétaires expansionnistes</span> : la baisse anticipée des taux d'intérêt réels a dopé l'attrait des actifs non rémunérés comme l'or.</li>
                <li><span className="font-semibold">🌍 Les tensions géopolitiques</span> (Europe de l'Est, Asie) : elles alimentent la recherche de sécurité.</li>
                <li><span className="font-semibold">🏦 Les achats massifs des banques centrales</span>, notamment asiatiques, qui renforcent la demande structurelle.</li>
              </ul>
              <p>
                L'or a ainsi joué pleinement son rôle de bouclier contre la perte de confiance et la dépréciation monétaire.
              </p>
                </div>
          </div>

          {/* H3 - Trop tard ? */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Trop tard pour investir ? Pas forcément. Mais autrement.
            </h3>
            
            <div className="space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p>
                Historiquement, acheter de l'or au plus haut n'a jamais été catastrophique… à condition de savoir pourquoi on le détient.
              </p>
              <p className="font-semibold">
                L'or n'est pas un placement spéculatif, c'est un outil de diversification et de préservation de valeur.
              </p>
              
              <div className="bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
                <p className="font-semibold text-[#253F60]">💬 En d'autres termes : on n'achète pas l'or "pour gagner", on l'achète "pour ne pas perdre".</p>
          </div>

              <p>Aujourd'hui, il serait risqué d'augmenter fortement son exposition après une telle hausse, mais il reste pertinent de :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>détenir une part stratégique (5 à 10 % du patrimoine) en or ou métaux précieux,</li>
                <li>privilégier les supports indirects (ETF adossés, certificats, fonds matières premières) pour la liquidité,</li>
                <li>échelonner ses achats dans le temps (DCA) plutôt que d'entrer d'un bloc.</li>
              </ul>
            </div>
              </div>
              
          {/* H3 - Autres métaux */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Et les autres métaux précieux ?
            </h3>
            
            <div className="space-y-4 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p>
                L'argent a souvent un effet de levier sur l'or, mais il reste plus volatil et dépend davantage de la demande industrielle.
              </p>
              <p>
                Le platine et le palladium sont liés au secteur automobile (catalyseurs), donc plus cycliques.
              </p>
              <p>
                Le cuivre, considéré comme le "métal de la transition énergétique", attire aussi les investisseurs thématiques.
              </p>
              <p className="font-semibold">
                👉 Ces métaux peuvent compléter une stratégie de diversification, mais ils n'ont pas le même rôle que l'or : ce sont des actifs de croissance, pas de protection.
                  </p>
                </div>
              </div>

          {/* Encadré pédagogique */}
          <div className="mb-12 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">L'or dans une stratégie patrimoniale équilibrée</h3>
            <div className="space-y-4 text-lg">
              <p className="font-semibold">À retenir :</p>
              <p>L'or ne rapporte rien, mais il protège en cas de crise.</p>
              <p>Il agit comme assurance contre la perte de confiance dans les marchés financiers.</p>
              <p>Une exposition raisonnable (5 à 10 %) suffit à réduire la volatilité d'un portefeuille.</p>
              <p className="font-semibold mt-4">Mieux vaut acheter progressivement que spéculer sur le point d'entrée parfait.</p>
              <p className="mt-4">Chez Azalée Patrimoine, nous intégrons l'or dans une logique d'équilibre : ni peur, ni euphorie — juste du bon sens.</p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mb-8">
            <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
              Conclusion – L'or, toujours d'actualité, mais plus pour la sérénité que pour le profit
            </h3>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              Après +50 % de performance, l'or n'est plus une opportunité de rendement, mais reste un outil de stabilité patrimoniale.
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mt-2">
              Investir aujourd'hui, c'est accepter de payer la tranquillité : la certitude que, quelle que soit la conjoncture, une partie du patrimoine reste à l'abri.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://calendly.com/contact-azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Faire le point sur ma stratégie de diversification
            </a>
            <a
              href="https://calendly.com/contact-azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Déterminer la part optimale d'or dans mon portefeuille
            </a>
          </div>
        </div>
      </section>

      {/* Section 7: Produits structurés */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* H2 */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
              Les produits structurés : pourquoi tout le monde s'accorde enfin sur ces placements ?
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-6 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed mb-12 text-center">
            <p>
              Longtemps perçus comme techniques, les produits structurés se sont imposés comme une solution d'équilibre dans les portefeuilles patrimoniaux.
            </p>
            <p>
              Aujourd'hui, assureurs, brokers, conseillers et clients y trouvent chacun leur compte, un consensus rare dans l'univers de l'investissement.
            </p>
            <p className="font-semibold text-[#253F60]">
              Mais pourquoi cet engouement ? Et comment expliquer que ces produits séduisent aussi bien les investisseurs prudents que les profils dynamiques ?
            </p>
          </div>

          {/* H3 - Placement mi-chemin - FAQ Style */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('placement-mi-chemin')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  Un placement à mi-chemin entre prudence et rendement
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['placement-mi-chemin'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['placement-mi-chemin'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-4 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p>Les produits structurés sont des instruments hybrides :</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>une partie obligataire pour la protection du capital,</li>
                      <li>une partie dérivée liée à un indice ou un panier d'actions, pour capter de la performance.</li>
                    </ul>
                    <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300 mt-4">
                      <p className="font-semibold text-[#253F60]">👉 Résultat : des contrats capables d'offrir un rendement cible défini à l'avance, tout en limitant les pertes grâce à des mécanismes de protection.</p>
                    </div>
                    <p>
                      C'est cette visibilité qui rassure les épargnants, surtout après les chocs boursiers récents : ils savent dans quelles conditions ils gagnent ou perdent.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* H3 - Pourquoi les assureurs - FAQ Style */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('assureurs')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  Pourquoi les assureurs aiment les produits structurés
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['assureurs'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['assureurs'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-4 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p>Pour les assureurs, ces produits répondent à un double enjeu :</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Remplacer progressivement les fonds euros (dont les rendements sont sous pression),</li>
                      <li>tout en maîtrisant leur risque global de bilan grâce à une ingénierie financière encadrée.</li>
                    </ul>
                    <p>
                      Ils permettent donc de maintenir un rendement attractif sans déséquilibrer la gestion financière du contrat d'assurance-vie.
                    </p>
                    <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border-l-4 border-[#B99066] shadow-md hover:shadow-lg transition-shadow duration-300 mt-4">
                      <p className="font-semibold text-[#253F60]">💬 "Les produits structurés, c'est le chaînon manquant entre le fonds euro et les marchés actions."</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* H3 - Pourquoi les brokers - FAQ Style */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('brokers')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  Pourquoi les brokers et les banques les plébiscitent
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['brokers'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['brokers'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-4 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p>Les brokers spécialisés conçoivent aujourd'hui des structures sur mesure avec :</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>des sous-jacents variés (indices, paniers sectoriels, ESG…),</li>
                      <li>des barrières de protection élevées (souvent 50 à 60 % de baisse avant perte en capital),</li>
                      <li>et une transparence accrue sur les frais et les scénarios.</li>
                    </ul>
                    <p>
                      Le marché s'est professionnalisé : les émissions sont mieux calibrées et les distributeurs mieux formés.
                    </p>
                    <p className="font-semibold text-[#253F60]">
                      Résultat : une offre lisible, standardisée et encadrée par l'AMF.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* H3 - Pourquoi les CGP - FAQ Style */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('cgp')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  Pourquoi les CGP s'y retrouvent
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['cgp'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['cgp'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-4 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p>Les conseillers en gestion de patrimoine apprécient les produits structurés pour leur souplesse :</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Ils s'intègrent dans l'assurance-vie, le PER, ou un compte-titres,</li>
                      <li>Ils permettent d'adapter le profil rendement/risque au client,</li>
                      <li>Ils offrent une communication claire sur les conditions de gain et de protection.</li>
                    </ul>
                    <p>
                      En période d'incertitude, ils servent d'outil d'allocation intelligente : ni trop risqué, ni trop défensif.
                    </p>
                    <p className="font-semibold text-[#253F60]">
                      Et ils valorisent la valeur ajoutée du conseil, car leur compréhension nécessite un accompagnement professionnel.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* H3 - Pourquoi les clients - FAQ Style */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('clients')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  Pourquoi les clients en redemandent
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['clients'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['clients'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-4 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p className="font-semibold">Côté clients, trois éléments clés expliquent l'adhésion :</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><span className="font-semibold">Lisibilité</span> : le scénario est connu dès le départ (ex. +9 %/an si l'indice ne baisse pas de plus de 40 %).</li>
                      <li><span className="font-semibold">Protection</span> : un filet de sécurité en cas de baisse des marchés.</li>
                      <li><span className="font-semibold">Souplesse</span> : possibilité d'investir dans un produit calibré pour son horizon (3 à 8 ans) et son profil.</li>
                    </ul>
                    <p className="font-semibold text-[#253F60]">
                      Résultat : les performances réelles observées entre 2016 et 2024 sont souvent supérieures à celles des fonds euros, avec une volatilité contenue.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Encadré pédagogique */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-10 text-white shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-cairo font-bold mb-6">Les produits structurés en 3 phrases</h3>
            <div className="space-y-4 text-lg">
              <p className="font-semibold">À retenir :</p>
              <p>Un produit structuré, c'est un rendement cible + une protection définie à l'avance.</p>
              <p>Il est particulièrement adapté aux marchés incertains, où la volatilité devient une opportunité.</p>
              <p className="font-semibold">Il ne faut pas chercher à "battre le marché", mais à sécuriser une performance maîtrisée dans le temps.</p>
              <p className="mt-4">Chez Azalée Patrimoine, nous analysons chaque structure selon trois critères :</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>La qualité de l'émetteur,</li>
                <li>Le niveau de protection du capital,</li>
                <li>Le scénario de marché réaliste sur lequel repose le rendement.</li>
              </ul>
            </div>
          </div>
        </div>

          {/* H3 - Consensus - FAQ Style */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('consensus')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  Pourquoi ce consensus n'est pas un hasard
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['consensus'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['consensus'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-6 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <div className="overflow-x-auto">
                      <table className="w-full bg-white rounded-lg shadow-lg border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-[#253F60] to-[#B99066] text-white">
                            <th className="p-4 text-left font-bold">Acteur</th>
                            <th className="p-4 text-left font-bold">Ce qu'il y gagne</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="p-4 font-semibold text-[#253F60]">Assureur</td>
                            <td className="p-4">Un rendement attractif sans déséquilibrer son bilan</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="p-4 font-semibold text-[#253F60]">Broker</td>
                            <td className="p-4">Une ingénierie rentable et transparente</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-semibold text-[#253F60]">CGP</td>
                            <td className="p-4">Un produit lisible et différenciant pour ses clients</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="p-4 font-semibold text-[#253F60]">Client final</td>
                            <td className="p-4">Un couple rendement / risque cohérent et encadré</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-6">
                      Ce cercle vertueux explique leur succès : tout le monde y trouve son équilibre — à condition de les comprendre et de les choisir avec discernement.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conclusion - FAQ Style */}
          <div className="mb-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:border-[#B99066] transition-all duration-300">
              <button
                onClick={() => toggleSection('conclusion')}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold pr-4">
                  Conclusion – La clé, c'est la structuration
                </h3>
                <svg
                  className={`w-6 h-6 text-[#B99066] flex-shrink-0 transform transition-transform duration-300 ${
                    openSections['conclusion'] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openSections['conclusion'] && (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[#E5E7EB] pt-6">
                  <div className="space-y-4 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
                    <p>
                      Les produits structurés ne sont pas des placements miracles, mais des instruments d'ingénierie patrimoniale.
                    </p>
                    <p>
                      Leur succès repose sur la pédagogie et la qualité du conseil.
                    </p>
                    <p>
                      Bien construits, ils permettent de réconcilier performance et prudence, et de rassurer les clients sans brider leur rendement.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/placements/produits-structures"
              className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Découvrir les meilleures opportunités structurées du moment
            </Link>
            <a
              href="https://calendly.com/contact-azalee-patrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              👉 Faire le point sur vos placements sécurisés avec un conseiller Azalée
            </a>
          </div>

          {/* Grille de produits structurés */}
          <div className="max-w-7xl mx-auto">
            <h3 className="text-[#253F60] text-3xl sm:text-4xl font-cairo font-bold mb-12 text-center tracking-tight">
              La sélection de produits structurés d'Azalée pour 2025/2026
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Produit 1: ATHENA DÉGRESSIF LUXE */}
              <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60] hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                {/* Ovale orange avec pourcentage */}
                <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-full transform translate-x-6 -translate-y-3 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">+15%</span>
          </div>

                <div className="p-6">
                  <h4 className="text-[#253F60] text-xl font-cairo font-bold mb-4 pr-16">
                    ATHENA DÉGRESSIF LUXE – JUILLET 2025
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">(FR001400ZAJ7)</p>
                  
                  <div className="space-y-3 text-sm text-[#4B5563]">
                    <div>
                      <span className="font-semibold text-[#253F60]">Thématique :</span> Luxe & consommation mondiale
                  </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Émetteur :</span> Natixis Structured Issuance SA
                </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Garant :</span> Natixis (Notation A / A1 / A+)
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Durée :</span> 10 ans (échéance 2035)
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Rendement :</span> +1,25 % par mois écoulé, soit jusqu'à +15 % par an
              </div>
            </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/placements/produits-structures/athena-luxe-2025"
                      className="block w-full bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg shadow-md font-inter font-semibold text-center transition-all duration-300 text-sm"
                    >
                      Obtenir la brochure
                    </Link>
                  </div>
                </div>
              </div>

              {/* Produit 2: ATHENA DÉGRESSIF IA & ROBOTIQUE */}
              <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60] hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-full transform translate-x-6 -translate-y-3 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">+15%</span>
            </div>

                <div className="p-6">
                  <h4 className="text-[#253F60] text-xl font-cairo font-bold mb-4 pr-16">
                    ATHENA DÉGRESSIF IA & ROBOTIQUE – JUILLET 2025
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">(FR001400ZAJ8)</p>
                  
                  <div className="space-y-3 text-sm text-[#4B5563]">
                    <div>
                      <span className="font-semibold text-[#253F60]">Thématique :</span> Intelligence artificielle & robotique
                  </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Émetteur :</span> Natixis Structured Issuance SA
                </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Durée :</span> 10 ans (échéance 2035)
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Rendement :</span> +1,25 % par mois écoulé, soit jusqu'à +15 % par an
              </div>
            </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/placements/produits-structures/athena-ia-robotique-2025"
                      className="block w-full bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg shadow-md font-inter font-semibold text-center transition-all duration-300 text-sm"
                    >
                      Obtenir la brochure
                    </Link>
                  </div>
                </div>
              </div>

              {/* Produit 3: ÉNERGIE DÉGRESSIVE */}
              <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60] hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-full transform translate-x-6 -translate-y-3 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">9%</span>
                </div>
                
                <div className="p-6">
                  <h4 className="text-[#253F60] text-xl font-cairo font-bold mb-4 pr-16">
                    ÉNERGIE DÉGRESSIVE AVRIL 2025
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">(FR001400WTQ9)</p>
                  
                  <div className="space-y-3 text-sm text-[#4B5563]">
                    <div>
                      <span className="font-semibold text-[#253F60]">Thématique :</span> Énergie & transition énergétique
                  </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Émetteur :</span> BNP Paribas Issuance B.V.
                </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Durée :</span> 10 ans (échéance 2035)
              </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Rendement :</span> 9 % par an
            </div>
          </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/placements/produits-structures/energie-degressive-2025"
                      className="block w-full bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg shadow-md font-inter font-semibold text-center transition-all duration-300 text-sm"
                    >
                      Obtenir la brochure
                    </Link>
                  </div>
                </div>
          </div>

              {/* Produit 4: AUTO-CALL CRÉDIT AGRICOLE */}
              <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60] hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-full transform translate-x-6 -translate-y-3 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">+15%</span>
                </div>
                
                <div className="p-6">
                  <h4 className="text-[#253F60] text-xl font-cairo font-bold mb-4 pr-16">
                    AUTO-CALL CRÉDIT AGRICOLE – JUIN 2025
                    </h4>
                  <p className="text-sm text-gray-600 mb-4">(FR001459AB6990)</p>
                  
                  <div className="space-y-3 text-sm text-[#4B5563]">
                    <div>
                      <span className="font-semibold text-[#253F60]">Thématique :</span> Secteur bancaire / action unique
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Émetteur :</span> Société Générale
                  </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Durée :</span> 5 ans (échéance 2030)
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Rendement :</span> +15 % déjà réalisés depuis le lancement
                    </div>
                </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/placements/produits-structures/autocall-credit-agricole-2025"
                      className="block w-full bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg shadow-md font-inter font-semibold text-center transition-all duration-300 text-sm"
                    >
                      Obtenir la brochure
                    </Link>
                    </div>
                  </div>
                </div>

              {/* Produit 5: AMBITION PHARMA */}
              <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60] hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-full transform translate-x-6 -translate-y-3 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">10%</span>
                </div>
                
                <div className="p-6">
                  <h4 className="text-[#253F60] text-xl font-cairo font-bold mb-4 pr-16">
                    AMBITION PHARMA JANVIER 2026
                    </h4>
                  <p className="text-sm text-gray-600 mb-4">(EI21918ACD)</p>
                  
                  <div className="space-y-3 text-sm text-[#4B5563]">
                    <div>
                      <span className="font-semibold text-[#253F60]">Thématique :</span> Santé & biotechnologies
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Émetteur :</span> Crédit Agricole CIB
                  </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Durée :</span> 8 ans (échéance 2034)
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Rendement :</span> 10 % par an
                    </div>
                </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/placements/produits-structures/ambition-pharma-2026"
                      className="block w-full bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg shadow-md font-inter font-semibold text-center transition-all duration-300 text-sm"
                    >
                      Obtenir la brochure
                    </Link>
                  </div>
                </div>
              </div>

              {/* Produit 6: Phoenix Bearish EURIBOR */}
              <div className="bg-white rounded-xl shadow-xl border-2 border-[#253F60] hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-16 bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-full transform translate-x-6 -translate-y-3 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">7%</span>
                </div>
                
                <div className="p-6">
                  <h4 className="text-[#253F60] text-xl font-cairo font-bold mb-4 pr-16">
                    Phoenix Bearish EURIBOR 12M Novembre 2025
                    </h4>
                  
                  <div className="space-y-3 text-sm text-[#4B5563]">
                    <div>
                      <span className="font-semibold text-[#253F60]">Thématique :</span> Taux d'intérêt
                    </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Sous-jacent :</span> Euribor 12 mois
                  </div>
                    <div>
                      <span className="font-semibold text-[#253F60]">Rendement :</span> 7 % par an
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href="/placements/produits-structures"
                      className="block w-full bg-[#253F60] hover:bg-[#1a2d47] text-white px-6 py-3 rounded-lg shadow-md font-inter font-semibold text-center transition-all duration-300 text-sm"
                    >
                      Obtenir la brochure
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mt-8">
              <p className="text-sm text-[#4B5563]">
                <strong className="text-[#253F60]">🔒 Disclaimer global :</strong> Les produits présentés sont destinés à des investisseurs avertis ayant une bonne compréhension des mécanismes et des risques associés aux produits structurés. Ils ne constituent pas un conseil en investissement personnalisé. Avant toute souscription, il est impératif de vérifier l'adéquation du produit avec le profil de risque et les objectifs d'investissement de chaque investisseur.
                  </p>
                </div>
          </div>
        </div>
      </section>

      {/* Section 8: Enveloppes et supports d'investissement */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24" id="section8">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* H2 - Enveloppes */}
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-6">
              Les enveloppes d'investissement
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              Les enveloppes constituent le cadre juridique et fiscal de vos placements. Elles déterminent la fiscalité applicable, la souplesse de gestion et la transmission du capital.
                  </p>
                    </div>

          {/* Enveloppes Grid - 3 premières cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Assurance-vie */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all relative">
              <Link href="/placements/assurance-vie" className="block mb-4 group">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold hover:text-[#B99066] transition-colors cursor-pointer relative z-10">L'assurance-vie</h3>
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed mb-4">
                Outil central de la gestion de patrimoine, l'assurance-vie permet de diversifier ses placements, de bénéficier d'une fiscalité avantageuse et de préparer la transmission de son patrimoine.
              </p>
              <Link
                href="/placements/assurance-vie"
                className="inline-block bg-[#253F60] hover:bg-[#1a2d47] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Nos assureurs partenaires
              </Link>
                  </div>

            {/* PER */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all relative">
              <Link href="/placements/pea-per" className="block mb-4 group">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold hover:text-[#B99066] transition-colors cursor-pointer relative z-10">Le Plan Épargne Retraite (PER)</h3>
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed mb-4">
                Le PER combine avantage fiscal immédiat et épargne long terme. Il permet de préparer sa retraite tout en réduisant son impôt sur le revenu.
              </p>
              <Link
                href="/placements/pea-per"
                className="inline-block bg-[#253F60] hover:bg-[#1a2d47] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Simuler votre versement idéal
              </Link>
                </div>

            {/* PEA et compte-titres */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all relative">
              <Link href="/placements/pea-per" className="block mb-4 group">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold hover:text-[#B99066] transition-colors cursor-pointer relative z-10">Le PEA et le compte-titres</h3>
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed mb-4">
                Le PEA favorise l'investissement en actions européennes dans un cadre fiscal attractif, tandis que le compte-titres permet une plus grande liberté d'investissement. Ces enveloppes favorisent l'investissement à risque fort. Ce qui peut engendrer des phases de moins values. Saviez-vous qu'elles sont reportables.
              </p>
              <Link
                href="/placements/compte-titres"
                className="inline-block bg-[#253F60] hover:bg-[#1a2d47] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
              >
                Faites analyser vos contrats et vérifier vos déclarations de revenus
              </Link>
                    </div>
          </div>

          {/* 2 dernières cartes centrées */}
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {/* Contrat de capitalisation */}
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Le contrat de capitalisation</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Peu connu, le contrat de capitalisation reprend les atouts de l'assurance-vie, mais offre des avantages civils spécifiques en matière de transmission.
                    </p>
                    </div>

              {/* Livrets */}
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Les livrets réglementés et placements court terme</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Utiles pour sécuriser une épargne de précaution, les livrets (A, LDDS, LEP) offrent sécurité et liquidité, mais leur rendement reste limité.
                    </p>
                  </div>
            </div>
          </div>

          {/* H2 - Supports */}
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-6">
              Les supports d'investissement
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              Les supports représentent les actifs dans lesquels vous investissez à l'intérieur de vos enveloppes. Ils permettent d'adapter votre stratégie à votre profil de risque et à vos objectifs de rendement.
                  </p>
            </div>

          {/* Supports Grid - 6 premières cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Fonds en euros */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all">
              <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Les fonds en euros et unités de compte</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Les fonds en euros garantissent le capital, tandis que les unités de compte (actions/obligations…) offrent un potentiel de performance supérieur, au prix d'une volatilité plus forte.
              </p>
                </div>

            {/* Produits structurés */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all relative">
              <Link href="/placements/produits-structures" className="block mb-4 group">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold hover:text-[#B99066] transition-colors cursor-pointer relative z-10">Les produits structurés</h3>
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Les produits structurés allient protection partielle du capital et rendement conditionnel. Chez Azalée, nous sélectionnons les meilleurs émetteurs et suivons les performances réelles de nos produits maison.
              </p>
              </div>

            {/* SCPI et OPCI */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all relative">
              <Link href="/placements/scpi-opci" className="block mb-4 group">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold hover:text-[#B99066] transition-colors cursor-pointer relative z-10">Les SCPI et OPCI</h3>
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Les SCPI et OPCI permettent d'investir dans l'immobilier sans contrainte de gestion. Nos experts sélectionnent des fonds solides, performants et diversifiés pour générer un revenu régulier.
              </p>
            </div>

            {/* Fonds thématiques */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all">
              <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Les fonds thématiques et ESG</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Les fonds thématiques (santé, climat, technologie, infrastructures) et les fonds labellisés ESG offrent une nouvelle façon d'investir durablement tout en participant à la transition économique.
              </p>
          </div>

            {/* Placements alternatifs */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all">
              <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Les placements alternatifs et non cotés</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Pour diversifier un patrimoine et en accroître le potentiel de rendement, les placements alternatifs occupent une place privilégiée dans nos allocations.
              </p>
        </div>

            {/* Private Equity */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all relative">
              <Link href="#section3" className="block mb-4 group">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold hover:text-[#B99066] transition-colors cursor-pointer relative z-10">Le Private Equity</h3>
              </Link>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Le Private Equity (capital-investissement) permet d'investir dans des entreprises non cotées. C'est un levier puissant de création de valeur à long terme, avec des rendements potentiels élevés.
              </p>
          </div>
          </div>

          {/* 2 dernières cartes centrées */}
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {/* GFA et GFV */}
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Les GFA et GFV</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Les groupements fonciers agricoles ou viticoles offrent la possibilité de détenir une part du patrimoine rural français tout en bénéficiant d'avantages fiscaux attractifs.
                </p>
          </div>

              {/* Placements atypiques */}
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-[#253F60]/20 hover:border-[#B99066] transition-all">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Les placements atypiques</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Forêts, vins, art ou métaux précieux : ces actifs réels offrent une diversification tangible et parfois passionnelle. Ils complètent une allocation patrimoniale équilibrée.
                </p>
              </div>
            </div>
          </div>

          {/* Expertise Azalée */}
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-6">
              L'expertise Azalée Patrimoine
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
              Au-delà des produits, c'est la méthode Azalée qui fait la différence : une vision globale, un accompagnement humain et une exigence de transparence à chaque étape.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#253F60]">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Une méthodologie éprouvée</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Audit patrimonial, allocation stratégique, suivi annuel : notre approche repose sur la rigueur et la pédagogie.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Des performances mesurées et partagées</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Nous publions régulièrement les résultats de nos allocations et produits structurés, dans une logique de transparence totale.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#253F60]">
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">Une approche responsable</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Nos conseils intègrent systématiquement les critères ESG pour concilier performance, durabilité et éthique.
                </p>
              </div>
            </div>
          </div>

          {/* Pourquoi Azalée */}
          <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-cairo font-bold mb-6">Pourquoi investir avec Azalée Patrimoine ?</h2>
            <p className="text-lg mb-6">
              Faire confiance à Azalée Patrimoine, c'est choisir un cabinet indépendant, transparent et engagé. Nos experts accompagnent chaque client avec méthode, écoute et responsabilité.
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Accompagnement personnalisé et humain</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Stratégies sur-mesure et indépendantes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Accès à des produits réservés aux investisseurs avertis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Suivi digital et tableau de bord patrimonial</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Engagement éthique et durable</span>
              </li>
                </ul>
                </div>
              </div>
      </section>

      {/* Section Vignettes - Sujets Principaux */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-12 text-center">
            Découvrez nos guides détaillés
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {/* Assurance-vie luxembourgeoise */}
            <a href="#assurance-vie-lux" className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#B99066] hover:shadow-xl transition-all duration-300 group aspect-square flex flex-col justify-between">
              <div>
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4 group-hover:text-[#B99066] transition-colors">
                  Assurance-vie luxembourgeoise
                </h3>
                <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed line-clamp-3">
                  Découvrez si l'AV Lux est adaptée à votre profil et comment elle peut optimiser votre patrimoine international.
                </p>
              </div>
              <span className="text-[#B99066] font-semibold text-sm mt-4 group-hover:underline inline-flex items-center">
                En savoir plus →
              </span>
            </a>
            
            {/* Produits structurés */}
            <a href="/placements/produits-structures" className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#B99066] hover:shadow-xl transition-all duration-300 group aspect-square flex flex-col justify-between">
              <div>
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4 group-hover:text-[#B99066] transition-colors">
                  Produits structurés
                </h3>
                <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed line-clamp-3">
                  Comprenez les mécanismes, les risques et les opportunités des produits structurés pour votre portefeuille.
                </p>
              </div>
              <span className="text-[#B99066] font-semibold text-sm mt-4 group-hover:underline inline-flex items-center">
                En savoir plus →
              </span>
            </a>
            
            {/* Or et métaux précieux */}
            <a href="#or-metaux" className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#B99066] hover:shadow-xl transition-all duration-300 group aspect-square flex flex-col justify-between md:col-span-2 max-w-md mx-auto">
              <div>
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4 group-hover:text-[#B99066] transition-colors">
                  Or et métaux précieux
                </h3>
                <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed line-clamp-3">
                  Analysez si l'or reste une opportunité après +50% en 2025 et comment l'intégrer dans votre stratégie.
                </p>
              </div>
              <span className="text-[#B99066] font-semibold text-sm mt-4 group-hover:underline inline-flex items-center">
                En savoir plus →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section - Format Vignettes */}
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-12 text-center">
            FAQ - Construire son patrimoine
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                question: "Quelle différence entre support et enveloppe d'investissement ?",
                answer: "Les enveloppes (assurance-vie, PEA, PER...) sont le cadre juridique et fiscal de vos placements. Les supports (actions, obligations, SCPI...) sont les actifs dans lesquels vous investissez à l'intérieur de ces enveloppes.",
                link: "#section8"
              },
              {
                question: "Quels placements offrent le meilleur rendement net en 2025 ?",
                answer: "Le rendement dépend de votre profil de risque et de votre horizon. Les ETF crypto dans l'assurance-vie peuvent offrir des rendements élevés mais avec un risque important. Consultez un conseiller Azalée pour une analyse personnalisée.",
                link: "https://calendly.com/contact-azalee-patrimoine"
              },
              {
                question: "Comment investir dans le Private Equity ?",
                answer: "Le Private Equity nécessite une compréhension approfondie des risques et des mécanismes. Consultez la Section 3 pour comprendre les 4 questions essentielles à se poser avant d'investir.",
                link: "#section3"
              },
              {
                question: "Quels sont les placements adaptés à mon profil fiscal ?",
                answer: "Cela dépend de votre situation personnelle (revenus, patrimoine, objectifs). Un diagnostic patrimonial gratuit avec un conseiller Azalée vous permettra d'identifier les meilleures opportunités.",
                link: "https://calendly.com/contact-azalee-patrimoine"
              },
              {
                question: "Quels sont les risques des produits structurés ?",
                answer: "Les produits structurés offrent une protection du capital mais comportent des risques (perte en capital, risque de l'émetteur, liquidité). Consultez la page dédiée aux produits structurés pour plus d'informations.",
                link: "/placements/produits-structures"
              },
              {
                question: "Quel est le placement préféré des français ?",
                answer: "L'assurance-vie reste le placement préféré des Français pour sa fiscalité avantageuse et sa flexibilité. Découvrez notre page dédiée à l'assurance-vie.",
                link: "/placements/assurance-vie"
              },
              {
                question: "Le fond Défense vaut-il vraiment le coût ?",
                answer: "Consultez un conseiller Azalée pour une analyse détaillée du fond Défense et de son adéquation avec votre profil.",
                link: "https://calendly.com/contact-azalee-patrimoine"
              },
              {
                question: "Le livret A va-t-il baisser en 2026 ?",
                answer: "Le taux du livret A est corrélé à la baisse des taux directeurs. Consultez un conseiller Azalée pour comprendre l'impact sur votre stratégie d'épargne.",
                link: "https://calendly.com/contact-azalee-patrimoine"
              },
              {
                question: "Que peut-on attendre d'un placement ESG ?",
                answer: "Les placements ESG (Environnement, Social, Gouvernance) permettent d'allier performance financière et impact positif. Ils participent à la transition économique tout en offrant des opportunités de rendement. Consultez un conseiller Azalée pour identifier les meilleures opportunités ESG.",
                link: "https://calendly.com/contact-azalee-patrimoine"
              },
              {
                question: "C'est quoi la loi industrie verte ?",
                answer: "La loi industrie verte est une mesure fiscale visant à encourager les investissements dans la transition écologique. Consultez un conseiller Azalée pour comprendre comment en bénéficier.",
                link: "https://calendly.com/contact-azalee-patrimoine"
              },
              {
                question: "Comment décrypter les frais de votre contrat d'assurance vie ?",
                answer: "Les frais d'assurance-vie peuvent être complexes (frais d'entrée, de gestion, d'arbitrage...). Un conseiller Azalée peut vous aider à comprendre et optimiser ces frais.",
                link: "https://calendly.com/contact-azalee-patrimoine"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-[#B99066] hover:shadow-xl transition-all duration-300 group">
                <h3 className="text-[#253F60] text-lg sm:text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors">
                  {faq.question}
                </h3>
                <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                  {faq.answer}
                </p>
                {faq.link && (
                  faq.link.startsWith('http') || faq.link === '#' ? (
                    <a
                      href={faq.link}
                      target={faq.link.startsWith('http') ? '_blank' : undefined}
                      rel={faq.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center text-[#B99066] hover:text-[#A67A5A] font-semibold text-sm transition-colors group-hover:underline"
                    >
                      En savoir plus →
                    </a>
                  ) : (
                    <Link
                      href={faq.link}
                      className="inline-flex items-center text-[#B99066] hover:text-[#A67A5A] font-semibold text-sm transition-colors group-hover:underline"
                    >
                      En savoir plus →
                    </Link>
                  )
                )}
                </div>
            ))}
            </div>
          </div>
        </section>

      {/* Section Articles et guides placements */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-6">
              {pageContent.articles?.h2 || "Articles et guides placements"}
            </h2>
            <p className="text-lg sm:text-xl font-inter text-[#374151] max-w-3xl mx-auto leading-relaxed">
              {pageContent.articles?.description || "Découvrez nos articles détaillés pour approfondir vos connaissances sur les placements et l'investissement"}
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Article 1 */}
            {(pageContent.articles?.items || [
              {
                title: "Assurance-vie : optimiser votre épargne en 2025",
                description: "Découvrez comment optimiser votre assurance-vie avec Azalée Patrimoine : fiscalité, supports, arbitrages et stratégies pour maximiser votre rendement net.",
                link: "/placements/assurance-vie",
                badge: "Guide complet",
                gradient: "from-[#253F60] to-[#2d4a6b]"
              },
              {
                title: "Private Equity 2025 : opportunités et risques",
                description: "Le capital-investissement offre des rendements attractifs mais nécessite une compréhension approfondie. Découvrez comment investir intelligemment en Private Equity malgré les risques.",
                link: "#section3",
                badge: "Analyse 2025",
                gradient: "from-[#253F60] to-[#B99066]"
              }
            ]).map((article, index) => (
              <Link 
                key={index}
                href={article.link}
                className="group bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB] overflow-hidden hover:shadow-2xl hover:border-[#B99066] transition-all duration-300"
              >
                <div className={`relative h-48 bg-gradient-to-br ${article.gradient || "from-[#253F60] to-[#2d4a6b]"} overflow-hidden`}>
                  <div className={`absolute top-4 left-4 ${index === 0 ? "bg-[#B99066]" : "bg-[#253F60]"} text-white px-3 py-1 rounded-full text-sm font-inter font-semibold`}>
                    {article.badge || "Guide complet"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-cairo font-bold text-[#253F60] mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-base font-inter text-[#374151] leading-relaxed mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center text-[#B99066] font-inter font-semibold">
                    <span>Lire l'article complet</span>
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 