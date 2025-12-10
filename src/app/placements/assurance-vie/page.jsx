"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

const STORAGE_KEY = "assuranceVieContent";

const defaultContent = {
  hero: {
    title: "Assurance-vie : l'enveloppe incontournable",
    subtitle: "L'assurance-vie est le placement préféré des Français, avec près de 1 900 milliards d'euros d'encours. Si elle est souvent présentée comme un simple produit d'épargne, elle est en réalité un véritable couteau suisse patrimonial.",
    description: "Son intérêt dépasse le rendement financier : il tient surtout à sa fiscalité avantageuse et à sa souplesse en matière de transmission.",
    button: "Demander une étude patrimoniale gratuite",
    image: "/images/assurance-vie-hero.jpg"
  },
  enveloppe: {
    title: "📌 L'assurance-vie comme enveloppe fiscale",
    description: "Une assurance-vie n'est pas un placement en soi mais une enveloppe qui peut contenir :",
    contenus: [
      "un fonds en euros sécurisé (capital garanti)",
      "des unités de compte (UC) : actions, ETF, SCPI, obligations, produits structurés…"
    ],
    particularite: "La particularité est que cette enveloppe bénéficie d'un régime fiscal spécifique, plus favorable que celui des autres placements financiers."
  },
  fiscalite: {
    title: "📊 La fiscalité des rachats (retraits)",
    description: "Lorsque vous retirez de l'argent de votre contrat, seule la part des gains (intérêts, plus-values) est imposée. La fiscalité dépend de deux critères :",
    criteres: [
      "La durée du contrat (moins ou plus de 8 ans)",
      "La date des versements (avant ou après le 27 septembre 2017, entrée en vigueur du PFU)"
    ],
    avant2017: {
      title: "Avant le 27/09/2017",
      options: [
        "Option pour le PFL (prélèvement forfaitaire libératoire) : 35% avant 4 ans, 15% entre 4 et 8 ans, 7,5% après 8 ans",
        "Ou imposition au barème de l'IR"
      ]
    },
    depuis2017: {
      title: "Depuis le 27/09/2017",
      options: [
        "Application du PFU (prélèvement forfaitaire unique, ou flat tax) de 30% (12,8% IR + 17,2% PS) pour les versements après cette date",
        "Après 8 ans, taux réduit de 7,5% (hors PS) dans la limite de 150 000€ de primes versées par assuré, puis 12,8% au-delà"
      ]
    },
    abattement: "Dans tous les cas : abattement annuel de 4 600€ (9 200€ pour un couple) sur les produits après 8 ans."
  },
  transmission: {
    title: "👵 Versements avant et après 70 ans : un impact majeur en transmission",
    description: "La fiscalité successorale de l'assurance-vie dépend de l'âge de l'assuré au moment des versements :",
    avant70: {
      title: "Avant 70 ans (article 990 I du CGI)",
      description: "chaque bénéficiaire profite d'un abattement de 152 500€, puis taxation forfaitaire (20% jusqu'à 700 000€, puis 31,25%)"
    },
    apres70: {
      title: "Après 70 ans (article 757 B du CGI)",
      description: "abattement global de 30 500€ sur les primes versées (tous bénéficiaires confondus). Les primes excédentaires sont soumises aux droits de succession selon le lien de parenté."
    },
    attention: "Mais attention : les produits (intérêts, plus-values) générés restent exonérés."
  },
  clause: {
    title: "📜 La clause bénéficiaire : souplesse et liberté",
    description: "L'un des atouts majeurs de l'assurance-vie est la clause bénéficiaire : l'épargnant choisit librement qui recevra le capital à son décès.",
    avantages: [
      "Cela peut être le conjoint, les enfants, mais aussi un tiers (ami, concubin, association, etc.)",
      "La clause est hors succession : les capitaux ne sont pas soumis aux règles classiques de réserve héréditaire"
    ],
    exemple: "Exemple : une personne désigne son concubin comme bénéficiaire, alors que les enfants n'ont pas encore de droits sur ce capital. Cela en fait un outil puissant dans les familles recomposées."
  },
  jurisprudence: {
    title: "⚖️ Jurisprudence : primes manifestement exagérées et contentieux familiaux",
    description: "La liberté offerte par l'assurance-vie peut générer des conflits familiaux. Les héritiers écartés contestent parfois le contrat en invoquant le caractère \"manifestement exagéré\" des primes versées.",
    points: [
      "La jurisprudence apprécie au cas par cas : âge du souscripteur, importance des primes par rapport à son patrimoine global, utilité économique du contrat",
      "Exemple : un retraité de 85 ans qui verse 500 000€ en assurance-vie, alors que son patrimoine est de 600 000€, pourra voir son contrat partiellement réintégré dans la succession",
      "Les juges examinent si les versements étaient proportionnés aux revenus et à la situation de l'assuré"
    ],
    resultat: "Résultat : l'assurance-vie n'est pas \"hors succession absolue\", mais elle reste largement protectrice."
  },
  exemple: {
    title: "💡 Exemple concret",
    description: "Madame X, 68 ans, verse 200 000€ sur une assurance-vie en 2000. Elle désigne son neveu comme bénéficiaire.",
    points: [
      "Fiscalité : ces versements, faits avant ses 70 ans, bénéficient de l'abattement de 152 500€ pour son neveu",
      "Transmission : malgré la présence d'enfants, le capital ne tombe pas automatiquement dans la succession",
      "Contestation : les enfants pourraient tenter une action pour primes exagérées si ces 200 000€ représentaient l'essentiel du patrimoine de Madame X"
    ]
  },
  conseil: {
    title: "🎯 Conseil Azalée Patrimoine",
    description: "L'assurance-vie est un outil polyvalent : épargne, investissement, optimisation fiscale, transmission. Mais ses subtilités (dates de versements, âge du souscripteur, rédaction de la clause bénéficiaire) en font un produit technique.",
    accompagnement: "Chez Azalée Patrimoine, nous accompagnons nos clients à :",
    services: [
      "Rédiger une clause bénéficiaire adaptée à leur situation familiale (ex. : enfants d'un premier mariage, concubin, partenaire de PACS)",
      "Arbitrer entre versements avant et après 70 ans",
      "Sécuriser le contrat pour éviter les litiges familiaux",
      "Optimiser la fiscalité en phase d'épargne et de transmission"
    ],
    conclusion: "L'assurance-vie reste l'outil n°1 de la stratégie patrimoniale. Bien utilisée, elle combine rendement, souplesse et protection successorale."
  },
  cta: {
    title: "📩 Contactez un conseiller Azalée Patrimoine",
    subtitle: "pour auditer vos contrats d'assurance-vie et sécuriser votre transmission familiale",
    email: "contact@azalee-patrimoine.fr",
    primaryButton: "Demander un audit gratuit",
    secondaryButton: "Prendre rendez-vous"
  }
};

