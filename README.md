# ❄️ Code2Chill Club — Chitkara University, Rajpura (Punjab)

> **"Code with Passion, Chill with Purpose."**  
> Official MERN Stack Web Platform for **Code2Chill Club**, the premier student developer & tech innovation society at **Chitkara University (Punjab Campus), Rajpura**.

---

## 🌟 Key Features

- 👥 **Member Metrics & Community Pulse**:
  - **100+** Active Student Coders
  - **350+** Instagram Family Members
  - **12+** Hackathons & Tech Events Organized
  - **25+** Full-Stack & AI Projects Built
- 📅 **Flagship Events & Workshops**:
  - **ChillHack 2026**: 36-Hour National Hackathon (Turing Auditorium & Newton Block) with ₹1,50,000 Cash Pool.
  - **MERN Stack & Cloud Masterclass**: Hands-on fullstack deployment bootcamp.
  - **Code & Chill Algorithmic Duel 4.0**: Competitive coding challenge on Codeforces format.
  - Interactive RSVP / Event Registration system with capacity counters.
- 📸 **Instagram Community**:
  - Official Handle: [`@code2chill.osl`](https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==)
  - Direct follow button and verified club badge.
- 🛡️ **Core Leadership & Team Heads**:
  - **Lakshay Kalra** — President & Community Lead
  - **Jiya Arora** — Vice President & Operations Head
  - **Samanyu Thakur** — Technical Head
  - **Bhupinder Singh** — Technical Head
  - **Jashan Bhalla** — Social Media Head
  - **Ayush Sharma** — Content Head
  - **Tamanna Kakkar** — Content Head
- 🔐 **Authentication & Security**:
  - JSON Web Tokens (JWT) & `bcryptjs` password hashing.
  - Role-based permissions (`member`, `head`, `admin`).
- ⚡ **Full MERN Stack Architecture**:
  - **MongoDB**: Mongoose models for Users, Events, Stats, and Registrations with resilient in-memory fallback.
  - **Express.js**: RESTful API endpoints.
  - **React 18**: Built with Vite & Tailwind CSS.
  - **Node.js**: Asynchronous runtime.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root or `server` directory (see `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/code2chill?retryWrites=true&w=majority
JWT_SECRET=your_secret_jwt_key
NODE_ENV=development
```

### 3. Build & Start
```bash
# Build React frontend
cd client
npm run build

# Start the fullstack server
cd ../server
node server.js
```
Open **`http://localhost:5000`** in your browser.

---

## 📍 Campus Location

**Chitkara University (Punjab Campus)**  
Chandigarh-Patiala National Highway (NH-64)  
Rajpura, Punjab 140401, India  
Official Instagram: [@code2chill.osl](https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==)
