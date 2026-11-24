const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { authMiddleware, headOnlyMiddleware } = require('../middleware/auth');
const seedData = require('../data/seedData');

let localEvents = JSON.parse(JSON.stringify(seedData.events));
let localRegistrations = [];

const isMongoConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

// @route   GET /api/events
// @desc    Get all club events (filtered by category / status)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, category } = req.query;

    if (isMongoConnected()) {
      let query = {};
      if (status) query.status = status;
      if (category) query.category = category;
      const events = await Event.find(query).sort({ date: 1 });
      return res.json({ success: true, count: events.length, data: events });
    } else {
      let list = [...localEvents];
      if (status && status !== 'all') {
        list = list.filter(e => e.status.toLowerCase() === status.toLowerCase());
      }
      if (category && category !== 'all') {
        list = list.filter(e => e.category.toLowerCase() === category.toLowerCase());
      }
      return res.json({ success: true, count: list.length, data: list });
    }
  } catch (err) {
    console.error('Events get error:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving events' });
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      return res.json({ success: true, data: event });
    } else {
      const event = localEvents.find(e => e.id === id || e._id === id);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      return res.json({ success: true, data: event });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving event' });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register a participant for an event
// @access  Public / Optional Auth
router.post('/:id/register', async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, rollNumber, department, year, githubProfile } = req.body;

    if (!fullName || !email || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, University Email, and Roll Number are required for Chitkara verification'
      });
    }

    if (isMongoConnected()) {
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      if (event.registeredCount >= event.capacity) {
        return res.status(400).json({ success: false, message: 'This event is currently at full capacity!' });
      }

      // Check existing registration
      const existing = await Registration.findOne({ event: id, email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, message: 'You have already registered for this event!' });
      }

      const reg = new Registration({
        event: id,
        fullName,
        email: email.toLowerCase(),
        rollNumber,
        department: department || 'CSE',
        year: year || '2nd Year',
        githubProfile: githubProfile || ''
      });
      await reg.save();

      event.registeredCount += 1;
      await event.save();

      return res.status(201).json({
        success: true,
        message: `Registration confirmed for "${event.title}"! See you at Chitkara University.`,
        data: reg,
        updatedCount: event.registeredCount
      });
    } else {
      const eventIndex = localEvents.findIndex(e => e.id === id || e._id === id);
      if (eventIndex === -1) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }

      const event = localEvents[eventIndex];
      const alreadyReg = localRegistrations.some(r => r.eventId === id && r.email.toLowerCase() === email.toLowerCase());
      if (alreadyReg) {
        return res.status(400).json({ success: false, message: 'You have already registered for this event!' });
      }

      event.registeredCount = (event.registeredCount || 0) + 1;
      const newReg = {
        id: 'reg-' + Date.now(),
        eventId: id,
        eventTitle: event.title,
        fullName,
        email: email.toLowerCase(),
        rollNumber,
        department: department || 'CSE',
        year: year || '2nd Year',
        githubProfile: githubProfile || '',
        registeredAt: new Date()
      };
      localRegistrations.push(newReg);

      return res.status(201).json({
        success: true,
        message: `Registration confirmed for "${event.title}"! Confirmation sent to ${email}.`,
        data: newReg,
        updatedCount: event.registeredCount
      });
    }
  } catch (err) {
    console.error('Registration for event error:', err);
    res.status(500).json({ success: false, message: 'Server error processing registration' });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Protected (Team Heads/Admin only)
router.post('/', authMiddleware, headOnlyMiddleware, async (req, res) => {
  try {
    const { title, tagline, description, category, date, time, venue, capacity, image, prizes, tags } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ success: false, message: 'Title, description and date are required' });
    }

    if (isMongoConnected()) {
      const newEvent = new Event({
        title,
        tagline: tagline || '',
        description,
        category: category || 'Workshop',
        date,
        time: time || '05:00 PM - 07:30 PM',
        venue: venue || 'Turing Hall, Chitkara University',
        capacity: capacity || 150,
        image: image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        prizes: prizes || 'Certificates & Swags',
        tags: tags || ['Code2Chill']
      });

      await newEvent.save();
      return res.status(201).json({ success: true, data: newEvent });
    } else {
      const newEvt = {
        id: 'evt-' + Date.now(),
        title,
        tagline: tagline || '',
        description,
        category: category || 'Workshop',
        date,
        time: time || '05:00 PM - 07:30 PM',
        venue: venue || 'Newton Block, Chitkara University, Rajpura',
        status: 'upcoming',
        capacity: Number(capacity) || 150,
        registeredCount: 0,
        badge: 'Newly Added',
        image: image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        prizes: prizes || 'Certificates & Swag',
        tags: tags || ['Tech']
      };
      localEvents.unshift(newEvt);
      return res.status(201).json({ success: true, data: newEvt });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error creating event' });
  }
});

module.exports = router;
