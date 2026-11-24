import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Trophy, Users, Tag, ArrowUpRight, CheckCircle2, Flame, Sparkles } from 'lucide-react';

export default function EventsSection({ events, onSelectEventForRegistration }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = ['all', 'Hackathon', 'Workshop', 'Coding Contest', 'Tech Talk', 'Open Source'];

  const filteredEvents = events.filter(evt => {
    const matchesCategory = filterCategory === 'all' || evt.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesStatus = filterStatus === 'all' || evt.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesCategory && matchesStatus;
  });

  return (
    <section className="py-20 relative" id="events">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>COMMUNITY EXPERIENCES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Events & Hackathons
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Sharpen your skills, win cash prizes, collaborate with peers, and get recognized across Chitkara University and beyond.
            </p>
          </div>

          {/* Status Quick Switch (All / Upcoming) */}
          <div className="flex items-center gap-2 bg-[#0C1122] p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filterStatus === 'all'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setFilterStatus('upcoming')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filterStatus === 'upcoming'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming ({events.filter(e => e.status === 'upcoming').length})
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-slate-200 text-slate-900 shadow-md font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No events found</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting a different category or status above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => {
              const isFull = evt.registeredCount >= evt.capacity;
              const isUpcoming = evt.status === 'upcoming';
              const percentFilled = Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100));

              return (
                <div
                  key={evt.id || evt._id}
                  className="rounded-2xl bg-gradient-to-b from-[#10162B] to-[#0A0D1A] border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group shadow-xl"
                >
                  {/* Event Thumbnail & Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10162B] via-transparent to-black/40" />

                    {/* Category pill */}
                    <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-md bg-slate-900/80 border border-slate-700 text-cyan-300">
                      {evt.category}
                    </span>

                    {/* Status pill */}
                    <span className={`absolute top-3 right-3 px-3 py-1 text-[11px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-md ${
                      isUpcoming
                        ? 'bg-red-600/90 text-white shadow-lg shadow-red-600/30'
                        : 'bg-slate-800/90 text-slate-400'
                    }`}>
                      {isUpcoming ? 'Open' : 'Completed'}
                    </span>
                  </div>

                  {/* Event Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date & Time */}
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-3">
                        <div className="flex items-center gap-1.5 text-cyan-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{evt.time}</span>
                        </div>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                        {evt.title}
                      </h3>

                      {/* Tagline */}
                      {evt.tagline && (
                        <p className="text-xs font-semibold text-red-400 mb-2">
                          "{evt.tagline}"
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {evt.description}
                      </p>

                      {/* Venue info */}
                      <div className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800/80 mb-4">
                        <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{evt.venue}</span>
                      </div>

                      {/* Prizes / Perks */}
                      {evt.prizes && (
                        <div className="flex items-center gap-2 text-xs text-amber-300 mb-4">
                          <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="font-medium truncate">{evt.prizes}</span>
                        </div>
                      )}
                    </div>

                    {/* Registration Capacity & Action */}
                    <div className="pt-4 border-t border-slate-800/80">
                      {isUpcoming && (
                        <div className="mb-3">
                          <div className="flex justify-between items-center text-[11px] font-medium text-slate-400 mb-1">
                            <span>Registrations ({evt.registeredCount}/{evt.capacity})</span>
                            <span className="text-cyan-400 font-bold">{percentFilled}% Filled</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-cyan-400 to-red-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentFilled}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[11px] text-slate-500">
                          {isUpcoming ? (isFull ? 'Waitlist Only' : 'Limited Seats Available') : 'Event Concluded'}
                        </div>

                        {isUpcoming ? (
                          <button
                            onClick={() => onSelectEventForRegistration(evt)}
                            disabled={isFull}
                            className="btn-primary text-xs !py-2.5 !px-4"
                          >
                            <span>{isFull ? 'Housefull' : 'Register Now'}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Conducted</span>
                          </span>
                        )}
                      </div>
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
