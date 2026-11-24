import React from 'react';
import { Sparkles, Flame, Snowflake, ArrowRight, Instagram, Users, Laptop, Trophy, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Hero({ stats, onOpenJoin, onExploreEvents }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden" id="about">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Chitkara University Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400 font-bold">CHITKARA UNIVERSITY</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">Rajpura, Punjab</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-mono">CODE2CHILL CLUB</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Code With <span className="gradient-text-red">Passion</span>,<br />
              Chill With <span className="gradient-text-cyan">Purpose</span>.
            </h1>

            {/* Sub-headline / description */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Welcome to <span className="text-white font-semibold">Code2Chill</span> — Chitkara University's vibrant community of passionate coders, developers, and innovators. We organize state-of-the-art hackathons, intensive MERN stack workshops, and chill coding meetups right here on the Rajpura campus.
            </p>

            {/* Quick Metrics Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                <Users className="w-4 h-4 text-cyan-400" />
                <span><strong className="text-white font-bold">{stats?.activeMembers || '100'}+</strong> Active Members</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                <Laptop className="w-4 h-4 text-red-400" />
                <span><strong className="text-white font-bold">MERN & Cloud</strong> Driven</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span><strong className="text-white font-bold">@code2chill.osl</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenJoin}
                className="btn-primary w-full sm:w-auto text-base !py-3.5 !px-7 shadow-lg shadow-red-600/25"
              >
                <span>Join Code2Chill Club</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreEvents}
                className="btn-chill w-full sm:w-auto text-base !py-3.5 !px-6"
              >
                <span>Explore Events</span>
                <Flame className="w-5 h-5 text-red-600" />
              </button>

              <a
                href="https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag=="
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full sm:w-auto text-sm !py-3.5 !px-5 text-slate-300 hover:text-white"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@code2chill.osl</span>
              </a>
            </div>

            {/* University Tagline Footer */}
            <div className="text-xs text-slate-400 pt-2 flex items-center justify-center lg:justify-start gap-2">
              <span>📍 Chandigarh-Patiala National Highway (NH-64), Rajpura, Punjab 140401</span>
            </div>
          </div>

          {/* Right Column - Visual Showcase Card (Code Block Replaced) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-500 via-rose-600 to-cyan-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-100 transition duration-1000 animate-tilt" />

              {/* Showcase Card Container */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#10172D] to-[#0A0E1A] border border-slate-700/80 shadow-2xl p-6 sm:p-7 overflow-hidden space-y-6">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-cyan-400 p-[2px] shadow-lg shadow-red-500/20">
                      <div className="w-full h-full bg-[#0B0F1E] rounded-[10px] flex items-center justify-center">
                        <Snowflake className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>Code2Chill Club</span>
                        <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.2 rounded font-bold">
                          CHITKARA
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Official Tech & Innovation Society
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Flagship Event Card Spotlight */}
                <div className="rounded-2xl bg-[#090D1A] border border-slate-800/90 p-4 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] pointer-events-none rounded-full" />
                  
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider">
                      Flagship Hackathon
                    </span>
                    <span className="text-amber-300 font-bold text-xs flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      ₹1,50,000 Pool
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white leading-snug">
                    ChillHack 2026: 36-Hour National Hackathon
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>April 18-20, 2026 • 36 Non-stop Hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Turing Auditorium, Chitkara University Rajpura</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Registrations: <strong className="text-cyan-400">64/150</strong> Confirmed
                    </span>
                    <button
                      onClick={onExploreEvents}
                      className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Club Pillars Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-red-400 font-bold text-base">MERN</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">FullStack Web</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-cyan-400 font-bold text-base">AI / ML</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">GenAI & LLMs</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-purple-400 font-bold text-base">DSA</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">Contests & CP</div>
                  </div>
                </div>

                {/* Quick Join CTA ribbon */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-500/10 via-slate-900 to-cyan-500/10 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 font-medium">Open to all Chitkara students</span>
                  </div>
                  <button
                    onClick={onOpenJoin}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Apply Now
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
