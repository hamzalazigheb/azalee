"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../../components/common/Footer";
import PlacementChart from "../../../components/PlacementChart";
import SectionHeader from "../../../components/common/SectionHeader";
import Link from "next/link";

export const defaultContent = {
  hero: {
    title: "Protection de la famille",
    description: "Construire un patrimoine est une étape importante, mais encore faut-il s'assurer que sa famille pourra en bénéficier dans de bonnes conditions.",
    highlight: "En cas de décès prématuré, d'accident ou d'invalidité, un patrimoine peut vite devenir un poids plutôt qu'un soutien s'il est trop immobilisé (immobilier, parts sociales, entreprise).",
    guarantees: [
      { title: "Revenus immédiats", description: "Pour maintenir leur niveau de vie" },
      { title: "Garder le patrimoine", description: "Sans devoir tout vendre" },
      { title: "Sécurité financière", description: "Dans un moment difficile" }
    ]
  },
  chart: {
    data: [
      { label: "Couverture prévoyance", value: "€400,000" },
      { label: "Droits de succession", value: "€400,000" },
      { label: "Coût mensuel moyen", value: "€85" },
      { label: "Durée de couverture", value: "25 ans" },
      { label: "Protection famille", value: "100%" }
    ]
  },
  seo: {
    metaTitle: "Protection de la Famille | Azalée Patrimoine",
    metaDescription: "Protégez votre famille et votre patrimoine avec les solutions d'Azalée Patrimoine."
  }
};

