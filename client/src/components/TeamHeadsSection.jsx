import React, { useState } from 'react';
import { Linkedin, Instagram, ExternalLink, ShieldCheck, GraduationCap, Code2 } from 'lucide-react';

const DOMAIN_STYLES = {
  'lead': {
    gradient: 'from-red-500 to-rose-600',
    badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    glow: 'group-hover:shadow-red-500/15',
    barColor: 'from-red-500 to-rose-600',
  },
  'technical': {
    gradient: 'from-cyan-400 to-blue-600',
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    glow: 'group-hover:shadow-cyan-500/15',
    barColor: 'from-cyan-400 to-blue-600',
  },
  'content & creative': {
    gradient: 'from-purple-500 to-pink-500',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    glow: 'group-hover:shadow-purple-500/15',
    barColor: 'from-purple-500 to-pink-500',
  },
  'social media & pr': {
    gradient: 'from-pink-500 to-rose-500',
    badge: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
    glow: 'group-hover:shadow-pink-500/15',
    barColor: 'from-pink-500 to-rose-500',
  },
};

const getStyle = (domain) => DOMAIN_STYLES[domain?.toLowerCase()] || {
  gradient: 'from-slate-600 to-slate-700',
  badge: 'bg-slate-800 text-slate-300 border-slate-700',
  glow: '',
  barColor: 'from-slate-600 to-slate-700',
};

const getInitials = (name) => {
  if (!name) return 'C2C';
  const p = name.trim().split(' ');
  return p.length >= 2 ? `${p[0][0]}${p[1][0]}`.toUpperCase() : name.slice(0, 2).toUpperCase();
};

const DOMAINS = ['all', 'Lead', 'Technical', 'Content & Creative', 'Social Media & PR'];

export default function TeamHeadsSection({ teamMembers = [] }) {
  const [active, setActive] = useState('all');

  const filtered = teamMembers.filter(m =>
    active === 'all' || m.domain?.toLowerCase() === active.toLowerCase()
  );

  return (
    <section className="py-24 relative bg-[#060916]/60" id="team">
      {/* Top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />

      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-400 mb-5 tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Core Leadership & Team
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Meet the <span className="gradient-text-cyan">Team</span>
          </h2>
          <p className="mt-5 text-slate-400 text-base leading-relaxed">
            The visionaries, mentors and builders driving technical excellence at Code2Chill.
          </p>
        </div>

        {/* Domain filter */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {DOMAINS.map(dom => (
            <button
              key={dom}
              onClick={() => setActive(dom)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-250 ${
                active === dom
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {dom === 'all' ? 'All Members' : dom}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((member) => {
            const style = getStyle(member.domain);
            const initials = getInitials(member.name);
            const isHead = member.role?.toLowerCase().includes('head') || member.role?.toLowerCase().includes('president') || member.role?.toLowerCase().includes('vice');

            return (
              <div
                key={member.id || member._id}
                className={`group relative rounded-2xl bg-gradient-to-b from-[#0d1326] to-[#070a17] border border-slate-800/80 hover:border-slate-700 p-6 flex flex-col transition-all duration-350 hover:-translate-y-2 hover:shadow-2xl ${style.glow} shadow-lg overflow-hidden`}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${style.barColor} opacity-60 group-hover:opacity-100 transition-opacity`} />

                {/* Avatar + Badge row */}
                <div className="flex items-start justify-between mb-5">
                  {/* Monogram avatar */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${style.gradient} p-[2.5px] shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <div className="w-full h-full bg-[#090d1c] rounded-[14px] flex items-center justify-center font-black text-lg text-white tracking-wide">
                      {initials}
                    </div>
                  </div>
                  {/* Domain badge */}
                  <span className={`badge-pill border ${style.badge} max-w-[120px] text-center leading-tight`}>
                    {member.domain}
                  </span>
                </div>

                {/* Name + Role */}
                <div className="mb-4">
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    {member.name}
                    {isHead && (
                      <span className="ml-2 inline-block w-2 h-2 rounded-full bg-amber-400 align-middle" title="Club Head" />
                    )}
                  </h3>
                  <div className="text-sm font-bold text-red-400 mt-1.5">{member.role}</div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-600" />
                    Chitkara University, Rajpura
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1 mb-5">
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/50 border border-slate-800/60 rounded-xl p-3.5 line-clamp-4">
                    {member.bio}
                  </p>
                </div>

                {/* Social links */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/25 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-600/15 text-slate-500 hover:text-pink-400 border border-slate-800 hover:border-pink-500/25 transition-all"
                      title="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Code2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No members found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
