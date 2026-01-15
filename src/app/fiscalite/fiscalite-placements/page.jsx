import { notFound } from 'next/navigation';
import { getPageContent } from '@/lib/cms-server';
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";
import CTAButton from '@/components/ui/CTAButton';

const defaultContent = {
  hero: {
    title: "Fiscalité des placements financiers",
    subtitle: "Ce qu'il faut absolument comprendre. La performance d'un placement ne se mesure pas uniquement à son rendement brut. En réalité, c'est le rendement net d'impôt qui détermine l'efficacité de votre stratégie patrimoniale.",
    button: "Simuler mes placements",
    image: "/images/fiscalite-placements-hero.jpg"
  },
  quickStats: {
    title: "Taux de prélèvement",
    stats: [
      { label: "PFU", value: "30%", description: "Prélèvement Forfaitaire Unique" },
      { label: "Prélèvements sociaux", value: "17.2%", description: "CSG, CRDS, etc." },
      { label: "TMI moyen", value: "14%", description: "Taux Marginal d'Imposition" }
    ]
  },
  regimesFiscaux: {
    title: "Les grands régimes fiscaux des placements",
    description: "Comprendre les différences entre les enveloppes fiscales",
    regimes: [
      {
        name: "CTO - Compte-titres ordinaire",
        description: "Support de gestion libre, mais non protégé fiscalement",
        fiscalite: "Flat tax (PFU) de 30% (12,8% IR + 17,2% prél. sociaux)",
        caracteristiques: [
          "Dividendes et coupons soumis à la flat tax",
          "Plus-values avec report des moins-values pendant 10 ans",
          "Fiscalité due chaque année, dès la réalisation",
          "Ouverture possible en personne morale (SCI, holding)"
        ],
        avantages: "Fiscalement neutre mais stratégiquement utile",
        inconvenients: "Arbitrages à court terme, titres non-éligibles au PEA, logique de transmission",
        icon: ""
      },
      {
        name: "PEA - Plan d'Épargne en Actions",
        description: "Enveloppe fiscale fermée, limitée aux actions européennes",
        fiscalite: "Exonération d'IR sur les plus-values après 5 ans",
        caracteristiques: [
          "Réservé aux personnes physiques majeures résidentes fiscales en France",
          "Plafond de versement : 150 000€",
          "Titres éligibles : actions européennes uniquement",
          "Durée de détention : 5 ans minimum"
        ],
        avantages: "Exonération d'IR sur les plus-values après 5 ans",
        inconvenients: "Limitation géographique, plafond de versement",
        icon: ""
      },
      {
        name: "PER - Plan d'Épargne Retraite",
        description: "Enveloppe fiscale pour la retraite",
        fiscalite: "Réduction d'impôt sur les versements",
        caracteristiques: [
          "Réduction d'impôt sur les versements",
          "Sortie en rente ou capital",
          "Plafond : 10% du revenu net imposable",
          "Engagement jusqu'à la retraite"
        ],
        avantages: "Réduction d'impôt immédiate",
        inconvenients: "Blocage des capitaux jusqu'à la retraite",
        icon: ""
      }
    ]
  },
  analysis: {
    title: "Ce qu'il faut absolument analyser avant de choisir",
    description: "Les critères essentiels pour optimiser votre stratégie de placement",
    criteria: [
      {
        title: "Durée de placement visée",
        description: "Fiscalité à court ou long terme ?",
        icon: ""
      },
      {
        title: "Objectif patrimonial",
        description: "Transmission, rente, capital ?",
        icon: ""
      },
      {
        title: "Tranche marginale d'imposition (TMI)",
        description: "L'enveloppe optimale varie selon le profil fiscal",
        icon: ""
      },
      {
        title: "Liquidité / disponibilité",
        description: "Certains supports bloquent les capitaux (PER)",
        icon: ""
      }
    ]
  },
  simulation: {
    title: "Simulation comparative",
    description: "Investissement 100 000€ sur 8 ans, performance brute 20 000€",
    note: "Avec des frais de gestion/fonctionnement moyens estimés à 0,5%/an sur la base du capital investi, soit -4 000€ sur 8 ans :",
    table: {
      headers: ["Enveloppe", "Fiscalité applicable", "Impôt", "Frais estimés", "Gain net final"],
      rows: [
        {
          enveloppe: "CTO",
          fiscalite: "PFU 30%",
          impot: "6 000€",
          frais: "4 000€",
          gain: "10 000€"
        },
        {
          enveloppe: "PEA (>5 ans)",
          fiscalite: "17,2% PS",
          impot: "3 440€",
          frais: "4 000€",
          gain: "12 560€"
        },
        {
          enveloppe: "PER",
          fiscalite: "Réduction IR",
          impot: "0€",
          frais: "4 000€",
          gain: "16 000€"
        }
      ]
    }
  },
  cta: {
    title: "Besoin d'aide pour optimiser vos placements ?",
    description: "Nos experts en fiscalité vous accompagnent pour choisir la meilleure stratégie de placement selon votre profil.",
    buttonText: "Demander une consultation gratuite"
  },
  seo: {
    metaTitle: "Fiscalité des Placements Financiers | Azalée Patrimoine",
    metaDescription: "Découvrez la fiscalité des placements financiers avec Azalée Patrimoine."
  }
};

