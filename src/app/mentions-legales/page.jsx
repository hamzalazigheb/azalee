import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#253F60] to-[#B99066]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mentions légales
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            En vigueur au 27/09/2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l'économie numérique, 
                il est porté à la connaissance des utilisateurs et visiteurs, ci-après l' "Utilisateur", du site 
                <strong> www.azalee-patrimoine.fr</strong>, ci-après le "Site", les présentes mentions légales.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                La connexion et la navigation sur le Site par l'Utilisateur implique acceptation intégrale et sans réserve 
                des présentes mentions légales. Ces dernières sont accessibles sur le Site à la rubrique "Mentions légales".
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">ÉDITION DU SITE</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L'édition du Site est assurée par la société <strong>Azalee Patrimoine</strong>, SASU au capital de 8 000,00 euros, 
                immatriculée au Registre du Commerce et des Sociétés de PARIS sous le numéro 790419949 dont le siège social 
                est situé au <strong>106 RUE DE RICHELIEU, 75002 PARIS</strong>.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Numéro de téléphone :</strong> 01 53 45 85 00</li>
                  <li><strong>Adresse e-mail :</strong> contact@azalee-patrimoine.fr</li>
                  <li><strong>N° de TVA intracommunautaire :</strong> FR90790419949</li>
                </ul>
                <p className="text-gray-600 text-sm mt-4">ci-après l'"Editeur".</p>
              </div>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">HÉBERGEUR</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L'hébergeur du Site est la société <strong>Amazon Web Services (AWS)</strong>, dont le siège social est situé au 
                410 Terry Ave. North Seattle.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">ACCÈS AU SITE</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le Site est normalement accessible, à tout moment, à l'Utilisateur. Toutefois, l'Editeur pourra, à tout moment, 
                suspendre, limiter ou interrompre le Site afin de procéder, notamment, à des mises à jour ou des modifications 
                de son contenu. L'Editeur ne pourra en aucun cas être tenu responsable des conséquences éventuelles de cette 
                indisponibilité sur les activités de l'Utilisateur.
              </p>

              <h2 className="text-2xl font-bold text-[#112033] mb-4 mt-8">COLLECTE DES DONNÉES</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le Site assure à l'Utilisateur une collecte et un traitement des données personnelles dans le respect de la vie 
                privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés 
                et dans le respect de la règlementation applicable en matière de traitement des données à caractère personnel 
                conformément au règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (ci-après, ensemble, 
                la "Règlementation applicable en matière de protection des Données à caractère personnel").
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                En vertu de la Règlementation applicable en matière de protection des Données à caractère personnel, l'Utilisateur 
                dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. 
                L'Utilisateur peut exercer ce droit :
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700">
                  <strong>par mail à l'adresse email :</strong> contact@azalee-patrimoine.fr
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans 
                autorisation expresse de l'Editeur est prohibée et pourra entraîner des actions et poursuites judiciaires 
                telles que prévues par la règlementation en vigueur.
              </p>

              <div className="border-t border-gray-200 pt-6 mt-8">
                <p className="text-gray-500 text-sm text-center">
                  Rédigé sur <a href="http://legalplace.fr" className="text-[#253F60] hover:text-[#B99066] transition-colors">http://legalplace.fr</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
