"use client";
import React from "react";
import Link from "next/link";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function RetraiteProgressivePage() {
  return (
    <>
      <Header />
      
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
              <span className="text-[#B99066]">Retraite progressive</span>
            </nav>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-6 leading-tight">
              Retraite progressive : travailler moins pour partir mieux
            </h1>
            <p className="text-lg sm:text-xl font-inter text-white/90 max-w-3xl">
              La retraite progressive séduit de plus en plus de cadres et de dirigeants désireux de lever le pied sans cesser totalement leur activité.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Introduction */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Ce dispositif permet de percevoir une partie de sa pension de retraite tout en continuant à travailler, offrant ainsi une transition douce entre vie active et retraite complète.
            </p>
            <div className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 text-white">
              <p className="text-white text-base sm:text-lg font-inter leading-relaxed">
                Chez <strong className="text-[#B99066]">Azalée Patrimoine</strong>, nous aidons nos clients à optimiser cette phase clé, pour qu'elle devienne un levier de transmission, de sérénité et de stratégie patrimoniale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Qu'est-ce que la retraite progressive ? */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Qu'est-ce que la retraite progressive ?"
          />

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              La retraite progressive permet de cumuler une activité à temps partiel et une fraction de pension de retraite (de base et complémentaire).
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
              <strong className="text-[#253F60]">L'objectif :</strong> aménager la fin de carrière sans rompre brutalement avec le monde professionnel.
            </p>

            <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-6 rounded-xl mb-6">
              <h3 className="text-[#253F60] font-cairo font-bold mb-4 text-lg">
                Conditions principales :
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Être âgé d'au moins 60 ans,
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Justifier d'au moins 150 trimestres validés dans son relevé de carrière retraite,
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Exercer une activité à temps partiel (entre 40 % et 80% du temps complet),
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Et être affilié à un régime autorisant cette forme de retraite (salariés, fonctionnaires, artisans, commerçants, professions libérales sous conditions).
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[#4B5563] text-sm font-inter">
                  Les périodes travaillées à temps partiel continuent de générer des droits à la retraite, ce qui permet d'augmenter la pension future lors du passage en retraite définitive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Les avantages de la retraite progressive */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Les avantages de la retraite progressive"
          />

          <div className="space-y-8">
            {/* H3 - 1. Revenu sécurisé */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 sm:p-10 border-l-4 border-[#253F60] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 relative z-10">
                Un revenu sécurisé pendant la transition
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4 relative z-10">
                Le principal avantage est la stabilité du revenu :
              </p>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4 relative z-10">
                vous cumulez à la fois votre salaire à temps partiel et une partie de votre pension (souvent 30 à 60% du montant total).
              </p>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed relative z-10">
                Cela permet de préserver votre pouvoir d'achat sans puiser dans votre épargne.
              </p>
            </div>

            {/* H3 - 2. Optimisation fiscale */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 sm:p-10 border-l-4 border-[#B99066] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/5 rounded-bl-full"></div>
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 relative z-10">
                Une optimisation fiscale et patrimoniale
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6 relative z-10">
                Travailler à temps partiel tout en percevant une pension ouvre la possibilité de :
              </p>
              <ul className="space-y-3 mb-6 relative z-10">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Maintenir un revenu imposable maîtrisé,
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Continuer à alimenter votre <Link href="/placements/per" className="text-[#253F60] hover:text-[#B99066] font-bold underline">plan d'épargne retraite (PER)</Link> et bénéficier de déductions fiscales,
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Anticiper une sortie en capital du PER au moment de la retraite définitive.
                  </span>
                </li>
              </ul>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 border-l-4 border-[#253F60] p-4 rounded relative z-10">
                <p className="text-[#253F60] text-sm font-inter font-semibold">
                  En combinant retraite progressive et stratégie d'épargne retraite, il est possible de lisser la fiscalité et d'éviter une hausse d'imposition ponctuelle à la fin de carrière.
                </p>
              </div>
            </div>

            {/* H3 - 3. Transmission et formation */}
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 sm:p-10 border-l-4 border-[#253F60] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 relative z-10">
                Un levier pour transmettre et former
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6 relative z-10">
                Pour les chefs d'entreprise, la retraite progressive offre une transition douce vers la transmission :
              </p>
              <ul className="space-y-3 mb-6 relative z-10">
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Formation du successeur,
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Vente partielle de parts sociales,
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Accompagnement opérationnel du repreneur,
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B99066] mt-1 font-bold">•</span>
                  <span className="text-[#4B5563] text-base font-inter">
                    Maintien d'un revenu via la société ou un mandat de conseil.
                  </span>
                </li>
              </ul>
              <div className="bg-gradient-to-br from-[#B99066]/10 to-[#253F60]/10 border-l-4 border-[#B99066] p-4 rounded relative z-10">
                <p className="text-[#253F60] text-sm font-inter font-semibold">
                  Chez Azalée Patrimoine, nous accompagnons souvent des dirigeants qui utilisent la retraite progressive pour préparer une cession en douceur et optimiser leur fiscalité avant le départ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Calcul de la pension */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Comment est calculée la pension de retraite progressive ?"
          />

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Le montant de la pension versée dépend du temps de travail conservé.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl shadow-xl hover:shadow-2xl p-6 text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/10 rounded-bl-full"></div>
                <h4 className="font-cairo font-bold mb-4 text-lg relative z-10">Exemple 1</h4>
                <p className="font-inter text-sm mb-2 relative z-10">Si vous travaillez à <strong>60 %</strong></p>
                <p className="font-inter text-2xl font-bold text-[#B99066] relative z-10">Vous percevez 40 % de votre retraite</p>
              </div>

              <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl shadow-xl hover:shadow-2xl p-6 text-white transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/10 rounded-bl-full"></div>
                <h4 className="font-cairo font-bold mb-4 text-lg relative z-10">Exemple 2</h4>
                <p className="font-inter text-sm mb-2 relative z-10">Si vous travaillez à <strong>40 %</strong></p>
                <p className="font-inter text-2xl font-bold relative z-10">Vous percevez 60 % de votre retraite</p>
              </div>
            </div>

            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Le calcul est basé sur :
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Les droits acquis figurant dans votre relevé de carrière retraite,
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Votre régime (de base + complémentaire Arrco-Agirc),
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Le montant retraite minimum applicable selon vos trimestres validés.
                </span>
              </li>
            </ul>

            <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded">
              <div>
                <p className="text-[#4B5563] text-sm font-inter">
                  Lors de la liquidation définitive, une nouvelle estimation de votre pension est effectuée pour intégrer les droits supplémentaires accumulés pendant la période de retraite progressive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Fonctionnaires et professions libérales */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Et pour les fonctionnaires ou les professions libérales ?"
          />

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              La retraite progressive est désormais ouverte aux fonctionnaires (depuis septembre 2023), avec des modalités spécifiques :
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Cumul d'un revenu d'activité à temps partiel et d'une pension partielle,
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Calcul effectué sur le dernier traitement indiciaire,
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Maintien de la possibilité d'épargner sur un plan Préfon Retraite ou une RAFP.
                </span>
              </li>
            </ul>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Les professions libérales affiliées à la CNAVPL (CIPAV, CARPIMKO, etc.) peuvent également en bénéficier, sous réserve d'une activité partielle attestée.
            </p>
            <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
              <div className="flex items-start gap-3">
                <span className="text-gray-600">🌿</span>
                <p className="text-[#4B5563] text-sm font-inter">
                  Pour un fonctionnaire, cette formule est une façon efficace d'équilibrer la fin de carrière, tout en anticipant le futur taux de CSG retraite 2025 et la fiscalité des pensions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Retraite progressive et indemnités de départ */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Retraite progressive et indemnités de départ"
          />

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Dans le secteur privé, le passage en retraite progressive n'interrompt pas le contrat de travail.
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              L'indemnité ou la prime de départ à la retraite n'est donc versée qu'au moment de la retraite définitive.
            </p>
            <div className="bg-[#F9FAFB] border-l-4 border-[#B99066] p-4 rounded mb-6">
              <div>
                <p className="text-[#4B5563] text-sm font-inter">
                  Cela permet d'optimiser la gestion des revenus : vous continuez à cotiser, conservez vos droits et bénéficiez plus tard d'une prime complète.
                </p>
              </div>
            </div>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Chez Azalée Patrimoine, nous analysons l'impact de cette transition sur :
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Les cotisations retraite et chômage,
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Le montant net perçu après impôt,
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Et les opportunités de versement sur le <Link href="/placements/per" className="text-[#253F60] hover:text-[#B99066] font-bold underline">PER</Link> pour réduire votre fiscalité.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: Retraite progressive et planification patrimoniale */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Retraite progressive et planification patrimoniale"
          />

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Une phase de retraite progressive est souvent l'occasion de :
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  <strong className="text-[#253F60]">Rééquilibrer son patrimoine</strong> entre actifs professionnels et personnels,
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  <strong className="text-[#253F60]">Arbitrer ses contrats</strong> (<Link href="/placements/assurance-vie" className="text-[#253F60] hover:text-[#B99066] font-bold underline">assurance vie</Link>, capitalisation, <Link href="/placements/per" className="text-[#253F60] hover:text-[#B99066] font-bold underline">PER</Link>),
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  <strong className="text-[#253F60]">Préparer la transmission</strong> du patrimoine familial ou de l'entreprise,
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  <strong className="text-[#253F60]">Repenser ses besoins de prévoyance</strong> (maintien de revenus, conjoint survivant, dépendance).
                </span>
              </li>
            </ul>
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl shadow-xl hover:shadow-2xl p-6 text-white text-center transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#253F60]/10 rounded-tr-full"></div>
              <p className="text-lg font-cairo font-bold italic relative z-10">
                <strong>Objectif Azalée Patrimoine</strong> : transformer cette période de transition en levier de stabilité et de liberté financière.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Les erreurs à éviter */}
      <section className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Les erreurs à éviter"
          />

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="text-[#253F60] mt-1 font-bold">•</span>
                <div>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Croire que la retraite progressive diminue vos droits futurs : <strong className="text-[#253F60]">au contraire, elle les augmente.</strong>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#253F60] mt-1 font-bold">•</span>
                <div>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Négliger la fiscalité : le cumul pension + salaire peut vous faire <strong className="text-[#253F60]">changer de tranche d'imposition.</strong>
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#253F60] mt-1 font-bold">•</span>
                <div>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Oublier de vérifier votre <strong className="text-[#253F60]">relevé de carrière retraite</strong> avant la demande.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#253F60] mt-1 font-bold">•</span>
                <div>
                  <p className="text-[#4B5563] text-base font-inter leading-relaxed">
                    Ne pas prévoir de <Link href="/placements/per" className="text-[#253F60] hover:text-[#B99066] font-bold underline">PER</Link> ou d'<Link href="/placements/assurance-vie" className="text-[#253F60] hover:text-[#B99066] font-bold underline">assurance vie</Link> pour lisser vos revenus lors du passage à la retraite totale.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 9: Conclusion */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Conclusion : un tremplin vers une retraite choisie"
          />

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 border-2 border-[#253F60]/20">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              La retraite progressive est une solution intelligente et humaine :
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  elle permet de réduire le rythme sans perdre le lien avec son activité, tout en continuant à <strong className="text-[#253F60]">valoriser son patrimoine et sa transmission.</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <span className="text-[#4B5563] text-base font-inter">
                  Chez Azalée Patrimoine, nous accompagnons les cadres, dirigeants et professions libérales pour <strong className="text-[#253F60]">transformer</strong> cette étape en véritable stratégie d'<Link href="/retraite/independance-financiere" className="text-[#253F60] hover:text-[#B99066] font-bold underline">indépendance financière</Link>.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 lg:p-12 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <svg className="w-8 h-8 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold">
                Passez à l'action
              </h2>
            </div>
            <ul className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#B99066] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <p className="text-[#4B5563] text-base font-inter">
                  <strong className="text-[#253F60]">Simulez votre retraite progressive avec un expert Azalée Patrimoine</strong>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B99066] mt-1 font-bold">•</span>
                <p className="text-[#4B5563] text-base font-inter">
                  Découvrez votre pension estimée, votre taux de remplacement et les leviers fiscaux à activer.
                </p>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="https://calendly.com/rdv-azalee-patrimoine/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#253F60] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#253F60] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto"
              >
                Prendre rendez-vous avec un conseiller Azalée
              </a>
            </div>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <a
                href="mailto:contact@azalee-patrimoine.fr"
                className="text-[#253F60] hover:text-[#B99066] font-inter font-semibold text-base sm:text-lg transition-colors"
              >
                contact@azalee-patrimoine.fr
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link
                href="/retraite"
                className="text-[#B99066] hover:text-[#D4A574] font-inter font-semibold text-base transition-colors"
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


