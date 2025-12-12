"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function AutreFiscalitePage() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Autres sujets fiscaux",
      subtitle: "Découvrez d'autres aspects de la fiscalité française : ISF, taxe foncière, droits de succession, et bien plus encore.",
      button: "Explorer la fiscalité",
      image: "/images/fiscalite-autres-sujets-hero.jpg"
    },
    sujets: {
      title: "Sujets fiscaux divers",
      items: [
        {
          nom: "Impôt sur la Fortune Immobilière (IFI)",
          description: "Taxe sur le patrimoine immobilier net",
          details: ["Seuil : 1,3 million d'euros", "Taux progressif de 0,5% à 1,5%", "Déclaration annuelle obligatoire"]
        },
        {
          nom: "Taxe foncière",
          description: "Taxe annuelle sur les propriétés bâties et non bâties",
          details: ["Calcul basé sur la valeur locative", "Paiement en octobre", "Possibilité de déduction"]
        },
        {
          nom: "Droits de succession",
          description: "Taxe sur la transmission du patrimoine",
          details: ["Abrattements selon le lien familial", "Taux progressifs", "Optimisation possible"]
        },
        {
          nom: "Taxe d'habitation",
          description: "Taxe résidentielle (supprimée pour la résidence principale)",
          details: ["Maintien pour résidences secondaires", "Calcul selon la valeur locative", "Exonérations possibles"]
        }
      ]
    },
    optimisations: {
      title: "Optimisations fiscales",
      items: [
        {
          strategie: "Donation",
          description: "Transmission anticipée du patrimoine",
          avantages: ["Abrattements renouvelables", "Réduction des droits", "Transmission progressive"]
        },
        {
          strategie: "Assurance-vie",
          description: "Transmission optimisée du capital",
          avantages: ["Exonération partielle", "Plafond 152 500€", "Transmission hors succession"]
        },
        {
          strategie: "SCPI",
          description: "Investissement immobilier indirect",
          avantages: ["Diversification", "Gestion déléguée", "Liquidité"]
        }
      ]
    },
    cta: {
      title: "Besoin d'informations sur d'autres sujets fiscaux ?",
      subtitle: "Nos experts vous accompagnent sur tous les aspects de la fiscalité française",
      primaryButton: "Consultation gratuite",
      secondaryButton: "Guide complet"
    }
  };

  useEffect(() => {
    // Set static content
    setContent(defaultContent);
  }, []);

  return (
    <>

      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-6xl font-cairo font-bold text-white mb-4 sm:mb-6">
                {content.hero?.title || defaultContent.hero.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white mb-6 sm:mb-8 leading-relaxed">
                {content.hero?.subtitle || defaultContent.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-inter font-semibold hover:bg-[#A67A5A] transition-colors text-sm sm:text-base shadow-lg"
                >
                  {content.hero?.button || defaultContent.hero.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sujets Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.sujets?.title || defaultContent.sujets.title}
            subtitle="Découvrez les différents aspects de la fiscalité française"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(content.sujets?.items || defaultContent.sujets.items).map((sujet, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 4 === 0 || index % 4 === 2 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  <h3 className="text-white text-2xl font-cairo font-bold mb-3">{sujet.nom}</h3>
                  <p className="text-white/90 text-base mb-6 leading-relaxed">{sujet.description}</p>
                  <ul className="space-y-3">
                    {(sujet.details || []).map((detail, idx) => (
                      <li key={idx} className="text-white/95 text-sm flex items-start gap-3">
                        <div className={`w-5 h-5 ${index % 4 === 0 || index % 4 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optimisations Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.optimisations?.title || defaultContent.optimisations.title}
            subtitle="Stratégies pour optimiser votre situation fiscale"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(content.optimisations?.items || defaultContent.optimisations.items).map((optimisation, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${index % 3 === 0 || index % 3 === 2 ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-2xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-white text-xl font-cairo font-bold mb-2">{optimisation.strategie}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{optimisation.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {(optimisation.avantages || []).map((avantage, idx) => (
                      <li key={idx} className="text-white/95 text-sm flex items-start gap-3">
                        <div className={`w-5 h-5 ${index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{avantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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
                {content.cta?.title || defaultContent.cta.title}
              </h2>
              <p className="text-white text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {content.cta?.subtitle || defaultContent.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-8 py-4 rounded-full font-source-sans font-semibold text-lg hover:bg-[#A67C52] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {content.cta?.primaryButton || defaultContent.cta.primaryButton}
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-source-sans font-semibold text-lg hover:bg-white/20 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {content.cta?.secondaryButton || defaultContent.cta.secondaryButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 