const mongoose = require('mongoose');

const ClubStatSchema = new mongoose.Schema({
  activeMembers: {
    type: Number,
    default: 850
  },
  eventsOrganized: {
    type: Number,
    default: 48
  },
  projectsShipped: {
    type: Number,
    default: 120
  },
  hackathonsWon: {
    type: Number,
    default: 32
  },
  workshopsConducted: {
    type: Number,
    default: 26
  },
  instagramFollowers: {
    type: Number,
    default: 3400
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ClubStat', ClubStatSchema);
