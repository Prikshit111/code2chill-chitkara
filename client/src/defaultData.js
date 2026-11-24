export const DEFAULT_STATS = {
  activeMembers: 100,
  eventsOrganized: 12,
  projectsShipped: 25,
  hackathonsWon: 8,
  workshopsConducted: 6,
  instagramFollowers: 350
};

export const DEFAULT_TEAM_HEADS = [
  {
    id: 'team-1',
    name: 'Lakshay Kalra',
    role: 'President',
    domain: 'Lead',
    campus: 'Chitkara University, Rajpura',
    initials: 'LK',
    bio: 'The backbone and the mastermind of Code2Chill, a leader and visionary that strives to take technical innovation to new heights.',
    linkedin: 'https://www.linkedin.com/in/lakshay-kalra-5667ba387?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 1
  },
  {
    id: 'team-2',
    name: 'Jiya Arora',
    role: 'Vice President',
    domain: 'Lead',
    campus: 'Chitkara University, Rajpura',
    initials: 'JA',
    bio: 'The Universal support pillar and the one that makes sure code2chill runs smoothly with no bugs in the system 😉',
    linkedin: 'https://www.linkedin.com/in/jiya-arora-13b214377?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 2
  },
  {
    id: 'team-3',
    name: 'Samanyu Thakur',
    role: 'Technical Head',
    domain: 'Technical',
    campus: 'Chitkara University, Rajpura',
    initials: 'ST',
    bio: 'A Beast in the technical field with vast knowledge over the great spread of technical skills and a mentor that makes learning and refinement feel like a breeze.',
    linkedin: 'https://www.linkedin.com/in/samanyu-thakur-76622b386?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 3
  },
  {
    id: 'team-4',
    name: 'Bhupinder Singh',
    role: 'Technical Head',
    domain: 'Technical',
    campus: 'Chitkara University, Rajpura',
    initials: 'BS',
    bio: 'The epitome of discipline with technical knowledge that spans into the unknown, a proof that hard work and consistency never goes to waste.',
    linkedin: 'https://www.linkedin.com/in/bhupindersinghmann?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 4
  },
  {
    id: 'team-5',
    name: 'Jashan Bhalla',
    role: 'Social Media Head',
    domain: 'Social Media & PR',
    campus: 'Chitkara University, Rajpura',
    initials: 'JB',
    bio: 'The sunshine of code2chill, the man behind the camera making sure that Code2Chill always shines brightest in every way possible.',
    linkedin: 'https://www.linkedin.com/in/jashan-bhalla-7b6539213?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 5
  },
  {
    id: 'team-6',
    name: 'Ayush Sharma',
    role: 'Content Head',
    domain: 'Content & Creative',
    campus: 'Chitkara University, Rajpura',
    initials: 'AS',
    bio: 'Mastermind of all our ideas, the one that combines creativity with his extensive technical knowledge to make sure "Code" and "Chill" always go hand in hand',
    linkedin: 'https://www.linkedin.com/in/ayushthisside?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 6
  },
  {
    id: 'team-7',
    name: 'Tamanna Kakkar',
    role: 'Content Head',
    domain: 'Content & Creative',
    campus: 'Chitkara University, Rajpura',
    initials: 'TK',
    bio: 'A beautiful combination of wits and creativity that makes sure that code2chill always stays ahead of the game and that every event is a massive success',
    linkedin: 'https://www.linkedin.com/in/tamanna-kakkar-995b73385?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 7
  },
  {
    id: 'team-8',
    name: 'Prikshit Goel',
    role: 'Technical Team Member',
    domain: 'Technical',
    campus: 'Chitkara University, Rajpura',
    initials: 'PG',
    bio: 'A dedicated technical contributor at Code2Chill, passionate about building full-stack solutions and driving innovation in the developer community at Chitkara University.',
    linkedin: 'https://www.linkedin.com/in/prikshit-goel',
    instagram: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
    order: 8
  }
];

export const DEFAULT_EVENTS = [
  {
    id: 'event-1',
    title: 'ChillHack 2026: 36-Hour National Hackathon',
    description: 'Chitkara University\'s flagship national annual hackathon. Build next-generation AI, Web3, and Cloud solutions with mentors from top tech companies.',
    date: '2026-03-20T09:00:00.000Z',
    endDate: '2026-03-21T21:00:00.000Z',
    venue: 'Exploratorium Auditorium, Chitkara University, Rajpura Punjab',
    mode: 'offline',
    category: 'hackathon',
    status: 'upcoming',
    capacity: 200,
    registeredCount: 142,
    prizePool: '₹1,50,000 + Internship Opportunities',
    badge: 'Flagship Event',
    tags: ['Hackathon', 'AI/ML', 'Web3', 'Open Innovation']
  },
  {
    id: 'event-2',
    title: 'Full-Stack MERN & Cloud Bootcamp',
    description: 'Zero to hero intensive weekend bootcamp covering MongoDB, Express, React 18, Node.js, and Dockerized cloud deployment.',
    date: '2026-02-15T10:00:00.000Z',
    endDate: '2026-02-16T17:00:00.000Z',
    venue: 'Lab Complex B, Chitkara University & Live Stream',
    mode: 'hybrid',
    category: 'bootcamp',
    status: 'upcoming',
    capacity: 120,
    registeredCount: 98,
    prizePool: 'Verified Certificates + GitHub Swag',
    badge: 'Hands-on Bootcamp',
    tags: ['React', 'Node.js', 'MongoDB', 'FullStack']
  },
  {
    id: 'event-3',
    title: 'Algorithmic Duel: Speed DSA Contest',
    description: 'Fast-paced live competitive programming challenge with LeetCode hard problems, testing DSA, dynamic programming, and problem solving.',
    date: '2026-01-20T14:00:00.000Z',
    endDate: '2026-01-20T17:00:00.000Z',
    venue: 'CodeChef Campus Arena',
    mode: 'online',
    category: 'contest',
    status: 'completed',
    capacity: 150,
    registeredCount: 150,
    prizePool: '₹25,000 Cash + Code2Chill Gold Badges',
    badge: 'Completed',
    tags: ['DSA', 'Competitive Programming', 'Algorithms']
  }
];

export const DEFAULT_INSTAGRAM = {
  handle: '@code2chill.osl',
  url: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==',
  followers: 350,
  recentPosts: [
    {
      id: 'ig-1',
      caption: 'ChillHack 2026 registrations are officially live! Grab your spot and build real solutions. Link in bio! 🚀❄️ #Code2Chill #ChitkaraUniversity',
      likes: 184,
      comments: 29,
      timestamp: '2 hours ago',
      type: 'announcement',
      url: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag=='
    },
    {
      id: 'ig-2',
      caption: 'Behind the scenes with our core team heads planning upcoming bootcamps and tech tracks. Stay chilled, keep shipping! 💻✨',
      likes: 246,
      comments: 42,
      timestamp: '1 day ago',
      type: 'community',
      url: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag=='
    },
    {
      id: 'ig-3',
      caption: 'Reliving the adrenaline rush from our last Algorithmic Duel! 150+ Chitkara coders battling it out till the final minute. 🏆',
      likes: 312,
      comments: 53,
      timestamp: '3 days ago',
      type: 'recap',
      url: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag=='
    }
  ]
};
