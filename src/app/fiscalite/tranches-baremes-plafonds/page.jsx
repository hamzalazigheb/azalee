"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/common/Footer";

export default function TranchesBaremesPlafondsPage() {
  const [content, setContent] = useState({});
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedSituation, setSelectedSituation] = useState("celibataire");

  const years = ["2025", "2024", "2023"];
  const situations = [
    { id: "celibataire", label: "Célibataire", parts: 1 },
    { id: "marie", label: "Marié(e)/Pacsé(e)", parts: 2 },
    { id: "avec-enfants", label: "Avec enfants", parts: 2.5 }
  ];

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Tranches, Barèmes et Plafonds",
      subtitle: "Comprendre la fiscalité française",
      description: "Les tranches d'imposition, barèmes et plafonds sont les éléments fondamentaux du système fiscal français. Ils déterminent le montant de vos impôts et influencent vos stratégies d'investissement.",
      button: "Calculer mes impôts",
      image: "/images/tranche.webp"
    },
    tranches: {
      title: "Tranches d'imposition 2025",
      description: "Les tranches d'imposition déterminent le taux appliqué à chaque partie de vos revenus",
      tableau: {
        headers: ["Revenu imposable", "Taux d'imposition"],
        rows: [
          { revenu: "Jusqu'à 11 294 €", taux: "0 %" },
          { revenu: "De 11 295 à 28 797 €", taux: "11 %" },
          { revenu: "De 28 798 à 82 341 €", taux: "30 %" },
          { revenu: "De 82 342 à 177 106 €", taux: "41 %" },
          { revenu: "Au-delà de 177 106 €", taux: "45 %" }
        ]
      }
    },
    plafonds: {
      title: "Plafonds fiscaux 2025",
      description: "Les plafonds limitent les avantages fiscaux de certains dispositifs",
      items: [
        {
          name: "Loi Pinel",
          plafond: "300 000€",
          description: "Plafond annuel d'investissement"
        },
        {
          name: "PER",
          plafond: "10% du revenu",
          description: "Plafond de versement annuel"
        },
        {
          name: "Déficit foncier",
          plafond: "10 700€",
          description: "Plafond annuel déductible"
        }
      ]
    },
    calculatrice: {
      title: "Calculateur d'impôts",
      description: "Estimez le montant de vos impôts selon votre situation",
      fields: [
        { id: "revenus", label: "Revenus annuels", placeholder: "50000" },
        { id: "parts", label: "Nombre de parts", placeholder: "1" }
      ]
    },
    cta: {
      title: "Besoin d'aide pour optimiser votre fiscalité ?",
      description: "Nos experts vous accompagnent pour comprendre et optimiser votre situation fiscale.",
      buttonText: "Demander une consultation gratuite"
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=fiscalite/tranches-baremes-plafonds&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            // Merge with defaultContent as fallback
            setContent({ ...defaultContent, ...data.data });
          } else {
            setContent(defaultContent);
          }
        } else {
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Failed to fetch fiscalite/tranches-baremes-plafonds content:", error);
        setContent(defaultContent);
      }
    };

    fetchContent();

    // Listen for CMS content updates
    const handleCMSUpdate = (event) => {
      const updatedPath = event.detail?.path?.toLowerCase();
      if (!updatedPath || updatedPath === 'fiscalite/tranches-baremes-plafonds' || updatedPath.includes('tranches-baremes-plafonds')) {
        console.log('🔄 CMS content updated, refreshing tranches-baremes-plafonds page...', updatedPath);
        fetchContent();
      }
    };

    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback: check for updates every 10 seconds when page is visible
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
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
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={content.hero?.image || defaultContent.hero.image} 
                  alt="Tranches & Barèmes"
                  className="w-full h-[250px] sm:h-[300px] lg:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tranches Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#253F60] mb-4">
              {content.tranches?.title || defaultContent.tranches.title}
            </h2>
            <p className="text-lg text-[#686868] max-w-3xl mx-auto mb-8">
              {content.tranches?.description || defaultContent.tranches.description}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#253F60]">
                <tr>
                  {(content.tranches?.tableau?.headers || defaultContent.tranches.tableau.headers).map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(content.tranches?.tableau?.rows || defaultContent.tranches.tableau.rows).map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-4 text-sm font-medium text-[#253F60]">{row.revenu}</td>
                    <td className="px-6 py-4 text-sm text-[#686868]">{row.taux}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Plafonds Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#253F60] mb-4">
              {content.plafonds?.title || defaultContent.plafonds.title}
            </h2>
            <p className="text-lg text-[#686868] max-w-3xl mx-auto mb-8">
              {content.plafonds?.description || defaultContent.plafonds.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.plafonds?.items || defaultContent.plafonds.items).map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-3xl font-bold text-[#253F60] mb-3 font-serif">{item.plafond}</div>
                <h3 className="text-xl font-semibold text-[#253F60] mb-3">{item.name}</h3>
                <p className="text-[#686868]">{item.description}</p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A67C52] transition-colors duration-200"
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            >
              Prenez rendez-vous
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}