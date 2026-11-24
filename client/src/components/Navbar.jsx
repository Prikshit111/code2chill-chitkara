import React, { useState } from 'react';
import { Terminal, Snowflake, Flame, User, LogOut, Menu, X, Instagram, ChevronRight, Award } from 'lucide-react';

export default function Navbar({ currentUser, onOpenAuth, onOpenJoin, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & University Affiliation */}
          <a href="#" className="flex items-center gap-3 group text-decoration-none">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 via-rose-500 to-cyan-400 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-red-500/20">
              <div className="w-full h-full bg-[#0B0F1E] rounded-[10px] flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Code<span className="text-red-500">2</span>Chill
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/30 rounded">
                  CU
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide flex items-center gap-1">
                <span>Chitkara University</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">Rajpura, Punjab</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#stats" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Members & Stats
            </a>
            <a href="#events" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Events
            </a>
            <a href="#team" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Team Heads
            </a>
            <a href="https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-300 hover:text-pink-400 transition-colors flex items-center gap-1.5">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>@code2chill.osl</span>
            </a>
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-500 to-cyan-400 flex items-center justify-center font-bold text-xs text-white">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left text-xs">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <span>{currentUser.name}</span>
                    {currentUser.role === 'head' && (
                      <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-bold">
                        Lead
                      </span>
                    )}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {currentUser.rollNumber || 'Chitkara Student'}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="text-sm font-semibold bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </button>
              </>
            )}

            <button
              onClick={onOpenJoin}
              className="btn-primary text-xs uppercase tracking-wider !py-2 !px-4"
            >
              <span>Join Club</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 space-y-3 bg-[#0B0F1E] rounded-b-xl px-4 pb-6 mt-1">
            <nav className="flex flex-col space-y-2">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white py-2 font-medium"
              >
                About
              </a>
              <a
                href="#stats"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white py-2 font-medium"
              >
                Members & Stats
              </a>
              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white py-2 font-medium"
              >
                Events
              </a>
              <a
                href="#team"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white py-2 font-medium"
              >
                Team Heads
              </a>
              <a
                href="https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag=="
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-pink-400 hover:text-pink-300 py-2 font-medium flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram @code2chill.osl</span>
              </a>
            </nav>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              {currentUser ? (
                <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg">
                  <div>
                    <div className="text-sm font-bold text-white">{currentUser.name}</div>
                    <div className="text-xs text-slate-400">{currentUser.rollNumber}</div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-3 py-1.5 rounded"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-sm font-semibold bg-slate-800 text-white rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('register');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-center text-sm font-semibold bg-slate-700 text-white rounded-lg"
                  >
                    Register
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  onOpenJoin();
                  setMobileMenuOpen(false);
                }}
                className="btn-primary w-full justify-center text-center mt-2"
              >
                Join Code2Chill Club
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
