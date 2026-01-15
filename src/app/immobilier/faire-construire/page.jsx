import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from '../../../components/common/Footer';
import SectionHeader from '../../../components/common/SectionHeader';
import CTAButton from '@/components/ui/CTAButton';
import Link from 'next/link';

const defaultContent = {
  hero: {
    title: "Faire construire votre projet immobilier",
    subtitle: "Accompagnement complet pour la construction de votre maison ou immeuble",
    description: "De la recherche du terrain à la livraison de votre bien, nous vous accompagnons dans toutes les étapes de votre projet de construction.",
    button: "Découvrir nos services",
    image: "/images/expertise.webp"
  },
  servicesSection: {
    title: "Nos services de construction",
    subtitle: "Un accompagnement complet pour réussir votre projet de construction immobilière"
  },
  services: [
    { title: "Recherche de terrain", description: "Identification et sélection du terrain idéal pour votre projet", icon: "🏗️", features: ["Analyse de faisabilité", "Étude de sol", "Vérification des contraintes", "Négociation du prix"] },
    { title: "Architecture et plans", description: "Conception et réalisation des plans selon vos besoins", icon: "📐", features: ["Plans architecturaux", "Permis de construire", "Suivi des travaux", "Contrôle qualité"] },
    { title: "Financement", description: "Solutions de financement adaptées à votre projet", icon: "💰", features: ["Prêt construction", "Prêt relais", "Financement travaux", "Optimisation fiscale"] },
    { title: "Suivi des travaux", description: "Accompagnement pendant toute la durée du chantier", icon: "🔨", features: ["Planning travaux", "Contrôle qualité", "Gestion des artisans", "Livraison clés en main"] }
  ],
  processSection: {
    title: "Notre processus de construction",
    subtitle: "Un processus structuré en 5 étapes pour garantir la réussite de votre projet"
  },
  process: [
    { step: "1", title: "Étude de faisabilité", description: "Analyse de votre projet et de sa viabilité technique et financière" },
    { step: "2", title: "Recherche du terrain", description: "Identification et acquisition du terrain idéal pour votre construction" },
    { step: "3", title: "Conception architecturale", description: "Élaboration des plans et obtention des autorisations nécessaires" },
    { step: "4", title: "Financement du projet", description: "Mise en place des solutions de financement les plus avantageuses" },
    { step: "5", title: "Réalisation des travaux", description: "Suivi et contrôle de la construction jusqu'à la livraison" }
  ],
  advantagesSection: {
    title: "Les avantages de faire construire",
    subtitle: "Pourquoi choisir la construction neuve pour votre projet immobilier"
  },
  advantages: [
    { title: "Personnalisation totale", description: "Concevez votre maison selon vos goûts et vos besoins spécifiques" },
    { title: "Économies d'énergie", description: "Construisez avec les dernières normes environnementales et réduisez vos factures" },
    { title: "Valeur patrimoniale", description: "Un bien neuf qui prendra de la valeur et répondra aux standards actuels" },
    { title: "Garanties constructeur", description: "Bénéficiez des garanties légales et des assurances décennale" }
  ],
  cta: {
    title: "Prêt à construire votre projet ?",
    subtitle: "Nos experts vous accompagnent dans toutes les étapes de votre construction",
    button: "Demander un devis gratuit"
  }
};

export async function generateMetadata() {
  return {
    title: "Faire Construire | Azalée Patrimoine",
    description: "Accompagnement complet pour la construction de votre maison ou immeuble avec Azalée Patrimoine.",
  };
}

export default async function FaireConstruirePage() {
  const content = await getPageContent('immobilier/faire-construire', defaultContent);
  
  if (!content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#253F60] to-[#B99066]"></div>
        
        <div className="relative max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#B99066] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Construction immobilière
              </span>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                {content.hero?.title}
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                {content.hero?.description}
              </p>
              <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                {content.hero?.button}
              </CTAButton>
            </div>
            <div className="flex justify-center">
              <img 
                src={content.hero?.image || defaultContent.hero.image} 
                alt="Construction immobilière" 
                className="w-full max-w-md rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.servicesSection?.title}
            subtitle={content.servicesSection?.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {(content.services || []).map((service, index) => {
              const isBlue = index % 2 === 0;
              const gradientClass = isBlue 
                ? "bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]" 
                : "bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]";
              
              return (
                <div key={index} className={`relative ${gradientClass} rounded-2xl p-6 shadow-xl text-white overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-white/90 text-sm mb-4">{service.description}</p>
                    <ul className="text-white/80 text-sm space-y-2">
                      {(service.features || []).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#B99066]">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.processSection?.title}
            subtitle={content.processSection?.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {(content.process || []).map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-[#253F60] font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-[#686868] text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.advantagesSection?.title}
            subtitle={content.advantagesSection?.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.advantages || []).map((advantage, index) => (
              <div key={index} className={`rounded-2xl p-6 shadow-lg text-white ${index % 2 === 0 ? 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]' : 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]'}`}>
                <h3 className="font-semibold text-lg mb-3">{advantage.title}</h3>
                <p className="text-white/90 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-br from-[#253F60] to-[#1a2d47] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
            {content.cta?.title}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            {content.cta?.subtitle}
          </p>
          <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="white">
            {content.cta?.button}
          </CTAButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
