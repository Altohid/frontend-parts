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
    <header className="w-full z-50">
      {/* Top thin announcement bar */}
      <div className="w-full bg-olx-teal text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <span className="flex items-center gap-2 text-sm">
            <strong className="mr-2">New:</strong>
            Book a mechanic for fitment right from checkout! 
            <a href="#" className="underline ml-2">Try it now →</a>
          </span>
        </div>
      </div>

      <nav className="bg-white border-b border-olx-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Left: logo */}
            <div className="flex items-center mr-6 shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-olx-teal to-teal-600 text-white shadow-premium">
                  <Car className="w-5 h-5" strokeWidth={2.5} />
                </span>
                <span className="text-xl font-extrabold tracking-tight text-olx-dark">AutoMart</span>
              </Link>
            </div>

            {/* Center: search (hidden on small screens) */}
            <div className="flex-1 hidden lg:flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="flex items-center rounded-full bg-slate-100/90 pl-4 pr-1 py-1 ring-1 ring-slate-200/80 focus-within:ring-2 focus-within:ring-olx-teal/30 transition-shadow">
                  <Search className="w-4 h-4 shrink-0 text-olx-muted" strokeWidth={2.25} />
                  <input
                    type="text"
                    placeholder="Search parts, OEM number, car model..."
                    className="flex-1 py-2.5 px-3 text-sm text-olx-dark placeholder:text-slate-400 outline-none bg-transparent font-medium"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        navigate('/parts');
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: links & auth */}
            <div className="ml-6 flex items-center gap-2">
              <button className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-olx-muted hover:text-olx-dark rounded-lg transition-colors">
                <MapPin className="w-4 h-4 text-olx-teal" />
                India
              </button>

              <Link to="/parts" className="hidden md:inline-flex px-3 py-2 text-sm font-semibold text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors">
                Browse
              </Link>
              <Link to="/contact" className="hidden md:inline-flex px-3 py-2 text-sm font-semibold text-olx-muted rounded-lg hover:bg-slate-100/80 transition-colors">
                Help
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="px-4 py-2 text-sm font-bold text-olx-dark rounded-lg hover:bg-slate-100/80 transition-colors">
                    Log in
                  </Link>
                  <Link to="/register" className="px-4 py-2.5 rounded-full bg-olx-teal text-white text-sm font-extrabold hover:brightness-95 transition-all">
                    Sign up
                  </Link>
                  <Link to="/login" className="flex items-center gap-1.5 ml-1 px-4 py-2.5 rounded-full bg-olx-sell text-olx-dark text-sm font-extrabold shadow-md">
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                    Sell
                  </Link>
                </>
              ) : (
                <>
                  {(user?.role === 'seller' || user?.role === 'admin') && (
                    <Link to="/add-part" className="hidden md:inline-flex items-center gap-1.5 ml-1 px-4 py-2.5 rounded-full bg-olx-sell text-olx-dark text-sm font-extrabold shadow-md">
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                      Sell
                    </Link>
                  )}

                  <div className="relative group ml-1">
                    <button type="button" className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl border border-transparent hover:border-olx-border text-sm font-semibold text-olx-dark transition-all">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-olx-dark">
                        <User className="w-4 h-4" />
                      </span>
                      <span className="max-w-[100px] truncate hidden lg:inline">{user?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-olx-border shadow-premium-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link to="/profile" className="block px-4 py-3 text-sm font-semibold text-olx-dark hover:bg-slate-50 rounded-t-xl">Profile</Link>
                      <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-semibold text-olx-dark hover:bg-slate-50 rounded-b-xl flex items-center gap-2 border-t border-olx-border">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button type="button" onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2.5 rounded-xl text-olx-dark hover:bg-slate-100 transition-colors" aria-label="Menu">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden py-4 space-y-1 border-t border-olx-border">
              <Link to="/parts" className="block py-3 px-2 text-olx-dark font-bold rounded-lg hover:bg-slate-50" onClick={() => setIsOpen(false)}>Browse</Link>
              <Link to="/contact" className="block py-3 px-2 text-olx-dark font-semibold rounded-lg hover:bg-slate-50" onClick={() => setIsOpen(false)}>Help</Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="block py-3 px-2 text-olx-dark font-bold" onClick={() => setIsOpen(false)}>Log in</Link>
                  <Link to="/register" className="block py-3 px-2 text-olx-dark font-bold" onClick={() => setIsOpen(false)}>Sign up</Link>
                  <Link to="/login" className="block py-3 px-2 font-extrabold text-olx-dark" onClick={() => setIsOpen(false)}>Sell</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="block py-3 px-2 text-olx-dark" onClick={() => setIsOpen(false)}>Profile</Link>
                  <button type="button" onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left py-3 px-2 text-olx-dark font-semibold">Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
