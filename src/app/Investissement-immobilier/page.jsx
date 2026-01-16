"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function InvestissementImmobilierPage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Use static content - no API calls
        let cmsSections = [];

        // Default content that matches ALL CMS sections
        const defaultContent = {
          hero: {
            title: "Investissement Immobilier – Faites fructifier votre patrimoine avec Azalee Wealth",
            subtitle: "Votre partenaire de confiance en stratégie immobilière depuis plus de 30 ans. Nous vous accompagnons pour valoriser votre patrimoine, sécuriser vos investissements, et bâtir des solutions d'investissement sur mesure, adaptées à vos objectifs.",
            ctaButton: "Demander une étude patrimoniale gratuite"
          },
          services: {
            servicesTitle: "Une approche stratégique de votre investissement immobilier",
            servicesList: [
              {
                title: "Analyse personnalisée de votre situation patrimoniale",
                description: "Nous évaluons votre profil investisseur, vos objectifs de rendement et vos projets pour identifier les meilleures opportunités d'investissement immobilier.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-analysis-image-45db43.webp",
                bgColor: "#253F60"
              },
              {
                title: "Optimisation fiscale de vos investissements immobiliers",
                description: "Nous structurons vos opérations immobilières afin d'optimiser la rentabilité et les avantages fiscaux, en intégrant dispositifs légaux et stratégies patrimoniales.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-tax-image-74349c.webp",
                bgColor: "#EDEDED"
              },
              {
                title: "Accompagnement global sur la gestion et la fiscalité",
                description: "Nos experts vous accompagnent dans la structuration, la gestion juridique et fiscale, ainsi que dans la déclaration de vos investissements, en toute conformité.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-management-image-67c728.webp",
                bgColor: "#EDEDED"
              },
              {
                title: "Stratégie patrimoniale intégrée projets immobiliers",
                description: "Nous alignons vos investissements immobiliers avec votre stratégie globale de patrimoine pour sécuriser vos actifs, anticiper la transmission et optimiser la fiscalité successorale.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-strategy-image-6274ef.webp",
                bgColor: "#EDEDED"
              }
            ]
          },
          expertise: {
            expertiseTitle: "Nos domaines d'expertise en fiscalité immobilière et patrimoniale",
            expertiseList: [
              {
                title: "Optimisation fiscale immobilière",
                description: "Nous vous accompagnons dans la gestion fiscale de vos investissements immobiliers pour maximiser vos revenus fonciers et valoriser votre patrimoine. Nos solutions : structuration en SCI, LMNP/LMP, déficit foncier, démembrement, investissements en immobilier locatif.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-tax-optimization.webp",
                bgColor: "#253F60"
              },
              {
                title: "Stratégies de défiscalisation patrimoniale",
                description: "Profitez des dispositifs légaux pour réduire votre pression fiscale et pérenniser vos actifs. Nous intervenons sur : défiscalisation immobilière, investissements loi Girardin, Malraux, PER, holding patrimoniale.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-defiscalization.webp",
                bgColor: "#EDEDED"
              },
              {
                title: "Fiscalité professionnelle & investissement",
                description: "Conseil sur-mesure pour chefs d'entreprise, dirigeants et professions libérales souhaitant développer ou sécuriser leur patrimoine professionnel et personnel.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-professional.webp",
                bgColor: "#EDEDED"
              },
              {
                title: "Transmission, donation & gestion successorale",
                description: "Nous vous aidons à anticiper la transmission de vos biens avec des solutions fiscales adaptées pour optimiser les donations et protéger vos héritiers.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-transmission.webp",
                bgColor: "#EDEDED"
              }
            ]
          },
          fiscalSolutions: {
            fiscalTitle: "Nos solutions fiscales pour vos investissements immobiliers",
            fiscalSolutions: [
              {
                title: "Investissement locatif neuf (Loi Pinel)",
                description: "Bénéficiez d'une réduction d'impôt en investissant dans l'immobilier neuf destiné à la location, sous conditions de durée et de plafonds de loyers.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-pinel-bg-8b82a6.webp",
                icon: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-pinel-icon.webp",
                bgColor: "#253F60"
              },
              {
                title: "Location meublée (Statut LMNP / LMP)",
                description: "Optimisez votre fiscalité grâce à la location meublée, avec amortissement des biens et régime fiscal allégé sur les revenus locatifs.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-lmnp-bg-51a138.webp",
                icon: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-lmnp-icon.webp",
                bgColor: "#EDEDED"
              },
              {
                title: "Déficit foncier sur vos revenus",
                description: "Réduisez votre imposition en déduisant le montant des travaux de rénovation ou d'entretien de vos revenus fonciers.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-deficit-bg-1b3fc2.webp",
                icon: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-deficit-icon.webp",
                bgColor: "#EDEDED"
              },
              {
                title: "Valorisation de l'immobilier ancien",
                description: "Profitez d'avantages fiscaux attractifs en rénovant des biens classés ou situés dans des secteurs sauvegardés, tout en valorisant votre patrimoine.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-valorisation-bg-1b3fc2.webp",
                icon: "/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-valorisation-icon.webp",
                bgColor: "#EDEDED"
              }
            ]
          },
          wealthBuilding: {
            wealthTitle: "Construire et valoriser son patrimoine immobilier",
            wealthIntro: "Se constituer un patrimoine solide, c'est préparer l'avenir avec sérénité. Qu'il s'agisse d'investissements immobiliers ou de placements financiers, développer son patrimoine offre des revenus complémentaires, améliore son confort de vie, et sécurise l'avenir de ses proches.",
            patrimonialForms: [
              "Investissements immobiliers ou financiers",
              "Biens professionnels",
              "Actifs mobiliers",
              "Droits d'usufruit",
              "Droits de propriété intellectuelle",
              "Droits à la retraite et rentes"
            ],
            wealthAdvisorTitle: "Pourquoi faire appel à un conseiller patrimonial ?",
            wealthAdvisorText: "Nos experts en gestion de patrimoine vous accompagnent pour bâtir une stratégie personnalisée qui sécurise votre avenir et celui de vos proches. Vous vous assurez : Un patrimoine durable et transmissible, La protection financière de votre conjoint et de vos héritiers, La certitude que vos proches disposeront d'un patrimoine solide en cas de coup dur.",
            wealthAssessmentTitle: "Votre bilan patrimonial personnalisé",
            wealthAssessmentText: "Grâce à un audit complet, nos conseillers vous orientent vers les solutions les plus adaptées à vos objectifs : Investissement immobilier : Sécuriser et faire fructifier votre patrimoine dans la durée, Placements financiers : Générer des revenus et profiter d'avantages fiscaux, Solutions de prévoyance : Protéger vos proches avec des dispositifs avantageux.",
            administrativeSupport: "Nous vous accompagnons également dans toutes vos démarches administratives pour simplifier la gestion et la constitution de votre patrimoine."
          },
          retirementPlanning: {
            retirementTitle: "Anticiper votre retraite en toute sérénité",
            retirementIntro: "Assurez votre avenir financier avec des solutions d'investissement immobilier adaptées.",
            retirementContent: "Nos conseillers en gestion de patrimoine vous accompagnent pour préparer sereinement votre retraite et maintenir votre niveau de vie une fois la vie professionnelle terminée.",
            investmentBenefits: [
              "Garantir des revenus complémentaires stables",
              "Préserver votre pouvoir d'achat à long terme",
              "Anticiper les aléas de santé et les dépenses imprévues"
            ],
            retirementConclusion: "Parce que la retraite se prépare bien avant le dernier jour travaillé, nous mettons en place des stratégies patrimoniales solides, afin que vous puissiez profiter pleinement de cette nouvelle étape de vie."
          },
          retirementContinuation: {
            continuationTitle: "Préparer votre retraite, c'est sécuriser votre avenir financier",
            continuationIntro: "Anticiper votre retraite, c'est vous garantir des revenus complémentaires au moment voulu, tout en profitant d'avantages fiscaux pendant votre activité professionnelle.",
            insuranceLife: "Certains placements, comme l'assurance-vie, permettent aussi de protéger vos proches en cas de décès.",
            otherSolutions: "D'autres solutions — comme le Plan d'Épargne Retraite (PER) ou les dispositifs dédiés aux indépendants comme la Loi Madelin — peuvent, selon votre situation, compenser les limites des régimes obligatoires et renforcer vos revenus futurs.",
            continuationConclusion: "Pour vivre sereinement votre retraite, il est essentiel de définir une stratégie d'investissement adaptée à vos projets et à votre profil."
          },
          heritageTransmission: {
            transmissionTitle: "Transmettre votre patrimoine en toute sérénité",
            transmissionIntro: "Anticiper la transmission de son patrimoine est une démarche essentielle pour protéger ses proches et garantir la pérennité de vos biens.",
            delicateSubject: "Bien souvent, ce sujet délicat est repoussé, alors qu'il permet pourtant d'éviter de lourdes charges fiscales et des conflits familiaux lors de la succession.",
            familyProtection: "Que ce soit pour assurer la protection de votre conjoint, de vos enfants ou de vos héritiers dans le cadre d'une famille recomposée, la transmission planifiée offre des solutions adaptées à chaque situation.",
            realEstateInvestment: "Investir dans l'immobilier s'avère un excellent levier pour transmettre un patrimoine durable, avec la possibilité de bénéficier d'avantages fiscaux sur les donations ou successions.",
            propertyTypes: "Qu'il s'agisse de votre résidence principale ou d'un bien locatif générant des revenus, vous valorisez ainsi votre capital tout en préparant l'avenir de vos héritiers.",
            additionalStrategies: "La prévoyance retraite et certaines solutions d'épargne patrimoniale complètent ces stratégies, en renforçant la sécurité financière de votre entourage.",
            expertAdvice: "Notre conseil : anticipez et organisez votre transmission pour préserver votre patrimoine, optimiser votre fiscalité successorale et assurer la sérénité de vos proches."
          },
          familyProtection: {
            protectionTitle: "Protéger ses proches et anticiper l'imprévu",
            protectionIntro: "Assurer la sécurité financière de ses proches face aux aléas de la vie fait partie des priorités patrimoniales essentielles.",
            riskAnticipation: "Anticiper les risques — qu'il s'agisse d'un accident, d'une perte de revenus ou d'un événement imprévu — permet d'éviter que vos proches ne soient confrontés à des difficultés financières.",
            expertSupport: "Nos experts vous accompagnent pour mettre en place des solutions adaptées :",
            solutionsList: [
              {
                title: "Assurances prévoyance",
                description: "pour garantir un capital ou des revenus en cas d'accident ou de décès."
              },
              {
                title: "Assurance-vie",
                description: "pour sécuriser votre patrimoine et protéger financièrement votre famille, tout en bénéficiant d'un cadre fiscal avantageux."
              },
              {
                title: "Solutions de retraite et d'investissement",
                description: "pensées pour assurer votre avenir et celui de vos proches."
              },
              {
                title: "Un accompagnement sur-mesure",
                description: "pour anticiper, sécuriser et transmettre."
              }
            ]
          },
          whyChooseAzalee: {
            whyChooseTitle: "Pourquoi choisir Azalee Wealth",
            stepsList: [
              {
                step: "01",
                title: "Analyse personnalisée",
                description: "Des recommandations claires et objectives, basées sur une étude approfondie de votre situation patrimoniale et fiscale.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-why-choose-step1-icon.webp",
                bgColor: "#253F60"
              },
              {
                step: "02",
                title: "Solutions sur-mesure",
                description: "Des stratégies d'investissement et de structuration adaptées à vos objectifs, votre horizon de placement et votre profil d'investisseur.",
                image: "/images/investissement-immobilier-why-choose-step2-icon.png",
                bgColor: "#EDEDED"
              },
              {
                step: "03",
                title: "Accès à notre réseau d'experts",
                description: "Un accompagnement complet grâce à nos partenaires : notaires, avocats spécialisés, experts-comptables et conseillers en gestion de patrimoine.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-why-choose-step3-icon.webp",
                bgColor: "#EDEDED"
              },
              {
                step: "04",
                title: "Suivi et ajustement régulier",
                description: "Un suivi patrimonial annuel pour anticiper les évolutions fiscales, ajuster votre stratégie et sécuriser votre projet sur le long terme.",
                image: "/images/azalee-patrimoine-investissement-immobilier-responsive-why-choose-step4-icon.webp",
                bgColor: "#EDEDED"
              }
            ]
          },
          professionals: {
            professionalsTitle: "Quels sont les autres professionnels qui interviennent dans la gestion de patrimoine ?",
            professionalsIntro: "Si le conseiller en gestion de patrimoine reste votre interlocuteur privilégié pour piloter votre stratégie patrimoniale, d'autres professionnels peuvent être mobilisés en fonction de vos projets et besoins spécifiques :",
            professionalsList: [
              {
                title: "Notaires",
                description: "Pour sécuriser vos actes juridiques, successions, donations, ou acquisitions immobilières."
              },
              {
                title: "Avocats spécialisés",
                description: "Pour les montages juridiques complexes, l'optimisation fiscale ou la transmission d'entreprise."
              },
              {
                title: "Experts-comptables",
                description: "Pour la gestion comptable de vos investissements, de vos SCI ou de votre patrimoine professionnel."
              },
              {
                title: "Banquiers privés",
                description: "Pour le financement de vos projets et la gestion de vos avoirs bancaires."
              },
              {
                title: "Assureurs",
                description: "Pour la prévoyance, la gestion des risques et les solutions d'assurance-vie ou de retraite."
              }
            ]
          },
          news: {
            newsTitle: "Latest news",
            newsArticles: [
              {
                title: "Budget 2026 : a financial plan contested by the French",
                date: "16 Juillet 2025",
                category: "Taxes",
                image: "/images/azalee-patrimoine-investissement-immobilier-news-article-1-48ed7d.webp"
              },
              {
                title: "Livret A : une nouvelle baisse de rendement à 1,7 %",
                date: "15 Juillet 2025",
                category: "News",
                image: "/images/azalee-patrimoine-investissement-immobilier-news-article-2-92e27a.webp"
              },
              {
                title: "PEA : Éric Ciotti wants to revive investment in stocks",
                date: "01 Juillet 2025",
                category: "Finance"
              },
              {
                title: "Statut du bailleur privé : un nouveau souffle grâce au Parlement",
                date: "30 juin 2025",
                category: "Real estate"
              }
            ],
            featuredArticles: [
              {
                title: "Pension reform: the bill for 65 years old divides opinion",
                description: "Une mesure qui continue d'alimenter les tensions sociales."
              },
              {
                title: "Budget proposal 2026: French people facing new tax measures",
                description: "A budget law that sparks debates and concerns."
              },
              {
                title: "Diminution du taux du Livret A : nouvelle baisse à 1,7 %",
                description: "Un impact direct sur l'épargne des ménages."
              },
              {
                title: "Retraite progressive at 60 ans : green light from the Senate",
                description: "Un vote attendu par de nombreux actifs."
              },
              {
                title: "MaPrimeRénov' : freeze of energy renovation grants starting in July 2025",
                description: "Changes that worry the owners."
              },
              {
                title: "François Bayrou : un gouvernement sous le feu des critiques pour sa richesse déclarée",
                description: "La HATVP révèle un patrimoine record pour l'exécutif 2025."
              }
            ]
          },
          agencies: {
            agenciesTitle: "Discover our agencies",
            agenciesList: [
              "Aix-en-Provence-Marseille", "Biarritz", "Bordeaux", "Caen", "Chambéry", "Clermont-Ferrand",
              "Moutarde", "Lille", "Lyon", "Metz", "Montpellier", "Nantes", "Agréable", "Orléans",
              "Paris", "Reims", "Rennes", "Rouen", "Strasbourg", "Toulouse", "Visites guidées", "Vannes"
            ]
          },
          cta: {
            ctaButtons: [
              { text: "Découvrez nos opportunités", link: "#" },
              { text: "Recevez votre étude patrimoniale gratuite", link: "#" }
            ]
          }
        };

        // Merge CMS content with default content
        const mergedContent = { ...defaultContent };
        
        cmsSections.forEach(section => {
          try {
            const sectionData = JSON.parse(section.content_data);
            mergedContent[section.section_name] = {
              ...mergedContent[section.section_name],
              ...sectionData
            };
          } catch (error) {
            console.error(`Error parsing section ${section.section_name}:`, error);
          }
        });

        console.log('Investissement Immobilier Page - Loaded content:', mergedContent);
        setContent(mergedContent);
      } catch (e) {
        console.error("Failed to fetch immobilier page content:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    // Listen for content updates
    const handleContentUpdate = () => {
      console.log('Investissement Immobilier Page - Content update detected, reloading...');
      fetchContent();
    };

    window.addEventListener('contentUpdated', handleContentUpdate);
    
    // Also listen for localStorage changes (for cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'cms_content_updated') {
        console.log('Investissement Immobilier Page - Cross-tab content update detected, reloading...');
        fetchContent();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (loading) return <div className="text-center py-10">Chargement du contenu...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Erreur: {error}</div>;

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Main Title */}
              <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8">
                {(content.hero?.title || "Investissement Immobilier – Faites fructifier votre patrimoine avec Azalee Wealth").replace(/\s+\d+$/, '')}
              </h1>
              
              {/* Description */}
              <p className="text-[#686868] text-sm sm:text-base lg:text-lg font-inter leading-relaxed mb-8 sm:mb-10">
                {(content.hero?.subtitle || "Votre partenaire de confiance en stratégie immobilière depuis plus de 30 ans. Nous vous accompagnons pour valoriser votre patrimoine, sécuriser vos investissements, et bâtir des solutions d'investissement sur mesure, adaptées à vos objectifs.").replace(/\s+\d+$/, '')}
              </p>
              
              {/* CTA Button */}
              <button className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-sm sm:text-base hover:bg-[#A67A5A] transition-colors duration-200">
                {content.hero?.ctaButton || "Demander une étude patrimoniale gratuite"}
              </button>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-[467px] flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#B99066]/20 to-[#253F60]/20 rounded-2xl"></div>
                
                {/* Main image */}
                <img
                  src="/images/azalee-patrimoine-immobilier.webp"
                  alt="Femme dirigeante consultant des plans d'appartement neuf dans un bureau moderne"
                  className="relative z-10 w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover border-4 border-white"
                  style={{ aspectRatio: '4/3' }}
                  onError={(e) => {
                    console.log('Immobilier card image failed to load:', e.target.src);
                  }}
                  onLoad={() => console.log('Immobilier card image loaded successfully')}
                />
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#B99066] to-[#253F60] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <div>
                      <p className="text-[#112033] font-semibold text-sm">0 €</p>
                      <p className="text-[#4A5568] text-xs">Analyse gratuite</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight">
              {content.services?.servicesTitle || "Une approche stratégique de votre investissement immobilier"}
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {(content.services?.servicesList || []).map((service, index) => (
              <div key={index} className={`bg-[${service.bgColor || '#EDEDED'}] rounded-lg shadow-lg overflow-hidden`}>
                <div className="relative">
                  <img
                    src={service.image || "/images/default-service.png"}
                    alt={service.title}
                    className="w-full h-24 sm:h-48 object-cover"
                  />
                  <div className={`absolute inset-0 ${service.bgColor === '#253F60' ? 'bg-black/20' : 'bg-black/10'}`}></div>
                </div>
                <div className="p-2 sm:p-4 lg:p-6">
                  <h3 className={`text-xs sm:text-lg lg:text-xl font-inter font-semibold leading-tight mb-2 sm:mb-4 ${
                    service.bgColor === '#253F60' ? 'text-white' : 'text-[#1F2937]'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs sm:text-sm lg:text-base font-inter leading-relaxed ${
                    service.bgColor === '#253F60' ? 'text-white' : 'text-[#686868]'
                  }`}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight">
              Nos domaines d'expertise en fiscalité immobilière et patrimoniale
            </h2>
          </div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Expertise Card 1 - Tax Optimization */}
            <div className="bg-[#253F60] rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-col">
                <div className="flex items-start p-3 sm:p-4 lg:p-6">
                  <div className="flex-shrink-0 mr-3 sm:mr-4 lg:mr-6">
                    <img
                      src="/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-tax-optimization.webp"
                      alt="Optimisation fiscale"
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm sm:text-lg lg:text-xl font-inter font-semibold leading-tight mb-2 sm:mb-3">
                      Optimisation fiscale immobilière
                    </h3>
                    <p className="text-white text-xs sm:text-sm lg:text-base font-inter leading-relaxed">
                      Nous vous accompagnons dans la gestion fiscale de vos investissements immobiliers pour maximiser vos revenus fonciers et valoriser votre patrimoine. Nos solutions : structuration en SCI, LMNP/LMP, déficit foncier, démembrement, investissements en immobilier locatif.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise Card 2 - Defiscalization */}
            <div className="bg-[#EDEDED] rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-col">
                <div className="flex items-start p-3 sm:p-4 lg:p-6">
                  <div className="flex-shrink-0 mr-3 sm:mr-4 lg:mr-6">
                    <img
                      src="/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-defiscalization.webp"
                      alt="Stratégies de défiscalisation"
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black text-sm sm:text-lg lg:text-xl font-inter font-semibold leading-tight mb-2 sm:mb-3">
                      Stratégies de défiscalisation patrimoniale
                    </h3>
                    <p className="text-[#4B5563] text-xs sm:text-sm lg:text-base font-inter leading-relaxed">
                      Profitez des dispositifs légaux pour réduire votre pression fiscale et pérenniser vos actifs. Nous intervenons sur : défiscalisation immobilière, investissements loi Girardin, Malraux, PER, holding patrimoniale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise Card 3 - Professional */}
            <div className="bg-[#EDEDED] rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-col">
                <div className="flex items-start p-3 sm:p-4 lg:p-6">
                  <div className="flex-shrink-0 mr-3 sm:mr-4 lg:mr-6">
                    <img
                      src="/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-professional.webp"
                      alt="Fiscalité professionnelle"
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black text-sm sm:text-lg lg:text-xl font-inter font-semibold leading-tight mb-2 sm:mb-3">
                      Fiscalité professionnelle & investissement
                    </h3>
                    <p className="text-[#4B5563] text-xs sm:text-sm lg:text-base font-inter leading-relaxed">
                      Conseil sur-mesure pour chefs d'entreprise, dirigeants et professions libérales souhaitant développer ou sécuriser leur patrimoine professionnel et personnel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise Card 4 - Transmission */}
            <div className="bg-[#EDEDED] rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-col">
                <div className="flex items-start p-3 sm:p-4 lg:p-6">
                  <div className="flex-shrink-0 mr-3 sm:mr-4 lg:mr-6">
                    <img
                      src="/images/azalee-patrimoine-investissement-immobilier-responsive-expertise-transmission.webp"
                      alt="Transmission et donation"
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black text-sm sm:text-lg lg:text-xl font-inter font-semibold leading-tight mb-2 sm:mb-3">
                      Transmission, donation & gestion successorale
                    </h3>
                    <p className="text-[#4B5563] text-xs sm:text-sm lg:text-base font-inter leading-relaxed">
                      Nous vous aidons à anticiper la transmission de vos biens avec des solutions fiscales adaptées pour optimiser les donations et protéger vos héritiers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fiscal Solutions Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight">
              Nos solutions fiscales pour vos investissements immobiliers
            </h2>
          </div>

          {/* Fiscal Solutions Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {/* Fiscal Solution Card 1 - Pinel */}
            <div className="bg-[#253F60] rounded-lg shadow-lg overflow-hidden relative">
              <div className="relative">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-pinel-bg-8b82a6.webp"
                  alt="Loi Pinel"
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                {/* Circular Icon Overlay */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <img
                    src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-pinel-icon.webp"
                    alt="Pinel icon"
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-white"
                  />
                </div>
              </div>
              <div className="p-2 sm:p-4 lg:p-6 text-center">
                <h3 className="text-white text-xs sm:text-sm lg:text-lg font-inter font-semibold leading-tight mb-2 sm:mb-3">
                  Investissement locatif neuf (Loi Pinel)
                </h3>
                <p className="text-white text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                  Bénéficiez d'une réduction d'impôt en investissant dans l'immobilier neuf destiné à la location, sous conditions de durée et de plafonds de loyers.
                </p>
              </div>
            </div>

            {/* Fiscal Solution Card 2 - LMNP/LMP */}
            <div className="bg-gradient-to-b from-[#E9E9E9] to-white rounded-lg shadow-lg overflow-hidden relative border border-white">
              <div className="relative">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-lmnp-bg-51a138.webp"
                  alt="LMNP/LMP"
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Circular Icon Overlay */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <img
                    src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-lmnp-icon.webp"
                    alt="LMNP icon"
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-white"
                  />
                </div>
              </div>
              <div className="p-2 sm:p-4 lg:p-6 text-center">
                <h3 className="text-[#1F2937] text-xs sm:text-sm lg:text-lg font-inter font-semibold leading-tight mb-2 sm:mb-3">
                  Location meublée (Statut LMNP / LMP)
                </h3>
                <p className="text-black text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                  Optimisez votre fiscalité grâce à la location meublée, avec amortissement des biens et régime fiscal allégé sur les revenus locatifs.
                </p>
              </div>
            </div>

            {/* Fiscal Solution Card 3 - Deficit Foncier */}
            <div className="bg-gradient-to-b from-[#E9E9E9] to-white rounded-lg shadow-lg overflow-hidden relative border border-white">
              <div className="relative">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-deficit-bg-1b3fc2.webp"
                  alt="Déficit foncier"
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Circular Icon Overlay */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <img
                    src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-deficit-icon.webp"
                    alt="Déficit foncier icon"
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-white"
                  />
                </div>
              </div>
              <div className="p-2 sm:p-4 lg:p-6 text-center">
                <h3 className="text-black text-xs sm:text-sm lg:text-lg font-inter font-semibold leading-tight mb-2 sm:mb-3">
                  Déficit foncier sur vos revenus
                </h3>
                <p className="text-black text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                  Réduisez votre imposition en déduisant le montant des travaux de rénovation ou d'entretien de vos revenus fonciers.
                </p>
              </div>
            </div>

            {/* Fiscal Solution Card 4 - Valorisation */}
            <div className="bg-gradient-to-b from-[#E9E9E9] to-white rounded-lg shadow-lg overflow-hidden relative border border-white">
              <div className="relative">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-valorisation-bg-1b3fc2.webp"
                  alt="Valorisation"
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Circular Icon Overlay */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <img
                    src="/images/azalee-patrimoine-investissement-immobilier-responsive-fiscal-valorisation-icon.webp"
                    alt="Valorisation icon"
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-white"
                  />
                </div>
              </div>
              <div className="p-2 sm:p-4 lg:p-6 text-center">
                <h3 className="text-black text-xs sm:text-sm lg:text-lg font-inter font-semibold leading-tight mb-2 sm:mb-3">
                  Valorisation de l'immobilier ancien
                </h3>
                <p className="text-black text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                  Profitez d'avantages fiscaux attractifs en rénovant des biens classés ou situés dans des secteurs sauvegardés, tout en valorisant votre patrimoine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wealth Building Section */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Main Title */}
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-cairo font-semibold leading-tight mb-8 sm:mb-12">
              Construire et valoriser son patrimoine immobilier
            </h2>

            {/* Introduction Paragraph */}
            <p className="text-black text-base sm:text-lg font-inter leading-relaxed mb-8 sm:mb-12">
              Se constituer un patrimoine solide, c'est préparer l'avenir avec sérénité. Qu'il s'agisse d'investissements immobiliers ou de placements financiers, développer son patrimoine offre des revenus complémentaires, améliore son confort de vie, et sécurise l'avenir de ses proches.
            </p>

            {/* Patrimonial Forms Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-black text-xl sm:text-2xl font-inter font-semibold leading-tight mb-4 sm:mb-6">
                Votre patrimoine peut prendre plusieurs formes :
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-black text-base sm:text-lg font-inter leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Investissements immobiliers ou financiers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Biens professionnels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Actifs mobiliers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Droits d'usufruit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Droits de propriété intellectuelle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Droits à la retraite et rentes</span>
                </li>
              </ul>
            </div>

            {/* Economic Context Paragraph */}
            <p className="text-black text-base sm:text-lg font-inter leading-relaxed mb-8 sm:mb-12">
              Dans un contexte économique incertain — perte d'emploi, baisse de revenus à la retraite, financement des études des enfants — il devient essentiel d'anticiper pour garantir sa sécurité financière et celle de sa famille.
            </p>

            {/* Why Choose a Wealth Advisor Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-black text-xl sm:text-2xl font-inter font-semibold leading-tight mb-4 sm:mb-6">
                Pourquoi faire appel à un conseiller patrimonial ?
              </h3>
              <p className="text-black text-base sm:text-lg font-inter leading-relaxed mb-6 sm:mb-8">
                Nos experts en gestion de patrimoine vous accompagnent pour bâtir une stratégie personnalisée qui sécurise votre avenir et celui de vos proches.
              </p>
              <p className="text-black text-base sm:text-lg font-inter leading-relaxed mb-4 sm:mb-6">
                Vous vous assurez :
              </p>
              <ul className="space-y-2 sm:space-y-3 text-black text-base sm:text-lg font-inter leading-relaxed mb-6 sm:mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Un patrimoine durable et transmissible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>La protection financière de votre conjoint et de vos héritiers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>La certitude que vos proches disposeront d'un patrimoine solide en cas de coup dur</span>
                </li>
              </ul>
            </div>

            {/* Personalized Wealth Assessment Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-black text-xl sm:text-2xl font-inter font-semibold leading-tight mb-4 sm:mb-6">
                Votre bilan patrimonial personnalisé
              </h3>
              <p className="text-black text-base sm:text-lg font-inter leading-relaxed mb-6 sm:mb-8">
                Grâce à un audit complet, nos conseillers vous orientent vers les solutions les plus adaptées à vos objectifs :
              </p>
              <ul className="space-y-4 sm:space-y-6 text-black text-base sm:text-lg font-inter leading-relaxed mb-6 sm:mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <div>
                    <span className="font-semibold">Investissement immobilier :</span> Sécuriser et faire fructifier votre patrimoine dans la durée
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <div>
                    <span className="font-semibold">Placements financiers :</span> Générer des revenus et profiter d'avantages fiscaux
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <div>
                    <span className="font-semibold">Solutions de prévoyance :</span> Protéger vos proches avec des dispositifs avantageux
                  </div>
                </li>
              </ul>
            </div>

            {/* Administrative Support Paragraph */}
            <p className="text-black text-base sm:text-lg font-inter leading-relaxed">
              Nous vous accompagnons également dans toutes vos démarches administratives pour simplifier la gestion et la constitution de votre patrimoine.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <button className="bg-[#B99066] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg shadow-lg font-source-sans font-semibold text-sm sm:text-base hover:bg-[#A67A5A] transition-colors duration-200 transform hover:scale-105">
              En savoir plus
            </button>
          </div>
        </div>
      </section>


      {/* Retirement Planning Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1258px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Main Title */}
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-source-sans font-semibold leading-tight mb-8 sm:mb-12">
              Anticiper votre retraite en toute sérénité
            </h2>

            {/* Introduction Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-8 sm:mb-12">
              Assurez votre avenir financier avec des solutions d'investissement immobilier adaptées.
            </p>

            {/* Main Content */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-8 sm:mb-12">
              Nos conseillers en gestion de patrimoine vous accompagnent pour préparer sereinement votre retraite et maintenir votre niveau de vie une fois la vie professionnelle terminée.
            </p>

            {/* Investment Benefits Section */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-black text-xl sm:text-2xl font-source-sans font-semibold leading-tight mb-4 sm:mb-6">
                Investir à temps, c'est :
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-black text-base sm:text-lg font-source-sans leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Garantir des revenus complémentaires stables</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Préserver votre pouvoir d'achat à long terme</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] font-bold mt-1">•</span>
                  <span>Anticiper les aléas de santé et les dépenses imprévues</span>
                </li>
              </ul>
            </div>

            {/* Conclusion Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed">
              Parce que la retraite se prépare bien avant le dernier jour travaillé, nous mettons en place des stratégies patrimoniales solides, afin que vous puissiez profiter pleinement de cette nouvelle étape de vie.
            </p>
          </div>
        </div>
      </section>

      {/* Blockquote Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1256px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Blockquote Container */}
            <div className="relative bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 sm:p-12 lg:p-16">
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-12 h-16 sm:w-16 sm:h-20">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-quote-icon-56586a.webp"
                  alt="Quote Icon"
                  className="w-full h-full object-contain"
            />
          </div>
              
              {/* Content */}
              <div className="ml-16 sm:ml-20 lg:ml-24">
                <div className="text-white">
                  {/* Title */}
                  <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight mb-4 sm:mb-6">
                    À savoir
                  </h3>
                  
                  {/* Content */}
                  <p className="text-white text-base sm:text-lg lg:text-xl font-source-sans leading-relaxed">
                    Avec l'âge, la perte d'autonomie ou les frais de santé peuvent peser lourdement sur votre budget.
                    <br /><br />
                    Pour vivre votre retraite selon vos attentes, il est essentiel de prévoir dès aujourd'hui des solutions d'investissement adaptées.
              </p>
            </div>
          </div>
        </div>
      </div>
            </div>
      </section>

      {/* Retirement Planning Continuation Section */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1258px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Main Title */}
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-source-sans font-semibold leading-tight mb-8 sm:mb-12">
              Préparer votre retraite, c'est sécuriser votre avenir financier
            </h2>

            {/* Introduction Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Anticiper votre retraite, c'est vous garantir des revenus complémentaires au moment voulu, tout en profitant d'avantages fiscaux pendant votre activité professionnelle.
            </p>

            {/* Insurance Life Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Certains placements, comme l'assurance-vie, permettent aussi de protéger vos proches en cas de décès.
            </p>

            {/* Other Solutions Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              D'autres solutions — comme le Plan d'Épargne Retraite (PER) ou les dispositifs dédiés aux indépendants comme la Loi Madelin — peuvent, selon votre situation, compenser les limites des régimes obligatoires et renforcer vos revenus futurs.
            </p>

            {/* Conclusion Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed">
              Pour vivre sereinement votre retraite, il est essentiel de définir une stratégie d'investissement adaptée à vos projets et à votre profil.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section 2 */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1258px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <button className="bg-[#B99066] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg shadow-lg font-source-sans font-semibold text-sm sm:text-base hover:bg-[#A67A5A] transition-colors duration-200 transform hover:scale-105">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Heritage Transmission Section */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1257px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Main Title */}
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-source-sans font-semibold leading-tight mb-8 sm:mb-12">
              Transmettre votre patrimoine en toute sérénité
            </h2>

            {/* Introduction Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Anticiper la transmission de son patrimoine est une démarche essentielle pour protéger ses proches et garantir la pérennité de vos biens.
            </p>

            {/* Delicate Subject Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Bien souvent, ce sujet délicat est repoussé, alors qu'il permet pourtant d'éviter de lourdes charges fiscales et des conflits familiaux lors de la succession.
            </p>

            {/* Family Protection Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Que ce soit pour assurer la protection de votre conjoint, de vos enfants ou de vos héritiers dans le cadre d'une famille recomposée, la transmission planifiée offre des solutions adaptées à chaque situation.
            </p>

            {/* Real Estate Investment Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Investir dans l'immobilier s'avère un excellent levier pour transmettre un patrimoine durable, avec la possibilité de bénéficier d'avantages fiscaux sur les donations ou successions.
            </p>

            {/* Property Types Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Qu'il s'agisse de votre résidence principale ou d'un bien locatif générant des revenus, vous valorisez ainsi votre capital tout en préparant l'avenir de vos héritiers.
            </p>

            {/* Additional Strategies Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              La prévoyance retraite et certaines solutions d'épargne patrimoniale complètent ces stratégies, en renforçant la sécurité financière de votre entourage.
            </p>

            {/* Expert Advice Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed font-semibold">
              Notre conseil : anticipez et organisez votre transmission pour préserver votre patrimoine, optimiser votre fiscalité successorale et assurer la sérénité de vos proches.
            </p>
          </div>
        </div>
      </section>

      {/* Blockquote Section 2 */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1256px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Blockquote Container */}
            <div className="relative bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-lg shadow-lg p-8 sm:p-12 lg:p-16">
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-12 h-16 sm:w-16 sm:h-20">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-quote-icon-2-56586a.webp"
                  alt="Quote Icon"
                  className="w-full h-full object-contain"
            />
          </div>
              
              {/* Content */}
              <div className="ml-16 sm:ml-20 lg:ml-24">
                <div className="text-white">
                  {/* Title */}
                  <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight mb-4 sm:mb-6">
                    Bon à savoir
                  </h3>
                  
                  {/* Content */}
                  <p className="text-white text-base sm:text-lg lg:text-xl font-source-sans leading-relaxed">
                    Les solutions que nous vous recommandons — telles que l'investissement immobilier ou la préparation de la retraite — sont pensées pour vous aider à organiser efficacement la transmission de votre patrimoine.
                    <br /><br />
                    Notre objectif : construire avec vous une stratégie sur-mesure, cohérente avec votre situation personnelle et patrimoniale, afin de sécuriser vos biens et d'assurer une transmission optimisée et conforme à vos souhaits.
                  </p>
        </div>
      </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Protection and Risk Anticipation Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1258px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Main Title */}
            <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-source-sans font-semibold leading-tight mb-8 sm:mb-12">
              Protéger ses proches et anticiper l'imprévu
            </h2>

            {/* Introduction Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Assurer la sécurité financière de ses proches face aux aléas de la vie fait partie des priorités patrimoniales essentielles.
            </p>

            {/* Risk Anticipation Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Anticiper les risques — qu'il s'agisse d'un accident, d'une perte de revenus ou d'un événement imprévu — permet d'éviter que vos proches ne soient confrontés à des difficultés financières.
            </p>

            {/* Expert Support Paragraph */}
            <p className="text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              Nos experts vous accompagnent pour mettre en place des solutions adaptées :
            </p>

            {/* Solutions List */}
            <ul className="space-y-4 sm:space-y-6 text-black text-base sm:text-lg font-source-sans leading-relaxed mb-6 sm:mb-8">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] font-bold mt-1">•</span>
                <span>
                  <strong>Assurances prévoyance</strong> pour garantir un capital ou des revenus en cas d'accident ou de décès.
            </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] font-bold mt-1">•</span>
                <span>
                  <strong>Assurance-vie</strong>, pour sécuriser votre patrimoine et protéger financièrement votre famille, tout en bénéficiant d'un cadre fiscal avantageux.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] font-bold mt-1">•</span>
                <span>
                  <strong>Solutions de retraite et d'investissement</strong> pensées pour assurer votre avenir et celui de vos proches.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] font-bold mt-1">•</span>
                <span>
                  <strong>Un accompagnement sur-mesure</strong> pour anticiper, sécuriser et transmettre.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section 3 */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1258px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <button className="bg-[#B99066] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg shadow-lg font-source-sans font-semibold text-sm sm:text-base hover:bg-[#A67A5A] transition-colors duration-200 transform hover:scale-105">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Azalee Wealth Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-black text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight">
              Pourquoi choisir Azalee Wealth
            </h2>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Step 1 - Analysis */}
            <div className="bg-[#253F60] rounded-lg shadow-lg overflow-hidden relative">
              {/* Step Number Badge */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-white text-[#253F60] text-xs sm:text-sm font-montserrat font-semibold px-2 py-1 rounded border border-[#253F60]">
                  Step 01
                </div>
              </div>
              
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img
                      src="/images/azalee-patrimoine-investissement-immobilier-responsive-why-choose-step1-icon.webp"
                      alt="Analyse personnalisée"
                      className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-white text-xs sm:text-sm lg:text-lg font-montserrat font-semibold leading-tight mb-2 sm:mb-3">
                      Analyse personnalisée
                    </h3>
                    <p className="text-white text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                      Des recommandations claires et objectives, basées sur une étude approfondie de votre situation patrimoniale et fiscale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Solutions */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative border border-black">
              {/* Step Number Badge */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-white text-black text-xs sm:text-sm font-montserrat font-semibold px-2 py-1 rounded border border-black">
                  Step 02
                </div>
              </div>
              
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img
                      src="/images/investissement-immobilier-why-choose-step2-icon.png"
                      alt="Solutions sur-mesure"
                      className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-black text-xs sm:text-sm lg:text-lg font-montserrat font-semibold leading-tight mb-2 sm:mb-3">
                      Solutions sur-mesure
                    </h3>
                    <p className="text-black text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                      Des stratégies d'investissement et de structuration adaptées à vos objectifs, votre horizon de placement et votre profil d'investisseur.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Expert Network */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative border border-black">
              {/* Step Number Badge */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-white text-black text-xs sm:text-sm font-montserrat font-semibold px-2 py-1 rounded border border-black">
                  Step 03
                </div>
              </div>
              
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img
                      src="/images/azalee-patrimoine-investissement-immobilier-responsive-why-choose-step3-icon.webp"
                      alt="Accès à notre réseau d'experts"
                      className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-black text-xs sm:text-sm lg:text-lg font-montserrat font-semibold leading-tight mb-2 sm:mb-3">
                      Accès à notre réseau d'experts
                    </h3>
                    <p className="text-black text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                      Un accompagnement complet grâce à nos partenaires : notaires, avocats spécialisés, experts-comptables et conseillers en gestion de patrimoine.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 - Follow-up */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative border border-black">
              {/* Step Number Badge */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-white text-black text-xs sm:text-sm font-montserrat font-semibold px-2 py-1 rounded border border-black">
                  Step 04
                </div>
              </div>
              
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <img
                      src="/images/azalee-patrimoine-investissement-immobilier-responsive-why-choose-step4-icon.webp"
                      alt="Suivi et ajustement régulier"
                      className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-black text-xs sm:text-sm lg:text-lg font-montserrat font-semibold leading-tight mb-2 sm:mb-3">
                      Suivi et ajustement régulier
                    </h3>
                    <p className="text-black text-xs sm:text-xs lg:text-sm font-inter leading-relaxed">
                      Un suivi patrimonial annuel pour anticiper les évolutions fiscales, ajuster votre stratégie et sécuriser votre projet sur le long terme.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals in Wealth Management Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1206px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Main Question and Introduction */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-black text-xl sm:text-2xl lg:text-3xl font-inter font-medium leading-tight mb-6 sm:mb-8">
                Quels sont les autres professionnels qui interviennent dans la gestion de patrimoine ?
              </h2>
              
              <p className="text-black text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                Si le conseiller en gestion de patrimoine reste votre interlocuteur privilégié pour piloter votre stratégie patrimoniale, d'autres professionnels peuvent être mobilisés en fonction de vos projets et besoins spécifiques :
              </p>
            </div>

            {/* Professionals List */}
            <div className="space-y-6 sm:space-y-8">
              {/* Notaires */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-inter font-semibold leading-tight mb-3 sm:mb-4">
                  Notaires —
                </h3>
                <p className="text-black text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                  Pour sécuriser vos actes juridiques, successions, donations, ou acquisitions immobilières.
                </p>
              </div>

              {/* Avocats spécialisés */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-inter font-semibold leading-tight mb-3 sm:mb-4">
                  Avocats spécialisés —
                </h3>
                <p className="text-black text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                  Pour les montages juridiques complexes, l'optimisation fiscale ou la transmission d'entreprise.
                </p>
              </div>

              {/* Experts-comptables */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-inter font-semibold leading-tight mb-3 sm:mb-4">
                  Experts-comptables —
                </h3>
                <p className="text-black text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                  Pour la gestion comptable de vos investissements, de vos SCI ou de votre patrimoine professionnel.
                </p>
              </div>

              {/* Banquiers privés */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-inter font-semibold leading-tight mb-3 sm:mb-4">
                  Banquiers privés —
                </h3>
                <p className="text-black text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                  Pour le financement de vos projets et la gestion de vos avoirs bancaires.
                </p>
              </div>

              {/* Assureurs */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-black text-lg sm:text-xl lg:text-2xl font-inter font-semibold leading-tight mb-3 sm:mb-4">
                  Assureurs —
                </h3>
                <p className="text-black text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                  Pour la prévoyance, la gestion des risques et les solutions d'assurance-vie ou de retraite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="w-full bg-[#F2F2F2] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-1 bg-[#4EBBBD] rounded-full"></div>
              <h2 className="text-[#112033] text-base sm:text-lg lg:text-xl font-source-sans font-normal uppercase tracking-wide">
                Latest news
              </h2>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured News Article 1 */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-news-article-1-48ed7d.webp"
                  alt="Budget 2026 financial plan"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-xs font-source-sans">16 Juillet 2025</span>
                    <span className="text-white text-xs font-source-sans uppercase">Taxes</span>
                  </div>
                  <h3 className="text-white text-sm sm:text-base font-source-sans font-normal uppercase leading-tight mb-2">
                    Budget 2026 : a financial plan contested by the French
                  </h3>
                  <div className="w-full h-px bg-white bg-opacity-80"></div>
                </div>
                {/* Calendar Icon */}
                <div className="absolute top-4 left-4 w-2.5 h-2.5">
                  <svg viewBox="0 0 10 10" fill="none" className="w-full h-full">
                    <rect x="0.33" y="1.34" width="9.31" height="8.1" fill="#000000" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="2.77" y1="0.53" x2="2.77" y2="2.15" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="7.23" y1="0.53" x2="7.23" y2="2.15" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="4.8" y1="3.78" x2="5.2" y2="3.78" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="6.83" y1="3.78" x2="7.23" y2="3.78" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="2.77" y1="5.81" x2="3.18" y2="5.81" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="4.8" y1="5.81" x2="5.2" y2="5.81" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="2.77" y1="7.84" x2="3.18" y2="7.84" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="4.8" y1="7.84" x2="5.2" y2="7.84" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="3.58" y1="1.34" x2="6.42" y2="1.34" stroke="#FFFFFF" strokeWidth="0.66"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* News Article 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src="/images/azalee-patrimoine-investissement-immobilier-news-article-2-92e27a.webp"
                  alt="Livret A rate decrease"
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-xs font-source-sans">15 Juillet 2025</span>
                    <span className="text-white text-xs font-source-sans uppercase">News</span>
                  </div>
                  <h3 className="text-white text-sm sm:text-base font-source-sans font-normal uppercase leading-tight mb-2">
                    Livret A : une nouvelle baisse de rendement à 1,7 %
                  </h3>
                  <div className="w-full h-px bg-white bg-opacity-80"></div>
                </div>
                {/* Calendar Icon */}
                <div className="absolute top-4 left-4 w-2.5 h-2.5">
                  <svg viewBox="0 0 10 10" fill="none" className="w-full h-full">
                    <rect x="0.33" y="1.34" width="9.31" height="8.1" fill="#000000" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="2.77" y1="0.53" x2="2.77" y2="2.15" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="7.23" y1="0.53" x2="7.23" y2="2.15" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="4.8" y1="3.78" x2="5.2" y2="3.78" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="6.83" y1="3.78" x2="7.23" y2="3.78" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="2.77" y1="5.81" x2="3.18" y2="5.81" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="4.8" y1="5.81" x2="5.2" y2="5.81" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="2.77" y1="7.84" x2="3.18" y2="7.84" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="4.8" y1="7.84" x2="5.2" y2="7.84" stroke="#FFFFFF" strokeWidth="0.66"/>
                    <line x1="3.58" y1="1.34" x2="6.42" y2="1.34" stroke="#FFFFFF" strokeWidth="0.66"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* News Article 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-black text-xs font-source-sans">01 Juillet 2025</span>
                  <span className="text-black text-xs font-source-sans uppercase">Finance</span>
                </div>
                <h3 className="text-black text-sm sm:text-base font-source-sans font-normal uppercase leading-tight mb-2">
                  PEA : Éric Ciotti wants to revive investment in stocks
                </h3>
                <div className="w-full h-px bg-gray-300"></div>
                {/* Calendar Icon */}
                <div className="mt-2 w-2.5 h-2.5">
                  <svg viewBox="0 0 10 10" fill="none" className="w-full h-full">
                    <rect x="0.33" y="1.34" width="9.31" height="8.1" fill="#000000" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="2.77" y1="0.53" x2="2.77" y2="2.15" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="7.23" y1="0.53" x2="7.23" y2="2.15" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="4.8" y1="3.78" x2="5.2" y2="3.78" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="6.83" y1="3.78" x2="7.23" y2="3.78" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="2.77" y1="5.81" x2="3.18" y2="5.81" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="4.8" y1="5.81" x2="5.2" y2="5.81" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="2.77" y1="7.84" x2="3.18" y2="7.84" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="4.8" y1="7.84" x2="5.2" y2="7.84" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="3.58" y1="1.34" x2="6.42" y2="1.34" stroke="#000000" strokeWidth="0.66"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* News Article 4 */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-black text-xs font-source-sans">30 juin 2025</span>
                  <span className="text-black text-xs font-source-sans uppercase">Real estate</span>
                </div>
                <h3 className="text-black text-sm sm:text-base font-source-sans font-normal uppercase leading-tight mb-2">
                  Statut du bailleur privé : un nouveau souffle grâce au Parlement
                </h3>
                <div className="w-full h-px bg-gray-300"></div>
                {/* Calendar Icon */}
                <div className="mt-2 w-2.5 h-2.5">
                  <svg viewBox="0 0 10 10" fill="none" className="w-full h-full">
                    <rect x="0.33" y="1.34" width="9.31" height="8.1" fill="#000000" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="2.77" y1="0.53" x2="2.77" y2="2.15" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="7.23" y1="0.53" x2="7.23" y2="2.15" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="4.8" y1="3.78" x2="5.2" y2="3.78" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="6.83" y1="3.78" x2="7.23" y2="3.78" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="2.77" y1="5.81" x2="3.18" y2="5.81" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="4.8" y1="5.81" x2="5.2" y2="5.81" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="2.77" y1="7.84" x2="3.18" y2="7.84" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="4.8" y1="7.84" x2="5.2" y2="7.84" stroke="#000000" strokeWidth="0.66"/>
                    <line x1="3.58" y1="1.34" x2="6.42" y2="1.34" stroke="#000000" strokeWidth="0.66"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Articles Sidebar */}
          <div className="mt-8 lg:mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Featured Article 1 */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#112033] text-xs font-source-sans font-normal leading-tight flex-1">
                    Pension reform: the bill for 65 years old divides opinion
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#112033] text-xs font-source-sans uppercase">Lire l'article</span>
                    <svg className="w-1.5 h-1.5 text-[#112033]" fill="none" stroke="currentColor" viewBox="0 0 6 6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="M1.5 0L4.5 3L1.5 6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#686868] text-xs font-source-sans leading-relaxed">
                  Une mesure qui continue d'alimenter les tensions sociales.
                </p>
              </div>

              {/* Featured Article 2 */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#112033] text-xs font-source-sans font-normal leading-tight flex-1">
                    Budget proposal 2026: French people facing new tax measures
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#112033] text-xs font-source-sans uppercase">Lire l'article</span>
                    <svg className="w-1.5 h-1.5 text-[#112033]" fill="none" stroke="currentColor" viewBox="0 0 6 6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="M1.5 0L4.5 3L1.5 6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#686868] text-xs font-source-sans leading-relaxed">
                  A budget law that sparks debates and concerns.
                </p>
              </div>

              {/* Featured Article 3 */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#112033] text-xs font-source-sans font-normal leading-tight flex-1">
                    Diminution du taux du Livret A : nouvelle baisse à 1,7 %
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#112033] text-xs font-source-sans uppercase">Lire l'article</span>
                    <svg className="w-1.5 h-1.5 text-[#112033]" fill="none" stroke="currentColor" viewBox="0 0 6 6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="M1.5 0L4.5 3L1.5 6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#686868] text-xs font-source-sans leading-relaxed">
                  Un impact direct sur l'épargne des ménages.
                </p>
              </div>

              {/* Featured Article 4 */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#112033] text-xs font-source-sans font-normal leading-tight flex-1">
                    Retraite progressive at 60 ans : green light from the Senate
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#112033] text-xs font-source-sans uppercase">Lire l'article</span>
                    <svg className="w-1.5 h-1.5 text-[#112033]" fill="none" stroke="currentColor" viewBox="0 0 6 6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="M1.5 0L4.5 3L1.5 6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#686868] text-xs font-source-sans leading-relaxed">
                  Un vote attendu par de nombreux actifs.
                </p>
              </div>

              {/* Featured Article 5 */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#112033] text-xs font-source-sans font-normal leading-tight flex-1">
                    MaPrimeRénov' : freeze of energy renovation grants starting in July 2025
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#112033] text-xs font-source-sans uppercase">Lire l'article</span>
                    <svg className="w-1.5 h-1.5 text-[#112033]" fill="none" stroke="currentColor" viewBox="0 0 6 6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="M1.5 0L4.5 3L1.5 6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#686868] text-xs font-source-sans leading-relaxed">
                  Changes that worry the owners.
                </p>
              </div>

              {/* Featured Article 6 */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#112033] text-xs font-source-sans font-normal leading-tight flex-1">
                    François Bayrou : un gouvernement sous le feu des critiques pour sa richesse déclarée
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#112033] text-xs font-source-sans uppercase">Lire l'article</span>
                    <svg className="w-1.5 h-1.5 text-[#112033]" fill="none" stroke="currentColor" viewBox="0 0 6 6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="M1.5 0L4.5 3L1.5 6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[#686868] text-xs font-source-sans leading-relaxed">
                  La HATVP révèle un patrimoine record pour l'exécutif 2025.
                </p>
              </div>
            </div>
          </div>

          {/* Discover All News Button */}
          <div className="flex justify-center mt-8 lg:mt-12">
            <a href="#" className="flex items-center gap-2 text-[#4EBBBD] text-sm font-source-sans hover:underline">
              <span>Discover all the news</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.7" d="M0.44 0.47L11.9 6L0.44 11.53"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.7" d="M6.3 4.6L6.3 8.8"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.7" d="M4.57 6.27L8.77 6.27"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Agencies Section */}
      <section className="w-full relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0">
          <img
            src="/images/azalee-patrimoine-investissement-immobilier-agencies-bg.webp"
            alt="Agencies background"
            className="w-full h-full object-cover"
            style={{
              backgroundSize: 'calc(var(--original-width) * 0.7880220413208008) calc(var(--original-height) * 0.7880220413208008)',
              backgroundRepeat: 'repeat'
            }}
          />
        </div>
        
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Agencies Card */}
            <div className="lg:col-start-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h3 className="text-[#112033] text-sm sm:text-base lg:text-lg font-source-sans font-semibold mb-6">
                Discover our agencies
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-[#686868] text-xs font-source-sans">Aix-en-Provence-Marseille</div>
                <div className="text-[#686868] text-xs font-source-sans">Biarritz</div>
                <div className="text-[#686868] text-xs font-source-sans">Bordeaux</div>
                <div className="text-[#686868] text-xs font-source-sans">Caen</div>
                <div className="text-[#686868] text-xs font-source-sans">Chambéry</div>
                <div className="text-[#686868] text-xs font-source-sans">Clermont-Ferrand</div>
                <div className="text-[#686868] text-xs font-source-sans">Moutarde</div>
                <div className="text-[#686868] text-xs font-source-sans">Lille</div>
                <div className="text-[#686868] text-xs font-source-sans">Lyon</div>
                <div className="text-[#686868] text-xs font-source-sans">Metz</div>
                <div className="text-[#686868] text-xs font-source-sans">Montpellier</div>
                <div className="text-[#686868] text-xs font-source-sans">Nantes</div>
                <div className="text-[#686868] text-xs font-source-sans">Agréable</div>
                <div className="text-[#686868] text-xs font-source-sans">Orléans</div>
                <div className="text-[#686868] text-xs font-source-sans">Paris</div>
                <div className="text-[#686868] text-xs font-source-sans">Reims</div>
                <div className="text-[#686868] text-xs font-source-sans">Rennes</div>
                <div className="text-[#686868] text-xs font-source-sans">Rouen</div>
                <div className="text-[#686868] text-xs font-source-sans">Strasbourg</div>
                <div className="text-[#686868] text-xs font-source-sans">Toulouse</div>
                <div className="text-[#686868] text-xs font-source-sans">Visites guidées</div>
                <div className="text-[#686868] text-xs font-source-sans">Vannes</div>
      </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 