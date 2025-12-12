"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

const LOCAL_STORAGE_KEY = 'vefaPageContent';

const defaultContent = {
  heroTitle: "VEFA (Vente en l'État Futur d'Achèvement)",
  heroSubtitle: "Investir dans l'immobilier neuf, et plus particulièrement en VEFA, consiste à acheter un logement sur plan, dont la construction est en cours ou à venir. Ce mode d'acquisition séduit de nombreux investisseurs qui souhaitent bénéficier d'un bien moderne, conforme aux normes énergétiques actuelles, et d'avantages fiscaux attractifs.",
  heroButton1: "L'essentiel",
  heroButton2: "Sommaire",
  rightCardTitle: "VEFA : investissez dans le neuf",
  rightCardSubtitle: "Bénéficiez d'avantages fiscaux, d'un financement adapté et d'une plus-value garantie.",
  rightCardBenefits: [
    "Logements économes en énergie (RE2020)",
    "Frais de notaire réduits (2-3% vs 7%)",
    "Garanties constructeur sécurisées",
    "Défiscalisation loi Pinel"
  ],
  rightCardButton1: "Prendre rendez-vous",
  rightCardButton2: "Fiscalité",
  essentielTitle: "L'essentiel",
  essentielItems: [
    "Des logements économes en énergie grâce aux normes RE2020, gage de valorisation à long terme.",
    "Des frais de notaire réduits (2 à 3 % contre 7 % dans l'ancien).",
    "Des garanties constructeur (parfait achèvement, décennale, biennale) qui sécurisent l'investissement.",
    "La possibilité de bénéficier de dispositifs fiscaux comme la loi Pinel, réduisant significativement l'impôt.",
    "Délais de livraison pouvant s'allonger, avec parfois des retards de chantier.",
    "Surcote du neuf : le prix au m² est souvent plus élevé que dans l'ancien, ce qui limite la rentabilité."
  ],
  sommaireTitle: "Sommaire",
  sommaireItems: [
    "1. Qu'est-ce que la VEFA ?",
    "2. Avantages de la VEFA",
    "3. Inconvénients à anticiper",
    "4. Exemple concret",
    "5. Financement et étapes",
    "6. Fiscalité et défiscalisation",
    "7. Conseil Azalée Patrimoine",
    "8. Risques et précautions",
    "9. Comparaison avec l'existant"
  ],
  definitionTitle: "Qu'est-ce que la VEFA ?",
  definitionText1: "La Vente en l'État Futur d'Achèvement (VEFA) est un contrat de vente d'un bien immobilier neuf qui n'est pas encore terminé au moment de la signature.",
  definitionText2: "L'acheteur devient propriétaire du bien dès la signature du contrat, mais la livraison et le transfert de propriété effective se font à la fin des travaux.",
  definitionSavoirTitle: "À savoir",
  definitionSavoirItems: [
    "Contrat de vente signé avant achèvement",
    "Propriété acquise dès la signature",
    "Livraison à la fin des travaux",
    "Garanties constructeur obligatoires"
  ],
  avantagesTitle: "Avantages de la VEFA",
  avantagesItems: [
    {
      title: "Économies d'énergie",
      description: "Logements conformes aux normes RE2020, gage de valorisation à long terme"
    },
    {
      title: "Frais réduits",
      description: "Frais de notaire réduits (2 à 3 % contre 7 % dans l'ancien)"
    },
    {
      title: "Garanties sécurisées",
      description: "Garanties constructeur (parfait achèvement, décennale, biennale)"
    },
    {
      title: "Défiscalisation",
      description: "Dispositifs fiscaux comme la loi Pinel réduisant significativement l'impôt"
    }
  ],
  inconvenientsTitle: "Inconvénients",
  inconvenientsItems: [
    {
      title: "Délais de livraison",
      description: "Délais pouvant s'allonger, avec parfois des retards de chantier"
    },
    {
      title: "Surcote du neuf",
      description: "Le prix au m² est souvent plus élevé que dans l'ancien, limitant la rentabilité"
    },
    {
      title: "Plafonds de loyers",
      description: "En cas de Pinel, plafonds pouvant restreindre la cible de locataires"
    },
    {
      title: "Risque de vacance",
      description: "Vacance locative si l'emplacement est mal choisi (zones saturées)"
    }
  ],
  exempleTitle: "Exemple concret",
  exempleContent: "Un investisseur acquiert un T2 en VEFA à Nantes pour 230 000 €. Grâce au dispositif Pinel, il bénéficie d'une réduction d'impôt de 4 600 €/an pendant 9 ans. Loué 650 €/mois, son bien lui permet de limiter son effort d'épargne à 150 €/mois tout en se constituant un patrimoine valorisé.",
  financementTitle: "Financement et étapes",
  financementSteps: [
    {
      step: "1",
      title: "Signature du contrat",
      description: "Engagement d'achat avec un acompte de 5%"
    },
    {
      step: "2",
      title: "Période de construction",
      description: "Paiement des intérêts uniquement"
    },
    {
      step: "3",
      title: "Livraison",
      description: "Paiement du solde et transfert de propriété"
    },
    {
      step: "4",
      title: "Possession",
      description: "Occupation et jouissance du bien"
    }
  ],
  fiscaliteTitle: "Fiscalité et défiscalisation",
  fiscaliteContent: "La VEFA offre plusieurs avantages fiscaux : TVA réduite, possibilité de déficit foncier, et éligibilité aux dispositifs de défiscalisation comme Pinel ou Malraux selon la localisation et le type de bien.",
  conseilTitle: "Conseil Azalée Patrimoine",
  conseilContent: "La VEFA est particulièrement adaptée aux investisseurs qui recherchent sécurité et défiscalisation. Mais le choix de la ville, du quartier et de la demande locative réelle est primordial. Chez Azalée Patrimoine, nous vous aidons à sélectionner uniquement les programmes offrant un véritable potentiel locatif et patrimonial.",
  risquesTitle: "Risques et précautions",
  risquesItems: [
    "Délais de livraison non respectés",
    "Qualité des finitions",
    "Évolution des prix du marché",
    "Risques de défaillance du promoteur"
  ],
  comparaisonTitle: "VEFA vs Immobilier existant",
  comparaisonData: [
    { critere: "TVA", vefa: "5,5%", existant: "20%" },
    { critere: "Plus-value", vefa: "Élevée", existant: "Modérée" },
    { critere: "Délai", vefa: "12-24 mois", existant: "Immédiat" },
    { critere: "Risque", vefa: "Modéré", existant: "Faible" }
  ]
};