export async function generateMetadata() {
  const content = await getPageContent('fiscalite/fiscalite-placements', defaultContent);
  return {
    title: content?.seo?.metaTitle || defaultContent.seo.metaTitle,
    description: content?.seo?.metaDescription || defaultContent.seo.metaDescription,
  };
}

export default async function FiscalitePlacementsPage() {
  const content = await getPageContent('fiscalite/fiscalite-placements', defaultContent);
  
  if (!content) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-6xl font-cairo font-bold text-white mb-4 sm:mb-6">
                {content.hero?.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white mb-6 sm:mb-8 leading-relaxed">
                {content.hero?.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <CTAButton 
                  externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-inter font-semibold hover:bg-[#A67A5A] transition-colors text-sm sm:text-base shadow-lg"
                >
                  {content.hero?.button}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.quickStats?.title}
            subtitle="Comprendre les taux de prélèvement applicables"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(content.quickStats?.stats || []).map((stat, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl sm:text-5xl font-bold mb-3">{stat.value}</div>
                  <div className="text-xl font-cairo font-semibold mb-2">{stat.label}</div>
                  <div className="text-white/90 text-sm">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Régimes Fiscaux Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.regimesFiscaux?.title}
            subtitle={content.regimesFiscaux?.description}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {(content.regimesFiscaux?.regimes || []).map((regime, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 3 === 0 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : index % 3 === 1 ? 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]' : 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-full"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-cairo font-bold mb-3">{regime.name}</h3>
                  <p className="text-white/90 mb-4 leading-relaxed text-sm">{regime.description}</p>
                  <div className={`${index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} text-white px-4 py-2 rounded-full text-xs font-inter font-medium mb-4 inline-block`}>
                    {regime.fiscalite}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-cairo font-semibold mb-2 text-sm">Caractéristiques :</h4>
                      <ul className="text-xs text-white/95 space-y-2">
                        {(regime.caracteristiques || []).map((carac, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className={`w-4 h-4 ${index % 3 === 0 || index % 3 === 2 ? 'bg-[#B99066]' : 'bg-[#253F60]'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span>{carac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-cairo font-semibold mb-1 text-sm ${index % 3 === 0 || index % 3 === 2 ? 'text-[#B99066]' : 'text-[#253F60]'}`}>Avantages :</h4>
                      <p className="text-xs text-white/90">{regime.avantages}</p>
                    </div>
                    <div>
                      <h4 className="font-cairo font-semibold mb-1 text-sm text-white/80">Inconvénients :</h4>
                      <p className="text-xs text-white/80">{regime.inconvenients}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.analysis?.title}
            subtitle={content.analysis?.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {(content.analysis?.criteria || []).map((criterion, index) => (
              <div key={index} className={`group relative rounded-2xl p-8 shadow-xl text-white overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${index % 4 === 0 || index % 4 === 2 ? 'bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60]' : 'bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066]'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 ${index % 4 === 0 || index % 4 === 2 ? 'bg-gradient-to-br from-[#B99066] to-[#A67A5A]' : 'bg-gradient-to-br from-[#253F60] to-[#1a2d47]'} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-cairo font-semibold mb-2">{criterion.title}</h3>
                  <p className="text-white/90 text-sm">{criterion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title={content.simulation?.title}
            subtitle={content.simulation?.description}
          />
          <p className="text-sm text-[#686868] italic text-center mb-8 max-w-3xl mx-auto">
            {content.simulation?.note}
          </p>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E5E7EB]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] text-white">
                  <tr>
                    {(content.simulation?.table?.headers || []).map((header, index) => (
                      <th key={index} className="px-6 py-4 text-left font-cairo font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(content.simulation?.table?.rows || []).map((row, index) => (
                    <tr key={index} className={`border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                      <td className="px-6 py-4 font-cairo font-semibold text-[#253F60]">{row.enveloppe}</td>
                      <td className="px-6 py-4 text-[#374151]">{row.fiscalite}</td>
                      <td className="px-6 py-4 text-[#374151]">{row.impot}</td>
                      <td className="px-6 py-4 text-[#374151]">{row.frais}</td>
                      <td className="px-6 py-4 font-cairo font-semibold text-[#B99066]">{row.gain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                {content.cta?.title}
              </h2>
              <p className="text-white text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {content.cta?.description}
              </p>
              <CTAButton 
                externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min"
                className="bg-[#B99066] text-white px-8 py-4 rounded-full font-source-sans font-semibold text-lg hover:bg-[#A67C52] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {content.cta?.buttonText}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
