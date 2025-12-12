"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function LoiDenormandiePage() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Loi Denormandie",
      subtitle: "Relancer la rénovation dans les centres-villes anciens",
      description: "La loi Denormandie offre la même réduction d'impôt que Pinel, mais pour de l'ancien avec travaux. Un dispositif fiscal attractif pour investisseurs actifs ou appuyés par un bon promoteur, fiscalement efficace mais technique.",
      button: "En savoir plus",
      image: "/images/loi-denormandie-hero.jpg"
    },
    overview: {
      title: "Présentation de la loi Denormandie",
      description: "La loi Denormandie est un dispositif de défiscalisation qui permet de réduire ses impôts en investissant dans la rénovation de logements anciens situés dans des zones de revitalisation urbaine. Elle vise à relancer la rénovation dans les centres-villes anciens.",
      keyPoints: [
        "Même réduction d'impôt que Pinel",
        "Mais pour de l'ancien avec travaux",
        "Travaux = ≥ 25% du coût total",
        "Location nue à loyer plafonné"
      ]
    },
    benefits: {
      title: "Avantages fiscaux",
      benefits: [
        {
          title: "Réduction d'impôt",
          description: "12% du montant investi par an pendant 9 ans",
          percentage: "12%"
        },
        {
          title: "Plafond d'investissement",
          description: "300 000€ par an",
          amount: "300k€"
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
      description: "Pour bénéficier de la Loi Denormandie, plusieurs conditions doivent être respectées :",
      points: [
        "Bien situé dans une zone de revitalisation urbaine",
        "Travaux représentant au moins 25% du coût total",
        "Location nue à loyer plafonné",
        "Engagement de location de 9 ans minimum"
      ]
    },
    cta: {
      title: "Besoin d'aide pour votre investissement ?",
      description: "Nos experts vous accompagnent dans votre projet d'investissement avec la Loi Denormandie.",
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
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                {content.hero?.title || defaultContent.hero.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white mb-3 sm:mb-4 leading-relaxed">
                {content.hero?.subtitle || defaultContent.hero.subtitle}
              </p>
              <p className="text-sm sm:text-base text-white mb-6 sm:mb-8">
                {content.hero?.description || defaultContent.hero.description}
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
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.overview?.title || defaultContent.overview.title}
            subtitle={content.overview?.description || defaultContent.overview.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(content.overview?.keyPoints || defaultContent.overview.keyPoints).map((point, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="text-sm sm:text-base lg:text-lg font-semibold relative z-10">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.benefits?.title || defaultContent.benefits.title}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {(content.benefits?.benefits || defaultContent.benefits.benefits).map((benefit, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 3 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#253F60]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 relative z-10">
                  {benefit.percentage || benefit.amount || benefit.duration}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 relative z-10">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-white/90 relative z-10">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.conditions?.title || defaultContent.conditions.title}
            subtitle={content.conditions?.description || defaultContent.conditions.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {(content.conditions?.points || defaultContent.conditions.points).map((point, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-4 sm:p-6 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="flex items-start relative z-10">
                  <div className="text-white mr-3 mt-1 text-xl font-bold">✓</div>
                  <div className="text-sm sm:text-base lg:text-lg font-semibold text-white leading-relaxed">{point}</div>
                </div>
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