'use client';
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"), { ssr: false });
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getApiPath, getImagePath } from '@/lib/paths';

const Header = () => {
  const router = useRouter();
  const [headerContent, setHeaderContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeaderContent();
  }, []);

  const fetchHeaderContent = async () => {
    try {
      const response = await fetch(getApiPath(`/cms/content?path=header&t=${Date.now()}`));
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
        icon: "/images/azalee-patrimoine-img-component-1.svg" // Pas de getImagePath ici, sera appliqué lors du rendu
      },
      email: {
        address: "contact@azalee-patrimoine.fr",
        link: "mailto:contact@azalee-patrimoine.fr",
        icon: "/images/azalee-patrimoine-img-component-1-light-green-400.svg" // Pas de getImagePath ici, sera appliqué lors du rendu
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
  
  // State for active dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header-nav-item')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const closeDropdown = () => setActiveDropdown(null);

  // Define Menu Items
  const fiscaliteMenuItems = [
    { title: "Impôt sur le revenu", path: "/fiscalite/impot-sur-le-revenu" },
    { title: "Déclaration d'impôts", path: "/fiscalite/declaration-impots" },
    { title: "Tranches, barèmes, plafonds", path: "/fiscalite/tranches-baremes-plafonds" },
    { title: "Lois fiscales", path: "/fiscalite/lois-fiscales" },
    { title: "Loi Pinel", path: "/fiscalite/loi-pinel" },
    { title: "Loi Girardin", path: "/fiscalite/loi-girardin" },
    { title: "Loi Denormandie", path: "/fiscalite/loi-denormandie" },
    { title: "Loi Malraux", path: "/fiscalite/loi-malraux" },
    { title: "Loi Cosse", path: "/fiscalite/loi-cosse" },
    { title: "Monument historique", path: "/fiscalite/monument-historique" },
    { title: "Réductions d'impôt / déficit foncier", path: "/fiscalite/reductions-impot-deficit-foncier" },
    { title: "Fiscalité des placements", path: "/fiscalite/fiscalite-placements" },
    { title: "PFU", path: "/fiscalite/pfu" },
    { title: "TMI et prélèvements sociaux", path: "/fiscalite/tmi-prelevements-sociaux" },
    { title: "Défiscalisation & cas spécifiques", path: "/fiscalite/defiscalisation-cas-specifiques" },
    { title: "Autre fiscalité", path: "/fiscalite/autre-fiscalite" }
  ];

  const immobilierMenuItems = [
    { title: "Immobilier neuf", path: "/immobilier/immobilier-neuf" },
    { title: "VEFA", path: "/immobilier/vefa" },
    { title: "Scellier", path: "/immobilier/scellier" },
    { title: "Faire construire", path: "/immobilier/faire-construire" },
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
    { title: "Plans retraite PER/PERP/PEE", path: "/retraite/plan-retraite" },
    { title: "Rachat de trimestres", path: "/retraite/rachat-trimestres" },
    { title: "Simulation retraite", path: "/retraite/simulation" },
    { title: "Prévoyance / protection", path: "/retraite/prevoyance-protection" },
    { title: "Retraite progressive", path: "/retraite/retraite-progressive" }
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
    { title: "Simulateur d'investissement", path: "/outils/simulateur-investissement" },
    { title: "Guides pratiques", path: "/outils/guides-pratiques" }
  ];

  // Helper to chunk items for grid columns
  const chunkItems = (items, size) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  };

  // Generic Mega Menu Render
  const renderMegaMenu = (items, cols = 3) => {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50 animate-fadeIn">
        <div className="max-w-[1368px] mx-auto p-8">
          <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-8`}>
            {chunkItems(items, Math.ceil(items.length / cols)).map((chunk, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-3" role="group">
                {chunk.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.path}
                    className="group flex items-center gap-2 text-sm font-inter text-[#4A5568] hover:text-[#B99066] transition-colors p-2 rounded-lg hover:bg-gray-50"
                    onClick={closeDropdown}
                    role="menuitem"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99066] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
      
      {/* Header Container - Sticky */}
      <header className="sticky top-0 z-50 w-full bg-[#253F60] lg:bg-gradient-to-r lg:from-[#253F60] lg:to-[#B99066] shadow-lg transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-[100px] py-2 lg:py-0">
          
          {/* Top Header Bar */}
          <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center gap-2 lg:gap-4 py-2 border-b border-white/10 lg:border-none">
            {/* Contact & Social & Espace Client - Tout aligné à droite */}
            <div className="hidden lg:flex flex-row items-center gap-4 sm:gap-6 ml-auto">
              {/* Phone */}
              {topBar.contact?.phone && (
                <div className="flex items-center gap-2 group">
                  <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-[#B99066] transition-colors">
                    <img src={getImagePath(topBar.contact.phone.icon || "/images/azalee-patrimoine-img-component-1.svg")} className="w-3.5 h-3.5 invert sm:invert-0" alt="phone" />
                  </div>
                  <a href={topBar.contact.phone.link || `tel:${topBar.contact.phone.number}`} className="text-sm font-segoe text-white hover:text-white/80 transition-colors">
                    {topBar.contact.phone.number}
                  </a>
                </div>
              )}
              {/* Email */}
              {topBar.contact?.email && (
                <div className="flex items-center gap-2 group">
                  <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-[#B99066] transition-colors">
                    <img src={getImagePath(topBar.contact.email.icon || "/images/azalee-patrimoine-img-component-1-light-green-400.svg")} className="w-3.5 h-3.5 invert sm:invert-0" alt="email" />
                  </div>
                  <a href={topBar.contact.email.link || `mailto:${topBar.contact.email.address}`} className="text-sm font-inter text-white hover:text-white/80 transition-colors hidden xl:block">
                    {topBar.contact.email.address}
                  </a>
                </div>
              )}
              {/* LinkedIn */}
              {topBar.social?.linkedin && (
                <div className="flex items-center gap-2">
                  <a 
                    href={topBar.social.linkedin.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/10 p-1.5 rounded-full hover:bg-[#0077b5] transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              )}
              
              {/* Espace Client */}
              {topBar.espaceClient && (
                <div className="hidden sm:block">
                  <Link href={topBar.espaceClient.path || "/espace-client"} className="bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-[#B99066] transition-all duration-300 flex items-center gap-2 border border-white/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {topBar.espaceClient.text || "Espace client"}
                  </Link>
                </div>
              )}
              
              {/* Language Switcher */}
              <div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {/* Main Navigation Bar */}
          <div className="relative flex items-center justify-between py-4 lg:py-6">
            
            {/* Logo */}
            <div className="flex-shrink-0 relative z-20">
              <Link href="/">
                <img 
                    src={getImagePath(headerContent?.logo?.src || "/images/azalee-patrimoine3.webp")} 
                    className="w-[100px] h-auto sm:w-[130px] lg:w-[150px] object-contain hover:opacity-90 transition-opacity" 
                  alt={headerContent?.logo?.alt || "Azalée Patrimoine Logo"} 
                />
              </Link>
            </div>

            {/* Mobile Actions (Search + Menu) */}
            <div className="flex items-center gap-4 lg:hidden">
              <Link href="/espace-client" className="p-2 text-white hover:text-[#B99066]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </Link>
              <button 
                className="p-2 text-white hover:text-[#B99066]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav 
              id="mobile-navigation"
              className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 w-full lg:w-auto bg-[#253F60] lg:bg-transparent shadow-xl lg:shadow-none p-4 lg:p-0 gap-4 lg:gap-8 items-stretch lg:items-center z-50`}
              aria-label="Navigation principale"
              role="navigation"
            >
              
              {/* Mobile: Contact & Espace Client Links */}
              <div className="lg:hidden w-full border-b border-white/10 pb-4 mb-4 space-y-3">
                {/* Contact Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider">Contact</h3>
                  {topBar.contact?.phone && (
                    <a 
                      href={topBar.contact.phone.link || `tel:${topBar.contact.phone.number}`} 
                      className="flex items-center gap-3 text-white hover:text-[#B99066] transition-colors py-2"
                    >
                      <div className="bg-white/10 p-2 rounded-full">
                        <img src={getImagePath(topBar.contact.phone.icon || "/images/azalee-patrimoine-img-component-1.svg")} className="w-4 h-4 invert" alt="phone" />
                      </div>
                      <span className="text-sm font-medium">{topBar.contact.phone.number}</span>
                    </a>
                  )}
                  {topBar.contact?.email && (
                    <a 
                      href={topBar.contact.email.link || `mailto:${topBar.contact.email.address}`} 
                      className="flex items-center gap-3 text-white hover:text-[#B99066] transition-colors py-2"
                    >
                      <div className="bg-white/10 p-2 rounded-full">
                        <img src={getImagePath(topBar.contact.email.icon || "/images/azalee-patrimoine-img-component-1-light-green-400.svg")} className="w-4 h-4 invert" alt="email" />
                      </div>
                      <span className="text-sm font-medium">{topBar.contact.email.address}</span>
                    </a>
                  )}
                  <Link 
                    href="/contact" 
                    className="flex items-center gap-3 text-white hover:text-[#B99066] transition-colors py-2"
                  >
                    <div className="bg-white/10 p-2 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Page de contact</span>
                  </Link>
                </div>
              </div>
              
              {/* Menu Items */}
              {[
                { name: 'gestion-patrimoine', label: 'Gestion de patrimoine', path: '/patrimoine', items: patrimoineMenuItems },
                { name: 'placements', label: 'Placements', path: '/placements', items: placementsMenuItems },
                { name: 'immobilier', label: 'Investissement immobilier', path: '/immobilier', items: immobilierMenuItems },
                { name: 'fiscalite', label: 'Fiscalité', path: '/fiscalite', items: fiscaliteMenuItems },
                { name: 'retraite', label: 'Retraite', path: '/retraite', items: retraiteMenuItems },
                { name: 'outils', label: 'Outils financiers', path: '/outils-financiers', items: outilsMenuItems },
              ].map((menu) => (
                <div key={menu.name} className="header-nav-item lg:static relative" role="none">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // First click: open dropdown, Second click: navigate to page
                        if (activeDropdown === menu.name) {
                          // Dropdown is open, navigate to page
                          router.push(menu.path);
                          setActiveDropdown(null);
                        } else {
                          // Dropdown is closed, open it
                          toggleDropdown(menu.name);
                        }
                      }}
                      className={`flex items-center text-lg lg:text-base font-inter font-medium transition-colors py-2 lg:py-4 border-b lg:border-none border-white/10
                        ${activeDropdown === menu.name ? 'text-[#B99066]' : 'text-white hover:text-[#B99066]'}`}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === menu.name}
                      aria-controls={`submenu-${menu.name}`}
                    >
                      {menu.label}
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        toggleDropdown(menu.name); 
                      }}
                      className="lg:ml-1 p-1 hover:bg-white/10 rounded transition-colors"
                      aria-label={`Ouvrir le sous-menu ${menu.label}`}
                      aria-expanded={activeDropdown === menu.name}
                    >
                      <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === menu.name ? 'rotate-180' : ''} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Mega Menu Dropdown (Desktop) */}
                  <div 
                    id={`submenu-${menu.name}`}
                    className="hidden lg:block text-left"
                    role="menu"
                    aria-label={`Sous-menu ${menu.label}`}
                  >
                    {activeDropdown === menu.name && renderMegaMenu(menu.items, menu.name === 'fiscalite' || menu.name === 'immobilier' ? 4 : 3)}
                  </div>
                  
                  {/* Simple Dropdown (Mobile) */}
                  <div 
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${activeDropdown === menu.name ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                    role="menu"
                    aria-label={`Sous-menu ${menu.label} (mobile)`}
                  >
                    <div className="bg-[#1A2A4A] rounded-lg p-2 space-y-1">
                      {menu.items.map((item, idx) => (
                        <Link 
                          key={idx}
                          href={item.path}
                          className="block text-sm text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded transition-colors"
                          onClick={() => setMenuOpen(false)}
                          role="menuitem"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Standalone Links */}
              <Link
                href="/blog"
                className="text-lg lg:text-base font-inter font-medium text-white hover:text-[#B99066] transition-colors py-2 lg:py-4 border-b lg:border-none border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/ressources"
                className="text-lg lg:text-base font-inter font-medium text-white hover:text-[#B99066] transition-colors py-2 lg:py-4 border-b lg:border-none border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                Ressources
              </Link>
              
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;