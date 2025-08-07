'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/ui/Button';
import Slider from '../components/ui/Slider';
import PagerIndicator from '../components/ui/PagerIndicator';
import ExpandableList from '../components/ui/ExpandableList';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import KeyFiguresSection from '../components/KeyFiguresSection';
import { useTranslation } from '../contexts/TranslationContext';

const LOCAL_STORAGE_KEY = 'homepageContent';

const defaultContent = {
  heroTitle: "Votre partenaire de confiance en matière de gestion de patrimoine, de fiscalité et de conseil en investissement.",
  heroSubtitle: "Explorez des conseils personnalisés en matière de fiscalité, d'immobilier, d'investissements, de retraite et de gestion de patrimoine.",
  heroButton1: "Obtenez votre consultation personnalisée",
  heroButton2: "Commencez à explorer les sujets",
  introTitle: "Gestion de patrimoine — Optimisation fiscale immobilière — Conseil financier",
  introParagraph: "Depuis 30 ans, nous façonnons l'avenir financier de clients exigeants. Notre mission : libérer le potentiel caché de votre patrimoine grâce à une approche humaine, experte et transparente. Nous construisons des relations de confiance basées sur la proximité, l'écoute active et l'engagement total de nos conseillers - à vos côtés à chaque étape de votre projet.",
  introButton: "Rencontrez-nous",
  expertsTitle: "Nos experts à votre service",
  expertsDescription: "Nous rassemblons un réseau d'experts reconnus, de professionnels certifiés dédiés à la protection et à la croissance de votre patrimoine. Ils vous aident dans l'optimisation fiscale, la création de richesse et la transmission à long terme.",
  experts: [
    { title: "Conseiller en gestion de patrimoine", desc: "Votre partenaire stratégique pour toutes vos décisions en matière de planification patrimoniale.", button: "Renseignez-vous davantage" },
    { title: "Avocat fiscal", desc: "Votre expert juridique en matière fiscale, garantissant la conformité et proposant des solutions avancées de planification fiscale.", button: "Renseignez-vous davantage sur l'avocat fiscaliste" },
    { title: "Courtier hypothécaire", desc: "Votre expert en financement sécurisant les meilleures conditions du marché pour vos projets immobiliers.", button: "En savoir plus sur notre courtier hypothécaire" },
    { title: "Notaire", desc: "Votre conseiller juridique pour les transactions immobilières et les questions de succession, garantissant la sécurité juridique.", button: "Renseignez-vous davantage sur le notaire" },
    { title: "Expert-comptable", desc: "Votre partenaire de confiance en comptabilité, fiscalité et affaires sociales - vous guidant pour prendre des décisions éclairées.", button: "Renseignez-vous davantage sur le comptable agréé" },
    { title: "Avocat d'affaires", desc: "Votre expert en droit des sociétés, vous aidant dans la création, le développement et les transactions de votre entreprise.", button: "Renseignez-vous davantage sur l'avocat d'affaires" },
  ],
  testimonialsTitle: "Témoignages",
  testimonialText: "Azalee Patrimoine nous a apporté une vraie tranquillité d'esprit. Notre conseiller nous a aidés à structurer notre patrimoine et nous a accompagnés dans l'achat d'un nouveau bien immobilier. Nous avons ensuite rencontré un consultant en investissement immobilier et un expert-comptable — des professionnels réactifs et compétents. Leurs conseils nous ont permis de revoir notre stratégie financière en toute confiance. Nous les recommandons vivement.",
  testimonialAuthor: "néon.",
  processSteps: [
    { label: 'STEP 1', desc: 'CONSTRUIRE VOTRE PATRIMOINE', contentTitle: 'Développer votre patrimoine', contentText: 'Investing in real estate remains a valuable choice today, appreciated for its security and return on investment. Whether it is to generate additional income, protect your financial future, or pass on an inheritance, building a solid heritage meets essential objectives, for you and your loved ones.', button: 'Découvrez Comment Nos Courtiers Travaillent Pour Vous', image: '/images/img_image_1221.png' },
    { label: 'STEP 3', desc: 'OPTIMISEZ LA PERFORMANCE DE VOS INVESTISSEMENTS' },
    { label: 'STEP 4', desc: 'SELECT THE SOLUTION THAT SUITS YOU BEST' },
    { label: 'STEP 5', desc: 'FINANCER VOTRE PROJET DANS LES MEILLEURES CONDITIONS' },
    { label: 'STEP 6', desc: 'DIVERSIFIEZ VOS INVESTISSEMENTS' },
    { label: 'STEP 7', desc: 'TO ACCOMPANY YOU IN THE LONG TERM' },
  ],
  stats: [
    { value: '2006', label: 'Date de création' },
    { value: '7000', label: 'Clients' },
    { value: '92%', label: '93% de nos clients nous recommandent pour un investissement immobilier' },
    { value: '16 millions', label: "Le chiffre d'affaires" },
    { value: '+18 %', label: 'De croissance en 2019' },
    { value: '150', label: 'Collaborateurs partout en France' },
  ],
  investmentTitle: 'Valorisez votre avenir en construisant votre patrimoine',
  investmentText: "Investing, ce n'est pas seulement faire fructifier son argent, c'est poser les bases d'une sécurité financière durable. Que vous souhaitiez générer des revenus complémentaires, financer des projets futurs ou protéger votre famille, la constitution d'un patrimoine devient un choix stratégique. Immobilier, placements financiers ou solutions mixtes : chaque investissement doit être réfléchi et aligné avec vos objectifs. Chez Selexium, nos spécialistes sont là pour définir avec vous une stratégie sur mesure, pensée pour vous apporter performance et sérénité.",
  investmentButton: 'Explorez nos solutions pour faire croître votre patrimoine',
  investmentImage1: '/images/img_image_1222.png',
  investmentImage2: '/images/img_image_1220.png',
  taxTitle: 'Why choose real estate tax exemption?',
  taxText: "L'immobilier reste un investissement de référence pour les investisseurs français, surtout lorsqu'il est accompagné d'avantages fiscaux attractifs. En choisissant des biens éligibles à des dispositifs légaux de défiscalisation, vous pouvez réduire significativement votre imposition tout en développant votre patrimoine. Le gouvernement encourage ainsi l’investissement dans certains secteurs ou types de logements — anciens ou neufs, location longue durée ou saisonnière — grâce à des lois fiscales spécifiques. Ces mesures permettent non seulement de dynamiser l’offre immobilière mais aussi de soutenir les investisseurs en leur offrant des avantages concrets. Que vous souhaitiez constituer un patrimoine, optimiser vos revenus locatifs ou préparer votre avenir, nos solutions de défiscalisation s’adaptent à votre situation et à vos objectifs.",
  taxButton: 'Discover our tailor-made strategies for effective tax optimization.',
  taxCards: [
    { title: 'Le statut LMNP', image: '/images/img_image_1223.png', text: 'Louez-vous un bien meublé en tant que particulier ? Le statut LMNP vous permet de déclarer vos revenus locatifs sous le régime BIC, souvent plus avantageux que les revenus fonciers. Ce statut est accessible si vos revenus locatifs restent sous un certain seuil annuel, et il permet d’amortir le bien et le mobilier, réduisant ainsi l’imposition sur les loyers perçus.', link: 'En savoir plus sur le régime LMNP →' },
    { title: 'Le statut LMP', image: '/images/img_image_1224.png', text: 'Lorsque vos revenus issus de la location meublée dépassent la moitié des revenus globaux de votre foyer fiscal, vous pouvez accéder au statut de Loueur en Meublé Professionnel (LMP). Ce statut ouvre droit à des avantages fiscaux majeurs, tels que l’exonération d’impôt sur les plus-values après un certain délai de détention, ou encore la possibilité d’imputer les déficits sur votre revenu global.', link: 'En savoir plus sur le régime LMP →' },
    { title: 'La loi Pinel', image: '/images/img_image_1225.png', text: 'Souhaitez-vous investir dans l’immobilier neuf ou réhabilité tout en réduisant vos impôts ? Le dispositif Pinel vous offre une réduction d’impôt proportionnelle à votre durée d’engagement locatif (6, 9 ou 12 ans). Pour en bénéficier, vous devez respecter des plafonds de loyers et de ressources des locataires, fixés selon la localisation du bien.', link: 'En savoir plus sur la loi Pinel →' },
  ],
  partners: Array.from({ length: 12 }, (_, i) => `/images/partner_logo_${i + 1}.png`),
  finalCtaTitle: 'Faites croître votre patrimoine avec le soutien de nos experts',
  finalCtaText: "Choisir Selexium, c'est faire le choix d'un accompagnement sur-mesure par des spécialistes de la gestion patrimoniale, capables de vous guider à chaque étape de votre stratégie. Que vous souhaitiez investir, faire fructifier votre patrimoine, préparer votre retraite, anticiper votre transmission ou encore protéger votre famille, nos conseillers patrimoniaux élaborent des solutions adaptées à vos besoins et à vos ambitions. Si vous envisagez d'investir dans l'immobilier, nous vous assistons de la recherche d'opportunités à la finalisation de votre acquisition. Nous vous aidons à sélectionner le dispositif fiscal le plus avantageux, vous proposons des programmes immobiliers exclusifs, et vous accompagnons dans toutes vos démarches administratives, y compris fiscales. Nos experts sont également à vos côtés pour obtenir les meilleures conditions de financement et sécuriser votre prêt immobilier. Enfin, ils vous orientent vers des placements financiers pertinents, sélectionnés en fonction de votre profil d'investisseur et de vos objectifs. Avec Selexium, vous bénéficiez d'un partenaire de confiance, engagé à vos côtés pour valoriser, sécuriser et transmettre votre patrimoine.",
  finalCtaImage: '/images/img_image_1227.png',
  footerExpertise: ['Imposition fiscale', 'Investissement immobilier', 'Investissements financiers', 'Planification de la retraite', 'Conseil en gestion de patrimoine'],
  footerOutils: ['Blog', 'Simulateurs financiers', "Calculatrices d'impôts", 'Ressources', 'FAQs'],
  footerContact: {
    address: '123 Rue Financière',
    city: 'New York, NY 10001',
    country: 'États-Unis',
    phone: '+1 (555) 123-4567',
    email: 'info@wealthadvisors.com',
  },
  footerEntreprise: ['À propos de nous', 'Nos services', 'Notre équipe', 'Carrières', 'Contact'],
  footerCopyright: '© 2025 WealthAdvisors. Tous droits réservés.',
  footerLinks: ['Légal', 'Politique de confidentialité', "Conditions d'utilisation"],
  contactPhone: '+1 (555) 123-4567',
  contactEmail: 'contact@azaleewealth.com',
  categories: ['Fiscalité','Investissement immobilier','Placements','Retraite','Patrimoine','Outils financiers'],
  contactUsImage: '/images/img_image_1233.png',
};

