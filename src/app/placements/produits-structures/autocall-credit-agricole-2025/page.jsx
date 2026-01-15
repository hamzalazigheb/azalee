"use client";
import React from "react";
import Footer from "../../../../components/common/Footer";
import Link from "next/link";
import SectionHeader from "../../../../components/common/SectionHeader";

export default function AutocallCreditAgricole2025Page() {
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
              AUTO-CALL CRÉDIT AGRICOLE
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto">
              JUIN 2025 - Exposition au secteur bancaire via l'action Crédit Agricole
            </p>
            <div className="mt-8 inline-block bg-[#B99066] rounded-full px-8 py-4 shadow-xl">
              <span className="text-white font-bold text-2xl">+15% DÉJÀ RÉALISÉS</span>
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
                    <p className="text-white font-semibold text-lg">FR001459AB6990</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Thématique</p>
                    <p className="text-white font-semibold text-lg">Secteur bancaire / action unique</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Émetteur</p>
                    <p className="text-white font-semibold text-lg">Société Générale</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Garant</p>
                    <p className="text-white font-semibold text-lg">Société Générale</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Sous-jacent</p>
                    <p className="text-white font-semibold text-lg">Action Crédit Agricole S.A.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Durée maximale</p>
                    <p className="text-white font-semibold text-lg">5 ans (échéance 2030)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Souscription</p>
                    <p className="text-white font-semibold text-lg">Jusqu'au 30 juin 2025</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Éligibilité</p>
                    <p className="text-white font-semibold text-lg">Assurance-vie, Compte-titres</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="mb-16">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
              Performance
            </h2>
            <div className="bg-white rounded-xl shadow-lg border-2 border-green-500 p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-br from-green-500 to-green-600 rounded-full px-8 py-4 mb-4">
                  <span className="text-white font-bold text-3xl">+15% DÉJÀ RÉALISÉS</span>
                </div>
                <p className="text-[#4B5563] text-lg">
                  Performance déjà atteinte depuis le lancement du produit
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-[#253F60] font-semibold mb-2">Mécanisme d'autocall :</p>
                <p className="text-[#4B5563]">
                  Le produit peut être remboursé automatiquement avant l'échéance si le cours de l'action 
                  Crédit Agricole atteint ou dépasse 100 % de son niveau initial à une date d'observation. 
                  Dans ce cas, le remboursement se fait avec le gain réalisé.
                </p>
              </div>
            </div>
          </div>

          {/* Barrière et protection */}
          <div className="mb-16">
            <SectionHeader 
              title="Barrière et protection du capital"
              subtitle="Comprendre les mécanismes de protection et de rappel anticipé"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl sm:text-2xl mb-6 relative z-10">Rappel anticipé automatique</h3>
                <p className="text-white/90 mb-4 text-base sm:text-lg leading-relaxed relative z-10">
                  Rappel anticipé automatique si le cours de Crédit Agricole ≥ 100 % du niveau initial 
                  à une date d'observation
                
                </p>
                <p className="text-white font-semibold text-base sm:text-lg relative z-10">
                  Le produit peut être remboursé avant l'échéance avec le gain réalisé si les conditions sont remplies.
                
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                <h3 className="text-[#253F60] font-bold text-lg mb-4">Protection à l'échéance</h3>
                <p className="text-[#4B5563] mb-4">
                  Protection du capital à 50 % du niveau initial à l'échéance
                </p>
                <p className="text-[#253F60] font-semibold mb-2">Risque :</p>
                <ul className="list-disc list-inside text-[#4B5563] space-y-1">
                  <li>Risque de perte en capital en cas de forte baisse du titre</li>
                  <li>Risque spécifique à l'action Crédit Agricole</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Points forts */}
          <div className="mb-16">
            <SectionHeader 
              title="Points forts"
              subtitle="Les avantages clés de ce produit structuré"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-[#B99066] text-2xl">✓</span>
                  <span>Sous-jacent simple et transparent
                </span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  Exposition à une action unique, Crédit Agricole, facilitant la compréhension 
                  et le suivi du produit.
                
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-[#253F60] text-2xl">✓</span>
                  <span>Performance déjà atteinte (+15 %)
                </span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  Le produit a déjà atteint sa performance cible de +15 % depuis le lancement, 
                  démontrant la solidité de la stratégie.
                
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-[#B99066] text-2xl">✓</span>
                  <span>Exposition au secteur bancaire solide
                </span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  Crédit Agricole est l'une des plus grandes banques françaises, offrant une exposition 
                  au secteur bancaire avec un niveau de risque maîtrisé.
                
                </p>
              </div>
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
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h3 className="text-[#253F60] font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                    <span className="text-amber-600 text-xl">⚠️</span>
                    <span>Risque de perte en capital</span>
                  </h3>
                  <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                    Risque de perte en capital en cas de forte baisse du titre Crédit Agricole. 
                    Le capital n'est protégé qu'à 50 % du niveau initial à l'échéance.
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h3 className="text-[#253F60] font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                    <span className="text-amber-600 text-xl">⚠️</span>
                    <span>Risque spécifique à l'action Crédit Agricole</span>
                  </h3>
                  <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                    Le produit est exposé aux risques spécifiques de l'action Crédit Agricole : résultats financiers, 
                    réglementation bancaire, environnement économique, etc.
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h3 className="text-[#253F60] font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                    <span className="text-amber-600 text-xl">⚠️</span>
                    <span>Risque de liquidité</span>
                  </h3>
                  <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                    Le produit est conçu pour être détenu jusqu'à l'échéance ou le rappel anticipé. 
                    Une sortie anticipée peut entraîner des pertes ou des frais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pourquoi ce produit */}
          <div className="mb-16">
            <SectionHeader 
              title="Pourquoi investir dans ce produit ?"
              subtitle="Une opportunité d'investissement dans un secteur porteur"
            />
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B99066]/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B99066]/10 rounded-tr-full"></div>
              
              <div className="relative z-10 space-y-6">
                <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed font-light">
                  Ce produit structuré offre une exposition simple et transparente au secteur bancaire français 
                  via l'action Crédit Agricole, l'une des plus grandes banques françaises.
                </p>
                <p className="text-lg sm:text-xl leading-relaxed">
                  Avec une performance déjà réalisée de +15 % et un mécanisme d'autocall qui permet de verrouiller 
                  les gains rapidement, ce produit s'adresse aux investisseurs souhaitant une exposition au secteur 
                  bancaire avec un niveau de risque maîtrisé et une durée d'investissement plus courte (5 ans).
                </p>
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
          <div className="relative bg-gradient-to-br from-red-50 via-red-100/50 to-red-50 rounded-2xl p-8 sm:p-10 border-l-4 border-red-500 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-bl-full"></div>
            <div className="relative z-10">
              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
                <strong className="text-red-700 text-lg sm:text-xl">🔒 Avertissement :</strong> Ce produit est destiné à des investisseurs avertis 
                ayant une bonne compréhension des mécanismes et des risques associés aux produits structurés. 
                Il ne constitue pas un conseil en investissement personnalisé. Avant toute souscription, 
                il est impératif de vérifier l'adéquation du produit avec le profil de risque et les objectifs 
                d'investissement de chaque investisseur. Les performances passées ne préjugent pas des performances futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


