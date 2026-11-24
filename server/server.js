const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Ensure .env is loaded whether run from root or server directory
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const teamRoutes = require('./routes/team');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/code2chill';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/stats', statsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    club: 'Code2Chill',
    university: 'Chitkara University, Rajpura, Punjab',
    database: isDbConnected ? 'Connected (MongoDB Atlas)' : 'In-Memory Resilient Store',
    mongoUriConfigured: Boolean(process.env.MONGO_URI),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production build with no-cache headers so browser always sees latest updates
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath, {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Code2Chill API - Chitkara University</title>
          <style>
            body { background: #0B0F19; color: #F3F4F6; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
            .card { background: #131B2E; padding: 2.5rem; border-radius: 1rem; border: 1px solid #1E293B; max-width: 520px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            h1 { color: #FF334B; margin-bottom: 0.5rem; }
            p { color: #94A3B8; line-height: 1.6; }
            .badge { display: inline-block; background: rgba(255,51,75,0.15); color: #FF334B; padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
            a { color: #00F0FF; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">Chitkara University, Rajpura</span>
            <h1>Code2Chill Backend API</h1>
            <p>The MERN API server is active and responding.</p>
            <p>API status: <a href="/api/health">/api/health</a> | Events: <a href="/api/events">/api/events</a> | Team: <a href="/api/team">/api/team</a></p>
          </div>
        </body>
        </html>
      `);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// Attach connection error listener so DNS/network drop doesn't crash the server
mongoose.connection.on('error', (err) => {
  console.warn('⚠️ MongoDB connection error event:', err.message);
});

// Connect to MongoDB
if (MONGO_URI) {
  console.log('Attempting MongoDB connection to:', MONGO_URI.replace(/:([^:@]+)@/, ':****@'));
  mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  }).then(() => {
    console.log('✅ MongoDB connected successfully to database!');
  }).catch((err) => {
    console.warn('⚠️ MongoDB connection failed (' + err.message + ').');
    console.warn('💡 Using resilient in-memory fallback. All APIs and auth remain 100% active.');
  });
}

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Code2Chill Club - Chitkara University Rajpura`);
  console.log(` MERN Stack Backend Server running on port ${PORT}`);
  console.log(` Website:    http://localhost:${PORT}`);
  console.log(` API Health: http://localhost:${PORT}/api/health`);
  console.log(` Events API: http://localhost:${PORT}/api/events`);
  console.log(` Team Heads: http://localhost:${PORT}/api/team`);
  console.log(` Club Stats: http://localhost:${PORT}/api/stats`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use by another running instance or process.`);
    console.error(`💡 Quick fix in PowerShell:`);
    console.error(`   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
