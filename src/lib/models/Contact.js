import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Nom is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  telephone: {
    type: String,
    required: [true, 'Téléphone is required'],
    trim: true
  },
  ville: {
    type: String,
    required: [true, 'Ville is required'],
    trim: true
  },
  profession: {
    type: String,
    trim: true
  },
  patrimoine: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'contacted', 'archived'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ email: 1 });

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;

