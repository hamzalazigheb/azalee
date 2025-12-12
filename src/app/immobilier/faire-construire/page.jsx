"use client";
import React, { useMemo, useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import Link from "next/link";

const LOCAL_STORAGE_KEY = 'faireConstruireContent';

const defaultContent = {
  hero: {
    title: "Faire construire votre projet immobilier",
    subtitle: "Accompagnement complet pour la construction de votre maison ou immeuble",
    description: "De la recherche du terrain à la livraison de votre bien, nous vous accompagnons dans toutes les étapes de votre projet de construction.",
    button: "Découvrir nos services",
    image: "/images/expertise.webp"
  },
  services: [
    {
      title: "Recherche de terrain",
      description: "Identification et sélection du terrain idéal pour votre projet",
      icon: "🏗️",
      features: ["Analyse de faisabilité", "Étude de sol", "Vérification des contraintes", "Négociation du prix"]
    },
    {
      title: "Architecture et plans",
      description: "Conception et réalisation des plans selon vos besoins",
      icon: "📐",
      features: ["Plans architecturaux", "Permis de construire", "Suivi des travaux", "Contrôle qualité"]
    },
    {
      title: "Financement",
      description: "Solutions de financement adaptées à votre projet",
      icon: "💰",
      features: ["Prêt construction", "Prêt relais", "Financement travaux", "Optimisation fiscale"]
    },
    {
      title: "Suivi des travaux",
      description: "Accompagnement pendant toute la durée du chantier",
      icon: "🔨",
      features: ["Planning travaux", "Contrôle qualité", "Gestion des artisans", "Livraison clés en main"]
    }
  ],
  process: [
    {
      step: "1",
      title: "Étude de faisabilité",
      description: "Analyse de votre projet et de sa viabilité technique et financière"
    },
    {
      step: "2", 
      title: "Recherche du terrain",
      description: "Identification et acquisition du terrain idéal pour votre construction"
    },
    {
      step: "3",
      title: "Conception architecturale",
      description: "Élaboration des plans et obtention des autorisations nécessaires"
    },
    {
      step: "4",
      title: "Financement du projet",
      description: "Mise en place des solutions de financement les plus avantageuses"
    },
    {
      step: "5",
      title: "Réalisation des travaux",
      description: "Suivi et contrôle de la construction jusqu'à la livraison"
    }
  ],
  advantages: [
    {
      title: "Personnalisation totale",
      description: "Concevez votre maison selon vos goûts et vos besoins spécifiques"
    },
    {
      title: "Économies d'énergie",
      description: "Construisez avec les dernières normes environnementales et réduisez vos factures"
    },
    {
      title: "Valeur patrimoniale",
      description: "Un bien neuf qui prendra de la valeur et répondra aux standards actuels"
    },
    {
      title: "Garanties constructeur",
      description: "Bénéficiez des garanties légales et des assurances décennale"
    }
  ],
  cta: {
    title: "Prêt à construire votre projet ?",
    subtitle: "Nos experts vous accompagnent dans toutes les étapes de votre construction",
    button: "Demander un devis gratuit"
  }
};

export default function FaireConstruirePage() {
  const [cmsContent, setCmsContent] = useState(defaultContent);

  useEffect(() => {
    // Set static content
    setCmsContent(defaultContent);
  }, []);

  const content = cmsContent || defaultContent;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#253F60] to-[#B99066]"></div>
        
        <div className="relative max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#B99066] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Construction immobilière
              </span>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                {content.hero.title}
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                {content.hero.description}
              </p>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200 text-lg"
              >
                {content.hero.button}
              </button>
            </div>
            <div className="flex justify-center">
              <img 
                src={content.hero.image} 
                alt="Construction immobilière" 
                className="w-full max-w-md rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.src = "/images/expertise.webp";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Nos services de construction"
            subtitle="Un accompagnement complet pour réussir votre projet de construction immobilière"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {content.services.map((service, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                    isBlue 
                      ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' 
                      : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                  }`}
                >
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${
                    isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                  }`}></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-white font-cairo font-bold text-xl sm:text-2xl mb-4 text-center">
                      {service.title}
                    </h3>
                    <p className="text-white/90 font-inter text-sm sm:text-base mb-6 text-center leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-white mt-1 font-bold">•</span>
                          <span className="text-white/90 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Notre processus de construction"
            subtitle="Un processus structuré en 5 étapes pour garantir la réussite de votre projet"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
            {content.process.map((step, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center ${
                    isBlue 
                      ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' 
                      : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                  }`}
                >
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${
                    isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                  }`}></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-white font-cairo font-bold text-lg sm:text-xl mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/90 font-inter text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Les avantages de faire construire"
            subtitle="Pourquoi choisir la construction neuve pour votre projet immobilier"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {content.advantages.map((advantage, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                    isBlue 
                      ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' 
                      : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                  }`}
                >
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${
                    isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                  }`}></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-white font-cairo font-bold text-xl sm:text-2xl mb-4">
                      {advantage.title}
                    </h3>
                    <p className="text-white/90 font-inter text-base sm:text-lg leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/20 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                {content.cta.title}
              </h2>
              <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                {content.cta.subtitle}
              </p>
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg"
              >
                {content.cta.button}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
