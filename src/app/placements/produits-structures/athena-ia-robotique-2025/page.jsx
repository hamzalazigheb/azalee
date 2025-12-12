"use client";
import React from "react";
import Header from "../../../../components/common/Header";
import Footer from "../../../../components/common/Footer";
import Link from "next/link";
import SectionHeader from "../../../../components/common/SectionHeader";

export default function AthenaIARobotique2025Page() {
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
              ATHENA DÉGRESSIF IA & ROBOTIQUE
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto">
              JUILLET 2025 - Exposition à l'intelligence artificielle et à la robotique mondiale
            </p>
            <div className="mt-8 inline-block bg-[#B99066] rounded-full px-8 py-4 shadow-xl">
              <span className="text-white font-bold text-2xl">+15% PAR AN</span>
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
                    <p className="text-white font-semibold text-lg">FR001400ZAJ8</p>
                  </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Thématique</p>
                    <p className="text-white font-semibold text-lg">Intelligence artificielle & robotique</p>
                  </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Émetteur</p>
                    <p className="text-white font-semibold text-lg">Natixis Structured Issuance SA</p>
                  </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Garant</p>
                    <p className="text-white font-semibold text-lg">Natixis (Notation A / A1 / A+)</p>
                  </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Sous-jacent</p>
                    <p className="text-white font-semibold text-lg">iEdge Global Artificial Intelligence & Robotics EW Decrement 50 Points GTR®</p>
                  </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Durée maximale</p>
                    <p className="text-white font-semibold text-lg">10 ans (échéance 2035)</p>
                  </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white/80 text-sm mb-2">Souscription</p>
                    <p className="text-white font-semibold text-lg">Jusqu'au 31 juillet 2025</p>
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
                  <span className="text-white font-bold text-3xl sm:text-4xl">+15% PAR AN</span>
                </div>
                <p className="text-white text-lg sm:text-xl font-medium">
                  +1,25 % par mois écoulé, soit jusqu'à +15 % par an
                </p>
              </div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20">
                <p className="text-white font-semibold mb-3 text-lg">Mécanisme :</p>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  Le rendement est calculé de manière dégressive : +1,25 % par mois écoulé depuis le lancement, 
                  avec un maximum de +15 % par an. Le rendement est versé à l'échéance ou lors d'un rappel anticipé.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl sm:text-2xl mb-6 relative z-10">Rappel anticipé</h3>
                <p className="text-white/90 mb-4 text-base sm:text-lg leading-relaxed relative z-10">
                  Rappel anticipé possible chaque mois à partir du 12ᵉ mois si l'indice ≥ barrière dégressive 
                  (100 % → 79,67 %)
                </p>
                <p className="text-white font-semibold text-base sm:text-lg relative z-10">
                  Le produit peut être remboursé avant l'échéance si les conditions sont remplies.
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl sm:text-2xl mb-6 relative z-10">À l'échéance</h3>
                <p className="text-white/90 mb-4 text-base sm:text-lg leading-relaxed relative z-10">
                  Remboursement +150 % du nominal si indice ≥ 79,48 %
                </p>
                <p className="text-white font-semibold mb-3 text-base sm:text-lg relative z-10">Protection du capital :</p>
                <ul className="space-y-2 relative z-10">
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <span className="text-white/90 text-base sm:text-lg">Capital protégé à 100 % si indice ≥ 50 %</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1 font-bold">•</span>
                    <span className="text-white/90 text-base sm:text-lg">Perte proportionnelle si indice &lt; 50 %</span>
                  </li>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-[#B99066] text-2xl">✓</span>
                  <span>Thématique premium internationale</span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  Exposition à un secteur en croissance mondiale : l'intelligence artificielle et la robotique, 
                  deux domaines porteurs de l'économie de demain.
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-[#253F60] text-2xl">✓</span>
                  <span>Barrière dégressive facilitant le rappel anticipé</span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  La barrière dégressive (de 100 % à 79,67 %) augmente les chances de rappel anticipé 
                  au fil du temps, permettant de verrouiller les gains plus rapidement.
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group md:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-[#B99066] text-2xl">✓</span>
                  <span>Potentiel de rendement élevé</span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  Jusqu'à +15 % par an, avec un mécanisme de rendement dégressif qui récompense 
                  la durée de détention.
                </p>
              </div>
              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group md:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/20 rounded-bl-full"></div>
                <h3 className="text-white font-bold text-xl mb-4 relative z-10 flex items-center gap-3">
                  <span className="text-[#253F60] text-2xl">✓</span>
                  <span>Diversification sectorielle</span>
                </h3>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed relative z-10">
                  Mécanisme identique au produit Luxe pour une diversification sectorielle optimale 
                  dans votre portefeuille.
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
                    Perte partielle ou totale possible si l'indice baisse de plus de 50 % à l'échéance. 
                    Le capital n'est pas garanti en cas de forte baisse du sous-jacent.
                  
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h3 className="text-[#253F60] font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                    <span className="text-amber-600 text-xl">⚠️</span>
                    <span>Risque de solvabilité de l'émetteur</span>
                  </h3>
                  <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                    En cas de défaillance de Natixis (émetteur), le remboursement du capital et des intérêts 
                    pourrait être compromis. Natixis bénéficie d'une notation A / A1 / A+.
                  
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
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200">
                  <h3 className="text-[#253F60] font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                    <span className="text-amber-600 text-xl">⚠️</span>
                    <span>Volatilité accrue des marchés technologiques</span>
                  </h3>
                  <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                    Le secteur de l'IA et de la robotique peut être plus volatil que d'autres secteurs, 
                    ce qui peut impacter la performance du produit.
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
                  L'intelligence artificielle et la robotique sont deux secteurs clés de la transformation 
                  économique mondiale. Ce produit structuré vous permet de participer à cette croissance 
                  tout en bénéficiant d'une protection partielle du capital.
                </p>
                <p className="text-lg sm:text-xl leading-relaxed">
                  Avec un rendement potentiel de +15 % par an et une barrière dégressive qui facilite 
                  le rappel anticipé, ce produit s'adresse aux investisseurs souhaitant diversifier leur 
                  portefeuille vers les technologies de demain, avec un niveau de risque maîtrisé.
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
                    Prendre rendez-vous avec un conseiller
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


