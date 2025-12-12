"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

// Default content
const defaultContent = {
    hero: {
      title: "Autres solutions retraite",
      subtitle: "En complément du PER et des dispositifs d'entreprise, découvrez les solutions alternatives pour préparer votre retraite."
    },
    chart: {
      data: [
        { label: "Solutions complémentaires", value: "4" },
        { label: "Immobilier locatif", value: "LMNP" },
        { label: "SCPI rendement", value: "5-7%" },
        { label: "Assurance-vie", value: "8 ans" },
        { label: "Produits financiers", value: "ETF" }
      ]
    },
    solutions: {
      title: "Solutions complémentaires",
      solutions: [
        {
          title: "Immobilier locatif",
          description: "Revenus complémentaires",
          details: "Investissement locatif avec avantages fiscaux (LMNP, Pinel, etc.)"
        },
        {
          title: "SCPI",
          description: "Rente mutualisée",
          details: "Sociétés Civiles de Placement Immobilier pour diversifier"
        },
        {
          title: "Assurance-vie",
          description: "Épargne à long terme",
          details: "Contrats d'assurance-vie pour optimiser la transmission"
        },
        {
          title: "Produits financiers",
          description: "Diversification",
          details: "ETF, fonds, actions pour équilibrer le portefeuille"
        }
      ]
    },
    objectif: {
      title: "Objectif",
      description: " Objectif : créer une retraite sur-mesure, adaptée à vos besoins et à votre horizon."
    },
    cta: {
      title: "Prêt à diversifier votre épargne retraite ?",
      subtitle: "Nos experts vous accompagnent dans le choix des solutions complémentaires les plus adaptées à votre profil.",
      buttonText: "Demander un conseil personnalisé"
    }
  };

export default function AutreRetraitePage() {
  const content = defaultContent;

  return (
    <>
      <Header />
      
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-6">
              {content.hero?.title || "Autres solutions retraite"}
            </h1>
            <p className="text-white text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed max-w-4xl mx-auto">
              {content.hero?.subtitle || "En complément du PER et des dispositifs d'entreprise, découvrez les solutions alternatives pour préparer votre retraite."}
            </p>
          </div>
          
          {/* Solutions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {(content.solutions?.solutions || []).map((solution, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-[#112033] text-lg font-semibold mb-2">{solution.title}</h3>
                <p className="text-[#686868] text-sm">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions détaillées Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.solutions?.title || "Solutions complémentaires"}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Découvrez les alternatives pour diversifier votre épargne retraite
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(content.solutions?.solutions || []).map((solution, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-6">
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-3">{solution.title}</h3>
                      <p className="text-white text-lg mb-3 font-semibold">{solution.description}</p>
                      <p className="text-white/90 text-base leading-relaxed">{solution.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectif Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                <h2 className="text-white text-2xl sm:text-3xl font-cairo font-bold">
                  {content.objectif?.title || "Objectif"}
                </h2>
                <div className="w-1 h-12 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
              </div>
              <p className="text-white text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                {content.objectif?.description || "Objectif : créer une retraite sur-mesure, adaptée à vos besoins et à votre horizon."}
              </p>
            </div>
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
                {content.cta?.title || "Prêt à diversifier votre épargne retraite ?"}
              </h2>
              <p className="text-white text-base sm:text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                {content.cta?.subtitle || "Nos experts vous accompagnent dans le choix des solutions complémentaires les plus adaptées à votre profil."}
              </p>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-white text-[#253F60] px-8 py-4 rounded-lg font-cairo font-bold text-lg hover:bg-[#F9FAFB] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}