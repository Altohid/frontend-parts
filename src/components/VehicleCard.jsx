import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Gauge, MapPin, ChevronRight } from 'lucide-react';

const VehicleCard = ({ vehicle, showStatus = true }) => {
  const getStatusBadge = () => {
    const statusConfig = {
      available: {
        bg: 'bg-green-500/20',
        text: 'text-green-300',
        border: 'border-green-500/50',
        label: 'Available'
      },
      sold: {
        bg: 'bg-red-500/20',
        text: 'text-red-300',
        border: 'border-red-500/50',
        label: 'Sold'
      },
      pending: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-300',
        border: 'border-yellow-500/50',
        label: 'Pending'
      }
    };

    const config = statusConfig[vehicle.status] || statusConfig.available;

    return (
      <span className={`absolute top-3 right-3 px-3 py-1 ${config.bg} ${config.text} border ${config.border} rounded-full text-xs font-semibold backdrop-blur-sm z-10`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group relative">
      {/* Status Badge */}
      {showStatus && getStatusBadge()}

      {/* Image */}
      <div className={`h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden relative ${vehicle.status === 'sold' ? 'opacity-75' : ''}`}>
        {vehicle.images && vehicle.images.length > 0 ? (
          <img 
            src={vehicle.images[0].url} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {vehicle.type === 'car' ? '🚗' : '🏍️'}
          </div>
        )}
        {vehicle.status === 'sold' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-2xl font-bold transform -rotate-12">SOLD</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">
            {vehicle.brand} {vehicle.model}
          </h3>
          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
            {vehicle.year}
          </span>
        </div>

        <div className="text-2xl font-bold text-purple-400 mb-4">
          ₹{vehicle.price.toLocaleString('en-IN')}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300 text-sm">
            <Gauge className="w-4 h-4 mr-2" />
            {vehicle.mileage}
          </div>
          {vehicle.location && (
            <div className="flex items-center text-gray-300 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {vehicle.location.city}, {vehicle.location.state}
            </div>
          )}
        </div>

        <Link 
          to={`/vehicles/${vehicle._id}`}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;