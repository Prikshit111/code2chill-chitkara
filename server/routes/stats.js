const express = require('express');
const router = express.Router();
const ClubStat = require('../models/ClubStat');
const seedData = require('../data/seedData');

let localStats = { ...seedData.stats };
let clubApplications = [];

const isMongoConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

// @route   GET /api/stats
// @desc    Get live club stats, info, and numbers
// @access  Public
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const dbStats = await ClubStat.findOne();
      if (dbStats) {
        return res.json({
          success: true,
          stats: dbStats,
          clubInfo: seedData.clubInfo
        });
      }
    }

    return res.json({
      success: true,
      stats: localStats,
      clubInfo: seedData.clubInfo
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving stats' });
  }
});

// @route   GET /api/stats/instagram
// @desc    Get club Instagram handle, profile stats and recent posts
// @access  Public
router.get('/instagram', (req, res) => {
  res.json({
    success: true,
    handle: seedData.clubInfo.instagramHandle,
    profileUrl: seedData.clubInfo.instagramUrl,
    followersCount: localStats.instagramFollowers,
    bio: '⚡ Official Tech & Coding Club of Chitkara University, Rajpura | Hackathons, Bootcamps & Chill Vibes 🚀',
    posts: seedData.instagramPosts
  });
});

// @route   POST /api/stats/join-club
// @desc    Submit application to join Code2Chill club
// @access  Public
router.post('/join-club', (req, res) => {
  try {
    const { fullName, email, rollNumber, department, year, interestDomain, whyJoin } = req.body;

    if (!fullName || !email || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Name, Chitkara email, and roll number are required'
      });
    }

    const application = {
      id: 'app-' + Date.now(),
      fullName,
      email: email.toLowerCase(),
      rollNumber,
      department: department || 'CSE',
      year: year || '1st Year',
      interestDomain: interestDomain || 'Web Development',
      whyJoin: whyJoin || 'Passionate about coding and tech events',
      appliedAt: new Date()
    };

    clubApplications.push(application);
    localStats.activeMembers += 1;

    res.status(201).json({
      success: true,
      message: `Thanks ${fullName}! Your application to join Code2Chill Club has been received. Check your Chitkara email for orientation details.`,
      application
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error submitting application' });
  }
});

module.exports = router;
