/**
 * Create admin user script
 * Run this script to create the first admin user for the application
 * 
 * Usage:
 *   node scripts/create-admin.js
 * 
 * Or with custom credentials:
 *   node scripts/create-admin.js email@example.com "Strong@Password123" "Admin Name"
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/azalee_db';

// User Schema (copied from model to avoid import issues)
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

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
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

async function createAdmin() {
  try {
    console.log('🔐 Admin User Creation Script\n');
    console.log('This script will create an admin user for the Azalée Patrimoine application.\n');
    
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Check if arguments were provided
    let email, password, name;
    
    if (process.argv.length >= 5) {
      // Use command line arguments
      email = process.argv[2];
      password = process.argv[3];
      name = process.argv[4];
      
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
      do {
        email = await question('Email: ');
        if (!validateEmail(email)) {
          console.log('❌ Invalid email format. Please try again.\n');
        }
      } while (!validateEmail(email));
      
      // Get password
      let passwordError;
      do {
        password = await question('Password: ');
        passwordError = validatePassword(password);
        if (passwordError) {
          console.log(`❌ ${passwordError}\n`);
        }
      } while (passwordError);
      
      // Get name
      do {
        name = await question('Full Name: ');
        if (!name || name.trim().length < 2) {
          console.log('❌ Name must be at least 2 characters long.\n');
        }
      } while (!name || name.trim().length < 2);
    }
    
    // Validate all inputs
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      throw new Error(passwordError);
    }
    
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('\n❌ Error: A user with this email already exists.');
      console.log('   If you need to reset the password, use the change password functionality.');
      process.exit(1);
    }
    
    // Hash password
    console.log('\n🔒 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name.trim(),
      role: 'admin'
    });
    
    await admin.save();
    
    console.log('\n✅ Admin user created successfully!');
    console.log('\nCredentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${name}`);
    console.log(`   Role: admin`);
    console.log('\n⚠️  IMPORTANT: Store these credentials securely!');
    console.log('   You can now log in to the admin panel at /admin/login\n');
    
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.connection.close();
    console.log('📡 Disconnected from MongoDB');
  }
}

// Run the script
createAdmin();

