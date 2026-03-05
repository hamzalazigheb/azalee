"use client";
import React, { useState } from "react";

export default function BilanCalculator({ data }) {
    const [patrimoine, setPatrimoine] = useState("");
    const [situationFamiliale, setSituationFamiliale] = useState("Célibataire");
    const [age, setAge] = useState("");
    const [economiesPotentielles, setEconomiesPotentielles] = useState(null);
    const [calculEffectue, setCalculEffectue] = useState(false);

    const calculerEconomies = () => {
        if (!patrimoine || !age) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }

        const patrimoineValue = parseFloat(patrimoine.replace(/[^\d.]/g, "")) || 0;
        const ageValue = parseInt(age) || 0;

        // Calcul basé sur des règles simplifiées
        let tauxOptimisation = 0.05; // 5% de base

        // Ajustements selon la situation familiale
        if (situationFamiliale === "Marié(e) avec enfants") {
            tauxOptimisation = 0.08; // 8% pour famille avec enfants
        } else if (situationFamiliale === "Marié(e) sans enfants") {
            tauxOptimisation = 0.06; // 6% pour couple sans enfants
        }

        // Ajustement selon l'âge (plus on est jeune, plus on peut optimiser)
        if (ageValue < 40) {
            tauxOptimisation += 0.02; // +2% si moins de 40 ans
        } else if (ageValue > 60) {
            tauxOptimisation -= 0.01; // -1% si plus de 60 ans
        }

        // Calcul des économies potentielles
        const economieAnnuelle = patrimoineValue * tauxOptimisation;

        setEconomiesPotentielles(Math.round(economieAnnuelle));
        setCalculEffectue(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
            <h3 className="text-[#112033] text-xl font-semibold mb-6">
                {data?.title || "Calculez votre potentiel d'optimisation"}
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-[#686868] text-sm font-medium mb-2">
                        {data?.valeurLabel || "Valeur de votre patrimoine"}
                    </label>
                    <input
                        type="text"
                        placeholder="€1,250,000"
                        value={patrimoine}
                        onChange={(e) => setPatrimoine(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-[#686868] text-sm font-medium mb-2">
                        {data?.situationLabel || "Situation familiale"}
                    </label>
                    <select
                        value={situationFamiliale}
                        onChange={(e) => setSituationFamiliale(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                    >
                        <option>Célibataire</option>
                        <option>Marié(e) sans enfants</option>
                        <option>Marié(e) avec enfants</option>
                        <option>Divorcé(e)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[#686868] text-sm font-medium mb-2">
                        {data?.ageLabel || "Âge"}
                    </label>
                    <input
                        type="number"
                        placeholder="45"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="18"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#253F60] focus:border-transparent"
                    />
                </div>

                <button
                    onClick={calculerEconomies}
                    className="w-full bg-[#253F60] text-white py-3 rounded-lg font-medium hover:bg-[#1A2F4A] transition-colors duration-200"
                >
                    {data?.buttonText || "Estimer mes économies"}
                </button>

                {calculEffectue && economiesPotentielles !== null ? (
                    <div className="bg-[#F0F9FF] rounded-lg p-4 text-center border-2 border-[#253F60]">
                        <p className="text-[#686868] text-sm mb-2">
                            <strong>{data?.resultLabel || "Économies potentielles :"}</strong>
                        </p>
                        <p className="text-[#253F60] text-2xl font-bold">
                            €{economiesPotentielles.toLocaleString('fr-FR')}
                        </p>
                        <p className="text-[#686868] text-xs mt-2">{data?.periodLabel || "par an"}</p>
                    </div>
                ) : (
                    <div className="bg-[#F0F9FF] rounded-lg p-4 text-center opacity-50">
                        <p className="text-[#686868] text-sm">
                            <strong>{data?.resultLabel || "Économies potentielles :"}</strong><br />
                            <span className="text-[#253F60] text-xl font-bold">{data?.placeholderText || "Remplissez le formulaire"}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
