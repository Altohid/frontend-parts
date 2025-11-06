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
    maxPrice: '',
    sort: 'newest',
    page: 1,
    limit: 12,
    nearLat: '',
    nearLng: '',
    nearRadiusKm: ''
  });
  const [activeType, setActiveType] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [useNearby, setUseNearby] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const params = { ...filters };
      if (!useNearby) {
        delete params.nearLat; delete params.nearLng; delete params.nearRadiusKm;
      }
      const data = await vehicleService.getVehicles(params);
      setVehicles(data.data);
      setTotalPages(Number(data.totalPages || 1));
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

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setFilters(f => ({ ...f, nearLat: latitude, nearLng: longitude, nearRadiusKm: f.nearRadiusKm || 25 }));
      setUseNearby(true);
    });
  };

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
                className={`px-6 py-3 rounded-lg transition ${activeType === ''
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => handleTypeChange('car')}
                className={`px-6 py-3 rounded-lg transition flex items-center space-x-2 ${activeType === 'car'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                <Car className="w-5 h-5" />
                <span>Cars</span>
              </button>
              <button
                onClick={() => handleTypeChange('bike')}
                className={`px-6 py-3 rounded-lg transition flex items-center space-x-2 ${activeType === 'bike'
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
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                style={{ position: 'relative', overflow: 'visible', direction: 'ltr' }}
              >
                <option value="" className="text-white bg-purple-600">All Brands</option>
                {[
                  'Honda', 'Yamaha', 'Hero', 'TVS', 'Bajaj', 'Suzuki', 'KTM', 'Royal Enfield',
                  'Mahindra', 'Hyundai', 'Tata', 'Maruti Suzuki', 'Toyota', 'Kia', 'Ford',
                  'Volkswagen', 'Nissan'
                ].map((brand) => (
                  <option key={brand} value={brand} className="text-black bg-white">
                    {brand}
                  </option>
                ))}
              </select>

            </div>
            <div>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value="" className="text-white bg-purple-600">
                  All Status
                </option>
                <option value="available" className="text-black bg-white">
                  Available
                </option>
                <option value="sold" className="text-black bg-white">
                  Sold
                </option>
                <option value="pending" className="text-black bg-white">
                  Pending
                </option>
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
          <div>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
            >
              <option value="newest" className="text-black bg-white">Newest</option>
              <option value="oldest" className="text-black bg-white">Oldest</option>
              <option value="price_asc" className="text-black bg-white">Price: Low to High</option>
              <option value="price_desc" className="text-black bg-white">Price: High to Low</option>
              <option value="year_desc" className="text-black bg-white">Year: New to Old</option>
              <option value="year_asc" className="text-black bg-white">Year: Old to New</option>
              <option value="popular" className="text-black bg-white">Most Viewed</option>
            </select>
          </div>
          <div className="md:col-span-2 flex items-center gap-2">
            <label className="text-white flex items-center gap-2">
              <input
                type="checkbox"
                checked={useNearby}
                onChange={(e) => setUseNearby(e.target.checked)}
              />
              Nearby
            </label>
            <button
              type="button"
              onClick={useMyLocation}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Use My Location
            </button>
            {useNearby && (
              <input
                type="number"
                min="1"
                placeholder="Radius (km)"
                value={filters.nearRadiusKm}
                onChange={(e) => setFilters({ ...filters, nearRadiusKm: e.target.value, page: 1 })}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
              />
            )}
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
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={filters.page <= 1}
            onClick={() => setFilters({ ...filters, page: Math.max(1, Number(filters.page) - 1) })}
            className="px-4 py-2 bg-white/10 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white">Page {filters.page} of {totalPages}</span>
          <button
            disabled={filters.page >= totalPages}
            onClick={() => setFilters({ ...filters, page: Math.min(totalPages, Number(filters.page) + 1) })}
            className="px-4 py-2 bg-white/10 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
