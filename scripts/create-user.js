// Script to create or reset password for a user
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

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
    enum: ['admin', 'editor', 'viewer'],
    default: 'admin'
  }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createOrResetUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'akrsmartconsulting@gmail.com';
    const newPassword = 'admin123'; // Nouveau mot de passe
    const name = 'Admin User'; // Nom de l'utilisateur

    // Find user
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log(`📝 Création d'un nouvel utilisateur...`);
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Create new user
      user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name,
        role: 'admin'
      });
      await user.save();
      console.log('✅ Utilisateur créé avec succès !');
    } else {
      console.log(`🔄 Réinitialisation du mot de passe...`);
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      user.password = hashedPassword;
      await user.save();
      console.log('✅ Mot de passe réinitialisé avec succès !');
    }

    console.log(`\n📧 Email: ${email}`);
    console.log(`🔑 Nouveau mot de passe: ${newPassword}`);
    console.log(`👤 Nom: ${user.name}`);
    console.log(`🎭 Rôle: ${user.role}`);
    console.log(`\n⚠️  Veuillez changer ce mot de passe après la première connexion.`);
    
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createOrResetUser();


