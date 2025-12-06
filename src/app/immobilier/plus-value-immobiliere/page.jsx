"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function PlusValueImmobilierePage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#112033] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                Plus-value immobilière : comprendre la fiscalité et optimiser sa revente
              </h1>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Lorsqu'un particulier revend un bien immobilier, il réalise souvent une <strong>plus-value</strong> : c'est la différence entre le prix de vente et le prix d'acquisition (majoré des frais et des travaux). En France, cette plus-value est soumise à une fiscalité spécifique, avec des <strong>abattements pour durée de détention</strong> qui allègent progressivement l'impôt.
              </p>
              
              <p className="text-[#686868] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-6 sm:mb-8 text-center lg:text-left">
                Connaître les règles de la plus-value immobilière est essentiel pour <strong>anticiper la fiscalité de vos ventes</strong>, choisir le bon moment pour céder un bien et intégrer la revente dans une stratégie patrimoniale globale.
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
                  <span className="hidden sm:block">36.2% →<br /></span>
                  <span className="sm:hidden">36.2%</span>
                  <span className="hidden sm:block">Fiscalité totale</span>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12">
                <ul className="space-y-2 sm:space-y-3 text-white text-xs sm:text-sm font-source-sans font-semibold leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>IR : 19% + PS : 17,2%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Abattements durée détention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">✓</span>
                    <span>Exonération après 22-30 ans</span>
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
          
          {/* Les règles générales */}
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
              <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
                Les règles générales de la plus-value immobilière
              </h2>
            <div className="space-y-6">
              <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                En cas de revente d'un logement (hors résidence principale), la plus-value est imposée à deux niveaux :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#253F60] rounded-lg p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">19%</span>
                  </div>
                  <h3 className="text-white font-cairo font-semibold text-lg mb-2">Impôt sur le revenu (IR)</h3>
                  <p className="text-white text-sm font-inter">Taux de base</p>
                </div>
                <div className="bg-[#253F60] rounded-lg p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">17,2%</span>
                  </div>
                  <h3 className="text-white font-cairo font-semibold text-lg mb-2">Prélèvements sociaux (PS)</h3>
                  <p className="text-white text-sm font-inter">Taux de base</p>
                </div>
              </div>
              <div className="bg-[#253F60] rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-semibold mb-4">Soit une fiscalité totale de 36,2%</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Exemple simple :</strong> un appartement acheté 150 000 € en 2000 et revendu 250 000 € en 2025. La plus-value brute est de 100 000 €. Sans abattement, l'impôt serait de 19 000 € et les prélèvements sociaux de 17 200 €, soit <strong>36 200 €</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Les abattements pour durée de détention */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Les abattements pour durée de détention
            </h2>
            <div className="space-y-6">
              <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                La fiscalité diminue à mesure que vous conservez le bien :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#253F60] rounded-lg p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Exonération totale d'impôt (19%)</h3>
                  <p className="text-lg font-bold">Après 22 ans de détention</p>
                </div>
                <div className="bg-[#253F60] rounded-lg p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Exonération totale de prélèvements sociaux (17,2%)</h3>
                  <p className="text-lg font-bold">Après 30 ans de détention</p>
                </div>
              </div>
              <div className="bg-[#253F60] rounded-lg p-6 text-white text-center">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Exemple :</strong> un appartement acheté 150 000 € et revendu 250 000 € après 25 ans. La plus-value de 100 000 € est totalement exonérée d'impôt, et les prélèvements sociaux sont réduits grâce aux abattements. Résultat : l'investisseur ne paie aucun impôt sur sa revente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Les exceptions et cas particuliers */}
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Les exceptions et cas particuliers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#253F60] rounded-lg p-6 shadow-md">
                <h3 className="text-white font-cairo font-semibold text-lg mb-4">Résidence principale</h3>
                <p className="text-white text-sm font-inter">Exonération totale, quelle que soit la durée de détention.</p>
              </div>
              <div className="bg-[#253F60] rounded-lg p-6 shadow-md">
                <h3 className="text-white font-cairo font-semibold text-lg mb-4">Montant inférieur à 15 000 €</h3>
                <p className="text-white text-sm font-inter">Exonération automatique (utile pour des garages ou petites dépendances).</p>
              </div>
              <div className="bg-[#253F60] rounded-lg p-6 shadow-md">
                <h3 className="text-white font-cairo font-semibold text-lg mb-4">Première cession résidence secondaire</h3>
                <p className="text-white text-sm font-inter">Exonération possible sous conditions (remploi du prix dans l'acquisition de la résidence principale).</p>
              </div>
              <div className="bg-[#253F60] rounded-lg p-6 shadow-md">
                <h3 className="text-white font-cairo font-semibold text-lg mb-4">Travaux et frais</h3>
                <p className="text-white text-sm font-inter">Certains peuvent être ajoutés au prix d'acquisition pour réduire la plus-value taxable (frais réels ou forfait de 15% après 5 ans de détention).</p>
              </div>
            </div>
          </div>

          {/* Avantages et inconvénients */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 sm:mb-12">
            {/* Avantages */}
            <div className="bg-gradient-to-r from-[#FFEFD5] to-[#D7E8FF] rounded-lg p-6 sm:p-8 lg:p-10">
              <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
                ✅ Avantages de la fiscalité sur la plus-value
              </h2>
              <ul className="space-y-4 text-[#686868] font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-[#59E2E4] mt-1">✓</span>
                  <span><strong>Incitation à conserver ses biens</strong> : plus la durée de détention est longue, plus l'imposition baisse.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#59E2E4] mt-1">✓</span>
                  <span><strong>Exonérations attractives</strong> après 22 ou 30 ans.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#59E2E4] mt-1">✓</span>
                  <span>Possibilité d'optimiser le calcul en intégrant des <strong>frais de travaux</strong>.</span>
                </li>
              </ul>
            </div>

            {/* Inconvénients */}
            <div className="bg-gradient-to-r from-[#FFF4E6] to-[#FFE5E5] rounded-lg p-6 sm:p-8 lg:p-10">
              <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
                ⚠️ Inconvénients et contraintes
              </h2>
              <ul className="space-y-4 text-[#686868] font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1">⚠</span>
                  <span>Fiscalité lourde en cas de <strong>revente rapide</strong> : 36,2% sans abattement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1">⚠</span>
                  <span>Les prélèvements sociaux restent dus jusqu'à 30 ans de détention.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1">⚠</span>
                  <span>Gestion administrative parfois complexe pour justifier les frais et travaux.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Exemple concret */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Exemple concret
            </h2>
            <div className="bg-[#253F60] rounded-lg p-6 sm:p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">
                Un investisseur achète un appartement en 2005 pour 200 000 €, avec 15 000 € de travaux. En 2025, il revend le bien 320 000 €.
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#B99066] rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2 text-white">Prix d'acquisition corrigé</h4>
                  <p className="text-lg font-bold text-white">215 000 €</p>
                </div>
                <div className="bg-[#B99066] rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2 text-white">Prix de vente</h4>
                  <p className="text-lg font-bold text-white">320 000 €</p>
                </div>
                <div className="bg-[#B99066] rounded-lg p-4 text-center">
                  <h4 className="font-semibold mb-2 text-white">Plus-value brute</h4>
                  <p className="text-lg font-bold text-white">105 000 €</p>
                </div>
              </div>
              
              <div className="mt-6 bg-[#B99066] rounded-lg p-4 text-center">
                <p className="text-sm text-white">
                  Après 20 ans, il bénéficie d'abattements importants, réduisant l'impôt dû à moins de 10 000 €.
                </p>
              </div>
            </div>
          </div>

          {/* Conseil Azalée Patrimoine */}
          <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <h2 className="text-[#112033] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">
              Conseil Azalée Patrimoine
            </h2>
            <div className="space-y-6">
              <p className="text-[#686868] text-lg">
                La fiscalité des plus-values immobilières peut représenter un <strong>coût important</strong> si la revente est mal anticipée. Le choix du moment de vente (après 22 ans ou 30 ans), la prise en compte des travaux et l'utilisation des exonérations spécifiques sont des leviers puissants pour réduire ou annuler l'impôt.
              </p>
              
              <p className="text-[#686868] text-lg">
                Chez <strong>Azalée Patrimoine</strong>, nous aidons nos clients à :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#B99066] rounded-lg p-4 text-center">
                  <h3 className="font-semibold mb-2 text-white">Simuler la fiscalité</h3>
                  <p className="text-sm text-white">De leur revente avant de prendre une décision</p>
                </div>
                <div className="bg-[#B99066] rounded-lg p-4 text-center">
                  <h3 className="font-semibold mb-2 text-white">Identifier les stratégies</h3>
                  <p className="text-sm text-white">D'optimisation (report d'une vente, travaux, changement de résidence principale)</p>
                </div>
                <div className="bg-[#B99066] rounded-lg p-4 text-center">
                  <h3 className="font-semibold mb-2 text-white">Réinvestir intelligemment</h3>
                  <p className="text-sm text-white">Le capital issu de la cession dans des solutions patrimoniales adaptées</p>
                </div>
              </div>
              
              <div className="bg-[#B99066] rounded-lg p-4 text-center">
                <p className="text-sm text-white">
                  Bien gérer la fiscalité de vos plus-values, c'est <strong>garder davantage de capital pour financer vos projets futurs</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-8 sm:p-10 lg:p-12 text-center">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6">
              Prêt à optimiser votre plus-value immobilière ?
            </h2>
            <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-2xl mx-auto">
              Nos experts Azalée Patrimoine vous accompagnent pour évaluer la fiscalité de votre prochaine revente et découvrir comment optimiser vos plus-values immobilières.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#A67C52] transition-colors duration-200">
                Calculer ma plus-value
              </button>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#A67C52] transition-colors duration-200"
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