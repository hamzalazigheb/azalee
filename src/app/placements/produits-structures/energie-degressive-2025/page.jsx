"use client";
import React from "react";
import Header from "../../../../components/common/Header";
import Footer from "../../../../components/common/Footer";
import Link from "next/link";

export default function EnergieDegressive2025Page() {
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
              ÉNERGIE DÉGRESSIVE
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto">
              AVRIL 2025 - Exposition à l'énergie et à la transition énergétique
            </p>
            <div className="mt-8 inline-block bg-[#B99066] rounded-full px-8 py-4 shadow-xl">
              <span className="text-white font-bold text-2xl">9% PAR AN</span>
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
                  <p className="text-[#253F60] font-semibold text-lg">FR001400WTQ9</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Thématique</p>
                  <p className="text-[#253F60] font-semibold text-lg">Énergie & transition énergétique</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Émetteur</p>
                  <p className="text-[#253F60] font-semibold text-lg">BNP Paribas Issuance B.V.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Garant</p>
                  <p className="text-[#253F60] font-semibold text-lg">BNP Paribas S.A.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sous-jacent</p>
                  <p className="text-[#253F60] font-semibold text-lg">iEdge Global Energy Select Decrement 50 Points GTR®</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Durée maximale</p>
                  <p className="text-[#253F60] font-semibold text-lg">10 ans (échéance 2035)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Souscription</p>
                  <p className="text-[#253F60] font-semibold text-lg">Jusqu'au 30 avril 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Éligibilité</p>
                  <p className="text-[#253F60] font-semibold text-lg">Assurance-vie, PER, Compte-titres</p>
                </div>
              </div>
            </div>
          </div>

          {/* Objectif de rendement */}
          <div className="mb-12">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
              Objectif de rendement
            </h2>
            <div className="bg-white rounded-xl shadow-lg border-2 border-[#B99066] p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-br from-[#B99066] to-[#D4A574] rounded-full px-8 py-4 mb-4">
                  <span className="text-white font-bold text-3xl">9% PAR AN</span>
                </div>
                <p className="text-[#4B5563] text-lg">
                  Rendement annuel conditionnel
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-[#253F60] font-semibold mb-2">Mécanisme :</p>
                <p className="text-[#4B5563]">
                  Le rendement de 9 % par an est versé si l'indice reste au-dessus de 50 % de son niveau initial. 
                  Le coupon est versé annuellement si la condition est respectée.
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
                <h3 className="text-[#253F60] font-bold text-lg mb-4">Protection du capital</h3>
                <p className="text-[#4B5563] mb-4">
                  Protection du capital jusqu'à 50 % de baisse du sous-jacent
                </p>
                <p className="text-[#253F60] font-semibold">
                  Le capital est protégé tant que l'indice ne baisse pas de plus de 50 %.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-xl p-6 border-l-4 border-[#B99066]">
                <h3 className="text-[#253F60] font-bold text-lg mb-4">Coupon annuel conditionnel</h3>
                <p className="text-[#4B5563] mb-4">
                  Paiement du coupon annuel si l'indice ≥ 50 % du niveau initial
                </p>
                <p className="text-[#253F60] font-semibold mb-2">Risque :</p>
                <ul className="list-disc list-inside text-[#4B5563] space-y-1">
                  <li>Risque de perte en capital si indice &lt; 60 % à l'échéance</li>
                  <li>Pas de coupon si l'indice baisse en dessous de 50 %</li>
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
                  <span className="text-green-500">✓</span> Thématique énergétique et transition bas carbone
                </h3>
                <p className="text-[#4B5563]">
                  Exposition au secteur de l'énergie et à la transition énergétique, un secteur clé 
                  de l'économie mondiale et de la lutte contre le changement climatique.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-[#253F60] font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Protection du capital élevée
                </h3>
                <p className="text-[#4B5563]">
                  Protection du capital jusqu'à 50 % de baisse du sous-jacent, offrant une sécurité 
                  importante pour votre investissement.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-[#253F60] font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Mécanisme clair et rendement attractif
                </h3>
                <p className="text-[#4B5563]">
                  Rendement de 9 % par an avec un mécanisme simple et transparent, adapté aux investisseurs 
                  recherchant une performance régulière.
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
                    Risque de perte en capital si l'indice &lt; 60 % à l'échéance. Le capital n'est pas garanti 
                    en cas de forte baisse du secteur énergétique.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-bold text-lg mb-2">⚠️ Risque lié au marché de l'énergie</h3>
                  <p className="text-[#4B5563]">
                    Volatilité sectorielle : le secteur de l'énergie peut être soumis à des fluctuations importantes 
                    liées aux prix des matières premières, aux politiques énergétiques et aux évolutions technologiques.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-bold text-lg mb-2">⚠️ Risque de non-paiement du coupon</h3>
                  <p className="text-[#4B5563]">
                    Si l'indice baisse en dessous de 50 % du niveau initial, le coupon annuel ne sera pas versé 
                    pour cette période.
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
                L'énergie et la transition énergétique sont au cœur des enjeux économiques et environnementaux mondiaux. 
                Ce produit structuré vous permet de participer à cette transformation tout en bénéficiant d'une protection 
                élevée du capital.
              </p>
              <p className="text-lg leading-relaxed">
                Avec un rendement de 9 % par an et une protection du capital jusqu'à 50 % de baisse, ce produit s'adresse 
                aux investisseurs souhaitant combiner performance et sécurité dans un secteur stratégique de l'économie mondiale.
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


