// Script to initialize Sara chatbot content in CMS
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

const PageContentSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  published: {
    type: Boolean,
    default: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

async function initSaraContent() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const saraContent = {
      welcome: {
        text: "Bonjour et bienvenue sur azalee-patrimoine.fr ! Je suis votre conseiller patrimonial virtuel. Vous souhaitez optimiser vos finances, investir, ou anticiper l'avenir ? Je peux vous aider à y voir clair.",
        options: [
          { text: '💬 Obtenir une réponse rapide à une question patrimoniale', value: 'question' },
          { text: '📞 Être rappelé(e) par un conseiller', value: 'rappel' },
          { text: '📅 Prendre un rendez-vous directement', value: 'rdv_direct' }
        ]
      }
    };

    const result = await PageContent.findOneAndUpdate(
      { path: 'sara' },
      {
        path: 'sara',
        title: 'Chatbot Sara',
        content: saraContent,
        published: true,
        lastModified: new Date()
      },
      { upsert: true, new: true }
    );

    console.log('✅ Page Sara créée/mise à jour dans MongoDB');
    console.log('   Path:', result.path);
    console.log('   Title:', result.title);
    console.log('   Content keys:', Object.keys(result.content));
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

initSaraContent();