export default function AssuranceViePage() {
  const [content, setContent] = useState(defaultContent);
  const [activeTab, setActiveTab] = useState("enveloppe");
  const [loading, setLoading] = useState(true);

  // Load content from MongoDB via API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/cms/content?path=placements/assurance-vie');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Merge with default content to ensure all fields exist
          setContent((prev) => ({ ...prev, ...data.data }));
        } else {
          // If not found in DB, use default content
          console.log('Content not found in database, using default content');
        }
      } catch (error) {
        console.error("Failed to load content from API:", error);
        // Fallback to default content on error
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Show loading state if content is being fetched
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#253F60] mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du contenu...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <span className="inline-block bg-[#B99066] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                1 900 milliards d'encours
              </span>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                {content.hero.title}
              </h1>
              <p className="text-white text-lg leading-relaxed mb-4">
                {content.hero.subtitle}
              </p>
              <p className="text-white text-lg leading-relaxed mb-8">
                {content.hero.description}
              </p>
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67C52] transition-colors duration-200 text-lg"
              >
                {content.hero.button}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("enveloppe")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "enveloppe"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Enveloppe fiscale
            </button>
            <button
              onClick={() => setActiveTab("fiscalite")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "fiscalite"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Fiscalité
            </button>
            <button
              onClick={() => setActiveTab("transmission")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "transmission"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Transmission
            </button>
            <button
              onClick={() => setActiveTab("jurisprudence")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "jurisprudence"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Jurisprudence
            </button>
            <button
              onClick={() => setActiveTab("conseil")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "conseil"
                  ? "bg-[#253F60] text-white"
                  : "bg-gray-100 text-[#253F60] hover:bg-gray-200"
              }`}
            >
              Conseil
            </button>
          </div>
        </div>
      </section>

      {/* Enveloppe Section */}
      {activeTab === "enveloppe" && (
        <div className="space-y-12">
          <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
                {content.enveloppe.title}
              </h2>
              <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
                {content.enveloppe.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {content.enveloppe.contenus.map((contenu, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[#112033] text-sm font-medium">{contenu}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
                <p className="text-lg font-medium">{content.enveloppe.particularite}</p>
              </div>
            </div>
          </section>

          {/* Clause Section */}
          <section className="py-12 bg-white">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
                {content.clause.title}
              </h2>
              <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
                {content.clause.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {content.clause.avantages.map((avantage, index) => (
                  <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[#112033] text-sm font-medium">{avantage}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white">
                <h3 className="text-lg font-semibold mb-4">Exemple concret</h3>
                <p className="text-sm">{content.clause.exemple}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Fiscalité Section */}
      {activeTab === "fiscalite" && (
        <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
              {content.fiscalite.title}
            </h2>
            <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
              {content.fiscalite.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {content.fiscalite.criteres.map((critere, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-[#112033] text-sm font-medium">{critere}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-[#112033] text-lg font-semibold mb-4">{content.fiscalite.avant2017.title}</h3>
                <ul className="space-y-2">
                  {content.fiscalite.avant2017.options.map((option, index) => (
                    <li key={index} className="text-[#112033] text-sm flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#4EBBBD] rounded-full mt-2 flex-shrink-0"></span>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-[#112033] text-lg font-semibold mb-4">{content.fiscalite.depuis2017.title}</h3>
                <ul className="space-y-2">
                  {content.fiscalite.depuis2017.options.map((option, index) => (
                    <li key={index} className="text-[#112033] text-sm flex items-start gap-2">
                      <span className="w-2 h-2 bg-[#4EBBBD] rounded-full mt-2 flex-shrink-0"></span>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
              <p className="text-lg font-medium">👉 {content.fiscalite.abattement}</p>
            </div>
          </div>
        </section>
      )}

      {/* Transmission Section */}
      {activeTab === "transmission" && (
        <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
              {content.transmission.title}
            </h2>
            <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
              {content.transmission.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-[#112033] text-lg font-semibold mb-4">{content.transmission.avant70.title}</h3>
                <p className="text-[#112033] text-sm">{content.transmission.avant70.description}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-[#112033] text-lg font-semibold mb-4">{content.transmission.apres70.title}</h3>
                <p className="text-[#112033] text-sm">{content.transmission.apres70.description}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
              <p className="text-lg font-medium">👉 {content.transmission.attention}</p>
            </div>
          </div>
        </section>
      )}

      {/* Jurisprudence Section */}
      {activeTab === "jurisprudence" && (
        <div className="space-y-12">
          <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
                {content.jurisprudence.title}
              </h2>
              <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
                {content.jurisprudence.description}
              </p>
              
              <div className="space-y-6 mb-8">
                {content.jurisprudence.points.map((point, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[#112033] text-sm font-medium">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
                <p className="text-lg font-medium">👉 {content.jurisprudence.resultat}</p>
              </div>
            </div>
          </section>

          {/* Exemple Section */}
          <section className="py-12 bg-white">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
                {content.exemple.title}
              </h2>
              <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
                {content.exemple.description}
              </p>
              
              <div className="space-y-6">
                {content.exemple.points.map((point, index) => (
                  <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[#112033] text-sm font-medium">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Conseil Section */}
      {activeTab === "conseil" && (
        <section className="py-12 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[#112033] text-2xl font-semibold text-center mb-8">
              {content.conseil.title}
            </h2>
            <p className="text-[#686868] text-lg text-center mb-8 max-w-3xl mx-auto">
              {content.conseil.description}
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-[#112033] text-lg font-semibold mb-6 text-center">
                {content.conseil.accompagnement}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.conseil.services.map((service, index) => (
                  <div key={index} className="bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF] rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#253F60] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-[#112033] text-sm font-medium">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-8 text-white text-center">
              <p className="text-lg font-medium">👉 {content.conseil.conclusion}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#F2F2F2] to-[#E5E5E5]">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
            <h2 className="text-[#112033] text-2xl lg:text-3xl font-semibold mb-4">
              {content.cta.title}
            </h2>
            <p className="text-[#686868] text-lg mb-8 max-w-3xl mx-auto">
              {content.cta.subtitle}
            </p>
            <div className="bg-gradient-to-r from-[#253F60] to-[#3A5A7A] rounded-xl p-6 text-white mb-8">
              <h3 className="text-xl font-semibold mb-3">📧 {content.cta.email}</h3>
              <p className="text-sm opacity-90">Audit gratuit de vos contrats d'assurance-vie</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#A67C52] transition-colors duration-200 text-lg"
              >
                🗓️ {content.cta.primaryButton}
              </a>
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#253F60] text-[#253F60] px-8 py-4 rounded-lg font-medium hover:bg-[#253F60] hover:text-white transition-colors duration-200 text-lg"
              >
                📧 {content.cta.secondaryButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}