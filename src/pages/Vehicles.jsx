import React, { useState, useEffect } from 'react';
import { Search, Filter, Car, Bike } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import { vehicleService } from '../services/vehicleService';
import { CAR_BRANDS, BIKE_BRANDS } from '../utils/constants';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    brand: '',
    search: '',
    minPrice: '',
    maxPrice: ''
  });
  const [activeType, setActiveType] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getVehicles(filters);
      setVehicles(data.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setFilters({ ...filters, type, brand: '' });
  };

  const brands = activeType === 'car' ? CAR_BRANDS : activeType === 'bike' ? BIKE_BRANDS : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Browse Vehicles
        </h1>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          {/* Type Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-1 flex border border-white/20">
              <button
                onClick={() => handleTypeChange('')}
                className={`px-6 py-3 rounded-lg transition ${
                  activeType === '' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTypeChange('car')}
                className={`px-6 py-3 rounded-lg transition flex items-center space-x-2 ${
                  activeType === 'car' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Car className="w-5 h-5" />
                <span>Cars</span>
              </button>
              <button
                onClick={() => handleTypeChange('bike')}
                className={`px-6 py-3 rounded-lg transition flex items-center space-x-2 ${
                  activeType === 'bike' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Bike className="w-5 h-5" />
                <span>Bikes</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by brand or model..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            </div>

            <div>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-1/2 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-1/2 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center text-white text-xl">Loading vehicles...</div>
        ) : vehicles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(vehicle => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white text-xl py-12">
            No vehicles found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
