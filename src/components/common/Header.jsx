'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import dynamic from "next/dynamic";
const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"), { ssr: false });
import Link from "next/link";

const Header = () => {
  const [headerContent, setHeaderContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeaderContent();
  }, []);

  const fetchHeaderContent = async () => {
    try {
      const response = await fetch(`/api/cms/content?path=header&t=${Date.now()}`);
      const data = await response.json();
      if (data.success) {
        setHeaderContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching header content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default content fallback
  const defaultTopBar = {
    contact: {
      phone: {
        number: "01 53 45 85 00",
        link: "tel:+33153458500",
        icon: "/images/img_component_1.svg"
      },
      email: {
        address: "contact@azalee-patrimoine.fr",
        link: "mailto:contact@azalee-patrimoine.fr",
        icon: "/images/img_component_1_light_green_400.svg"
      }
    },
    social: {
      linkedin: {
        url: "https://www.linkedin.com/company/azalee-patrimoine",
        text: "Suivez-nous"
      }
    },
    espaceClient: {
      text: "Espace client",
      path: "/espace-client"
    }
  };

  const topBar = headerContent?.topBar || defaultTopBar;
  const [menuOpen, setMenuOpen] = useState(false);
  const [fiscaliteDropdownOpen, setFiscaliteDropdownOpen] = useState(false);
  const [fiscaliteTimeoutId, setFiscaliteTimeoutId] = useState(null);
  const [immobilierDropdownOpen, setImmobilierDropdownOpen] = useState(false);
  const [placementsDropdownOpen, setPlacementsDropdownOpen] = useState(false);
  const [retraiteDropdownOpen, setRetraiteDropdownOpen] = useState(false);
  const [patrimoineDropdownOpen, setPatrimoineDropdownOpen] = useState(false);
  const [outilsDropdownOpen, setOutilsDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [immobilierTimeoutId, setImmobilierTimeoutId] = useState(null);
  const [placementsTimeoutId, setPlacementsTimeoutId] = useState(null);
  const [retraiteTimeoutId, setRetraiteTimeoutId] = useState(null);
  const [patrimoineTimeoutId, setPatrimoineTimeoutId] = useState(null);
  const [outilsTimeoutId, setOutilsTimeoutId] = useState(null);

  const fiscaliteMenuItems = [
    {
      title: "Impôt sur le revenu",
      path: "/fiscalite/impot-sur-le-revenu",
      subItems: [
        { title: "Déclaration d'impôts", path: "/fiscalite/declaration-impots" },
        { title: "Tranches, barèmes, plafonds", path: "/fiscalite/tranches-baremes-plafonds" },
        { title: "Lois fiscales", path: "/fiscalite/lois-fiscales", 
          subItems: [
            { title: "Loi Pinel", path: "/fiscalite/loi-pinel" },
            { title: "Loi Girardin", path: "/fiscalite/loi-girardin" },
            { title: "Loi Denormandie", path: "/fiscalite/loi-denormandie" },
            { title: "Loi Malraux", path: "/fiscalite/loi-malraux" },
            { title: "Loi Cosse", path: "/fiscalite/loi-cosse" },
            { title: "Monument historique", path: "/fiscalite/monument-historique" }
          ]
        }
      ]
    },
    {
      title: "Réductions d'impôt / déficit foncier",
      path: "/fiscalite/reductions-impot-deficit-foncier"
    },
    {
      title: "Fiscalité des placements",
      path: "/fiscalite/fiscalite-placements",
      subItems: [
        { title: "PFU", path: "/fiscalite/pfu" },
        { title: "TMI et prélèvements sociaux", path: "/fiscalite/tmi-prelevements-sociaux" }
      ]
    },
    {
      title: "Défiscalisation & cas spécifiques",
      path: "/fiscalite/defiscalisation-cas-specifiques",
      subItems: [
        { title: "Autre fiscalité", path: "/fiscalite/autre-fiscalite" }
      ]
    }
  ];

  const immobilierMenuItems = [
    { title: "Immobilier neuf", path: "/immobilier/immobilier-neuf" },
    { title: "VEFA", path: "/immobilier/vefa" },
    { title: "Scellier", path: "/immobilier/scellier" },
    { title: "Faire construire (terrain + constr.)", path: "/immobilier/faire-construire" },
    { title: "Investissement locatif", path: "/immobilier/investissement-locatif" },
    { title: "SCI", path: "/immobilier/sci" },
    { title: "Crédit immobilier / PTZ", path: "/immobilier/credit-immobilier-ptz" },
    { title: "Plus-value immobilière", path: "/immobilier/plus-value-immobiliere" },
    { title: "LMNP", path: "/immobilier/lmnp" },
    { title: "Immeubles de rapport", path: "/immobilier/immeubles-de-rapport" }
  ];

  const placementsMenuItems = [
    { title: "Assurance-vie", path: "/placements/assurance-vie" },
    { title: "Assurance-vie luxembourgeoise", path: "/placements/assurance-vie-luxembourg" },
    { title: "Compte titres ordinaires", path: "/placements/compte-titres" },
    { title: "Contrat de capitalisation", path: "/placements/contrat-capitalisation" },
    { title: "Livrets (A, LDDS, etc.)", path: "/placements/livret" },
    { title: "Bourse, actions et indices", path: "/placements/bourse-actions" },
    { title: "SCPI / OPCI", path: "/placements/scpi-opci" },
    { title: "PEA / PER", path: "/placements/pea-per" },
    { title: "Taux, intérêts", path: "/placements/taux-interets" },
    { title: "ETF, produits financiers", path: "/placements/etf-produits-financiers" },
    { title: "Autres placements", path: "/placements/autres" }
  ];

  const retraiteMenuItems = [
    { title: "Plans retraite PER/PERP/PEE etc.", path: "/retraite/plan-retraite" },
    { title: "Rachat de trimestres", path: "/retraite/rachat-trimestres" },
    { title: "Simulation retraite", path: "/retraite/simulation" },
    { title: "Prévoyance / protection famille", path: "/retraite/prevoyance-protection" },
    { 
      title: "Autre retraite", 
      path: "/retraite/autre",
      subItems: [
        { title: "Retraite progressive", path: "/retraite/retraite-progressive" }
      ]
    }
  ];

  const patrimoineMenuItems = [
    { title: "Succession, héritage", path: "/patrimoine/succession-heritage" },
    { title: "Donation à titre gratuit", path: "/patrimoine/donation-gratuite" },
    { title: "Donation à titre onéreux", path: "/patrimoine/donation-onereuse" },
    { title: "Transmission de patrimoine", path: "/patrimoine/transmission" },
    { title: "Protection famille", path: "/patrimoine/protection-famille" },
    { title: "Bilan patrimonial", path: "/patrimoine/bilan" },
    { title: "Conseils patrimoniaux", path: "/patrimoine/conseils" },
    { title: "Autre patrimoine", path: "/patrimoine/autre" }
  ];

  const outilsMenuItems = [
    { title: "Guide de défiscalisation", path: "/outils-financiers/guide-defiscalisation" },
    { title: "Calculatrice d'impôts", path: "/outils/calculatrice-impots" },
    { title: "Calculs financiers divers", path: "/outils/calculs-financiers" },
    { title: "Assurance-vie vs PER", path: "/outils-financiers/assurance-vie-vs-per" },
    { 
      title: "Simulateur d'investissement", 
      path: "/outils/simulateur-investissement",
      subItems: [
        { 
          title: "Simulations générales", 
          path: "/outils/simulations-generales",
          subItems: [
            { title: "Guides pratiques", path: "/outils/guides-pratiques" },
            { title: "Autres outils", path: "/outils/autres" }
          ]
        }
      ]
    }
  ];

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setFiscaliteDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setFiscaliteDropdownOpen(false);
    }, 100);
    setTimeoutId(id);
  };

  const handleImmobilierMouseEnter = () => {
    if (immobilierTimeoutId) {
      clearTimeout(immobilierTimeoutId);
      setImmobilierTimeoutId(null);
    }
    setImmobilierDropdownOpen(true);
  };

  const handleImmobilierMouseLeave = () => {
    const id = setTimeout(() => {
      setImmobilierDropdownOpen(false);
    }, 100);
    setImmobilierTimeoutId(id);
  };

  const handlePlacementsMouseEnter = () => {
    if (placementsTimeoutId) {
      clearTimeout(placementsTimeoutId);
      setPlacementsTimeoutId(null);
    }
    setPlacementsDropdownOpen(true);
  };

  const handlePlacementsMouseLeave = () => {
    const id = setTimeout(() => {
      setPlacementsDropdownOpen(false);
    }, 100);
    setPlacementsTimeoutId(id);
  };

  const handleFiscaliteMouseEnter = () => {
    if (fiscaliteTimeoutId) {
      clearTimeout(fiscaliteTimeoutId);
      setFiscaliteTimeoutId(null);
    }
    setFiscaliteDropdownOpen(true);
  };

  const handleFiscaliteMouseLeave = () => {
    const id = setTimeout(() => {
      setFiscaliteDropdownOpen(false);
    }, 100);
    setFiscaliteTimeoutId(id);
  };

  const handleRetraiteMouseEnter = () => {
    if (retraiteTimeoutId) {
      clearTimeout(retraiteTimeoutId);
      setRetraiteTimeoutId(null);
    }
    setRetraiteDropdownOpen(true);
  };

  const handleRetraiteMouseLeave = () => {
    const id = setTimeout(() => {
      setRetraiteDropdownOpen(false);
    }, 100);
    setRetraiteTimeoutId(id);
  };

  const handlePatrimoineMouseEnter = () => {
    if (patrimoineTimeoutId) {
      clearTimeout(patrimoineTimeoutId);
      setPatrimoineTimeoutId(null);
    }
    setPatrimoineDropdownOpen(true);
  };

  const handlePatrimoineMouseLeave = () => {
    const id = setTimeout(() => {
      setPatrimoineDropdownOpen(false);
    }, 100);
    setPatrimoineTimeoutId(id);
  };

  const handleOutilsMouseEnter = () => {
    if (outilsTimeoutId) {
      clearTimeout(outilsTimeoutId);
      setOutilsTimeoutId(null);
    }
    setOutilsDropdownOpen(true);
  };

  const handleOutilsMouseLeave = () => {
    const id = setTimeout(() => {
      setOutilsDropdownOpen(false);
    }, 100);
    setOutilsTimeoutId(id);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      <header className="w-full bg-[#253F60] lg:bg-gradient-to-r lg:from-[#253F60] lg:to-[#B99066] px-4 sm:px-6 lg:px-[100px] py-2 lg:py-0 relative z-50">
      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-8 py-2">
        {/* Contact Info */}
        <div className="hidden lg:flex flex-col sm:flex-row gap-4 sm:gap-8 w-full lg:w-auto">
          {topBar.contact?.phone && (
            <div className="flex items-center gap-2">
              <div className="bg-white p-1 rounded">
                <img src={topBar.contact.phone.icon || "/images/img_component_1.svg"} className="w-4 h-4" alt="phone" />
              </div>
              <a href={topBar.contact.phone.link || `tel:${topBar.contact.phone.number}`} className="text-sm font-segoe text-white hover:text-gray-300 transition-colors duration-200">
                {topBar.contact.phone.number}
              </a>
            </div>
          )}
          {topBar.contact?.email && (
            <div className="flex items-center gap-2">
              <div className="bg-white p-1 rounded">
                <img src={topBar.contact.email.icon || "/images/img_component_1_light_green_400.svg"} className="w-4 h-4" alt="email" />
              </div>
              <a href={topBar.contact.email.link || `mailto:${topBar.contact.email.address}`} className="text-sm font-inter text-white hover:text-gray-300 transition-colors duration-200">
                {topBar.contact.email.address}
              </a>
            </div>
          )}
          {topBar.social?.linkedin && (
            <div className="flex items-center gap-2">
              <a 
                href={topBar.social.linkedin.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-1 rounded hover:bg-gray-100 transition-colors duration-200"
                aria-label="LinkedIn Azalée Patrimoine"
              >
                <svg className="w-4 h-4 text-[#253F60]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <span className="text-sm font-inter text-white">{topBar.social.linkedin.text || "Suivez-nous"}</span>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full lg:w-auto">
          {/* Espace Client */}
          {topBar.espaceClient && (
            <div className="ml-2">
              <Link href={topBar.espaceClient.path || "/espace-client"} className="bg-[#B99066] lg:bg-[#253F60] text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm font-medium hover:bg-[#A67C52] lg:hover:bg-[#1A2A4A] transition-colors duration-200">
                {topBar.espaceClient.text || "Espace client"}
              </Link>
            </div>
          )}
          {/* Language Switcher */}
          <div className="ml-auto sm:ml-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="relative flex items-center justify-between py-4 lg:py-6 lg:border-t-0">
        {/* Left: Search Icon (mobile only) */}
        <div className="flex-1 flex items-center lg:hidden">
          <button className="p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        {/* Center: Logo (mobile only) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block lg:hidden flex-shrink-0">
          <Link href="/">
            <img 
                src={headerContent?.logo?.src || "/images/azalee-patrimoine3.png"} 
                className="w-[100px] h-[98px] sm:w-[120px] sm:h-[118px] mx-auto cursor-pointer hover:opacity-80 transition-opacity relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000" 
              alt={headerContent?.logo?.alt || "Azalee Wealth Logo"} 
            />
          </Link>
        </div>
        {/* Left: Logo (desktop only) */}
        <div className="hidden lg:flex flex-shrink-0">
          <Link href="/">
            <img 
                src={headerContent?.logo?.src || "/images/azalee-patrimoine3.png"} 
                className="w-[140px] h-[138px] cursor-pointer hover:opacity-80 transition-opacity relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000" 
              alt={headerContent?.logo?.alt || "Azalee Wealth Logo"} 
            />
          </Link>
        </div>
        {/* Right: Hamburger/Menu (mobile only) */}
        <div className="flex-1 flex justify-end items-center lg:hidden">
          <button 
            className="p-2" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
        {/* Navigation Menu */}
        <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto bg-[#253F60] lg:bg-transparent shadow-lg lg:shadow-none z-50`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 p-4 lg:p-0">
            {/* Mobile Menu Header */}
            {menuOpen && (
              <div className="lg:hidden w-full border-b border-white/20 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">Menu</h3>
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-gray-300 p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {/* Patrimoine Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handlePatrimoineMouseEnter}
              onMouseLeave={handlePatrimoineMouseLeave}
            >
              <Link href="/patrimoine" className="text-lg font-inter text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                Gestion de patrimoine
                <svg className={`w-4 h-4 transition-transform ${patrimoineDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Desktop Dropdown */}
              <div className={`${patrimoineDropdownOpen ? 'block' : 'hidden'} absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-300 z-50`}>
                <div className="p-4">
                  {patrimoineMenuItems.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <Link 
                        href={item.path}
                        className="block text-sm font-medium text-[#253F60] hover:text-[#B99066] transition-colors mb-2"
                      >
                        {item.title}
                      </Link>
                      {item.subItems && (
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem, subIndex) => (
                            <div key={subIndex}>
                              <Link 
                                href={subItem.path}
                                className="block text-xs text-[#374151] hover:text-[#253F60] transition-colors py-1"
                              >
                                {subItem.title}
                              </Link>
                              {subItem.subItems && (
                                <div className="ml-4 space-y-1">
                                  {subItem.subItems.map((subSubItem, subSubIndex) => (
                                    <Link 
                                      key={subSubIndex}
                                      href={subSubItem.path}
                                      className="block text-xs text-[#686868] hover:text-[#253F60] transition-colors py-0.5"
                                    >
                                      {subSubItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Placements Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handlePlacementsMouseEnter}
              onMouseLeave={handlePlacementsMouseLeave}
            >
              <Link href="/placements" className="text-lg font-inter text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                Placements
                <svg className={`w-4 h-4 transition-transform ${placementsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Desktop Dropdown */}
              <div className={`${placementsDropdownOpen ? 'block' : 'hidden'} absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-300 z-50`}>
                <div className="p-4">
                  {placementsMenuItems.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <Link 
                        href={item.path}
                        className="block text-sm font-medium text-[#253F60] hover:text-[#B99066] transition-colors mb-2"
                      >
                        {item.title}
                      </Link>
                      {item.subItems && (
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem, subIndex) => (
                            <div key={subIndex}>
                              <Link 
                                href={subItem.path}
                                className="block text-xs text-[#374151] hover:text-[#253F60] transition-colors py-1"
                              >
                                {subItem.title}
                              </Link>
                              {subItem.subItems && (
                                <div className="ml-4 space-y-1">
                                  {subItem.subItems.map((subSubItem, subSubIndex) => (
                                    <Link 
                                      key={subSubIndex}
                                      href={subSubItem.path}
                                      className="block text-xs text-[#686868] hover:text-[#253F60] transition-colors py-0.5"
                                    >
                                      {subSubItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Investissement Immobilier Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleImmobilierMouseEnter}
              onMouseLeave={handleImmobilierMouseLeave}
            >
              <Link href="/immobilier" className="text-lg font-inter text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                Investissement immobilier
                <svg className={`w-4 h-4 transition-transform ${immobilierDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Desktop Dropdown */}
              <div className={`${immobilierDropdownOpen ? 'block' : 'hidden'} absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-300 z-50`}>
                <div className="p-4">
                  {immobilierMenuItems.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <Link 
                        href={item.path}
                        className="block text-sm font-medium text-[#253F60] hover:text-[#B99066] transition-colors mb-2"
                      >
                        {item.title}
                      </Link>
                      {item.subItems && (
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem, subIndex) => (
                            <div key={subIndex}>
                              <Link 
                                href={subItem.path}
                                className="block text-xs text-[#374151] hover:text-[#253F60] transition-colors py-1"
                              >
                                {subItem.title}
                              </Link>
                              {subItem.subItems && (
                                <div className="ml-4 space-y-1">
                                  {subItem.subItems.map((subSubItem, subSubIndex) => (
                                    <Link 
                                      key={subSubIndex}
                                      href={subSubItem.path}
                                      className="block text-xs text-[#686868] hover:text-[#253F60] transition-colors py-0.5"
                                    >
                                      {subSubItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fiscalité Dropdown avec Vignettes */}
            <div 
              className="relative"
              onMouseEnter={handleFiscaliteMouseEnter}
              onMouseLeave={handleFiscaliteMouseLeave}
            >
              <Link href="/fiscalite" className="text-lg font-inter text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                Fiscalité
                <svg className={`w-4 h-4 transition-transform ${fiscaliteDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Desktop Dropdown avec Vignettes */}
              <div className={`${fiscaliteDropdownOpen ? 'block' : 'hidden'} absolute top-full left-0 mt-2 z-50`}>
                <div className="flex gap-4">
                  {/* Menu classique à gauche */}
                  <div className="w-80 bg-white shadow-lg rounded-lg border border-gray-300">
                    <div className="p-4">
                      {fiscaliteMenuItems.map((item, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <Link 
                            href={item.path}
                            className="block text-sm font-medium text-[#253F60] hover:text-[#B99066] transition-colors mb-2"
                          >
                            {item.title}
                          </Link>
                          {item.subItems && (
                            <div className="ml-4 space-y-1">
                              {item.subItems.map((subItem, subIndex) => (
                                <div key={subIndex}>
                                  <Link 
                                    href={subItem.path}
                                    className="block text-xs text-[#374151] hover:text-[#253F60] transition-colors py-1"
                                  >
                                    {subItem.title}
                                  </Link>
                                  {subItem.subItems && (
                                    <div className="ml-4 space-y-1">
                                      {subItem.subItems.map((subSubItem, subSubIndex) => (
                                        <Link 
                                          key={subSubIndex}
                                          href={subSubItem.path}
                                          className="block text-xs text-[#686868] hover:text-[#253F60] transition-colors py-0.5"
                                        >
                                          {subSubItem.title}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retraite Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleRetraiteMouseEnter}
              onMouseLeave={handleRetraiteMouseLeave}
            >
              <Link href="/retraite" className="text-lg font-inter text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                Retraite
                <svg className={`w-4 h-4 transition-transform ${retraiteDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Desktop Dropdown */}
              <div className={`${retraiteDropdownOpen ? 'block' : 'hidden'} absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-300 z-50`}>
                <div className="p-4">
                  {retraiteMenuItems.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <Link 
                        href={item.path}
                        className="block text-sm font-medium text-[#253F60] hover:text-[#B99066] transition-colors mb-2"
                      >
                        {item.title}
                      </Link>
                      {item.subItems && (
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem, subIndex) => (
                            <div key={subIndex}>
                              <Link 
                                href={subItem.path}
                                className="block text-xs text-[#374151] hover:text-[#253F60] transition-colors py-1"
                              >
                                {subItem.title}
                              </Link>
                              {subItem.subItems && (
                                <div className="ml-4 space-y-1">
                                  {subItem.subItems.map((subSubItem, subSubIndex) => (
                                    <Link 
                                      key={subSubIndex}
                                      href={subSubItem.path}
                                      className="block text-xs text-[#686868] hover:text-[#253F60] transition-colors py-0.5"
                                    >
                                      {subSubItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outils financiers Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleOutilsMouseEnter}
              onMouseLeave={handleOutilsMouseLeave}
            >
              <Link href="/outils-financiers" className="text-lg font-inter text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                Outils financiers
                <svg className={`w-4 h-4 transition-transform ${outilsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Desktop Dropdown */}
              <div className={`${outilsDropdownOpen ? 'block' : 'hidden'} absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-300 z-50`}>
                <div className="p-4">
                  {outilsMenuItems.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <Link 
                        href={item.path}
                        className="block text-sm font-medium text-[#253F60] hover:text-[#B99066] transition-colors mb-2"
                      >
                        {item.title}
                      </Link>
                      {item.subItems && (
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem, subIndex) => (
                            <div key={subIndex}>
                              <Link 
                                href={subItem.path}
                                className="block text-xs text-[#374151] hover:text-[#253F60] transition-colors py-1"
                              >
                                {subItem.title}
                              </Link>
                              {subItem.subItems && (
                                <div className="ml-4 space-y-1">
                                  {subItem.subItems.map((subSubItem, subSubIndex) => (
                                    <Link 
                                      key={subSubIndex}
                                      href={subSubItem.path}
                                      className="block text-xs text-[#686868] hover:text-[#253F60] transition-colors py-0.5"
                                    >
                                      {subSubItem.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;