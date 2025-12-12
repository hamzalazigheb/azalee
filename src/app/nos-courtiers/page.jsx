'use client';
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function NosCourtiersPage() {
  return (
    <div className="w-full bg-global-8">
      <Header />
      
      <main className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-cairo font-semibold text-[#112033] mb-6">
              Découvrez comment nos courtiers travaillent pour vous
            </h1>
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-[#B99066] to-[#4EBBBD] mx-auto rounded-full"></div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Bien plus que des intermédiaires */}
            <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold text-[#112033] mb-6">
                Bien plus que des intermédiaires
              </h2>
              <div className="space-y-4 text-[#4A5568] font-inter text-lg leading-relaxed">
                <p>
                  Nos courtiers sont vos <strong className="text-[#112033]">partenaires stratégiques</strong>. Leur mission : défendre vos intérêts et garantir la cohérence de votre stratégie patrimoniale.
                </p>
              </div>
            </section>

            {/* Notre méthode de travail */}
            <section className="bg-gradient-to-br from-[#F8FAFB] to-[#F1F5F9] rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold text-[#112033] mb-8 text-center">
                Notre méthode de travail
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Étape 1 */}
                <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#B99066] to-[#A67A5A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-[#112033] mb-3">
                    Écouter
                  </h3>
                  <p className="text-[#4A5568] font-inter">
                    Comprendre vos besoins et priorités.
                  </p>
                </div>

                {/* Étape 2 */}
                <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#4EBBBD] to-[#59E2E4] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-[#112033] mb-3">
                    Analyser
                  </h3>
                  <p className="text-[#4A5568] font-inter">
                    Audit complet de votre situation fiscale, financière et familiale.
                  </p>
                </div>

                {/* Étape 3 */}
                <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#B99066] to-[#4EBBBD] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-[#112033] mb-3">
                    Proposer
                  </h3>
                  <p className="text-[#4A5568] font-inter">
                    Sélectionner et comparer les meilleures solutions (assurance-vie, PER, SCPI, private equity, immobilier…).
                  </p>
                </div>

                {/* Étape 4 */}
                <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#4EBBBD] to-[#B99066] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-[#112033] mb-3">
                    Accompagner
                  </h3>
                  <p className="text-[#4A5568] font-inter">
                    Suivi régulier, ajustements et disponibilité à chaque étape.
                  </p>
                </div>
              </div>
            </section>

            {/* Rémunération claire */}
            <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold text-[#112033] mb-6">
                Rémunération claire et double transparence
              </h2>
              <div className="space-y-6 text-[#4A5568] font-inter text-lg leading-relaxed">
                <p>
                  Nos courtiers sont rémunérés :
                </p>
                
                <div className="bg-gradient-to-r from-[#F8FAFB] to-[#F1F5F9] rounded-xl p-6 border-l-4 border-[#4EBBBD]">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#4EBBBD] font-bold">•</span>
                      <span>par <strong className="text-[#112033]">des honoraires fixes</strong> (selon la formule choisie),</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#4EBBBD] font-bold">•</span>
                      <span>et par <strong className="text-[#112033]">des rétrocessions explicites</strong> sur les solutions distribuées.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#4EBBBD] text-xl"></span>
                    <span><strong className="text-[#112033]">Pas de frais cachés.</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#4EBBBD] text-xl"></span>
                    <span><strong className="text-[#112033]">Une totale visibilité</strong> sur notre valeur ajoutée.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gradient-to-r from-[#253F60] to-[#112033] rounded-2xl p-8 lg:p-12 text-white">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold mb-6">
                Prêt à découvrir notre approche ?
              </h2>
              <p className="text-lg font-inter mb-8 opacity-90">
                Rencontrez nos courtiers pour un premier échange personnalisé
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:bg-[#A67A5A] transition-colors duration-200 shadow-lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Prendre rendez-vous
                </button>
                <button 
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:bg-white hover:text-[#112033] transition-all duration-200"
                  onClick={() => window.history.back()}
                >
                  Retour à l'accueil
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
