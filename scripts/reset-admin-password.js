/**
 * Reset admin password script
 * Run this script to reset the password for an existing admin user
 * 
 * Usage:
 *   node scripts/reset-admin-password.js
 * 
 * Or with arguments:
 *   node scripts/reset-admin-password.js email@example.com "NewPassword123!"
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 12,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'admin',
  },
  name: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function validatePassword(password) {
  if (password.length < 12) {
    return 'Password must be at least 12 characters long';
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);
  
  if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
  if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
  if (!hasNumber) return 'Password must contain at least one number';
  if (!hasSpecial) return 'Password must contain at least one special character (@$!%*?&)';
  
  return null;
}

async function resetPassword() {
  try {
    console.log('🔐 Admin Password Reset Script\n');
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if arguments were provided
    let email, newPassword;

    if (process.argv.length >= 4) {
      // Use command line arguments
      email = process.argv[2];
      newPassword = process.argv[3];
      
      console.log('Using provided credentials from command line arguments.\n');
    } else {
      // Interactive mode
      console.log('Password requirements:');
      console.log('  - At least 12 characters');
      console.log('  - At least one uppercase letter');
      console.log('  - At least one lowercase letter');
      console.log('  - At least one number');
      console.log('  - At least one special character (@$!%*?&)\n');
      
      // Get email
      email = await question('Email of user to reset: ');
      
      // Get new password
      let passwordError;
      do {
        newPassword = await question('New Password: ');
        passwordError = validatePassword(newPassword);
        if (passwordError) {
          console.log(`❌ ${passwordError}\n`);
        }
      } while (passwordError);
    }
    
    // Validate password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      throw new Error(passwordError);
    }
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('\n❌ Error: No user found with this email.');
      process.exit(1);
    }
    
    // Hash new password
    console.log('\n🔒 Hashing new password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
    // Update password
    console.log('💾 Updating password...');
    user.password = hashedPassword;
    await user.save();
    
    console.log('\n✅ Password reset successfully!');
    console.log('\nUser Details:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log('\n⚠️  IMPORTANT: Store the new password securely!');
    console.log('   You can now log in with the new password.\n');
    
  } catch (error) {
    console.error('\n❌ Error resetting password:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.connection.close();
    console.log('📡 Disconnected from MongoDB');
  }
}

// Run the script
resetPassword();
