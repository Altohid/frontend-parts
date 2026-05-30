import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { title: 'Engine & Drivetrain', count: '2,800+ parts', tag: 'Popular', icon: '⚙️' },
  { title: 'Transmission & Gearbox', count: '1,600+ parts', tag: null, icon: '🔧' },
  { title: 'Brakes & Suspension', count: '2,100+ parts', tag: 'Safety', icon: '🛡️' },
  { title: 'Electrical & Electronics', count: '1,900+ parts', tag: null, icon: '⚡' },
  { title: 'Fuel & Exhaust', count: '980+ parts', tag: null, icon: '⛽' },

  { title: 'Cooling & AC System', count: '740+ parts', tag: null, icon: '❄️' },
  { title: 'Body & Exterior', count: '1,400+ parts', tag: 'Popular', icon: '🚘' },
  { title: 'Interior & Cabin', count: '860+ parts', tag: null, icon: '🪑' },
  { title: 'EV Parts', count: '370+ parts', tag: 'EV', icon: '🔌' },
  { title: 'Filters, Fluids & Service', count: '680+ parts', tag: 'B2B', icon: '🧰' },
];

const CategoryCard = ({ c }) => (
  <Link to="/parts" className="group block rounded-2xl border border-slate-200 bg-white p-6 relative hover:translate-y-1 transition-transform duration-150">
    {c.tag && (
      <div className="absolute right-4 top-4 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 px-2 py-0.5">{c.tag}</div>
    )}

    <div className="flex flex-col items-center justify-center gap-4">
      <div className="h-16 w-16 rounded-lg bg-emerald-50 flex items-center justify-center text-2xl border border-emerald-100">{c.icon}</div>
      <div className="text-center font-semibold text-olx-dark text-lg">{c.title}</div>
      <div className="text-sm text-slate-400 mt-1">{c.count}</div>
    </div>
  </Link>
);

const Categories = () => {
  return (
    <section className="py-12">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-emerald-600 text-xs font-semibold">BROWSE BY CATEGORY</div>
            <h3 className="text-5xl font-extrabold mt-2 leading-tight">Find parts by what your car needs</h3>
          </div>

          <Link to="/parts" className="inline-flex items-center gap-2 text-emerald-600 font-medium">View all 10 categories <ChevronRight className="w-4 h-4" /></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
