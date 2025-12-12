"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function MonumentHistoriquePage() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Monument Historique",
      subtitle: "Investir dans le patrimoine historique français",
      description: "Le dispositif Monument Historique permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits. Il offre une réduction d'impôt de 22 à 30% du montant des travaux engagés.",
      button: "En savoir plus",
      image: "/images/monument-historique-hero.jpg"
    },
    overview: {
      title: "Présentation du dispositif Monument Historique",
      description: "Le dispositif Monument Historique est un mécanisme de défiscalisation qui permet de réduire ses impôts en investissant dans la rénovation de monuments historiques classés ou inscrits. Il vise à préserver le patrimoine historique français.",
      keyPoints: [
        "Réduction d'impôt de 22 à 30%",
        "Sur le montant des travaux engagés",
        "Monument classé ou inscrit",
        "Travaux encadrés par architecte des Bâtiments de France"
      ]
    },
    benefits: {
      title: "Avantages fiscaux",
      benefits: [
        {
          title: "Réduction d'impôt",
          description: "22 à 30% du montant des travaux",
          percentage: "22-30%"
        },
        {
          title: "Plafond de travaux",
          description: "400 000€ par période de 4 ans",
          amount: "400k€"
        },
        {
          title: "Durée d'engagement",
          description: "9 ans minimum",
          duration: "9 ans"
        }
      ]
    },
    conditions: {
      title: "Conditions d'éligibilité",
      description: "Pour bénéficier du dispositif Monument Historique, plusieurs conditions doivent être respectées :",
      points: [
        "Monument classé ou inscrit",
        "Travaux encadrés par architecte des Bâtiments de France",
        "Engagement de location de 9 ans minimum",
        "Respect des normes patrimoniales"
      ]
    },
    cta: {
      title: "Besoin d'aide pour votre investissement ?",
      description: "Nos experts vous accompagnent dans votre projet d'investissement Monument Historique.",
      buttonText: "Demander une consultation gratuite"
    }
  };

  // Load content from CMS
  useEffect(() => {
    // Set static content
    setContent(defaultContent);
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {content.hero?.title || defaultContent.hero.title}
              </h1>
              <p className="text-lg text-white mb-4 leading-relaxed">
                {content.hero?.subtitle || defaultContent.hero.subtitle}
              </p>
              <p className="text-white mb-8">
                {content.hero?.description || defaultContent.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.overview?.title || defaultContent.overview.title}
            subtitle={content.overview?.description || defaultContent.overview.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.overview?.keyPoints || defaultContent.overview.keyPoints).map((point, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${isBlue ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center text-white`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 ${isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full`}></div>
                  <div className="text-lg font-semibold relative z-10 leading-relaxed">{point}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.benefits?.title || defaultContent.benefits.title}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.benefits?.benefits || defaultContent.benefits.benefits).map((benefit, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${isBlue ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center text-white`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 ${isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full`}></div>
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl font-bold mb-4">
                      {benefit.percentage || benefit.amount || benefit.duration}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-white/90 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.conditions?.title || defaultContent.conditions.title}
            subtitle={content.conditions?.description || defaultContent.conditions.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(content.conditions?.points || defaultContent.conditions.points).map((point, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${isBlue ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 ${isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full`}></div>
                  <div className="flex items-start relative z-10">
                    <div className="text-white mr-3 mt-1 text-xl font-bold">✓</div>
                    <div className="text-lg font-semibold text-white leading-relaxed">{point}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            {content.cta?.title || defaultContent.cta.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            {content.cta?.description || defaultContent.cta.description}
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg shadow-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            {content.cta?.buttonText || defaultContent.cta.buttonText}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}