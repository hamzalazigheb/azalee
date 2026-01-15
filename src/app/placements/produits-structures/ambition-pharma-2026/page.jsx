"use client";
import React from "react";
import Footer from "../../../../components/common/Footer";
import Link from "next/link";
import SectionHeader from "../../../../components/common/SectionHeader";

export default function AmbitionPharma2026Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-white font-semibold text-sm">Produit structuré</span>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-6">
              AMBITION PHARMA JANVIER 2026
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto">
              JANVIER 2026 - Exposition au secteur de la santé et des biotechnologies
            </p>
            <div className="mt-8 inline-block bg-[#B99066] rounded-full px-8 py-4 shadow-xl">
              <span className="text-white font-bold text-2xl">+10% PAR AN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Informations principales */}
          <div className="mb-16">
            <SectionHeader 
              title="Informations du produit"
              subtitle="Découvrez les caractéristiques essentielles de ce produit structuré"
            />
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">ISIN / Code</p>
                    <p className="text-white font-semibold text-lg">EI21918ACD</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Thématique</p>
                    <p className="text-white font-semibold text-lg">Santé & biotechnologies</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Émetteur</p>
                    <p className="text-white font-semibold text-lg">Crédit Agricole CIB</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Garant</p>
                    <p className="text-white font-semibold text-lg">Crédit Agricole S.A.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Sous-jacent</p>
                    <p className="text-white font-semibold text-lg">iEdge Global Pharma & Biotech Select Decrement 50 Points GTR®</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Durée maximale</p>
                    <p className="text-white font-semibold text-lg">8 ans (échéance 2034)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Souscription</p>
                    <p className="text-white font-semibold text-lg">Jusqu'au 31 janvier 2026</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Éligibilité</p>
                    <p className="text-white font-semibold text-lg">Assurance-vie, PER, Compte-titres</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Objectif de rendement */}
          <div className="mb-16">
            <SectionHeader 
              title="Objectif de rendement"
              subtitle="Un potentiel de performance attractif avec un mécanisme dégressif"
            />
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#253F60]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-tr-full"></div>
              
              <div className="relative z-10 text-center mb-8">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-8 py-6 mb-6 border-2 border-white/30">
                  <span className="text-white font-bold text-3xl sm:text-4xl">+10% PAR AN</span>
                </div>
                <p className="text-white text-lg sm:text-xl font-medium">
                  Coupon annuel conditionnel de 10 % par an
                
                </p>
              </div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20">
                <p className="text-white font-semibold mb-3 text-lg">Mécanisme :</p>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  Le coupon annuel de 10 % est versé chaque année si l'indice est supérieur ou égal à 50 % 
                  du niveau initial. Le rendement est versé à l'échéance ou lors d'un rappel anticipé.
                
                </p>
              </div>
            </div>
          </div>

          {/* Barrière et protection */}
          <div className="mb-16">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
              Barrière / Protection du capital
            </h2>
            <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-xl p-8 border-l-4 border-[#253F60]">
              <ul className="space-y-3 text-[#4B5563]">
                <li className="flex items-start gap-2">
                  <span className="text-[#253F60] font-bold mt-1">•</span>
                  <span>Protection du capital jusqu'à 50 % de baisse du sous-jacent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#253F60] font-bold mt-1">•</span>
                  <span>Coupon annuel conditionnel (paiement si indice ≥ 50 % du niveau initial)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Points forts */}
          <div className="mb-16">
            <SectionHeader 
              title="Points forts"
              subtitle="Les avantages clés de ce produit structuré"
            />
            <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-xl p-8 border-l-4 border-green-500">
              <ul className="space-y-3 text-[#4B5563]">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Secteur défensif et résilient</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Rendement cible élevé (10 %/an)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Protection renforcée du capital</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Risques clés */}
          <div className="mb-16">
            <SectionHeader 
              title="Risques clés"
              subtitle="Les risques importants à connaître avant d'investir"
            />
            <div className="relative bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border-l-4 border-amber-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200/20 rounded-bl-full"></div>
              <div className="space-y-6 sm:space-y-8 relative z-10">
                <ul className="space-y-3 text-[#4B5563]">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-1">⚠️</span>
                    <span>Risque de perte partielle du capital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-1">⚠️</span>
                    <span>Risque sectoriel (pharma/biotech)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-1">⚠️</span>
                    <span>Risque de liquidité avant échéance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          {/* CTA */}
          <div className="mb-16">
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/20 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                  Intéressé par ce produit ?
                </h3>
                <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                  Contactez un conseiller Azalée Patrimoine pour obtenir la documentation complète 
                  et vérifier l'adéquation de ce produit avec votre profil d'investisseur.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://calendly.com/rdv-azalee-patrimoine/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    Planifiez votre consultation gratuite avec un conseiller
                  </a>
                  <Link
                    href="/placements/produits-structures"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                  >
                    Voir les autres produits structurés
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
            <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
              🔒 Disclaimer global
            </h3>
            <div className="space-y-3 text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              <p>
                Les produits présentés sont destinés à des investisseurs avertis ayant une bonne compréhension des mécanismes et des risques associés aux produits structurés.
              </p>
              <p>
                Ils ne constituent pas un conseil en investissement personnalisé.
              </p>
              <p>
                Avant toute souscription, il est impératif de vérifier l'adéquation du produit avec le profil de risque et les objectifs d'investissement de chaque investisseur.
              </p>
              <p>
                Les brochures officielles, Documents d'Informations Clés (DIC) et Conditions Définitives sont disponibles sur la page dédiée à chaque produit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

