// Script to delete all contacts from the database
// Run with: node scripts/delete-all-contacts.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// Define Contact schema
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

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

async function deleteAllContacts() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Count contacts before deletion
    const countBefore = await Contact.countDocuments();
    console.log(`📊 Found ${countBefore} contact(s) in database`);

    if (countBefore === 0) {
      console.log('ℹ️  No contacts to delete.');
      await mongoose.disconnect();
      process.exit(0);
    }

    // Ask for confirmation (in production, you might want to add a confirmation prompt)
    console.log(`⚠️  WARNING: About to delete ${countBefore} contact(s)!`);
    console.log('   This action cannot be undone.\n');

    // Delete all contacts
    const result = await Contact.deleteMany({});
    
    console.log(`✅ Successfully deleted ${result.deletedCount} contact(s)`);
    
    // Verify deletion
    const countAfter = await Contact.countDocuments();
    console.log(`📊 Remaining contacts: ${countAfter}`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

deleteAllContacts();

