"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Footer from "../../components/common/Footer";
import { processHTMLForRender } from "../../lib/utils/htmlConverter";

// Liste complète des principales villes françaises avec leurs codes postaux
const villesFrance = [
  "Paris 75001, 75002, 75003, 75004, 75005, 75006, 75007, 75008, 75009, 75010, 75011, 75012, 75013, 75014, 75015, 75016, 75017, 75018, 75019, 75020",
  "Lyon 69001, 69002, 69003, 69004, 69005, 69006, 69007, 69008, 69009",
  "Marseille 13001, 13002, 13003, 13004, 13005, 13006, 13007, 13008, 13009, 13010, 13011, 13012, 13013, 13014, 13015, 13016",
  "Toulouse 31000, 31100, 31200, 31300, 31400, 31500",
  "Nice 06000, 06100, 06200, 06300",
  "Nantes 44000, 44100, 44200, 44300",
  "Strasbourg 67000, 67100, 67200",
  "Montpellier 34000, 34070, 34080, 34090",
  "Bordeaux 33000, 33100, 33200, 33300, 33400, 33500",
  "Lille 59000, 59100, 59200, 59300, 59400, 59500, 59600, 59700, 59800",
  "Rennes 35000, 35100, 35200, 35300",
  "Reims 51000, 51100",
  "Saint-Étienne 42000, 42100, 42200, 42300",
  "Le Havre 76000, 76100, 76200, 76300",
  "Toulon 83000, 83100, 83200",
  "Grenoble 38000, 38100, 38200",
  "Dijon 21000, 21100",
  "Angers 49000, 49100",
  "Nîmes 30000, 30900",
  "Villeurbanne 69100",
  "Saint-Denis 93200, 93210, 93220",
  "Le Mans 72000, 72100",
  "Aix-en-Provence 13080, 13090, 13100",
  "Clermont-Ferrand 63000, 63100",
  "Brest 29200, 29217, 29229",
  "Limoges 87000, 87100",
  "Tours 37000, 37100, 37200",
  "Amiens 80000, 80080, 80090",
  "Perpignan 66000, 66100",
  "Metz 57000, 57050, 57070",
  "Besançon 25000, 25030",
  "Boulogne-Billancourt 92100",
  "Orléans 45000, 45100",
  "Mulhouse 68100, 68200",
  "Rouen 76000, 76100, 76200, 76300, 76400, 76500",
  "Caen 14000, 14100, 14200, 14300",
  "Nancy 54000, 54100",
  "Argenteuil 95100",
  "Montreuil 93100",
  "Saint-Paul 97460",
  "Roubaix 59100",
  "Tourcoing 59200",
  "Nanterre 92000",
  "Avignon 84000",
  "Créteil 94000",
  "Dunkirk 59140, 59240, 59279, 59430, 59470, 59640",
  "Poitiers 86000",
  "Asnières-sur-Seine 92600",
  "Courbevoie 92400",
  "Vitry-sur-Seine 94400",
  "Aubervilliers 93300",
  "Colombes 92700",
  "Aulnay-sous-Bois 93600",
  "La Rochelle 17000",
  "Rueil-Malmaison 92500",
  "Champigny-sur-Marne 94500",
  "Antibes 06160, 06600",
  "Saint-Maur-des-Fossés 94100, 94210",
  "Cannes 06400",
  "Calais 62100",
  "Béziers 34500",
  "Bourges 18000",
  "Colmar 68000",
  "Drancy 93700",
  "Mérignac 33700",
  "Saint-Nazaire 44600",
  "Valence 26000",
  "Quimper 29000",
  "Issy-les-Moulineaux 92130",
  "Noisy-le-Grand 93160",
  "La Seyne-sur-Mer 83500",
  "Hyères 83400",
  "Évry 91000",
  "Villeneuve-d'Ascq 59650",
  "Sète 34200",
  "Pau 64000",
  "Chambéry 73000",
  "Pantin 93500",
  "Lorient 56100",
  "Montauban 82000",
  "Niort 79000",
  "Vannes 56000",
  "Bayonne 64100",
  "Cergy 95000, 95800",
  "Annecy 74000",
  "Laval 53000",
  "Belfort 90000",
  "Brive-la-Gaillarde 19100",
  "Charleville-Mézières 08000",
  "Cholet 49300",
  "Épinal 88000",
  "Évreux 27000",
  "Fontenay-sous-Bois 94120",
  "Fréjus 83600",
  "Gap 05000",
  "Gennevilliers 92230",
  "Ivry-sur-Seine 94200",
  "Le Blanc-Mesnil 93150",
  "Le Tampon 97430",
  "Les Abymes 97139",
  "Lunel 34400",
  "Mâcon 71000",
  "Meaux 77100",
  "Melun 77000",
  "Montbéliard 25200",
  "Neuilly-sur-Seine 92200",
  "Périgueux 24000",
  "Roanne 42300",
  "Romainville 93230",
  "Saint-Brieuc 22000",
  "Saint-Ouen 93400",
  "Saint-Quentin 02100",
  "Sarcelles 95200",
  "Thionville 57100",
  "Troyes 10000",
  "Vaulx-en-Velin 69120",
  "Vénissieux 69200",
  "Vincennes 94300",
  "Wattrelos 59150",
  "Albi 81000",
  "Angoulême 16000",
  "Arles 13200",
  "Arras 62000",
  "Aubagne 13400",
  "Auxerre 89000",
  "Beauvais 60000",
  "Blois 41000",
  "Bourgoin-Jallieu 38300",
  "Brignoles 83170",
  "Carcassonne 11000",
  "Castres 81100",
  "Chalon-sur-Saône 71100",
  "Châteauroux 36000",
  "Chartres 28000",
  "Châteaudun 28200",
  "Cherbourg 50100",
  "Compiègne 60200",
  "Dieppe 76200",
  "Douai 59500",
  "Draguignan 83300",
  "Dreux 28100",
  "Forbach 57600",
  "Fougères 35300",
  "Grasse 06130",
  "Haguenau 67500",
  "La Ciotat 13600",
  "La Roche-sur-Yon 85000",
  "Lannion 22300",
  "Laval 53000",
  "Libourne 33500",
  "Longwy 54400",
  "Lons-le-Saunier 39000",
  "Loudun 86200",
  "Lunéville 54300",
  "Mantes-la-Jolie 78200",
  "Martigues 13500",
  "Maubeuge 59600",
  "Mayenne 53100",
  "Menton 06500",
  "Millau 12100",
  "Miribel 01700",
  "Montargis 45200",
  "Mont-de-Marsan 40000",
  "Montluçon 03100",
  "Moulins 03000",
  "Nevers 58000",
  "Narbonne 11100",
  "Orange 84100",
  "Pithiviers 45300",
  "Pontarlier 25300",
  "Pont-Audemer 27500",
  "Pontoise 95300",
  "Privas 07000",
  "Provins 77160",
  "Quimperlé 29300",
  "Rambouillet 78120",
  "Redon 35600",
  "Remiremont 88200",
  "Rodez 12000",
  "Romans-sur-Isère 26100",
  "Rosny-sous-Bois 93110",
  "Royan 17200",
  "Rumilly 74150",
  "Saint-Amand-les-Eaux 59230",
  "Saint-Avold 57500",
  "Saint-Chamond 42400",
  "Saint-Dié-des-Vosges 88100",
  "Saint-Dizier 52100",
  "Saintes 17100",
  "Saint-Flour 15100",
  "Saint-Gaudens 31800",
  "Saint-Germain-en-Laye 78100",
  "Saint-Jean-de-Luz 64500",
  "Saint-Lô 50000",
  "Saint-Malo 35400",
  "Saint-Omer 62500",
  "Salon-de-Provence 13300",
  "Sarlat-la-Canéda 24200",
  "Sarreguemines 57200",
  "Sartrouville 78500",
  "Sens 89100",
  "Soissons 02200",
  "Tarbes 65000",
  "Thonon-les-Bains 74200",
  "Tulle 19000",
  "Ussel 19200",
  "Uzes 30700",
  "Valenciennes 59300",
  "Vannes 56000",
  "Vendôme 41100",
  "Verdun 55100",
  "Versailles 78000",
  "Vesoul 70000",
  "Vichy 03200",
  "Vienne 38200",
  "Vierzon 18100",
  "Villefranche-sur-Saône 69400",
  "Villeneuve-sur-Lot 47300",
  "Vitré 35500",
  "Yvetot 76190"
].join(", ");

