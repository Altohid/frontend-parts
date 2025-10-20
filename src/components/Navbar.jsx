import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, LogOut, Plus, LayoutDashboard } from 'lucide-react';
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
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Car className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition" />
            <span className="text-2xl font-bold text-white">AutoMart</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-purple-400 transition">
              Home
            </Link>
            <Link to="/vehicles" className="text-white hover:text-purple-400 transition">
              Browse
            </Link>
            
            {isAuthenticated ? (
              <>
                {(user?.role === 'seller' || user?.role === 'admin') && (
                  <>
                    <Link 
                      to="/add-vehicle" 
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Sell Vehicle</span>
                    </Link>
                    
                    <Link 
                      to="/my-listings" 
                      className="text-white hover:text-purple-400 transition"
                    >
                      My Listings
                    </Link>
                  </>
                )}

                {isAdmin && (
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 text-white hover:text-purple-400 transition"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}

                <div className="relative group">
                  <button className="flex items-center space-x-2 text-white">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-3 text-white hover:bg-slate-700 rounded-t-lg"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-white hover:bg-slate-700 rounded-b-lg flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-purple-400 transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-white hover:text-purple-400">
              Home
            </Link>
            <Link to="/vehicles" className="block text-white hover:text-purple-400">
              Browse
            </Link>
            
            {isAuthenticated ? (
              <>
                {(user?.role === 'seller' || user?.role === 'admin') && (
                  <>
                    <Link to="/add-vehicle" className="block text-white hover:text-purple-400">
                      Sell Vehicle
                    </Link>
                    <Link to="/my-listings" className="block text-white hover:text-purple-400">
                      My Listings
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link to="/dashboard" className="block text-white hover:text-purple-400">
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" className="block text-white hover:text-purple-400">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left text-white hover:text-purple-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-purple-400">
                  Login
                </Link>
                <Link to="/register" className="block text-white hover:text-purple-400">
                  Sign Up
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