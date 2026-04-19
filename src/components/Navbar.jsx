import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, LogOut, Plus, LayoutDashboard, MapPin, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl backdrop-saturate-150 shadow-olx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[4.25rem]">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-olx-teal to-teal-600 text-white shadow-premium ring-1 ring-white/20">
              <Car className="w-5 h-5" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-olx-dark">AutoMart</span>
          </Link>

          <div className="hidden lg:flex flex-1 max-w-lg mx-6 xl:mx-10">
            <div className="flex w-full items-center gap-0 rounded-xl bg-slate-100/90 pl-4 pr-1 py-1 ring-1 ring-slate-200/80 focus-within:ring-2 focus-within:ring-olx-teal/30 focus-within:bg-white transition-shadow">
              <Search className="w-4 h-4 shrink-0 text-olx-muted" strokeWidth={2.25} />
              <input
                type="text"
                placeholder="Search cars, bikes, brands…"
                className="flex-1 py-2.5 px-3 text-sm text-olx-dark placeholder:text-slate-400 outline-none bg-transparent font-medium min-w-0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    navigate('/vehicles');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => navigate('/vehicles')}
                className="shrink-0 rounded-lg px-4 py-2 bg-olx-dark text-white text-sm font-bold shadow-sm hover:bg-[#0d3d42] hover:shadow-md transition-all duration-250"
              >
                Search
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-0.5 lg:gap-2">
            <button
              type="button"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-olx-muted hover:text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors"
            >
              <MapPin className="w-4 h-4 text-olx-teal" />
              India
            </button>

            <Link
              to="/vehicles"
              className="px-3 py-2 text-sm font-semibold text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-semibold text-olx-muted hover:text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors"
            >
              Help
            </Link>

            {isAuthenticated ? (
              <>
                {(user?.role === 'seller' || user?.role === 'admin') && (
                  <>
                    <Link
                      to="/add-vehicle"
                      className="flex items-center gap-1.5 ml-1 px-4 py-2.5 rounded-xl bg-olx-sell text-olx-dark text-sm font-extrabold shadow-md shadow-amber-200/40 hover:brightness-105 active:scale-[0.98] transition-all"
                    >
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                      Sell
                    </Link>
                    <Link
                      to="/my-listings"
                      className="px-3 py-2 text-sm font-semibold text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors"
                    >
                      My listings
                    </Link>
                  </>
                )}

                {isAdmin && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}

                <div className="relative group ml-1">
                  <button
                    type="button"
                    className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl border border-transparent hover:border-olx-border hover:bg-white text-sm font-semibold text-olx-dark transition-all"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-olx-dark">
                      <User className="w-4 h-4" />
                    </span>
                    <span className="max-w-[100px] truncate hidden lg:inline">{user?.name}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-olx-border shadow-premium-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm font-semibold text-olx-dark hover:bg-slate-50 rounded-t-xl"
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-olx-dark hover:bg-slate-50 rounded-b-xl flex items-center gap-2 border-t border-olx-border"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-bold text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2.5 rounded-xl border-2 border-olx-dark text-olx-dark text-sm font-extrabold hover:bg-olx-dark hover:text-white transition-all duration-250"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 ml-1 px-4 py-2.5 rounded-xl bg-olx-sell text-olx-dark text-sm font-extrabold shadow-md shadow-amber-200/40 hover:brightness-105 transition-all"
                >
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                  Sell
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl text-olx-dark hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-olx-border">
            <Link
              to="/vehicles"
              className="block py-3 px-2 text-olx-dark font-bold rounded-lg hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/contact"
              className="block py-3 px-2 text-olx-dark font-semibold rounded-lg hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              Help
            </Link>
            {isAuthenticated ? (
              <>
                {(user?.role === 'seller' || user?.role === 'admin') && (
                  <>
                    <Link
                      to="/add-vehicle"
                      className="block py-3 px-2 font-extrabold text-olx-dark"
                      onClick={() => setIsOpen(false)}
                    >
                      Sell
                    </Link>
                    <Link
                      to="/my-listings"
                      className="block py-3 px-2 text-olx-dark"
                      onClick={() => setIsOpen(false)}
                    >
                      My listings
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link
                    to="/dashboard"
                    className="block py-3 px-2 text-olx-dark"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block py-3 px-2 text-olx-dark"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-3 px-2 text-olx-dark font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-3 px-2 text-olx-dark font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block py-3 px-2 text-olx-dark font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="block py-3 px-2 font-extrabold text-olx-dark"
                  onClick={() => setIsOpen(false)}
                >
                  Sell
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
