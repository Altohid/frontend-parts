import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.put('/users/profile', formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-fixed bg-contain bg-no-repeat bg-cover relative"
      style={{
        backgroundImage: "url('/6.webp')",
        filter: 'brightness(1.3)',
        backgroundSize: 'cover', // keeps image compressed
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 z-10">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">My Profile</h1>

        {/* User Info */}
        <div className="mb-8 pb-8 border-b border-white/20 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <p className="text-gray-300">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {message.text && (
            <div
              className={`p-4 rounded-lg border text-center ${
                message.type === 'success'
                  ? 'bg-green-500/20 border-green-500 text-green-200'
                  : 'bg-red-500/20 border-red-500 text-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-white font-semibold mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Email (Cannot be changed)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </form>

        {/* Account Stats */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <h3 className="text-white font-semibold mb-4 text-center">Account Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm mb-1">
                <Calendar className="w-4 h-4" />
                <span>Member Since</span>
              </div>
              <div className="text-white font-semibold">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'N/A'}
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-gray-300 text-sm mb-1">Account Status</div>
              {user?.isVerified === false ? (
                <div className="text-yellow-300 font-semibold flex justify-center items-center">
                  <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
                  Pending Verification
                </div>
              ) : user?.isActive === false ? (
                <div className="text-red-400 font-semibold flex justify-center items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  Inactive
                </div>
              ) : (
                <div className="text-green-400 font-semibold flex justify-center items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Active
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
