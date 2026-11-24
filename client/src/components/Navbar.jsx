import React, { useState } from 'react';
import { Snowflake, Flame, User, LogOut, Menu, X, Instagram, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stats', href: '#stats' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Instagram', href: '#instagram' },
];

export default function Navbar({ currentUser, onOpenAuth, onOpenJoin, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 via-rose-500 to-cyan-400 p-[2px] group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-red-500/20">
              <div className="w-full h-full bg-[#04060f] rounded-[10px] flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-cyan-400" style={{ animation: 'spin 12s linear infinite' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Code<span className="text-red-500">2</span>Chill
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/25 rounded">CU</span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-wide">Chitkara University • Rajpura, Punjab</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-500 to-cyan-400 flex items-center justify-center font-bold text-xs text-white shrink-0">
                  {currentUser.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-white">{currentUser.name}</div>
                  <div className="text-slate-500 text-[11px]">{currentUser.rollNumber || 'Chitkara Student'}</div>
                </div>
                <button onClick={onLogout} title="Logout"
                  className="ml-1 p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => onOpenAuth('login')}
                  className="text-sm font-semibold text-slate-400 hover:text-white px-3 py-2 transition-colors">
                  Sign In
                </button>
                <button onClick={() => onOpenAuth('register')}
                  className="text-sm font-semibold bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2 rounded-xl transition-colors">
                  Register
                </button>
              </>
            )}

            <button onClick={onOpenJoin} className="btn-primary text-xs !py-2.5 !px-5">
              <span>Join Club</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-400 hover:text-white" aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-5 border-t border-slate-800/60 space-y-1 pb-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setOpen(false)}
                className="block px-2 py-2.5 text-slate-300 hover:text-white font-medium transition-colors rounded-lg hover:bg-slate-900/60">
                {label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-800/60 space-y-2">
              {currentUser ? (
                <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl">
                  <div>
                    <div className="text-sm font-bold text-white">{currentUser.name}</div>
                    <div className="text-xs text-slate-500">{currentUser.rollNumber}</div>
                  </div>
                  <button onClick={() => { onLogout(); setOpen(false); }}
                    className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { onOpenAuth('login'); setOpen(false); }}
                    className="py-3 text-sm font-semibold bg-slate-800 text-white rounded-xl">
                    Sign In
                  </button>
                  <button onClick={() => { onOpenAuth('register'); setOpen(false); }}
                    className="py-3 text-sm font-semibold bg-slate-700 text-white rounded-xl">
                    Register
                  </button>
                </div>
              )}
              <button onClick={() => { onOpenJoin(); setOpen(false); }}
                className="btn-primary w-full justify-center">
                Join Code2Chill Club
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
