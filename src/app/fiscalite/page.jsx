"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/common/Footer";
import VignetteRetraites from "../../components/fiscalite/VignetteRetraites";
import VignetteProfessionnels from "../../components/fiscalite/VignetteProfessionnels";
import VignetteInvestisseurImmobilier from "../../components/fiscalite/VignetteInvestisseurImmobilier";
import VignetteHeritier from "../../components/fiscalite/VignetteHeritier";
import { processHTMLForRender } from "../../lib/utils/htmlConverter";
import SchemaMarkup from "../../components/common/SchemaMarkup";

export default function FiscalitePage() {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [openQuestion, setOpenQuestion] = useState(null);
    const [hoveredProfil, setHoveredProfil] = useState(null);
    const [profilTimeoutId, setProfilTimeoutId] = useState(null);
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const [iconTimeoutId, setIconTimeoutId] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`/api/cms/content?path=fiscalite&t=${Date.now()}`, {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.data) {
                        setContent(data.data);
                    } else if (data.content) {
                        setContent(data.content);
                    } else {
                        setContent({});
                    }
                } else {
                    console.error('Failed to fetch content');
                    setContent({});
                }
            } catch (error) {
                console.error("Failed to fetch fiscalite page content:", error);
                setContent({});
            } finally {
                setLoading(false);
            }
        };

        fetchContent();

        // Listen for CMS content updates
        const handleCMSUpdate = (event) => {
            const updatedPath = event.detail?.path?.toLowerCase();
            if (!updatedPath || updatedPath === 'fiscalite') {
                console.log('🔄 CMS content updated, refreshing fiscalite page...', updatedPath);
                fetchContent();
            }
        };

        window.addEventListener('cmsContentUpdated', handleCMSUpdate);

        // Polling fallback: check for updates every 10 seconds when page is visible
        const pollInterval = setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchContent();
            }
        }, 10000);

        return () => {
            window.removeEventListener('cmsContentUpdated', handleCMSUpdate);
            clearInterval(pollInterval);
        };
    }, []);

    if (loading) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#253F60]"></div>
                </div>
                <Footer />
            </>
        );
    }

    // Use CMS content with fallback
    const pageContent = content || {};

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const handleProfilMouseEnter = (profilType) => {
        if (profilTimeoutId) {
            clearTimeout(profilTimeoutId);
            setProfilTimeoutId(null);
        }
        setHoveredProfil(profilType);
    };

    const handleProfilMouseLeave = () => {
        const id = setTimeout(() => {
            setHoveredProfil(null);
        }, 200);
        setProfilTimeoutId(id);
    };

    // Générer le Schema FAQPage pour SEO
    const faqSchema = pageContent.faq?.questions && pageContent.faq.questions.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pageContent.faq.questions.map((faqItem) => ({
            "@type": "Question",
            "name": faqItem.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": typeof faqItem.answer === 'string'
                    ? faqItem.answer.replace(/<[^>]*>/g, '') // Strip HTML tags for schema
                    : String(faqItem.answer)
            }
        }))
    } : null;

    return (
        <>
            {faqSchema && <SchemaMarkup schema={faqSchema} id="faq-schema" />}
            {/* Hero Section - Deux cartes */}
            <section className="relative w-full min-h-[650px] bg-gradient-to-r from-[#253F60] to-[#B99066] py-20 sm:py-24 lg:py-32">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                        {/* Carte gauche */}
                        <div className="bg-white rounded-xl shadow-md p-8 sm:p-10 lg:p-12 border border-gray-100">
                            <h1 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8 tracking-tight">
                                {pageContent.hero?.leftCard?.h1 || "Optimiser votre fiscalité en 2025 pour mieux valoriser votre patrimoine"}
                            </h1>

                            <div className="space-y-5 mb-10">
                                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed">
                                    {pageContent.hero?.leftCard?.description1 || "La fiscalité influence directement la rentabilité de vos investissements et la transmission de votre patrimoine. Comprendre les mécanismes de l'impôt, maîtriser les déductions et utiliser les bons dispositifs vous permet de transformer la fiscalité en levier de croissance."}
                                </p>

                                <p className="text-[#4B5563] text-base sm:text-lg lg:text-xl font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(pageContent.hero?.leftCard?.description2 || "<strong className=\"text-[#253F60] font-semibold\">Azalée Patrimoine</strong> vous accompagne pour bâtir une stratégie fiscale cohérente, durable et adaptée à votre profil.") }} />
                            </div>

                            <div className="mt-10">
                                <button
                                    onClick={() => window.open(pageContent.hero?.leftCard?.ctaLink || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                                    className="bg-[#253F60] text-white px-10 py-4 rounded-lg shadow-lg font-inter font-semibold text-base lg:text-lg hover:bg-[#1a2d47] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    {pageContent.hero?.leftCard?.ctaButton || "Je prends ma fiscalité en main maintenant"}
                                </button>
                            </div>
                        </div>

                        {/* Carte droite */}
                        <div className="relative bg-white rounded-xl shadow-md p-8 sm:p-10 lg:p-12 border border-gray-100">
                            {/* Bulle de discours avec économie */}
                            {pageContent.hero?.rightCard?.bubble && (
                                <div className="absolute -top-6 -right-6 w-48 h-32 sm:w-56 sm:h-36 bg-white rounded-2xl shadow-xl border-2 border-[#B99066] flex items-center justify-center z-20">
                                    <div className="text-center px-4">
                                        <p className="text-[#253F60] font-cairo font-bold text-lg sm:text-xl">
                                            Jusqu'à <span className="text-[#B99066] text-2xl sm:text-3xl">{pageContent.hero.rightCard.bubble.amount || "66 768€"}</span>
                                        </p>
                                        <p className="text-[#4B5563] font-inter text-sm sm:text-base">{pageContent.hero.rightCard.bubble.text || "d'économie d'impôts"}</p>
                                    </div>
                                    {/* Flèche pointant vers le bas */}
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#B99066]"></div>
                                    </div>
                                </div>
                            )}

                            <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold leading-tight mb-8 tracking-tight pr-32">
                                {(pageContent.hero?.rightCard?.h2 || ["Je choisis", "La meilleure stratégie", "Pour réduire mes impôts"]).map((line, index) => (
                                    <span key={index} className="block">{line}</span>
                                ))}
                            </h2>

                            {/* Liste à puces avec checkmarks */}
                            <ul className="space-y-5">
                                {(pageContent.hero?.rightCard?.benefits || [
                                    "Optimisations immobilières, financières et déclaratives",
                                    "Jusqu'à 10 700 € de déficit foncier imputable/an",
                                    "Jusqu'à 45 % de mon investissement déductible de ma base imposable atteignant presque 67 000€ de baisse d'impôt",
                                    "Approche 100 % personnalisée"
                                ]).map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <svg className="w-6 h-6 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-[#374151] text-base sm:text-lg font-inter font-medium" dangerouslySetInnerHTML={{ __html: benefit }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section L'essentiel */}
            <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative pl-6 sm:pl-8">
                        {/* Ligne verticale bleu azalée à gauche - plus épaisse et visible */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#253F60] rounded-full"></div>

                        {/* En-tête avec icône et titre */}
                        <div className="flex items-center gap-4 mb-10 sm:mb-12">
                            {/* Icône cible avec flèche intégrée */}
                            <div className="relative flex-shrink-0">
                                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                    {/* Cible */}
                                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="5" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                    {/* Flèche pointant vers la droite */}
                                    <path d="M18 12L15 9M18 12L15 15M18 12H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold italic">
                                L'essentiel
                            </h2>
                        </div>

                        {/* Liste à puces avec cercles or azalée */}
                        <ul className="space-y-6 sm:space-y-8">
                            {(pageContent.essentiel?.items || []).map((item, index) => (
                                <li key={index} className="flex items-start gap-5">
                                    <div className="mt-2.5 flex-shrink-0 w-4 h-4 bg-[#B99066] rounded-full shadow-sm"></div>
                                    {item.subItems ? (
                                        <div className="flex-1 pt-0.5">
                                            <p className="text-[#374151] text-base sm:text-lg lg:text-xl font-inter leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processHTMLForRender(item.text) }} />
                                            <ul className="space-y-3 ml-4 sm:ml-6">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="text-[#374151] text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(subItem) }} />
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="text-[#374151] text-base sm:text-lg lg:text-xl font-inter leading-relaxed pt-0.5" dangerouslySetInnerHTML={{ __html: processHTMLForRender(item.text) }} />
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Note de conclusion */}
                        {pageContent.essentiel?.note && (
                            <div className="mt-8 bg-[#F5F0E8] border-l-4 border-[#B99066] p-4 rounded">
                                <p className="text-[#4B5563] text-sm font-inter italic">
                                    {pageContent.essentiel.note}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Section Comprendre l'impôt sur le revenu */}
            <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        {/* En-tête */}
                        <div className="text-center mb-12">
                            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                                {pageContent.comprendreIR?.h2 || "Comprendre l'impôt sur le revenu"}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] mx-auto mb-8"></div>
                        </div>

                        {/* Carte principale avec contenu */}
                        <div className="bg-white rounded-2xl shadow-md border-2 border-[#E5E7EB] overflow-hidden">
                            <div className="p-8 sm:p-10 lg:p-12">
                                <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-8 flex items-center gap-4">
                                    <div className="w-1 h-12 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
                                    <span>{pageContent.comprendreIR?.h3 || "Comment fonctionne l'impôt en France"}</span>
                                </h3>

                                <div className="space-y-6">
                                    {(pageContent.comprendreIR?.paragraphs || [
                                        "En France, l'impôt sur le revenu est prélevé sur l'ensemble des revenus perçus par un foyer fiscal au cours de l'année civile. Il s'applique de façon progressive : plus vos revenus sont élevés, plus le taux d'imposition applicable à chaque \"tranche\" de revenus augmente. Ce système vise l'équité fiscale, tout en incitant à la structuration de votre stratégie patrimoniale.",
                                        "L'impôt sur le revenu joue un rôle déterminant dans la gestion et la valorisation de votre patrimoine. Avant même de songer à l'optimisation fiscale, il est essentiel de bien comprendre son fonctionnement pour faire les bons choix et saisir toutes les opportunités offertes par la législation."
                                    ]).map((paragraph, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="mt-2 flex-shrink-0">
                                                <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                                            </div>
                                            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed flex-1">
                                                {paragraph}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Encadré informatif en bas */}
                            <div className="bg-gradient-to-r from-[#253F60]/5 to-[#B99066]/5 border-t-2 border-[#B99066]/20 p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[#253F60] font-inter font-semibold text-sm sm:text-base mb-2">
                                            💡 À retenir
                                        </p>
                                        <p className="text-[#4B5563] text-sm sm:text-base font-inter leading-relaxed">
                                            Une bonne compréhension du système fiscal français est la base d'une stratégie patrimoniale efficace et optimisée.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Les différentes catégories de revenus */}
            <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mb-10">
                        <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-6">
                            {pageContent.categoriesRevenus?.h3 || "Les différentes catégories de revenus"}
                        </h3>

                        <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-10">
                            {pageContent.categoriesRevenus?.intro || "Vos revenus sont classés en plusieurs catégories, chacune répondant à des règles spécifiques."}
                        </p>
                    </div>

                    {/* Grille 2x2 des catégories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
                        {(pageContent.categoriesRevenus?.categories || []).map((category, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-2 border-gray-200">
                                <h4 className={`${index === 1 ? 'text-[#B99066]' : 'text-[#253F60]'} text-lg sm:text-xl font-cairo font-bold mb-5`}>
                                    {category.title}
                                </h4>
                                <ul className="space-y-3">
                                    {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-[#B99066] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[#4B5563] text-base font-inter">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Texte de conclusion */}
                    {pageContent.categoriesRevenus?.conclusion && (
                        <div className="max-w-4xl mt-8">
                            <p className="text-[#4B5563] text-sm sm:text-base font-inter leading-relaxed italic">
                                {pageContent.categoriesRevenus.conclusion}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Section Barème, tranches, décote et quotient familial */}
            <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Colonne gauche - Texte */}
                        <div>
                            <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-8 bg-[#F5F0E8] inline-block px-4 py-2 rounded-lg">
                                {pageContent.bareme?.h3 || "Barème, tranches, décote et quotient familial"}
                            </h3>

                            <div className="space-y-6">
                                {(pageContent.bareme?.paragraphs || [
                                    "L'imposition repose sur un <strong className=\"text-[#253F60] font-semibold\">barème progressif</strong> comportant plusieurs tranches : à chaque \"part\" du foyer fiscal, un taux s'applique selon le revenu déclaré. Plus vous avez de parts (enfants, conjoint), plus votre revenu imposable par part diminue, grâce au <strong className=\"text-[#253F60] font-semibold\">quotient familial</strong>.",
                                    "La <strong className=\"text-[#253F60] font-semibold\">décote</strong> vient réduire l'impôt des foyers faiblement imposés. À l'inverse, pour les revenus les plus élevés, des contributions additionnelles peuvent s'appliquer, renforçant l'importance de bien organiser la déclaration et le choix des dispositifs fiscaux adaptés à votre profil.",
                                    "Bien comprendre ces fondamentaux permet de saisir le potentiel d'optimisation offert par le système français, de la réduction d'impôt via l'<strong className=\"text-[#253F60] font-semibold\">investissement immobilier (Pinel, Girardin...)</strong> à l'ajustement des frais réels ou à la mise en place de <strong className=\"text-[#253F60] font-semibold\">donations stratégiques</strong>."
                                ]).map((paragraph, index) => (
                                    <p key={index} className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(paragraph) }} />
                                ))}
                            </div>

                            {/* Section Déclarer efficacement ses revenus - Dans la colonne gauche */}
                            <div className="mt-12">
                                <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                                    {pageContent.declarer?.h2 || "Déclarer efficacement ses revenus"}
                                </h2>

                                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
                                    {pageContent.declarer?.intro || "Déclarer ses revenus de manière rigoureuse est une étape clé pour éviter tout redressement fiscal et optimiser le montant de son impôt."}
                                </p>

                                {/* Ligne de séparation */}
                                <div className="w-full h-px bg-gray-300 mb-10"></div>

                                <h3 className="text-[#253F60] text-xl sm:text-2xl lg:text-3xl font-cairo font-semibold mb-8">
                                    {pageContent.declarer?.h3 || "Quand et comment déclarer ?"}
                                </h3>

                                {/* Deux boîtes côte à côte */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    {(pageContent.declarer?.boxes || [
                                        { title: "Période de déclaration", link: "/fiscalite/declaration-impots" },
                                        { title: "www.impots.gouv.fr", link: "https://www.impots.gouv.fr" }
                                    ]).map((box, index) => (
                                        <a
                                            key={index}
                                            href={box.link || (index === 0 ? "/fiscalite/declaration-impots" : "https://www.impots.gouv.fr")}
                                            target={index === 1 ? "_blank" : undefined}
                                            rel={index === 1 ? "noopener noreferrer" : undefined}
                                            className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-[#B99066] hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[120px] cursor-pointer"
                                        >
                                            <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] text-white rounded-lg px-6 py-4 text-center w-full shadow-md hover:shadow-lg transition-shadow">
                                                <p className="text-lg sm:text-xl font-cairo font-bold">
                                                    {box.title}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Section Profiter des dispositifs fiscaux */}
                            <div className="mt-12">
                                <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                                    {pageContent.dispositifs?.h2 || "Profiter des dispositifs fiscaux"}
                                </h2>

                                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
                                    {pageContent.dispositifs?.intro || "La fiscalité française regorge de \"niches\" permettant de réduire son impôt tout en investissant dans des actifs porteurs."}
                                </p>

                                {/* Bouton CTA */}
                                {pageContent.dispositifs?.ctaButton && (
                                    <div className="mb-12 text-center">
                                        <button
                                            onClick={() => window.open(pageContent.dispositifs?.ctaLink || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                                            className="bg-[#253F60] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-base lg:text-lg hover:bg-[#1a2d47] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                        >
                                            {pageContent.dispositifs.ctaButton}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Colonne droite - Infographie */}
                        <div className="lg:sticky lg:top-8">
                            {/* Image de l'infographie */}
                            <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
                                <img
                                    src={pageContent.bareme?.infographie?.image || "/images/azalee-patrimoine-i6644.webp"}
                                    alt={pageContent.bareme?.infographie?.imageAlt || "Barème de l'impôt sur le revenu 2025 - Tranches et taux d'imposition"}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Les dispositifs de défiscalisation immobilière */}
            <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold text-center mb-12">
                        {pageContent.defiscalisation?.h2 || "Les dispositifs de défiscalisation immobilière"}
                    </h2>

                    {/* Grille 3x2 des dispositifs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                        {(pageContent.defiscalisation?.dispositifs || []).map((dispositif, index) => (
                            <Link key={index} href={dispositif.link || "/fiscalite"} className="group bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-[#B99066] hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24">
                                        <defs>
                                            <linearGradient id={`${dispositif.name?.toLowerCase().replace(/\s+/g, '-')}-gradient`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#253F60" />
                                                <stop offset="100%" stopColor="#B99066" />
                                            </linearGradient>
                                        </defs>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="url(#pinel-gradient)" fill="none" />
                                    </svg>
                                </div>
                                <h4 className="text-[#253F60] text-lg font-cairo font-bold mb-3 text-center">{dispositif.name}</h4>
                                <p className="text-[#4B5563] text-sm font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: dispositif.description }} />
                            </Link>
                        ))}
                    </div>

                    {/* Boutons CTA */}
                    {pageContent.defiscalisation?.ctas && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {pageContent.defiscalisation.ctas.map((cta, index) => (
                                index === 0 ? (
                                    <button
                                        key={index}
                                        onClick={() => window.open(cta.link || 'https://calendly.com/rdv-azalee-patrimoine/30min', '_blank')}
                                        className="bg-[#253F60] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-base hover:bg-[#1a2d47] hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                                    >
                                        {cta.text}
                                    </button>
                                ) : (
                                    <Link
                                        key={index}
                                        href={cta.link || "https://calendly.com/rdv-azalee-patrimoine/30min"}
                                        className="bg-white text-[#253F60] px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-base border-2 border-[#253F60] hover:bg-gray-50 hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-center"
                                    >
                                        {cta.text}
                                    </Link>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Section Les erreurs fréquentes à éviter */}
            <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        {/* En-tête */}
                        <div className="text-center mb-12">
                            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                                {pageContent.erreurs?.h2 || "Les erreurs fréquentes à éviter"}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] mx-auto mb-8"></div>
                        </div>

                        {/* Carte principale avec contenu */}
                        <div className="bg-white rounded-2xl shadow-md border-2 border-[#E5E7EB] overflow-hidden">
                            <div className="p-8 sm:p-10 lg:p-12">
                                {/* Liste à puces améliorée */}
                                <ul className="space-y-6 mb-8">
                                    {(pageContent.erreurs?.errors || []).map((error, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="mt-2 flex-shrink-0">
                                                <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                                            </div>
                                            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed flex-1">
                                                {error}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                {/* Section Astuce améliorée */}
                                {pageContent.erreurs?.astuce && (
                                    <div className="bg-gradient-to-r from-[#253F60]/5 to-[#B99066]/5 border-l-4 border-[#B99066] p-6 sm:p-8 rounded-lg mt-8">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 mt-1">
                                                <svg className="w-6 h-6 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[#253F60] font-inter font-semibold text-base sm:text-lg mb-2">
                                                    {pageContent.erreurs.astuce.title || "Astuce"}
                                                </p>
                                                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                                                    {pageContent.erreurs.astuce.text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Optimiser sa fiscalité selon son profil */}
            <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl">
                        <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                            {pageContent.profils?.h2 || "Optimiser sa fiscalité selon son profil"}
                        </h2>

                        <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-12">
                            {pageContent.profils?.intro || "Adopter les bons réflexes et dispositifs en fonction de votre situation permet de transformer l'impôt en véritable levier patrimonial."}
                        </p>

                        <div className="space-y-10">
                            {/* Profil 1: Investisseur immobilier - Avec vignette au survol */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleProfilMouseEnter('investisseur')}
                                onMouseLeave={handleProfilMouseLeave}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Carte profil */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-gray-200 hover:border-[#B99066] transition-colors">
                                        <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                                            {pageContent.profils?.profils?.[0]?.title || "Investisseur immobilier"}
                                        </h3>
                                        <ul className="space-y-4">
                                            {(pageContent.profils?.profils?.[0]?.points || [
                                                "Priorisez les dispositifs adaptés à vos objectifs : Pinel et Denormandie si vous ciblez la réduction d'impôt ; Malraux ou Monuments Historiques pour les amateurs de rénovation de prestige.",
                                                "Optimisez vos revenus fonciers : analysez l'intérêt du régime réel pour déduire au maximum vos charges."
                                            ]).map((point, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="mt-2 flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full"></div>
                                                    <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Vignette au survol */}
                                    <div className={`${hoveredProfil === 'investisseur' ? 'block' : 'hidden'} transition-opacity duration-300`}>
                                        <VignetteInvestisseurImmobilier />
                                    </div>
                                </div>
                            </div>

                            {/* Profil 2: Retraité avec revenus passifs - Avec vignette au survol */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleProfilMouseEnter('retraite')}
                                onMouseLeave={handleProfilMouseLeave}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Carte profil */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-gray-200 hover:border-[#B99066] transition-colors">
                                        <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                                            {pageContent.profils?.profils?.[1]?.title || "Retraité avec revenus passifs"}
                                        </h3>
                                        <ul className="space-y-4">
                                            {(pageContent.profils?.profils?.[1]?.points || [
                                                "Choisissez le bon mode d'imposition de vos rentes, revenus locatifs et placements : arbitrage entre flat tax et barème progressif, adaptation de votre portefeuille pour réduire la fiscalité sur les dividendes.",
                                                "Pensez à la transmission : donations graduelles, souscription de contrats d'assurance-vie optimisés pour la succession."
                                            ]).map((point, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="mt-2 flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full"></div>
                                                    <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Vignette au survol */}
                                    <div className={`${hoveredProfil === 'retraite' ? 'block' : 'hidden'} transition-opacity duration-300`}>
                                        <VignetteRetraites />
                                    </div>
                                </div>
                            </div>

                            {/* Profil 3: Profession libérale / chef d'entreprise - Avec vignette au survol */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleProfilMouseEnter('professionnel')}
                                onMouseLeave={handleProfilMouseLeave}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Carte profil */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-gray-200 hover:border-[#B99066] transition-colors">
                                        <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                                            {pageContent.profils?.profils?.[2]?.title || "Profession libérale / chef d'entreprise"}
                                        </h3>
                                        <ul className="space-y-4">
                                            {(pageContent.profils?.profils?.[2]?.points || [
                                                "Profitez des dispositifs de retraite complémentaire (PER, Madelin) pour déduire des versements tout en capitalisant pour l'avenir.",
                                                "Valorisez la cession progressive de votre entreprise pour bénéficier d'abattements spécifiques, ou réorganisez la détention de vos actifs via des sociétés civiles."
                                            ]).map((point, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="mt-2 flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full"></div>
                                                    <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Vignette au survol */}
                                    <div className={`${hoveredProfil === 'professionnel' ? 'block' : 'hidden'} transition-opacity duration-300`}>
                                        <VignetteProfessionnels />
                                    </div>
                                </div>
                            </div>

                            {/* Profil 4: Héritier d'un patrimoine - Avec vignette au survol */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleProfilMouseEnter('heritier')}
                                onMouseLeave={handleProfilMouseLeave}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Carte profil */}
                                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border-2 border-gray-200 hover:border-[#B99066] transition-colors">
                                        <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6">
                                            {pageContent.profils?.profils?.[3]?.title || "Héritier d'un patrimoine"}
                                        </h3>
                                        <ul className="space-y-4">
                                            {(pageContent.profils?.profils?.[3]?.points || [
                                                "Anticipez les droits de succession : donations échelonnées, démembrement de propriété, utilisation des abattements familiaux, investissement dans des actifs défiscalisés.",
                                                "Optimisez la gestion des biens transmis : Favorisez les outils juridiques permettant d'adapter la détention du patrimoine à votre situation personnelle et fiscale."
                                            ]).map((point, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="mt-2 flex-shrink-0 w-2 h-2 bg-[#B99066] rounded-full"></div>
                                                    <p className="text-[#4B5563] text-base font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Vignette au survol */}
                                    <div className={`${hoveredProfil === 'heritier' ? 'block' : 'hidden'} transition-opacity duration-300`}>
                                        <VignetteHeritier />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Paragraphe de conclusion */}
                        {pageContent.profils?.conclusion && (
                            <div className="mt-12 bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl shadow-lg p-6 sm:p-8 text-white">
                                <p className="text-base sm:text-lg font-inter leading-relaxed text-center">
                                    {pageContent.profils.conclusion}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Section Conseils de l'expert Azalée Patrimoine */}
            <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        {/* En-tête */}
                        <div className="text-center mb-12">
                            <h2 className="text-[#253F60] text-3xl sm:text-4xl lg:text-5xl font-cairo font-bold mb-4">
                                {pageContent.conseilsExpert?.h2 || "Conseils de l'expert Azalée Patrimoine"}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#253F60] to-[#B99066] mx-auto mb-8"></div>
                        </div>

                        {/* Carte principale avec contenu */}
                        <div className="bg-white rounded-2xl shadow-md border-2 border-[#E5E7EB] overflow-hidden mb-8">
                            <div className="p-8 sm:p-10 lg:p-12">
                                <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-8 flex items-center gap-4">
                                    <div className="w-1 h-12 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
                                    <span>{pageContent.conseilsExpert?.h3 || "Pourquoi travailler avec un Conseiller en Gestion de Patrimoine (CGP) ?"}</span>
                                </h3>

                                <div className="space-y-6">
                                    {(pageContent.conseilsExpert?.paragraphs || [
                                        "Faire appel à un CGP permet de transformer la complexité fiscale et patrimoniale en véritables leviers pour atteindre vos objectifs de vie.",
                                        "Un CGP ne se limite pas à vous vendre des solutions : il vous accompagne dans la durée, en toute indépendance, avec une vue globale sur votre situation et en tenant compte de l'évolution permanente des dispositifs fiscaux."
                                    ]).map((paragraph, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="mt-2 flex-shrink-0">
                                                <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                                            </div>
                                            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed flex-1">
                                                {paragraph}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Grille Avantages / Inconvénients */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Avantages */}
                            {pageContent.conseilsExpert?.avantages && (
                                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-2 border-[#B99066]">
                                    <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 flex items-center gap-3">
                                        <svg className="w-6 h-6 text-[#B99066]" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {pageContent.conseilsExpert.avantages.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {(pageContent.conseilsExpert.avantages.items || []).map((item, index) => (
                                            <li key={index} className="flex items-start gap-4">
                                                <div className="mt-2 flex-shrink-0">
                                                    <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                                                </div>
                                                <p className="text-[#4B5563] text-base font-inter leading-relaxed flex-1">
                                                    {item}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Inconvénients */}
                            {pageContent.conseilsExpert?.inconvenients && (
                                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-2 border-[#253F60]">
                                    <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold mb-6 flex items-center gap-3">
                                        <svg className="w-6 h-6 text-[#253F60]" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        {pageContent.conseilsExpert.inconvenients.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {(pageContent.conseilsExpert.inconvenients.items || []).map((item, index) => (
                                            <li key={index} className="flex items-start gap-4">
                                                <div className="mt-2 flex-shrink-0">
                                                    <div className="w-2 h-2 bg-[#253F60] rounded-full"></div>
                                                </div>
                                                <p className="text-[#4B5563] text-base font-inter leading-relaxed flex-1">
                                                    {item}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Astuce */}
                        {pageContent.conseilsExpert?.astuce && (
                            <div className="bg-gradient-to-r from-[#253F60]/5 to-[#B99066]/5 border-l-4 border-[#B99066] p-6 sm:p-8 rounded-lg mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[#253F60] text-lg sm:text-xl font-cairo font-bold mb-4">{pageContent.conseilsExpert.astuce.title || "Astuce"}</h3>
                                        <ul className="space-y-3">
                                            {(pageContent.conseilsExpert.astuce.items || []).map((item, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="mt-2 flex-shrink-0">
                                                        <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                                                    </div>
                                                    <p className="text-[#4B5563] text-base font-inter leading-relaxed flex-1">
                                                        {item}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Audit fiscal personnalisé */}
                        {pageContent.conseilsExpert?.auditFiscal && (
                            <div className="bg-white rounded-2xl shadow-md border-2 border-[#E5E7EB] p-8 sm:p-10 lg:p-12 mb-8">
                                <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6 flex items-center gap-4">
                                    <div className="w-1 h-12 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
                                    <span>{pageContent.conseilsExpert.auditFiscal.title}</span>
                                </h3>
                                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed">
                                    {pageContent.conseilsExpert.auditFiscal.description}
                                </p>
                            </div>
                        )}

                        {/* Le CGP réalise un diagnostic complet */}
                        {pageContent.conseilsExpert?.diagnostic && (
                            <div className="bg-white rounded-2xl shadow-md border-2 border-[#E5E7EB] p-8 sm:p-10 lg:p-12 mb-8">
                                <h2 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-8 flex items-center gap-4">
                                    <div className="w-1 h-12 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
                                    <span>{pageContent.conseilsExpert.diagnostic.h2}</span>
                                </h2>
                                <ul className="space-y-5">
                                    {(pageContent.conseilsExpert.diagnostic.items || []).map((item, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="mt-2 flex-shrink-0">
                                                <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                                            </div>
                                            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed flex-1" dangerouslySetInnerHTML={{ __html: item }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Accompagnement sur mesure */}
                        {pageContent.conseilsExpert?.accompagnement && (
                            <div className="bg-white rounded-2xl shadow-md border-2 border-[#E5E7EB] p-8 sm:p-10 lg:p-12 mb-8">
                                <h3 className="text-[#253F60] text-2xl sm:text-3xl font-cairo font-bold mb-6 flex items-center gap-4">
                                    <div className="w-1 h-12 bg-gradient-to-b from-[#253F60] to-[#B99066] rounded-full"></div>
                                    <span>{pageContent.conseilsExpert.accompagnement.title}</span>
                                </h3>
                                <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed mb-8">
                                    {pageContent.conseilsExpert.accompagnement.intro}
                                </p>
                                <ul className="space-y-5">
                                    {(pageContent.conseilsExpert.accompagnement.items || []).map((item, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="mt-2 flex-shrink-0">
                                                <div className="w-2 h-2 bg-[#B99066] rounded-full"></div>
                                            </div>
                                            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed flex-1">
                                                {item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Paragraphe de conclusion */}
                        {pageContent.conseilsExpert?.accompagnement?.conclusion && (
                            <div className="bg-gradient-to-r from-[#253F60] to-[#B99066] rounded-xl shadow-lg p-6 sm:p-8 text-white">
                                <p className="text-base sm:text-lg font-inter leading-relaxed">
                                    {pageContent.conseilsExpert.accompagnement.conclusion}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Section L'expertise Azalée Patrimoine à votre service */}
            <section className="w-full bg-[#253F60] py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-[#B99066] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-6">
                            {pageContent.expertise?.h2 || "L'expertise Azalée Patrimoine à votre service"}
                        </h2>
                        <p className="text-white text-base sm:text-lg font-inter leading-relaxed max-w-3xl mx-auto">
                            {pageContent.expertise?.intro || "Faire appel à un Conseiller en Gestion de Patrimoine (CGP) indépendant représente un investissement stratégique pour optimiser durablement votre situation fiscale et patrimoniale. Notre approche holistique dépasse la simple recherche de réduction d'impôt pour construire une véritable stratégie patrimoniale cohérente."}
                        </p>
                    </div>

                    {/* Diagramme circulaire segmenté (Donut Chart) */}
                    <div className="relative mb-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative w-full aspect-square max-w-[600px] mx-auto mb-12">
                                {/* Donut Chart SVG avec 4 segments */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                                    <defs>
                                        <marker id="arrowhead-gold" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto">
                                            <polygon points="0 0, 12 4, 0 8" fill="#B99066" />
                                        </marker>
                                    </defs>

                                    {/* Segment 1: Diagnostic (Top Left - 0° à 90°) */}
                                    <path
                                        d="M 100 100 L 100 20 A 80 80 0 0 1 180 100 Z"
                                        fill="#B99066"
                                        opacity="0.9"
                                        className="hover:opacity-100 transition-opacity cursor-pointer"
                                        onMouseEnter={() => {
                                            if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                            setHoveredIcon('diagnostic');
                                        }}
                                        onMouseLeave={() => {
                                            const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                            setIconTimeoutId(timeout);
                                        }}
                                    />

                                    {/* Segment 2: Stratégie (Top Right - 90° à 180°) */}
                                    <path
                                        d="M 100 100 L 180 100 A 80 80 0 0 1 100 180 Z"
                                        fill="#A67A5A"
                                        opacity="0.9"
                                        className="hover:opacity-100 transition-opacity cursor-pointer"
                                        onMouseEnter={() => {
                                            if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                            setHoveredIcon('strategie');
                                        }}
                                        onMouseLeave={() => {
                                            const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                            setIconTimeoutId(timeout);
                                        }}
                                    />

                                    {/* Segment 3: Mise en œuvre (Bottom Right - 180° à 270°) */}
                                    <path
                                        d="M 100 100 L 100 180 A 80 80 0 0 1 20 100 Z"
                                        fill="#B99066"
                                        opacity="0.9"
                                        className="hover:opacity-100 transition-opacity cursor-pointer"
                                        onMouseEnter={() => {
                                            if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                            setHoveredIcon('mise-en-oeuvre');
                                        }}
                                        onMouseLeave={() => {
                                            const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                            setIconTimeoutId(timeout);
                                        }}
                                    />

                                    {/* Segment 4: Suivi (Bottom Left - 270° à 360°) */}
                                    <path
                                        d="M 100 100 L 20 100 A 80 80 0 0 1 100 20 Z"
                                        fill="#A67A5A"
                                        opacity="0.9"
                                        className="hover:opacity-100 transition-opacity cursor-pointer"
                                        onMouseEnter={() => {
                                            if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                            setHoveredIcon('suivi');
                                        }}
                                        onMouseLeave={() => {
                                            const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                            setIconTimeoutId(timeout);
                                        }}
                                    />

                                    {/* Cercle intérieur (donut) avec bordure dorée */}
                                    <circle cx="100" cy="100" r="50" fill="#253F60" stroke="#B99066" strokeWidth="2" />

                                    {/* Lignes de séparation entre segments */}
                                    <line x1="100" y1="100" x2="100" y2="20" stroke="#253F60" strokeWidth="2" />
                                    <line x1="100" y1="100" x2="180" y2="100" stroke="#253F60" strokeWidth="2" />
                                    <line x1="100" y1="100" x2="100" y2="180" stroke="#253F60" strokeWidth="2" />
                                    <line x1="100" y1="100" x2="20" y2="100" stroke="#253F60" strokeWidth="2" />

                                    {/* Racines : Lignes connectant le logo aux 4 icônes */}
                                    {/* Ligne vers Diagnostic (Top Left) - part du bord du cercle vers l'icône */}
                                    <line
                                        x1="64.6"
                                        y1="64.6"
                                        x2="50"
                                        y2="50"
                                        stroke="#B99066"
                                        strokeWidth="2.5"
                                        opacity="0.8"
                                    />

                                    {/* Ligne vers Stratégie (Top Right) */}
                                    <line
                                        x1="135.4"
                                        y1="64.6"
                                        x2="150"
                                        y2="50"
                                        stroke="#B99066"
                                        strokeWidth="2.5"
                                        opacity="0.8"
                                    />

                                    {/* Ligne vers Mise en œuvre (Bottom Right) */}
                                    <line
                                        x1="135.4"
                                        y1="135.4"
                                        x2="150"
                                        y2="150"
                                        stroke="#B99066"
                                        strokeWidth="2.5"
                                        opacity="0.8"
                                    />

                                    {/* Ligne vers Suivi (Bottom Left) */}
                                    <line
                                        x1="64.6"
                                        y1="135.4"
                                        x2="50"
                                        y2="150"
                                        stroke="#B99066"
                                        strokeWidth="2.5"
                                        opacity="0.8"
                                    />

                                </svg>

                                {/* Badge 1: Diagnostic (Top Left segment - positionné à l'intérieur du segment) */}
                                <div
                                    className="absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                                    onMouseEnter={() => {
                                        if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                        setHoveredIcon('diagnostic');
                                    }}
                                    onMouseLeave={() => {
                                        const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                        setIconTimeoutId(timeout);
                                    }}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#B99066]">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Texte Diagnostic - Top Left */}
                                <div className="absolute top-0 left-0 max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] z-30">
                                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 border-[#B99066]">
                                        <h3 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-bold mb-3">
                                            {pageContent.expertise?.diagramme?.segments?.[0]?.title || "Diagnostic complet"}
                                        </h3>
                                        <p className="text-[#4B5563] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                                            {pageContent.expertise?.diagramme?.segments?.[0]?.description || "Analyse approfondie de votre situation fiscale, patrimoniale, professionnelle et familiale pour identifier tous les leviers d'optimisation disponibles."}
                                        </p>
                                    </div>
                                </div>

                                {/* Badge 2: Stratégie (Top Right segment - positionné à l'intérieur du segment) */}
                                <div
                                    className="absolute top-[25%] right-[25%] transform translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                                    onMouseEnter={() => {
                                        if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                        setHoveredIcon('strategie');
                                    }}
                                    onMouseLeave={() => {
                                        const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                        setIconTimeoutId(timeout);
                                    }}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#B99066]">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Texte Stratégie - Top Right */}
                                <div className="absolute top-0 right-0 max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] text-right z-30">
                                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 border-[#B99066]">
                                        <h3 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-bold mb-3">
                                            {pageContent.expertise?.diagramme?.segments?.[1]?.title || "Stratégie personnalisée"}
                                        </h3>
                                        <p className="text-[#4B5563] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                                            {pageContent.expertise?.diagramme?.segments?.[1]?.description || "Élaboration d'un plan d'action sur-mesure intégrant vos objectifs, contraintes et aversion au risque, avec priorisation des actions selon leur impact."}
                                        </p>
                                    </div>
                                </div>

                                {/* Badge 3: Mise en œuvre (Bottom Right segment - positionné à l'intérieur du segment) */}
                                <div
                                    className="absolute bottom-[25%] right-[25%] transform translate-x-1/2 translate-y-1/2 cursor-pointer z-20"
                                    onMouseEnter={() => {
                                        if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                        setHoveredIcon('mise-en-oeuvre');
                                    }}
                                    onMouseLeave={() => {
                                        const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                        setIconTimeoutId(timeout);
                                    }}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#B99066]">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Texte Mise en œuvre - Bottom Right */}
                                <div className="absolute bottom-0 right-0 max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] text-right z-30">
                                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 border-[#B99066]">
                                        <h3 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-bold mb-3">
                                            {pageContent.expertise?.diagramme?.segments?.[2]?.title || "Mise en œuvre"}
                                        </h3>
                                        <p className="text-[#4B5563] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                                            {pageContent.expertise?.diagramme?.segments?.[2]?.description || "Accompagnement opérationnel pour la concrétisation des recommandations : sélection des investissements, formalités administratives, suivi des échéances."}
                                        </p>
                                    </div>
                                </div>

                                {/* Badge 4: Suivi (Bottom Left segment - positionné à l'intérieur du segment) */}
                                <div
                                    className="absolute bottom-[25%] left-[25%] transform -translate-x-1/2 translate-y-1/2 cursor-pointer z-20"
                                    onMouseEnter={() => {
                                        if (iconTimeoutId) clearTimeout(iconTimeoutId);
                                        setHoveredIcon('suivi');
                                    }}
                                    onMouseLeave={() => {
                                        const timeout = setTimeout(() => setHoveredIcon(null), 200);
                                        setIconTimeoutId(timeout);
                                    }}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#B99066]">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B99066]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Texte Suivi - Bottom Left */}
                                <div className="absolute bottom-0 left-0 max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] z-30">
                                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 border-[#B99066]">
                                        <h3 className="text-[#253F60] text-lg sm:text-xl lg:text-2xl font-cairo font-bold mb-3">
                                            {pageContent.expertise?.diagramme?.segments?.[3]?.title || "Suivi et ajustement"}
                                        </h3>
                                        <p className="text-[#4B5563] text-sm sm:text-base lg:text-lg font-inter leading-relaxed">
                                            {pageContent.expertise?.diagramme?.segments?.[3]?.description || "Veille réglementaire continue, adaptation de la stratégie aux évolutions législatives, optimisation permanente selon l'évolution de votre situation."}
                                        </p>
                                    </div>
                                </div>

                                {/* Logo central dans le donut - Arbre Azalée */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative">
                                        <Image
                                            src="/images/azalee-patrimoine3.webp"
                                            alt="Azalée Patrimoine"
                                            width={112}
                                            height={112}
                                            className="object-contain opacity-90"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Grille 2 colonnes - Audit fiscal et Accompagnement */}
                    {pageContent.expertise?.services && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {pageContent.expertise.services.map((service, index) => (
                                <div key={index} className="bg-gradient-to-br from-[#253F60] to-[#1a2d47] rounded-xl p-6 sm:p-8 border-2 border-[#B99066]/30 shadow-lg">
                                    <h3 className="text-[#B99066] text-xl sm:text-2xl font-cairo font-bold mb-6">
                                        {service.title}
                                    </h3>
                                    <div className="space-y-4 text-white text-sm sm:text-base font-inter leading-relaxed">
                                        {(service.paragraphs || []).map((paragraph, pIndex) => (
                                            <p key={pIndex}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bannière Bilan fiscal offert */}
            {pageContent.banniere?.text && (
                <section className="w-full bg-gradient-to-r from-[#253F60] to-[#B99066] py-8">
                    <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-white text-lg sm:text-xl lg:text-2xl font-cairo font-semibold">
                                {pageContent.banniere.text}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Section FAQ Fiscalité */}
            <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12">
                            {pageContent.faq?.h2 || "FAQ Fiscalité"}
                        </h2>

                        <div className="space-y-4">
                            {(pageContent.faq?.questions || []).map((faqItem, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => toggleQuestion(index)}
                                        className="w-full text-left p-4 sm:p-6 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                                    >
                                        <h3 className="text-[#253F60] text-xl sm:text-2xl font-cairo font-bold pr-4">
                                            {faqItem.question}
                                        </h3>
                                        <svg
                                            className={`w-6 h-6 text-[#B99066] flex-shrink-0 transition-transform ${openQuestion === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {/* Content always in DOM for Google indexation, hidden with CSS */}
                                    <div className={`overflow-hidden transition-all duration-300 ${openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-4 sm:p-6 pt-0 bg-white">
                                            <p className="text-[#4B5563] text-base sm:text-lg font-inter leading-relaxed" dangerouslySetInnerHTML={{ __html: processHTMLForRender(faqItem.answer) }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section En savoir plus sur Azalée Patrimoine */}
            <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
                <div className="max-w-[1368px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <h2 className="text-[#253F60] text-2xl sm:text-3xl lg:text-4xl font-cairo font-bold mb-12">
                            {pageContent.enSavoirPlus?.h2 || "En savoir plus sur Azalée Patrimoine"}
                        </h2>

                        <div className="space-y-4">
                            {(() => {
                                const defaultLinks = [
                                    { text: "Qui sommes-nous ?", link: "/notre-approche" },
                                    { text: "Gestion de patrimoine", link: "/patrimoine" },
                                    { text: "Placement financier", link: "/placements" },
                                    { text: "Investissement immobilier", link: "/immobilier" },
                                    { text: "Retraite", link: "/retraite" },
                                    { text: "Simulateurs", link: "/retraite/simulation" }
                                ];

                                const links = pageContent.enSavoirPlus?.links || defaultLinks;

                                return links.map((linkItem, index) => {
                                    const link = linkItem.link || linkItem.href || (index === 0 ? "/notre-approche" : index === 1 ? "/patrimoine" : index === 2 ? "/placements" : index === 3 ? "/immobilier" : index === 4 ? "/retraite" : "/retraite/simulation");
                                    const text = linkItem.text || linkItem.label || linkItem.title || "";

                                    return (
                                        <Link
                                            key={index}
                                            href={link}
                                            className="block bg-white rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#B99066] group cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#253F60] text-base sm:text-lg font-inter font-medium group-hover:text-[#B99066] transition-colors">
                                                    {text}
                                                </span>
                                                <svg className="w-5 h-5 text-[#B99066] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </Link>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
} 
