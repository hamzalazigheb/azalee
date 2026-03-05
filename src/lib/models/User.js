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
    minlength: [12, 'Password must be at least 12 characters long']
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

// NOTE: Default admin creation removed for security.
// Use scripts/create-admin.js to create the first admin user.

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

