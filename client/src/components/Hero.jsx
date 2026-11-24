import React from 'react';
import { Sparkles, Flame, Snowflake, ArrowRight, Instagram, Users, Zap, Trophy, Calendar, MapPin, Code2, ChevronDown } from 'lucide-react';

export default function Hero({ stats, onOpenJoin, onExploreEvents }) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden" id="about">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-red-600/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[400px] bg-cyan-500/8 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-purple-600/4 blur-[200px] rounded-full" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      </div>

      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="space-y-8 text-center lg:text-left">

            {/* University badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold shadow-lg backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500">
                <span className="animate-ping absolute h-2 w-2 rounded-full bg-red-400 opacity-75" />
              </span>
              <span className="text-red-400 font-bold tracking-widest">CHITKARA UNIVERSITY</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 tracking-wider">CODE2CHILL CLUB</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]">
                <span className="gradient-text-red">Code</span>{' '}
                <span className="text-white">With</span>
                <br />
                <span className="gradient-text-cyan">Passion.</span>
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mt-2 text-slate-300">
                Chill With Purpose.
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Chitkara University's premier student developer community — where passionate coders build real-world projects, crush hackathons, and grow together.
            </p>

            {/* Metric pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2 text-sm backdrop-blur-sm">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">{stats?.activeMembers || 100}+</span>
                <span className="text-slate-400">Members</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2 text-sm backdrop-blur-sm">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="text-white font-bold">{stats?.instagramFollowers || 350}+</span>
                <span className="text-slate-400">Followers</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-2 text-sm backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-white font-bold">12+</span>
                <span className="text-slate-400">Events</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={onOpenJoin} className="btn-primary text-base">
                <Sparkles className="w-5 h-5" />
                <span>Join Code2Chill</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onExploreEvents} className="btn-outline text-base">
                <Flame className="w-5 h-5 text-red-400" />
                <span>See Events</span>
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-slate-500 justify-center lg:justify-start">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>NH-64, Rajpura, Punjab 140401 — Chitkara University</span>
            </div>
          </div>

          {/* ── Right: Visual Card ── */}
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-px rounded-3xl animate-gradient-border opacity-30 blur-sm" />

            <div className="relative rounded-3xl bg-gradient-to-b from-[#0e1428] to-[#070a16] border border-slate-700/50 shadow-2xl p-7 space-y-5 overflow-hidden">
              {/* Top dots row */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800/70">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 mx-3 h-6 bg-slate-900/80 rounded-md flex items-center px-3">
                  <span className="text-[10px] text-slate-500 font-mono">code2chill.chitkara.edu.in</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Flagship Event */}
              <div className="rounded-2xl bg-gradient-to-br from-red-500/10 to-slate-900 border border-red-500/20 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-pill bg-red-500/15 border border-red-500/25 text-red-400">🏆 Flagship</span>
                  <span className="text-amber-300 font-bold text-xs">₹1,50,000 Prize</span>
                </div>
                <h3 className="text-base font-extrabold text-white leading-tight">ChillHack 2026 — 36hr National Hackathon</h3>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-cyan-400" /> April 18–20, 2026 • 36 Hours Non-Stop</div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-red-400" /> Turing Auditorium, Chitkara Univ Rajpura</div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-slate-500">Registrations: <span className="text-cyan-400 font-bold">64 / 150</span></div>
                  <button onClick={onExploreEvents} className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tech pillars */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'MERN', sub: 'Full Stack', color: 'text-cyan-400' },
                  { label: 'AI/ML', sub: 'GenAI & LLMs', color: 'text-purple-400' },
                  { label: 'DSA', sub: 'Competitive', color: 'text-red-400' }
                ].map(({ label, sub, color }) => (
                  <div key={label} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center hover:border-slate-700 transition-colors">
                    <div className={`text-sm font-black ${color}`}>{label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>

              {/* Join CTA ribbon */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-cyan-500/8 to-red-500/8 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                  Open to all Chitkara students — Free to join
                </div>
                <button onClick={onOpenJoin} className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap ml-3">
                  Apply →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <a href="#stats" className="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors group">
            <span className="text-xs font-medium">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
