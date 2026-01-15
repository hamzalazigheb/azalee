import Link from "next/link";
import Footer from "../../../components/common/Footer";
import { getPageContent } from '@/lib/cms-server';

export const defaultContent = {
  hero: {
    title: "Qu'est-ce que le rachat de trimestres ?",
    subtitle: "Optimisez votre retraite en complétant votre carrière et en réduisant la décote sur votre pension.",
    breadcrumb: {
      parent: "Retraite",
      current: "Rachat de trimestres"
    }
  },
  seo: {
    metaTitle: "Rachat de Trimestres | Azalée Patrimoine",
    metaDescription: "Optimisez votre retraite en complétant votre carrière et en réduisant la décote sur votre pension grâce au rachat de trimestres."
  }
};

export async function generateMetadata() {
  const content = await getPageContent('retraite/rachat-trimestres', defaultContent);
  return {
    title: content.seo?.metaTitle || defaultContent.seo.metaTitle,
    description: content.seo?.metaDescription || defaultContent.seo.metaDescription,
  };
}

export default async function RachatTrimestresPage() {
  const content = await getPageContent('retraite/rachat-trimestres', defaultContent);
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[400px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            {/* Breadcrumb */}
            <nav className="flex items-center text-white/80 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span className="mx-2">{'>'}</span>
              <Link href="/retraite" className="hover:text-white transition-colors">Retraite</Link>
              <span className="mx-2">{'>'}</span>
              <span className="text-[#B99066]">Rachat de trimestres</span>
            </nav>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 leading-tight">
              {content.hero?.title || defaultContent.hero.title}
            </h1>
            <p className="text-lg sm:text-xl font-inter text-white/90 max-w-3xl">
              {content.hero?.subtitle || defaultContent.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Qu'est-ce que le rachat de trimestres ? */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-12">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Le <strong className="text-[#253F60]">rachat de trimestres</strong> (également appelé <strong className="text-[#253F60]">"versement pour la retraite"</strong>) est un mécanisme permettant à un assuré d'acheter, jusqu'à un maximum de <strong className="text-[#B99066]">12 trimestres</strong>, des trimestres manquants dans sa carrière.
            </p>
            
            <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white mb-6">
              <h2 className="text-xl sm:text-2xl font-cairo font-bold mb-4">
                Les objectifs du rachat de trimestres
              </h2>
              <ul className="space-y-3 text-base font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                  <span>Augmenter sa durée d'assurance validée (et ainsi se rapprocher du taux plein).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                  <span>Supprimer ou réduire la décote appliquée à sa pension si le nombre de trimestres requis n'est pas atteint à l'âge légal.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-6 sm:p-8 border-l-4 border-[#B99066]">
              <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                Ce mécanisme s'adresse principalement aux personnes ayant des années incomplètes (études, apprentissage, périodes d'activité réduite) et qui souhaitent optimiser leur pension de retraite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pourquoi envisager un rachat ? */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              Pourquoi envisager un rachat ?
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Les situations qui justifient cette démarche
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Plusieurs situations peuvent justifier un rachat de trimestres :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B99066]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-cairo font-bold mb-2">Études supérieures</h3>
                    <p className="text-sm font-inter text-white/90">
                      Avoir eu des années d'études supérieures ou d'apprentissage où les 4 trimestres annuels n'ont pas été validés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B99066]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-cairo font-bold mb-2">Carrière incomplète</h3>
                    <p className="text-sm font-inter text-white/90">
                      Avoir travaillé à temps partiel, changé de statut, ou créé une entreprise, entraînant un manque de trimestres pour atteindre la durée d'assurance complète.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-cairo font-bold mb-2">Retraite anticipée</h3>
                    <p className="text-sm font-inter text-white/90">
                      Souhaiter partir à la retraite plus tôt ou simplement augmenter sa pension en supprimant la décote.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#B99066] to-[#A67C52] rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-cairo font-bold mb-2">Optimisation</h3>
                    <p className="text-sm font-inter text-white/90">
                      Augmenter le montant de sa pension en éliminant la décote appliquée en cas de carrière incomplète.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-[#B99066] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="text-[#253F60] font-cairo font-bold mb-2">Important : Simulation obligatoire</h3>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Avant de procéder, il est essentiel de réaliser une <strong className="text-[#253F60]">simulation</strong> car le coût est élevé, et il faut s'assurer que l'opération est rentable selon votre profil (âge, revenus, départ prévu).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Le barème 2025 */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            Le barème 2025 : montants et critères
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
              Le coût du rachat d'un trimestre en 2025 dépend de <strong className="text-[#253F60]">trois facteurs principaux</strong> :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white text-center">
                <div className="w-16 h-16 bg-[#B99066]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-cairo font-bold mb-2">Votre âge</h3>
                <p className="text-sm font-inter text-white/90">
                  Au moment de la demande
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white text-center">
                <div className="w-16 h-16 bg-[#B99066]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-cairo font-bold mb-2">Vos revenus</h3>
                <p className="text-sm font-inter text-white/90">
                  Des 3 dernières années
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white text-center">
                <div className="w-16 h-16 bg-[#B99066]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-cairo font-bold mb-2">L'option choisie</h3>
                <p className="text-sm font-inter text-white/90">
                  Type de rachat
                </p>
              </div>
            </div>

            {/* Les deux options */}
            <div className="space-y-6">
              <div className="bg-[#F9FAFB] rounded-xl p-6 sm:p-8 border-2 border-[#253F60]/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center text-white font-cairo font-bold">
                    1
                  </div>
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold">
                    Option 1 : Rachat pour le taux seul
                  </h3>
                </div>
                <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                  Cette option signifie <strong className="text-[#253F60]">uniquement améliorer votre taux de liquidation</strong>, c'est-à-dire éviter ou réduire la décote appliquée à votre pension de base.
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl p-6 sm:p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-cairo font-bold">
                    2
                  </div>
                  <h3 className="text-xl sm:text-2xl font-cairo font-bold">
                    Option 2 : Rachat pour le taux et la durée d'assurance
                  </h3>
                </div>
                <p className="text-base font-inter leading-relaxed text-white/90">
                  Cette option consiste à <strong>améliorer le taux</strong> (comme l'option 1) <strong>plus</strong> prendre en compte les trimestres supplémentaires pour <strong>augmenter le montant de la pension</strong>.
                </p>
                <p className="text-sm font-inter text-white/80 mt-3 italic">
                  Cette option est généralement plus coûteuse mais peut être plus avantageuse sur le long terme.
                </p>
              </div>
            </div>

            {/* PASS 2025 et tranches de revenus */}
            <div className="mt-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-cairo font-bold mb-4 text-[#B99066]">
                Le Plafond Annuel de la Sécurité Sociale (PASS) 2025
              </h3>
              <p className="text-2xl sm:text-3xl font-cairo font-bold mb-6">
                47 100 €
              </p>
              <p className="text-base font-inter text-white/90 mb-6">
                Trois tranches de revenus sont retenues :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm font-inter text-white/80 mb-2">Tranche 1</p>
                  <p className="font-cairo font-bold text-lg">Revenus &lt; 35 325 €</p>
                  <p className="text-xs font-inter text-white/70 mt-1">(&lt; 75% du PASS)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm font-inter text-white/80 mb-2">Tranche 2</p>
                  <p className="font-cairo font-bold text-lg">35 325 € - 47 100 €</p>
                  <p className="text-xs font-inter text-white/70 mt-1">(75% - 100% du PASS)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm font-inter text-white/80 mb-2">Tranche 3</p>
                  <p className="font-cairo font-bold text-lg">Revenus &gt; 47 100 €</p>
                  <p className="text-xs font-inter text-white/70 mt-1">(&gt; 100% du PASS)</p>
                </div>
              </div>
            </div>

            {/* Exemples chiffrés */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                Exemple chiffré pour un rachat d'un trimestre
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#253F60]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#253F60] rounded-full flex items-center justify-center text-white font-cairo font-bold">
                      1
                    </div>
                    <h4 className="text-[#253F60] font-cairo font-bold">Option "Taux seul"</h4>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3">À 50 ans, revenus &lt; 35 325 €</p>
                  <p className="text-2xl font-cairo font-bold text-[#B99066] mb-2">2 672 €</p>
                  <p className="text-xs text-[#6B7280]">Coût approximatif pour 1 trimestre</p>
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#B99066]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#B99066] rounded-full flex items-center justify-center text-white font-cairo font-bold">
                      2
                    </div>
                    <h4 className="text-[#253F60] font-cairo font-bold">Option "Taux et durée"</h4>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3">À 50 ans, revenus &gt; 47 100 €</p>
                  <p className="text-2xl font-cairo font-bold text-[#B99066] mb-2">5 279 €</p>
                  <p className="text-xs text-[#6B7280]">Coût approximatif pour 1 trimestre</p>
                </div>
              </div>
              <div className="mt-6 bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
                <p className="text-sm text-[#4B5563] font-inter italic">
                  Ces montants peuvent paraître élevés, d'où l'importance de la simulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Rentabilité & fiscalité */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            Rentabilité & fiscalité
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-8">
            <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl mb-6">
              <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                Le montant versé pour un rachat de trimestres est <strong className="text-[#253F60]">déductible de vos revenus imposables sans plafond spécifique</strong> (dans la limite de l'intérêt fiscal) : cela en fait une opportunité pour les contribuables ayant une tranche d'imposition élevée.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl">
              <h3 className="text-[#253F60] font-cairo font-bold mb-4">Toutefois :</h3>
              <ul className="space-y-4 text-[#4B5563] text-base font-inter">
                <li className="flex items-start gap-3">
                  <span className="text-[#253F60] mt-1 font-bold">•</span>
                  <span>Plus vous êtes <strong className="text-[#253F60]">jeune</strong> au moment du rachat, plus l'opération est rentable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#253F60] mt-1 font-bold">•</span>
                  <span>Plus vos <strong className="text-[#253F60]">revenus sont élevés/futurs</strong> et plus le rachat peut avoir du sens.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#253F60] mt-1 font-bold">•</span>
                  <span>Il faut comparer le <strong className="text-[#253F60]">coût actuel vs le gain en pension attendu</strong>. Si vous êtes très proche de l'âge légal ou de la durée requise, le gain peut être limité.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Démarches & conditions */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            Démarches & conditions
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-cairo font-bold mb-2">Conditions d'âge</h3>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Vous devez être âgé de <strong className="text-[#253F60]">20 ans minimum</strong> et n'avoir <strong className="text-[#253F60]">pas encore liquidé votre pension personnelle</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-cairo font-bold mb-2">Années concernées</h3>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Le rachat concerne des années pour lesquelles <strong className="text-[#253F60]">moins de 4 trimestres ont été validés</strong> (ex : années d'études supérieures, années d'apprentissage, années incomplètes).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-cairo font-bold mb-2">Démarche administrative</h3>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Une demande doit être déposée auprès de votre caisse de retraite (ex. Caisse nationale d'assurance vieillesse) <strong className="text-[#253F60]">avant votre départ à la retraite</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">!</span>
                </div>
                <div>
                  <h3 className="text-[#253F60] font-cairo font-bold mb-2">Évaluation préalable</h3>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Vérifiez l'intérêt de l'opération au regard de votre génération (durée d'assurance requise), de votre date de départ et du <strong className="text-[#253F60]">coût vs gain</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-6 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#253F60] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-[#253F60] font-cairo font-bold mb-2">Opération irréversible</h3>
                    <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                      Une fois le paiement effectué, l'opération est <strong className="text-[#253F60]">irréversible</strong>. Il est donc essentiel de bien réfléchir et de simuler avant de s'engager.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: À quel moment envisager un rachat ? */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            À quel moment envisager un rachat ?
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
              Voici quelques bonnes règles :
            </p>

            <div className="space-y-6">
              {/* Règle 1 */}
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B99066]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-cairo font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="font-cairo font-bold mb-3 text-lg">Si vous manquez plusieurs trimestres et êtes jeune</h3>
                    <p className="font-inter leading-relaxed text-white/90">
                      Si vous manquez <strong>plusieurs trimestres</strong> pour atteindre la durée requise de votre génération et que vous êtes relativement <strong>jeune (ex : 40-50 ans)</strong>, cela peut valoir le coup.
                    </p>
                  </div>
                </div>
              </div>

              {/* Règle 2 */}
              <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-cairo font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="font-cairo font-bold mb-3 text-lg">Si vous prévoyez un départ anticipé</h3>
                    <p className="font-inter leading-relaxed text-white/90">
                      Si vous prévoyez un <strong>départ anticipé</strong> ou souhaitez <strong>augmenter sensiblement votre pension</strong>, l'option « taux et durée » peut s'envisager.
                    </p>
                  </div>
                </div>
              </div>

              {/* Règle 3 */}
              <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#E5E7EB]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-cairo font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-[#253F60] font-cairo font-bold mb-3 text-lg">Si vous êtes proche de l'âge légal</h3>
                    <p className="text-[#4B5563] font-inter leading-relaxed">
                      Si vous êtes très près de l'âge légal, ou que vous manquerez <strong className="text-[#253F60]">peu de trimestres (ex : 1 ou 2)</strong> et que vos <strong className="text-[#253F60]">revenus sont modestes</strong>, l'opération peut ne pas être rentable. Il vaut alors mieux attendre ou privilégier d'autres leviers d'optimisation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Règle 4 */}
              <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#B99066]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-cairo font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="font-cairo font-bold mb-3 text-lg">En cas de changement professionnel</h3>
                    <p className="font-inter leading-relaxed text-white/90">
                      Si vous êtes en situation de <strong>changement professionnel, augmentation de revenus ou création de structure (société...)</strong>, il peut être judicieux de différer le rachat ou de l'anticiper selon la trajectoire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Points clés à retenir */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            Points clés à retenir
          </h2>

          <div className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed">
                  Chaque trimestre racheté coûte plusieurs milliers d'euros dans de nombreux cas ; l'enjeu est réel.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed">
                  Le barème 2025 est basé sur le PASS 2025 et dépend fortement de l'âge et des revenus.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed">
                  Le paiement est déductible fiscalement : effet levier pour les profils fortement imposés.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed">
                  Un rachat ne garantit pas automatiquement un gain important : tout dépend de la situation personnelle.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p className="text-white text-base sm:text-lg font-inter leading-relaxed font-bold">
                  Faites toujours une simulation personnalisée avant d'engager l'opération.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: En résumé */}
      <section className="w-full bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            En résumé
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Le rachat de trimestres peut être un outil puissant pour optimiser votre retraite, mais ce n'est pas systématiquement rentable. Il nécessite :
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                <span className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                  une analyse fine de votre parcours, de vos revenus et de votre âge ;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                <span className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                  un calcul rigoureux du coût vs gain potentiel ;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold text-xl">•</span>
                <span className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                  une bonne <strong className="text-[#253F60]">anticipation fiscale</strong> et patrimoniale.
                </span>
              </li>
            </ul>

            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Dans une stratégie globale de retraite (comme celle que vous construisez avec Azalée Patrimoine), il peut intervenir comme un complément intéressant — mais toujours comme élément intégré à un plan patrimonial plus large (placements, fiscalité, revenus passifs…).
            </p>

            <div className="mt-8 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 text-center">
              <p className="text-white text-base sm:text-lg font-inter mb-4">
                Pour un bilan complet de votre situation et une simulation personnalisée,{' '}
                <a 
                  href="https://calendly.com/rdv-azalee-patrimoine/30min" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold underline hover:text-[#253F60] transition-colors"
                >
                  contactez-nous
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 15: Rééquilibrer les retraites au sein du couple */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12 text-center">
            Rééquilibrer les retraites au sein du couple : une stratégie patrimoniale souvent négligée
          </h2>

          {/* H3: Pourquoi existe-t-il un déséquilibre ? */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Pourquoi existe-t-il un déséquilibre entre les retraites au sein du couple ?
            </h3>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                Dans de nombreux foyers, un déséquilibre s'installe naturellement au fil du temps entre les deux carrières.
              </p>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                Souvent, l'un des conjoints – généralement celui qui s'est occupé des enfants – voit sa trajectoire professionnelle ralentie, voire interrompue.
              </p>
              <p className="text-[#253F60] font-cairo font-bold mb-4 text-lg">Résultat :</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Une carrière hachée, marquée par des périodes à temps partiel ou des congés parentaux,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Une progression salariale freinée,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Des cotisations retraite réduites,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Et in fine, une pension bien plus faible à la retraite.</span>
                </li>
              </ul>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Ce décalage devient encore plus flagrant lorsque l'on aborde la question de la réversion : en cas de décès du conjoint le mieux rémunéré, la pension reversée n'est ni automatique ni intégrale, et son montant dépend du régime d'affiliation, des ressources et de la situation maritale.
              </p>
              <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded mt-6">
                <p className="text-[#4B5563] text-base font-inter">
                  Ce déséquilibre peut donc fragiliser la sécurité financière du conjoint survivant.
                </p>
              </div>
            </div>
          </div>

          {/* H3: Le PER conjugal */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Le PER conjugal : un levier intelligent pour rétablir l'équilibre
            </h3>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20 mb-6">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
                Pour compenser cette inégalité de parcours, de plus en plus de couples choisissent de verser sur le Plan d'Épargne Retraite (PER) du conjoint le moins avantagé.
              </p>
              <p className="text-[#253F60] font-cairo font-bold mb-6 text-lg">
                Cette solution présente plusieurs atouts majeurs :
              </p>
            </div>

            {/* H4: Rééquilibrer les revenus futurs */}
            <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 sm:p-10 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">1️⃣</span>
                </div>
                <h4 className="text-white text-xl sm:text-2xl font-cairo font-bold">
                  Rééquilibrer les revenus futurs du couple
                </h4>
              </div>
              <div className="ml-16">
                <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed mb-4">
                  En alimentant le PER du conjoint le plus faiblement pensionné, on crée une source de revenus personnels à la retraite, indépendante de la pension de réversion.
                </p>
                <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed">
                  C'est une forme de solidarité patrimoniale prévoyante, qui permet d'assurer une meilleure équité dans les revenus futurs.
                </p>
              </div>
            </div>

            {/* H4: Avantage fiscal */}
            <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl shadow-lg p-8 sm:p-10 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">2️⃣</span>
                </div>
                <h4 className="text-white text-xl sm:text-2xl font-cairo font-bold">
                  Profiter d'un avantage fiscal immédiat
                </h4>
              </div>
              <div className="ml-16">
                <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed mb-4">
                  Les versements effectués sur le PER du conjoint sont déductibles du revenu imposable commun, dans la limite du plafond global retraite du foyer fiscal.
                </p>
                <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed">
                  Autrement dit, l'effort d'épargne du couple est mutualisé fiscalement :
                </p>
                <p className="text-white font-bold text-lg mt-4 italic">
                  Ce que vous versez pour votre conjoint réduit vos impôts tout en préparant sa retraite.
                </p>
              </div>
            </div>

            {/* H4: Sécuriser la retraite */}
            <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 sm:p-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#B99066] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">3️⃣</span>
                </div>
                <h4 className="text-white text-xl sm:text-2xl font-cairo font-bold">
                  Sécuriser la retraite du conjoint le plus exposé
                </h4>
              </div>
              <div className="ml-16">
                <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed">
                  Le PER offre une souplesse de gestion et une protection successorale.
                </p>
                <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed mt-4">
                  Les sommes versées appartiennent au titulaire du contrat, mais le capital est transmissible selon une clause bénéficiaire personnalisée, hors succession, et avec une fiscalité allégée.
                </p>
              </div>
            </div>
          </div>

          {/* H3: Exemple concret */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Exemple concret : le cas de Sophie et Marc
            </h3>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#253F60]/20">
                  <h4 className="text-[#253F60] font-cairo font-bold mb-3">Sophie, 45 ans</h4>
                  <p className="text-[#4B5563] text-sm font-inter">
                    A interrompu sa carrière pendant 8 ans pour élever leurs trois enfants.
                  </p>
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-6 border-2 border-[#B99066]/20">
                  <h4 className="text-[#253F60] font-cairo font-bold mb-3">Marc, 47 ans</h4>
                  <p className="text-[#4B5563] text-sm font-inter">
                    Cadre dirigeant, perçoit un revenu annuel de 120 000 €.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#B99066] to-[#A67C52] rounded-xl p-6 mb-6">
                <p className="text-white font-cairo font-bold mb-4 text-lg">
                  En 2025, le couple décide de verser 15 000 € sur le PER de Sophie :
                </p>
                <div className="space-y-3 text-white">
                  <div className="flex items-start gap-3">
                    <span className="font-bold">•</span>
                    <span className="font-inter">
                      <strong>Déduction fiscale immédiate :</strong> 15 000 € × 41 % = 6 150 € d'économie d'impôt,
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold">•</span>
                    <span className="font-inter">
                      <strong>Capitalisation sur 20 ans à 4 % net :</strong> ≈ 33 000 € à 65 ans,
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold">•</span>
                    <span className="font-inter">
                      <strong>Sortie possible</strong> en rente ou capital, non conditionnée à la réversion.
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9FAFB] border-l-4 border-[#253F60] p-4 rounded">
                <p className="text-[#4B5563] text-base font-inter">
                  Ce choix permet de corriger le déséquilibre de pension entre les deux époux, tout en optimisant la fiscalité du couple dès aujourd'hui.
                </p>
              </div>
            </div>
          </div>

          {/* H3: Réversion, fiscalité, patrimoine */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              Réversion, fiscalité, patrimoine : l'importance d'une stratégie de couple
            </h3>
            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
                L'idée n'est pas seulement de préparer deux retraites distinctes, mais de penser la stratégie patrimoniale du couple comme un tout :
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Anticiper la perte de revenus du survivant,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Protéger le conjoint avec des solutions contractuelles souples,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Maintenir un niveau de vie commun à long terme,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">Et réduire l'impact fiscal année après année.</span>
                </li>
              </ul>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                Le PER conjugal s'inscrit dans cette logique d'équilibre durable entre solidarité familiale, fiscalité intelligente et vision patrimoniale long terme.
              </p>
            </div>
          </div>

          {/* H3: L'approche Azalée Patrimoine */}
          <div className="mb-12">
            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
              L'approche Azalée Patrimoine
            </h3>
            <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl shadow-lg p-8 sm:p-10 text-white">
              <p className="text-white/90 text-base sm:text-lg font-inter leading-relaxed mb-6">
                Chez Azalée Patrimoine, nous accompagnons les couples dans la construction d'un patrimoine équitable et résilient, prenant en compte :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-white/90 text-base font-inter">les écarts de carrière,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-white/90 text-base font-inter">la fiscalité du foyer,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-white/90 text-base font-inter">la protection du conjoint,</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-white/90 text-base font-inter">et la stratégie de transmission.</span>
                </li>
              </ul>
              <div className="bg-[#B99066]/20 rounded-xl p-6 mt-6 border border-[#B99066]/30">
                <p className="text-white font-cairo font-bold text-lg italic text-center">
                  Notre mission : transformer vos revenus en patrimoine, et votre patrimoine en liberté — pour vous deux.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Planifiez votre consultation gratuite */}
          <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl shadow-2xl p-8 sm:p-10 text-center">
            <h3 className="text-white text-2xl sm:text-3xl font-cairo font-bold mb-4">
              Planifiez votre consultation gratuite
            </h3>
            <p className="text-white/90 text-base sm:text-lg font-inter mb-6">
              Vous souhaitez évaluer le niveau de retraite futur de votre couple et optimiser vos versements PER ?
            </p>
            <p className="text-white text-lg sm:text-xl font-inter font-bold mb-6">
              Prenez rendez-vous avec un conseiller Azalée Patrimoine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:bg-[#F9FAFB] w-full sm:w-auto"
              >
                Planifiez votre consultation gratuite
              </a>
              <a
                href="mailto:contact@azalee-patrimoine.fr"
                className="bg-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:bg-[#1a2d47] w-full sm:w-auto"
              >
                contact@azalee-patrimoine.fr
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-[#253F60] via-[#1e3a5a] to-[#253F60] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-4 sm:mb-6">
              Besoin d'un conseil personnalisé sur le rachat de trimestres ?
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Nos experts Azalée Patrimoine vous accompagnent dans l'évaluation de la rentabilité d'un rachat de trimestres selon votre profil et vos objectifs de retraite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto"
              >
                Demander une simulation gratuite
              </a>
              <Link
                href="/retraite"
                className="bg-gradient-to-r from-[#B99066] to-[#A67C52] hover:from-[#A67C52] hover:to-[#B99066] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto"
              >
                Retour à la page Retraite
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
