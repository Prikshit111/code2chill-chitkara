const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  domain: {
    type: String,
    required: true,
    enum: ['Lead', 'Technical', 'Events & Operations', 'Design & Media', 'PR & Outreach', 'Competitive Coding'],
    default: 'Technical'
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  bio: {
    type: String,
    default: ''
  },
  batch: {
    type: String,
    default: 'Batch of 2023-2027, Chitkara University'
  },
  instagram: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 99
  }
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
