const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
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
  rollNumber: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    default: 'CSE / Computer Applications'
  },
  year: {
    type: String,
    default: '2nd Year'
  },
  campus: {
    type: String,
    default: 'Chitkara University, Rajpura, Punjab'
  },
  role: {
    type: String,
    enum: ['member', 'head', 'admin'],
    default: 'member'
  },
  interests: [{
    type: String
  }],
  github: {
    type: String,
    default: ''
  },
  instagram: {
    type: String,
    default: ''
  },
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
