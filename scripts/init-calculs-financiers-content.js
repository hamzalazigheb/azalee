const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const PageContentSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  published: { type: Boolean, default: true },
  lastModified: { type: Date, default: Date.now }
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

const calculsFinanciersContent = {
  title: 'Calculs Financiers | Azalée Patrimoine',
  content: {
    hero: {
      title: "Calculs financiers",
      subtitle: "Simulez vos investissements et prêts avec nos outils financiers",
      description: "Utilisez nos calculateurs pour planifier vos investissements, évaluer vos prêts et analyser la rentabilité de vos projets. Des outils précis et faciles à utiliser.",
      ctaPrimary: "Commencer la simulation",
      ctaSecondary: "En savoir plus"
    },
    calculator: {
      title: "Calculateur financier",
      tabs: [
        { 
          id: "capitalisation", 
          label: "Capitalisation composée", 
          description: "Calculez la valeur future de vos investissements" 
        },
        { 
          id: "amortissement", 
          label: "Amortissement de prêt", 
          description: "Simulez le remboursement de vos emprunts" 
        },
        { 
          id: "roi", 
          label: "Analyse ROI", 
          description: "Évaluez la rentabilité de vos investissements" 
        }
      ]
    },
    capitalisation: {
      parameters: {
        montantInitial: { 
          label: "Montant initial", 
          description: "Capital de départ pour votre investissement" 
        },
        tauxAnnuel: { 
          label: "Taux annuel (%)", 
          description: "Rendement annuel de votre placement" 
        },
        duree: { 
          label: "Durée (années)", 
          description: "Horizon de placement en années" 
        },
        capitalisation: { 
          label: "Capitalisation", 
          description: "Périodicité des intérêts composés" 
        },
        versementPeriodique: { 
          label: "Versement périodique", 
          description: "Apport régulier à votre investissement" 
        }
      },
      results: {
        sections: {
          montantFinal: "Montant final",
          interetsGeneres: "Intérêts générés",
          capitalInitial: "Capital initial",
          versements: "Versements totaux",
          cagr: "CAGR"
        }
      }
    },
    methodology: {
      title: "Détails et méthodologie",
      description: "Comprendre les calculs et formules utilisées",
      content: [
        "La capitalisation composée utilise la formule : VF = VP × (1 + r)^n + PMT × [(1 + r)^n - 1] / r",
        "L'amortissement de prêt calcule les échéances selon le système français d'amortissement constant",
        "Le ROI se calcule comme : (Gains - Coûts) / Coûts × 100",
        "Tous les calculs sont effectués avec une précision de 2 décimales"
      ]
    },
    faq: {
      title: "Questions fréquentes",
      questions: [
        {
          question: "Comment fonctionne la capitalisation composée ?",
          answer: "La capitalisation composée permet à vos intérêts de générer à leur tour des intérêts, créant un effet boule de neige sur votre capital."
        },
        {
          question: "Quelle est la différence entre taux nominal et taux effectif ?",
          answer: "Le taux nominal est le taux annuel affiché, tandis que le taux effectif prend en compte la fréquence de capitalisation des intérêts."
        },
        {
          question: "Comment interpréter le ROI ?",
          answer: "Un ROI positif indique un investissement rentable. Plus le pourcentage est élevé, plus l'investissement est intéressant."
        }
      ]
    },
    actions: {
      reset: "Réinitialiser",
      export: "Exporter (PDF)",
      start: "Commencer",
      learnMore: "Consultez un expert"
    },
    seo: {
      metaTitle: "Calculs Financiers | Azalée Patrimoine",
      metaDescription: "Simulez vos investissements et prêts avec nos calculateurs financiers. Capitalisation composée, amortissement de prêt, analyse ROI. Outils gratuits et précis."
    }
  }
};

async function initContent() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connecté à MongoDB\n');

    const path = 'outils/calculs-financiers';
    
    // Vérifier si la page existe déjà
    const existingPage = await PageContent.findOne({ path });
    
    if (existingPage) {
      console.log(`📄 Page "${path}" existe déjà.`);
      console.log('🔄 Mise à jour du contenu...');
      
      await PageContent.findOneAndUpdate(
        { path },
        {
          $set: {
            title: calculsFinanciersContent.title,
            content: calculsFinanciersContent.content,
            published: true,
            lastModified: new Date()
          }
        },
        { new: true }
      );
      
      console.log('✅ Contenu mis à jour avec succès\n');
    } else {
      console.log(`📝 Création de la page "${path}"...`);
      
      const newPage = new PageContent({
        path,
        title: calculsFinanciersContent.title,
        content: calculsFinanciersContent.content,
        published: true,
        lastModified: new Date()
      });
      
      await newPage.save();
      console.log('✅ Page créée avec succès\n');
    }

    // Vérification
    const page = await PageContent.findOne({ path });
    console.log('📋 Vérification du contenu:');
    console.log(`   - Path: ${page.path}`);
    console.log(`   - Title: ${page.title}`);
    console.log(`   - Published: ${page.published}`);
    console.log(`   - Hero: ${page.content.hero ? '✅' : '❌'}`);
    console.log(`   - Hero Title: ${page.content.hero?.title || '❌'}`);
    console.log(`   - Calculator: ${page.content.calculator ? '✅' : '❌'}`);
    console.log(`   - Capitalisation: ${page.content.capitalisation ? '✅' : '❌'}`);
    console.log(`   - Methodology: ${page.content.methodology ? '✅' : '❌'}`);
    console.log(`   - FAQ: ${page.content.faq ? '✅' : '❌'}`);

    await mongoose.disconnect();
    console.log('\n✅ Initialisation terminée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initContent();



