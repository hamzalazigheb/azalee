'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import CTAButton from '@/components/ui/CTAButton';
import SchemaMarkup from '@/components/common/SchemaMarkup';

export default function EquipeClient() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    const teamMembers = [
        {
            name: "Jean-Marc Dupont",
            role: "Fondateur & Directeur Associé",
            image: "/images/azalee-patrimoine-jean.webp",
            bio: "Passionné par la finance et l'humain, Jean-Marc a fondé Azalée Patrimoine pour offrir une alternative aux banques privées traditionnelles.",
            diplomas: ["Master 2 Gestion de Patrimoine (Dauphine)", "Diplôme Universitaire Droit Civil"],
            certifications: ["CIF", "Courtier en Assurance (ORIAS)"]
        },
        {
            name: "Sophie Martin",
            role: "Conseillère Senior - Expert Immobilier",
            image: "/images/azalee-patrimoine-sophie.webp",
            bio: "Sophie accompagne nos clients dans la structuration de leur parc immobilier. Sa double compétence technique et fiscale est un atout majeur.",
            diplomas: ["Master Droit de l'Immobilier", "Licence Économie"],
            certifications: ["Carte T (Transaction)", "Certification AM"]
        },
        {
            name: "Thomas Bernard",
            role: "Expert Investissements Financiers",
            image: "/images/azalee-patrimoine-client1.webp",
            bio: "Analyste rigoureux, Thomas sélectionne les fonds les plus performants pour dynamiser votre épargne en maîtrisant les risques.",
            diplomas: ["MSc Finance de Marché", "CFA Level 1"],
            certifications: ["Certification AMF", "CIF"]
        }
    ];

    if (loading) {
        return (
            <div className="w-full bg-white">
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B99066]"></div>
                </div>
                <Footer />
            </div>
        );
    }

    // Générer les Schema Person pour chaque membre de l'équipe
    const personSchemas = teamMembers.map((member) => ({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.bio,
        "image": `https://azalee-patrimoine.fr${member.image}`,
        "worksFor": {
            "@type": "Organization",
            "name": "Azalée Patrimoine"
        },
        "alumniOf": member.diplomas.map(diploma => ({
            "@type": "EducationalOrganization",
            "name": diploma
        })),
        "hasCredential": member.certifications.map(cert => ({
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": cert
        }))
    }));

    return (
        <div className="w-full bg-gray-50">
            <SchemaMarkup schema={personSchemas} id="team-schema" />
            <Header />
            <Breadcrumb />

            {/* Hero Section */}
            <section className="bg-[#253F60] text-white py-20 text-center">
                <div className="max-w-[1368px] mx-auto px-4">
                    <h1 className="text-4xl lg:text-6xl font-cairo font-bold mb-6">Nos Experts</h1>
                    <p className="text-xl max-w-2xl mx-auto text-white/90">
                        Une équipe pluridisciplinaire dédiée à votre réussite patrimoniale.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-20">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {teamMembers.map((member, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col">
                                <div className="relative h-80 overflow-hidden bg-gray-200">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => e.target.src = '/images/azalee-patrimoine-client1.webp'}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#253F60]/90 via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-cairo font-bold text-white mb-1">{member.name}</h3>
                                        <p className="text-[#B99066] font-medium font-inter">{member.role}</p>
                                    </div>
                                </div>

                                <div className="p-8 flex-grow flex flex-col">
                                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                        {member.bio}
                                    </p>

                                    {/* Diplomas & Certifs */}
                                    <div className="space-y-4 border-t border-gray-100 pt-6">
                                        <div>
                                            <h4 className="text-xs font-bold text-[#253F60] uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                                Diplômes
                                            </h4>
                                            <ul className="text-sm text-gray-500 space-y-1 ml-6">
                                                {member.diplomas.map((d, i) => <li key={i}>• {d}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-[#253F60] uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Certifications
                                            </h4>
                                            <div className="flex flex-wrap gap-2 ml-6">
                                                {member.certifications.map((c, i) => (
                                                    <span key={i} className="bg-[#B99066]/10 text-[#B99066] px-2 py-1 rounded text-xs font-semibold">
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Bottom */}
            <section className="bg-white py-16 text-center">
                <h2 className="text-3xl font-cairo font-bold text-[#253F60] mb-6">Un projet ? Une question ?</h2>
                <div className="flex justify-center gap-4">
                    <CTAButton externalUrl="https://calendly.com/rdv-azalee-patrimoine/30min" variant="primary">Planifiez votre consultation gratuite</CTAButton>
                    <CTAButton href="/contact" variant="outline">Nous contacter</CTAButton>
                </div>
            </section>

            <Footer />
        </div>
    );
}
