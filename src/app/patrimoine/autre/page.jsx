"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

// Default content
const defaultContent = {
  hero: {
    title: "Autres solutions patrimoniales",
    subtitle: "En dehors des placements classiques (immobilier, assurance-vie, produits financiers), il existe des solutions patrimoniales originales permettant de :",
    benefits: [
      {
        title: "Diversifier son patrimoine",
        description: "Solutions originales et méconnues",
        icon: "1"
      },
      {
        title: "Bénéficier d'avantages fiscaux",
        description: "IFI, IR, transmission",
        icon: "2"
      },
      {
        title: "S'impliquer dans l'économie réelle",
        description: "Agriculture, forêt, vigne",
        icon: "3"
      }
    ],
    highlight: "Ces véhicules collectifs sont souvent méconnus, mais peuvent jouer un rôle stratégique dans une gestion patrimoniale équilibrée.",
    buttons: [
      { text: "Découvrir les solutions", type: "primary" },
      { text: "Prendre rendez-vous", type: "secondary" }
    ]
  },
  solutions: {
    title: "Les solutions patrimoniales originales",
    solutions: [
      {
        id: "gfa",
        title: "GFA",
        subtitle: "Groupement Foncier Agricole",
        icon: "1",
        color: "from-[#253F60] to-[#3A5A7A]",
        definition: "Société civile permettant de détenir collectivement des terres agricoles, louées à des exploitants.",
        advantages: [
          "Exonération partielle d'IFI (jusqu'à 75%)",
          "Transmission facilitée",
          "Soutien à l'agriculture française"
        ],
        disadvantages: [
          "Rendement faible (1-2%/an)",
          "Liquidité limitée",
          "Dépendance à l'exploitant"
        ],
        ticketMinimum: "À partir de 5 000 à 15 000 € selon les groupements."
      },
      {
        id: "gfi",
        title: "GFI",
        subtitle: "Groupement Forestier d'Investissement",
        icon: "2",
        color: "from-[#B99066] to-[#A67C52]",
        definition: "Permet d'investir dans des forêts françaises (plantation, exploitation, entretien).",
        advantages: [
          "Exonération d'IFI (jusqu'à 75%)",
          "Rendement potentiel (2-4%/an)",
          "Impact environnemental positif"
        ],
        disadvantages: [
          "Investissement long terme (15-20 ans)",
          "Risque climatique",
          "Gestion forestière complexe"
        ],
        ticketMinimum: "À partir de 10 000 à 25 000 € selon les projets."
      },
      {
        id: "gfv",
        title: "GFV",
        subtitle: "Groupement Foncier Viticole",
        icon: "3",
        color: "from-[#253F60] to-[#B99066]",
        definition: "Investissement dans des vignobles français (achat, exploitation, commercialisation).",
        advantages: [
          "Exonération d'IFI (jusqu'à 75%)",
          "Rendement attractif (3-6%/an)",
          "Prestige et passion"
        ],
        disadvantages: [
          "Investissement élevé (50 000 € minimum)",
          "Risque climatique et commercial",
          "Gestion viticole spécialisée"
        ],
        ticketMinimum: "À partir de 50 000 € pour les grands crus."
      }
    ]
  },
  cta: {
    title: "Prêt à découvrir ces solutions ?",
    subtitle: "Nos experts vous accompagnent dans le choix des solutions patrimoniales les plus adaptées à votre profil et vos objectifs.",
    buttonText: "Prendre rendez-vous"
  }
};

export default function AutrePatrimoinePage() {
  const content = defaultContent;

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6">
              {content.hero?.title || "Autres solutions patrimoniales"}
            </h1>
            <p className="text-white text-lg font-inter leading-relaxed max-w-4xl mx-auto mb-8">
              {content.hero?.subtitle || "En dehors des placements classiques (immobilier, assurance-vie, produits financiers), il existe des solutions patrimoniales originales permettant de :"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {(content.hero?.benefits || []).map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="w-12 h-12 bg-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#A67C52] transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-white text-xl font-bold relative z-10">{benefit.icon}</span>
                  </div>
                  <h3 className="text-[#112033] font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-[#686868] text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-white bg-opacity-20 border-l-4 border-white p-4 rounded-r-lg max-w-4xl mx-auto mb-8">
              <p className="text-white text-sm font-inter">
                {content.hero?.highlight || "Ces véhicules collectifs sont souvent méconnus, mais peuvent jouer un rôle stratégique dans une gestion patrimoniale équilibrée."}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {(content.hero?.buttons || []).map((button, index) => (
              <button 
                key={index}
                onClick={() => {
                  if (button.text === "Prendre rendez-vous") {
                    window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank');
                  }
                }}
                className={`${
                  button.type === 'primary' 
                    ? 'bg-[#B99066] text-white hover:bg-[#A67C52]' 
                    : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#253F60]'
                } px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-lg transition-colors duration-200`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-5xl">
              {/* Main image container with consistent styling */}
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#253F60]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Image */}
                <div className="relative z-10">
                  <img
                    src="/images/fleur.webp"
                    alt="Solutions patrimoniales alternatives - Conseils Azalée Patrimoine"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 solutions patrimoniales Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              {content.solutions?.title || "Les solutions patrimoniales originales"}
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Découvrez les solutions alternatives pour diversifier votre patrimoine
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {(content.solutions?.solutions || []).map((solution, index) => (
              <div key={index} className={`group relative bg-gradient-to-br ${solution.color.includes('from-[#253F60]') ? 'from-[#253F60] via-[#1a2d47] to-[#253F60]' : solution.color.includes('from-[#B99066]') ? 'from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'from-[#253F60] via-[#1a2d47] to-[#B99066]'} rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${solution.color.includes('from-[#253F60]') ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-2xl font-bold">{solution.icon}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-1 h-6 bg-white/30 rounded-full"></div>
                      <h3 className="text-2xl font-cairo font-bold">{solution.title}</h3>
                      <div className="w-1 h-6 bg-white/30 rounded-full"></div>
                    </div>
                    <p className="text-base font-medium opacity-90">{solution.subtitle}</p>
                  </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Définition</h4>
                    <p className="text-xs">
                      {solution.definition}
                    </p>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Avantages</h4>
                    <ul className="text-xs space-y-1">
                      {(solution.advantages || []).map((advantage, advIndex) => (
                        <li key={advIndex}>• {advantage}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Inconvénients</h4>
                    <ul className="text-xs space-y-1">
                      {(solution.disadvantages || []).map((disadvantage, disIndex) => (
                        <li key={disIndex}>• {disadvantage}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Ticket minimum</h4>
                    <p className="text-xs">
                      {solution.ticketMinimum}
                    </p>
                  </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-2xl p-8 sm:p-10 lg:p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                {content.cta?.title || "Prêt à découvrir ces solutions ?"}
              </h2>
          <p className="text-white text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            {content.cta?.subtitle || "Nos experts vous accompagnent dans le choix des solutions patrimoniales les plus adaptées à votre profil et vos objectifs."}
          </p>
          <button 
            onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
            className="bg-[#B99066] text-white px-8 py-4 rounded-full font-source-sans font-semibold text-lg hover:bg-[#A67C52] transition-colors"
          >
            {content.cta?.buttonText || "Prendre rendez-vous"}
          </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}