import React from 'react';
import { Snowflake, Instagram, Linkedin, Github, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand & Campus Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-cyan-400 p-[2px]">
                <div className="w-full h-full bg-[#0B0F1E] rounded-[10px] flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white">
                  Code<span className="text-red-500">2</span>Chill
                </span>
                <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/30 rounded">
                  Chitkara Univ
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Code2Chill is the premier student tech & coding club of Chitkara University, Rajpura, Punjab. Empowering student developers through hackathons, real-world fullstack projects, and peer mentorship.
            </p>

            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                Chitkara University, Punjab Campus, Chandigarh-Patiala National Highway (NH-64), Rajpura, Punjab 140401
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag=="
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-500/30 transition-colors"
                title="Instagram @code2chill.osl"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/code2chill-chitkara"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/code2chill-chitkara"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:code2chill@chitkara.edu.in"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Upcoming Events</a></li>
              <li><a href="#stats" className="hover:text-white transition-colors">Member Stats</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Team Heads</a></li>
              <li><a href="#instagram" className="hover:text-white transition-colors">Instagram Feed</a></li>
            </ul>
          </div>

          {/* Domains */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Club Guilds
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>MERN & Fullstack</li>
              <li>AI & Machine Learning</li>
              <li>Competitive Programming</li>
              <li>UI/UX & Product Design</li>
              <li>Cloud & DevOps</li>
            </ul>
          </div>

          {/* Contact & Affiliation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Campus Contact
            </h4>
            <p className="text-xs text-slate-400 mb-2">
              Chitkara Innovation Incubator & Turing Block, Rajpura Campus
            </p>
            <p className="text-xs font-mono text-cyan-400 mb-2">
              code2chill@chitkara.edu.in
            </p>
            <a
              href="https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag=="
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-pink-400 font-mono hover:underline block"
            >
              IG: @code2chill.osl
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Code2Chill Club, Chitkara University Rajpura. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with passion & MERN stack for Chitkarians</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
