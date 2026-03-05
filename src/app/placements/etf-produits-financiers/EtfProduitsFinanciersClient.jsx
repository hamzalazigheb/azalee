"use client";
import React from "react";
import SectionHeader from "../../../components/common/SectionHeader";

export default function EtfProduitsFinanciersClient({ content }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
                {content?.hero?.title || "Produits financiers : actions, ETF, produits structurés"}
              </h1>
              <p className="text-white text-lg font-inter leading-relaxed mb-8">
                {content?.hero?.subtitle || "Les supports dynamiques disponibles dans les enveloppes fiscales pour accéder à la croissance des marchés financiers avec une diversification optimale."}
              </p>
              <div className="bg-white/20 border-l-4 border-white p-4 rounded-r-lg mb-8">
                <p className="text-white text-sm font-inter">
                  {content?.hero?.note || "La réussite d'un placement dépend autant du support que de l'enveloppe fiscale choisie."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 py-3 rounded-lg shadow-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  {content?.hero?.primaryButton || "Analyser mes placements"}
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors duration-200"
                >
                  {content?.hero?.secondaryButton || "Découvrez nos solutions ETF"}
                </button>
              </div>
            </div>
            
            {/* Right: Product Types Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(content?.productTypes || [
                  { title: "Actions", subtitle: "Titres vifs d'entreprises", value: "Volatilité élevée", description: "Croissance potentielle" },
                  { title: "ETF", subtitle: "Fonds indiciels", value: "Diversification", description: "Frais réduits" },
                  { title: "Structurés", subtitle: "Produits sur-mesure", value: "Protection", description: "Rendement conditionnel" },
                  { title: "OPCVM", subtitle: "Fonds gérés", value: "Gestion active", description: "Expertise professionnelle" }
                ]).map((product, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    <div className={`w-16 h-16 ${idx % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]'} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <span className="text-white text-2xl font-bold">{idx + 1}</span>
                    </div>
                    <h3 className="text-[#112033] text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-[#686868] text-sm mb-2">{product.subtitle}</p>
                    <p className="text-[#B99066] text-xl font-bold">{product.value}</p>
                    <p className="text-[#686868] text-xs">{product.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.actions?.title || "Les actions : investir directement dans les entreprises"}
            subtitle={content?.actions?.subtitle || "Les actions représentent une part du capital d'une entreprise cotée en bourse"}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-cairo font-bold mb-6">
                {content?.actions?.avantages?.title || "Avantages"}
              </h3>
              <ul className="space-y-4">
                {(content?.actions?.avantages?.items || [
                  "Potentiel de croissance élevé",
                  "Dividendes réguliers possibles",
                  "Liquidité importante",
                  "Droits de vote en assemblée"
                ]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#B99066] text-xl">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-cairo font-bold mb-6">
                {content?.actions?.risques?.title || "Risques"}
              </h3>
              <ul className="space-y-4">
                {(content?.actions?.risques?.items || [
                  "Volatilité importante",
                  "Risque de perte en capital",
                  "Nécessite une analyse approfondie",
                  "Concentration sur un seul titre"
                ]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-white text-xl">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ETF Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.etf?.title || "Les ETF : la diversification simplifiée"}
            subtitle={content?.etf?.subtitle || "Les ETF (Exchange Traded Funds) répliquent la performance d'un indice boursier"}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {(content?.etf?.types || [
              { name: "ETF Actions", description: "Répliquent des indices comme le CAC 40, S&P 500, MSCI World", icon: "📈" },
              { name: "ETF Obligations", description: "Exposent aux marchés obligataires avec diversification", icon: "📊" },
              { name: "ETF Thématiques", description: "Ciblent des secteurs spécifiques : tech, santé, ESG", icon: "🎯" }
            ]).map((type, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-3">{type.name}</h3>
                <p className="text-[#686868]">{type.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-[#B99066]">
            <h3 className="text-[#253F60] text-xl font-cairo font-bold mb-4">
              {content?.etf?.avantage?.title || "Pourquoi choisir les ETF ?"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(content?.etf?.avantage?.items || [
                { label: "Frais", value: "0.1% - 0.5%", description: "Beaucoup moins que les fonds actifs" },
                { label: "Diversification", value: "Automatique", description: "Exposition à des centaines de titres" },
                { label: "Liquidité", value: "Élevée", description: "Achat/vente en temps réel" },
                { label: "Transparence", value: "Totale", description: "Composition connue en permanence" }
              ]).map((item, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-[#B99066] text-2xl font-bold">{item.value}</p>
                  <p className="text-[#253F60] font-semibold">{item.label}</p>
                  <p className="text-[#686868] text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Produits Structurés Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content?.structures?.title || "Les produits structurés : rendement et protection"}
            subtitle={content?.structures?.subtitle || "Des solutions sur-mesure combinant performance et gestion du risque"}
          />
          
          <div className="mt-12 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-cairo font-bold mb-6">
                  {content?.structures?.fonctionnement?.title || "Comment ça fonctionne ?"}
                </h3>
                <p className="mb-6 opacity-90">
                  {content?.structures?.fonctionnement?.description || "Un produit structuré combine plusieurs instruments financiers pour offrir un profil de rendement/risque spécifique."}
                </p>
                <ul className="space-y-3">
                  {(content?.structures?.fonctionnement?.items || [
                    "Sous-jacent : action, indice, panier d'actions",
                    "Barrière de protection : limite les pertes",
                    "Coupon : rendement potentiel défini à l'avance",
                    "Durée : généralement 1 à 10 ans"
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#B99066] bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-xl font-cairo font-bold mb-4">
                  {content?.structures?.exemple?.title || "Exemple de produit"}
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Sous-jacent</span>
                    <span className="font-bold">{content?.structures?.exemple?.sousjacent || "CAC 40"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Protection</span>
                    <span className="font-bold">{content?.structures?.exemple?.protection || "-30%"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>Coupon annuel</span>
                    <span className="font-bold">{content?.structures?.exemple?.coupon || "8%"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durée</span>
                    <span className="font-bold">{content?.structures?.exemple?.duree || "5 ans"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-cairo font-bold mb-6">
              {content?.cta?.title || "Besoin d'aide pour choisir vos supports ?"}
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              {content?.cta?.description || "Nos experts vous accompagnent pour sélectionner les produits financiers adaptés à votre profil et vos objectifs."}
            </p>
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-white text-[#253F60] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {content?.cta?.buttonText || "Demander une analyse gratuite"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

