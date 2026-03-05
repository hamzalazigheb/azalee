"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfessionalHeader() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className="bg-white shadow-xl border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Azalee Professionnel avec lien vers l'accueil */}
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="text-white font-bold text-2xl">A</div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                Azalee Wealth
              </h1>
              <p className="text-sm text-gray-600 font-medium">Gestion de Patrimoine Professionnel</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Accueil
            </Link>
            <Link href="/Investissement-immobilier" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Immobilier
            </Link>
            <Link href="/placements" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Placements
            </Link>
            <Link href="/patrimoine" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Patrimoine
            </Link>
            <Link href="/retraite" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Retraite
            </Link>
            <Link href="/outils" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Outils
            </Link>
          </nav>

          {/* Bouton CTA */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
