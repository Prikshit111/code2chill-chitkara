import React from 'react';
import { Users, Calendar, Rocket, Trophy, Instagram, BookOpen, Building2, Sparkles, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

function useCounter(target, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const timer = setInterval(() => {
      frame++;
      const progress = easeOut(frame / totalFrames);
      setCount(Math.round(target * progress));
      if (frame >= totalFrames) { setCount(target); clearInterval(timer); }
    }, duration / totalFrames);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function StatsCounter({ stats }) {
  const members = useCounter(stats?.activeMembers || 100);
  const events = useCounter(stats?.eventsOrganized || 12);
  const projects = useCounter(stats?.projectsShipped || 25);
  const followers = useCounter(stats?.instagramFollowers || 350);

  const cards = [
    {
      icon: Users,
      count: `${members}+`,
      label: 'Active Members',
      sub: 'Coders at Chitkara Rajpura',
      accent: 'from-cyan-500 to-blue-600',
      glow: 'group-hover:shadow-cyan-500/20',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
    },
    {
      icon: Calendar,
      count: `${events}+`,
      label: 'Events Hosted',
      sub: 'Hackathons, bootcamps & talks',
      accent: 'from-red-500 to-rose-600',
      glow: 'group-hover:shadow-red-500/20',
      iconBg: 'bg-red-500/10 text-red-400',
    },
    {
      icon: Rocket,
      count: `${projects}+`,
      label: 'Projects Shipped',
      sub: 'MERN, AI/ML & Web3 builds',
      accent: 'from-purple-500 to-indigo-600',
      glow: 'group-hover:shadow-purple-500/20',
      iconBg: 'bg-purple-500/10 text-purple-400',
    },
    {
      icon: Instagram,
      count: `${followers}+`,
      label: 'Instagram Family',
      sub: '@code2chill.osl community',
      accent: 'from-pink-500 to-rose-500',
      glow: 'group-hover:shadow-pink-500/20',
      iconBg: 'bg-pink-500/10 text-pink-400',
    },
  ];

  return (
    <section className="py-24 relative" id="stats">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-5 tracking-widest uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            Club Metrics & Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Chitkara's Fastest<br />
            <span className="gradient-text-cyan">Growing Tech Club</span>
          </h2>
          <p className="mt-5 text-slate-400 text-base leading-relaxed">
            From first-year coders to full-stack engineers — Code2Chill is home to Chitkara's most passionate builders.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, count, label, sub, accent, glow, iconBg }, i) => (
            <div key={i}
              className={`group relative rounded-2xl bg-gradient-to-b from-[#0e1428] to-[#070a16] border border-slate-800 p-7 overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-slate-700 hover:shadow-2xl ${glow} shadow-lg`}
            >
              {/* Gradient bar top */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accent} opacity-70 group-hover:opacity-100 transition-opacity`} />
              {/* Glow blob */}
              <div className={`absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br ${accent} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />

              <div className={`inline-flex p-3 rounded-xl ${iconBg} mb-5`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="text-4xl font-black text-white tracking-tight mb-1">{count}</div>
              <div className="text-sm font-bold text-slate-200 mb-1">{label}</div>
              <div className="text-xs text-slate-500">{sub}</div>
            </div>
          ))}
        </div>

        {/* Bottom ribbon */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <div className="flex flex-wrap items-center justify-around gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong className="text-white">38+</strong> National Hackathons Won</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
              <span><strong className="text-white">28+</strong> Free Coding Workshops</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-red-400 shrink-0" />
              <span>Officially recognized by <strong className="text-white">Chitkara University</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