const defaultSectionOrder = [
  'hero',
  'intro',
  'experts',
  'testimonials',
  'processSteps',
  'stats',
  'investment',
  'tax',
  'partners',
  'finalCta',
  'footer',
];

export default function HomePage() {
  const { t } = useTranslation();
  const [content, setContent] = useState(defaultContent);
  const [sectionOrder, setSectionOrder] = useState(defaultSectionOrder);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setContent({ ...defaultContent, ...parsed });
      if (parsed.sectionOrder) setSectionOrder(parsed.sectionOrder);
    }
  }, []);

  // Mapping des sections à afficher dynamiquement
  const renderSection = (section) => {
    switch (section) {
      case 'hero':
        return (
          <section key="hero" className="w-full bg-[#253F60] py-12 sm:py-20">
            <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-10">
              {/* Left: Text (centered on mobile, left on desktop) */}
              <div className="flex-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left mt-8 lg:mt-0">
                {/* Logo visible only on mobile in hero section */}
                {/* (Removed the hero section logo on mobile) */}
                <h1 className="text-white text-[12px] sm:text-lg md:text-xl lg:text-4xl font-cairo font-semibold uppercase mb-4 max-w-xs sm:max-w-md lg:max-w-xl leading-snug">
                  Votre partenaire de confiance en matière de gestion de patrimoine, de fiscalité et de conseil en investissement.
                </h1>
                <p className="text-white text-[10px] sm:text-base md:text-lg lg:text-xl mb-8 max-w-xs sm:max-w-md lg:max-w-lg font-inter">
                  Explorez des conseils personnalisés en matière de fiscalité, d'immobilier, d'investissements, de retraite et de gestion de patrimoine.
                </p>
                <button className="bg-[#B99066] text-white px-8 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase shadow-lg mb-8">
                  Obtenez Votre Consultation Personnalisée
                </button>
                {/* Dots visible only on mobile */}
                <div className="flex justify-center items-center gap-2 mb-4 lg:hidden">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-[#B99066]' : 'bg-white'} border-2 border-white`}
                    />
                  ))}
                </div>
              </div>
              {/* Right: Image (desktop), below on mobile */}
              <div className="flex-1 flex justify-center items-center w-full lg:w-auto">
                <img
                  src="/images/hero-figma-image-4ee7fd.png"
                  alt="Hero Figma"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-full shadow-lg object-cover"
                  style={{ aspectRatio: '1/1' }}
                />
              </div>
            </div>
          </section>
        );
      case 'intro':
        return (
          <section key="intro" className="w-full px-4 sm:px-6 lg:px-[100px] py-16 lg:py-28">
            <div className="max-w-[1368px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                <div className="w-full lg:w-[58%]">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3.5">
                      <div className="w-[60px] h-0.5 bg-global-5"></div>
                      <h2 className="text-xl sm:text-2xl lg:text-2xl font-cairo font-medium uppercase text-global-2 leading-10">{t('intro.title')}</h2>
                    </div>
                    <p className="text-lg sm:text-xl font-source-sans text-global-1 leading-7">{t('intro.paragraph')}</p>
                  </div>
                </div>
              </div>
              {/* Responsive 2x2 grid for mobile/tablet, hidden on desktop */}
              <div className="block lg:hidden">
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {/* Card 1 */}
                  <div className="bg-[#253F60] p-4 rounded-lg shadow text-white flex flex-col justify-between">
                    <h3 className="text-base font-bold mb-2">Optimisation fiscale de l'immobilier</h3>
                    <p className="text-xs mb-4">Construisez votre richesse tout en réduisant vos impôts avec des solutions d'investissement légales et personnalisées.</p>
                    <button className="bg-white text-[#253F60] px-2 py-1 rounded font-semibold text-xs w-fit">Découvrez Comment Réduire Vos Impôts</button>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-[#F2F2F2] p-4 rounded-lg shadow flex flex-col justify-between">
                    <h3 className="text-base font-bold mb-2 text-black">Gestion de patrimoine</h3>
                    <p className="text-xs mb-4 text-black">Optimisez votre richesse avec des stratégies personnalisées et des solutions conçues pour vos objectifs financiers.</p>
                    <button className="bg-[#B99066] text-white px-2 py-1 rounded font-semibold text-xs w-fit">Toutes Les Clés Pour Faire Croître Votre Richesse</button>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-[#F2F2F2] p-4 rounded-lg shadow flex flex-col justify-between">
                    <h3 className="text-base font-bold mb-2 text-black">Financement immobilier</h3>
                    <p className="text-xs mb-4 text-black">Accédez aux meilleures offres de prêts hypothécaires pour vos projets, négociées par nos courtiers experts.</p>
                    <button className="bg-[#B99066] text-white px-2 py-1 rounded font-semibold text-xs w-fit">Trouvez Les Meilleurs Taux Hypothécaires</button>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-[#F2F2F2] p-4 rounded-lg shadow flex flex-col justify-between">
                    <h3 className="text-base font-bold mb-2 text-black">Investissements financiers</h3>
                    <p className="text-xs mb-4 text-black">Sélectionnez les bonnes options d'investissement en fonction de votre profil et de vos objectifs.</p>
                    <button className="bg-[#B99066] text-white px-2 py-1 rounded font-semibold text-xs w-fit">Nos Meilleures Solutions D’Investissement</button>
                  </div>
                </div>
                {/* Centered button below grid */}
                <div className="flex justify-center mt-6">
                  <button className="bg-[#B99066] text-white px-6 py-2 rounded font-semibold text-xs">Rencontrez-Nous</button>
                </div>
              </div>
            </div>
          </section>
        );
      case 'experts':
        return (
          <section key="experts" className="w-full bg-global-7 px-4 sm:px-6 lg:px-12 py-16">
            <div className="max-w-[1368px] mx-auto">
              <div className="mb-10">
                <div className="w-[45px] h-[1.5px] bg-global-5 mb-3 rounded-full"></div>
                        <h2 className="text-[24.75px] font-cairo font-normal uppercase text-global-2 mb-2 tracking-wide leading-[1.2]">{t('experts.title')}</h2>
        <p className="text-[20px] font-source-sans text-global-1 leading-[1.3] mt-4 max-w-2xl">{t('experts.description')}</p>
              </div>
              {/* Mobile/tablet: vertical stack, desktop: original grid */}
              <div className="block lg:hidden">
                <div className="flex flex-col gap-4">
                  {content.experts.map((expert, index) => (
                    <div key={index} className="bg-global-8 rounded-[24px] shadow-[0_0_8px_0_rgba(0,0,0,0.25)] p-6 flex flex-col justify-between min-h-[220px] h-full">
                      <h3 className="text-lg font-cairo text-global-4 mb-2 leading-tight">{expert.title}</h3>
                      <p className="text-sm font-inter text-global-1 mb-4 leading-snug">{expert.desc}</p>
                      <Button variant="primary" size="sm" className="w-fit self-start text-xs font-inter font-bold min-h-0 py-2 px-4">{expert.button}</Button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop: original grid layout */}
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {content.experts.map((expert, index) => (
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
      case 'testimonials':
        return (
          <section key="testimonials" className="w-full px-4 sm:px-8 lg:px-24 py-16 lg:py-32">
          <div className="max-w-[1368px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left - Testimonial */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                <div className="bg-slider-1 p-8 rounded-2xl shadow-lg w-full flex flex-col items-center">
                  <img src="/images/img_svg.svg" className="w-8 h-6 mb-6" alt="quote" />
                  <h2 className="text-2xl sm:text-3xl font-cairo font-semibold uppercase text-global-2 text-center leading-tight mb-4 tracking-wide">
                      {t('testimonials.title')}
                    </h2>
                  <p className="text-base sm:text-lg font-source-sans text-global-4 text-center leading-7 mb-6 max-w-xl">
                      {t('testimonials.text')}
                        </p>
                  <span className="text-sm font-source-sans font-semibold uppercase text-global-4 text-right mb-4">
                      {t('testimonials.author')}
                        </span>
                  <div className="flex justify-center items-center gap-2 mt-2">
                      {[...Array(5)].map((_, index) => (
                        <div 
                          key={index}
                        className="w-3 h-3 bg-global-8 border border-global-7 rounded-full shadow-sm"
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
              {/* Right - Statistics */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                <div className="bg-global-4 p-12 lg:p-20 rounded-2xl shadow-lg flex flex-col items-center w-full">
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-global-8 rounded-full p-2 w-[140px] h-[140px] border-2 border-global-2 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-source-sans text-global-2 text-center font-bold">90%*</span>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-source-sans text-global-7 text-center leading-7 mb-2 max-w-xs">
                      95% de nos clients nous recommandent à leurs proches pour un investissement patrimonial.
                    </p>
                  <span className="text-xs font-source-sans text-global-6 leading-3 mt-1 text-center">
                      Enquête de satisfaction — 2019
                    </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        );
      case 'processSteps':
        return (
          <section key="processSteps" className="w-full bg-[#F5F5F5] py-12">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Title & Divider */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-1 bg-[#4EBBBD] mb-2 rounded-full"></div>
              <h2 className="text-3xl font-cairo font-normal uppercase text-[#1A2530] text-center tracking-wide">
                  Azalee Patrimoine vous accompagne à chaque étape
                </h2>
              </div>
            {/* Stepper Tabs */}
            <div className="flex flex-row justify-center items-end gap-0 mb-8">
                {content.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col px-10 py-6 border-b-2 ${idx === 0 ? 'bg-white shadow font-bold border-[#4EBBBD] text-[#1A2530]' : 'bg-[#F5F5F5] border-[#E0E0E0] text-[#1A2530]'} transition-all`}
                  style={{ minWidth: 200, alignItems: 'flex-start', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <span className={`text-lg font-bold mb-1 ${idx === 0 ? 'text-[#1A2530]' : 'text-[#1A2530]'}`}>{step.label}</span>
                  <span className="text-sm font-normal uppercase tracking-wide text-[#757575]">{step.desc}</span>
                </div>
              ))}
              </div>
            {/* Content Area */}
            <div className="flex flex-row justify-between items-center bg-white rounded shadow p-12 mt-2">
              {/* Left: Text */}
              <div className="flex-1 pr-12">
                  <h3 className="text-2xl font-normal text-[#1A2530] mb-6">
                    {content.processSteps[0].contentTitle}
                  </h3>
                <p className="text-base text-[#757575] mb-8 max-w-xl">
                    {content.processSteps[0].contentText}
                      </p>
                <button className="bg-[#B99066] text-white px-8 py-3 rounded shadow font-semibold text-base">
                    {content.processSteps[0].button}
                </button>
                    </div>
              {/* Right: Circular Image */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="w-[320px] h-[320px] bg-[#E3F1F6] rounded-full flex items-center justify-center shadow">
                    <img src={content.processSteps[0].image} alt="Step illustration" className="w-[220px] h-[220px] object-contain" />
                  </div>
              </div>
            </div>
          </div>
        </section>
        );
      case 'stats':
        return (
          <section key="stats" className="w-full bg-white py-16 flex justify-center">
            <KeyFiguresSection />
          </section>
        );
      case 'investment':
        return (
          <section key="investment" className="w-full px-4 sm:px-6 lg:px-14 py-16 lg:py-38">
          <div className="max-w-[1368px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-start items-center gap-4 lg:gap-13">
              {/* Left Content */}
              <div className="w-full lg:w-[40%] bg-global-4 p-8 lg:p-16 mb-6">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col gap-2.5 justify-center items-start flex-1 mt-8.5 px-4 lg:px-4">
                    <div className="w-[52px] h-px bg-global-5"></div>
                    <h2 className="text-lg sm:text-xl font-cairo font-normal uppercase text-global-7 leading-6.5 w-[96%]">
                        {t('investment.title')}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base font-source-sans text-global-4 leading-5 mt-3.5 w-full">
                      {t('investment.text')}
                  </p>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-global-6 text-global-7 px-5.5 py-2 text-xs font-inter font-bold capitalize shadow-lg mt-7.5 mx-9 flex-1"
                  >
                      {content.investmentButton}
                  </Button>
                </div>
                {/* Expandable List */}
                <ExpandableList />
                {/* Bottom Image */}
                <div className="flex justify-center items-center mt-1.5">
                  <img 
                      src={content.investmentImage1} 
                    className="w-full h-[200px] object-cover" 
                    alt="Investment consultation" 
                  />
                </div>
              </div>
              {/* Right Image */}
              <img 
                  src={content.investmentImage2} 
                className="w-full lg:w-[48%] h-[600px] lg:h-[850px] object-cover ml-0 lg:ml-13" 
                alt="Financial planning" 
              />
            </div>
          </div>
        </section>
        );
      case 'tax':
        return (
          <section key="tax" className="w-full py-16 bg-[#F5F5F5]">
          <div className="max-w-[1368px] mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left Card - Figma node 183-12701 */}
            <div className="w-full lg:w-[28%] bg-[#253F60] rounded-2xl p-10 flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-[40.28px] h-[1.34px] bg-[#4EBBBD] mb-4 rounded-full"></div>
                <h2 className="text-[22.15px] font-cairo font-normal uppercase text-white mb-6 leading-[1.2] tracking-wide text-left">
                    {content.taxTitle}
                    </h2>
                <p className="text-[12.08px] font-source-sans text-white mb-8 text-left">
                    {content.taxText}
                </p>
              </div>
              <button className="bg-[#B99066] text-white px-8 py-3 rounded shadow font-inter font-medium text-[12px] w-full mt-2">
                  {content.taxButton}
              </button>
                        </div>
            {/* Right: Tax Solution Cards (unchanged) */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {content.taxCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
                      <img src={card.image} alt={card.title} className="w-full h-[120px] object-cover rounded-t-2xl" />
                  <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-cairo font-semibold uppercase text-[#253F60] mb-2">{card.title}</h3>
                        <p className="text-sm text-[#1A2530] mb-4 flex-1">{card.text}</p>
                        <a href="#" className="text-[#4EBBBD] text-sm font-semibold hover:underline mt-auto">{card.link}</a>
                          </div>
                        </div>
                  ))}
              </div>
              {/* Navigation Arrows */}
              <div className="flex justify-end gap-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#4EBBBD] bg-white shadow hover:bg-[#4EBBBD] hover:text-white transition">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#4EBBBD] bg-white shadow hover:bg-[#4EBBBD] hover:text-white transition">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        );
      case 'partners':
        return (
          <section key="partners" className="w-full py-8">
          <div className="max-w-[1368px] mx-auto">
            {/* Top Separator */}
            <div className="w-full h-[1px] bg-[#19515E] mb-6"></div>
            {/* Logos Row */}
            <div className="flex justify-start items-center w-full overflow-x-auto gap-8 pb-2">
                {content.partners.map((src, idx) => (
                <a key={idx} href="#" className="flex-shrink-0 w-[170px] h-[55px] flex items-center justify-center bg-white rounded-lg shadow-sm">
                    <img src={src} alt={`partner ${idx + 1}`} className="max-h-[44px] max-w-[150px] object-contain" />
                </a>
              ))}
            </div>
            {/* Bottom Separator */}
            <div className="w-full h-[1px] bg-[#19515E] mt-6"></div>
          </div>
        </section>
        );
      case 'finalCta':
        return (
          <section key="finalCta" className="w-full px-4 sm:px-6 lg:px-14 py-16 lg:py-32">
          <div className="max-w-[1368px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-start items-center gap-8">
              <div className="flex flex-col justify-start items-start flex-1">
                <div className="w-[60px] h-0.5 bg-global-5 ml-2"></div>
                <h2 className="text-2xl sm:text-3xl font-cairo font-normal uppercase text-global-2 leading-10 mt-4 w-[96%]">
                    {content.finalCtaTitle}
                </h2>
                <p className="text-lg sm:text-xl font-source-sans text-global-1 leading-6.5 mt-1.5 mb-3 w-[98%]">
                    {content.finalCtaText}
                </p>
              </div>
              <img 
                  src={content.finalCtaImage} 
                className="w-full lg:w-[34%] h-[490px] object-cover" 
                alt="Expert consultation" 
              />
            </div>
          </div>
        </section>
        );
      case 'footer':
        return (
          <footer key="footer" className="w-full relative pt-16 pb-6 text-white" style={{background: 'linear-gradient(90deg, #253F60 0%, #B99066 100%)'}}>
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
        <div className="relative max-w-[1368px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Expertise */}
          <div>
            <h3 className="text-lg font-inter font-semibold mb-4 text-[#FFFFFF]">Expertise</h3>
            <ul className="space-y-2 text-[#D1D5DB] text-base">
                  {content.footerExpertise.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
            </ul>
          </div>
          {/* Outils */}
          <div>
            <h3 className="text-lg font-inter font-semibold mb-4 text-[#FFFFFF]">Outils</h3>
            <ul className="space-y-2 text-[#D1D5DB] text-base">
                  {content.footerOutils.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
            </ul>
          </div>
          {/* Contactez */}
          <div>
            <h3 className="text-lg font-inter font-semibold mb-4 text-[#FFFFFF]">Contactez</h3>
            <ul className="space-y-2 text-[#D1D5DB] text-base">
                  <li>{content.footerContact.address}</li>
                  <li>{content.footerContact.city}</li>
                  <li>{content.footerContact.country}</li>
                  <li>Téléphone : {content.footerContact.phone}</li>
                  <li>Courriel : <span className="underline">{content.footerContact.email}</span></li>
            </ul>
          </div>
          {/* Entreprise */}
          <div>
            <h3 className="text-lg font-inter font-semibold mb-4 text-[#FFFFFF]">Entreprise</h3>
            <ul className="space-y-2 text-[#D1D5DB] text-base">
                  {content.footerEntreprise.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="relative max-w-[1368px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center border-t border-[#1F2937] pt-6 text-[#D1D5DB] text-sm gap-2">
              <span>{content.footerCopyright}</span>
          <div className="flex gap-6">
                {content.footerLinks.map((link, index) => (
                  <a key={index} href="#" className="hover:underline text-[#0C2C5D]">{link}</a>
                ))}
          </div>
        </div>
      </footer>
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
      <div className="w-full flex justify-center items-center my-6 block lg:hidden">
        <img
          src="/images/real-hero-photo-7881b2.png"
          alt="Hero section real photo"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg rounded-lg object-cover mx-auto"
        />
      </div>
    </div>
  );
}