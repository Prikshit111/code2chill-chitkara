import React, { useState } from 'react';
import { Linkedin, Instagram, GraduationCap, ExternalLink, ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function TeamHeadsSection({ teamMembers = [] }) {
  const [selectedDomain, setSelectedDomain] = useState('all');

  const domains = ['all', 'Lead', 'Technical', 'Content & Creative', 'Social Media & PR'];

  const filteredTeam = teamMembers.filter(member => {
    if (selectedDomain === 'all') return true;
    return member.domain?.toLowerCase() === selectedDomain.toLowerCase();
  });

  const getDomainStyle = (domain) => {
    switch (domain?.toLowerCase()) {
      case 'lead':
        return {
          gradient: 'from-red-500 to-rose-600',
          badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
          ring: 'border-red-500/40'
        };
      case 'technical':
        return {
          gradient: 'from-cyan-400 to-blue-600',
          badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          ring: 'border-cyan-500/40'
        };
      case 'content & creative':
        return {
          gradient: 'from-purple-500 to-pink-500',
          badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          ring: 'border-purple-500/40'
        };
      case 'social media & pr':
        return {
          gradient: 'from-pink-500 to-rose-500',
          badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
          ring: 'border-pink-500/40'
        };
      default:
        return {
          gradient: 'from-slate-600 to-slate-800',
          badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
          ring: 'border-slate-700'
        };
    }
  };

  const getInitials = (name) => {
    if (!name) return 'C2C';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="py-20 relative bg-[#090D1A]/60" id="team">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CORE LEADERSHIP & HEADS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Our Team Heads
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            The masterminds, mentors, and pillars driving technical excellence at Code2Chill, Chitkara University.
          </p>
        </div>

        {/* Domain Filter Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedDomain === dom
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {dom === 'all' ? 'All Team Heads' : dom}
            </button>
          ))}
        </div>

        {/* Clean Executive Team Heads Cards (No Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeam.map((member) => {
            const domainStyle = getDomainStyle(member.domain);
            const initials = getInitials(member.name);

            return (
              <div
                key={member.id || member._id}
                className="rounded-2xl bg-gradient-to-b from-[#11172D] to-[#0A0D1B] border border-slate-800/90 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 p-6 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Top Bar with Initials Monogram Badge & Domain Pill (No Photos) */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${domainStyle.gradient} p-[2px] shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className="w-full h-full bg-[#0B0F1E] rounded-[14px] flex items-center justify-center font-black text-lg tracking-wider text-white">
                        {initials}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${domainStyle.badgeBg}`}>
                      {member.domain}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-sm font-semibold text-red-400 mt-1">
                      {member.role}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                      <span>Chitkara University, Rajpura</span>
                    </div>
                  </div>

                  {/* Bio / Description */}
                  <p className="text-xs text-slate-300 line-clamp-4 mb-5 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
                    "{member.bio}"
                  </p>
                </div>

                {/* Social Links & Connect */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between gap-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors"
                        title="Connect on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn Profile</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-900 hover:bg-pink-600/20 text-slate-400 hover:text-pink-400 border border-slate-800 transition-colors"
                        title="Instagram @code2chill.osl"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="text-center text-[10px] text-slate-500 mt-3 font-mono">
                    Code2Chill • Chitkara Univ
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
