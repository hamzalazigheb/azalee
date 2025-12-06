"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function ScellierPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                Les dispositifs fiscaux : Pinel, Scellier, Robien
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Depuis près de 20 ans, l'État a mis en place plusieurs <strong>dispositifs fiscaux immobiliers</strong> pour encourager la construction de logements et stimuler l'investissement locatif. Ces mécanismes, parmi lesquels figurent la <strong>loi Pinel</strong>, le <strong>Scellier</strong> et le <strong>Robien</strong>, ont permis à des milliers d'investisseurs de réduire leurs impôts tout en se constituant un patrimoine immobilier.
              </p>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Ces lois répondent à un double objectif : soutenir la construction de logements dans des zones à forte demande et permettre aux particuliers d'accéder à des <strong>avantages fiscaux attractifs</strong> en échange d'un engagement de location.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
            
            {/* Right Card */}
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  Nos experts à votre service
                </h2>
              </div>
              
              <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                  <span className="hidden sm:block">21% →<br /></span>
                  <span className="sm:hidden">21%</span>
                  <span className="hidden sm:block">Réduction d'impôt</span>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Réduction d'impôt jusqu'à 21%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Constitution de patrimoine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Revenus locatifs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Accompagnement revente</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* La loi Pinel */}
          <div className="bg-[#253F60] rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              La loi Pinel : défiscaliser tout en investissant
            </h2>
            <div className="space-y-6">
              <p className="text-white text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                La <strong>loi Pinel</strong>, encore en vigueur jusqu'en 2024 sous conditions, offre une réduction d'impôt proportionnelle à la durée d'engagement locatif :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">12%</span>
                  </div>
                  <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-2">6 ans</h3>
                  <p className="text-[#686868] text-sm font-inter">12% du prix du bien</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">18%</span>
                  </div>
                  <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-2">9 ans</h3>
                  <p className="text-[#686868] text-sm font-inter">18% du prix du bien</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">21%</span>
                  </div>
                  <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-2">12 ans</h3>
                  <p className="text-[#686868] text-sm font-inter">21% du prix du bien</p>
                </div>
              </div>
              
              <div className="bg-[#B99066] rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Exemple</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm">
                    Un couple investit <strong>250 000 €</strong> dans un T2 à Toulouse. Ils économisent <strong>52 500 €</strong> d'impôts en 9 ans, tout en percevant un loyer mensuel de <strong>650 €</strong>.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-4">Avantages</h3>
                  <ul className="text-[#686868] text-sm font-inter space-y-2">
                    <li>• Réduction d'impôt significative (jusqu'à 63 000 €)</li>
                    <li>• Constitution d'un patrimoine neuf, attractif pour les locataires</li>
                    <li>• Transmission facilitée (bien tangible, transmissible)</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-4">Inconvénients</h3>
                  <ul className="text-[#686868] text-sm font-inter space-y-2">
                    <li>• Plafonds de loyers et de ressources qui limitent la rentabilité</li>
                    <li>• Dispositif limité géographiquement aux zones tendues</li>
                    <li>• Fin programmée du Pinel, remplacé progressivement par le Pinel+ avec des critères plus exigeants</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Les anciens dispositifs */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Les anciens dispositifs : Scellier et Robien
            </h2>
            <div className="space-y-6">
              <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                Avant la loi Pinel, d'autres mécanismes existaient comme le <strong>Robien</strong> (2003-2009) et le <strong>Scellier</strong> (2009-2012).
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6">
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-4 text-center">Dispositif Robien (2003-2009)</h3>
                  <p className="text-[#686868] text-sm font-inter text-center">
                    Le dispositif Robien permettait d'<strong>amortir une partie du prix d'achat</strong> du logement.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-4 text-center">Dispositif Scellier (2009-2012)</h3>
                  <p className="text-[#686868] text-sm font-inter text-center">
                    Le dispositif Scellier offrait une <strong>réduction d'impôt de 25%</strong> sur 9 ans.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#253F60] rounded-lg p-6 text-white text-center">
                <p className="text-sm">
                  Ces régimes ne sont plus accessibles pour de nouveaux investissements, mais les biens acquis à l'époque restent soumis aux règles fiscales d'origine tant que la durée d'engagement n'est pas écoulée.
                </p>
              </div>
            </div>
          </div>

          {/* Pourquoi vendre après la période d'engagement */}
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Pourquoi vendre après la période d'engagement fiscal ?
            </h2>
            <div className="space-y-6">
              <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                Une fois la période d'avantage fiscal terminée (6, 9 ou 12 ans), beaucoup de propriétaires s'interrogent : faut-il conserver ou vendre le bien ?
              </p>
              
              <h3 className="text-[#112033] font-cairo font-semibold text-lg mb-4">Raisons fréquentes de vendre :</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3 text-center">Fin des avantages fiscaux</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Une fois la réduction d'impôt éteinte, le rendement net devient souvent moins intéressant.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-3 text-center">Changer de vie</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Divorce, retraite, mobilité professionnelle… vendre permet de réorganiser son patrimoine.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3 text-center">Financer un nouveau projet</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Réinvestir dans un bien plus rentable, diversifier via des placements financiers (SCPI, assurance vie, produits structurés).
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-3 text-center">Optimiser la fiscalité</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Si le bien a pris de la valeur, la revente peut dégager une plus-value immobilière (avec abattements selon la durée de détention).
                  </p>
                </div>
              </div>
              
              <div className="bg-[#B99066] rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Exemple</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm">
                    Un investisseur a acheté un appartement en loi Scellier en 2010 pour <strong>180 000 €</strong>. Après 12 ans, il a bénéficié de <strong>45 000 €</strong> de réductions d'impôt et son bien vaut aujourd'hui <strong>230 000 €</strong>. Revendre lui permet de dégager une plus-value de <strong>50 000 €</strong> et de réinvestir dans un immeuble de rapport plus rentable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conseil Azalée Patrimoine */}
          <div className="bg-[#253F60] rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 text-white">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Conseil Azalée Patrimoine
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-center">
                Les dispositifs Pinel, Scellier et Robien ont permis à des milliers d'investisseurs de réduire leurs impôts et de bâtir un patrimoine immobilier. Mais une fois la période fiscale terminée, il est essentiel de <strong>réévaluer l'intérêt de conserver ou de vendre</strong> le bien.
              </p>
              
              <p className="text-lg text-center">
                Chez <strong>Azalée Patrimoine</strong>, nous analysons votre situation globale :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Garder le bien ?</h3>
                  <p className="text-sm">Pour des revenus complémentaires à la retraite</p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Ou le vendre ?</h3>
                  <p className="text-sm">Pour réallouer le capital vers des placements plus rentables et moins contraignants</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-sm">
                  Notre accompagnement vous aide à prendre la bonne décision en fonction de vos objectifs patrimoniaux, fiscaux et de vie.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-[#253F60] rounded-lg p-8 sm:p-10 lg:p-12 text-center">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6">
              Prêt à optimiser votre bien en dispositif fiscal ?
            </h2>
            <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-2xl mx-auto">
              Nos experts Azalée Patrimoine vous accompagnent pour analyser votre situation et décider de la meilleure stratégie : conserver ou vendre votre bien Pinel, Scellier ou Robien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#A67A5A] transition-colors duration-200"
              >
                Prendre rendez-vous
              </button>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-white hover:text-[#253F60] transition-colors duration-200"
              >
                Consulter un expert
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}