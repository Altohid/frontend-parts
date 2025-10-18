import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { vehicleService } from '../services/vehicleService';

const MyListings = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    fetchMyVehicles();
  }, []);

  const fetchMyVehicles = async () => {
    try {
      const data = await vehicleService.getMyVehicles();
      setVehicles(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await vehicleService.deleteVehicle(id);
      setVehicles(vehicles.filter(v => v._id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingStatus(id);
    try {
      await vehicleService.updateVehicleStatus(id, newStatus);
      
      // Update local state
      setVehicles(vehicles.map(v => 
        v._id === id ? { ...v, status: newStatus } : v
      ));
      
      // Show success message
      alert(`Vehicle marked as ${newStatus}!`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update vehicle status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusButton = (vehicle) => {
    const isUpdating = updatingStatus === vehicle._id;
    
    if (vehicle.status === 'available') {
      return (
        <div className="flex space-x-2">
          <button
            onClick={() => handleStatusUpdate(vehicle._id, 'pending')}
            disabled={isUpdating}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition disabled:opacity-50"
          >
            <Clock className="w-4 h-4" />
            <span>{isUpdating ? 'Updating...' : 'Mark Pending'}</span>
          </button>
          <button
            onClick={() => handleStatusUpdate(vehicle._id, 'sold')}
            disabled={isUpdating}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition disabled:opacity-50"
          >
            <XCircle className="w-4 h-4" />
            <span>{isUpdating ? 'Updating...' : 'Mark Sold'}</span>
          </button>
        </div>
      );
    } else if (vehicle.status === 'pending') {
      return (
        <div className="flex space-x-2">
          <button
            onClick={() => handleStatusUpdate(vehicle._id, 'available')}
            disabled={isUpdating}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isUpdating ? 'Updating...' : 'Mark Available'}</span>
          </button>
          <button
            onClick={() => handleStatusUpdate(vehicle._id, 'sold')}
            disabled={isUpdating}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition disabled:opacity-50"
          >
            <XCircle className="w-4 h-4" />
            <span>{isUpdating ? 'Updating...' : 'Mark Sold'}</span>
          </button>
        </div>
      );
    } else {
      // status === 'sold'
      return (
        <button
          onClick={() => handleStatusUpdate(vehicle._id, 'available')}
          disabled={isUpdating}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isUpdating ? 'Updating...' : 'Relist as Available'}</span>
        </button>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading your listings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Listings</h1>
            <p className="text-gray-300">Manage your vehicle listings and track their status</p>
          </div>
          <Link 
            to="/add-vehicle"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Vehicle</span>
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Available</p>
                <p className="text-3xl font-bold text-green-400">
                  {vehicles.filter(v => v.status === 'available').length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {vehicles.filter(v => v.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Sold</p>
                <p className="text-3xl font-bold text-red-400">
                  {vehicles.filter(v => v.status === 'sold').length}
                </p>
              </div>
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
          </div>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <p className="text-white text-xl mb-4">You haven't listed any vehicles yet</p>
            <Link 
              to="/add-vehicle"
              className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              List Your First Vehicle
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {vehicles.map(vehicle => (
              <div key={vehicle._id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg overflow-hidden flex-shrink-0 relative">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <img 
                        src={vehicle.images[0].url} 
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        {vehicle.type === 'car' ? '🚗' : '🏍️'}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-300">
                          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded">
                            {vehicle.year}
                          </span>
                          <span className="capitalize">{vehicle.type}</span>
                          <span>{vehicle.mileage}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-400">
                          ₹{vehicle.price.toLocaleString('en-IN')}
                        </div>
                        <div className="flex items-center text-gray-300 text-sm mt-2">
                          <Eye className="w-4 h-4 mr-1" />
                          {vehicle.views} views
                        </div>
                      </div>
                    </div>

                    {vehicle.description && (
                      <p className="text-gray-300 mb-4 line-clamp-2">{vehicle.description}</p>
                    )}

                    {/* Status Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        vehicle.status === 'available' 
                          ? 'bg-green-500/20 text-green-300' 
                          : vehicle.status === 'sold'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/vehicles/${vehicle._id}`}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </Link>
                      
                      {/* Status Update Buttons */}
                      {getStatusButton(vehicle)}
                      
                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;