
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BadgeCheck, Lock, Sparkles } from 'lucide-react';
import TopTicker from './TopTicker';

export default function Hero() {
  const navigate = useNavigate();
  const [homeSearch, setHomeSearch] = useState('');
  const [counts, setCounts] = useState([12400, 5000, 680]);

  useEffect(() => {
    const targets = [12400, 5000, 680];
    const steps = 40;
    const timers = [];
    targets.forEach((t, i) => {
      let cur = 0;
      const step = Math.max(10, Math.round(t / steps));
      const id = setInterval(() => {
        cur += step;
        setCounts((s) => {
          const copy = [...s];
          copy[i] = Math.min(cur, t);
          return copy;
        });
        if (cur >= t) clearInterval(id);
      }, 30 + i * 10);
      timers.push(id);
    });
    return () => timers.forEach((id) => clearInterval(id));
  }, []);

  function handleHomeSearch(e) {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/parts');
  }

  const trustChips = [
    { icon: BadgeCheck, text: 'Verified sellers' },
    { icon: Lock, text: 'UPI & COD' },
    { icon: Sparkles, text: '7-day returns' },
  ];

  const hints = ['Maruti Swift alternator', 'Nexon bumper', 'i20 clutch plate', 'Innova radiator'];

  return (
    <div className="text-olx-dark bg-mesh-hero bg-olx-bg">
      <section className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">12,400+ parts live</span>
              <span className="text-sm text-olx-muted">Trusted by 5,000+ buyers across India</span>
            </div>

            <h1 className="text-[56px] leading-[0.95] font-extrabold tracking-tight mb-4">
              Find the <span className="text-olx-teal">exact part</span>
              <br /> your car
              <br /> needs —
              <br /> at the right
              <br /> price.
            </h1>

            <p className="text-lg text-olx-muted max-w-xl mb-6">
              Search by car model, OEM number or part name. Genuine used parts from verified scrap dealers and sellers across India. Delivered to your door.
            </p>

            <form onSubmit={handleHomeSearch} className="max-w-xl">
              <div className="flex gap-3 items-center">
                <div className="flex-1 rounded-full bg-white border border-olx-border py-2 px-4 flex items-center gap-3 shadow-sm">
                  <Search className="w-5 h-5 text-olx-muted" />
                  <input
                    type="text"
                    value={homeSearch}
                    onChange={(e) => setHomeSearch(e.target.value)}
                    placeholder={'Try "Maruti Swift brake pad" or "Hyundai i20 headlight"'}
                    className="w-full outline-none bg-transparent text-sm font-medium"
                  />
                </div>

                <button type="submit" className="rounded-full bg-olx-teal text-white px-5 py-2.5 font-semibold shadow-cta hover:brightness-95 transition-all">
                  Search
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {hints.map((h) => (
                  <button key={h} type="button" onClick={() => setHomeSearch(h)} className="px-3 py-1.5 rounded-full bg-white border border-olx-border text-sm text-olx-muted shadow-sm">
                    {h}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {trustChips.map((t) => (
                  <div key={t.text} className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-2 text-sm font-medium shadow-sm">
                    <t.icon className="text-olx-teal" />
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </form>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
              <div className="bg-white rounded-2xl border border-olx-border p-5 shadow-sm">
                <div className="text-3xl font-extrabold">
                  {counts[0].toLocaleString()}<span className="text-emerald-500 ml-1 align-super text-xl">+</span>
                </div>
                <div className="text-sm font-semibold mt-1">Live parts listed</div>
                <div className="text-xs text-slate-400 mt-1">Updated every hour · across 280+ cities</div>
              </div>

              <div className="bg-white rounded-2xl border border-olx-border p-5 shadow-sm">
                <div className="text-3xl font-extrabold">{counts[1].toLocaleString()}<span className="text-emerald-500 ml-1 align-super text-xl">+</span></div>
                <div className="text-sm font-semibold mt-1">Happy buyers</div>
                <div className="text-xs text-slate-400 mt-1">Across 28 states · ⭐ 4.8 avg</div>
              </div>

              <div className="bg-white rounded-2xl border border-olx-border p-5 shadow-sm">
                <div className="text-3xl font-extrabold">{counts[2].toLocaleString()}<span className="text-emerald-500 ml-1 align-super text-xl">+</span></div>
                <div className="text-sm font-semibold mt-1">Verified sellers</div>
                <div className="text-xs text-slate-400 mt-1">KYC & GST verified</div>
              </div>
            </div>
          </div>

          {/* Right column - mockup panel */}
          <div className="relative flex justify-center items-start pt-6">
            <div className="w-[460px] h-[380px] rounded-2xl bg-[#0b1720] shadow-2xl p-6 relative overflow-visible">
              <div className="absolute -right-8 -top-10 w-44 h-44 rounded-full bg-olx-teal/10" />

              <div className="grid grid-cols-3 gap-4 text-white">
                <div className="col-span-3 text-xs text-slate-400">LIVE LISTINGS</div>
                <div className="bg-slate-800/60 rounded-xl p-4 flex flex-col items-start gap-2">
                  <div className="text-sm text-emerald-300">Engine</div>
                  <div className="text-lg font-extrabold">₹18,500</div>
                </div>
                <div className="bg-slate-800/60 rounded-xl p-4 flex flex-col items-start gap-2">
                  <div className="text-sm text-emerald-300">Brakes</div>
                  <div className="text-lg font-extrabold">₹2,200</div>
                </div>
                <div className="bg-slate-800/60 rounded-xl p-4 flex flex-col items-start gap-2">
                  <div className="text-sm text-emerald-300">Electrical</div>
                  <div className="text-lg font-extrabold">₹4,800</div>
                </div>

                <div className="col-span-3 mt-2 bg-gradient-to-r from-olx-teal/40 to-transparent rounded-xl p-3">
                  <div className="text-sm text-slate-50">Nearest seller</div>
                  <div className="text-sm font-semibold">2.4 km away · Indore</div>
                </div>
              </div>

              {/* floating badges */}
              <div className="absolute -left-6 -top-6 bg-white rounded-lg px-4 py-2 shadow-md text-sm font-semibold">Just sold · <span className="text-olx-teal">Swift headlight · ₹1,800</span></div>
              <div className="absolute -right-6 bottom-4 bg-white rounded-lg px-4 py-2 shadow-md text-sm">New listing · 2 min ago · Pune</div>
              <div className="absolute right-6 -top-6 bg-white rounded-lg px-3 py-2 shadow-md text-sm">Saved vs new<br /><span className="text-emerald-600 font-extrabold">₹4,200 · 68%</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* <TopTicker /> */}
    </div>
  );
}
