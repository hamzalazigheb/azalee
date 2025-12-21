'use client';
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function NotreApprochePage() {
  return (
    <div className="w-full bg-global-8">
      <Header />
      
      <main className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-cairo font-semibold text-global-2 mb-6">
              Découvrez notre approche
            </h1>
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-global-background6 to-global-background4 mx-auto rounded-full"></div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Vision Section */}
            <section className="bg-global-8 rounded-2xl p-8 lg:p-12 shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold text-global-2 mb-6">
                Une vision patrimoniale globale
              </h2>
              <div className="space-y-4 text-global-3 font-inter text-lg leading-relaxed">
                <p>
                  Chez <strong className="text-global-2">Azalée Patrimoine</strong>, la gestion de patrimoine ne se résume pas à choisir des placements.
                </p>
                <p>
                  C'est un processus global et évolutif, qui prend en compte vos projets de vie, vos ambitions professionnelles et vos responsabilités familiales.
                </p>
              </div>
            </section>

            {/* Three Pillars Section */}
            <section className="bg-gradient-to-br from-global-background7 to-global-background8 rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold text-global-2 mb-8 text-center">
                Trois piliers guident notre accompagnement
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pilier 1 */}
                <div className="bg-global-8 rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-global-6 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-global-7 text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-global-2 mb-3">
                    Préserver
                  </h3>
                  <p className="text-global-3 font-inter">
                    Protéger vos acquis et vos proches.
                  </p>
                </div>

                {/* Pilier 2 */}
                <div className="bg-global-8 rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-global-4 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-global-7 text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-global-2 mb-3">
                    Optimiser
                  </h3>
                  <p className="text-global-3 font-inter">
                    Réduire la fiscalité, améliorer le rendement de vos actifs, ajuster vos allocations.
                  </p>
                </div>

                {/* Pilier 3 */}
                <div className="bg-global-8 rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-global-background6 to-global-background4 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-global-7 text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-global-2 mb-3">
                    Transmettre
                  </h3>
                  <p className="text-global-3 font-inter">
                    Anticiper la transmission, protéger le conjoint, préparer les générations futures.
                  </p>
                </div>
              </div>
            </section>

            {/* Sur-mesure Section */}
            <section className="bg-global-8 rounded-2xl p-8 lg:p-12 shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold text-global-2 mb-6">
                Sur-mesure & transparence
              </h2>
              <div className="space-y-4 text-global-3 font-inter text-lg leading-relaxed">
                <p>
                  Chaque client est unique : nos stratégies sont adaptées à vos objectifs, et évoluent avec vous.
                </p>
                <p>
                  Nous affichons clairement nos <strong className="text-global-2">formules d'accompagnement</strong> (Club Azalée et Club Azalée Premium) et notre mode de rémunération.
                </p>
                
                {/* Quote */}
                <div className="bg-gradient-to-r from-global-background7 to-global-background8 rounded-xl p-6 mt-8 border-l-4 border-global-background4">
                  <p className="text-global-2 font-inter italic text-lg">
                    📌 <em>Notre conviction : la relation de confiance est la clé d'un accompagnement patrimonial réussi.</em>
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gradient-to-r from-global-background4 to-global-background2 rounded-2xl p-8 lg:p-12 text-global-7">
              <h2 className="text-2xl lg:text-3xl font-cairo font-semibold mb-6">
                Prêt à découvrir notre approche ?
              </h2>
              <p className="text-lg font-inter mb-8 opacity-90">
                Rencontrez nos experts pour un premier échange personnalisé
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-global-6 text-global-7 px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg"
                  onClick={() => window.location.href = '/contact'}
                >
                  Prendre rendez-vous
                </button>
                <button 
                  className="bg-transparent border-2 border-global-7 text-global-7 px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:bg-global-7 hover:text-global-2 transition-all duration-200"
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
