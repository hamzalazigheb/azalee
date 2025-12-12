"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import Link from "next/link";

export default function ProduitsStructuresPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold leading-tight mb-6 text-center">
            Comprendre les produits structurés
          </h1>
          <p className="text-white/90 text-lg sm:text-xl text-center max-w-3xl mx-auto">
            Un contrat à géométrie maîtrisée pour votre patrimoine
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Les Unités de Compte Structurées (UCS), plus connues sous le nom de produits structurés, sont des solutions d'investissement sur mesure, situées entre le fonds en euros et le marché actions.
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              Elles reposent sur un contrat tripartite entre le client, son conseiller en gestion de patrimoine (CGP) et un broker (maison de structuration, souvent adossée à une banque d'investissement).
            </p>
          </div>

          {/* H2 - Définition */}
          <div className="mb-16">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8">
              Définition d'une UCS
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-6">
              Une UCS est un engagement contractuel définissant à l'avance :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#253F60]">
                <p className="font-semibold text-[#253F60] mb-2">📊 Un sous-jacent</p>
                <p className="text-sm text-[#4B5563]">l'indice ou le panier d'actions dont dépend la performance du produit.</p>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
                <p className="font-semibold text-[#253F60] mb-2">💰 Un rendement</p>
                <p className="text-sm text-[#4B5563]">fixe ou conditionnel selon l'évolution du sous-jacent.</p>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#253F60]">
                <p className="font-semibold text-[#253F60] mb-2">🕒 Un horizon de placement</p>
                <p className="text-sm text-[#4B5563]">durée d'investissement (souvent 3 à 8 ans).</p>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
                <p className="font-semibold text-[#253F60] mb-2">💎 Une protection du capital</p>
                <p className="text-sm text-[#4B5563]">partielle ou totale, selon les scénarios définis au départ.</p>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#253F60] md:col-span-2">
                <p className="font-semibold text-[#253F60] mb-2">🔄 Des règles de liquidité</p>
                <p className="text-sm text-[#4B5563]">conditions de sortie anticipée (autocall) ou de revente avant échéance.</p>
              </div>
            </div>
            <div className="mt-6 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                <span className="font-semibold text-[#253F60]">En résumé :</span> le produit définit dès le départ les conditions de gain et les limites de perte : le client sait dans quelles situations il gagne, et jusqu'où il est protégé.
              </p>
            </div>
          </div>

          {/* H2 - Les éléments clés */}
          <div className="mb-16">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8">
              Les éléments clés d'un produit structuré
            </h2>

            {/* H3 - Sous-jacent */}
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                1️⃣ Le sous-jacent
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Le sous-jacent est la référence sur laquelle repose la performance du produit. C'est la "boussole" du contrat : si elle monte ou reste stable, le rendement est déclenché ; si elle baisse, la protection joue (ou non).
              </p>
              <p className="font-semibold text-[#253F60] mb-4">Les sous-jacents les plus utilisés sont :</p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Indices boursiers larges :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563]">
                    <li>EuroStoxx 50 (zone euro, référence historique et stable)</li>
                    <li>S&P 500 (États-Unis, utilisé pour des versions dollarisées)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Paniers sectoriels thématiques :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563]">
                    <li>Luxe (LVMH, Hermès, Kering, Richemont…)</li>
                    <li>Banques (BNP Paribas, Société Générale, Crédit Agricole…)</li>
                    <li>Technologies / IA (Nvidia, ASML, SAP, Microsoft…)</li>
                    <li>Santé / Pharma (Sanofi, Roche, Novo Nordisk…)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Taux d'intérêt ou indices monétaires :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563]">
                    <li>Euribor 12 mois (taux interbancaire européen)</li>
                    <li>CMS 10 ans (Constant Maturity Swap, indicateur de taux longs)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
                <p className="font-semibold text-[#253F60]">💬 Astuce Azalée :</p>
                <p className="text-[#4B5563] text-sm">un bon sous-jacent n'est pas celui qui "fera le plus de performance", mais celui dont la volatilité permet de structurer un rendement attractif sans compromettre la protection.</p>
              </div>
            </div>

            {/* H3 - Rendement */}
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                2️⃣ Le rendement
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Le rendement d'une UCS peut être :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-[#4B5563]">
                <li><span className="font-semibold">Fixe</span> : un taux annuel garanti si le sous-jacent respecte les conditions prévues (ex : +6 %/an si l'indice ne baisse pas de plus de 30 %).</li>
                <li><span className="font-semibold">Conditionnel</span> : versé uniquement si certaines barrières sont respectées (ex : coupon versé chaque année si l'indice ne baisse pas au-delà d'un seuil).</li>
              </ul>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Certains produits offrent un <span className="font-semibold">effet mémoire</span> : Si un coupon n'a pas été versé une année (barrière franchie), il est rattrapé les années suivantes dès que la condition redevient favorable. Cela permet de lisser la performance dans le temps.
              </p>
            </div>

            {/* H3 - Horizon */}
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                3️⃣ L'horizon de placement
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Les produits structurés ont une durée de vie déterminée à l'avance, généralement entre 3 et 8 ans. Mais certains peuvent s'arrêter avant si la performance cible est atteinte : c'est le mécanisme d'<span className="font-semibold">autocall</span> (voir plus bas).
              </p>
              <div className="bg-gradient-to-r from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 border-l-4 border-[#B99066]">
                <p className="font-semibold text-[#253F60]">🕰️ Conseil Azalée :</p>
                <p className="text-[#4B5563] text-sm">investir dans une UCS suppose de pouvoir immobiliser le capital sur toute la durée, même si des sorties anticipées peuvent survenir.</p>
              </div>
            </div>

            {/* H3 - Protection */}
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                4️⃣ La protection du capital
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                La promesse de sécurité est au cœur du produit structuré. La protection peut être :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-[#4B5563]">
                <li><span className="font-semibold">Totale</span> (100 % du capital à l'échéance, sauf faillite de l'émetteur)</li>
                <li><span className="font-semibold">Partielle</span> (ex : capital protégé à 90 % ou 80 %), ou</li>
                <li><span className="font-semibold">Conditionnelle</span> : le capital est protégé tant que le sous-jacent ne baisse pas de plus de X % (barrière de protection).</li>
              </ul>
              <div className="bg-white rounded-lg p-6 border-2 border-[#253F60]/20 mb-4">
                <p className="font-semibold text-[#253F60] mb-2">Exemple :</p>
                <p className="text-[#4B5563] text-sm mb-2">Si la barrière de protection est à –40 % et que l'indice baisse de 35 %, vous récupérez 100 % du capital.</p>
                <p className="text-[#4B5563] text-sm">Si l'indice chute de 50 %, vous perdez 50 % du capital à l'échéance.</p>
              </div>
            </div>

            {/* H3 - Liquidité */}
            <div className="mb-12">
              <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-bold mb-6">
                5️⃣ Les règles de liquidité
              </h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                Les produits structurés sont liquides par nature (cotés chaque semaine ou chaque mois), mais la revente avant échéance peut entraîner : un gain ou une perte selon le marché, et parfois des frais de sortie.
              </p>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mt-4">
                En pratique, la plupart des investisseurs attendent l'échéance ou la sortie anticipée automatique (autocall).
              </p>
            </div>
          </div>

          {/* H2 - Familles de produits */}
          <div className="mb-16">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8">
              Les principales familles de produits structurés
            </h2>

            {/* Phoenix */}
            <div className="mb-12 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">Le Phoenix</h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                C'est le produit le plus répandu.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-[#4B5563]">
                <li>Rendement conditionnel, souvent à effet mémoire,</li>
                <li>Versement de coupons périodiques si l'indice reste au-dessus d'une barrière (ex : –40 %),</li>
                <li>Remboursement anticipé possible chaque année si l'indice est stable ou en hausse.</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-4">
                  <p className="font-semibold text-[#253F60] mb-2">🔁 Phoenix "mémoire"</p>
                  <p className="text-sm text-[#4B5563]">les coupons manqués sont rattrapés.</p>
                </div>
                <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-4">
                  <p className="font-semibold text-[#253F60] mb-2">⚙️ Phoenix "non mémoire"</p>
                  <p className="text-sm text-[#4B5563]">seuls les coupons respectant la condition sont versés.</p>
                </div>
              </div>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mt-4">
                <span className="font-semibold"> Objectif :</span> générer des revenus réguliers avec protection conditionnelle du capital.
              </p>
            </div>

            {/* Athena */}
            <div className="mb-12 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">L'Athena</h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                C'est une variante du Phoenix où le rendement est capitalisé et versé en une fois à l'échéance (ou lors d'une sortie anticipée).
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-[#4B5563]">
                <li>Pas de coupon périodique,</li>
                <li>Mais un rendement cumulé si la condition est respectée à une date donnée.</li>
              </ul>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                <span className="font-semibold"> Objectif :</span> viser un rendement optimisé pour un horizon défini, sans distribution intermédiaire.
              </p>
            </div>

            {/* Autocall */}
            <div className="mb-12 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">L'Autocall (ou callable)</h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Le mécanisme d'autocall permet une sortie automatique anticipée si le sous-jacent atteint un certain niveau à une date d'observation.
              </p>
              <div className="bg-white rounded-lg p-4 border-2 border-[#253F60]/20 mb-4">
                <p className="font-semibold text-[#253F60] mb-2">Exemple :</p>
                <p className="text-[#4B5563] text-sm">Si après 2 ans, l'indice EuroStoxx 50 est supérieur à son niveau initial, le produit est remboursé avec un gain de +12 %.</p>
              </div>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                <span className="font-semibold"> Objectif :</span> verrouiller le gain dès qu'une performance cible est atteinte, sans attendre la maturité.
              </p>
            </div>

            {/* Structures à base de taux */}
            <div className="mb-12 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">Les structures à base de taux (Euribor / CMS)</h3>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Ces produits reposent sur l'évolution des taux d'intérêt plutôt que des indices actions.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-[#4B5563]">
                <li><span className="font-semibold">Euribor 12 mois</span> : mesure les taux à court terme entre les banques européennes.</li>
                <li><span className="font-semibold">CMS 10 ans</span> : reflète les taux à long terme.</li>
              </ul>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
                Ces produits peuvent offrir :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4 text-[#4B5563]">
                <li>des coupons fixes liés à un écart de taux (steepener),</li>
                <li>ou des rendements croissants si les taux montent / baissent selon le scénario.</li>
              </ul>
              <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                <span className="font-semibold"> Objectif :</span> profiter des cycles de taux d'intérêt sans passer par le marché actions.
              </p>
            </div>
          </div>

          {/* Tableau récapitulatif */}
          <div className="mb-16">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8">
              En résumé : les 5 piliers d'une UCS
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#253F60] to-[#B99066] text-white">
                    <th className="p-4 text-left font-bold">Élément</th>
                    <th className="p-4 text-left font-bold">Rôle</th>
                    <th className="p-4 text-left font-bold">Exemple concret</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-4 font-semibold text-[#253F60]">Sous-jacent</td>
                    <td className="p-4">Support de référence</td>
                    <td className="p-4">EuroStoxx 50, panier Luxe, CMS 10 ans</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold text-[#253F60]">Rendement</td>
                    <td className="p-4">Fixe ou conditionnel</td>
                    <td className="p-4">+9 %/an si l'indice ne baisse pas de plus de 40 %</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#253F60]">Protection</td>
                    <td className="p-4">Totale ou conditionnelle</td>
                    <td className="p-4">Capital garanti sauf baisse &gt; 40 %</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold text-[#253F60]">Durée</td>
                    <td className="p-4">3 à 8 ans</td>
                    <td className="p-4">Autocall annuel possible</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#253F60]">Liquidité</td>
                    <td className="p-4">Quotidienne mais limitée</td>
                    <td className="p-4">Revente possible avant échéance selon marché</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl p-8 text-white">
              <p className="text-lg font-semibold mb-2">💬 Signature Azalée Patrimoine :</p>
              <p className="text-lg">"Un produit structuré bien choisi n'est pas un pari sur les marchés, c'est une stratégie de bon sens : savoir d'avance combien on gagne, combien on risque, et pour combien de temps."</p>
            </div>
          </div>

          {/* Sélection Azalée */}
          <div className="mb-16">
            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8">
              La sélection de produits structurés d'AZALEE pour le 2025/2026
            </h2>

            {/* Produit 1 - Athena Luxe */}
            <div className="mb-8 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#253F60] flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-2">
                    ATHENA DÉGRESSIF LUXE – JUILLET 2025 (FR001400ZAJ7)
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Thématique :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Luxe & consommation mondiale</p>
                  <p className="font-semibold text-[#253F60] mb-2">Émetteur :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Natixis Structured Issuance SA</p>
                  <p className="font-semibold text-[#253F60] mb-2">Garant :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Natixis (Notation A / A1 / A+)</p>
                  <p className="font-semibold text-[#253F60] mb-2">Sous-jacent :</p>
                  <p className="text-[#4B5563] text-sm mb-4">iEdge Transatlantic Luxury Goods & Services 10 EW Decrement 50 Points GTR®</p>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Durée maximale :</p>
                  <p className="text-[#4B5563] text-sm mb-4">10 ans (échéance 2035)</p>
                  <p className="font-semibold text-[#253F60] mb-2">Souscription :</p>
                  <p className="text-[#4B5563] text-sm mb-4">jusqu'au 31 juillet 2025</p>
                  <p className="font-semibold text-[#253F60] mb-2">Éligibilité :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Assurance-vie, PER, Compte-titres</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 mb-6">
                <p className="font-semibold text-[#253F60] mb-2">Objectif de rendement :</p>
                <p className="text-[#4B5563] mb-4">+1,25 % par mois écoulé, soit jusqu'à +15 % par an</p>
                <p className="font-semibold text-[#253F60] mb-2">Barrière / Protection du capital :</p>
                <p className="text-[#4B5563] mb-2">Rappel anticipé possible chaque mois à partir du 12ᵉ mois si l'indice ≥ barrière dégressive (100 % → 79,67 %)</p>
                <p className="text-[#4B5563] mb-2">À échéance : remboursement +150 % du nominal si indice ≥ 79,48 %</p>
                <p className="text-[#4B5563]">Capital protégé à 100 % si indice ≥ 50 % ; perte proportionnelle si indice &lt; 50 %</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Points forts :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Thématique premium internationale</li>
                    <li>Barrière dégressive facilitant le rappel anticipé</li>
                    <li>Potentiel de rendement élevé</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Risques clés :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Risque de perte en capital partielle ou totale</li>
                    <li>Risque de solvabilité de l'émetteur</li>
                    <li>Risque de liquidité</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/placements/produits-structures/athena-luxe-2025"
                  className="text-[#B99066] hover:text-[#A67A5A] font-semibold underline"
                >
                  Lien fiche complète →
                </Link>
              </div>
            </div>

            {/* Produit 2 - Athena IA */}
            <div className="mb-8 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#253F60] flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-2">
                    ATHENA DÉGRESSIF IA & ROBOTIQUE – JUILLET 2025 (FR001400ZAJ8)
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Thématique :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Intelligence artificielle & robotique</p>
                  <p className="font-semibold text-[#253F60] mb-2">Émetteur :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Natixis Structured Issuance SA</p>
                  <p className="font-semibold text-[#253F60] mb-2">Garant :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Natixis (Notation A / A1 / A+)</p>
                  <p className="font-semibold text-[#253F60] mb-2">Sous-jacent :</p>
                  <p className="text-[#4B5563] text-sm mb-4">iEdge Global Artificial Intelligence & Robotics EW Decrement 50 Points GTR®</p>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Durée maximale :</p>
                  <p className="text-[#4B5563] text-sm mb-4">10 ans (échéance 2035)</p>
                  <p className="font-semibold text-[#253F60] mb-2">Souscription :</p>
                  <p className="text-[#4B5563] text-sm mb-4">jusqu'au 31 juillet 2025</p>
                  <p className="font-semibold text-[#253F60] mb-2">Éligibilité :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Assurance-vie, PER, Compte-titres</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 mb-6">
                <p className="font-semibold text-[#253F60] mb-2">Objectif de rendement :</p>
                <p className="text-[#4B5563] mb-4">+1,25 % par mois écoulé, soit jusqu'à +15 % par an</p>
                <p className="font-semibold text-[#253F60] mb-2">Barrière / Protection du capital :</p>
                <p className="text-[#4B5563] mb-2">Rappel anticipé mensuel à partir du 12ᵉ mois si indice ≥ barrière dégressive (100 % → 79,67 %)</p>
                <p className="text-[#4B5563] mb-2">À échéance : remboursement +150 % du nominal si indice ≥ 79,48 %</p>
                <p className="text-[#4B5563]">Capital protégé si indice ≥ 50 % ; perte proportionnelle si indice &lt; 50 %</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Points forts :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Exposition à un secteur en croissance mondiale</li>
                    <li>Barrière dégressive et protection à 50 %</li>
                    <li>Mécanisme identique au produit Luxe pour diversification sectorielle</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Risques clés :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Risque de perte en capital</li>
                    <li>Volatilité accrue des marchés technologiques</li>
                    <li>Risque de solvabilité de l'émetteur</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/placements/produits-structures/athena-ia-robotique-2025"
                  className="text-[#B99066] hover:text-[#A67A5A] font-semibold underline"
                >
                  Lien fiche complète →
                </Link>
              </div>
            </div>

            {/* Produit 3 - Énergie */}
            <div className="mb-8 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#253F60] flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-2">
                    ÉNERGIE DÉGRESSIVE AVRIL 2025 (FR001400WTQ9)
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Thématique :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Énergie & transition énergétique</p>
                  <p className="font-semibold text-[#253F60] mb-2">Émetteur :</p>
                  <p className="text-[#4B5563] text-sm mb-4">BNP Paribas Issuance B.V.</p>
                  <p className="font-semibold text-[#253F60] mb-2">Garant :</p>
                  <p className="text-[#4B5563] text-sm mb-4">BNP Paribas S.A.</p>
                  <p className="font-semibold text-[#253F60] mb-2">Sous-jacent :</p>
                  <p className="text-[#4B5563] text-sm mb-4">iEdge Global Energy Select Decrement 50 Points GTR®</p>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Durée maximale :</p>
                  <p className="text-[#4B5563] text-sm mb-4">10 ans (échéance 2035)</p>
                  <p className="font-semibold text-[#253F60] mb-2">Souscription :</p>
                  <p className="text-[#4B5563] text-sm mb-4">jusqu'au 30 avril 2025</p>
                  <p className="font-semibold text-[#253F60] mb-2">Éligibilité :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Assurance-vie, PER, Compte-titres</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 mb-6">
                <p className="font-semibold text-[#253F60] mb-2">Objectif de rendement :</p>
                <p className="text-[#4B5563] mb-4">9 % par an</p>
                <p className="font-semibold text-[#253F60] mb-2">Barrière / Protection du capital :</p>
                <p className="text-[#4B5563] mb-2">Protection du capital jusqu'à 50 % de baisse du sous-jacent</p>
                <p className="text-[#4B5563]">Coupon annuel conditionnel (paiement si indice ≥ 50 % du niveau initial)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Points forts :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Thématique énergétique et transition bas carbone</li>
                    <li>Protection du capital élevée</li>
                    <li>Mécanisme clair et rendement attractif</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Risques clés :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Risque de perte en capital si indice &lt; 60 % à échéance</li>
                    <li>Risque lié au marché de l'énergie (volatilité sectorielle)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/placements/produits-structures/energie-degressive-2025"
                  className="text-[#B99066] hover:text-[#A67A5A] font-semibold underline"
                >
                  Lien fiche complète →
                </Link>
              </div>
            </div>

            {/* Produit 4 - Autocall Crédit Agricole */}
            <div className="mb-8 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#253F60] flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-2">
                    AUTO-CALL CRÉDIT AGRICOLE – JUIN 2025 (FR001459AB6990)
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Thématique :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Secteur bancaire / action unique</p>
                  <p className="font-semibold text-[#253F60] mb-2">Émetteur :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Société Générale</p>
                  <p className="font-semibold text-[#253F60] mb-2">Garant :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Société Générale</p>
                  <p className="font-semibold text-[#253F60] mb-2">Sous-jacent :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Action Crédit Agricole S.A.</p>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Durée maximale :</p>
                  <p className="text-[#4B5563] text-sm mb-4">5 ans (échéance 2030)</p>
                  <p className="font-semibold text-[#253F60] mb-2">Souscription :</p>
                  <p className="text-[#4B5563] text-sm mb-4">jusqu'au 30 juin 2025</p>
                  <p className="font-semibold text-[#253F60] mb-2">Éligibilité :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Assurance-vie, Compte-titres</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 mb-6">
                <p className="font-semibold text-[#253F60] mb-2">Objectif de rendement :</p>
                <p className="text-[#4B5563] mb-4">+15 % déjà réalisés depuis le lancement</p>
                <p className="font-semibold text-[#253F60] mb-2">Barrière / Protection du capital :</p>
                <p className="text-[#4B5563] mb-2">Rappel anticipé automatique si le cours de Crédit Agricole ≥ 100 % du niveau initial à une date d'observation</p>
                <p className="text-[#4B5563]">Protection du capital à 50 % du niveau initial à échéance</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Points forts :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Sous-jacent simple et transparent</li>
                    <li>Performance déjà atteinte (+15 %)</li>
                    <li>Exposition au secteur bancaire solide</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Risques clés :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Risque de perte en capital en cas de forte baisse du titre</li>
                    <li>Risque spécifique à l'action Crédit Agricole</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/placements/produits-structures/autocall-credit-agricole-2025"
                  className="text-[#B99066] hover:text-[#A67A5A] font-semibold underline"
                >
                  Lien fiche complète →
                </Link>
              </div>
            </div>

            {/* Produit 5 - Ambition Pharma */}
            <div className="mb-8 bg-white rounded-lg p-8 shadow-lg border-2 border-[#253F60]/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#253F60] flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-2">
                    AMBITION PHARMA JANVIER 2026 (EI21918ACD)
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Thématique :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Santé & biotechnologies</p>
                  <p className="font-semibold text-[#253F60] mb-2">Émetteur :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Crédit Agricole CIB</p>
                  <p className="font-semibold text-[#253F60] mb-2">Garant :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Crédit Agricole S.A.</p>
                  <p className="font-semibold text-[#253F60] mb-2">Sous-jacent :</p>
                  <p className="text-[#4B5563] text-sm mb-4">iEdge Global Pharma & Biotech Select Decrement 50 Points GTR®</p>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Durée maximale :</p>
                  <p className="text-[#4B5563] text-sm mb-4">8 ans (échéance 2034)</p>
                  <p className="font-semibold text-[#253F60] mb-2">Souscription :</p>
                  <p className="text-[#4B5563] text-sm mb-4">jusqu'au 31 janvier 2026</p>
                  <p className="font-semibold text-[#253F60] mb-2">Éligibilité :</p>
                  <p className="text-[#4B5563] text-sm mb-4">Assurance-vie, PER, Compte-titres</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#253F60]/10 to-[#B99066]/10 rounded-lg p-6 mb-6">
                <p className="font-semibold text-[#253F60] mb-2">Objectif de rendement :</p>
                <p className="text-[#4B5563] mb-4">10 % par an</p>
                <p className="font-semibold text-[#253F60] mb-2">Barrière / Protection du capital :</p>
                <p className="text-[#4B5563] mb-2">Protection du capital jusqu'à 50 % de baisse du sous-jacent</p>
                <p className="text-[#4B5563]">Coupon annuel conditionnel (paiement si indice ≥ 50 % du niveau initial)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Points forts :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Secteur défensif et résilient</li>
                    <li>Rendement cible élevé (10 %/an)</li>
                    <li>Protection renforcée du capital</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#253F60] mb-2">Risques clés :</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-[#4B5563] text-sm">
                    <li>Risque de perte partielle du capital</li>
                    <li>Risque sectoriel (pharma/biotech)</li>
                    <li>Risque de liquidité avant échéance</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/placements/produits-structures/ambition-pharma-2026"
                  className="text-[#B99066] hover:text-[#A67A5A] font-semibold underline"
                >
                  Lien fiche complète →
                </Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-16 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
            <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-4">
              🔒 Disclaimer global
            </h3>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
              Les produits présentés sont destinés à des investisseurs avertis ayant une bonne compréhension des mécanismes et des risques associés aux produits structurés. Ils ne constituent pas un conseil en investissement personnalisé.
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-4">
              Avant toute souscription, il est impératif de vérifier l'adéquation du produit avec le profil de risque et les objectifs d'investissement de chaque investisseur.
            </p>
            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
              Les brochures officielles, Documents d'Informations Clés (DIC) et Conditions Définitives sont disponibles sur la page dédiée à chaque produit.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/rdv-azalee-patrimoine/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#253F60] hover:bg-[#1a2d47] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
 Prendre rendez-vous avec un conseiller Azalée
            </a>
            <Link
              href="/placements"
              className="bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-center transition-all duration-300"
            >
              ← Retour aux placements
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


