const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { authMiddleware, headOnlyMiddleware } = require('../middleware/auth');
const seedData = require('../data/seedData');

let localTeam = JSON.parse(JSON.stringify(seedData.teamHeads));

const isMongoConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

// @route   GET /api/team
// @desc    Get all club team heads and core leadership
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { domain } = req.query;

    if (isMongoConnected()) {
      let query = {};
      if (domain && domain !== 'all') {
        query.domain = domain;
      }
      const team = await TeamMember.find(query).sort({ order: 1 });
      return res.json({ success: true, count: team.length, data: team });
    } else {
      let list = [...localTeam];
      if (domain && domain !== 'all') {
        list = list.filter(m => m.domain.toLowerCase() === domain.toLowerCase());
      }
      list.sort((a, b) => a.order - b.order);
      return res.json({ success: true, count: list.length, data: list });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving team heads' });
  }
});

// @route   GET /api/team/:id
// @desc    Get single team head
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected()) {
      const member = await TeamMember.findById(id);
      if (!member) return res.status(404).json({ success: false, message: 'Team head not found' });
      return res.json({ success: true, data: member });
    } else {
      const member = localTeam.find(m => m.id === id || m._id === id);
      if (!member) return res.status(404).json({ success: false, message: 'Team head not found' });
      return res.json({ success: true, data: member });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/team
// @desc    Add a team lead member
// @access  Protected
router.post('/', authMiddleware, headOnlyMiddleware, async (req, res) => {
  try {
    const { name, role, domain, avatar, bio, batch, instagram, linkedin, github, email } = req.body;
    if (!name || !role) {
      return res.status(400).json({ success: false, message: 'Name and role are required' });
    }

    if (isMongoConnected()) {
      const newMember = new TeamMember({
        name,
        role,
        domain: domain || 'Technical',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: bio || '',
        batch: batch || 'Batch of 2023-2027, Chitkara University',
        instagram: instagram || '',
        linkedin: linkedin || '',
        github: github || '',
        email: email || '',
        order: localTeam.length + 1
      });
      await newMember.save();
      return res.status(201).json({ success: true, data: newMember });
    } else {
      const mem = {
        id: 'team-' + Date.now(),
        name,
        role,
        domain: domain || 'Technical',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: bio || '',
        batch: batch || 'Batch of 2023-2027, Chitkara University',
        campus: 'Chitkara University, Rajpura',
        instagram: instagram || '',
        linkedin: linkedin || '',
        github: github || '',
        email: email || '',
        order: localTeam.length + 1
      };
      localTeam.push(mem);
      return res.status(201).json({ success: true, data: mem });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error adding team member' });
  }
});

// @route   POST /api/team/:id/photo
// @desc    Upload photo for a team head
// @access  Public
const fs = require('fs');
const path = require('path');

router.post('/:id/photo', (req, res) => {
  try {
    const { id } = req.params;
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, message: 'Image data required' });
    }

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filename = `${id}.jpg`;

    const publicPath = path.join(__dirname, '../../client/public/team', filename);
    const distPath = path.join(__dirname, '../../client/dist/team', filename);

    fs.mkdirSync(path.dirname(publicPath), { recursive: true });
    fs.writeFileSync(publicPath, buffer);

    try {
      fs.mkdirSync(path.dirname(distPath), { recursive: true });
      fs.writeFileSync(distPath, buffer);
    } catch (e) {}

    const avatarUrl = `/team/${filename}?t=${Date.now()}`;

    const member = localTeam.find(m => m.id === id || m._id === id);
    if (member) {
      member.avatar = avatarUrl;
    }

    return res.json({ success: true, avatarUrl, message: 'Photo updated successfully!' });
  } catch (err) {
    console.error('Photo upload error:', err);
    return res.status(500).json({ success: false, message: 'Failed to save photo' });
  }
});

module.exports = router;