export default function Page() {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setContent({ ...defaultContent, ...parsed });
    }

    // Listen for custom content update events
    const handleContentUpdate = () => {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setContent({ ...defaultContent, ...parsed });
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate);
    return () => window.removeEventListener('contentUpdated', handleContentUpdate);
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
                {content.heroTitle}
              </h1>
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#lessentiel" className="inline-flex items-center justify-center bg-[#B99066] text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors">{content.heroButton1}</a>
              </div>
            </div>
            
            {/* Right card */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight mb-2">{content.rightCardTitle}</h2>
              <p className="text-sm opacity-90 mb-4">{content.rightCardSubtitle}</p>
              <ul className="space-y-2 text-sm font-source-sans font-semibold">
                {content.rightCardBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2"><span>✓</span><span>{benefit}</span></li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors"
                >
                  Prendre rendez-vous
                </button>
                <a href="#fiscalite" className="border-2 border-white text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors">{content.rightCardButton2}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'essentiel */}
      <section id="lessentiel" className="w-full bg-[#F9FAFB] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.essentielTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.essentielItems.map((item, i) => {
              // Alternate between blue and gold gradients for visual variety
              const isBlue = i % 2 === 0;
              const bgGradient = isBlue 
                ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' 
                : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]';
              const textColor = 'text-white';
              
              return (
                <div key={i} className={`${bgGradient} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border-2 border-transparent hover:border-white/20`}>
                  <p className={`${textColor} text-sm font-inter leading-relaxed`}>
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Définition */}
      <section id="definition" className="w-full bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h3 className="text-[#253F60] text-2xl font-cairo font-semibold mb-4">{content.definitionTitle}</h3>
            <p className="text-[#686868] font-inter mb-4">{content.definitionText1}</p>
            <p className="text-[#686868] font-inter">{content.definitionText2}</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6 sm:p-8 border-l-4 border-[#B99066]">
            <h4 className="text-[#253F60] text-lg font-source-sans font-semibold mb-4">{content.definitionSavoirTitle}</h4>
            <ul className="space-y-2 text-[#686868] font-inter">
              {content.definitionSavoirItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#B99066] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.avantagesTitle}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Les bénéfices d'un investissement en VEFA
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {content.avantagesItems.map((item, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${index % 2 === 0 ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-white font-cairo font-bold text-xl mb-4 text-center">{item.title}</h3>
                  <p className="text-white text-base font-inter leading-relaxed text-center">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inconvénients */}
      <section id="inconvenients" className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.inconvenientsTitle}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Points de vigilance à considérer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {content.inconvenientsItems.map((item, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4 justify-center">
                    <div className="w-1 h-6 bg-[#B99066] rounded-full"></div>
                    <h3 className="text-[#253F60] font-cairo font-bold text-xl">{item.title}</h3>
                  </div>
                  <p className="text-[#686868] text-base font-inter leading-relaxed text-center">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exemple concret */}
      <section id="exemple" className="w-full bg-[#F2F2F2] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.exempleTitle}</h2>
            <div className="bg-[#B99066] rounded-lg p-6 text-white">
              <p className="text-white text-base font-inter leading-relaxed">{content.exempleContent}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Financement */}
      <section id="financement" className="w-full bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-8 text-center">{content.financementTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.financementSteps.map((step, index) => (
              <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-[#253F60] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-[#253F60] text-lg font-source-sans font-semibold mb-3">{step.title}</h3>
                <p className="text-[#686868] text-sm font-inter">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fiscalité */}
      <section id="fiscalite" className="w-full bg-[#F2F2F2] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.fiscaliteTitle}</h2>
            <p className="text-[#686868] text-base font-inter leading-relaxed">{content.fiscaliteContent}</p>
          </div>
        </div>
      </section>

      {/* Conseil Azalée Patrimoine */}
      <section id="conseil" className="w-full bg-[#253F60] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 text-center">{content.conseilTitle}</h2>
            <div className="bg-[#B99066] rounded-lg p-6 text-white">
              <p className="text-white text-base font-inter leading-relaxed">{content.conseilContent}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Risques */}
      <section id="risques" className="w-full bg-white py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6">{content.risquesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.risquesItems.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-lg p-5 border-l-4 border-[#B99066]">
                <p className="text-[#686868] text-sm font-inter font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison */}
      <section id="comparaison" className="w-full bg-[#F2F2F2] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-semibold mb-6 text-center">{content.comparaisonTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#253F60] text-white">
                    <th className="border border-[#1a2d47] p-3 text-left font-source-sans font-semibold">Critère</th>
                    <th className="border border-[#1a2d47] p-3 text-center font-source-sans font-semibold">VEFA</th>
                    <th className="border border-[#1a2d47] p-3 text-center font-source-sans font-semibold">Existant</th>
                  </tr>
                </thead>
                <tbody>
                  {content.comparaisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'}>
                      <td className="border border-[#E5E7EB] p-3 font-inter font-medium text-[#253F60]">{row.critere}</td>
                      <td className="border border-[#E5E7EB] p-3 text-center font-inter text-[#253F60] font-semibold">{row.vefa}</td>
                      <td className="border border-[#E5E7EB] p-3 text-center font-inter text-[#686868]">{row.existant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="w-full bg-[#253F60] py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold mb-6">
            Prêt à investir en VEFA ?
          </h2>
          <p className="text-white text-lg font-inter mb-8 max-w-2xl mx-auto">
            Nos experts vous accompagnent dans votre projet d'investissement immobilier neuf avec une approche personnalisée.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#A67A5A] transition-colors"
            >
              Prendre rendez-vous
            </button>
            <button 
              onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-white hover:text-[#253F60] transition-colors"
            >
              Consulter un expert
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
