"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";

export default function Page() {
  return (
    <>
      <Header />
      
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              <h1 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-semibold leading-tight mb-4">
                SCI : un outil de gestion et de transmission patrimoniale
              </h1>
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                La <strong>Société Civile Immobilière (SCI)</strong> est une structure juridique très utilisée par les familles et les investisseurs pour acheter, gérer et transmettre un bien immobilier à plusieurs. Elle permet de sortir du régime complexe de l'indivision et d'organiser de manière plus claire la répartition des droits et des décisions.
              </p>
              <p className="text-[#686868] text-base sm:text-lg font-inter leading-relaxed mb-6">
                La SCI est ainsi devenue un <strong>véritable outil de stratégie patrimoniale</strong>, que ce soit pour acquérir un bien avec des proches, préparer sa succession ou optimiser la fiscalité de ses revenus immobiliers.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#avantages" className="inline-flex items-center justify-center bg-[#B99066] text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#A67A5A] transition-colors">Les avantages</a>
                <a href="#fiscalite" className="inline-flex items-center justify-center bg-transparent border-2 border-[#253F60] text-[#253F60] px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#253F60] hover:text-white transition-colors">IR ou IS ?</a>
              </div>
            </div>
            
            {/* Right card */}
            <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-source-sans font-semibold leading-tight mb-2">SCI : gérez et transmettez</h2>
              <p className="text-sm opacity-90 mb-4">Outil puissant de gestion et de transmission patrimoniale</p>
              <ul className="space-y-2 text-sm font-source-sans font-semibold">
                <li className="flex items-start gap-2"><span>✓</span><span>Souplesse familiale</span></li>
                <li className="flex items-start gap-2"><span>✓</span><span>Gestion simplifiée</span></li>
                <li className="flex items-start gap-2"><span>✓</span><span>Optimisation fiscale IR/IS</span></li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a href="#conseil" className="bg-white text-[#253F60] px-5 py-3 rounded-lg font-inter font-medium hover:bg-[#F9FAFB] transition-colors">Conseil expert</a>
                <a href="#fiscalite" className="border-2 border-white text-white px-5 py-3 rounded-lg font-inter font-medium hover:bg-white hover:text-[#253F60] transition-colors">Fiscalité</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les avantages de la SCI */}
      <section id="avantages" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">Les avantages de la SCI</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Découvrez les bénéfices de cette structure patrimoniale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Souplesse familiale</h3>
              <p className="text-[#686868] text-base font-inter leading-relaxed">
                La SCI facilite la transmission d'un patrimoine. Les associés peuvent donner progressivement des parts sociales à leurs enfants, tout en bénéficiant de l'abattement de <strong>100 000 € par parent et par enfant</strong>, renouvelable tous les 15 ans. Cela permet d'anticiper une succession tout en conservant une maîtrise sur le patrimoine.
              </p>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Gestion simplifiée</h3>
              <p className="text-[#686868] text-base font-inter leading-relaxed">
                Contrairement à l'indivision, source fréquente de blocages entre héritiers, la SCI offre une <strong>gouvernance claire</strong> : un gérant est désigné, et les règles de prise de décision sont fixées dans les statuts.
              </p>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Optimisation fiscale</h3>
              <p className="text-[#686868] text-base font-inter leading-relaxed mb-4">
                La SCI offre la possibilité de choisir entre deux régimes fiscaux :
              </p>
              <ul className="text-[#686868] text-base font-inter space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-[#253F60]/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-[#253F60] rounded-full"></div>
                  </div>
                  <span><strong>SCI à l'IR</strong> : revenus imposés directement chez les associés</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-[#B99066]/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                  </div>
                  <span><strong>SCI à l'IS</strong> : amortissement possible du bien</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Les inconvénients de la SCI */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">Les inconvénients de la SCI</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Points de vigilance essentiels à connaître avant de créer une SCI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Formalités de création et de gestion</h3>
              <p className="text-[#686868] text-base font-inter leading-relaxed">
                Une SCI nécessite des statuts, une assemblée générale annuelle et une comptabilité plus stricte qu'une détention en direct.
              </p>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#B99066] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#B99066]/5 rounded-bl-full"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#B99066] to-[#A67A5A] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Responsabilité des associés</h3>
              <p className="text-[#686868] text-base font-inter leading-relaxed">
                Chacun est <strong>indéfiniment responsable</strong> des dettes sociales, à hauteur de sa participation.
              </p>
            </div>
            
            <div className="group relative bg-gradient-to-br from-white via-[#F9FAFB] to-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#253F60] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#253F60]/5 rounded-bl-full"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[#253F60] font-cairo font-bold text-xl mb-4 text-center">Choix fiscal piégeux</h3>
              <p className="text-[#686868] text-base font-inter leading-relaxed">
                Le passage à l'IS peut sembler attractif (grâce à l'amortissement), mais il entraîne une <strong>fiscalité lourde sur la plus-value</strong> à la revente, car celle-ci est calculée sur la valeur nette comptable (après amortissements) et non sur le prix d'achat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCI à l'IR ou SCI à l'IS */}
      <section id="fiscalite" className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">SCI à l'IR ou SCI à l'IS : quel régime choisir ?</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Comparez les deux régimes fiscaux pour choisir celui qui vous convient
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                  <h3 className="text-2xl sm:text-3xl font-cairo font-bold">SCI à l'IR</h3>
                </div>
                <p className="text-base sm:text-lg mb-6 leading-relaxed">
                  Adaptée pour des investisseurs qui perçoivent des <strong>loyers modestes</strong> ou qui souhaitent profiter de dispositifs comme le <strong>déficit foncier</strong>.
                </p>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base">
                      <strong>Avantages :</strong> Fiscalité simple, déficit foncier possible
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base">
                      <strong>Inconvénients :</strong> Fiscalité lourde si revenus élevés (tranche marginale d'imposition)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] rounded-2xl p-8 sm:p-10 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[#253F60] rounded-full"></div>
                  <h3 className="text-2xl sm:text-3xl font-cairo font-bold">SCI à l'IS</h3>
                </div>
                <p className="text-base sm:text-lg mb-6 leading-relaxed">
                  Intéressante pour des projets générant <strong>beaucoup de loyers</strong> ou nécessitant d'importants travaux.
                </p>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base">
                      <strong>Avantages :</strong> Amortissement possible, réduction du bénéfice imposable
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <p className="text-base">
                      <strong>Inconvénients :</strong> Sortie pénalisante, plus-value calculée sur valeur réduite
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tableau comparatif */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#E5E7EB]">
                <thead className="bg-[#F9FAFB]">
                  <tr>
                    <th className="text-left text-[#253F60] font-source-sans font-semibold px-4 py-3 border border-[#E5E7EB]">Critère</th>
                    <th className="text-left text-[#253F60] font-source-sans font-semibold px-4 py-3 border border-[#E5E7EB]">SCI à l'IR</th>
                    <th className="text-left text-[#253F60] font-source-sans font-semibold px-4 py-3 border border-[#E5E7EB]">SCI à l'IS</th>
                  </tr>
                </thead>
                <tbody className="text-[#686868] font-inter">
                  <tr className="border-t border-[#E5E7EB]">
                    <td className="px-4 py-3 font-medium border border-[#E5E7EB]">Imposition des revenus</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Directement chez les associés (revenus fonciers)</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Au niveau de la société (IS)</td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB] bg-[#F9FAFB]">
                    <td className="px-4 py-3 font-medium border border-[#E5E7EB]">Amortissement</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Non possible</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Possible (réduit le résultat imposable)</td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB]">
                    <td className="px-4 py-3 font-medium border border-[#E5E7EB]">Déficit foncier</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Possible</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Non applicable</td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB] bg-[#F9FAFB]">
                    <td className="px-4 py-3 font-medium border border-[#E5E7EB]">Plus-value à la revente</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Régime des particuliers (abattements durée)</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Calculée sur valeur nette comptable</td>
                  </tr>
                  <tr className="border-t border-[#E5E7EB]">
                    <td className="px-4 py-3 font-medium border border-[#E5E7EB]">Profil adapté</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Loyers modestes, déficit foncier</td>
                    <td className="px-4 py-3 border border-[#E5E7EB]">Gros loyers, importants travaux</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Exemple concret */}
      <section className="w-full bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">Exemple concret</h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Un cas pratique pour mieux comprendre l'utilité de la SCI
            </p>
          </div>
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-10 bg-gradient-to-b from-[#B99066] to-[#A67A5A] rounded-full"></div>
                <h3 className="text-2xl sm:text-3xl font-cairo font-bold">
                  Deux frères héritent d'un immeuble évalué à 600 000 €
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg">
                  <h4 className="font-cairo font-bold text-xl mb-4 text-white">Sans SCI (indivision)</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-500/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Chaque décision doit être prise à l'unanimité</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-500/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Risque de blocages familiaux</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-500/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Gestion complexe</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-500/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Transmission difficile</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/30 shadow-lg">
                  <h4 className="font-cairo font-bold text-xl mb-4 text-white">Avec SCI</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Création d'une SCI avec statuts clairs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Choix du régime IR (abattements durée)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Gérant désigné avec pouvoirs définis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#B99066] rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed">Évite les blocages familiaux</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-xl p-6 sm:p-8 border-l-4 border-white shadow-lg">
                <p className="text-base sm:text-lg text-center leading-relaxed font-medium">
                  <strong>Résultat :</strong> Les statuts définissent les pouvoirs du gérant et évitent les blocages familiaux. Les frères peuvent anticiper la transmission progressive à leurs enfants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conseil Azalée Patrimoine */}
      <section id="conseil" className="w-full bg-gradient-to-b from-white via-[#F9FAFB] to-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-4">
              Conseil Azalée Patrimoine
            </h2>
            <p className="text-[#686868] text-base sm:text-lg max-w-2xl mx-auto">
              Expertise et accompagnement personnalisé pour votre projet
            </p>
          </div>
          
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B99066]/10 rounded-tr-full"></div>
            
            <div className="relative z-10 space-y-8 sm:space-y-10">
            <div className="space-y-6">
              <p className="text-lg text-center">
                La SCI est un <strong>outil puissant de gestion et de transmission</strong>, mais elle doit être maniée avec précaution. Le choix entre <strong>IR et IS</strong> est une décision stratégique qui doit être prise en fonction de votre fiscalité actuelle, de vos revenus et de vos projets à long terme.
              </p>
              
              <p className="text-lg text-center">
                Chez <strong>Azalée Patrimoine</strong>, nous accompagnons nos clients pour :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  </div>
                  <h3 className="font-semibold mb-2">Créer leur SCI</h3>
                  <p className="text-sm">Avec des statuts adaptés à leur situation familiale</p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  </div>
                  <h3 className="font-semibold mb-2">Choisir le régime fiscal</h3>
                  <p className="text-sm">Le plus pertinent (IR ou IS)</p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  </div>
                  <h3 className="font-semibold mb-2">Anticiper la transmission</h3>
                  <p className="text-sm">De leurs biens immobiliers dans un cadre fiscal optimisé</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <p className="text-sm">
                  La SCI n'est pas une simple "boîte à outils" juridique : bien pensée, elle devient un <strong>véritable levier patrimonial</strong> qui sécurise votre patrimoine familial sur plusieurs générations.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-[#F9FAFB] py-10 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#253F60] to-[#B99066] rounded-lg p-8 sm:p-10 lg:p-12 text-center">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6">
              Prêt à créer votre SCI ?
            </h2>
            <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-2xl mx-auto">
              Nos experts Azalée Patrimoine vous accompagnent pour savoir si la SCI est adaptée à votre situation et définir la fiscalité la plus avantageuse (IR ou IS).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-white text-[#253F60] px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#F9FAFB] transition-colors duration-200"
              >
                Prendre rendez-vous
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:contact@azalee-patrimoine.fr'}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-white hover:text-[#253F60] transition-colors duration-200"
              >
                Nous écrire
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}