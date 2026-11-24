const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Hackathon', 'Workshop', 'Coding Contest', 'Tech Talk', 'Gaming Night', 'Open Source'],
    default: 'Workshop'
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: '05:00 PM - 07:30 PM'
  },
  venue: {
    type: String,
    default: 'Turing Hall / Newton Block, Chitkara University, Rajpura'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  capacity: {
    type: Number,
    default: 150
  },
  registeredCount: {
    type: Number,
    default: 0
  },
  badge: {
    type: String,
    default: 'Registration Open'
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  prizes: {
    type: String,
    default: 'Cash Prizes + Certificates + Goodies'
  },
  instructorOrSpeaker: {
    type: String,
    default: 'Code2Chill Technical Team & Industry Mentor'
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
