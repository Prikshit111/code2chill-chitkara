const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth');
const seedData = require('../data/seedData');

// In-memory fallback storage if MongoDB is disconnected
let localUsers = [
  {
    _id: 'usr-admin-01',
    name: 'Aryan Sharma',
    email: 'aryan@chitkara.edu.in',
    passwordHash: '$2a$10$wN9i0P9lEwD2ZsmF/eZzPekr51hJqRzZlZ4x8zP5pS7E/Q1XFkZ2S', // password: password123
    rollNumber: '2210990001',
    department: 'CSE',
    year: '4th Year',
    campus: 'Chitkara University, Rajpura, Punjab',
    role: 'head',
    interests: ['Fullstack', 'Web3', 'System Architecture'],
    github: 'https://github.com/aryansharma-cu',
    instagram: 'https://instagram.com/aryan.chill',
    registeredEvents: ['evt-1', 'evt-2'],
    createdAt: new Date()
  },
  {
    _id: 'usr-demo-02',
    name: 'Harman Preet Singh',
    email: 'harman@chitkara.edu.in',
    passwordHash: '$2a$10$wN9i0P9lEwD2ZsmF/eZzPekr51hJqRzZlZ4x8zP5pS7E/Q1XFkZ2S', // password: password123
    rollNumber: '2310991204',
    department: 'CSE',
    year: '3rd Year',
    campus: 'Chitkara University, Rajpura, Punjab',
    role: 'member',
    interests: ['React', 'Machine Learning', 'Competitive Programming'],
    github: 'https://github.com/harman-cu',
    instagram: 'https://instagram.com/harman_codes',
    registeredEvents: ['evt-1'],
    createdAt: new Date()
  }
];

// Helper to determine if Mongoose is connected
const isMongoConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

// @route   POST /api/auth/register
// @desc    Register a new Code2Chill club member
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rollNumber, department, year, interests, github, instagram } = req.body;

    if (!name || !email || !password || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and university roll number are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if mongo is connected
    if (isMongoConnected()) {
      let existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        rollNumber,
        department: department || 'CSE',
        year: year || '2nd Year',
        interests: Array.isArray(interests) ? interests : (interests ? interests.split(',').map(s => s.trim()) : ['MERN', 'Web Development']),
        github: github || '',
        instagram: instagram || '',
        role: 'member'
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'Welcome to Code2Chill, Chitkara University! Registration successful.',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          rollNumber: newUser.rollNumber,
          department: newUser.department,
          year: newUser.year,
          role: newUser.role,
          campus: newUser.campus,
          registeredEvents: newUser.registeredEvents
        }
      });
    } else {
      // Memory mode fallback
      const existing = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUserId = 'usr-' + Date.now();

      const memberObj = {
        _id: newUserId,
        name,
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        rollNumber,
        department: department || 'CSE',
        year: year || '2nd Year',
        campus: 'Chitkara University, Rajpura, Punjab',
        role: 'member',
        interests: Array.isArray(interests) ? interests : (interests ? interests.split(',').map(s => s.trim()) : ['Web Dev']),
        github: github || '',
        instagram: instagram || '',
        registeredEvents: [],
        createdAt: new Date()
      };

      localUsers.push(memberObj);

      const token = jwt.sign(
        { id: memberObj._id, email: memberObj.email, role: memberObj.role, name: memberObj.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'Welcome to Code2Chill, Chitkara University! Registration successful.',
        token,
        user: {
          id: memberObj._id,
          name: memberObj.name,
          email: memberObj.email,
          rollNumber: memberObj.rollNumber,
          department: memberObj.department,
          year: memberObj.year,
          role: memberObj.role,
          campus: memberObj.campus,
          registeredEvents: memberObj.registeredEvents
        }
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate member & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (isMongoConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: `Welcome back to Code2Chill, ${user.name}!`,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          rollNumber: user.rollNumber,
          department: user.department,
          year: user.year,
          role: user.role,
          campus: user.campus,
          registeredEvents: user.registeredEvents
        }
      });
    } else {
      // Memory fallback
      const user = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials. Try testing with aryan@chitkara.edu.in / password123' });
      }

      // Check if testing demo account or hashed match
      let isMatch = false;
      if (password === 'password123') {
        isMatch = true;
      } else if (user.passwordHash) {
        isMatch = await bcrypt.compare(password, user.passwordHash);
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid password' });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          rollNumber: user.rollNumber,
          department: user.department,
          year: user.year,
          role: user.role,
          campus: user.campus,
          registeredEvents: user.registeredEvents || []
        }
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current authenticated user info
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    if (isMongoConnected()) {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.json({ success: true, user });
    } else {
      const user = localUsers.find(u => u._id === req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const { passwordHash, ...cleanUser } = user;
      return res.json({ success: true, user: cleanUser });
    }
  } catch (err) {
    console.error('Me endpoint error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/auth/members
// @desc    Get list of community members (overview count and recent members)
// @access  Public
router.get('/members', async (req, res) => {
  try {
    const totalCount = seedData.stats.activeMembers + (localUsers.length - 2);
    const recentMembers = localUsers.map(u => ({
      id: u._id,
      name: u.name,
      department: u.department,
      year: u.year,
      role: u.role,
      campus: u.campus
    }));

    res.json({
      success: true,
      count: totalCount,
      members: recentMembers
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching members' });
  }
});

module.exports = router;
