"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function LoiCossePage() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Loi Cosse",
      subtitle: "Dispositif de défiscalisation pour l'investissement immobilier locatif dans les zones tendues",
      button: "En savoir plus",
      image: "/images/loi-cosse-hero.jpg"
    },
    definition: {
      title: "Qu'est-ce que la Loi Cosse ?",
      description: "La Loi Cosse est un dispositif de défiscalisation qui permet de réduire son impôt sur le revenu en investissant dans l'immobilier locatif dans les zones tendues.",
      details: [
        "Réduction d'impôt de 12% du montant investi",
        "Plafond de 300 000€ par an",
        "Engagement de location de 9 ans minimum",
        "Bien situé dans une zone tendue"
      ]
    },
    conditions: {
      title: "Conditions d'éligibilité",
      description: "Pour bénéficier de la Loi Cosse, plusieurs conditions doivent être respectées :",
      points: [
        "Investissement dans un bien neuf ou en VEFA",
        "Location à usage d'habitation principale",
        "Engagement de location de 9 ans minimum",
        "Bien situé dans une zone tendue"
      ]
    },
    avantages: {
      title: "Avantages du dispositif",
      description: "Les principaux avantages de la Loi Cosse :",
      points: [
        "Réduction d'impôt immédiate",
        "Plafond élevé (300 000€)",
        "Pas de condition de ressources",
        "Compatible avec d'autres dispositifs"
      ]
    },
    cta: {
      title: "Besoin d'aide pour votre investissement ?",
      description: "Nos experts vous accompagnent dans votre projet d'investissement immobilier avec la Loi Cosse.",
      buttonText: "Demander une consultation gratuite"
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
            <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              {content.hero?.title || defaultContent.hero.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white mb-6 sm:mb-8 leading-relaxed">
              {content.hero?.subtitle || defaultContent.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors text-sm sm:text-base"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.definition?.title || defaultContent.definition.title}
            subtitle={content.definition?.description || defaultContent.definition.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(content.definition?.details || defaultContent.definition.details).map((detail, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold relative z-10">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.conditions?.title || defaultContent.conditions.title}
            subtitle={content.conditions?.description || defaultContent.conditions.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {(content.conditions?.points || defaultContent.conditions.points).map((point, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-white leading-relaxed relative z-10">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.avantages?.title || defaultContent.avantages.title}
            subtitle={content.avantages?.description || defaultContent.avantages.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(content.avantages?.points || defaultContent.avantages.points).map((point, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 4 === 0 || index % 4 === 2 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative z-10">
                  <span className="text-white text-sm sm:text-lg font-bold">{index + 1}</span>
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold relative z-10">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {content.cta?.title || defaultContent.cta.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            {content.cta?.description || defaultContent.cta.description}
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-sm sm:text-base"
          >
            Prendre rendez-vous
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}