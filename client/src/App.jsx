import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import EventsSection from './components/EventsSection';
import TeamHeadsSection from './components/TeamHeadsSection';
import InstagramSection from './components/InstagramSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import EventRegisterModal from './components/EventRegisterModal';
import JoinClubModal from './components/JoinClubModal';
import { api } from './services/api';
import { Snowflake, Terminal, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [instagramData, setInstagramData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [registerEventModalOpen, setRegisterEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Initial Data Fetching from Backend
  useEffect(() => {
    const initApp = async () => {
      try {
        // Check stored user
        const storedUser = localStorage.getItem('c2c_user');
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch (e) {
            console.error(e);
          }
        }

        // Fetch API endpoints in parallel
        const [statsRes, eventsRes, teamRes, igRes] = await Promise.allSettled([
          api.getStats(),
          api.getEvents(),
          api.getTeamHeads(),
          api.getInstagramData()
        ]);

        if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
          setStats(statsRes.value.stats);
        }
        if (eventsRes.status === 'fulfilled' && eventsRes.value?.success) {
          setEvents(eventsRes.value.data);
        }
        if (teamRes.status === 'fulfilled' && teamRes.value?.success) {
          setTeamMembers(teamRes.value.data);
        }
        if (igRes.status === 'fulfilled' && igRes.value?.success) {
          setInstagramData(igRes.value);
        }
      } catch (err) {
        console.error('Data load error:', err);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome ${user.name}! Successfully signed in.`);
  };

  const handleLogout = () => {
    localStorage.removeItem('c2c_token');
    localStorage.removeItem('c2c_user');
    setCurrentUser(null);
    showToast('Signed out successfully.');
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setRegisterEventModalOpen(true);
  };

  const handleRegistrationSuccess = (eventId) => {
    // Refresh events from backend to update registeredCount
    api.getEvents().then(res => {
      if (res.success) setEvents(res.data);
    });
    showToast('Ticket confirmed! Details sent to your Chitkara email.');
  };

  const handleClubJoined = () => {
    api.getStats().then(res => {
      if (res.success) setStats(res.stats);
    });
    showToast('Welcome to Code2Chill Club, Chitkara University!');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col selection:bg-red-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 border border-cyan-500/40 text-cyan-300 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenJoin={() => setJoinModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero
          stats={stats}
          onOpenJoin={() => setJoinModalOpen(true)}
          onExploreEvents={() => {
            const el = document.getElementById('events');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <StatsCounter stats={stats} />

        <EventsSection
          events={events}
          onSelectEventForRegistration={handleSelectEvent}
        />

        <TeamHeadsSection teamMembers={teamMembers} />

        <InstagramSection instagramData={instagramData} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <EventRegisterModal
        isOpen={registerEventModalOpen}
        event={selectedEvent}
        currentUser={currentUser}
        onClose={() => setRegisterEventModalOpen(false)}
        onRegistrationSuccess={handleRegistrationSuccess}
      />

      <JoinClubModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onClubJoined={handleClubJoined}
      />

    </div>
  );
}
