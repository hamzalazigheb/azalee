"use client";
import React, { useState } from "react";
import Header from "../../../components/common/Header";


export default function GuideDefiscalisationClient({ content }) {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    codePostal: "",
    anneeNaissance: "",
    impotAnnuel: ""
  });
  const [acceptCGU, setAcceptCGU] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acceptCGU) {
      // Logique de soumission du formulaire
      console.log("Formulaire soumis:", formData);
      alert("Merci ! Votre guide sera envoyé par email.");
    } else {
      alert("Veuillez accepter les CGU pour continuer.");
    }
  };

  return (
    <>
      <Header />
      
      {/* Formulaire de téléchargement */}
      <div className="min-h-screen bg-gradient-to-r from-[#253F60] to-[#B99066] flex items-center justify-center py-16">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#253F60] mb-2">
                Téléchargez gratuitement
              </h1>
              <h2 className="text-xl font-semibold text-[#253F60] mb-3">
                le guide de la défiscalisation 2025
              </h2>
              <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                Guide numérique
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Téléphone (ex: 0623456789)"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="codePostal"
                  placeholder="Code Postal (ex: 75001)"
                  value={formData.codePostal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="anneeNaissance"
                  placeholder="Année de naissance (ex: 1987)"
                  value={formData.anneeNaissance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="impotAnnuel"
                  placeholder="Impôt annuel"
                  value={formData.impotAnnuel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                  required
                />
              </div>

              {/* Checkbox CGU */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="cgu"
                  checked={acceptCGU}
                  onChange={(e) => setAcceptCGU(e.target.checked)}
                  className="mt-1 h-4 w-4 text-[#253F60] focus:ring-[#253F60] border-gray-300 rounded"
                />
                <label htmlFor="cgu" className="text-sm text-gray-700">
                  J'accepte les{" "}
                  <a href="#" className="text-blue-600 underline hover:text-blue-800">
                    CGU du site
                  </a>{" "}
                  afin de recevoir mon guide offert et d'être recontacté(e) par un conseiller afin qu'il étudie gratuitement et sans engagement ma situation fiscale.{" "}
                  <a href="#" className="text-blue-600 underline hover:text-blue-800">
                    Voir les CGU du site
                  </a>
                </label>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full bg-[#B99066] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#A67A5A] transition-colors duration-200"
              >
                Recevoir mon guide gratuit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Sommaire du Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#112033] mb-8 text-center">
              SOMMAIRE DU GUIDE DE LA DÉFISCALISATION
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Colonne gauche */}
              <div className="space-y-6">
                {/* 1. LOI PINEL */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">1. LE GUIDE DE LA LOI PINEL. <span className="text-[#253F60]">(Page 1)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">1-1 LA LOI PINEL <span className="text-[#253F60]">(Page 1)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Les grands principes de la loi. <span className="text-[#253F60]">(Page 1)</span></p>
                      <p className="text-xs text-[#686868]">b. Les avantages de la loi. <span className="text-[#253F60]">(Page 1)</span></p>
                      <p className="text-xs text-[#686868]">c. Exemple d'un investissement Pinel. <span className="text-[#253F60]">(Page 2)</span></p>
                      <p className="text-xs text-[#686868]">d. Les conditions de la loi <span className="text-[#253F60]">(Page 2)</span></p>
                    </div>
                    <p className="text-sm text-[#374151]">1-2 TOUS NOS CONSEILS PRATIQUES. <span className="text-[#253F60]">(Page 3)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Optimiser l'emplacement de l'investissement. <span className="text-[#253F60]">(Page 3)</span></p>
                      <p className="text-xs text-[#686868]">b- Financer l'opération par un prêt immobilier sans apport. <span className="text-[#253F60]">(Page 3)</span></p>
                      <p className="text-xs text-[#686868]">c. Préparer sa déclaration fiscale. <span className="text-[#253F60]">(Page 4)</span></p>
                      <p className="text-xs text-[#686868]">d. Investir : une démarche claire en 10 étapes. <span className="text-[#253F60]">(Page 4)</span></p>
                    </div>
                    <p className="text-sm text-[#374151]">1-3 ALLEZ PLUS LOIN DANS VOTRE PROJET <span className="text-[#253F60]">(Page 5)</span></p>
                  </div>
                </div>

                {/* 2. LOI CENSI-BOUVARD */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">2. LE GUIDE DE LA LOI CENSI-BOUVARD. <span className="text-[#253F60]">(Page 5)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">2-1 LA LOI CENSI-BOUVARD. <span className="text-[#253F60]">(Page 5)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Les grands principes de la loi. <span className="text-[#253F60]">(Page 5)</span></p>
                      <p className="text-xs text-[#686868]">b. Les avantages de la loi. <span className="text-[#253F60]">(Page 6)</span></p>
                      <p className="text-xs text-[#686868]">c. Exemple d'un investissement. <span className="text-[#253F60]">(Page 6)</span></p>
                      <p className="text-xs text-[#686868]">d. Les conditions de la loi <span className="text-[#253F60]">(Page 6)</span></p>
                    </div>
                    <p className="text-sm text-[#374151]">2-2 ALLER PLUS LOIN DANS VOTRE PROJET <span className="text-[#253F60]">(Page 7)</span></p>
                  </div>
                </div>

                {/* 3. LOI GIRARDIN */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">3. LE GUIDE DE LA LOI GIRARDIN. <span className="text-[#253F60]">(Page 7)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">3-1 LES ORIGINES DE LA LOI GIRARDIN. <span className="text-[#253F60]">(Page 7)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Pourquoi investir en loi Girardin ? <span className="text-[#253F60]">(Page 7)</span></p>
                      <p className="text-xs text-[#686868]">b. Les grands principes de la loi Girardin. <span className="text-[#253F60]">(Page 8)</span></p>
                      <p className="text-xs text-[#686868]">c. Les avantages de la défiscalisation en loi Girardin. <span className="text-[#253F60]">(Page 8)</span></p>
                      <p className="text-xs text-[#686868]">d. Les conditions du dispositif de défiscalisation en loi Girardin. <span className="text-[#253F60]">(Page 8)</span></p>
                    </div>
                  </div>
                </div>

                {/* 4. NUE-PROPRIÉTÉ */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">4. LE GUIDE DE LA NUE-PROPRIÉTÉ. <span className="text-[#253F60]">(Page 9)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">4-1 LES ORIGINES DU DISPOSITIF NUE-PROPRIÉTÉ. <span className="text-[#253F60]">(Page 9)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Pourquoi investir en nue-propriété ? <span className="text-[#253F60]">(Page 9)</span></p>
                      <p className="text-xs text-[#686868]">b. Les grands principes de la nue-propriété. <span className="text-[#253F60]">(Page 10)</span></p>
                      <p className="text-xs text-[#686868]">c. Les avantages de la défiscalisation en nue-propriété. <span className="text-[#253F60]">(Page 10)</span></p>
                      <p className="text-xs text-[#686868]">d. Les conditions du dispositif de défiscalisation en nue-propriété. <span className="text-[#253F60]">(Page 10)</span></p>
                    </div>
                  </div>
                </div>

                {/* 5. MONUMENTS HISTORIQUES */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">5. LE GUIDE DE LA LOI MONUMENTS HISTORIQUES. <span className="text-[#253F60]">(Page 11)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">5-1 LES ORIGINES DE LA LOI MONUMENTS HISTORIQUES. <span className="text-[#253F60]">(Page 11)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Pourquoi investir en Monuments Historiques ?. <span className="text-[#253F60]">(Page 11)</span></p>
                      <p className="text-xs text-[#686868]">b- Comprendre la défiscalisation en Monuments Historiques. <span className="text-[#253F60]">(Page 12)</span></p>
                      <p className="text-xs text-[#686868]">c- Les avantages de la défiscalisation en Monuments Historiques. <span className="text-[#253F60]">(Page 12)</span></p>
                      <p className="text-xs text-[#686868]">d- Les conditions du dispositif de défiscalisation en Monuments Historiques. <span className="text-[#253F60]">(Page 13)</span></p>
                    </div>
                  </div>
                </div>

                {/* 6. LOI MALRAUX */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">6. LE GUIDE DE LA LOI MALRAUX. <span className="text-[#253F60]">(Page 13)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">6-1 LES ORIGINES DE LA LOI MALRAUX. <span className="text-[#253F60]">(Page 13)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Pourquoi investir en loi Malraux ?. <span className="text-[#253F60]">(Page 14)</span></p>
                      <p className="text-xs text-[#686868]">b- Les grands principes de la loi Malraux. <span className="text-[#253F60]">(Page 14)</span></p>
                      <p className="text-xs text-[#686868]">c- Les avantages de la défiscalisation en loi Malraux. <span className="text-[#253F60]">(Page 15)</span></p>
                      <p className="text-xs text-[#686868]">d- Les conditions du dispositif de défiscalisation en loi Malraux. <span className="text-[#253F60]">(Page 15)</span></p>
                    </div>
                  </div>
                </div>

                {/* 7. LOI LMP */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">7. LE GUIDE DE LA LOI LMP. <span className="text-[#253F60]">(Page 16)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">7-1 LES ORIGINES DU STATUT LMP. <span className="text-[#253F60]">(Page 16)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Pourquoi investir en LMP. <span className="text-[#253F60]">(Page 16)</span></p>
                      <p className="text-xs text-[#686868]">b- Les grands principes du statut LMP. <span className="text-[#253F60]">(Page 17)</span></p>
                      <p className="text-xs text-[#686868]">c- Les avantages du LMP. <span className="text-[#253F60]">(Page 17)</span></p>
                      <p className="text-xs text-[#686868]">d- Les conditions de défiscalisation en LMP. <span className="text-[#253F60]">(Page 18)</span></p>
                    </div>
                  </div>
                </div>

                {/* 8. LOI LMNP */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">8. LE GUIDE DE LA LOI LMNP. <span className="text-[#253F60]">(Page 19)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">8-1 LES ORIGINES DU STATUT LMNP. <span className="text-[#253F60]">(Page 19)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Pourquoi investir en LMNP ?. <span className="text-[#253F60]">(Page 19)</span></p>
                      <p className="text-xs text-[#686868]">b- Les grands principes du statut LMNP. <span className="text-[#253F60]">(Page 20)</span></p>
                      <p className="text-xs text-[#686868]">c- La réduction Censi-Bouvard. <span className="text-[#253F60]">(Page 20)</span></p>
                      <p className="text-xs text-[#686868]">d- Les avantages du LMNP. <span className="text-[#253F60]">(Page 21)</span></p>
                      <p className="text-xs text-[#686868]">e- Les conditions de défiscalisation en LMNP. <span className="text-[#253F60]">(Page 21)</span></p>
                    </div>
                  </div>
                </div>

                {/* 9. LOI DENORMANDIE */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">9. LE GUIDE DE LA LOI DENORMANDIE. <span className="text-[#253F60]">(Page 22)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">9-1 LES ORIGINES DE LA LOI DENORMANDIE. <span className="text-[#253F60]">(Page 22)</span></p>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-xs text-[#686868]">a- Pourquoi investir en loi Denormandie ?. <span className="text-[#253F60]">(Page 22)</span></p>
                      <p className="text-xs text-[#686868]">b- Les grands principes de la loi Denormandie. <span className="text-[#253F60]">(Page 23)</span></p>
                      <p className="text-xs text-[#686868]">c- Les avantages de la défiscalisation en loi Denormandie. <span className="text-[#253F60]">(Page 23)</span></p>
                      <p className="text-xs text-[#686868]">d- Les conditions du dispositif de défiscalisation en loi Denormandie. <span className="text-[#253F60]">(Page 24)</span></p>
                    </div>
                  </div>
                </div>

                {/* 10. ANCIENNES LOIS */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">10. LES ANCIENNES LOIS. <span className="text-[#253F60]">(Page 24)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">10-1 LA LOI SCELLIER. <span className="text-[#253F60]">(Page 24)</span></p>
                    <p className="text-sm text-[#374151]">10-2 LA LOI BORLOO NEUF. <span className="text-[#253F60]">(Page 25)</span></p>
                    <p className="text-sm text-[#374151]">10-3 LA LOI DUFLOT. <span className="text-[#253F60]">(Page 25)</span></p>
                  </div>
                </div>
              </div>

              {/* Colonne droite */}
              <div className="space-y-6">
                {/* 11. DÉFICIT FONCIER */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">11. DÉFICIT FONCIER. <span className="text-[#253F60]">(Page 26)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">11-1 Pourquoi faire du déficit foncier ?. <span className="text-[#253F60]">(Page 26)</span></p>
                    <p className="text-sm text-[#374151]">11-2 Les grands principes du déficit foncier. <span className="text-[#253F60]">(Page 26)</span></p>
                    <p className="text-sm text-[#374151]">11-3 Les avantages de défiscaliser grâce au déficit foncier. <span className="text-[#253F60]">(Page 27)</span></p>
                    <p className="text-sm text-[#374151]">11-4 Les conditions pour faire du déficit foncier. <span className="text-[#253F60]">(Page 27)</span></p>
                  </div>
                </div>

                {/* 12. FIP */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">12. FONDS D'INVESTISSEMENT DE PROXIMITÉ. <span className="text-[#253F60]">(Page 28)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">12-1 Pourquoi investir en FIP ?. <span className="text-[#253F60]">(Page 28)</span></p>
                    <p className="text-sm text-[#374151]">12-2 Les grands principes du FIP. <span className="text-[#253F60]">(Page 29)</span></p>
                    <p className="text-sm text-[#374151]">12-3 Les avantages de la défiscalisation en FIP. <span className="text-[#253F60]">(Page 29)</span></p>
                    <p className="text-sm text-[#374151]">12-4 Les conditions de souscription à un FIP. <span className="text-[#253F60]">(Page 30)</span></p>
                  </div>
                </div>

                {/* 13. PME */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">13. SOUSCRIRE AU CAPITAL DES PME. <span className="text-[#253F60]">(Page 30)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">13-1 Pourquoi souscrire au patrimoine des PME ?. <span className="text-[#253F60]">(Page 30)</span></p>
                    <p className="text-sm text-[#374151]">13-2 Le fonctionnement du dispositif "madelin/IR-PME". <span className="text-[#253F60]">(Page 31)</span></p>
                    <p className="text-sm text-[#374151]">13-3 L'avantage de la souscription au capital des PME. <span className="text-[#253F60]">(Page 31)</span></p>
                    <p className="text-sm text-[#374151]">13-4 Les conditions de souscription. <span className="text-[#253F60]">(Page 32)</span></p>
                  </div>
                </div>

                {/* 14. GIRARDIN INDUSTRIEL */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">14. LOI GIRARDIN INDUSTRIEL. <span className="text-[#253F60]">(Page 32)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">14-1 Pourquoi investir en loi Girardin industriel ?. <span className="text-[#253F60]">(Page 32)</span></p>
                    <p className="text-sm text-[#374151]">14-2 Les grands principes de la loi Girardin industriel. <span className="text-[#253F60]">(Page 33)</span></p>
                    <p className="text-sm text-[#374151]">14-3 Les avantages de la défiscalisation en loi Girardin industriel. <span className="text-[#253F60]">(Page 33)</span></p>
                    <p className="text-sm text-[#374151]">14-4 Les conditions de souscription au dispositif Girardin industriel. <span className="text-[#253F60]">(Page 34)</span></p>
                  </div>
                </div>

                {/* 15. SCPI */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">15. SOCIÉTÉ CIVILE DE PLACEMENT IMMOBILIER (SCPI). <span className="text-[#253F60]">(Page 34)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">15-1 Pourquoi investir dans une SCPI ?. <span className="text-[#253F60]">(Page 34)</span></p>
                    <p className="text-sm text-[#374151]">15-2 Comment fonctionne un investissement en SCPI ?. <span className="text-[#253F60]">(Page 35)</span></p>
                    <p className="text-sm text-[#374151]">15-3 Les avantages de la défiscalisation en SCPI. <span className="text-[#253F60]">(Page 35)</span></p>
                    <p className="text-sm text-[#374151]">15-4 Exemple d'investissement en SCPI. <span className="text-[#253F60]">(Page 36)</span></p>
                    <p className="text-sm text-[#374151]">15-5 Les conditions d'un investissement en SCPI. <span className="text-[#253F60]">(Page 36)</span></p>
                  </div>
                </div>

                {/* 16. SOFICA */}
                <div>
                  <h3 className="text-base font-semibold text-[#112033] mb-1">16. SOFICA. <span className="text-[#253F60]">(Page 37)</span></h3>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm text-[#374151]">16-1 Pourquoi investir dans une SOFICA ?. <span className="text-[#253F60]">(Page 37)</span></p>
                    <p className="text-sm text-[#374151]">16-2 Les grands principes du SOFICA. <span className="text-[#253F60]">(Page 38)</span></p>
                    <p className="text-sm text-[#374151]">16-3 Les avantages de défiscaliser via une SOFICA. <span className="text-[#253F60]">(Page 38)</span></p>
                    <p className="text-sm text-[#374151]">16-4 Les conditions de souscription. <span className="text-[#253F60]">(Page 39)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Guide Fiscal 2025 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#253F60] mb-4">
              Guide Fiscal 2025 - Téléchargez votre exemplaire gratuit
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#112033] mb-6">
              Trois bonnes raisons de lire le Guide Fiscal 2025
            </h3>
            <p className="text-lg text-[#4A5568] leading-relaxed mb-8">
              Vous souhaitez réduire vos impôts tout en optimisant vos investissements ? Le Guide Fiscal 2025 vous accompagne pas à pas dans la compréhension des dispositifs existants et vous aide à choisir la solution la plus adaptée à votre situation.
            </p>
          </div>

          {/* Trois bonnes raisons */}
          <div className="mb-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <p className="text-[#374151] text-lg leading-relaxed">
                  <strong>Découvrez les solutions pour alléger votre fiscalité :</strong> réductions, exonérations, amortissements...
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <p className="text-[#374151] text-lg leading-relaxed">
                  <strong>Identifiez les dispositifs adaptés à vos projets :</strong> immobilier, retraite, placements financiers, transmission.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#B99066] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <p className="text-[#374151] text-lg leading-relaxed">
                  <strong>Anticipez les conditions et les risques</strong> pour investir en toute sérénité.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-[#E8F4F8] to-[#F0F9FF] rounded-lg">
              <p className="text-[#253F60] font-semibold text-lg flex items-center gap-2">
                Téléchargez le guide et profitez d'une vision claire et complète des opportunités fiscales 2025.
              </p>
            </div>
          </div>

          {/* Ce que vous allez trouver */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#112033] mb-6">
              Ce que vous allez trouver dans le Guide Fiscal 2025
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B99066] rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-[#374151] text-lg leading-relaxed">
                  Une présentation des principaux dispositifs de <strong>défiscalisation</strong> (loi Pinel, Girardin, FCPI, PER, assurance vie, etc.).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B99066] rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-[#374151] text-lg leading-relaxed">
                  Des explications claires sur la fiscalité des placements financiers et de l'épargne retraite.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B99066] rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-[#374151] text-lg leading-relaxed">
                  Des conseils pour <strong>structurer vos investissements</strong> et préparer l'avenir en toute confiance.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#B99066] rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-[#374151] text-lg leading-relaxed">
                  Un éclairage pratique sur les <strong>risques, plafonds et conditions</strong> à respecter pour bénéficier des avantages fiscaux.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-[#253F60] rounded-xl shadow-sm">
              <p className="text-white font-medium text-lg leading-relaxed">
                Avec ce guide, nos experts vous donnent les clés pour réduire légalement votre imposition et transformer la fiscalité en véritable levier patrimonial.
              </p>
            </div>
          </div>

          {/* Qu'est-ce que la défiscalisation */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#112033] mb-6">
              Qu'est-ce que la défiscalisation ?
            </h3>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              La défiscalisation consiste à investir son épargne dans des dispositifs ou produits financiers permettant de réduire son impôt, parfois jusqu'à une exonération partielle. C'est une opportunité double : alléger sa fiscalité tout en se constituant un patrimoine, qu'il soit immobilier ou financier.
            </p>
            
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              Les dispositifs sont variés : <strong>immobilier neuf (loi Pinel)</strong>, <strong>investissement productif outre-mer (loi Girardin)</strong>, <strong>fonds d'investissement (FCPI, Sofica)</strong>, <strong>épargne retraite (PER, Madelin)</strong>...
            </p>
            
            <p className="text-[#374151] text-lg leading-relaxed">
              Le Guide Fiscal 2025 regroupe et explique chacune de ces solutions pour vous aider à choisir en toute connaissance de cause.
            </p>
          </div>

          {/* Call to action final */}
          <div className="text-center">
            <div className="p-6 bg-[#253F60] rounded-lg text-white">
              <p className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                Téléchargez votre Guide Fiscal 2025
              </p>
              <p className="text-lg opacity-90">
                Remplissez le formulaire ci-dessus pour recevoir gratuitement votre exemplaire et découvrir comment réduire vos impôts dès aujourd'hui.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}