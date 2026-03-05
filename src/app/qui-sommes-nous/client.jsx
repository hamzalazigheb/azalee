'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import CTAButton from '@/components/ui/CTAButton';

export default function QuiSommesNousClient() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for smoothness
        setTimeout(() => setLoading(false), 500);
    }, []);

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

    return (
        <div className="w-full bg-white">
            <Header />
            <Breadcrumb />

            {/* Hero Section - Premium Standard */}
            <section className="relative w-full py-20 lg:py-32 bg-[#253F60] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a2d47] to-[#253F60]"></div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B99066]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#4EBBBD]/5 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-cairo font-bold mb-6 tracking-tight">
                        Notre Histoire & <span className="text-[#B99066]">Vision</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl font-inter text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Depuis plus de 20 ans, Azalée Patrimoine réinvente la gestion de patrimoine avec une approche humaine, experte et indépendante.
                    </p>
                </div>
            </section>

            {/* Histoire - Timeline Concept */}
            <section className="py-20 bg-white">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-[#B99066] font-bold tracking-wider uppercase text-sm mb-2 block">Origines</span>
                            <h2 className="text-3xl lg:text-4xl font-cairo font-bold text-[#253F60]">D'une conviction à une référence</h2>
                            <div className="w-24 h-1 bg-[#B99066] mx-auto mt-6 rounded-full"></div>
                        </div>

                        <div className="grid gap-12 relative border-l-2 border-[#E5E7EB] ml-4 md:ml-0 md:border-none">
                            {/* Item 1 */}
                            <div className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center">
                                <div className="hidden md:block text-right">
                                    <span className="text-5xl font-bold text-[#E5E7EB]">1996</span>
                                </div>
                                <div className="absolute top-0 left-0 transform -translate-x-1/2 md:left-1/2 md:translate-x-[-50%] w-4 h-4 bg-[#B99066] rounded-full border-4 border-white shadow-md mt-2 md:mt-0"></div>
                                <div className="pl-8 md:pl-0">
                                    <div className="md:hidden mb-2">
                                        <span className="text-4xl font-bold text-[#E5E7EB]">1996</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#253F60] mb-2">La Genèse</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Création du cabinet avec une ambition simple : rendre la gestion de patrimoine accessible et transparente. Loin des standards bancaires impersonnels, nous avons misé sur la proximité.
                                    </p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center">
                                <div className="pl-8 md:pl-0 md:text-right order-1">
                                    <div className="md:hidden mb-2">
                                        <span className="text-4xl font-bold text-[#E5E7EB]">2010</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#253F60] mb-2">L'Expansion</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        L'équipe s'agrandit avec l'arrivée d'experts en droit fiscal et immobilier. Notre offre devient globale, couvrant tous les aspects de la vie patrimoniale.
                                    </p>
                                </div>
                                <div className="absolute top-0 left-0 transform -translate-x-1/2 md:left-1/2 md:translate-x-[-50%] w-4 h-4 bg-[#253F60] rounded-full border-4 border-white shadow-md mt-2 md:mt-0"></div>
                                <div className="hidden md:block order-2">
                                    <span className="text-5xl font-bold text-[#E5E7EB]">2010</span>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center">
                                <div className="hidden md:block text-right">
                                    <span className="text-5xl font-bold text-[#E5E7EB]">2024</span>
                                </div>
                                <div className="absolute top-0 left-0 transform -translate-x-1/2 md:left-1/2 md:translate-x-[-50%] w-4 h-4 bg-[#B99066] rounded-full border-4 border-white shadow-md mt-2 md:mt-0"></div>
                                <div className="pl-8 md:pl-0">
                                    <div className="md:hidden mb-2">
                                        <span className="text-4xl font-bold text-[#E5E7EB]">2024</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#253F60] mb-2">Azalée Patrimoine</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Aujourd'hui, nous accompagnons plus de 400 familles avec la même passion. Notre nom change, mais nos valeurs d'excellence et d'indépendance restent notre boussole.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-[#F9FAFB]">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-cairo font-bold text-[#253F60]">Notre Mission</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Au-delà des chiffres, notre mission est de vous apporter sérénité et clarté dans vos choix de vie.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Protéger", desc: "Sécuriser vos acquis et votre famille contre les aléas de la vie.", icon: "🛡️" },
                            { title: "Valoriser", desc: "Faire fructifier votre capital avec des stratégies performantes et maîtrisées.", icon: "📈" },
                            { title: "Transmettre", desc: "Préparer l'avenir de vos proches dans les meilleures conditions fiscales.", icon: "🌱" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#B99066] hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <h3 className="text-xl font-bold text-[#253F60] mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Valeurs */}
            <section className="py-20 bg-[#253F60] text-white">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl lg:text-4xl font-cairo font-bold mb-6">Nos Valeurs Fondatrices</h2>
                            <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                L'intégrité n'est pas une option, c'est notre fondation. Dans un monde financier complexe, nous sommes votre point de repère stable et fiable.
                            </p>
                            <CTAButton href="/equipe" variant="primary">Rencontrer l'équipe</CTAButton>
                        </div>
                        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Indépendance", desc: "Aucun produit imposé, liberté totale de conseil." },
                                { title: "Transparence", desc: "Des frais clairs, aucune ligne cachée." },
                                { title: "Expertise", desc: "Une formation continue pour une précision absolue." },
                                { title: "Disponibilité", desc: "Un interlocuteur unique qui vous connaît vraiment." }
                            ].map((val, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                                    <h3 className="text-[#B99066] font-bold text-lg mb-2">{val.title}</h3>
                                    <p className="text-sm text-white/90">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
