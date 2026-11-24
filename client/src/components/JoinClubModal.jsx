import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function JoinClubModal({ isOpen, onClose, onClubJoined }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNumber: '',
    department: 'CSE',
    year: '1st Year',
    interestDomain: 'Web Development & MERN',
    whyJoin: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.submitJoinApplication(formData);
      if (res.success) {
        setSuccess(true);
        if (onClubJoined) onClubJoined();
      } else {
        setErrorMsg(res.message || 'Application submission failed');
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 blur-[80px] pointer-events-none rounded-full" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Welcome to the Squad!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              Your application to join <strong className="text-cyan-400">Code2Chill Club</strong> at Chitkara University Rajpura has been registered. You'll receive our Discord and WhatsApp invite link shortly.
            </p>
            <button
              onClick={onClose}
              className="btn-chill w-full justify-center !py-2.5"
            >
              Start Chilling & Coding
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHITKARA UNIVERSITY RAJPURA</span>
              </div>
              <h3 className="text-2xl font-black text-white">Join Code2Chill Club</h3>
              <p className="text-xs text-slate-400 mt-1">
                Be a part of 920+ coders building real projects, hacking together, and having fun.
              </p>
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
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Chitkara Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="rollno@chitkara.edu.in"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Branch</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="CSE / CCE / IT"
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Interest Domain</label>
                <select
                  name="interestDomain"
                  value={formData.interestDomain}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Web Development & MERN">Web Development & MERN Stack</option>
                  <option value="Artificial Intelligence & Machine Learning">AI & Machine Learning</option>
                  <option value="Competitive Programming & DSA">Competitive Programming & DSA</option>
                  <option value="UI/UX & Graphic Design">UI/UX & Product Design</option>
                  <option value="Event Operations & Public Relations">Event Operations & PR</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Why do you want to join Code2Chill?</label>
                <textarea
                  rows="2"
                  name="whyJoin"
                  placeholder="Tell us what you want to learn or build with us!"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-chill w-full justify-center !py-3 text-xs uppercase tracking-wider font-bold mt-2"
              >
                {loading ? 'Submitting Application...' : 'Submit Club Application'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
