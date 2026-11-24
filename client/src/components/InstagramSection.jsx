import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InstagramSection({ instagramData }) {
  const handle = instagramData?.handle || '@code2chill.osl';
  const profileUrl = instagramData?.profileUrl || 'https://www.instagram.com/code2chill.osl?jplx=MWcxZzV0d3lhdmJnag==';
  const followersCount = instagramData?.followersCount || 350;
  const posts = instagramData?.posts || [];

  return (
    <section className="py-20 relative overflow-hidden" id="instagram">
      {/* Background Gradient */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="container-custom relative z-10">
        
        {/* Instagram Profile Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#170E24] via-[#101426] to-[#0D152A] border border-pink-500/20 p-8 sm:p-10 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Info */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative">
                <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-xl">
                  <div className="w-full h-full rounded-full bg-[#0B0F1E] flex items-center justify-center p-3">
                    <Instagram className="w-10 h-10 text-pink-400" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 p-1 bg-red-600 text-white rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {handle}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold">
                    Official Handle
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-lg mb-3">
                  {instagramData?.bio || '⚡ Official Tech & Coding Club of Chitkara University, Rajpura | Hackathons, Bootcamps & Chill Vibes 🚀'}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-6 text-xs text-slate-400">
                  <span><strong className="text-white font-bold">{followersCount.toLocaleString()}</strong> Followers</span>
                  <span><strong className="text-white font-bold">148</strong> Posts</span>
                  <span><strong className="text-white font-bold">Chitkara University</strong> Rajpura</span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary !bg-gradient-to-r !from-rose-500 !via-pink-500 !to-purple-600 shadow-lg shadow-pink-600/30 text-sm !py-3 !px-6"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* Instagram Post Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl bg-[#0F1424] border border-slate-800 hover:border-pink-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:-translate-y-1 block text-decoration-none"
            >
              {/* Image Preview */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm backdrop-blur-[2px]">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-300 border border-slate-700/60">
                  {post.date}
                </div>
              </div>

              {/* Caption details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-pink-300 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-pink-400 font-semibold">
                  <span>View post</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
