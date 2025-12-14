"use client";
import React, { useMemo, useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

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
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#253F60] mb-4 rounded-full mx-auto"></div>
            <h2 className="text-3xl lg:text-4xl font-cairo font-semibold text-[#112033] mb-4">
              Nos services de construction
            </h2>
            <p className="text-[#4A5568] font-inter text-lg max-w-3xl mx-auto">
              Un accompagnement complet pour réussir votre projet de construction immobilière
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-[#112033] font-cairo font-semibold text-xl mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-[#4A5568] font-inter text-sm mb-6 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-[#4A5568]">
                      <div className="w-2 h-2 bg-[#B99066] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#253F60] mb-4 rounded-full mx-auto"></div>
            <h2 className="text-3xl lg:text-4xl font-cairo font-semibold text-[#112033] mb-4">
              Notre processus de construction
            </h2>
            <p className="text-[#4A5568] font-inter text-lg max-w-3xl mx-auto">
              Un processus structuré en 5 étapes pour garantir la réussite de votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {content.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-[#4A5568] font-inter text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="w-full py-16 lg:py-24 bg-gradient-to-br from-[#F2F2F2] to-[#E8E8E8]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#253F60] mb-4 rounded-full mx-auto"></div>
            <h2 className="text-3xl lg:text-4xl font-cairo font-semibold text-[#112033] mb-4">
              Les avantages de faire construire
            </h2>
            <p className="text-[#4A5568] font-inter text-lg max-w-3xl mx-auto">
              Pourquoi choisir la construction neuve pour votre projet immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.advantages.map((advantage, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-[#112033] font-cairo font-semibold text-xl mb-4">
                  {advantage.title}
                </h3>
                <p className="text-[#4A5568] font-inter leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-24 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            {content.cta.title}
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
            {content.cta.subtitle}
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            className="bg-[#B99066] text-white px-10 py-4 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors duration-200 text-lg shadow-xl"
          >
            {content.cta.button}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
