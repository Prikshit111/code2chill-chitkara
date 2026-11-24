import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function EventRegisterModal({ isOpen, onClose, event, currentUser, onRegistrationSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    rollNumber: currentUser?.rollNumber || '',
    department: currentUser?.department || 'CSE',
    year: currentUser?.year || '2nd Year',
    githubProfile: ''
  });

  if (!isOpen || !event) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.registerForEvent(event.id || event._id, formData);
      if (res.success) {
        setSuccessData(res);
        onRegistrationSuccess(event.id || event._id);
      } else {
        setErrorMsg(res.message || 'Registration failed');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D1224] border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 blur-[80px] pointer-events-none rounded-full" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">You're Registered!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-4">
              Your seat for <strong className="text-cyan-400">"{event.title}"</strong> is confirmed at Chitkara University.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Attendee:</span>
                <span className="text-white font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Roll Number:</span>
                <span className="text-white font-medium">{formData.rollNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Venue:</span>
                <span className="text-red-400 font-medium">{event.venue}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Date & Time:</span>
                <span className="text-cyan-400 font-medium">{event.date} • {event.time}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-primary w-full justify-center !py-2.5"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold uppercase">
                {event.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-2 leading-snug">
                Register for {event.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-red-400 truncate">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.venue}
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Gurpreet Singh"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Chitkara Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@chitkara.edu.in"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    required
                    placeholder="231099xxxx"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Branch / Department</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="CSE / IT"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub / Portfolio URL (Optional)</label>
                <input
                  type="text"
                  name="githubProfile"
                  placeholder="https://github.com/username"
                  value={formData.githubProfile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center !py-3 font-bold text-xs uppercase tracking-wider mt-2"
              >
                {loading ? 'Confirming Ticket...' : 'Confirm RSVP & Register'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
