"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function InvestissementLocatifPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                Investissement locatif : un levier puissant pour bâtir votre patrimoine
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                L'<strong>investissement locatif</strong> est la stratégie immobilière la plus répandue en France. Elle consiste à acquérir un bien immobilier – appartement, maison ou immeuble – dans le but de le louer, que ce soit en <strong>location nue</strong> (bail classique de 3 ans) ou en <strong>location meublée</strong> (plus flexible et fiscalement avantageuse).
              </p>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Ce type d'investissement attire de nombreux épargnants car il permet à la fois de <strong>percevoir des revenus complémentaires</strong>, de <strong>réduire sa fiscalité</strong> et de <strong>constituer un patrimoine transmissible</strong>.
              </p>
              
              <div className="flex justify-center lg:justify-start">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Calculer ma rentabilité
                </button>
              </div>
            </div>
            
            {/* Right Card */}
            <div className="w-full lg:w-[467px] bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 relative">
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-9 sm:h-9">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight">
                  Nos experts à votre service
                </h2>
              </div>
              
              <div className="absolute -top-16 -right-8 w-[51.3px] h-[51.3px] sm:w-[202px] sm:h-[202px] bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center text-white font-source-sans font-semibold text-xs sm:text-base lg:text-xl leading-tight px-1 sm:px-0">
                  <span className="hidden sm:block">Effet →<br /></span>
                  <span className="sm:hidden">x10</span>
                  <span className="hidden sm:block">de levier</span>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Revenus complémentaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Effet de levier du crédit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Patrimoine tangible et transmissible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Optimisation fiscale</span>
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
          
          {/* Pourquoi investir dans l'immobilier locatif */}
          <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Pourquoi investir dans l'immobilier locatif ?
            </h2>
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-4">1. Génération de revenus réguliers</h3>
                <p className="text-[#686868] text-sm font-inter">
                  L'un des premiers atouts de l'investissement locatif est la <strong>génération de revenus réguliers</strong>. Les loyers perçus peuvent financer une partie ou la totalité des mensualités de crédit, tout en offrant un revenu complémentaire à long terme.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-4">2. Effet de levier du crédit immobilier</h3>
                <p className="text-[#686868] text-sm font-inter">
                  De plus, grâce à l'<strong>effet de levier du crédit immobilier</strong>, vous investissez avec peu d'apport personnel : ce sont vos locataires, associés aux avantages fiscaux, qui remboursent une grande partie du prêt.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Exemple simple</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm">
                    Vous achetez un bien à <strong>200 000 €</strong> financé par un prêt de <strong>180 000 €</strong>. Avec un loyer de <strong>900 €/mois</strong> et une mensualité de crédit de <strong>1 000 €</strong>, votre effort d'épargne n'est que de <strong>100 €/mois</strong>. En contrepartie, vous construisez un patrimoine qui prendra de la valeur au fil des années.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-4">3. Stratégie de valorisation patrimoniale</h3>
                <p className="text-[#686868] text-sm font-inter">
                  Enfin, l'investissement locatif est une stratégie de <strong>valorisation patrimoniale</strong> : à mesure que le capital de votre emprunt diminue, la valeur de votre bien augmente, surtout si vous avez choisi un emplacement porteur.
                </p>
              </div>
            </div>
          </div>

          {/* Les avantages de l'investissement locatif */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Les avantages de l'investissement locatif
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-2">Revenus complémentaires</h3>
                <p className="text-[#686868] text-sm font-inter">Loyer mensuel qui constitue une source de revenus stable et prévisible</p>
              </div>
              
              <div className="text-center bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-2">Effet de levier du crédit</h3>
                <p className="text-[#686868] text-sm font-inter">Possibilité de se constituer un patrimoine important sans immobiliser trop de capital</p>
              </div>
              
              <div className="text-center bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-2">Patrimoine tangible</h3>
                <p className="text-[#686868] text-sm font-inter">L'immobilier reste un actif concret, sécurisant et transmissible à vos héritiers</p>
              </div>
              
              <div className="text-center bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6">
                <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-2">Optimisation fiscale</h3>
                <p className="text-[#686868] text-sm font-inter">Régime réel, déficit foncier, ou statut LMNP qui permet d'amortir la valeur du bien</p>
              </div>
            </div>
          </div>

          {/* Les inconvénients et risques */}
          <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Les inconvénients et risques à anticiper
            </h2>
            <div className="space-y-6">
              <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                Comme tout placement, l'investissement locatif présente aussi des contraintes :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">1</span>
                  </div>
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-4 text-center">Risque de vacance locative</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Si le bien est mal situé ou si le marché est saturé.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">2</span>
                  </div>
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-4 text-center">Gestion chronophage</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Rechercher des locataires, gérer les entrées et sorties, suivre les réparations ou les impayés peut vite devenir une seconde activité.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">3</span>
                  </div>
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-4 text-center">Impayés de loyers</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Qui impactent la trésorerie si vous n'avez pas souscrit une assurance loyers impayés (GLI).
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">4</span>
                  </div>
                  <h3 className="text-[#B99066] font-cairo font-semibold text-lg mb-4 text-center">Rentabilité très variable</h3>
                  <p className="text-[#686868] text-sm font-inter">
                    Selon l'emplacement : investir dans un studio étudiant à Lyon n'a pas le même rendement qu'une maison familiale en zone rurale.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Exemple concret */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Exemple concret
            </h2>
            <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">
                Un appartement acheté 180 000 € loué 800 €/mois, avec une mensualité de crédit de 950 €/mois
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Loyer mensuel</h4>
                  <p className="text-lg font-bold">800 €</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Mensualité crédit</h4>
                  <p className="text-lg font-bold">950 €</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2">Effort d'épargne</h4>
                  <p className="text-lg font-bold">150 €/mois</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">Résultat après 20 ans</h4>
                <p className="text-sm">
                  Le bien est totalement remboursé et valorisé à <strong>220 000 €</strong> : vous avez créé un patrimoine net, tout en investissant peu chaque mois.
                </p>
              </div>
            </div>
          </div>

          {/* Conseil Azalée Patrimoine */}
          <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 text-white">
              <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
                Conseil Azalée Patrimoine
              </h2>
            <div className="space-y-6">
              <p className="text-lg text-center">
                Chez <strong>Azalée Patrimoine</strong>, nous savons que la réussite d'un investissement locatif dépend à <strong>80 % de l'emplacement et du type de logement</strong>.
              </p>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <p className="text-sm text-center mb-4">
                  Un bien mal choisi peut rapidement devenir une source de stress et de perte financière : vacance locative, loyers trop bas, travaux mal anticipés…
                </p>
              </div>
              
              <p className="text-lg text-center">
                Notre rôle est de vous aider à :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#253F60] text-xl">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Sélectionner le bon bien</h3>
                  <p className="text-sm">(ville, quartier, typologie)</p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#253F60] text-xl">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Optimiser le financement</h3>
                  <p className="text-sm">Pour maximiser l'effet de levier du crédit</p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#253F60] text-xl">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Réduire la fiscalité</h3>
                  <p className="text-sm">Grâce aux dispositifs adaptés (LMNP, déficit foncier, Pinel)</p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#253F60] text-xl">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Anticiper la gestion</h3>
                  <p className="text-sm">Pour éviter que cet investissement ne devienne une charge mentale</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-sm">
                  L'investissement locatif peut être une formidable machine à créer de la richesse, à condition d'être bien accompagné.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-8 sm:p-10 lg:p-12 text-center">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6">
              Prêt à vous lancer dans l'investissement locatif ?
            </h2>
            <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-2xl mx-auto">
              Nos experts Azalée Patrimoine vous accompagnent pour construire une stratégie locative adaptée à votre profil, vos objectifs et votre fiscalité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-white text-[#253F60] px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Calculer ma rentabilité
              </button>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-white hover:text-[#253F60] transition-colors duration-200"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}