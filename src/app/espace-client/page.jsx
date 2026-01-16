import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";

export default function EspaceClientPage() {

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#253F60] mb-6">
              Espace Client
            </h1>
            <p className="text-lg sm:text-xl text-[#374151] max-w-4xl mx-auto leading-relaxed mb-8">
              Accédez à votre tableau de bord personnel et retrouvez toutes les informations partagées par votre conseiller AZALEE Patrimoine.
            </p>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
            {/* Logo AZALEE */}
            <div className="text-center mb-8">
              <img 
                src="/images/azalee-patrimoine-azale-patrimoine1.webp" 
                alt="AZALEE Patrimoine" 
                className="w-32 h-32 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-[#253F60] mb-2">
                Connectez-vous
              </h2>
              <p className="text-[#374151] text-sm">
                Accédez à votre espace client sécurisé
              </p>
            </div>

            {/* Formulaire de connexion */}
            <div className="text-center">
              <CTAButton
                externalUrl="https://app.wealthcome.fr/login"
                className="w-full bg-[#253F60] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-[#1A2A4A] transition-colors duration-200"
              >
                Connectez-vous
              </CTAButton>
            </div>

            {/* Liens supplémentaires */}
            <div className="mt-6 text-center space-y-3">
              <Link href="#" className="block text-[#253F60] text-sm hover:text-[#1A2A4A] transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Informations supplémentaires */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-[#686868] text-center">
                Vous n'avez pas encore d'espace client ? 
                <Link href="/contact" className="text-[#253F60] hover:text-[#1A2A4A] ml-1">
                  Contactez votre conseiller
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
