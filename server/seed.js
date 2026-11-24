const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('./models/User');
const Event = require('./models/Event');
const TeamMember = require('./models/TeamMember');
const ClubStat = require('./models/ClubStat');
const seedData = require('./data/seedData');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/code2chill';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Purging old data...');

    await User.deleteMany({});
    await Event.deleteMany({});
    await TeamMember.deleteMany({});
    await ClubStat.deleteMany({});

    console.log('Seeding Club Stats...');
    await ClubStat.create(seedData.stats);

    console.log('Seeding Team Heads...');
    const teamPromises = seedData.teamHeads.map(t => TeamMember.create(t));
    await Promise.all(teamPromises);

    console.log('Seeding Events...');
    const eventPromises = seedData.events.map(e => Event.create(e));
    await Promise.all(eventPromises);

    console.log('Seeding Demo Users...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await User.create([
      {
        name: 'Aryan Sharma',
        email: 'aryan@chitkara.edu.in',
        password: hashedPassword,
        rollNumber: '2210990001',
        department: 'CSE',
        year: '4th Year',
        role: 'head',
        interests: ['Fullstack', 'Web3', 'System Architecture'],
        github: 'https://github.com/aryansharma-cu',
        instagram: 'https://instagram.com/aryan.chill'
      },
      {
        name: 'Sneha Kapoor',
        email: 'sneha@chitkara.edu.in',
        password: hashedPassword,
        rollNumber: '2210990045',
        department: 'CSE',
        year: '4th Year',
        role: 'head',
        interests: ['Hackathons', 'Cloud', 'DevOps'],
        github: 'https://github.com/snehakapoor',
        instagram: 'https://instagram.com/sneha_codes'
      },
      {
        name: 'Student Member',
        email: 'member@chitkara.edu.in',
        password: hashedPassword,
        rollNumber: '2310992310',
        department: 'CSE',
        year: '2nd Year',
        role: 'member',
        interests: ['MERN', 'AI/ML'],
        github: 'https://github.com',
        instagram: 'https://instagram.com'
      }
    ]);

    console.log('Database seeded successfully for Code2Chill Chitkara University!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();
