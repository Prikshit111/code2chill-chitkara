const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  year: {
    type: String,
    default: '2nd Year'
  },
  department: {
    type: String,
    default: 'CSE'
  },
  githubProfile: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['confirmed', 'waitlisted', 'attended'],
    default: 'confirmed'
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
