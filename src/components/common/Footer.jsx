'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CTAButton from '@/components/ui/CTAButton';

const Footer = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    try {
      const response = await fetch('/api/cms/content?path=footer');
      const data = await response.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching footer content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default content fallback
  const defaultContent = {
    contact: {
      title: "Contactez-nous",
      address: {
        street: "106 Rue de Richelieu",
        city: "75002 Paris"
      },
      email: "contact@azalee-patrimoine.fr",
      phone: "01 53 45 85 00",
      ctaButton: {
        text: "Planifiez votre consultation gratuite",
        url: "https://calendly.com/rdv-azalee-patrimoine/30min"
      }
    },
    services: {
      title: "Nos services",
      items: [
        "Conseil en gestion de patrimoine",
        "Optimisation fiscale",
        "Investissement immobilier",
        "Placements financiers",
        "Transmission de patrimoine"
      ]
    },
    outils: {
      title: "Outils",
      items: [
        { text: "Calculateur d'impôts", path: "/outils/calculatrice-impots" },
        { text: "Calculs financiers", path: "/outils/calculs-financiers" },
        { text: "Assurance-vie vs PER", path: "/outils-financiers/assurance-vie-vs-per" }
      ]
    },
    apropos: {
      title: "À propos",
      items: [
        { text: "Qui sommes-nous", path: "/qui-sommes-nous" },
        { text: "Notre équipe", path: "/equipe" },
        { text: "Notre approche", path: "/notre-approche" },
        { text: "Contact", path: "/contact" }
      ]
    },
    mentionsLegales: {
      title: "Mentions légales",
      companyName: "Azalée Patrimoine",
      legalInfo: {
        capital: "SASU au capital de 8 000 €",
        address: "106 rue de Richelieu, 75002 Paris",
        siren: "SIREN 790 419 949 – RCS Paris",
        tva: "TVA intracommunautaire : FR90790419949",
        orias: {
          text: "Inscrite à l'ORIAS n° 13001775",
          url: "https://www.orias.fr",
          description: "en qualité d'intermédiaire en assurance, banque et finance."
        },
        anacofi: "Adhérente à l'ANACOFI-CIF (92 rue d'Amsterdam, 75009 Paris) et à l'ANACOFI-Courtage (90 rue d'Amsterdam, 75009 Paris).",
        acpr: "Soumise au contrôle de l'ACPR (4 place de Budapest, 75436 Paris Cedex 09)."
      }
    },
    bottom: {
      copyright: "© 2025 AZALEE PATRIMOINE. Tous droits réservés.",
      links: [
        { text: "Politique de confidentialité", path: "#" },
        { text: "Conditions d'utilisation", path: "/conditions-generales" },
        { text: "Mentions légales", path: "/mentions-legales" }
      ]
    }
  };

  const footerContent = content || defaultContent;

  if (loading) {
    return (
      <footer className="w-full bg-[#253F60] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-[#253F60] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Contact */}
          {footerContent.contact && (
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">{footerContent.contact.title || "Contactez-nous"}</h3>
              <div className="space-y-2 text-sm">
                {footerContent.contact.address && (
                  <>
                    <p>{footerContent.contact.address.street}</p>
                    <p>{footerContent.contact.address.city}</p>
                  </>
                )}
                {footerContent.contact.email && <p>{footerContent.contact.email}</p>}
                {footerContent.contact.phone && <p>{footerContent.contact.phone}</p>}
              </div>
              {footerContent.contact.ctaButton && (
                <CTAButton
                  externalUrl={footerContent.contact.ctaButton.url}
                  variant="primary"
                  className="mt-4"
                >
                  {footerContent.contact.ctaButton.text}
                </CTAButton>
              )}
            </div>
          )}

          {/* Services */}
          {footerContent.services && (
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">{footerContent.services.title || "Nos services"}</h3>
              <div className="space-y-2 text-sm">
                {footerContent.services.items && footerContent.services.items.map((item, index) => {
                  // Fonction pour mapper les services aux URLs
                  const getServiceUrl = (serviceName) => {
                    const nameLower = serviceName?.toLowerCase() || '';
                    if (nameLower.includes('conseil') || nameLower.includes('gestion de patrimoine')) {
                      return '/patrimoine';
                    } else if (nameLower.includes('optimisation fiscale') || nameLower.includes('fiscal')) {
                      return '/patrimoine/conseils';
                    } else if (nameLower.includes('investissement immobilier') || nameLower.includes('immobilier')) {
                      return '/immobilier';
                    } else if (nameLower.includes('placements financiers') || nameLower.includes('placements')) {
                      return '/placements';
                    } else if (nameLower.includes('transmission')) {
                      return '/patrimoine/transmission';
                    } else {
                      return '/patrimoine';
                    }
                  };
                  
                  const serviceUrl = typeof item === 'string' ? getServiceUrl(item) : (item.path || '#');
                  const serviceText = typeof item === 'string' ? item : (item.text || item);
                  
                  return (
                    <Link 
                      key={index} 
                      href={serviceUrl} 
                      className="hover:text-[#B99066] transition-colors block"
                    >
                      {serviceText}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Outils */}
          {footerContent.outils && (
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">{footerContent.outils.title || "Outils"}</h3>
              <div className="space-y-2 text-sm">
                {footerContent.outils.items && footerContent.outils.items.map((item, index) => (
                  typeof item === 'string' ? (
                    <p key={index}>{item}</p>
                  ) : (
                    <Link key={index} href={item.path || "#"} className="hover:text-[#B99066] transition-colors block">
                      {item.text || item}
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}

          {/* À propos */}
          {footerContent.apropos && (
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">{footerContent.apropos.title || "À propos"}</h3>
              <div className="space-y-2 text-sm">
                {footerContent.apropos.items && footerContent.apropos.items.map((item, index) => (
                  <Link key={index} href={item.path || "#"} className="hover:text-[#B99066] transition-colors block">
                    {item.text || item}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Mentions légales */}
          {footerContent.mentionsLegales && (
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-4">{footerContent.mentionsLegales.title || "Mentions légales"}</h3>
              <div className="space-y-2 text-sm">
                {footerContent.mentionsLegales.companyName && (
                  <p className="text-lg font-bold mb-2"><strong>{footerContent.mentionsLegales.companyName}</strong></p>
                )}
                {footerContent.mentionsLegales.legalInfo && (
                  <>
                    {footerContent.mentionsLegales.legalInfo.capital && (
                      <p className="text-sm mb-2">{footerContent.mentionsLegales.legalInfo.capital}</p>
                    )}
                    {footerContent.mentionsLegales.legalInfo.address && (
                      <p>{footerContent.mentionsLegales.legalInfo.address}</p>
                    )}
                    {footerContent.mentionsLegales.legalInfo.siren && (
                      <p>{footerContent.mentionsLegales.legalInfo.siren}</p>
                    )}
                    {footerContent.mentionsLegales.legalInfo.tva && (
                      <p>{footerContent.mentionsLegales.legalInfo.tva}</p>
                    )}
                    {footerContent.mentionsLegales.legalInfo.orias && (
                      <p>
                        {footerContent.mentionsLegales.legalInfo.orias.text}{' '}
                        (<a href={footerContent.mentionsLegales.legalInfo.orias.url} className="hover:text-[#B99066] transition-colors" target="_blank" rel="noopener noreferrer">
                          {footerContent.mentionsLegales.legalInfo.orias.url.replace('https://', '')}
                        </a>){' '}
                        {footerContent.mentionsLegales.legalInfo.orias.description}
                      </p>
                    )}
                    {footerContent.mentionsLegales.legalInfo.anacofi && (
                      <p>{footerContent.mentionsLegales.legalInfo.anacofi}</p>
                    )}
                    {footerContent.mentionsLegales.legalInfo.acpr && (
                      <p>{footerContent.mentionsLegales.legalInfo.acpr}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom section */}
        {footerContent.bottom && (
          <div className="border-t border-white/20 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm">
              {footerContent.bottom.copyright && (
                <div className="mb-4 md:mb-0">
                  <p>{footerContent.bottom.copyright}</p>
                </div>
              )}
              {footerContent.bottom.links && footerContent.bottom.links.length > 0 && (
                <div className="flex space-x-6">
                  {footerContent.bottom.links.map((link, index) => (
                    <Link key={index} href={link.path || "#"} className="hover:text-[#B99066] transition-colors">
                      {link.text || link}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;