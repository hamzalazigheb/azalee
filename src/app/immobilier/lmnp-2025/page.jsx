import Link from 'next/link';
import Footer from '../../../components/common/Footer';
import CTAButton from '@/components/ui/CTAButton';

export const metadata = {
  title: "LMNP 2025 | Azalée Patrimoine",
  description: "LMNP 2025 : le meublé reste-t-il un bon investissement après la réforme ? Découvrez l'impact de la nouvelle fiscalité et comment adapter votre stratégie.",
};

export default function LMNP2025Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm font-inter">
            <Link href="/immobilier" className="text-[#6B7280] hover:text-[#253F60]">
              Immobilier
            </Link>
            <span className="text-[#6B7280]">/</span>
            <span className="text-[#253F60] font-semibold">LMNP 2025</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold text-[#253F60] mb-8">
              LMNP 2025 : le meublé reste-t-il un bon investissement après la réforme ?
            </h1>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-6">
                Un tournant dans la fiscalité du meublé
              </h2>
              <p className="text-lg font-inter text-[#374151] leading-relaxed mb-4">
                Depuis plus de dix ans, la location meublée non professionnelle (LMNP) séduit les investisseurs particuliers. Grâce à son régime fiscal avantageux, elle permettait de percevoir des loyers peu ou pas imposés grâce à l'amortissement comptable du bien.
              </p>
              <p className="text-lg font-inter text-[#374151] leading-relaxed mb-4">
                Mais à partir du <strong className="text-[#253F60] font-semibold">1ᵉʳ janvier 2025</strong>, la règle change : les amortissements pratiqués pendant la durée de détention devront désormais être réintégrés dans le calcul de la plus-value lors de la revente.
              </p>
              <p className="text-lg font-inter text-[#374151] leading-relaxed mb-4">
                Autrement dit, si le LMNP continue d'offrir une belle rentabilité pendant la phase de location, il devient plus fiscalisé au moment de la cession.
              </p>
              <p className="text-lg font-inter text-[#253F60] font-semibold leading-relaxed">
                Alors, faut-il encore investir en LMNP en 2025 ? Et comment adapter sa stratégie ?
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-6">
                1️⃣ Rappel : qu'est-ce que le LMNP et pourquoi il a tant séduit
              </h2>
              <p className="text-lg font-inter text-[#374151] leading-relaxed mb-4">
                Le LMNP (Loueur en Meublé Non Professionnel) est un dispositif qui permet de louer un logement meublé tout en bénéficiant d'une fiscalité spécifique. Contrairement à la location nue (soumise aux revenus fonciers), les loyers meublés sont imposés dans la catégorie des BIC (Bénéfices Industriels et Commerciaux).
              </p>
              
              <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-6 border-l-4 border-[#B99066] shadow-md mb-6">
                <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4">
                  💡 Deux régimes possibles
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-cairo font-bold text-[#253F60] mb-2">Le micro-BIC :</h4>
                    <ul className="space-y-2 text-base font-inter text-[#374151]">
                      <li>• Abattement forfaitaire de 50 % sur les loyers</li>
                      <li>• Simplicité de gestion, pas de comptabilité complète</li>
                      <li>• Idéal si les charges sont faibles</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-cairo font-bold text-[#253F60] mb-2">Le régime réel simplifié :</h4>
                    <ul className="space-y-2 text-base font-inter text-[#374151]">
                      <li>• Déduction de toutes les charges réelles (intérêts, travaux, assurances…)</li>
                      <li>• Possibilité d'amortir la valeur du bien (hors terrain) et du mobilier</li>
                      <li>• Résultat : revenus peu ou pas imposés pendant 10 à 15 ans</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-base font-inter text-[#374151]">
                  C'est ce dernier régime qui a fait le succès du LMNP : il permettait de transformer un loyer en revenu net d'impôt, tout en préparant sa retraite ou un complément de revenus.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-6">
                2️⃣ Ce qui change en 2025 : l'impact sur la plus-value à la revente
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4">
                    Jusqu'à fin 2024
                  </h3>
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] shadow-lg">
                    <p className="text-base font-inter text-[#374151] mb-4">
                      Les amortissements déduits au fil des années n'étaient pas repris lors de la revente. Un investisseur pouvait donc vendre son bien sans que les amortissements réduisent son prix d'acquisition fiscal.
                    </p>
                    <div className="bg-[#F9FAFB] rounded-lg p-4">
                      <p className="text-sm font-inter text-[#253F60] font-semibold mb-2">Exemple avant réforme :</p>
                      <ul className="space-y-1 text-sm font-inter text-[#374151]">
                        <li>• Achat du bien : 200 000 €</li>
                        <li>• Amortissements cumulés sur 10 ans : 100 000 €</li>
                        <li>• Revente : 300 000 €</li>
                        <li className="mt-2 font-semibold text-[#253F60]">➡️ Plus-value = 300 000 – 200 000 = 100 000 €</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-cairo font-bold text-[#253F60] mb-4">
                    Désormais, depuis la Loi de Finances 2025
                  </h3>
                  <div className="bg-gradient-to-br from-[#253F60] to-[#2d4a6b] rounded-xl p-6 text-white shadow-lg">
                    <p className="text-base font-inter mb-4">
                      Les amortissements pratiqués sont réintégrés dans le calcul de la plus-value. Le prix d'achat retenu pour le calcul fiscal devient donc le prix d'acquisition diminué des amortissements cumulés.
                    </p>
                    <div className="bg-white/10 rounded-lg p-4 mt-4">
                      <p className="text-sm font-inter font-semibold mb-2">Exemple après réforme :</p>
                      <ul className="space-y-1 text-sm font-inter">
                        <li>• Achat : 200 000 €</li>
                        <li>• Amortissements pratiqués : 100 000 €</li>
                        <li>• Revente : 300 000 €</li>
                        <li className="mt-2">➡️ Prix d'achat fiscal = 200 000 – 100 000 = 100 000 €</li>
                        <li className="font-semibold text-[#B99066]">➡️ Plus-value imposable = 300 000 – 100 000 = 200 000 €</li>
                      </ul>
                    </div>
                    <p className="mt-4 text-base font-inter italic">
                      La plus-value imposable double, alors même que les loyers ont été partiellement défiscalisés pendant la détention.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-6 border-l-4 border-[#B99066] shadow-md">
                <p className="text-base font-inter text-[#374151] leading-relaxed italic">
                  💬 En clair : le LMNP reste attractif pour générer des revenus réguliers, mais la note fiscale à la sortie sera plus élevée.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-6">
                3️⃣ Pourquoi cette réforme a été introduite
              </h2>
              <p className="text-lg font-inter text-[#374151] leading-relaxed">
                Le législateur a souhaité harmoniser la fiscalité du meublé avec celle du foncier classique et du statut LMP (Loueur Meublé Professionnel). Jusqu'ici, le LMNP bénéficiait d'un avantage jugé "trop favorable" : les contribuables pouvaient cumuler amortissements et régime de plus-value des particuliers, ce qui n'était pas le cas pour les professionnels ou les sociétés. La réforme 2025 vise donc à réduire cet écart de traitement, sans remettre en cause le statut en lui-même.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-6">
                4️⃣ Le LMNP reste-t-il rentable en 2025 ?
              </h2>
              <p className="text-lg font-inter text-[#374151] leading-relaxed mb-6">
                Oui, mais différemment. La rentabilité immédiate reste bonne, surtout en période de taux stabilisés et de tension locative. Ce qui change, c'est la rentabilité nette finale après revente.
              </p>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full bg-white rounded-xl shadow-lg border-2 border-[#E5E7EB]">
                  <thead className="bg-gradient-to-r from-[#B99066] to-[#A67A5A] text-white">
                    <tr>
                      <th className="p-4 text-left font-cairo font-bold"></th>
                      <th className="p-4 text-center font-cairo font-bold">Avant 2025</th>
                      <th className="p-4 text-center font-cairo font-bold">Après 2025</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    <tr className="hover:bg-[#F9FAFB]">
                      <td className="p-4 font-inter font-semibold text-[#253F60]">Revenus imposables annuels</td>
                      <td className="p-4 text-center font-inter text-[#374151]">0 € (amortis)</td>
                      <td className="p-4 text-center font-inter text-[#374151]">0 € (amortis)</td>
                    </tr>
                    <tr className="hover:bg-[#F9FAFB] bg-[#F9FAFB]/50">
                      <td className="p-4 font-inter font-semibold text-[#253F60]">Plus-value imposable</td>
                      <td className="p-4 text-center font-inter text-[#374151]">100 000 €</td>
                      <td className="p-4 text-center font-inter text-[#374151]">200 000 €</td>
                    </tr>
                    <tr className="hover:bg-[#F9FAFB]">
                      <td className="p-4 font-inter font-semibold text-[#253F60]">Impôt total sur la PV (IR + PS)</td>
                      <td className="p-4 text-center font-inter text-[#374151]">~36 200 €</td>
                      <td className="p-4 text-center font-inter text-[#374151]">~72 400 €</td>
                    </tr>
                    <tr className="hover:bg-[#F9FAFB] bg-[#F9FAFB]/50">
                      <td className="p-4 font-inter font-semibold text-[#253F60]">Rendement global sur 10 ans</td>
                      <td className="p-4 text-center font-inter font-bold text-[#B99066]">5,6 %</td>
                      <td className="p-4 text-center font-inter font-bold text-[#253F60]">4,9 %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-base font-inter text-[#374151]">
 La rentabilité baisse légèrement, mais reste supérieure à la location nue, qui affiche rarement plus de 3,5 % net.
              </p>
            </div>

            {/* Sections 5-9 */}
            <div className="mb-12 space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-4">
                  5️⃣ Comment limiter l'impact fiscal de la réforme
                </h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] shadow-lg">
                    <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-3">1️⃣ Allonger l'horizon de détention</h3>
                    <p className="text-base font-inter text-[#374151]">
                      Les abattements pour durée de détention restent inchangés : Exonération d'impôt sur la plus-value après 22 ans, Exonération totale (impôt + prélèvements sociaux) après 30 ans.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] shadow-lg">
                    <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-3">2️⃣ Anticiper la revente</h3>
                    <p className="text-base font-inter text-[#374151]">
                      Si la revente est prévue à court ou moyen terme (5 à 10 ans), il est essentiel de simuler la plus-value imposable avec les amortissements cumulés.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] shadow-lg">
                    <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-3">3️⃣ Envisager une structure à l'IS (SCI ou SARL de famille)</h3>
                    <p className="text-base font-inter text-[#374151]">
                      Les sociétés soumises à l'IS permettent de continuer à amortir intégralement le bien, mais elles supportent une fiscalité différente.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] shadow-lg">
                    <h3 className="text-lg font-cairo font-bold text-[#253F60] mb-3">4️⃣ Diversifier avec la pierre papier</h3>
                    <p className="text-base font-inter text-[#374151]">
                      Les SCPI restent une alternative ou un complément intéressant : Rendement de 4 à 6 % selon les fonds, Gestion déléguée, Possibilité de loger les parts dans une assurance vie pour optimiser la fiscalité.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-4">
                  6️⃣ LMNP vs location nue : que choisir aujourd'hui ?
                </h2>
                <p className="text-lg font-inter text-[#374151] leading-relaxed">
                  En 2025, le LMNP reste plus rentable pour qui gère bien sa stratégie et accepte une fiscalité de sortie plus lourde. Le tableau comparatif montre que le rendement net moyen du LMNP (4,5% à 5,5%) reste supérieur à la location nue (3% à 3,5%).
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-4">
                  7️⃣ Le LMNP : toujours un outil de préparation de revenus
                </h2>
                <p className="text-lg font-inter text-[#374151] leading-relaxed">
                  Même fiscalisé à la sortie, le LMNP conserve trois atouts majeurs : Des revenus récurrents, Une fiscalité douce pendant la détention, Une grande flexibilité. C'est donc toujours un vecteur puissant de diversification patrimoniale.
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-4">
                  8️⃣ Exemple concret : rentabilité d'un LMNP en 2025
                </h2>
                <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] shadow-lg">
                  <p className="text-base font-inter text-[#374151] mb-4">
                    Bien à Lyon, 220 000 € (180 000 € amortissables), Loyers : 11 000 €/an, Charges : 3 500 €/an, Amortissement : 7 000 €/an, Revente après 10 ans : 300 000 €
                  </p>
                  <p className="text-base font-inter text-[#253F60] font-semibold">
                    Résultat : le LMNP reste performant sur le revenu courant, mais son rendement global à long terme diminue.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-cairo font-bold text-[#253F60] mb-4">
                  9️⃣ Comment Azalée Patrimoine accompagne ses clients LMNP
                </h2>
                <p className="text-lg font-inter text-[#374151] leading-relaxed mb-4">
                  Chez Azalée Patrimoine, chaque projet de location meublée est étudié selon quatre axes : Rendement locatif réel, Impact fiscal global, Scénario de revente, Optimisation patrimoniale.
                </p>
                <div className="bg-gradient-to-r from-[#F9FAFB] to-white rounded-xl p-6 border-l-4 border-[#B99066] shadow-md">
                  <p className="text-base font-inter text-[#374151] leading-relaxed italic">
                    💬 "Notre rôle n'est pas de vendre du meublé, mais d'aider à le piloter intelligemment dans une stratégie patrimoniale durable."
                  </p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="mb-12 bg-gradient-to-br from-[#253F60] to-[#2d4a6b] rounded-xl p-8 text-white shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-cairo font-bold mb-6">
                Conclusion : le LMNP reste un bon placement… à condition d'être accompagné
              </h2>
              <p className="text-lg font-inter leading-relaxed mb-4">
                Le LMNP 2025 marque la fin d'une ère "tout défiscalisation", mais pas celle de la rentabilité immobilière. C'est désormais un outil mature : performant pendant la phase de location, fiscalisé à la sortie, mais toujours pertinent pour qui veut diversifier son patrimoine et sécuriser des revenus réguliers.
              </p>
              <p className="text-lg font-inter leading-relaxed mb-6">
                La loi de finance 2026, va-t-elle préserver cet avantage ? C'est la question qui est sur toutes les lèvres. Chez Azalee Patrimoine, nous réfléchissons déjà à la suite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min">
                  Demandez une simulation personnalisée de votre projet LMNP
                </CTAButton>
                <a 
                  href="/guides/investir-meuble-2025.pdf"
                  className="bg-white text-[#253F60] hover:bg-gray-100 font-inter font-semibold px-6 py-3 rounded-lg transition-all duration-300 text-center"
                >
                  Téléchargez le guide "Investir dans le meublé en 2025"
                </a>
              </div>
            </div>

            {/* Retour */}
            <div className="text-center">
              <Link 
                href="/immobilier"
                className="inline-flex items-center text-[#253F60] hover:text-[#B99066] font-inter font-semibold transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour à la page Immobilier
              </Link>
            </div>
          </article>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
