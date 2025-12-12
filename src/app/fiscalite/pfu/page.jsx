"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function PFUPage() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "PFU ou Prélèvement Forfaitaire Unique",
      subtitle: "Tout ce qu'un investisseur doit savoir. Le Prélèvement Forfaitaire Unique (PFU), aussi appelé « flat tax », est une mécanique fiscale clé depuis 2018. Voici une note pédagogique pour tout comprendre.",
      button: "Calculer mon PFU",
      image: "/images/pfu.webp"
    },
    definition: {
      title: "Qu'est-ce que le PFU ?",
      description: "Il s'agit d'un prélèvement unique de 30% qui s'applique aux revenus du capital mobilier :",
      details: [
        "12,8% d'impôt sur le revenu",
        "17,2% de prélèvements sociaux (CSG/CRDS, etc.)",
        "Le PFU est appliqué automatiquement par les banques, compagnies d'assurance et plateformes d'investissement"
      ]
    },
    creation: {
      title: "Pourquoi a-t-il été créé ?",
      description: "Mis en place par la loi de finances 2018, le PFU avait deux objectifs :",
      objectifs: [
        "Simplifier la fiscalité du capital pour les contribuables",
        "Rendre la France plus attractive pour l'investissement (notamment international)"
      ]
    },
    application: {
      title: "À quoi s'applique le PFU ?",
      description: "Le PFU s'applique aux revenus du capital mobilier :",
      revenus: [
        "Dividendes d'actions",
        "Coupons d'obligations",
        "Plus-values de cession de valeurs mobilières",
        "Intérêts de comptes sur livret",
        "Revenus de placements financiers"
      ]
    },
    avantages: {
      title: "Avantages du PFU",
      description: "Pourquoi choisir le PFU ?",
      points: [
        "Simplicité : un seul taux de 30%",
        "Prévisibilité : pas de surprise fiscale",
        "Automatique : prélevé à la source",
        "Compétitif : souvent plus avantageux que le barème progressif"
      ]
    },
    inconvenients: {
      title: "Inconvénients du PFU",
      description: "Les limites à connaître :",
      points: [
        "Pas de déduction des frais",
        "Pas de report des moins-values",
        "Taux fixe : pas d'optimisation possible",
        "Obligatoire : pas de choix pour certains revenus"
      ]
    },
    simulation: {
      title: "Simulation PFU vs Barème progressif",
      description: "Comparaison pour un revenu de 10 000€",
      scenarios: [
        {
          revenu: "10 000€",
          pfu: "3 000€ (30%)",
          barème: "Variable selon TMI",
          conseil: "Le PFU est souvent plus avantageux pour les TMI élevés"
        }
      ]
    },
    cta: {
      title: "Besoin d'aide pour optimiser votre fiscalité ?",
      description: "Nos experts vous accompagnent pour choisir entre PFU et barème progressif selon votre situation.",
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
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {content.hero?.title || defaultContent.hero.title}
              </h1>
              <p className="text-lg sm:text-xl text-white mb-8 leading-relaxed">
                {content.hero?.subtitle || defaultContent.hero.subtitle}
              </p>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A67A5A] transition-colors duration-200"
              >
                {content.hero?.button || defaultContent.hero.button}
              </button>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={content.hero?.image || defaultContent.hero.image} 
                  alt="PFU - Prélèvement Forfaitaire Unique"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.definition?.title || defaultContent.definition.title}
            subtitle={content.definition?.description || defaultContent.definition.description}
          />
          
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] text-white px-8 sm:px-12 py-6 sm:py-8 rounded-2xl shadow-2xl">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">30%</div>
                <div className="text-sm sm:text-base font-medium">Taux unique</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content.definition?.details || defaultContent.definition.details).map((detail, index) => (
              <div key={index} className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-[#253F60]">
                <div className="text-base sm:text-lg font-semibold text-[#253F60] leading-relaxed">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creation Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.creation?.title || defaultContent.creation.title}
            subtitle={content.creation?.description || defaultContent.creation.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {(content.creation?.objectifs || defaultContent.creation.objectifs).map((objectif, index) => (
              <div key={index} className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-relaxed">{objectif}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.application?.title || defaultContent.application.title}
            subtitle={content.application?.description || defaultContent.application.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content.application?.revenus || defaultContent.application.revenus).map((revenu, index) => (
              <div key={index} className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-[#B99066]">
                <div className="text-base sm:text-lg font-semibold text-[#253F60] leading-relaxed">{revenu}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.avantages?.title || defaultContent.avantages.title}
            subtitle={content.avantages?.description || defaultContent.avantages.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.avantages?.points || defaultContent.avantages.points).map((point, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${isBlue ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center`}>
                  <div className={`absolute top-0 right-0 w-24 h-24 ${isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'} rounded-bl-full`}></div>
                  <div className="relative z-10">
                    <div className="text-base sm:text-lg font-semibold text-white leading-relaxed">{point}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inconvénients Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-amber-50 via-amber-100/50 to-amber-50">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.inconvenients?.title || defaultContent.inconvenients.title}
            subtitle={content.inconvenients?.description || defaultContent.inconvenients.description}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.inconvenients?.points || defaultContent.inconvenients.points).map((point, index) => (
              <div key={index} className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-amber-500">
                <div className="text-base sm:text-lg font-semibold text-[#253F60] leading-relaxed">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.simulation?.title || defaultContent.simulation.title}
            subtitle={content.simulation?.description || defaultContent.simulation.description}
          />
          
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
            <div className="relative z-10">
              {(content.simulation?.scenarios || defaultContent.simulation.scenarios).map((scenario, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] text-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="text-xs sm:text-sm font-medium mb-2 opacity-90">Revenu</div>
                    <div className="text-xl sm:text-2xl font-bold">{scenario.revenu}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="text-xs sm:text-sm font-medium mb-2 opacity-90">PFU</div>
                    <div className="text-xl sm:text-2xl font-bold">{scenario.pfu}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="text-xs sm:text-sm font-medium mb-2 opacity-90">Barème</div>
                    <div className="text-xl sm:text-2xl font-bold">{scenario.barème}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="text-xs sm:text-sm font-medium mb-2 opacity-90">Conseil</div>
                    <div className="text-xs sm:text-sm leading-relaxed">{scenario.conseil}</div>
                  </div>
                </div>
              ))}
            </div>
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