'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';
import Link from "next/link";
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-global-8 px-4 sm:px-6 lg:px-[100px] py-2 lg:py-0">
      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-8 py-2">
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <img src="/images/img_component_1.svg" className="w-4 h-4" alt="phone" />
            <span className="text-sm font-segoe text-header-1">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/img_component_1_light_green_400.svg" className="w-4 h-4" alt="email" />
            <span className="text-sm font-inter text-header-1">contact@azaleewealth.com</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="flex items-center bg-gray-50 rounded px-3 py-2 w-full sm:w-auto lg:w-[200px]">
            <input 
              type="text" 
              placeholder="Recherche …" 
              className="bg-transparent text-xs font-source-sans text-header-2 outline-none flex-1"
            />
            <img src="/images/img_button_svg.svg" className="w-2.5 h-2.5 ml-2" alt="search" />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 text-xs font-source-sans">
            <LanguageSwitcher className="mr-2" />
            <span className="text-global-1">Nos agences</span>
            <div className="w-px h-2.5 bg-header-1"></div>
            <span className="text-global-1">Actualités</span>
            <Button 
              variant="primary" 
              size="xs"
              className="bg-global-6 text-global-7 px-3 py-1.5 text-xs"
            >
              Espace clients
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="relative flex items-center justify-between py-4 lg:py-6 border-t border-gray-100 lg:border-t-0">
        {/* Left: Search Icon (mobile only) */}
        <div className="flex-1 flex items-center lg:hidden">
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        {/* Center: Logo (mobile only) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block lg:hidden flex-shrink-0">
          <img 
            src="/images/img_header_logo.png" 
            className="w-[50px] h-[48px] sm:w-[60px] sm:h-[58px] rounded-full mx-auto" 
            alt="Azalee Wealth Logo" 
          />
        </div>
        {/* Left: Logo (desktop only) */}
        <div className="hidden lg:flex flex-shrink-0">
          <img 
            src="/images/img_header_logo.png" 
            className="w-[70px] h-[68px] rounded-full" 
            alt="Azalee Wealth Logo" 
          />
        </div>
        {/* Right: Hamburger/Menu (mobile only) */}
        <div className="flex-1 flex justify-end items-center lg:hidden">
          <button 
            className="p-2" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-global-1 mb-1"></div>
            <div className="w-6 h-0.5 bg-global-1 mb-1"></div>
            <div className="w-6 h-0.5 bg-global-1"></div>
          </button>
        </div>
        {/* Navigation Menu (unchanged) */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto bg-global-8 lg:bg-transparent shadow-lg lg:shadow-none z-50`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 p-4 lg:p-0">
            <Link href="/fiscalite" className="text-base font-inter text-global-1 hover:text-global-5 transition-colors">Fiscalité</Link>
            <Link href="/Investissement-immobilier" className="text-base font-inter text-global-1 hover:text-global-5 transition-colors">Investissement immobilier</Link>
            <Link href="/placements" className="text-base font-inter text-global-1 hover:text-global-5 transition-colors">Placements</Link>
            <Link href="/retraite" className="text-base font-inter text-global-1 hover:text-global-5 transition-colors">Retraite</Link>
            <Link href="/patrimoine" className="text-base font-inter text-global-1 hover:text-global-5 transition-colors">Patrimoine</Link>
            <Link href="/outils-financiers" className="text-base font-inter text-global-1 hover:text-global-5 transition-colors">Outils financiers</Link>
            {/* Contact Button */}
            <div className="flex items-center gap-2 border border-global-1 rounded-2xl px-3 py-2 hover:bg-gray-50 transition-colors">
              <img src="/images/img_symbol.svg" className="w-1 h-1" alt="contact" />
              <span className="text-xs font-prompt font-medium text-global-1">Contact Us</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;