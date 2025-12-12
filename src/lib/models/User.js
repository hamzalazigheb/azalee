import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'admin'
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function() {
  // Skip if password is not modified
  if (!this.isModified('password')) {
    return;
  }
  
  // Skip if password is already hashed (starts with $2a$, $2b$, or $2y$)
  if (this.password && /^\$2[ayb]\$/.test(this.password)) {
    return;
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Prevent password from being returned in JSON
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Create default admin user if it doesn't exist
UserSchema.statics.initializeAdmin = async function() {
  const adminExists = await this.findOne({ email: 'contact@azalee-patrimoine.fr' });
  
  if (!adminExists) {
    const admin = new this({
      email: 'contact@azalee-patrimoine.fr',
      password: 'admin123', // Will be hashed by pre-save hook
      name: 'Administrator',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Default admin user created: contact@azalee-patrimoine.fr / admin123');
  }
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

