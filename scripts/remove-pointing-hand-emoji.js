// Remove pointing hand emoji (👉) from all database collections
// Run with: node scripts/remove-pointing-hand-emoji.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// Define schemas inline (CommonJS)
const PageContentSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, 'Page path is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: [true, 'Page title is required']
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
  },
  modifiedBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

const ChatbotSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [{
    role: String,
    content: String,
    timestamp: Date
  }],
  step: String,
  profile: mongoose.Schema.Types.Mixed,
  intention: String,
  thematique: String,
  actionFinale: String,
  rendezVous: mongoose.Schema.Types.Mixed,
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const ContactSchema = new mongoose.Schema({
  nom: String,
  email: String,
  telephone: String,
  ville: String,
  profession: String,
  patrimoine: String,
  message: String,
  status: {
    type: String,
    enum: ['new', 'read', 'contacted', 'archived'],
    default: 'new'
  },
  notes: String
}, {
  timestamps: true
});

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const ChatbotSession = mongoose.models.ChatbotSession || mongoose.model('ChatbotSession', ChatbotSessionSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

// Function to recursively remove emoji from objects
function removeEmojiFromObject(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return obj.replace(/👉/g, '');
  }

  if (Array.isArray(obj)) {
    return obj.map(item => removeEmojiFromObject(item));
  }

  if (typeof obj === 'object') {
    const cleaned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cleaned[key] = removeEmojiFromObject(obj[key]);
      }
    }
    return cleaned;
  }

  return obj;
}

// Function to check if object contains the emoji
function containsEmoji(obj) {
  if (obj === null || obj === undefined) {
    return false;
  }

  if (typeof obj === 'string') {
    return obj.includes('👉');
  }

  if (Array.isArray(obj)) {
    return obj.some(item => containsEmoji(item));
  }

  if (typeof obj === 'object') {
    return Object.values(obj).some(value => containsEmoji(value));
  }

  return false;
}

async function removeEmojiFromDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('   URI:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    let totalUpdated = 0;

    // Process PageContents
    console.log('📄 Processing pagecontents...');
    const pageContents = await PageContent.find({});
    let pageContentUpdated = 0;
    
    for (const doc of pageContents) {
      if (containsEmoji(doc.content) || containsEmoji(doc.title)) {
        const cleanedContent = removeEmojiFromObject(doc.content);
        const cleanedTitle = removeEmojiFromObject(doc.title);
        
        await PageContent.updateOne(
          { _id: doc._id },
          { 
            $set: { 
              content: cleanedContent,
              title: cleanedTitle,
              lastModified: new Date()
            } 
          }
        );
        pageContentUpdated++;
        console.log(`   ✓ Updated: ${doc.path}`);
      }
    }
    console.log(`✅ Updated ${pageContentUpdated} pagecontents\n`);
    totalUpdated += pageContentUpdated;

    // Process ChatbotSessions
    console.log('📄 Processing chatbotsessions...');
    const sessions = await ChatbotSession.find({});
    let sessionUpdated = 0;
    
    for (const doc of sessions) {
      let needsUpdate = false;
      const updates = {};
      
      if (containsEmoji(doc.messages)) {
        updates.messages = removeEmojiFromObject(doc.messages);
        needsUpdate = true;
      }
      
      if (containsEmoji(doc.profile)) {
        updates.profile = removeEmojiFromObject(doc.profile);
        needsUpdate = true;
      }
      
      if (containsEmoji(doc.intention)) {
        updates.intention = removeEmojiFromObject(doc.intention);
        needsUpdate = true;
      }
      
      if (containsEmoji(doc.thematique)) {
        updates.thematique = removeEmojiFromObject(doc.thematique);
        needsUpdate = true;
      }
      
      if (containsEmoji(doc.rendezVous)) {
        updates.rendezVous = removeEmojiFromObject(doc.rendezVous);
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await ChatbotSession.updateOne(
          { _id: doc._id },
          { $set: updates }
        );
        sessionUpdated++;
        console.log(`   ✓ Updated: ${doc.sessionId}`);
      }
    }
    console.log(`✅ Updated ${sessionUpdated} chatbotsessions\n`);
    totalUpdated += sessionUpdated;

    // Process Contacts
    console.log('📄 Processing contacts...');
    const contacts = await Contact.find({});
    let contactUpdated = 0;
    
    for (const doc of contacts) {
      let needsUpdate = false;
      const updates = {};
      
      const fieldsToCheck = ['nom', 'email', 'telephone', 'ville', 'profession', 'patrimoine', 'message', 'notes'];
      
      for (const field of fieldsToCheck) {
        if (doc[field] && containsEmoji(doc[field])) {
          updates[field] = removeEmojiFromObject(doc[field]);
          needsUpdate = true;
        }
      }
      
      if (needsUpdate) {
        await Contact.updateOne(
          { _id: doc._id },
          { $set: updates }
        );
        contactUpdated++;
        console.log(`   ✓ Updated: ${doc.email || doc._id}`);
      }
    }
    console.log(`✅ Updated ${contactUpdated} contacts\n`);
    totalUpdated += contactUpdated;

    // Process Users (name field)
    console.log('📄 Processing users...');
    const users = await User.find({});
    let userUpdated = 0;
    
    for (const doc of users) {
      if (containsEmoji(doc.name) || containsEmoji(doc.email)) {
        await User.updateOne(
          { _id: doc._id },
          { 
            $set: { 
              name: removeEmojiFromObject(doc.name),
              email: removeEmojiFromObject(doc.email)
            } 
          }
        );
        userUpdated++;
        console.log(`   ✓ Updated: ${doc.email}`);
      }
    }
    console.log(`✅ Updated ${userUpdated} users\n`);
    totalUpdated += userUpdated;

    console.log('\n✅ Emoji removal complete!');
    console.log(`📊 Total documents updated: ${totalUpdated}\n`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
removeEmojiFromDatabase();

