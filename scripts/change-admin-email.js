// Script to change admin email from admin@azalee.com to contact@azalee-patrimoine.fr
// Run with: node scripts/change-admin-email.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// Define User schema
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

async function changeAdminEmail() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const oldEmail = 'admin@azalee.com';
    const newEmail = 'contact@azalee-patrimoine.fr';

    // Find user with old email
    const user = await User.findOne({ email: oldEmail });
    
    if (!user) {
      console.log(`⚠️  User with email "${oldEmail}" not found.`);
      console.log('   Checking if new email already exists...');
      
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        console.log(`✅ User with email "${newEmail}" already exists.`);
        console.log('   No changes needed.');
      } else {
        console.log(`ℹ️  No user found. You may need to create a new admin user.`);
      }
      
      await mongoose.disconnect();
      process.exit(0);
    }

    // Check if new email already exists
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      console.log(`❌ Email "${newEmail}" already exists in database.`);
      console.log('   Cannot change email. Please delete the existing user first or use a different email.');
      await mongoose.disconnect();
      process.exit(1);
    }

    // Update email
    console.log(`📧 Changing email from "${oldEmail}" to "${newEmail}"...`);
    
    const result = await User.findOneAndUpdate(
      { email: oldEmail },
      { 
        $set: { 
          email: newEmail.toLowerCase(),
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (result) {
      console.log(`✅ Successfully updated admin email to "${newEmail}"`);
      console.log(`   User ID: ${result._id}`);
      console.log(`   Name: ${result.name}`);
      console.log(`   Role: ${result.role}`);
    } else {
      console.log('❌ Failed to update email');
      process.exit(1);
    }

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    if (error.code === 11000) {
      console.error('   Email already exists (duplicate key error)');
    }
    process.exit(1);
  }
}

changeAdminEmail();



