import React, { useEffect, useState } from 'react';
import { Users, Calendar, Rocket, Trophy, Instagram, BookOpen, Sparkles, Building2 } from 'lucide-react';

export default function StatsCounter({ stats }) {
  const [memberCount, setMemberCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  const targetMembers = stats?.activeMembers || 100;
  const targetEvents = stats?.eventsOrganized || 12;
  const targetProjects = stats?.projectsShipped || 25;
  const targetFollowers = stats?.instagramFollowers || 350;

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 25;
    const steps = duration / stepTime;

    const timer = setInterval(() => {
      start++;
      const progress = start / steps;
      setMemberCount(Math.floor(targetMembers * progress));
      setEventsCount(Math.floor(targetEvents * progress));
      setProjectsCount(Math.floor(targetProjects * progress));
      setFollowersCount(Math.floor(targetFollowers * progress));

      if (start >= steps) {
        setMemberCount(targetMembers);
        setEventsCount(targetEvents);
        setProjectsCount(targetProjects);
        setFollowersCount(targetFollowers);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetMembers, targetEvents, targetProjects, targetFollowers]);

  const statCards = [
    {
      title: 'Active Members',
      count: `${memberCount}+`,
      subtitle: 'Registered coders at Chitkara Rajpura',
      icon: Users,
      glowColor: 'from-cyan-500/20 to-blue-500/10',
      iconColor: 'text-cyan-400',
      badge: 'Chitkara Community'
    },
    {
      title: 'Events & Hackathons',
      count: `${eventsCount}+`,
      subtitle: 'Coding challenges, sprints & bootcamps',
      icon: Calendar,
      glowColor: 'from-red-500/20 to-rose-500/10',
      iconColor: 'text-red-400',
      badge: 'High Impact'
    },
    {
      title: 'Projects Shipped',
      count: `${projectsCount}+`,
      subtitle: 'MERN, AI, mobile apps & Web3 projects',
      icon: Rocket,
      glowColor: 'from-purple-500/20 to-indigo-500/10',
      iconColor: 'text-purple-400',
      badge: 'Innovation'
    },
    {
      title: 'Instagram Family',
      count: `${followersCount.toLocaleString()}+`,
      subtitle: '@code2chill.osl community',
      icon: Instagram,
      glowColor: 'from-pink-500/20 to-rose-500/10',
      iconColor: 'text-pink-400',
      badge: 'Social Pulse'
    }
  ];

  return (
    <section className="py-16 relative" id="stats">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLUB METRICS & COMMUNITY IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Chitkara's Fastest Growing Tech Club
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            From first-year enthusiasts writing their first "Hello World" to senior full-stack architects shipping production code — Code2Chill is home to curious minds across Chitkara University Punjab.
          </p>
        </div>

        {/* 4 Primary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-gradient-to-b from-[#11172A] to-[#0A0E1A] p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 group overflow-hidden shadow-xl"
              >
                {/* Background accent glow */}
                <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${item.glowColor} rounded-full blur-xl group-hover:scale-150 transition-transform duration-500`} />

                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${item.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {item.badge}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {item.count}
                </div>

                <div className="text-sm font-bold text-slate-200 mb-1">
                  {item.title}
                </div>

                <p className="text-xs text-slate-400">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Secondary Highlights Ribbon */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span><strong className="text-white">38+</strong> National Hackathons Won by Club Members</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span><strong className="text-white">28+</strong> Free Hands-on Coding Workshops Conducted</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-red-400" />
            <span><strong className="text-white">Chitkara University</strong> Rajpura Campus Approved</span>
          </div>
        </div>

      </div>
    </section>
  );
}
