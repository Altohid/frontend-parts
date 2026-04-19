import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, Sparkles, ChevronRight, Lock, BadgeCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [homeSearch, setHomeSearch] = useState('');

  const handleHomeSearch = (e) => {
    e.preventDefault();
    navigate('/vehicles');
  };

  const categories = [
    { label: 'Cars', emoji: '🚗' },
    { label: 'Bikes', emoji: '🏍️' },
    { label: 'All listings', emoji: '✨' },
  ];

  const [counts, setCounts] = useState([0, 0, 0]);
  const stats = [10000, 5000, 500];
  const duration = 2000;
  const interval = 30;
  const repeatTime = 6000;

  const runCounter = () => {
    stats.forEach((target, index) => {
      let start = 0;
      const step = target / (duration / interval);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(start);
          return updated;
        });
      }, interval);
    });
  };

  useEffect(() => {
    runCounter();
    const loop = setInterval(() => {
      setCounts([0, 0, 0]);
      runCounter();
    }, repeatTime);
    return () => clearInterval(loop);
  }, []);

  const highlights = [
    { icon: Shield, title: 'Verified sellers', desc: 'Profiles checked so you buy with confidence.' },
    { icon: Search, title: 'Smart filters', desc: 'Brand, price, location — find the right vehicle fast.' },
    { icon: Sparkles, title: 'Compare & decide', desc: 'Line up listings side by side before you commit.' },
  ];

  const trustChips = [
    { icon: BadgeCheck, text: 'Verified listings' },
    { icon: Lock, text: 'Secure contact' },
    { icon: Sparkles, text: 'Fair, transparent prices' },
  ];

  return (
    <div className="text-olx-dark min-h-screen bg-mesh-hero bg-olx-bg">
      <section className="pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-olx-border bg-white/90 px-4 py-1.5 text-xs font-semibold text-olx-muted shadow-premium backdrop-blur-sm mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
            10,000+ vehicles · Trusted by buyers nationwide
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-olx-dark tracking-tight leading-[1.08] text-balance">
            The smarter way to buy & sell pre-owned vehicles
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-olx-muted max-w-2xl mx-auto leading-relaxed text-balance">
            Browse curated listings, message sellers safely, and close deals faster — without the noise.
          </p>

          <form onSubmit={handleHomeSearch} className="mt-10 max-w-2xl mx-auto">
            <div className="rounded-2xl bg-white p-1.5 shadow-premium-lg ring-1 ring-slate-200/80 focus-within:ring-2 focus-within:ring-olx-teal/35 focus-within:shadow-premium-lg transition-shadow duration-250">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex flex-1 items-center gap-3 pl-4 pr-3 py-3 min-h-[52px]">
                  <Search className="w-5 h-5 text-olx-teal shrink-0" strokeWidth={2.25} />
                  <input
                    type="text"
                    value={homeSearch}
                    onChange={(e) => setHomeSearch(e.target.value)}
                    placeholder="Try “Maruti Swift”, “Royal Enfield”…"
                    className="flex-1 text-olx-dark placeholder:text-slate-400 outline-none text-base bg-transparent font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-xl px-8 py-3.5 bg-olx-dark text-white font-bold text-base shadow-cta hover:shadow-cta-hover hover:bg-[#0d3d42] active:scale-[0.98] transition-all duration-250 sm:min-w-[148px]"
                >
                  Search
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-olx-muted">
              No signup required to browse · Takes you straight to live listings
            </p>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {trustChips.map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-2 rounded-full border border-olx-border bg-white/80 px-3 py-1.5 text-xs font-semibold text-olx-dark shadow-olx backdrop-blur-sm"
              >
                <item.icon className="w-3.5 h-3.5 text-olx-teal shrink-0" strokeWidth={2.5} />
                {item.text}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to="/vehicles"
                className="group flex items-center gap-3 rounded-2xl border border-olx-border bg-white px-5 py-3.5 shadow-premium transition-all duration-250 hover:border-olx-teal/40 hover:shadow-premium-lg hover:-translate-y-0.5 min-w-[148px]"
              >
                <span className="text-2xl" aria-hidden>
                  {cat.emoji}
                </span>
                <span className="font-bold text-olx-dark">{cat.label}</span>
                <ChevronRight className="w-4 h-4 text-olx-muted ml-auto transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              { value: counts[0], label: 'Live listings', sub: 'Updated daily' },
              { value: counts[1], label: 'Happy buyers', sub: 'Across India' },
              { value: counts[2], label: 'Verified sellers', sub: 'Vetted profiles' },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-olx-border bg-white px-6 py-8 text-center shadow-premium transition-shadow duration-250 hover:shadow-olx-hover"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-olx-teal/0 via-olx-teal to-olx-teal/0 opacity-80" />
                <div className="text-3xl sm:text-4xl font-extrabold text-olx-dark tabular-nums tracking-tight">
                  {stat.value.toLocaleString()}+
                </div>
                <div className="mt-2 font-bold text-olx-dark">{stat.label}</div>
                <div className="text-sm text-olx-muted mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-olx-dark tracking-tight">
              Why buyers choose AutoMart
            </h2>
            <p className="mt-3 text-olx-muted leading-relaxed">
              Less friction from search to seller contact — built for decisions, not endless scrolling.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-olx-border bg-white p-7 shadow-premium transition-all duration-250 hover:shadow-premium-lg hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-olx-teal/20 to-olx-teal/5 p-3 ring-1 ring-olx-teal/20">
                  <item.icon className="w-6 h-6 text-olx-dark" strokeWidth={2.25} />
                </div>
                <h3 className="text-lg font-bold text-olx-dark mb-2">{item.title}</h3>
                <p className="text-olx-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          {user?.role === 'seller' ? (
            <div className="relative overflow-hidden rounded-3xl bg-olx-dark px-8 py-12 sm:px-12 text-center shadow-premium-lg ring-1 ring-white/10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-olx-teal/15 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Turn your vehicle into cash this week
                </h2>
                <p className="mt-4 text-white/75 text-base leading-relaxed max-w-md mx-auto">
                  Publish a polished ad in minutes. Reach serious buyers — photos, price, and location do the selling.
                </p>
                <Link
                  to="/add-vehicle"
                  className="mt-8 inline-flex items-center justify-center rounded-xl px-10 py-4 bg-olx-sell text-olx-dark font-extrabold text-base shadow-lg hover:brightness-105 active:scale-[0.98] transition-all"
                >
                  Post your ad — free to start
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-olx-border bg-white px-8 py-12 sm:px-12 text-center shadow-premium-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-olx-teal/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-olx-dark tracking-tight text-balance">
                  Ready to find your next vehicle?
                </h2>
                <p className="mt-4 text-olx-muted leading-relaxed max-w-md mx-auto">
                  Jump into live listings — filter, compare, and contact sellers in a few taps.
                </p>
                <Link
                  to="/vehicles"
                  className="mt-8 inline-flex items-center justify-center rounded-xl px-10 py-4 bg-olx-dark text-white font-extrabold text-base shadow-cta hover:shadow-cta-hover hover:bg-[#0d3d42] active:scale-[0.98] transition-all"
                >
                  Browse all vehicles
                </Link>
                <p className="mt-4 text-xs text-olx-muted">Average time to first shortlist: under 2 minutes</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