export default function ProtectionFamillePage() {
  const [content, setContent] = useState(defaultContent);
  
  // Load content from CMS
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=patrimoine/protection-famille&t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            setContent((prev) => ({ ...prev, ...data.content }));
          }
        }
      } catch (error) {
        console.error("Failed to load CMS content", error);
      }
    };

    loadContent();

    // Listen for CMS updates
    const handleCMSUpdate = () => {
      loadContent();
    };
    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);

  const chartData = content.chart?.data || defaultContent.chart.data;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
              {content.hero?.title || defaultContent.hero.title}
            </h1>
            <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8">
              {content.hero?.description || defaultContent.hero.description}
            </p>
            {content.hero?.highlight && (
              <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg max-w-4xl mx-auto mb-8">
                <p className="text-white text-sm font-inter">
                  {content.hero.highlight}
                </p>
              </div>
            )}
            {content.hero?.guarantees && content.hero.guarantees.length > 0 && (
              <>
                <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8">
                  La protection familiale, c'est garantir à ses proches :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                  {content.hero.guarantees.map((item, index) => {
                const isBlue = index % 2 === 0;
                return (
                  <div 
                    key={index}
                    className={`relative rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${
                      isBlue 
                        ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' 
                        : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                    }`}
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${
                      isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                    }`}></div>
                    <div className="relative z-10 text-center">
                      <h3 className={`font-cairo font-bold mb-2 text-lg sm:text-xl ${
                        isBlue ? 'text-white' : 'text-white'
                      }`}>{item.title}</h3>
                      <p className={`text-sm ${
                        isBlue ? 'text-white/90' : 'text-white/90'
                      }`}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/rdv-azalee-patrimoine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B99066] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-lg hover:bg-[#A67A5A] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-center"
            >
              Évaluer mes besoins
            </a>
            <a
              href="https://calendly.com/rdv-azalee-patrimoine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-center"
            >
              Comparer les offres
            </a>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Indicateurs de protection familiale"
            subtitle="Visualisez les paramètres clés de la protection familiale"
          />
          
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border-2 border-[#253F60]/20">
            <PlacementChart 
              title="Indicateurs de protection familiale"
              data={chartData}
              chartImage="/images/protection.webp"
            />
          </div>
        </div>
      </section>

      {/* La prévoyance décès Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="La prévoyance décès : l'oubli qui coûte cher"
            subtitle="La plupart des épargnants négligent la prévoyance décès, pensant que leur patrimoine suffira"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Problèmes au décès */}
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-6">
                  En réalité, au décès :
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <p className="text-white/90 text-sm sm:text-base">
                      Les <strong>droits de succession</strong> doivent être payés rapidement
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <p className="text-white/90 text-sm sm:text-base">
                      Le patrimoine peut être <strong>bloqué</strong> (indivision, délais notariaux)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <p className="text-white/90 text-sm sm:text-base">
                      Les revenus locatifs ou professionnels <strong>ne suffisent pas toujours</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conséquences sans prévoyance */}
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-6">
                  Sans liquidités, les héritiers doivent parfois <strong>vendre dans l'urgence</strong> :
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <p className="text-white/90 text-sm sm:text-base">
                      Une <strong>résidence secondaire</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <p className="text-white/90 text-sm sm:text-base">
                      Un bien <strong>immobilier locatif</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <p className="text-white/90 text-sm sm:text-base">
                      Des <strong>parts d'entreprise familiale</strong>
                    </p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 p-4 rounded-lg mt-6">
                  <p className="text-white/90 text-xs sm:text-sm text-center italic">
                    ("les bijoux de famille")
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemple concret Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Exemple concret"
            subtitle="Un chef d'entreprise décède à 58 ans, laissant :"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Situation sans prévoyance */}
            <div className="relative bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 rounded-2xl p-8 sm:p-10 shadow-xl border-l-4 border-amber-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <h3 className="text-[#112033] text-xl sm:text-2xl font-cairo font-bold mb-6 text-center">
                  Situation sans prévoyance
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200">
                    <span className="text-[#112033] font-medium">Maison familiale</span>
                    <span className="text-[#253F60] font-bold text-lg">800 000 €</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200">
                    <span className="text-[#112033] font-medium">Parts de société</span>
                    <span className="text-[#B99066] font-bold text-lg">1 M€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200">
                    <span className="text-[#112033] font-medium">Épargne liquide</span>
                    <span className="text-[#253F60] font-bold text-lg">100 000 €</span>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <h4 className="text-red-800 font-semibold mb-2">Problème :</h4>
                  <p className="text-red-700 text-sm mb-2">
                    Les droits de succession dus par les enfants dépassent <strong>400 000 €</strong>.
                  </p>
                  <p className="text-red-700 text-sm">
                    Sans prévoyance, les héritiers n'ont pas d'autre choix que de vendre rapidement des actifs, parfois à perte.
                  </p>
                </div>
              </div>
            </div>

            {/* Situation avec prévoyance */}
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
              <div className="relative z-10">
                <h3 className="text-white text-xl sm:text-2xl font-cairo font-bold mb-6 text-center">
                  Avec un contrat de prévoyance décès de 400 000 €
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <span className="text-white font-medium">Maison familiale</span>
                    <span className="text-white font-bold text-lg">800 000 €</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <span className="text-white font-medium">Parts de société</span>
                    <span className="text-white font-bold text-lg">1 M€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <span className="text-white font-medium">Épargne liquide</span>
                    <span className="text-white font-bold text-lg">100 000 €</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white rounded-lg border-2 border-white/30">
                    <span className="font-medium">Prévoyance décès</span>
                    <span className="font-bold text-xl">400 000 €</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Résultat :</h4>
                  <ul className="text-white/90 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1 font-bold">•</span>
                      <span>Les droits sont réglés <strong>immédiatement</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1 font-bold">•</span>
                      <span>L'entreprise et l'immobilier sont <strong>conservés</strong> dans le giron familial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white mt-1 font-bold">•</span>
                      <span>La transmission est <strong>sereine et équitable</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les autres leviers de protection Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Les autres leviers de protection"
            subtitle="Découvrez les 3 principaux leviers de protection familiale"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Assurance-vie",
                description: "Clause bénéficiaire personnalisée pour protéger le conjoint ou les enfants."
              },
              {
                title: "Aménagement du régime matrimonial",
                description: "Communauté universelle, clauses de préciput pour favoriser le conjoint survivant."
              },
              {
                title: "Mandat de protection future",
                description: "Anticiper une perte de capacité."
              }
            ].map((levier, index) => {
              const isBlue = index % 2 === 0;
              return (
                <div 
                  key={index}
                  className={`relative rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group text-center ${
                    isBlue 
                      ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' 
                      : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${
                    isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                  }`}></div>
                  <div className="relative z-10">
                    <h3 className={`text-xl sm:text-2xl font-cairo font-bold mb-4 ${
                      isBlue ? 'text-white' : 'text-white'
                    }`}>
                      {levier.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isBlue ? 'text-white/90' : 'text-white/90'
                    }`}>
                      {levier.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* La vision Azalée Patrimoine Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="La vision Azalée Patrimoine"
            subtitle="Chez Azalée Patrimoine, nous intégrons toujours la protection familiale dans nos stratégies patrimoniales"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {[
              {
                title: "Contrats de prévoyance adaptés",
                description: "Mise en place de contrats de prévoyance adaptés à votre situation familiale et patrimoniale."
              },
              {
                title: "Clause bénéficiaire optimisée",
                description: "Optimisation de la clause bénéficiaire des assurances-vie pour protéger vos proches."
              },
              {
                title: "Coordination d'experts",
                description: "Coordination avec notaire et expert-comptable pour protéger conjoint et enfants."
              },
              {
                title: "Anticipation de la liquidité",
                description: "Anticipation de la liquidité nécessaire pour éviter les ventes forcées."
              }
            ].map((item, index) => {
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
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${
                    isBlue ? 'bg-[#B99066]/20' : 'bg-[#253F60]/20'
                  }`}></div>
                  <div className="relative z-10">
                    <h3 className={`text-lg sm:text-xl font-cairo font-bold mb-3 ${
                      isBlue ? 'text-white' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isBlue ? 'text-white/90' : 'text-white/90'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                La prévoyance décès est souvent ignorée, mais elle peut être le <strong>véritable sauveur</strong> d'un patrimoine transmis.
              </h3>
              
              <div className="mt-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 p-6 rounded-lg max-w-4xl mx-auto">
                <p className="text-white text-center font-semibold text-base sm:text-lg">
                  <strong>Prenez rendez-vous avec Azalée Patrimoine</strong> pour mettre en place un plan de protection familiale sur mesure et assurer la pérennité de votre patrimoine.
                </p>
              </div>
            </div>
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                Prêt à protéger votre famille ?
              </h2>
              <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Nos experts vous accompagnent pour mettre en place un plan de protection familiale sur mesure et assurer la pérennité de votre patrimoine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/rdv-azalee-patrimoine/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg"
                >
                  Évaluer mes besoins
                </a>
                <a
                  href="https://calendly.com/rdv-azalee-patrimoine/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-lg"
                >
                  Planifiez votre consultation gratuite
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}