"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import SectionHeader from "../../../components/common/SectionHeader";

export default function ImmobilierNeufPage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[543px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[733px] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
              {/* Main Title */}
              <h1 className="text-[#112033] text-xs sm:text-2xl lg:text-4xl font-cairo font-semibold leading-tight mb-6 sm:mb-8 text-center lg:text-left">
                Immobilier neuf: investir dans la modernité et la fiscalité
              </h1>
              
              {/* Description */}
              <p className="text-[#374151] text-xs sm:text-base lg:text-lg font-inter leading-relaxed mb-8 sm:mb-10 text-center lg:text-left">
                Découvrez les opportunités d'investissement dans l'immobilier neuf avec nos experts. De la VEFA aux dispositifs fiscaux avantageux comme Pinel, Scellier et Robien, nous vous accompagnons dans vos projets d'investissement immobilier moderne.
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <button 
                  onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                  className="bg-[#B99066] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg font-inter font-medium text-xs sm:text-base hover:bg-[#A67A5A] transition-colors duration-200"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full lg:w-[467px] flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#B99066]/20 to-[#253F60]/20 rounded-2xl"></div>
                
                {/* Main image */}
                <img
                  src="/images/modern.webp"
                  alt="Immobilier neuf moderne - Architecture contemporaine et design élégant"
                  className="relative z-10 w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover border-4 border-white"
                  style={{ aspectRatio: '4/3' }}
                  onError={(e) => {
                    console.log('Modern immobilier image failed to load:', e.target.src);
                  }}
                  onLoad={() => console.log('Modern immobilier image loaded successfully')}
                />
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#B99066] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-[#112033] font-semibold text-sm">0 €</p>
                      <p className="text-[#4A5568] text-xs">Analyse gratuite</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <nav className="flex items-center text-xs sm:text-sm lg:text-base">
              <a href="/" className="text-[#253F60] font-source-sans font-semibold hover:underline">
                Accueil
              </a>
              <span className="text-[#686868] mx-2">{'>'}</span>
              <a href="/immobilier" className="text-[#253F60] font-source-sans font-semibold hover:underline">
                Immobilier
              </a>
              <span className="text-[#686868] mx-2">{'>'}</span>
              <span className="text-[#B99066] font-source-sans font-semibold">
                Immobilier Neuf
              </span>
            </nav>
          </div>

          {/* Dispositifs Fiscaux */}
          <div className="mb-8 sm:mb-12">
            <SectionHeader 
              title="Les dispositifs fiscaux : Pinel, Scellier, Robien"
              subtitle="Découvrez les dispositifs fiscaux avantageux pour l'investissement immobilier neuf"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] flex items-center justify-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/10 rounded-bl-full"></div>
                  <span className="text-white text-2xl font-bold relative z-10">Pinel</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[#253F60] font-cairo font-semibold text-xl mb-3">Loi Pinel</h3>
                  <p className="text-[#374151] font-inter mb-4 leading-relaxed">Réduction d'impôt jusqu'à 12% du prix d'acquisition sur 12 ans maximum</p>
                  <ul className="text-[#374151] text-sm font-inter space-y-2">
                    <li>• Investissement locatif neuf</li>
                    <li>• Réduction d'impôt progressive</li>
                    <li>• Engagement de location 6 à 12 ans</li>
                    <li>• Plafonds de loyer et de ressources</li>
                  </ul>
                </div>
              </div>
              <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-br from-[#B99066] via-[#A67A5A] to-[#B99066] flex items-center justify-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/10 rounded-bl-full"></div>
                  <span className="text-white text-2xl font-bold relative z-10">Scellier</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[#253F60] font-cairo font-semibold text-xl mb-3">Loi Scellier</h3>
                  <p className="text-[#374151] font-inter mb-4 leading-relaxed">Dispositif fiscal pour l'investissement locatif dans le neuf (discontinué)</p>
                  <ul className="text-[#374151] text-sm font-inter space-y-2">
                    <li>• Réduction d'impôt sur le revenu</li>
                    <li>• Investissement locatif neuf</li>
                    <li>• Engagement de location 9 ans</li>
                    <li>• Dispositif historique</li>
                  </ul>
                </div>
              </div>
              <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] flex items-center justify-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B99066]/10 rounded-bl-full"></div>
                  <span className="text-white text-2xl font-bold relative z-10">Robien</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[#253F60] font-cairo font-semibold text-xl mb-3">Loi Robien</h3>
                  <p className="text-[#374151] font-inter mb-4 leading-relaxed">Ancien dispositif fiscal pour l'investissement locatif dans le neuf</p>
                  <ul className="text-[#374151] text-sm font-inter space-y-2">
                    <li>• Réduction d'impôt sur le revenu</li>
                    <li>• Investissement locatif neuf</li>
                    <li>• Engagement de location 5 ans</li>
                    <li>• Dispositif historique</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <a 
                href="/immobilier/scellier" 
                className="inline-block bg-[#B99066] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#A67A5A] transition-colors duration-200 mr-4"
              >
                Découvrir Scellier
              </a>
              <a 
                href="/immobilier/robien" 
                className="inline-block bg-[#253F60] text-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-[#1E2F4A] transition-colors duration-200"
              >
                Découvrir Robien
              </a>
            </div>
          </div>

          {/* Faire Construire */}
          <div className="relative bg-gradient-to-br from-[#253F60]/10 via-[#F9FAFB] to-[#B99066]/10 rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border-l-4 border-[#253F60] shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#253F60]/5 rounded-bl-full"></div>
            <SectionHeader 
              title="Faire construire : terrain + maison"
              subtitle="Construire sa maison sur son propre terrain offre de nombreux avantages : personnalisation totale, économies d'impôts, et investissement patrimonial durable"
            />
            <div className="text-center mb-8 relative z-10">
              <a 
                href="/immobilier/faire-construire" 
                className="inline-block bg-[#B99066] hover:bg-[#A67A5A] text-white px-8 py-4 rounded-lg shadow-xl font-inter font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Découvrir faire construire
              </a>
            </div>
          </div>

          {/* Conclusion */}
          <div className="relative bg-gradient-to-br from-[#253F60] via-[#1a2d47] to-[#253F60] rounded-2xl p-8 sm:p-10 lg:p-12 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99066]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B99066]/10 rounded-tr-full"></div>
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-4 sm:mb-6 relative z-10">
              Conclusion
            </h2>
            <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed relative z-10">
              L'<strong>investissement immobilier</strong> n'est pas monolithique : il existe une stratégie adaptée à chaque objectif.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-cairo font-semibold text-lg mb-3">Réduire vos impôts</h3>
                <p className="text-white/90 text-sm font-inter mb-4">→ Loi Pinel, déficit foncier, LMNP</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-cairo font-semibold text-lg mb-3">Préparer votre retraite</h3>
                <p className="text-white/90 text-sm font-inter mb-4">→ Investissement locatif, LMNP, SCI familiale</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-cairo font-semibold text-lg mb-3">Valoriser rapidement votre capital</h3>
                <p className="text-white/90 text-sm font-inter mb-4">→ Immeubles de rapport, plus-value immobilière</p>
              </div>
            </div>
            
            <p className="text-white text-base sm:text-lg font-inter mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed relative z-10">
              Chez <strong>Azalée Patrimoine</strong>, nous analysons votre profil fiscal, patrimonial et vos objectifs pour bâtir une stratégie sur mesure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-xl font-inter font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Demander un bilan gratuit
              </button>
              <button 
                onClick={() => window.open('https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 