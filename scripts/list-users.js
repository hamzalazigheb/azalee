// Script to list all users
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  role: String
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function listUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({}).select('email name role createdAt');
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé dans la base de données.');
    } else {
      console.log(`📋 ${users.length} utilisateur(s) trouvé(s):\n`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}`);
        console.log(`   Nom: ${user.name || 'N/A'}`);
        console.log(`   Rôle: ${user.role || 'N/A'}`);
        console.log(`   Créé le: ${user.createdAt || 'N/A'}\n`);
      });
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

listUsers();


