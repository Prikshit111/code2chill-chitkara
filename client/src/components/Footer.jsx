import React from 'react';
import { Snowflake, Instagram, Linkedin, Github, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stats', href: '#stats' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Instagram', href: '#instagram' },
];

const GUILDS = ['MERN & Full Stack', 'AI & Machine Learning', 'Competitive Programming', 'UI/UX & Product Design', 'Cloud & DevOps'];

export default function Footer() {
  return (
    <footer className="relative bg-[#030508] border-t border-slate-800/60 pt-20 pb-10 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-slate-800/50">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-cyan-400" style={{ animation: 'spin 12s linear infinite' }} />
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">Code<span className="text-red-500">2</span>Chill</div>
                <div className="text-[10px] text-slate-500 font-medium">Chitkara University • Rajpura</div>
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Premier student tech & coding club of Chitkara University. Building tomorrow's engineers through hackathons, projects, and community.
            </p>

            <div className="flex items-start gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>NH-64 Chandigarh–Patiala Highway, Rajpura, Punjab 140401</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { href: 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==', icon: Instagram, label: '@code2chill.osl', color: 'hover:text-pink-400 hover:border-pink-500/30' },
                { href: 'https://linkedin.com/company/code2chill-chitkara', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-500/30' },
                { href: 'https://github.com/Prikshit111/code2chill-chitkara', icon: Github, label: 'GitHub', color: 'hover:text-white hover:border-slate-600' },
                { href: 'mailto:code2chill@chitkara.edu.in', icon: Mail, label: 'Email', color: 'hover:text-red-400 hover:border-red-500/30' },
              ].map(({ href, icon: Icon, label, color }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" title={label}
                  className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-500 transition-all ${color}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guilds */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6">Club Guilds</h4>
            <ul className="space-y-3">
              {GUILDS.map(g => (
                <li key={g} className="text-sm text-slate-500 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-cyan-800 shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-600 mb-1">Campus</p>
                <p className="text-sm text-slate-400">Chitkara Innovation Incubator, Rajpura Campus</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Email</p>
                <a href="mailto:code2chill@chitkara.edu.in" className="text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                  code2chill@chitkara.edu.in
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Instagram</p>
                <a href="https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==" target="_blank" rel="noreferrer"
                  className="text-sm text-pink-400 hover:text-pink-300 transition-colors font-mono flex items-center gap-1">
                  @code2chill.osl <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Code2Chill Club, Chitkara University Rajpura. All rights reserved.</span>
          <span>Built with ❤️ using MERN Stack + React + TailwindCSS</span>
        </div>
      </div>
    </footer>
  );
}
