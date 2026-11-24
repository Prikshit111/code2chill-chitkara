import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Trophy, Users, ArrowUpRight, CheckCircle2, Flame, Sparkles, Zap } from 'lucide-react';

const STATUS_COLORS = {
  upcoming: { dot: 'bg-emerald-400', pill: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400', label: 'Open' },
  completed: { dot: 'bg-slate-500', pill: 'bg-slate-800/80 border-slate-700/50 text-slate-400', label: 'Completed' },
};

const CATEGORY_ICONS = {
  hackathon: '🏆',
  bootcamp: '💻',
  contest: '⚡',
  workshop: '🛠',
  default: '🎯',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
};

export default function EventsSection({ events = [], onSelectEventForRegistration }) {
  const [status, setStatus] = useState('all');

  const filtered = events.filter(e => status === 'all' || e.status === status);
  const upcoming = events.filter(e => e.status === 'upcoming');

  return (
    <section className="py-24 relative" id="events">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 mb-5 tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5" />
              Community Experiences
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Events &{' '}
              <span className="gradient-text-red">Hackathons</span>
            </h2>
            <p className="mt-4 text-slate-400 text-base max-w-lg leading-relaxed">
              Win prizes, build real projects, and get recognized at Chitkara University and beyond.
            </p>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 self-start shrink-0">
            {[
              { key: 'all', label: `All (${events.length})` },
              { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
              { key: 'completed', label: 'Completed' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setStatus(key)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  status === key
                    ? key === 'upcoming' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-slate-800 bg-slate-900/30">
            <Calendar className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500">No events in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((evt) => {
              const isUpcoming = evt.status === 'upcoming';
              const isFull = evt.registeredCount >= evt.capacity;
              const pct = evt.capacity ? Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100)) : 0;
              const statusStyle = STATUS_COLORS[evt.status] || STATUS_COLORS.completed;
              const icon = CATEGORY_ICONS[evt.category?.toLowerCase()] || CATEGORY_ICONS.default;

              return (
                <div
                  key={evt.id || evt._id}
                  className="group rounded-2xl bg-gradient-to-b from-[#0d1326] to-[#070a16] border border-slate-800/80 hover:border-slate-700 overflow-hidden flex flex-col transition-all duration-350 hover:-translate-y-2 hover:shadow-2xl shadow-lg"
                >
                  {/* Category banner */}
                  <div className="relative h-36 bg-gradient-to-br from-slate-900 to-[#060a18] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20"
                      style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070a16] to-transparent" />

                    <div className="relative text-center">
                      <div className="text-4xl mb-2">{icon}</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{evt.category}</div>
                    </div>

                    {/* Status badge */}
                    <span className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${statusStyle.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} ${isUpcoming ? 'animate-pulse' : ''}`} />
                      {statusStyle.label}
                    </span>

                    {/* Prize badge */}
                    {evt.prizePool && (
                      <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-[11px] font-bold">
                        <Trophy className="w-3 h-3" />
                        {evt.prizePool.split('+')[0].trim()}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-tight mb-3">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {evt.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-2 mb-5">
                      {evt.date && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{formatDate(evt.date)}</span>
                        </div>
                      )}
                      {evt.venue && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="line-clamp-1">{evt.venue}</span>
                        </div>
                      )}
                      {evt.mode && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="capitalize">{evt.mode} Event</span>
                        </div>
                      )}
                    </div>

                    {/* Registration bar */}
                    {isUpcoming && evt.capacity && (
                      <div className="mb-5">
                        <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-1.5">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {evt.registeredCount}/{evt.capacity} registered</span>
                          <span className="text-cyan-400 font-bold">{pct}% filled</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-red-500 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action */}
                    <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">
                        {isUpcoming ? (isFull ? '🔴 Waitlist only' : '🟢 Seats available') : '✅ Event concluded'}
                      </span>
                      {isUpcoming ? (
                        <button
                          onClick={() => onSelectEventForRegistration(evt)}
                          disabled={isFull}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isFull ? 'Housefull' : 'Register'}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Done
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
