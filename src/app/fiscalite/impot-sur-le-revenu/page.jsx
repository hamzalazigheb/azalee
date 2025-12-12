"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function Page() {
  const [content, setContent] = useState({});

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Impôt sur le revenu",
      description: "L'impôt sur le revenu (IR) est l'un des piliers du système fiscal français. Depuis 2019, il est prélevé à la source, ce qui permet une collecte immédiate et continue. Il s'applique aux revenus d'activité, fonciers, financiers et exceptionnels.",
      button1Text: "Accéder au simulateur",
      button1Link: "#simulateur",
      button2Text: "Voir le sommaire",
      button2Link: "#sommaire"
    },
    stats: {
      stats: [
        {
          subtitle: "Depuis 2019",
          title: "Prélèvement à la source",
          description: "Collecte immédiate et continue"
        },
        {
          subtitle: "Optimisation",
          title: "Dispositifs fiscaux",
          description: "PER, Pinel, Girardin, déficit foncier"
        },
        {
          subtitle: "Stratégie",
          title: "Patrimoine",
          description: "Maîtrise de l'IR essentielle"
        }
      ]
    },
    sommaire: {
      title: "Sommaire",
      items: [
        "1. Qu'est-ce que l'impôt sur le revenu ?",
        "2. Calcul de l'impôt sur le revenu",
        "3. Quotient familial et parts",
        "4. Prélèvement à la source",
        "5. Optimisation fiscale",
        "6. Déclaration et paiement"
      ]
    },
    content: {
      sections: [
        {
          title: "Qu'est-ce que l'impôt sur le revenu ?",
          content: "L'impôt sur le revenu est un impôt direct qui frappe le revenu net des personnes physiques. Il s'applique aux revenus de source française et étrangère des personnes domiciliées en France."
        },
        {
          title: "Calcul de l'impôt sur le revenu",
          content: "Le calcul de l'IR se fait selon un barème progressif par tranches. Le taux d'imposition varie de 0% à 45% selon le niveau de revenus."
        }
      ]
    },
    cta: {
      title: "Besoin d'aide pour optimiser votre fiscalité ?",
      description: "Nos experts en fiscalité vous accompagnent pour réduire votre impôt sur le revenu et optimiser votre situation fiscale.",
      buttonText: "Demander une consultation gratuite"
    }
  };

  useEffect(() => {
    // Set static content
    setContent(defaultContent);
  }, []);

  return (
    <>
      <Header />


       {/* Hero Section */}
       <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24 overflow-hidden">
         <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
           {/* Main content */}
           <div className="text-center mb-12">
             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
               Impôt sur le revenu
             </h1>
             <p className="text-lg sm:text-xl text-white max-w-4xl mx-auto leading-relaxed mb-8">
               L'impôt sur le revenu (IR) est l'un des piliers du système fiscal français. Depuis 2019, il est prélevé à la source, ce qui permet une collecte immédiate et continue. Il s'applique aux revenus d'activité, fonciers, financiers et exceptionnels.
             </p>
             
             {/* Action buttons */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a href="/outils/calculatrice-impots" className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A67C52] transition-colors duration-200">
                 Accéder au simulateur
               </a>
               <a href="/fiscalite/declaration-impots" className="bg-white text-[#B99066] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
                 Voir le sommaire
               </a>
             </div>
           </div>

           {/* Feature cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="relative bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/10 rounded-bl-full"></div>
               <p className="text-[#686868] text-sm uppercase mb-2 font-semibold">DEPUIS 2019</p>
               <h3 className="text-[#253F60] text-xl font-semibold mb-2">Prélèvement à la source</h3>
               <p className="text-[#686868] text-sm">Collecte immédiate et continue</p>
             </div>
             
             <div className="relative bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#B99066]/10 rounded-bl-full"></div>
               <p className="text-[#686868] text-sm uppercase mb-2 font-semibold">OPTIMISATION</p>
               <h3 className="text-[#253F60] text-xl font-semibold mb-2">Dispositifs fiscaux</h3>
               <p className="text-[#686868] text-sm">PER, Pinel, Girardin, déficit foncier</p>
             </div>
             
             <div className="relative bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#253F60]/10 rounded-bl-full"></div>
               <p className="text-[#686868] text-sm uppercase mb-2 font-semibold">STRATÉGIE</p>
               <h3 className="text-[#253F60] text-xl font-semibold mb-2">Patrimoine</h3>
               <p className="text-[#686868] text-sm">Maîtrise de l'IR essentielle</p>
             </div>
           </div>
         </div>
       </section>

      {/* Bouton Guide Défiscalisation */}
      <section className="w-full py-6 sm:py-8 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a 
            href="/outils-financiers/guide-defiscalisation"
            className="inline-block bg-gradient-to-r from-[#253F60] to-[#B99066] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Je comprends les dispositifs et j'optimise mon imposition
          </a>
        </div>
      </section>

      {/* Section Les 10 meilleurs dispositifs */}
      <section className="w-full py-8 sm:py-10 lg:py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Les 10 meilleurs dispositifs de réduction d'impôts"
            subtitle="Après avoir compris le fonctionnement et le calcul de l'impôt sur le revenu, il est essentiel d'identifier les leviers à votre disposition pour réduire votre fiscalité."
          />
          <div className="mb-8">
            <div className="text-left">
              <a 
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#B99066] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#A67C52] transition-colors duration-200 border border-[#A67C52]"
              >
                Je fais analyser ma situation personnelle
              </a>
            </div>
          </div>

          {/* 10 blocs dispositifs fiscaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
            {/* Bloc 1: Loi Pinel */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#253F60] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l2.293 2.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Loi Pinel</h3>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                <a href="/fiscalite/loi-pinel" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">La loi Pinel</a> permet d'investir dans l'immobilier locatif neuf ou réhabilité et d'obtenir une réduction d'impôt proportionnelle à la durée d'engagement locatif (6, 9 ou 12 ans). L'avantage fiscal est conditionné par le respect de plafonds de loyers et de ressources des locataires.
              </p>
            </div>

            {/* Bloc 2: Déficit foncier */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Déficit foncier</h3>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Le <a href="/fiscalite/reductions-impot-deficit-foncier" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">déficit foncier</a> résulte des charges déductibles liées à des travaux d'entretien, de réparation ou de rénovation sur un bien locatif. Il permet de réduire vos revenus fonciers imposables, voire votre revenu global dans certaines limites, offrant ainsi un levier efficace pour diminuer votre impôt sur le revenu.
              </p>
            </div>

            {/* Bloc 3: LMNP */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#253F60] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l2.293 2.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Loueur en Meublé Non Professionnel</h3>
                <p className="text-[#686868] text-xs mt-1">(LMNP)</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Le statut <a href="/immobilier/lmnp" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">LMNP</a> vous permet de louer un logement meublé tout en bénéficiant d'un régime fiscal attractif. Grâce à l'amortissement du bien et du mobilier, vos loyers imposables sont largement réduits. C'est une solution appréciée pour générer des revenus complémentaires faiblement fiscalisés.
              </p>
            </div>

            {/* Bloc 4: LMP */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Loueur en Meublé Professionnel</h3>
                <p className="text-[#686868] text-xs mt-1">(LMP)</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Le statut <a href="/immobilier/lmnp" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">LMP</a> s'adresse aux investisseurs dont les revenus locatifs dépassent la moitié des revenus du foyer. Il ouvre droit à des avantages fiscaux majeurs : exonération des plus-values après un délai de détention et imputation illimitée des déficits sur le revenu global du contribuable.
              </p>
            </div>

            {/* Bloc 5: PER */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#253F60] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 6a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H8z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Plan d'Épargne Retraite</h3>
                <p className="text-[#686868] text-xs mt-1">(PER)</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Le <a href="/retraite/plan-retraite" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">PER</a> est un outil d'épargne à long terme qui permet de préparer sa retraite tout en réduisant immédiatement son impôt sur le revenu. Les versements volontaires sont déductibles, dans certaines limites, et le capital accumulé bénéficie d'un cadre fiscal avantageux au moment de la sortie.
              </p>
            </div>

            {/* Bloc 6: Loi Girardin */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Loi Girardin</h3>
                <p className="text-[#686868] text-xs mt-1">Industriel et Logement Social</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Le dispositif <a href="/fiscalite/loi-girardin" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">Girardin</a> s'adresse aux contribuables métropolitains investissant dans des projets productifs ou immobiliers outre-mer. Il offre une réduction d'impôt immédiate et importante, souvent supérieure au montant investi. Ce mécanisme, très encadré, permet de soutenir le développement économique des territoires ultramarins.
              </p>
            </div>

            {/* Bloc 7: FIP et FCPI */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#253F60] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">FIP et FCPI</h3>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Les <a href="/placements/scpi-opci" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">FIP</a> et <a href="/placements/scpi-opci" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">FCPI</a> permettent d'investir dans des PME françaises. En contrepartie du risque pris, vous bénéficiez d'une réduction d'impôt sur le revenu et d'un potentiel gain à long terme.
              </p>
            </div>

            {/* Bloc 8: Sofica */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Sofica</h3>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Les <a href="/placements/scpi-opci" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">Sofica</a> permettent de soutenir la création culturelle française. En échange de votre investissement, vous bénéficiez d'une réduction d'impôt attractive, pouvant aller jusqu'à 48 % selon les cas. Un dispositif fiscal réservé aux contribuables investis.
              </p>
            </div>

            {/* Bloc 9: Monuments Historiques */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#253F60] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Monuments Historiques</h3>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Le régime <a href="/fiscalite/monument-historique" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">Monuments Historiques</a> encourage la restauration et la préservation de biens classés. Les travaux réalisés sont déductibles du revenu global, sans plafonnement. C'est l'un des rares dispositifs permettant de défiscaliser fortement tout en contribuant directement à la sauvegarde du patrimoine architectural français.
              </p>
            </div>

            {/* Bloc 10: Dons aux associations */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-l-4 border-[#B99066] transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#253F60] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-[#B99066] font-bold text-lg uppercase">Dons aux associations</h3>
                <p className="text-[#686868] text-xs mt-1">et fondations</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">
                Les <a href="/patrimoine/conseils" className="text-[#005C69] underline font-semibold hover:text-[#004A5A]">dons aux associations</a> reconnues d'utilité publique ouvrent droit à une réduction d'impôt significative : 66 % des sommes versées (75 % pour certains organismes d'aide). Ce dispositif accessible à tous permet de soutenir des causes d'intérêt général tout en optimisant sa fiscalité personnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="w-full py-8 sm:py-10 lg:py-16 bg-white">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Question 1 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3">
                    Puis-je cumuler plusieurs dispositifs fiscaux la même année ?
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Oui, mais l'ensemble des avantages obtenus est plafonné à 10 000 € (ou 18 000 € selon les cas). Au-delà, les réductions ou crédits d'impôt excédentaires sont perdus.
                  </p>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3">
                    Le PER est-il concerné par le plafonnement des niches fiscales à 10 000 € ?
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Non. Le PER relève d'un plafond spécifique : 10 % des revenus imposables de l'année précédente (ou 10 % du PASS). Il n'entre pas dans le plafond global de 10 000 €.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Question 3 - Full width */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[#253F60] font-cairo font-semibold text-lg mb-3">
                  Comment savoir quel dispositif utiliser en priorité ?
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">
                  Tout dépend de votre situation fiscale et de vos objectifs patrimoniaux. Par exemple, un contribuable fortement imposé peut privilégier le PER pour réduire directement son revenu imposable, tandis qu'un investisseur immobilier pourra utiliser un dispositif comme Pinel ou le déficit foncier.
                </p>
              </div>
            </div>
          </div>

          {/* Section Azalée Patrimoine */}
          <div className="text-center">
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Chez Azalée Patrimoine, nous réalisons des simulations personnalisées pour optimiser l'utilisation de vos niches fiscales et hiérarchiser les dispositifs les plus pertinents selon vos revenus et vos objectifs.
            </p>
            <div className="flex justify-center">
              <a 
                href="https://calendly.com/azalee-patrimoine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white border-2 border-[#253F60] text-[#253F60] px-6 py-3 rounded-lg font-semibold hover:bg-[#253F60] hover:text-white transition-colors duration-200"
              >
                SIMULATION PERSONNALISÉE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Article - Optimisation fiscale après 50 ans */}
      <section className="w-full py-8 sm:py-10 lg:py-16 bg-gray-50">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-6">
              Comment alléger votre imposition sans prendre de risque : les bonnes pratiques fiscales à connaître après 50 ans
            </h2>

            {/* 1. Faites le point sur les abattements et déductions */}
            <div className="mb-8">
              <h3 className="text-xl font-cairo font-semibold text-[#253F60] mb-4">1. Faites le point sur les abattements et déductions en 2025</h3>
              
              <div className="ml-4 space-y-6">
                <div>
                  <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-3">a. Profitez de l'abattement de 10% sur vos pensions de retraite</h4>
                  <p className="text-[#374151] text-sm leading-relaxed mb-3">
                    En 2025, les retraités bénéficient encore d'un abattement automatique de 10 % sur leurs pensions (base, complémentaire, invalidité), dans la limite de 4 321 € par foyer fiscal. Cet abattement, destiné à compenser l'absence de frais professionnels, allège votre base imposable et reste cumulable avec d'autres dispositifs (comme les abattements pour plus de 65 ans ou invalidité).
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
                    <p className="text-[#374151] text-sm">
                      <strong>Attention :</strong> cette disposition est amenée à évoluer. Dès l'imposition sur les revenus 2025, la réforme annoncée prévoit la suppression de l'abattement proportionnel au profit d'un abattement forfaitaire unique de 2 000 € par foyer. L'impact : les retraités aux pensions modestes seront peu affectés, mais les retraités aisés verront leur avantage fortement diminuer.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-3">b. Vérifiez votre droit à l'abattement supplémentaire "plus de 65 ans"</h4>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Si vous avez plus de 65 ans au 31 décembre de l'année d'imposition, un abattement supplémentaire de 2 796 € (ou 1 398 € selon vos ressources) peut s'appliquer à votre revenu global, dans la limite de certains plafonds.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Optez pour les bonnes stratégies défiscalisantes */}
            <div className="mb-8">
              <h3 className="text-xl font-cairo font-semibold text-[#253F60] mb-4">2. Optez pour les bonnes stratégies défiscalisantes</h3>
              
              <div className="ml-4 space-y-6">
                <div>
                  <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-3">a. Anticipez la suppression de l'abattement de 10%</h4>
                  <p className="text-[#374151] text-sm leading-relaxed mb-3">
                    Commencez dès cette année à compenser cette perte fiscale à venir :
                  </p>
                  <ul className="list-disc ml-6 space-y-2 text-[#374151] text-sm">
                    <li>Revoyez vos options sur la déclaration de frais réels ou forfaitaires (en particulier si vous percevez encore des revenus d'activité ou de locations).</li>
                    <li>Étudiez les solutions pour diminuer votre base imposable : versements sur un Plan d'Épargne Retraite (PER), dons aux associations (déductibles à hauteur de 66 à 75%), emploi à domicile ou travaux d'économie d'énergie (ouvrant droit à crédit d'impôt).</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-3">b. Exploitez les niches fiscales adaptées à votre situation après 50 ans</h4>
                  <ul className="list-disc ml-6 space-y-3 text-[#374151] text-sm">
                    <li>
                      <strong>PER (Plan d'Épargne Retraite) :</strong> Les sommes versées sont déductibles du revenu imposable dans la limite de 10% du PASS 2025 (soit jusqu'à 4 637 € cette année pour un retraité). Cette solution est particulièrement intéressante pour diminuer l'impôt avant la retraite ou continuer à alléger la fiscalité après cessation d'activité.
                    </li>
                    <li>
                      <strong>Faites le point sur vos investissements immobiliers :</strong> Certains dispositifs permettent, même après 50 ans, d'alléger votre impôt (Pinel, Denormandie, Cosse, monuments historiques…) si vous souhaitez investir, rénover ou transmettre un bien.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Vérifiez régulièrement vos déclarations */}
            <div className="mb-8">
              <h3 className="text-xl font-cairo font-semibold text-[#253F60] mb-4">3. Vérifiez régulièrement vos déclarations et évitez les oublis</h3>
              
              <div className="ml-4 space-y-6">
                <div>
                  <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-3">a. Soyez vigilant sur la complétude de votre déclaration</h4>
                  <p className="text-[#374151] text-sm leading-relaxed mb-3">
                    Après 50 ans, la situation patrimoniale se complexifie souvent (plusieurs sources de revenus, pensions, capitaux mobiliers, SCPI, immeubles…). Déclarez systématiquement tous vos revenus :
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-[#374151] text-sm">
                    <li>Pensions de retraite et de réversion</li>
                    <li>Revenus fonciers (locations meublées ou non, en France ou à l'étranger)</li>
                    <li>Revenus de capitaux mobiliers (dividendes, intérêts, assurance-vie, SCPI…)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-cairo font-semibold text-[#253F60] mb-3">b. Vérifiez vos droits et optimisations chaque année</h4>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Les plafonds, taux, et dispositifs évoluent presque chaque campagne fiscale. L'anticipation, la veille et l'accompagnement personnalisé font la différence pour éviter un trop payé ou une pénalité.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Sollicitez un bilan patrimonial */}
            <div className="mb-8">
              <h3 className="text-xl font-cairo font-semibold text-[#253F60] mb-4">4. Sollicitez un bilan patrimonial personnalisé</h3>
              <p className="text-[#374151] text-sm leading-relaxed mb-3">
                Après 50 ans, votre situation nécessite souvent la coordination de plusieurs leviers : fiscalité, succession, choix des modes de détention, transmission à vos enfants ou petits-enfants. Travailler avec un conseiller en gestion de patrimoine ou un expert fiscal permet :
              </p>
              <ul className="list-disc ml-6 space-y-1 text-[#374151] text-sm">
                <li>D'adapter vos stratégies chaque année à l'actualité fiscale et aux réformes.</li>
                <li>D'aller plus loin dans l'optimisation de vos donations, du choix entre capitalisation et rente, de la réorganisation immobilière familiale.</li>
              </ul>
            </div>

            {/* 5. Les bonnes pratiques */}
            <div className="mb-8">
              <h3 className="text-xl font-cairo font-semibold text-[#253F60] mb-4">5. Les bonnes pratiques à retenir</h3>
              <ul className="list-disc ml-6 space-y-2 text-[#374151] text-sm">
                <li><strong>Anticipez la suppression de l'abattement de 10% sur les retraites :</strong> commencez à diversifier vos stratégies fiscales.</li>
                <li><strong>Pensez au PER :</strong> une solution souple, adaptée avant et après la retraite, qui reste défiscalisante.</li>
                <li><strong>Soyez rigoureux sur vos déclarations :</strong> évitez les oublis, comparez frais réels et abattement forfaitaire.</li>
                <li><strong>Exploitez les crédits et déductions accessibles :</strong> emploi à domicile, dons, investissements ciblés.</li>
                <li><strong>Faites-vous accompagner :</strong> l'expertise patrimoniale devient un atout précieux après 50 ans, notamment face à la complexification et à l'instabilité des règles fiscales.</li>
              </ul>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-6 mb-8">
              <p className="text-[#374151] text-sm leading-relaxed">
                Ce guide s'adresse avant tout à ceux qui souhaitent sécuriser leur fiscalité, maintenir un niveau d'imposition raisonnable et continuer à valoriser leur patrimoine sans risquer de requalification ou de redressement.
              </p>
            </div>

            {/* Bouton vers l'article complet */}
            <div className="text-center">
              <a 
                href="https://optimiser-fiscalite-50-l13jzpe.gamma.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#253F60] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#1a2d47] transition-colors duration-200"
              >
                Je souhaite faire un bilan patrimonial (250€HT)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignage */}
      <section className="w-full py-8 sm:py-10 lg:py-16 bg-gradient-to-r from-[#B99066] to-[#253F60]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            TÉMOIGNAGE
          </h2>

          {/* Encadré principal */}
          <div className="bg-white border-2 border-dashed border-white rounded-lg p-8 mb-8 text-center">
            <p className="text-2xl sm:text-3xl text-[#253F60] leading-tight">
              4500€ de pouvoir d'achat supplémentaire<br/>
              grâce à un accompagnement fiscal uniquement administratif
            </p>
          </div>

          {/* Témoignage client */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              Témoignage client – Famille D.
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <blockquote className="text-[#374151] text-base leading-relaxed italic">
                « Avec trois enfants et des revenus autour de 200 000 € par an, nous pensions que le rattachement de nos enfants majeurs au foyer fiscal était toujours la meilleure solution. Notre conseiller Azalée Patrimoine nous a proposé de simuler les deux options. Résultat : en détachant notre fils aîné et en lui versant une pension alimentaire, notre impôt a baissé d'environ 1 000 € par an, tout en lui permettant d'accéder à une aide au logement de 300 € par mois.
                <br/><br/>
                Au total, c'est plus de 4 500 € d'économie et de soutien financier pour nos enfants chaque année. Nous n'aurions jamais imaginé qu'un simple arbitrage administratif pouvait avoir un tel impact. C'est rassurant de savoir que notre situation est optimisée et suivie par un expert ».
              </blockquote>
        </div>
      </div>

          {/* Bouton CTA */}
          <div className="text-center">
            <a 
              href="https://calendly.com/rdv-azalee-patrimoine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#253F60] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 mb-2"
            >
              Analyser ma déclaration de revenus
            </a>
            <p className="text-white text-sm font-medium">
              Satisfait ou Remboursé (250€HT)
            </p>
          </div>
        </div>
      </section>


      {/* Dispositifs fiscaux */}
      <section className="w-full bg-[#F2F2F2] py-8 sm:py-10 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6 sm:mb-8 text-center">Dispositifs de défiscalisation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">PER</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Plan d'Épargne Retraite pour optimiser la fiscalité</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">Loi Pinel</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Investissement locatif avec réduction d'impôt</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">Girardin</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Investissement outre-mer avec avantages fiscaux</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-[#253F60] text-base sm:text-lg font-cairo font-semibold mb-3">Déficit foncier</h3>
              <p className="text-[#374151] text-xs sm:text-sm font-inter">Réduction d'impôt via travaux immobiliers</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
} 
