import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';

export default function InstagramSection({ instagramData }) {
  const handle = instagramData?.handle || '@code2chill.osl';
  const profileUrl = instagramData?.url || 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==';
  const followers = instagramData?.followers || 350;
  const posts = instagramData?.recentPosts || [];

  return (
    <section className="py-24 relative overflow-hidden" id="instagram">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600/8 blur-[150px] pointer-events-none rounded-full" />

      <div className="container-custom relative z-10">
        {/* Profile hero card */}
        <div className="relative rounded-3xl overflow-hidden mb-14">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0f1428] to-[#070b1c]" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-transparent to-purple-600/10" />
          <div className="absolute inset-0 border border-pink-500/15 rounded-3xl" />

          <div className="relative p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left: Profile info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-[#0d1020] flex items-center justify-center">
                      <Instagram className="w-10 h-10 text-pink-400" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-pink-600 border-2 border-[#0d1020] flex items-center justify-center">
                    <span className="text-[10px]">✓</span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                    <h3 className="text-2xl font-black text-white">{handle}</h3>
                    <span className="badge-pill bg-pink-500/15 border border-pink-500/25 text-pink-300">Official</span>
                  </div>
                  <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
                    ⚡ Official Tech & Coding Club of Chitkara University, Rajpura<br />
                    Hackathons • Bootcamps • Chill Vibes 🚀
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-xl font-black text-white">{followers}+</div>
                      <div className="text-xs text-slate-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black text-white">148</div>
                      <div className="text-xs text-slate-500">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black text-white">100+</div>
                      <div className="text-xs text-slate-500">Members</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: CTA */}
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-2xl shadow-pink-600/30 hover:shadow-pink-600/50 transition-all hover:-translate-y-1 shrink-0"
              >
                <Instagram className="w-5 h-5" />
                Follow on Instagram
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        {posts.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Recent Posts</h3>
              <a href={profileUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-pink-400 hover:text-pink-300 font-semibold transition-colors">
                View all <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.url || profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl bg-gradient-to-b from-[#0d1326] to-[#070a16] border border-slate-800 hover:border-pink-500/30 transition-all duration-300 overflow-hidden block hover:-translate-y-1.5 shadow-lg"
                >
                  {/* Post type banner */}
                  <div className="relative h-32 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-rose-900/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                      style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                    <Instagram className="w-10 h-10 text-pink-400/40" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-[10px] text-slate-400 font-mono border border-slate-700/50">
                      {post.timestamp}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">{post.caption}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500" /> {post.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-cyan-500" /> {post.comments}</span>
                      </div>
                      <span className="text-xs text-pink-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        View <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
