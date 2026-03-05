"use client";
import React, { useState, useEffect } from "react";

export default function TmiPrelevementsSociauxClient({ content }) {
  

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Tranche Marginale d'Imposition (TMI) + Prélèvements sociaux",
      subtitle: "Ce que tout investisseur doit comprendre",
      description: "La fiscalité des placements dépend en grande partie de votre Tranche Marginale d'Imposition (TMI). Couplée aux prélèvements sociaux (17,2%), elle conditionne le rendement net de vos investissements.",
      button: "Calculer ma TMI",
      image: "/images/fiscalite-tmi-hero.jpg"
    },
    definition: {
      title: "Qu'est-ce que la TMI ?",
      description: "La TMI correspond au taux d'imposition marginal auquel sont soumis vos derniers euros de revenu imposable.",
      tableau: {
        headers: ["Revenu imposable (2024)", "Taux TMI"],
        rows: [
          { revenu: "Jusqu'à 11 294 €", taux: "0 %" },
          { revenu: "De 11 295 à 28 797 €", taux: "11 %" },
          { revenu: "De 28 798 à 82 341 €", taux: "30 %" },
          { revenu: "De 82 342 à 177 106 €", taux: "41 %" },
          { revenu: "Au-delà de 177 106 €", taux: "45 %" }
        ]
      },
      precision: "Il s'agit d'un taux marginal, et non global : seule la fraction de revenu correspondante est taxée à ce taux."
    },
    prelevementsSociaux: {
      title: "Prélèvements sociaux (17,2%)",
      description: "Les prélèvements sociaux s'ajoutent à l'impôt sur le revenu pour certains placements",
      details: [
        "CSG (Contribution Sociale Généralisée) : 9,2%",
        "CRDS (Contribution au Remboursement de la Dette Sociale) : 0,5%",
        "Prélèvement social : 7,5%",
        "Total : 17,2%"
      ]
    },
    impact: {
      title: "Impact sur vos investissements",
      description: "La TMI et les prélèvements sociaux déterminent le rendement net de vos placements",
      examples: [
        {
          title: "Placement à 4% avec TMI 30%",
          description: "Rendement net : 4% - (4% × 30%) - (4% × 17,2%) = 2,11%"
        },
        {
          title: "Placement à 4% avec TMI 41%",
          description: "Rendement net : 4% - (4% × 41%) - (4% × 17,2%) = 1,67%"
        }
      ]
    },
    cta: {
      title: "Besoin d'aide pour optimiser votre fiscalité ?",
      description: "Nos experts vous accompagnent pour comprendre et optimiser votre situation fiscale.",
      buttonText: "Demander une consultation gratuite"
    }
  };

  // Load content from CMS
  ;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-cairo font-bold text-white mb-6">
              {content.hero?.title || defaultContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-white mb-4 leading-relaxed">
              {content.hero?.subtitle || defaultContent.hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {content.hero?.description || defaultContent.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-inter font-semibold hover:bg-[#A67A5A] transition-colors text-sm sm:text-base shadow-lg"
              >
                {content.hero?.button || defaultContent.hero.button}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#253F60] mb-4">
              {content.definition?.title || defaultContent.definition.title}
            </h2>
            <p className="text-lg text-[#686868] max-w-3xl mx-auto mb-8">
              {content.definition?.description || defaultContent.definition.description}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-[#253F60]">
                <tr>
                  {(content.definition?.tableau?.headers || defaultContent.definition.tableau.headers).map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(content.definition?.tableau?.rows || defaultContent.definition.tableau.rows).map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4 text-sm font-medium text-[#253F60]">{row.revenu}</td>
                    <td className="px-6 py-4 text-sm text-[#686868]">{row.taux}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-center">
            <p className="text-[#686868] italic">
              {content.definition?.precision || defaultContent.definition.precision}
            </p>
          </div>
        </div>
      </section>

      {/* Prélèvements Sociaux Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#253F60] mb-4">
              {content.prelevementsSociaux?.title || defaultContent.prelevementsSociaux.title}
            </h2>
            <p className="text-lg text-[#686868] max-w-3xl mx-auto mb-8">
              {content.prelevementsSociaux?.description || defaultContent.prelevementsSociaux.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.prelevementsSociaux?.details || defaultContent.prelevementsSociaux.details).map((detail, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center border border-[#B99066]">
                <div className="text-lg font-semibold text-[#253F60]">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#253F60] mb-4">
              {content.impact?.title || defaultContent.impact.title}
            </h2>
            <p className="text-lg text-[#686868] max-w-3xl mx-auto mb-8">
              {content.impact?.description || defaultContent.impact.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(content.impact?.examples || defaultContent.impact.examples).map((example, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-[#253F60]">
                <h3 className="text-xl font-semibold text-[#253F60] mb-3">{example.title}</h3>
                <p className="text-[#686868]">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {content.cta?.title || defaultContent.cta.title}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            {content.cta?.description || defaultContent.cta.description}
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            className="bg-[#B99066] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#A67A5A] transition-colors"
          >
            Planifiez votre consultation gratuite
          </button>
        </div>
      </section>

      
    </>
  );
}