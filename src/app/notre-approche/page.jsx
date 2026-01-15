import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

export const metadata = {
  title: 'Notre Approche | Azalée Patrimoine',
  description: 'Découvrez notre méthode globale : Préserver, Optimiser, Transmettre. Une gestion patrimoniale sur-mesure et transparente.',
};

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
                {/* Pilier 1 - Préserver */}
                <div className="bg-global-8 rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-global-6/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-global-6">
                    <svg className="w-8 h-8 text-global-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-global-2 mb-3">
                    Préserver
                  </h3>
                  <p className="text-global-3 font-inter">
                    Protéger vos acquis et vos proches.
                  </p>
                </div>

                {/* Pilier 2 - Optimiser */}
                <div className="bg-global-8 rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-global-4/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-global-4">
                    <svg className="w-8 h-8 text-global-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cairo font-semibold text-global-2 mb-3">
                    Optimiser
                  </h3>
                  <p className="text-global-3 font-inter">
                    Réduire la fiscalité, améliorer le rendement de vos actifs, ajuster vos allocations.
                  </p>
                </div>

                {/* Pilier 3 - Transmettre */}
                <div className="bg-global-8 rounded-xl p-6 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-[#4EBBBD]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#4EBBBD]">
                    <svg className="w-8 h-8 text-[#4EBBBD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
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
                <Link
                  href="/contact"
                  className="bg-global-6 text-global-7 px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:opacity-90 transition-opacity duration-200 shadow-lg"
                >
                  Planifiez votre consultation gratuite
                </Link>
                <BackButton className="bg-transparent border-2 border-global-7 text-global-7 px-8 py-4 rounded-lg font-inter font-semibold text-lg hover:bg-global-7 hover:text-global-2 transition-all duration-200">
                  Retour à l'accueil
                </BackButton>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
