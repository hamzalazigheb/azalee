"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function ReductionsImpotDeficitFoncierPage() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Déficit foncier et réductions d'impôt",
      subtitle: "Un levier fiscal puissant pour investisseurs avertis",
      description: "Pour les investisseurs disposant de revenus fonciers imposables ou d'une tranche marginale d'imposition (TMI) élevée, le déficit foncier permet une double optimisation : réduction de l'impôt sur le revenu et diminution des prélèvements sociaux (CSG/CRDS à 17,2%) sur les revenus fonciers.",
      button: "Calculer mon déficit foncier",
      image: "/images/fiscalite-deficit-foncier-hero.jpg"
    },
    quickStats: {
      title: "Chiffres clés",
      stats: [
        { label: "Déficit foncier", value: "10 700€", description: "Plafond annuel déductible" },
        { label: "Report", value: "10 ans", description: "Sur revenus fonciers" },
        { label: "Rendement fiscal", value: "58%", description: "TMI 41% + CSG/CRDS" }
      ]
    },
    comparison: {
      title: "Réduction d'impôt ou déduction du revenu ?",
      description: "Comprendre la différence entre les deux mécanismes fiscaux",
      table: {
        headers: ["Mécanisme", "Effet fiscal", "Bénéfice"],
        rows: [
          {
            mecanisme: "Réduction d'impôt",
            effet: "Soustraction directe de l'impôt à payer",
            benefice: "1 000 € réduits = 1 000 € gagnés"
          },
          {
            mecanisme: "Déficit foncier",
            effet: "Diminution de la base imposable",
            benefice: "Effet amplifié selon la TMI + économie de CSG/CRDS"
          }
        ]
      }
    },
    investorProfile: {
      title: "Qui peut en profiter ?",
      description: "Le déficit foncier s'adresse à des investisseurs spécifiques",
      profiles: [
        "Propriétaires de biens locatifs déjà imposables au régime réel (hors micro-foncier)",
        "Contribuables avec une TMI élevée (30% ou plus)",
        "Investisseurs souhaitant valoriser des biens anciens avec travaux"
      ]
    },
    conditions: {
      title: "Conditions pour créer un déficit foncier",
      description: "Les conditions spécifiques à respecter pour bénéficier du déficit foncier",
      conditions: [
        "Bien en location nue (non meublée), soumis au régime réel",
        "Travaux éligibles : entretien, réparation, amélioration",
        "Pas d'agrandissement ni de construction neuve",
        "Travaux réellement payés et effectués avant d'être mis en location"
      ]
    },
    cta: {
      title: "Besoin d'aide pour optimiser votre fiscalité ?",
      description: "Nos experts vous accompagnent dans votre stratégie de déficit foncier et réductions d'impôt.",
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

      {/* Quick Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.quickStats?.title || defaultContent.quickStats.title}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.quickStats?.stats || defaultContent.quickStats.stats).map((stat, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 3 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#253F60]'} rounded-2xl shadow-xl hover:shadow-2xl p-6 text-center text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                <div className="text-4xl font-bold mb-2 relative z-10">{stat.value}</div>
                <div className="text-lg font-semibold mb-2 relative z-10">{stat.label}</div>
                <div className="text-white/90 relative z-10">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.comparison?.title || defaultContent.comparison.title}
            subtitle={content.comparison?.description || defaultContent.comparison.description}
          />
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#253F60] to-[#1a2d47]">
                <tr>
                  {(content.comparison?.table?.headers || defaultContent.comparison.table.headers).map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(content.comparison?.table?.rows || defaultContent.comparison.table.rows).map((row, index) => (
                  <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 text-sm font-medium text-[#253F60]">{row.mecanisme}</td>
                    <td className="px-6 py-4 text-sm text-[#686868]">{row.effet}</td>
                    <td className="px-6 py-4 text-sm text-[#686868]">{row.benefice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Investor Profile Section */}
      <section className="py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.investorProfile?.title || defaultContent.investorProfile.title}
            subtitle={content.investorProfile?.description || defaultContent.investorProfile.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.investorProfile?.profiles || defaultContent.investorProfile.profiles).map((profile, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 3 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#253F60]'} rounded-2xl shadow-xl hover:shadow-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="flex items-start relative z-10">
                  <div className="text-white mr-3 mt-1 text-xl font-bold">✓</div>
                  <div className="text-lg font-semibold text-white leading-relaxed">{profile}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.conditions?.title || defaultContent.conditions.title}
            subtitle={content.conditions?.description || defaultContent.conditions.description}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(content.conditions?.conditions || defaultContent.conditions.conditions).map((condition, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${index % 2 === 0 ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'from-[#B99066] via-[#A67A5A] to-[#B99066]'} rounded-2xl shadow-xl hover:shadow-2xl p-6 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="flex items-start relative z-10">
                  <div className="text-white mr-3 mt-1 text-xl font-bold">✓</div>
                  <div className="text-lg font-semibold text-white leading-relaxed">{condition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {content.cta?.title || defaultContent.cta.title}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {content.cta?.description || defaultContent.cta.description}
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-3 rounded-lg shadow-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            Prendre rendez-vous
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}