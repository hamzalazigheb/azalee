"use client";
import React from "react";
import Header from "../../../../components/common/Header";
import Footer from "../../../../components/common/Footer";
import Link from "next/link";

export default function AutocallCreditAgricole2025Page() {
  return (
    <>
      <Header />
      
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
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-xl p-8 border-l-4 border-[#253F60] mb-8">
              <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
                Informations du produit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">ISIN / Code</p>
                  <p className="text-[#253F60] font-semibold text-lg">FR001459AB6990</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Thématique</p>
                  <p className="text-[#253F60] font-semibold text-lg">Secteur bancaire / action unique</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Émetteur</p>
                  <p className="text-[#253F60] font-semibold text-lg">Société Générale</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Garant</p>
                  <p className="text-[#253F60] font-semibold text-lg">Société Générale</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sous-jacent</p>
                  <p className="text-[#253F60] font-semibold text-lg">Action Crédit Agricole S.A.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Durée maximale</p>
                  <p className="text-[#253F60] font-semibold text-lg">5 ans (échéance 2030)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Souscription</p>
                  <p className="text-[#253F60] font-semibold text-lg">Jusqu'au 30 juin 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Éligibilité</p>
                  <p className="text-[#253F60] font-semibold text-lg">Assurance-vie, Compte-titres</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="mb-12">
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
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
              Barrière et protection du capital
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-xl p-6 border-l-4 border-[#253F60]">
                <h3 className="text-[#253F60] font-bold text-lg mb-4">Rappel anticipé automatique</h3>
                <p className="text-[#4B5563] mb-4">
                  Rappel anticipé automatique si le cours de Crédit Agricole ≥ 100 % du niveau initial 
                  à une date d'observation
                </p>
                <p className="text-[#253F60] font-semibold">
                  Le produit peut être remboursé avant l'échéance avec le gain réalisé si les conditions sont remplies.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-xl p-6 border-l-4 border-[#B99066]">
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
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
              Points forts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-[#253F60] font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Sous-jacent simple et transparent
                </h3>
                <p className="text-[#4B5563]">
                  Exposition à une action unique, Crédit Agricole, facilitant la compréhension 
                  et le suivi du produit.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-[#253F60] font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Performance déjà atteinte (+15 %)
                </h3>
                <p className="text-[#4B5563]">
                  Le produit a déjà atteint sa performance cible de +15 % depuis le lancement, 
                  démontrant la solidité de la stratégie.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-[#253F60] font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Exposition au secteur bancaire solide
                </h3>
                <p className="text-[#4B5563]">
                  Crédit Agricole est l'une des plus grandes banques françaises, offrant une exposition 
                  au secteur bancaire avec un niveau de risque maîtrisé.
                </p>
              </div>
            </div>
          </div>

          {/* Risques clés */}
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
              Risques clés
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#253F60] font-bold text-lg mb-2">⚠️ Risque de perte en capital</h3>
                  <p className="text-[#4B5563]">
                    Risque de perte en capital en cas de forte baisse du titre Crédit Agricole. 
                    Le capital n'est protégé qu'à 50 % du niveau initial à l'échéance.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-bold text-lg mb-2">⚠️ Risque spécifique à l'action Crédit Agricole</h3>
                  <p className="text-[#4B5563]">
                    Le produit est exposé aux risques spécifiques de l'action Crédit Agricole : résultats financiers, 
                    réglementation bancaire, environnement économique, etc.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-bold text-lg mb-2">⚠️ Risque de liquidité</h3>
                  <p className="text-[#4B5563]">
                    Le produit est conçu pour être détenu jusqu'à l'échéance ou le rappel anticipé. 
                    Une sortie anticipée peut entraîner des pertes ou des frais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pourquoi ce produit */}
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
              Pourquoi investir dans ce produit ?
            </h2>
            <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-2xl p-10 text-white shadow-2xl">
              <p className="text-xl sm:text-2xl leading-relaxed font-light mb-6">
                Ce produit structuré offre une exposition simple et transparente au secteur bancaire français 
                via l'action Crédit Agricole, l'une des plus grandes banques françaises.
              </p>
              <p className="text-lg leading-relaxed">
                Avec une performance déjà réalisée de +15 % et un mécanisme d'autocall qui permet de verrouiller 
                les gains rapidement, ce produit s'adresse aux investisseurs souhaitant une exposition au secteur 
                bancaire avec un niveau de risque maîtrisé et une durée d'investissement plus courte (5 ans).
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-xl p-8 border-2 border-[#253F60]">
              <h3 className="text-[#253F60] text-2xl font-cairo font-bold mb-4">
                Intéressé par ce produit ?
              </h3>
              <p className="text-[#4B5563] mb-6">
                Contactez un conseiller Azalée Patrimoine pour obtenir la documentation complète 
                et vérifier l'adéquation de ce produit avec votre profil d'investisseur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/rdv-azalee-patrimoine/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
                >
                  Prendre rendez-vous avec un conseiller
                </a>
                <Link
                  href="/placements/produits-structures"
                  className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
                >
                  Voir les autres produits structurés
                </Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <p className="text-sm text-[#4B5563]">
              <strong className="text-[#253F60]">🔒 Avertissement :</strong> Ce produit est destiné à des investisseurs avertis 
              ayant une bonne compréhension des mécanismes et des risques associés aux produits structurés. 
              Il ne constitue pas un conseil en investissement personnalisé. Avant toute souscription, 
              il est impératif de vérifier l'adéquation du produit avec le profil de risque et les objectifs 
              d'investissement de chaque investisseur. Les performances passées ne préjugent pas des performances futures.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