export default function PatrimoinePage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  // Default content structure (fallback)
  const defaultContent = {
    hero: {
      title: "Patrimoine – Protégez et transmettez votre héritage avec Azalée Patrimoine",
      description: "Votre expert en transmission patrimoniale depuis plus de 30 ans. Nous vous accompagnons pour protéger votre famille, optimiser la transmission de votre patrimoine, et sécuriser l'avenir de vos proches avec des solutions personnalisées.",
      ctaText: "Demander un bilan patrimonial gratuit",
      image: "/images/azalee-patrimoine-pqtrioine.webp"
    },
    essentiel: {
      title: "L'essentiel",
      content: "La gestion de patrimoine vise à optimiser la transmission de vos biens tout en minimisant les coûts fiscaux.\n\nNos experts vous accompagnent pour :\n• Protéger votre famille\n• Transmettre efficacement\n• Optimiser la fiscalité\n• Sécuriser l'avenir",
      image: "/images/patrimoine-responsive-content-image.png"
    },
    definition: {
      title: "Gestion de patrimoine : Définition",
      content: "Le patrimoine comprend tous vos biens et droits :\n• Biens immobiliers\n• Placements financiers\n• Entreprises et participations\n• Œuvres d'art et objets de valeur\n• Droits de propriété intellectuelle\n• Assurance vie et contrats\n• Droits à la retraite"
    },
    services: {
      title: "Nos Services Patrimoine",
      services: [
        { name: "Bilan Patrimonial", description: "Analyse complète de votre situation" },
        { name: "Transmission", description: "Optimisation de la transmission" },
        { name: "Protection Famille", description: "Sécurisation de vos proches" },
        { name: "Succession", description: "Gestion des successions" },
        { name: "Donation", description: "Stratégies de donation" },
        { name: "Assurance Vie", description: "Optimisation fiscale" }
      ]
    },
    advantages: {
      title: "Pourquoi choisir Azalée Patrimoine ?",
      advantages: [
        { title: "Expertise", description: "30 ans d'expérience en patrimoine" },
        { title: "Personnalisation", description: "Solutions sur mesure" },
        { title: "Transparence", description: "Conseils clairs et indépendants" },
        { title: "Suivi", description: "Accompagnement personnalisé" }
      ]
    },
    cta: {
      title: "Prêt à optimiser votre patrimoine ?",
      description: "Contactez nos experts pour une analyse personnalisée de votre situation patrimoniale et découvrez les meilleures stratégies de transmission.",
      buttonText: "Demander une consultation gratuite"
    },
    breadcrumb: {
      homeText: "Accueil",
      currentPage: "Patrimoine"
    },
    essentielDetail: {
      title: "L'essentiel du patrimoine",
      cards: [
        {
          title: "Succession et héritage",
          content: "Optimisez la transmission de votre patrimoine avec nos conseils en succession. Nous vous accompagnons pour minimiser les droits de succession et sécuriser l'avenir de vos proches."
        },
        {
          title: "Donation et transmission",
          content: "Anticipez la transmission de votre patrimoine grâce aux donations. Nos experts vous conseillent sur les meilleures stratégies de donation à titre gratuit ou onéreux."
        },
        {
          title: "Protection familiale",
          content: "Protégez votre famille avec des solutions adaptées. De l'assurance-vie aux contrats de prévoyance, nous vous proposons les meilleures options de protection."
        }
      ]
    },
    whyChoose: {
      title: "Pourquoi choisir Azalee Wealth ?",
      benefits: [
        "Plus de 30 ans d'expertise",
        "Conseils personnalisés",
        "Accompagnement complet",
        "Solutions sur mesure"
      ],
      buttonText: "Obtenez votre bilan patrimonial gratuit"
    },
    servicesGrid: {
      services: [
        {
          title: "Bilan patrimonial",
          description: "Analysez votre situation patrimoniale actuelle et identifiez les opportunités d'optimisation.",
          buttonText: "En savoir plus →"
        },
        {
          title: "Conseils patrimoniaux",
          description: "Bénéficiez de conseils personnalisés pour optimiser votre patrimoine et sa transmission.",
          buttonText: "En savoir plus →"
        },
        {
          title: "Transmission",
          description: "Préparez la transmission de votre patrimoine avec des stratégies adaptées à votre situation.",
          buttonText: "En savoir plus →"
        }
      ]
    }
  };

  useEffect(() => {
    // Load content from MongoDB via API
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/cms/content?path=patrimoine&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        const data = await response.json();
        
        if (data.success && data.data) {
          // Merge with default content to ensure all fields exist
          setContent({ ...defaultContent, ...data.data });
        } else {
          // If not found in DB, use default content
          console.log('Content not found in database, using default content');
          setContent(defaultContent);
        }
      } catch (error) {
        console.error("Failed to load content from API:", error);
        // Fallback to default content on error
        setContent(defaultContent);
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    // Listen for CMS content updates
    const handleCMSUpdate = (event) => {
      const updatedPath = event.detail?.path?.toLowerCase();
      if (!updatedPath || updatedPath === 'patrimoine') {
        console.log('🔄 CMS content updated, refreshing patrimoine page...', updatedPath);
        loadContent();
      }
    };

    window.addEventListener('cmsContentUpdated', handleCMSUpdate);

    // Polling fallback: check for updates every 10 seconds when page is visible
    const pollInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadContent();
      }
    }, 10000);

    return () => {
      window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
      clearInterval(pollInterval);
    };
  }, []);

  // Show loading state if content is being fetched
  if (loading) {
    return (
      <>
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
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* Hero Section - Deux cartes */}
      <section className="relative w-full min-h-[650px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Carte gauche */}
            <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
              <h1 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8 tracking-tight text-center">
                {content.hero?.cardLeft?.title || "Bien gérer son patrimoine en 2025, c'est anticiper, structurer et transmettre"}
              </h1>
              
              <div className="space-y-5 mb-10">
                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed text-center">
                  {content.hero?.cardLeft?.paragraph1 || "Une bonne gestion de patrimoine ne se résume pas à faire fructifier son épargne."}
                </p>
                
                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed text-center">
                  {content.hero?.cardLeft?.paragraph2 || "Elle repose sur une approche globale et exclusive qui intègre la protection de la famille, la stratégie de transmission, l'optimisation fiscale, des placements performants, une structuration juridique et l'anticipation des risques."}
                </p>
                
                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed text-center">
                  {content.hero?.cardLeft?.paragraph3 || "Notre équipe de conseillers en gestion de patrimoine indépendants vous accompagne pour bâtir une stratégie personnalisée et cohérente avec vos objectifs de vie."}
                </p>
                
                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed text-center">
                  {content.hero?.cardLeft?.paragraph4 || "Que vous soyez chef d'entreprise, héritier, expatrié ou jeune investisseur, nous vous guidons avec clarté."}
                </p>
              </div>
              
              <div className="mt-10">
                <button 
                  onClick={() => window.open(content.hero?.cardLeft?.buttonUrl || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#253F60] text-white px-10 py-4 rounded-lg shadow-lg font-inter font-semibold text-base lg:text-lg hover:bg-[#1a2d47] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {content.hero?.cardLeft?.buttonText || "Faire mon bilan patrimonial"}
                </button>
              </div>
            </div>
            
            {/* Carte droite */}
            <div className="relative bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
              {/* Badge circulaire dans le coin */}
              <div className="absolute -top-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full shadow-lg flex flex-col items-center justify-center text-center z-10">
                <div className="text-white font-source-sans font-semibold text-xs sm:text-sm lg:text-base leading-tight px-2">
                  <span className="block">{content.hero?.cardRight?.badge?.line1 || "Votre 1er"}</span>
                  <span className="block mt-1">{content.hero?.cardRight?.badge?.line2 || "Diagnostique"}</span>
                  <span className="block mt-1 font-bold">{content.hero?.cardRight?.badge?.line3 || "offert"}</span>
                </div>
              </div>
              
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8 tracking-tight text-center">
                {content.hero?.cardRight?.title || "Votre patrimoine mérite une stratégie claire et durable"}
              </h2>
              
              <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed mb-8 text-center">
                {content.hero?.cardRight?.description || "Chez Azalée Patrimoine, nous vous aidons à construire un avenir financier solide grâce à une approche personnalisée et des solutions adaptées à vos besoins spécifiques."}
              </p>
              
              {/* Liste à puces avec checkmarks */}
              <ul className="space-y-5">
                {(content.hero?.cardRight?.features || ["Optimisation fiscale", "Protection de la famille", "Transmission sereine"]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <svg className="w-6 h-6 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#374151] text-base sm:text-lg font-inter font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section : En quelques mots - Comprendre la gestion de patrimoine */}
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            {content.enQuelquesMots?.title || "En quelques mots : comprendre la gestion de patrimoine"}
          </h2>
          
          <div className="max-w-5xl mx-auto space-y-8 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
            <p className="text-xl sm:text-2xl">
              <strong className="text-[#253F60] font-bold">La gestion de patrimoine</strong> {content.enQuelquesMots?.paragraph1 || "structurer, valoriser et transmettre un ensemble de biens (immobilier, placements financiers, liquidités, entreprise, objets de valeur)."}
            </p>
            
            <p>
              {content.enQuelquesMots?.paragraph2 || "Consulter un conseiller en gestion de patrimoine indépendant permet de prendre des décisions éclairées en intégrant les aspects fiscaux, juridiques, financiers et familiaux."}
            </p>
            
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-l-4 border-[#B99066] p-8 rounded-xl shadow-lg">
              <p className="mb-6 text-xl">
                <strong className="text-[#253F60]"><a href="#bilan-patrimonial" className="text-[#B99066] hover:text-[#A67A5A] underline font-semibold transition-colors">Le bilan patrimonial</a></strong> {content.enQuelquesMots?.bilanPatrimonial?.title || "point de départ pour une stratégie personnalisée :"}
              </p>
              <ul className="list-none space-y-3 ml-2 text-[#374151]">
                {(content.enQuelquesMots?.bilanPatrimonial?.items || []).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#B99066] font-bold mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
            
            <p>
              <strong className="text-[#253F60] font-semibold">Chez Azalée Patrimoine</strong>, {content.enQuelquesMots?.accompagnement?.title || "nous vous accompagnons pour :"}
            </p>
            <ul className="list-none space-y-4 ml-2">
              {(content.enQuelquesMots?.accompagnement?.items || []).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#253F60] font-bold mt-1">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            
            <p className="pt-6 text-xl sm:text-2xl font-medium">
              {content.enQuelquesMots?.conclusion || (
                <>
                  Notre approche repose sur la clarté, la pédagogie et l'indépendance. <br className="hidden sm:block" />
                  <span className="block mt-2">L'objectif : transformer le patrimoine en levier de sérénité et de performance sur le long terme.</span>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Section : Définition de la gestion de patrimoine */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            {content.definition?.title || "Définition de la gestion de patrimoine"}
          </h2>
          
          <div className="max-w-5xl mx-auto space-y-8 text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed">
            <p className="text-xl sm:text-2xl">
              {content.definition?.intro || "La gestion de patrimoine est une discipline transversale qui consiste à analyser, organiser, valoriser et transmettre l'ensemble des actifs d'une personne ou d'une entreprise — qu'ils soient immobiliers, financiers, professionnels ou familiaux — en tenant compte de leurs objectifs personnels, fiscaux et successoraux."}
            </p>
            
            <p>
              {content.definition?.paragraph1 || "Contrairement à une idée reçue, le métier de conseiller en gestion de patrimoine (CGP) n'est pas réglementé en tant que tel, mais il regroupe plusieurs statuts professionnels encadrés par la loi, chacun répondant à des compétences spécifiques :"}
            </p>
            
            <div className="space-y-8 mt-10">
              {(content.definition?.statuts || []).map((statut, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border-l-4 border-[#253F60] shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-4">
                    {statut.title}
                  </h3>
                  <p className="text-lg" dangerouslySetInnerHTML={{ __html: processHTMLForRender(statut.description) }} />
                </div>
              ))}
            </div>
            
            <p className="pt-6">
              {content.definition?.paragraph2 || "En pratique, un CGP expérimenté combine souvent plusieurs de ces statuts pour offrir une vision globale et cohérente de la situation de ses clients."}
            </p>
            
            <p>
              {content.definition?.paragraph3 || "Son rôle est avant tout d'accompagner, de conseiller et d'anticiper, en s'appuyant sur une approche personnalisée qui intègre :"}
            </p>
            
            <ul className="list-none space-y-4 ml-2 mt-6">
              {(content.definition?.domaines || []).map((domaine, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-[#B99066] text-2xl font-bold mt-1">➤</span>
                  <span className="text-lg" dangerouslySetInnerHTML={{ __html: processHTMLForRender(domaine) }} />
                </li>
              ))}
            </ul>
            
            {/* Boîte de résumé */}
            <div className="mt-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] text-white p-10 rounded-2xl shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-cairo font-bold mb-6">
                {content.definition?.resume?.title || "En résumé :"}
              </h3>
              <p className="text-xl sm:text-2xl leading-relaxed font-light">
                {content.definition?.resume?.text || "la gestion de patrimoine, c'est l'art de faire dialoguer le juridique, le fiscal et le financier pour créer de la valeur et de la sérénité sur le long terme."}
              </p>
            </div>
            </div>
          </div>
        </section>

      {/* Section : Pourquoi faire appel à un conseiller en gestion de patrimoine indépendant */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            {content.pourquoiCGP?.title || "Pourquoi faire appel à un conseiller en gestion de patrimoine indépendant ?"}
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-[#4B5563] text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed mb-12 text-center">
              {content.pourquoiCGP?.intro || "Un CGP est votre copilote pour prendre les bonnes décisions patrimoniales. Il apporte une vision à 360° sur votre situation, en prenant en compte vos revenus, votre patrimoine immobilier et financier, votre environnement fiscal, familial et professionnel."}
            </p>
            
            {/* Grille de cartes - Desktop et Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {(content.pourquoiCGP?.points || []).map((point, index) => {
                // Icônes spécifiques pour chaque point - Uniformisées w-8 h-8 avec alternance de couleurs
                const getIcon = (idx) => {
                  // Alternance de couleurs : index pair = bleu, index impair = or
                  const iconColor = idx % 2 === 0 ? 'text-[#253F60] group-hover:text-[#B99066]' : 'text-[#B99066] group-hover:text-[#253F60]';
                  
                  const icons = [
                    // Structuration patrimoniale globale
                    <svg key={idx} className={`w-8 h-8 ${iconColor} transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>,
                    // Optimisation fiscale et transmission
                    <svg key={idx} className={`w-8 h-8 ${iconColor} transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>,
                    // Accès à des solutions haut de gamme
                    <svg key={idx} className={`w-8 h-8 ${iconColor} transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>,
                    // Suivi personnalisé et réactif
                    <svg key={idx} className={`w-8 h-8 ${iconColor} transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ];
                  return icons[idx] || icons[0];
                };

                return (
                  <div 
                    key={index} 
                    className="relative bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 overflow-hidden"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Icône */}
                    <div className="mb-6">
                      {getIcon(index)}
                    </div>
                    
                    {/* Texte */}
                    <h3 className="text-[#253F60] text-lg sm:text-xl font-inter font-bold leading-relaxed relative z-10">
                      {point}
                    </h3>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </section>

      {/* Section : L'inventaire patrimonial */}
      <section id="bilan-patrimonial" className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
            {content.auditPatrimonial?.title || "L'inventaire patrimonial : la base de toute stratégie"}
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-[#4B5563] text-lg sm:text-xl lg:text-2xl font-inter leading-relaxed mb-12 text-center">
              {content.auditPatrimonial?.intro || "Notre accompagnement commence par un inventaire patrimonial gratuit. Ce diagnostic complet permet de dresser une cartographie de vos actifs et passifs, d'analyser votre situation juridique et fiscale, puis de construire un plan d'action réaliste et optimisé."}
            </p>
            
            <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-8 text-center">
              {content.auditPatrimonial?.stepsTitle || "Étapes de l'inventaire patrimonial"}
            </h3>
            
            {/* Stepper - 6 étapes */}
            <div className="w-full py-12 mb-12">
              <div className="relative max-w-6xl mx-auto px-4">
                {/* Ligne de connexion horizontale - Desktop uniquement */}
                <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-gray-300 z-0"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
                  {(content.auditPatrimonial?.steps || []).map((step, index) => {
                    // Dégradé progressif du bleu Azalée (#253F60) vers l'or Azalée (#B99066)
                    const colors = [
                      { from: '#253F60', to: '#1e3a52' },     // Étape 1 - Bleu Azalée pur
                      { from: '#2d4a6b', to: '#3d5a6b' },     // Étape 2 - Bleu légèrement éclairci
                      { from: '#3d5a6b', to: '#5a6b7a' },     // Étape 3 - Bleu-gris
                      { from: '#5a6b7a', to: '#7a8a7a' },     // Étape 4 - Gris-bleu vers gris
                      { from: '#8a7a6a', to: '#9a8a6a' },     // Étape 5 - Gris vers beige
                      { from: '#B99066', to: '#A67A5A' }      // Étape 6 - Or Azalée pur
                    ];
                    const stepColor = colors[index] || colors[0];
                    
                    return (
                      <div key={index} className="relative flex flex-col items-center">
                        <div 
                          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white mb-4 hover:scale-110 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${stepColor.from} 0%, ${stepColor.to} 100%)`
                          }}
                        >
                          <span className="text-white font-bold text-xl">{index + 1}</span>
                        </div>
                        <div className="w-full bg-white rounded-lg shadow-lg p-4 border-2 border-gray-100 hover:border-[#B99066] transition-all duration-300">
                          <p className="text-sm font-inter font-semibold text-[#253F60] text-center leading-tight">
                            {step}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Bouton CTA */}
            <div className="text-center mt-12">
            <button 
              onClick={() => window.open(content.auditPatrimonial?.buttonUrl || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#253F60] text-white px-10 py-4 rounded-lg shadow-lg font-inter font-bold text-lg hover:bg-[#1a2d47] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
                {content.auditPatrimonial?.buttonText || "Inventaire patrimonial gratuit"}
            </button>
            </div>
            </div>
          </div>
        </section>

      {/* Section : Nos expertises pour structurer et valoriser votre patrimoine */}
      <section className="w-full bg-[#253F60] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            {content.expertises?.title || "Nos expertises pour structurer et valoriser votre patrimoine"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(content.expertises?.services || []).map((service, index) => {
              // Fonction pour mapper les titres aux URLs
              const getServiceUrl = (title) => {
                const titleLower = title?.toLowerCase() || '';
                if (titleLower.includes('succession') || titleLower.includes('héritage')) {
                  return '/patrimoine/succession-heritage';
                } else if (titleLower.includes('donation') && titleLower.includes('gratuit')) {
                  return '/patrimoine/donation-gratuite';
                } else if (titleLower.includes('donation') && (titleLower.includes('onéreux') || titleLower.includes('onereux'))) {
                  return '/patrimoine/donation-onereuse';
                } else if (titleLower.includes('transmission')) {
                  return '/patrimoine/transmission';
                } else if (titleLower.includes('protection') || titleLower.includes('famille')) {
                  return '/patrimoine/protection-famille';
                } else if (titleLower.includes('bilan')) {
                  return '/patrimoine/bilan';
                } else if (titleLower.includes('conseil')) {
                  return '/patrimoine/conseils';
                } else {
                  return '/patrimoine/autre';
                }
              };
              
              const serviceUrl = getServiceUrl(service.title);
              
              return (
                <Link key={index} href={serviceUrl}>
                  <div 
                    className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Effet de brillance au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}

            {/* Service 2: Donation à titre gratuit */}
            <Link href="/patrimoine/donation-gratuite">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Donation à titre gratuit
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Profitez des abattements renouvelables tous les 15 ans pour transmettre sans fiscalité excessive. Nous vous aidons à choisir le bon moment, les bons bénéficiaires et le bon montage (pleine propriété, nue-propriété, démembrement).
                </p>
              </div>
            </Link>
            
            {/* Service 3: Donation à titre onéreux */}
            <Link href="/patrimoine/donation-onereuse">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Donation à titre onéreux
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Rééquilibrez une succession, compensez des déséquilibres familiaux ou financez un projet avec des dispositifs fiscaux adaptés.
                </p>
              </div>
            </Link>
            
            {/* Service 4: Transmission de patrimoine */}
            <Link href="/patrimoine/transmission">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Transmission de patrimoine
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Nous mettons en œuvre les meilleures solutions (assurance-vie, SCI, pacte Dutreil, démembrement, holding patrimoniale) pour vous permettre de transmettre dans la sérénité et en toute sécurité.
                </p>
              </div>
            </Link>
            
            {/* Service 5: Protection de la famille */}
            <Link href="/patrimoine/protection-famille">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Protection de la famille
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Anticipez les aléas de la vie : décès, divorce, incapacité. Nos solutions couvrent la clause bénéficiaire sur-mesure, le mandat de protection future, le choix du régime matrimonial.
                </p>
              </div>
            </Link>
            
            {/* Service 6: Bilan patrimonial */}
            <Link href="/patrimoine/bilan">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Bilan patrimonial
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Un état des lieux personnalisé et confidentiel, base indispensable pour toute stratégie de croissance ou de transmission.
                </p>
              </div>
            </Link>
            
            {/* Service 7: Conseils patrimoniaux sur-mesure */}
            <Link href="/patrimoine/conseils">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Conseils patrimoniaux sur-mesure
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Dirigeants, professions libérales, héritiers : chaque profil mérite une stratégie ajustée et évolutive. Nos conseils intègrent vos objectifs, vos contraintes et votre horizon.
                </p>
              </div>
            </Link>
            
            {/* Service 8: Patrimoines complexes */}
            <Link href="/patrimoine/autre">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.7s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Patrimoines complexes
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Indivision, expatriation, fiscalité internationale, résidences multiples : nos experts vous guident sur des montages adaptés et conformes à la réglementation.
                </p>
              </div>
            </Link>
            
            {/* Service 9: Financement patrimonial */}
            <Link href="/patrimoine/autre">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.8s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Financement patrimonial
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Utilisez l'effet de levier du crédit pour développer votre patrimoine : crédit lombard, OBO, financement locatif ou refinancement.
                </p>
              </div>
            </Link>
            
            {/* Service 10: Produits structurés & alternatifs */}
            <Link href="/placements">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 0.9s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Produits structurés & alternatifs
            </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Accédez à des placements sur-mesure : produits structurés, private equity, ETF, capital-investissement, énergies renouvelables.
                </p>
              </div>
            </Link>
            
            {/* Service 11: Fiscalité et expatriation */}
            <Link href="/patrimoine/autre">
              <div 
                className="group relative bg-transparent border-2 border-white/20 rounded-xl p-6 hover:border-[#B99066] hover:bg-white/5 hover:shadow-2xl hover:shadow-[#B99066]/20 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
                style={{ animation: 'fadeInUp 0.6s ease-out 1s both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <h3 className="text-white text-xl font-cairo font-bold mb-3 group-hover:text-[#B99066] transition-colors duration-300">
                  Fiscalité et expatriation
                </h3>
                <p className="text-white/90 text-sm font-inter leading-relaxed group-hover:text-white transition-colors duration-300">
                  Nous accompagnons aussi les non-résidents dans leur structuration patrimoniale en tenant compte des conventions fiscales internationales.
                </p>
              </div>
            </Link>
          </div>
          
          {/* Bouton CTA */}
          <div className="mt-12 flex justify-end">
            <button 
              onClick={() => window.open(content.expertises?.buttonUrl || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
              className="bg-[#B99066] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-lg hover:bg-[#A67A5A] hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              {content.expertises?.buttonText || "Je prends rdv"}
            </button>
            </div>
          </div>
        </section>

      {/* Section : Cas concrets de stratégies patrimoniales */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
            {content.casConcrets?.title || "Cas concrets de stratégies patrimoniales"}
          </h2>
                
          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center">
              {content.casConcrets?.intro || "La gestion de patrimoine et la transmission nécessitent des solutions sur-mesure, adaptées à vos objectifs, à l'âge de vos bénéficiaires et à vos contraintes fiscales. Voici trois profils représentatifs pour illustrer comment structurer efficacement une stratégie patrimoniale pour les familles françaises d'aujourd'hui."}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-12">
            {(content.casConcrets?.cas || []).map((cas, index) => (
              <div key={index} className={`bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 border-l-4 border-[#253F60] shadow-lg`}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index === 1 ? 'order-2 lg:order-1' : ''}>
                    <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-4">
                      {cas.name}
                    </h3>
                    <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                      {cas.situation}
                    </p>
                    <div className="space-y-2">
                      <p className="text-[#253F60] font-semibold mb-3">Mise en œuvre :</p>
                      <ul className="list-none space-y-2 text-[#4B5563] text-sm sm:text-base">
                        {(cas.miseEnOeuvre || []).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#B99066] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={`flex justify-center ${index === 1 ? 'order-1 lg:order-2' : ''}`}>
                    <div className="relative w-full max-w-md group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#253F60] via-[#B99066] to-[#253F60] rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img 
                        src={cas.image} 
                        alt={cas.name}
                        className="relative w-full h-64 object-cover rounded-xl shadow-2xl border-4 border-white ring-4 ring-[#B99066] ring-opacity-50 group-hover:ring-opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Résumé visuel - 3 boîtes */}
          <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(content.casConcrets?.cas || []).map((cas, index) => cas.resume && (
              <div key={index} className="bg-[#253F60] rounded-xl p-6 shadow-xl border-2 border-[#1a2d47]">
                <h4 className="text-white text-xl font-cairo font-bold mb-4">
                  {cas.resume.title}
                </h4>
                <p className="text-[#B99066] font-semibold mb-4 text-lg">
                  {cas.resume.subtitle}
                </p>
                <ul className="list-none space-y-2 text-white/90 text-sm">
                  {(cas.resume.points || []).map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#B99066] mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Résumé et CTA */}
          <div className="max-w-5xl mx-auto mt-16 space-y-6">
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center">
              {content.casConcrets?.conclusion1 || "Ces trois situations illustrent parfaitement la diversité des approches patrimoniales selon les cycles de vie."}
            </p>
            
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center">
              {content.casConcrets?.conclusion2 || "Chaque stratégie combine plusieurs outils juridiques et fiscaux pour maximiser l'efficacité de la transmission."}
            </p>
            
            <div className="text-center mt-10">
              <button 
                onClick={() => window.open(content.casConcrets?.buttonUrl || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-[#253F60] text-white px-10 py-4 rounded-lg shadow-xl font-inter font-bold text-lg hover:bg-[#1a2d47] hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                {content.casConcrets?.buttonText || "Je contacte un expert pour analyser ma situation"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section : Simuler pour mieux décider */}
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
            {content.simulateurs?.title || "Simuler pour mieux décider"}
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center mb-8">
              <strong className="text-[#253F60] font-bold">Nos simulateurs patrimoniaux</strong> vous permettent de visualiser :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {(content.simulateurs?.items || []).map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#B99066] transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-[#253F60] text-lg font-cairo font-bold mb-2">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 border-l-4 border-[#B99066] p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-[#4B5563] text-base sm:text-lg font-inter">
                  <strong className="text-[#253F60]">Bientôt disponible en ligne :</strong> {content.simulateurs?.note || "simulateur succession, tableau de bord patrimonial, simulateur d'IFI, comparatif assurance-vie vs capitalisation."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section : Pourquoi choisir Azalée Patrimoine ? */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            {content.pourquoiAzalee?.title || "Pourquoi choisir Azalée Patrimoine ?"}
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {(content.pourquoiAzalee?.points || []).map((point, index) => (
                <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <svg className="w-7 h-7 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(point) }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section : Qui sont les autres professionnels qui vous conseillent sur votre patrimoine ? */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-8 sm:mb-12 text-center tracking-tight">
            {content.autresProfessionnels?.title || "Qui sont les autres professionnels qui vous conseillent sur votre patrimoine ?"}
          </h2>
          
          <div className="max-w-5xl mx-auto space-y-8 mb-12">
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center">
              {content.autresProfessionnels?.intro1 || "La gestion de patrimoine ne se fait pas en vase clos."}
            </p>
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center">
              {content.autresProfessionnels?.intro2 || "Pour vous offrir un accompagnement complet et cohérent, le conseiller en gestion de patrimoine collabore étroitement avec d'autres professionnels du droit, de la finance et de l'immobilier."}
            </p>
            <p className="text-[#4B5563] text-lg sm:text-xl font-inter leading-relaxed text-center">
              {content.autresProfessionnels?.intro3 || "Chacun joue un rôle spécifique dans la protection, la valorisation et la transmission de votre patrimoine."}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-12">
            {(content.autresProfessionnels?.professionnels || []).map((prof, index) => {
              // Fonction pour obtenir l'icône appropriée selon le professionnel
              const getIcon = (title) => {
                const titleLower = title?.toLowerCase() || '';
                
                if (titleLower.includes('notaire')) {
                  // Icône Notaire - Document avec sceau
                  return (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  );
                } else if (titleLower.includes('avocat') || titleLower.includes('fiscaliste')) {
                  // Icône Avocat - Balance de justice
                  return (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  );
                } else if (titleLower.includes('comptable') || titleLower.includes('expert-comptable')) {
                  // Icône Expert-comptable - Calculatrice
                  return (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  );
                } else if (titleLower.includes('banquier') || titleLower.includes('banque')) {
                  // Icône Banquier - Bâtiment bancaire
                  return (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  );
                } else if (titleLower.includes('courtier')) {
                  // Icône Courtier - Clé
                  return (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  );
                } else {
                  // Icône par défaut - Document
                  return (
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  );
                }
              };
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#253F60] hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-lg flex items-center justify-center">
                      {getIcon(prof.title)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-4">
                        {prof.title}
                      </h3>
                      <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(prof.description) }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Section : FAQ Gestion de patrimoine */}
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            {content.faq?.title || "FAQ Gestion de patrimoine"}
          </h2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            {(content.faq?.questions || []).map((qa, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#253F60] hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
                  {qa.question}
                </h3>
                {typeof qa.answer === 'string' ? (
                  <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(qa.answer) }} />
                ) : (
                  <div className="space-y-4">
                    {qa.answer.map((paragraph, i) => (
                      <p key={i} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section : Travaillez-vous avec des expatriés ? */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 border-l-4 border-[#253F60] shadow-lg">
              <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6">
                {content.expatries?.title || "Travaillez-vous avec des expatriés ?"}
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                {content.expatries?.content || "Oui, nous accompagnons les expatriés français et les non-résidents dans leur gestion de patrimoine. Nous prenons en compte les conventions fiscales internationales, les régimes de résidence fiscale et les spécificités de chaque pays pour vous proposer des solutions adaptées."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section : Aller plus loin avec Azalée Patrimoine */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            Aller plus loin avec Azalée Patrimoine
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/placements" className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#B99066] hover:border-[#A67C52] hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
                <svg className="w-8 h-8 text-[#B99066] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-[#253F60] text-lg font-inter font-semibold group-hover:text-[#B99066] transition-colors">
                  Placements financiers
                </span>
              </a>
              
              <a href="/fiscalite" className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#B99066] hover:border-[#A67C52] hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
                <svg className="w-8 h-8 text-[#B99066] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-5m-6 5h.01M19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V21z" />
                </svg>
                <span className="text-[#253F60] text-lg font-inter font-semibold group-hover:text-[#B99066] transition-colors">
                  Fiscalité du patrimoine
                </span>
              </a>
              
              <a href="/immobilier" className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#B99066] hover:border-[#A67C52] hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
                <svg className="w-8 h-8 text-[#B99066] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-[#253F60] text-lg font-inter font-semibold group-hover:text-[#B99066] transition-colors">
                  Immobilier & SCPI
                </span>
              </a>
              
              <a href="/retraite" className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#B99066] hover:border-[#A67C52] hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
                <svg className="w-8 h-8 text-[#B99066] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[#253F60] text-lg font-inter font-semibold group-hover:text-[#B99066] transition-colors">
                  Retraite
                </span>
              </a>
              
              <a href="https://calendly.com/rdv-azalee-patrimoine/30min" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#B99066] hover:border-[#A67C52] hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
                <svg className="w-8 h-8 text-[#B99066] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-[#253F60] text-lg font-inter font-semibold group-hover:text-[#B99066] transition-colors">
                  Simulateurs
                </span>
              </a>
              
              <a href="/notre-approche" className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#B99066] hover:border-[#A67C52] hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
                <svg className="w-8 h-8 text-[#B99066] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.503-1.135-2.01M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.503 1.135-2.01m0 0A5.002 5.002 0 0112 13c1.242 0 2.4.402 3.332 1.09M9 9a3 3 0 116 0m-6 0a3 3 0 106 0m-6 0a3 3 0 106 0" />
                </svg>
                <span className="text-[#253F60] text-lg font-inter font-semibold group-hover:text-[#B99066] transition-colors">
                  Qui sommes-nous ?
                </span>
              </a>
                </div>
            </div>
          </div>
        </section>

      {/* Section : Rencontrer un conseiller - Carte de France */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-12 sm:mb-16 text-center tracking-tight">
            {content.localisation?.title || "Rencontrer un conseiller en gestion de patrimoine"}
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Carte de France à gauche - avec dégradé professionnel */}
              <div className="relative w-full">
                <div className="relative w-full rounded-xl overflow-hidden shadow-xl bg-white">
                  {/* Container avec dégradé appliqué directement sur la forme de la carte */}
                  <div 
                    className="relative w-full"
                    role="img"
                    aria-label={`Carte de France montrant la couverture nationale d'Azalée Patrimoine. Nos conseillers en gestion de patrimoine sont disponibles dans toutes les villes de France : ${villesFrance}. Trouvez un conseiller près de chez vous, partout en France métropolitaine.`}
                    title={`Azalée Patrimoine - Conseillers en gestion de patrimoine disponibles dans toutes les villes de France : ${villesFrance}`}
                    style={{ 
                      filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))',
                      background: 'linear-gradient(135deg, #253F60 0%, #4a6b8a 30%, #7a8a7a 60%, #B99066 100%)',
                      WebkitMaskImage: 'url(/images/azalee-patrimoine-france.svg)',
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: 'url(/images/azalee-patrimoine-france.svg)',
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      aspectRatio: '596.41547 / 584.5448',
                      minHeight: '400px'
                    }}
                  />
                </div>
              </div>
              
              {/* Carte informative à droite */}
              <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 text-white">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                    {content.localisation?.cardTitle || "Disponible partout en France"}
                  </h3>
                  <p className="text-white/90 text-lg sm:text-xl font-inter leading-relaxed mb-8">
                    {content.localisation?.cardDescription || "Nos conseillers en gestion de patrimoine sont présents partout en France pour vous accompagner dans votre projet patrimonial, où que vous soyez."}
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-base font-inter">Conseil personnalisé près de chez vous</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-base font-inter">Rendez-vous en présentiel ou à distance</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 rounded-lg p-4">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-base font-inter">Expertise locale et nationale</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => window.open(content.localisation?.buttonUrl || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                    className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-lg hover:bg-white/90 hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {content.localisation?.buttonText || "Planifiez votre consultation gratuite"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
} 