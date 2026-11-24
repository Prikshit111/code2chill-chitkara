const API_BASE = '/api';

// Retrieve auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('c2c_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Stats & Info
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    return res.json();
  },

  async getInstagramData() {
    const res = await fetch(`${API_BASE}/stats/instagram`);
    return res.json();
  },

  async submitJoinApplication(formData) {
    const res = await fetch(`${API_BASE}/stats/join-club`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return res.json();
  },

  // Events
  async getEvents(status, category) {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (category && category !== 'all') params.append('category', category);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/events${query}`);
    return res.json();
  },

  async registerForEvent(eventId, registrationData) {
    const res = await fetch(`${API_BASE}/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(registrationData)
    });
    return res.json();
  },

  // Team Heads
  async getTeamHeads(domain) {
    const query = domain && domain !== 'all' ? `?domain=${encodeURIComponent(domain)}` : '';
    const res = await fetch(`${API_BASE}/team${query}`);
    return res.json();
  },

  async uploadTeamPhoto(teamId, imageBase64) {
    const res = await fetch(`${API_BASE}/team/${teamId}/photo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 })
    });
    return res.json();
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  async getCurrentUser() {
    const token = localStorage.getItem('c2c_token');
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Token invalid');
      return res.json();
    } catch {
      localStorage.removeItem('c2c_token');
      localStorage.removeItem('c2c_user');
      return null;
    }
  }
};
