import React, { useState, useEffect } from 'react';
import { Users, Car, TrendingUp, Eye, Trash2 } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, vehiclesRes] = await Promise.all([
        api.get('/users/admin/stats'),
        api.get('/users/admin/users'),
        api.get('/vehicles')
      ]);

      setStats(statsRes.data.data);
      setUsers(usersRes.data.data);
      setVehicles(vehiclesRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/users/admin/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      await api.delete(`/vehicles/${vehicleId}`);
      setVehicles(vehicles.filter(v => v._id !== vehicleId));
      alert('Vehicle deleted successfully');
    } catch (error) {
      alert('Failed to delete vehicle');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-400" />
              <span className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</span>
            </div>
            <h3 className="text-gray-300 font-semibold">Total Users</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <Car className="w-10 h-10 text-purple-400" />
              <span className="text-3xl font-bold text-white">{stats?.totalVehicles || 0}</span>
            </div>
            <h3 className="text-gray-300 font-semibold">Total Vehicles</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-green-400" />
              <span className="text-3xl font-bold text-white">{stats?.availableVehicles || 0}</span>
            </div>
            <h3 className="text-gray-300 font-semibold">Available</h3>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-10 h-10 text-yellow-400" />
              <span className="text-3xl font-bold text-white">{stats?.soldVehicles || 0}</span>
            </div>
            <h3 className="text-gray-300 font-semibold">Sold</h3>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Vehicle Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Cars</span>
                <span className="text-2xl font-bold text-purple-400">{stats?.totalCars || 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                  style={{ width: `${stats?.totalVehicles ? (stats.totalCars / stats.totalVehicles) * 100 : 0}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-gray-300">Bikes</span>
                <span className="text-2xl font-bold text-blue-400">{stats?.totalBikes || 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                  style={{ width: `${stats?.totalVehicles ? (stats.totalBikes / stats.totalVehicles) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Status Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Available</span>
                <span className="text-2xl font-bold text-green-400">{stats?.availableVehicles || 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: `${stats?.totalVehicles ? (stats.availableVehicles / stats.totalVehicles) * 100 : 0}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-gray-300">Sold</span>
                <span className="text-2xl font-bold text-red-400">{stats?.soldVehicles || 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all"
                  style={{ width: `${stats?.totalVehicles ? (stats.soldVehicles / stats.totalVehicles) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'users'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'vehicles'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Vehicles ({vehicles.length})
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Platform Overview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">New Users Today</span>
                        <span className="text-green-400 font-bold">+12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">New Listings Today</span>
                        <span className="text-blue-400 font-bold">+8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Vehicles Sold Today</span>
                        <span className="text-purple-400 font-bold">+5</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Average Price</span>
                        <span className="text-yellow-400 font-bold">₹6.5L</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Total Views</span>
                        <span className="text-cyan-400 font-bold">45.2K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Active Sellers</span>
                        <span className="text-pink-400 font-bold">{users.filter(u => u.role === 'seller').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left text-gray-300 py-3 px-4">Name</th>
                        <th className="text-left text-gray-300 py-3 px-4">Email</th>
                        <th className="text-left text-gray-300 py-3 px-4">Phone</th>
                        <th className="text-left text-gray-300 py-3 px-4">Role</th>
                        <th className="text-left text-gray-300 py-3 px-4">Joined</th>
                        <th className="text-left text-gray-300 py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id} className="border-b border-white/10 hover:bg-white/5 transition">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {user.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-white font-semibold">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{user.email}</td>
                          <td className="py-4 px-4 text-gray-300">{user.phone || 'N/A'}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              user.role === 'admin'
                                ? 'bg-red-500/20 text-red-300'
                                : user.role === 'seller'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-green-500/20 text-green-300'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="text-red-400 hover:text-red-300 transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className="text-center py-8 text-gray-400">No users found</div>
                  )}
                </div>
              </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Manage Vehicles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map(vehicle => (
                    <div key={vehicle._id} className="bg-white/5 rounded-xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition">
                      <div className="h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          {vehicle.images && vehicle.images.length > 0 ? (
                            <img 
                              src={fullImageUrl(vehicle.images[0].url)} 
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-5xl">
                            {vehicle.type === 'car' ? '🚗' : '🏍️'}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-purple-400 font-bold">
                            ₹{vehicle.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-gray-400 text-sm">{vehicle.year}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            vehicle.status === 'available'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {vehicle.status}
                          </span>
                          <button
                            onClick={() => handleDeleteVehicle(vehicle._id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {vehicles.length === 0 && (
                  <div className="text-center py-12 text-gray-400">No vehicles found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;