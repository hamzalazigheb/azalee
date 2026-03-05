/**
 * Constantes pour les textes des boutons CTA
 * Conformes aux recommandations d'audit : [Verbe d'action] + [Bénéfice] + [Gratuité/Valeur]
 */

export const CTA_TEXTS = {
  // CTA Principaux (Orange #B99066) - Actions prioritaires
  primary: {
    default: "Planifiez votre consultation gratuite",
    bilan: "Réaliser mon bilan patrimonial gratuit",
    audit: "Obtenez votre audit patrimonial gratuit",
    simulation: "Réservez votre session stratégique",
    rendezvous: "Planifiez votre consultation gratuite",
    contact: "Planifiez votre consultation gratuite",
    // Spécifiques par section
    fiscalite: "Optimisez votre fiscalité gratuitement",
    immobilier: "Obtenez votre étude immobilière gratuite",
    placements: "Découvrez vos opportunités d'investissement",
    retraite: "Préparez votre retraite sereinement",
    patrimoine: "Protégez et transmettez votre patrimoine"
  },
  
  // CTA Secondaires (Outline) - Actions non prioritaires
  secondary: {
    enSavoirPlus: "En savoir plus",
    decouvrir: "Découvrir nos solutions",
    contacter: "Nous contacter",
    telecharger: "Télécharger le guide",
    consulter: "Consulter un expert"
  }
};

/**
 * Fonction helper pour obtenir le texte CTA selon le contexte
 * @param {string} context - Contexte de la page (bilan, audit, fiscalite, etc.)
 * @param {string} type - Type de CTA (primary, secondary)
 * @returns {string} Texte du CTA
 */
export function getCTAText(context = 'default', type = 'primary') {
  if (type === 'primary') {
    return CTA_TEXTS.primary[context] || CTA_TEXTS.primary.default;
  }
  return CTA_TEXTS.secondary[context] || CTA_TEXTS.secondary.enSavoirPlus;
}

