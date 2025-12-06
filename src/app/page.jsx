'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/ui/Button';
import Slider from '../components/ui/Slider';
import PagerIndicator from '../components/ui/PagerIndicator';
import ExpandableList from '../components/ui/ExpandableList';

const LOCAL_STORAGE_KEY = 'homepageContent';

// Dynamic Hero Background Carousel Component
const HeroCarousel = ({ content }) => {
  const [currentBgIndex, setCurrentBgIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  
  // Auto-play functionality for hero backgrounds
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % (content.heroBackgrounds?.length || 1));
    }, 6000); // Change every 6 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, content.heroBackgrounds?.length]);
  
  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentBgIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] py-8 sm:py-12 lg:py-20">
      {/* Dynamic Background Images */}
      <div className="absolute inset-0 overflow-hidden">
            {((content.hero?.heroBackgrounds || content.heroBackgrounds) || []).map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={bg}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Hero background failed to load:', bg);
                e.target.style.display = 'none';
              }}
              onLoad={() => console.log('Hero background loaded successfully:', bg)}
            />
          </div>
        ))}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#253F60]/80 via-[#253F60]/60 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center lg:items-start justify-center text-center lg:text-left min-h-[500px] sm:min-h-[600px]">
        <div className="max-w-2xl">
          <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-cairo font-semibold uppercase mb-4 leading-snug">
            {content.hero?.heroTitle || content.heroTitle}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-8 font-inter leading-relaxed">
            {content.hero?.heroSubtitle || content.heroSubtitle}
          </p>
          <button 
            className="bg-[#B99066] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold uppercase shadow-lg mb-8 hover:bg-[#A67A5A] transition-colors duration-200 w-full sm:w-auto"
            onClick={() => window.location.href = '/contact'}
          >
            {content.hero?.heroButton1 || content.heroButton1}
          </button>
          
          {/* Dynamic Navigation Dots */}
          <div className="flex justify-center lg:justify-start items-center gap-2 mb-4">
            {((content.hero?.heroBackgrounds || content.heroBackgrounds) || []).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
                  i === currentBgIndex ? 'bg-[#B99066] scale-125' : 'bg-transparent hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Dynamic Partners Carousel Component
const PartnersCarousel = ({ content }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  
  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const partnersCount = Array.isArray(content.partners) ? content.partners.length : 0;
    if (partnersCount === 0) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % partnersCount);
      }
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning, content.partners]);
  
  // Handle manual navigation
  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 3000); // Resume auto-play after 3 seconds
    }, 500);
  };
  
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? 5 : currentIndex - 1; // Fixed to 6 partners (0-5)
    goToSlide(newIndex);
  };
  
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % 6; // Fixed to 6 partners
    goToSlide(newIndex);
  };
  
  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#F8FAFB] to-[#F1F5F9]">
      <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#253F60] mb-4 rounded-full mx-auto"></div>
          <h2 className="text-2xl lg:text-3xl font-cairo font-semibold text-[#253F60] mb-2">Nos partenaires de confiance</h2>
          <p className="text-[#4B5563] font-inter">Des partenaires reconnus pour vous accompagner dans vos projets</p>
        </div>
        
        {/* Dynamic Carousel */}
        <div className="relative">
          {/* Top Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#253F60] to-transparent mb-8"></div>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm p-8">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-[#253F60] hover:text-white transition-all duration-300 disabled:opacity-50"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5 text-[#253F60] hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-[#253F60] hover:text-white transition-all duration-300 disabled:opacity-50"
              disabled={isTransitioning}
            >
              <svg className="w-5 h-5 text-[#253F60] hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Single Partner Display */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {(Array.isArray(content.partners) ? content.partners : []).map((src, idx) => (
                  <div 
                    key={idx} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="flex justify-center">
                      <div className="group">
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-[120px] w-[200px] flex items-center justify-center border border-gray-100 hover:border-[#B99066] hover:scale-105 relative">
                          {src && (src.startsWith('data:image') || src.startsWith('/images/') || src.startsWith('http')) ? (
                            <img 
                              src={src} 
                              alt={`Partenaire ${idx + 1}`} 
                              className="max-h-[60px] max-w-[160px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                              onError={(e) => {
                                console.error('Image failed to load for partner', idx + 1);
                                console.error('Image type:', src?.startsWith('data:image') ? 'base64' : 'url');
                                console.error('Image length:', src?.length || 0);
                                e.target.style.display = 'none';
                                // Show fallback text
                                const parent = e.target.parentNode;
                                if (!parent.querySelector('.error-fallback')) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'error-fallback text-xs text-gray-500 text-center p-2';
                                  fallback.textContent = `Image ${idx + 1}`;
                                  parent.appendChild(fallback);
                                }
                              }}
                              onLoad={() => {
                                console.log('Image loaded successfully for partner', idx + 1);
                                // Remove any error fallback
                                const parent = document.querySelector(`[data-partner-index="${idx}"]`);
                                if (parent) {
                                  const fallback = parent.querySelector('.error-fallback');
                                  if (fallback) fallback.remove();
                                }
                              }}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="text-xs text-gray-400 text-center p-2">
                              Image {idx + 1}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex-1 max-w-xs">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / (Array.isArray(content.partners) ? content.partners.length : 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            <span className="text-sm text-[#253F60] font-inter font-medium">
              {currentIndex + 1} / {Array.isArray(content.partners) ? content.partners.length : 0}
            </span>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {(Array.isArray(content.partners) ? content.partners : []).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-[#B99066] scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-[#253F60]'
                }`}
                disabled={isTransitioning}
              />
            ))}
          </div>
          
          {/* Bottom Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#253F60] to-transparent mt-8"></div>
        </div>
        
        {/* Partner Categories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-cairo font-semibold text-[#253F60] mb-2">Assurance</h3>
            <p className="text-sm text-[#4B5563] font-inter">Solutions d'assurance-vie et de capitalisation</p>
          </div>
          <div className="text-center">
            <h3 className="font-cairo font-semibold text-[#253F60] mb-2">Gestion d'actifs</h3>
            <p className="text-sm text-[#4B5563] font-inter">Expertise en gestion patrimoniale</p>
          </div>
          <div className="text-center">
            <h3 className="font-cairo font-semibold text-[#253F60] mb-2">Services financiers</h3>
            <p className="text-sm text-[#4B5563] font-inter">Conseil et accompagnement personnalisé</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultContent = {
  heroTitle: "Préserver. Optimiser. Transmettre.",
  heroSubtitle: "Depuis plus de 20 ans, Azalée Patrimoine accompagne les dirigeants, cadres supérieurs, professions libérales et familles fortunées dans la gestion et la transmission de leur patrimoine.",
  heroButton1: "Prenez rendez-vous en toute confidentialité",
  heroButton2: "Commencez à explorer les sujets",
  heroBackgrounds: [
    "/images/home.webp",
    "/images/image2.webp",
    "/images/image3.webp"
  ],
  introTitle: "Gérer un patrimoine conséquent exige plus qu'une expertise financière : cela nécessite une vision, une stratégie, et un partenaire de confiance.",
  introParagraph: "Notre mission : protéger vos intérêts, valoriser votre patrimoine et organiser sa transmission pour les générations futures. Chez Azalée Patrimoine, nous privilégions la discrétion, l'indépendance et un accompagnement sur-mesure qui s'adapte à chaque étape de votre vie.",
  introButton: "Rencontrez-nous",
  teamTitle: "Qui sommes-nous",
  teamSubtitle: "Une équipe passionnée à votre service",
  teamDescription: "Chez Azalée Patrimoine, nous croyons que la réussite de votre stratégie patrimoniale repose sur la qualité humaine de l'accompagnement. Notre équipe pluridisciplinaire combine expertise technique et approche personnalisée pour vous offrir des solutions sur-mesure.",
  teamValues: [
    { title: "Confidentialité", desc: "Nous protégeons vos informations et garantissons une totale discrétion dans la gestion de votre patrimoine.", icon: "" },
    { title: "Impartialité", desc: "Nos conseils sont 100% indépendants, toujours orientés vers vos seuls intérêts.", icon: "" },
    { title: "Suivi personnalisé", desc: "À chaque étape de votre vie, nous adaptons notre accompagnement à vos besoins spécifiques.", icon: "" },
    { title: "Clarté", desc: "Des honoraires fixes et une rémunération transparente, sans mauvaise surprise", icon: "" }
  ],
  expertsTitle: "Nos expertises",
  expertsDescription: "Nous vous accompagnons dans tous les aspects de la gestion patrimoniale avec une approche globale et personnalisée.",
  experts: [
    { title: "Optimiser votre fiscalité", desc: "Réduisez votre impôt sur le revenu, votre IFI ou la fiscalité de vos revenus immobiliers grâce à des stratégies adaptées à votre situation.", button: "Découvrir nos solutions fiscales" },
    { title: "Préparer votre retraite", desc: "Construisez dès aujourd'hui le capital nécessaire pour sécuriser vos revenus futurs, grâce à des solutions comme le PER, l'assurance-vie ou des investissements financiers diversifiés.", button: "Planifier ma retraite" },
    { title: "Transmettre et protéger vos proches", desc: "Organisez la transmission de votre patrimoine dans les meilleures conditions fiscales : donations, successions, protection du conjoint, mise en place de holdings familiales.", button: "Organiser ma transmission" },
    { title: "Investir dans l'immobilier et le financier", desc: "Diversifiez vos actifs : SCPI, private equity, produits structurés, ou immobilier direct. Nous sélectionnons les opportunités qui correspondent à vos objectifs et à votre tolérance au risque.", button: "Diversifier mes investissements" },
    { title: "Sécuriser l'avenir de votre entreprise", desc: "Accompagner la cession d'entreprise, organiser votre trésorerie professionnelle, protéger vos actifs personnels et bâtir une stratégie patrimoniale durable.", button: "Sécuriser mon entreprise" },
    { title: "Accompagnement sur-mesure", desc: "Plus de 30 ans d'expérience en conseil patrimonial avec une approche indépendante et tournée vers vos intérêts.", button: "Rencontrer nos experts" },
  ],
  testimonialsTitle: "Témoignages",
  testimonialText: "Grâce à Azalée Patrimoine, nous avons retrouvé sérénité et visibilité sur notre avenir.\n\nNotre conseiller a structuré notre patrimoine et nous a accompagnés dans l'acquisition d'un nouveau bien immobilier. L'intervention coordonnée de spécialistes en investissement immobilier et en expertise comptable nous a permis de repenser notre stratégie financière avec confiance. Une équipe à recommander sans hésiter.",
  testimonialAuthor: "néon.",
  processSteps: [
    { label: 'ÉTAPE 1', desc: 'Comprendre vos besoins', contentTitle: 'Comprendre vos besoins', contentText: 'Nous prenons le temps d\'écouter vos attentes et vos priorités.', button: 'Découvrez Comment Nos Courtiers Travaillent Pour Vous', image: '/images/img_image_1221.png' },
    { label: 'ÉTAPE 2', desc: 'Analyser votre situation' },
    { label: 'ÉTAPE 3', desc: 'Définir vos objectifs' },
    { label: 'ÉTAPE 4', desc: 'Affecter les moyens nécessaires' },
    { label: 'ÉTAPE 5', desc: 'Déployer la stratégie patrimoniale' },
    { label: 'ÉTAPE 6', desc: 'Assurer un suivi continu' }
  ],
  stats: [
    { value: '1996', label: 'Création d\'AGORA PATRIMOINE' },
    { value: '2018', label: 'Rachat par Proactive Finance' },
    { value: '2025', label: 'Rachat et fusion du groupe sous la marque AZALEE PATRIMOINE' },
    { value: '486', label: 'Clients' },
    { value: '50%', label: '50% de nos clients détiennent de l\'immobilier grâce à notre action de conseil' },
    { value: '35', label: 'Partenaires' },
    { value: '5', label: 'Implementations en France (Paris / Nantes / La Rochelle / Salon de Provence / Nice)' },
  ],
  investmentTitle: 'Sécurisez votre avenir avec une stratégie patrimoniale sur mesure',
  investmentText: "Gérer son patrimoine, ce n'est pas seulement investir : c'est anticiper, organiser et transmettre dans les meilleures conditions fiscales et familiales.\n\n👉 Chez Azalée Patrimoine, nous agissons comme un véritable chef d'orchestre, en coordination avec notaires et experts-comptables.\n\nSelon la phase de vie patrimoniale dans laquelle vous vous trouvez (constitution, consolidation, jouissance ou transmission), nous définissons un plan clair et optimisé. Notre objectif : vous permettre de profiter de vos capitaux tout en préservant durablement votre patrimoine.\n\nGrâce à un suivi régulier et personnalisé, nous adaptons la stratégie à vos objectifs personnels. Avec une approche pédagogique, nous vous donnons les clés pour prendre des décisions éclairées et avancer en toute confiance vers une gestion patrimoniale fluide, optimisée et fiscalement avantageuse.",
  investmentButton: 'Vous avez des questions, nous avons des réponses',
  investmentImage1: '/images/img_image_1222.png',
  investmentImage2: '/images/img_image_1220.png',
  taxTitle: 'Pourquoi choisir la défiscalisation immobilière ?',
  taxText: "L'immobilier reste un investissement de référence pour les investisseurs français, surtout lorsqu'il est accompagné d'avantages fiscaux attractifs. En choisissant des biens éligibles à des dispositifs légaux de défiscalisation, vous pouvez réduire significativement votre imposition tout en développant votre patrimoine. Le gouvernement encourage ainsi l'investissement dans certains secteurs ou types de logements — anciens ou neufs, location longue durée ou saisonnière — grâce à des lois fiscales spécifiques. Ces mesures permettent non seulement de dynamiser l'offre immobilière mais aussi de soutenir les investisseurs en leur offrant des avantages concrets. Que vous souhaitiez constituer un patrimoine, optimiser vos revenus locatifs ou préparer votre avenir, nos solutions de défiscalisation s'adaptent à votre situation et à vos objectifs.",
  taxCards: [
    { title: 'Le statut LMNP', image: '/images/img_image_1223.png', text: 'Vous possédez un logement meublé en location ? Le statut de loueur en Meublé Non Professionnel (LMNP) vous permet de décaler vos loyers dans la catégorie des Bénéfices Industriels et Commerciaux (BIC), un régime fiscal souvent plus avantageux que celui des revenus fonciers.\n\nAccessible tant que vos loyers annuels restent sous un certain seuil, il offre la possibilité d\'amortir la valeur du bien et du mobilier, ce qui réduit sensiblement l\'imposition sur vos revenus.', link: 'En savoir plus sur le régime LMNP →' },
    { title: 'Le statut LMP', image: '/images/img_image_1224.png', text: 'Si vos revenus locatifs issus de la location meublée dépassent la moitié des revenus de votre foyer fiscal, vous relevez du statut de Loueur en Meublé Professionnel (LMP). Ce régime offre des avantages fiscaux significatifs : exonération des plus-values après une certaine durée de détention, et possibilité d\'imputer vos déficits sur le revenu global du foyer.\n\nUn levier puissant pour optimiser la fiscalité de vos investissements immobiliers.', link: '' },
    { title: 'La loi Pinel', image: '/images/img_image_1225.png', text: 'Vous souhaitez investir dans l\'immobilier neuf ou rénové tout en allégeant votre fiscalité ? Le dispositif Pinel vous permet de bénéficier d\'une réduction d\'impôt calculée en fonction de votre durée d\'engagement locatif (6, 9 ou 12 ans). Pour en profiter, certaines conditions doivent être respectées : des loyers plafonnés et des locataires répondant à des critères de ressources, selon la zone géographique du logement.', link: 'En savoir plus sur la loi Pinel →' },
  ],
  partners: [
    '/images/selencia.svg',
    '/images/cardif-logo.svg', 
    '/images/SL-Logo-svg.svg',
    '/images/vieplus.svg',
    '/images/intencial-1.png',
    '/images/img_header_logo.png'
  ],
  finalCtaTitle: 'Et si nous parlions de votre patrimoine autour d\'un premier échange ?',
  finalCtaText: "Un rendez-vous en visio ou dans nos bureaux, en toute confidentialité. Prenez rendez-vous avec un conseiller Azalée Patrimoine pour découvrir comment nous pouvons vous accompagner dans la gestion et la transmission de votre patrimoine.",
  finalCtaImage: '/images/img_image_1227.png',
  footerContact: {
    address: '106 Rue de Richelieu',
    city: '75002 Paris',
    country: 'France',
    phone: '01 53 45 85 00',
    email: 'contact@azalee-patrimoine.fr',
  },
  contactPhone: '+1 (555) 123-4567',
  contactEmail: 'contact@azaleewealth.com',
  categories: ['Fiscalité','Investissement immobilier','Placements','Retraite','Patrimoine','Outils financiers'],
  contactUsImage: '/images/img_image_1233.png',
};

const defaultSectionOrder = [
  'hero',
  'intro',
  'team',
  'stats',
  'investment',
  'partners',
  'finalCta',
];

export default function HomePage() {
  const [content, setContent] = useState(defaultContent);
  const [sectionOrder, setSectionOrder] = useState(defaultSectionOrder);
  const [contentSource, setContentSource] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Add cache-busting parameter to force fresh data
        const response = await fetch(`/api/cms/content?path=home&t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Use same pattern as fiscalite and immobilier pages
          if (data.data) {
            // Merge CMS content with default content to ensure all fields are present
            const mergedContent = { ...defaultContent, ...data.data };
            // Ensure partners array is properly set from CMS
            if (Array.isArray(data.data.partners)) {
              mergedContent.partners = data.data.partners;
            }
            console.log('Loaded CMS content - Partners count:', mergedContent.partners?.length || 0);
            setContent(mergedContent);
            setSectionOrder(data.data.sectionOrder || defaultSectionOrder);
            setContentSource('cms');
          } else if (data.content) {
            // Merge CMS content with default content
            const mergedContent = { ...defaultContent, ...data.content };
            // Ensure partners array is properly set from CMS
            if (Array.isArray(data.content.partners)) {
              mergedContent.partners = data.content.partners;
            }
            console.log('Loaded CMS content - Partners count:', mergedContent.partners?.length || 0);
            setContent(mergedContent);
            setSectionOrder(data.content.sectionOrder || defaultSectionOrder);
            setContentSource('cms');
          } else {
            // Fallback to default content
            console.log('Using default content - Partners count:', defaultContent.partners?.length || 0);
            setContent(defaultContent);
            setSectionOrder(defaultSectionOrder);
            setContentSource('default');
          }
        } else {
          console.log('API response not OK, using default content');
          setContent(defaultContent);
          setSectionOrder(defaultSectionOrder);
          setContentSource('default');
        }
      } catch (error) {
        console.error('Error fetching homepage content:', error);
        setContent(defaultContent);
        setSectionOrder(defaultSectionOrder);
        setContentSource('default');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Mapping des sections à afficher dynamiquement
  const renderSection = (section) => {
    switch (section) {
      case 'hero':
        return <HeroCarousel key="hero" content={content} />;
      case 'intro':
        return (
          <section key="intro" className="w-full px-4 sm:px-6 lg:px-[100px] py-12 sm:py-16 lg:py-28">
            <div className="max-w-[1368px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
                <div className="w-full lg:w-[58%]">
                  <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex flex-col gap-3 sm:gap-3.5">
                      <div className="w-[60px] h-0.5 bg-global-5"></div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-cairo font-medium uppercase text-global-2 leading-tight sm:leading-10">{content.intro?.introTitle || content.introTitle}</h2>
                    </div>
                    <p className="text-base sm:text-lg lg:text-xl font-source-sans text-global-1 leading-relaxed sm:leading-7">{content.intro?.introParagraph || content.introParagraph}</p>
                  </div>
                </div>
              </div>
              {/* Responsive 2x2 grid for mobile/tablet, hidden on desktop */}
              <div className="block lg:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
                  {/* Card 1 */}
                  <div className="bg-[#253F60] p-4 sm:p-5 rounded-lg shadow text-white flex flex-col justify-between min-h-[180px]">
                    <h3 className="text-sm sm:text-base font-bold mb-2">Optimisation fiscale de l'immobilier</h3>
                    <p className="text-xs sm:text-sm mb-4 leading-relaxed">Construisez votre richesse tout en réduisant vos impôts avec des solutions d'investissement légales et personnalisées.</p>
                    <button className="bg-white text-[#253F60] px-3 py-2 rounded font-semibold text-xs w-fit">Découvrez Comment Réduire Vos Impôts</button>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-[#F2F2F2] p-4 sm:p-5 rounded-lg shadow flex flex-col justify-between min-h-[180px]">
                    <h3 className="text-sm sm:text-base font-bold mb-2 text-black">Gestion de patrimoine</h3>
                    <p className="text-xs sm:text-sm mb-4 text-black leading-relaxed">Optimisez votre richesse avec des stratégies personnalisées et des solutions conçues pour vos objectifs financiers.</p>
                    <button className="bg-[#B99066] text-white px-3 py-2 rounded font-semibold text-xs w-fit">Toutes Les Clés Pour Faire Croître Votre Richesse</button>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-[#F2F2F2] p-4 sm:p-5 rounded-lg shadow flex flex-col justify-between min-h-[180px]">
                    <h3 className="text-sm sm:text-base font-bold mb-2 text-black">Financement immobilier</h3>
                    <p className="text-xs sm:text-sm mb-4 text-black leading-relaxed">Accédez aux meilleures offres de prêts hypothécaires pour vos projets, négociées par nos courtiers experts.</p>
                    <button className="bg-[#B99066] text-white px-3 py-2 rounded font-semibold text-xs w-fit">Trouvez Les Meilleurs Taux Hypothécaires</button>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-[#F2F2F2] p-4 sm:p-5 rounded-lg shadow flex flex-col justify-between min-h-[180px]">
                    <h3 className="text-sm sm:text-base font-bold mb-2 text-black">Investissements financiers</h3>
                    <p className="text-xs sm:text-sm mb-4 text-black leading-relaxed">Sélectionnez les bonnes options d'investissement en fonction de votre profil et de vos objectifs.</p>
                    <button className="bg-[#B99066] text-white px-3 py-2 rounded font-semibold text-xs w-fit">Nos Meilleures Solutions D'Investissement</button>
                  </div>
                </div>
                {/* Centered button below grid */}
                <div className="flex justify-center mt-6">
                  <button className="bg-[#B99066] text-white px-6 py-3 rounded font-semibold text-sm w-full sm:w-auto">{content.intro?.introButton || content.introButton}</button>
                </div>
              </div>
            </div>
          </section>
        );
      case 'team':
        return (
          <section key="team" className="relative w-full py-12 sm:py-16 lg:py-28 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={content.team?.teamImage || content.teamImage || "/images/quiss.jpg"}
                alt="Équipe Azalée Patrimoine - Vision d'ensemble équipe diversifiée (4 personnes)"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Team image failed to load:', e.target.src);
                  console.log('Trying fallback to image4.webp');
                  e.target.src = "/images/image4.webp";
                }}
                onLoad={() => console.log('Team image loaded successfully')}
                style={{ 
                  minHeight: '400px',
                  backgroundColor: '#f0f0f0'
                }}
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#112033]/85 via-[#112033]/60 to-[#112033]/85"></div>
            
            {/* Content */}
            <div className="relative z-10 max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="text-center mb-12 sm:mb-16">
                <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#4EBBBD] mb-4 sm:mb-6 rounded-full mx-auto"></div>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-[42px] font-cairo font-semibold mb-4 sm:mb-6 tracking-wide leading-tight sm:leading-[1.2]">
                  {content.team?.teamTitle || content.teamTitle}
                </h2>
                <p className="text-white/90 text-lg sm:text-xl lg:text-[24px] font-inter font-medium mb-6 sm:mb-8 max-w-2xl mx-auto">
                  {content.team?.teamSubtitle || content.teamSubtitle}
                </p>
                <p className="text-white/80 text-sm sm:text-base lg:text-[18px] font-inter leading-relaxed sm:leading-[1.6] max-w-4xl mx-auto">
                  {content.team?.teamDescription || content.teamDescription}
                </p>
              </div>
              
              {/* Team Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {((content.team?.teamValues || content.teamValues) || []).map((value, index) => (
                  <div key={index} className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-[#112033] font-cairo font-semibold text-base sm:text-lg mb-2 sm:mb-3">{value.title}</h3>
                    <p className="text-[#4A5568] font-inter text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="text-center mt-8 sm:mt-12">
                <button 
                  className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white px-6 py-3 sm:px-10 sm:py-4 rounded-lg font-inter font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  onClick={() => window.location.href = '/notre-approche'}
                >
                  {content.team?.teamButton || content.teamButton || "Découvrir notre approche"}
                </button>
              </div>
            </div>
          </section>
        );
      case 'experts':
        return (
          <section key="experts" className="w-full bg-gradient-to-br from-[#F8FAFB] to-[#F1F5F9] px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-28">
            <div className="max-w-[1368px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16">
                {/* Left: Content */}
                <div className="order-2 lg:order-1">
                  <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#4EBBBD] mb-4 sm:mb-6 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl lg:text-[36px] font-cairo font-semibold text-[#112033] mb-4 sm:mb-6 tracking-wide leading-tight sm:leading-[1.2]">{content.experts?.expertsTitle || content.expertsTitle}</h2>
                  <p className="text-base sm:text-lg lg:text-[20px] font-inter text-[#4A5568] leading-relaxed sm:leading-[1.6] mb-6 sm:mb-8">{content.experts?.expertsDescription || content.expertsDescription}</p>
                  
                  {/* Key Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#4EBBBD] rounded-full"></div>
                      <span className="text-[#112033] font-medium text-xs sm:text-sm">Expertise reconnue</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#B99066] rounded-full"></div>
                      <span className="text-[#112033] font-medium text-xs sm:text-sm">Accompagnement personnalisé</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#59E2E4] rounded-full"></div>
                      <span className="text-[#112033] font-medium text-xs sm:text-sm">Réseau de professionnels</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#4EBBBD] rounded-full"></div>
                      <span className="text-[#112033] font-medium text-xs sm:text-sm">Solutions sur-mesure</span>
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-inter font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                    Rencontrer nos experts
                  </button>
                </div>
                
                {/* Right: Image with enhanced styling */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Decorative background */}
                    <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#B99066]/20 to-[#4EBBBD]/20 rounded-2xl"></div>
                    
                    {/* Main image */}
                    <img
                      src="/images/expertise.webp"
                      alt="Conseiller Azalée en discussion avec un couple dans un bureau élégant"
                      className="relative z-10 w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover border-4 border-white"
                      style={{ aspectRatio: '3/2' }}
                    />
                    
                    {/* Floating badge */}
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-[#112033] font-semibold text-sm">30+ ans</p>
                          <p className="text-[#4A5568] text-xs">d'expertise</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mobile/tablet: vertical stack, desktop: original grid */}
              <div className="block lg:hidden">
                <div className="flex flex-col gap-4 sm:gap-6">
                  {(content.experts || []).map((expert, index) => (
                    <div key={index} className="bg-global-8 rounded-[24px] shadow-[0_0_8px_0_rgba(0,0,0,0.25)] p-4 sm:p-6 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] h-full">
                      <h3 className="text-base sm:text-lg font-cairo text-global-4 mb-2 leading-tight">{expert.title}</h3>
                      <p className="text-xs sm:text-sm font-inter text-global-1 mb-4 leading-snug">{expert.desc}</p>
                      <Button variant="primary" size="sm" className="w-fit self-start text-xs font-inter font-bold min-h-0 py-2 px-4">{expert.button}</Button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop: original grid layout */}
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(content.experts || []).map((expert, index) => (
                  <div key={index} className="bg-global-8 rounded-[24px] shadow-[0_0_8px_0_rgba(0,0,0,0.25)] p-10 flex flex-col justify-between min-h-[320px] h-full">
                    <h3 className="text-[21px] font-cairo text-global-4 mb-2 leading-tight">{expert.title}</h3>
                    <p className="text-[16px] font-inter text-global-1 mb-6 leading-snug">{expert.desc}</p>
                    <Button variant="primary" size="sm" className="w-fit self-start text-[12px] font-inter font-bold min-h-0 py-2 px-6">{expert.button}</Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'separator':
        return (
          <section key="separator" className="relative w-full h-[300px] lg:h-[400px] overflow-hidden bg-gray-200">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/images/separwebp.webp"
                alt="Jardin sophistiqué avec azalées blanches et roses en premier-plan - Jardin à la française avec allée de graviers et perspective élégante"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Separator image failed to load:', e.target.src);
                  e.target.style.display = 'none';
                  // Show fallback content
                  const fallback = document.getElementById('separator-fallback');
                  if (fallback) {
                    fallback.classList.remove('hidden');
                  }
                }}
                onLoad={() => console.log('Image loaded successfully')}
              />
            </div>
            
            {/* Fallback content if image doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFB] via-[#E2E8F0] to-[#F8FAFB] flex items-center justify-center hidden" id="separator-fallback">
              <div className="text-center">
                <h3 className="text-[#112033] font-cairo font-semibold text-xl">Azalée Patrimoine</h3>
                <p className="text-[#4A5568] font-inter text-sm">Excellence & Confiance</p>
              </div>
            </div>
            
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent"></div>
            
            {/* Centered branding element */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl px-8 py-6 shadow-xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <span className="text-[#B99066] text-3xl">🌸</span>
                    <div className="text-left">
                      <h3 className="text-[#112033] font-cairo font-semibold text-lg">Azalée Patrimoine</h3>
                      <p className="text-[#4A5568] font-inter text-sm">Excellence & Confiance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 'stats':
        return (
          <section key="stats" className="w-full bg-white py-16">
          <div className="max-w-[1440px] mx-auto px-4">
            {/* Divider and Title */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-[46.7px] h-[1.56px] bg-[#4EBBBD] mb-3 rounded-full"></div>
              <h2 className="text-[25.7px] font-cairo font-normal uppercase text-[#112033] text-center tracking-wide mb-2" style={{ letterSpacing: '0.02em' }}>
                  {content.statsTitle || content.stats?.statsTitle || 'Dans les chiffres clés établis'}
                </h2>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 text-center">
              {((content.stats || content.stats) || []).map((stat, index) => (
                <div key={index}>
                  <div className="text-[40px] font-source-sans font-normal text-[#B99066] leading-[58px]">{stat.value}</div>
                  <div className="text-[11.7px] font-source-sans font-semibold text-[#000] leading-[18px] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        );
      case 'investment':
        return (
          <section key="investment" className="w-full py-16 lg:py-24">
          <div className="max-w-[1368px] mx-auto">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Left Content - Dark Blue Background */}
              <div className="w-full lg:w-[50%] bg-[#253F60] p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <div className="mb-6">
                    <div className="w-[60px] h-[2px] bg-white mb-4"></div>
                    <h2 className="text-white text-xl lg:text-2xl font-cairo font-semibold uppercase leading-tight">
                      {content.investment?.investmentTitle || content.investmentTitle}
                    </h2>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white text-base lg:text-lg font-inter leading-relaxed mb-8">
                    {content.investment?.investmentText || content.investmentText}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="mb-8">
                    <button className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold text-base hover:bg-[#A67A5A] transition-colors duration-200 shadow-lg">
                      {content.investment?.investmentButton || content.investmentButton}
                    </button>
                  </div>
                  
                  {/* Expandable Accordion */}
                  <div className="space-y-4">
                    {((content.investment?.investmentItems || content.investmentItems) || []).map((item, index) => {
                      const isExpanded = item.expanded === true;
                      return (
                        <div 
                          key={index} 
                          className={`${isExpanded ? 'bg-white/10' : 'bg-white/5'} rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200`}
                          onClick={() => item.url && (window.location.href = item.url)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className={`text-white font-cairo ${isExpanded ? 'font-semibold text-lg' : 'font-medium text-base'}`}>
                              {item.title}
                            </h3>
                            <svg 
                              className={`w-5 h-5 text-white ${isExpanded ? 'transform rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {isExpanded && item.description && (
                            <p className="text-white/90 text-sm font-inter mt-3">
                              {item.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="w-full lg:w-[50%] relative">
                <img 
                  src={content.investment?.investmentImage2 || content.investmentImage2 || '/images/img_image_1220.png'} 
                  className="w-full h-full object-cover" 
                  alt="Financial planning consultation" 
                />
                {/* Optional overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
        );
      case 'partners':
        return <PartnersCarousel key="partners" content={content} />;
      case 'finalCta':
        return (
          <section key="finalCta" className="w-full px-4 sm:px-6 lg:px-14 py-16 lg:py-32">
          <div className="max-w-[1368px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-start items-center gap-8">
              <div className="flex flex-col justify-start items-start flex-1">
                <div className="w-[60px] h-0.5 bg-global-5 ml-2"></div>
                <h2 className="text-2xl sm:text-3xl font-cairo font-normal uppercase text-global-2 leading-10 mt-4 w-[96%]">
                    {content.finalCta?.finalCtaTitle || content.finalCtaTitle}
                </h2>
                <p className="text-lg sm:text-xl font-source-sans text-global-1 leading-6.5 mt-1.5 mb-3 w-[98%]">
                    {content.finalCta?.finalCtaText || content.finalCtaText}
                </p>
              </div>
              <img 
                  src={content.finalCta?.finalCtaImage || content.finalCtaImage} 
                className="w-full lg:w-[34%] h-[490px] object-cover" 
                alt="Expert consultation" 
              />
            </div>
          </div>
        </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-global-8">
      <Header />
      
      
      
      
      
      {sectionOrder.map(renderSection)}
      {/* Add real Figma hero photo below hero section, responsive only on mobile */}
      <div className="w-full flex justify-center items-center my-4 sm:my-6 block lg:hidden px-4">
        <img
          src="/images/real-hero-photo-7881b2.png"
          alt="Hero section real photo"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg rounded-lg object-cover mx-auto"
        />
      </div>
      
      <Footer />
    </div>
  );
}