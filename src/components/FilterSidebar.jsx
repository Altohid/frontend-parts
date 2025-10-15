import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { CAR_BRANDS, BIKE_BRANDS, FUEL_TYPES, TRANSMISSION_TYPES } from '../utils/constants';

const FilterSidebar = ({ filters, onFilterChange, vehicleType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const brands = vehicleType === 'car' ? CAR_BRANDS : vehicleType === 'bike' ? BIKE_BRANDS : [];

  const handleReset = () => {
    onFilterChange({
      type: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuelType: '',
      transmission: '',
      minYear: '',
      maxYear: ''
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center">
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div>
          <label className="block text-white font-semibold mb-3">Brand</label>
          <select
            value={filters.brand || ''}
            onChange={(e) => onFilterChange({ ...filters, brand: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      )}

      {/* Price Range */}
      <div>
        <label className="block text-white font-semibold mb-3">Price Range (₹)</label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
          />
        </div>
      </div>

      {/* Year Range */}
      <div>
        <label className="block text-white font-semibold mb-3">Year</label>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Year"
            min="1990"
            max={new Date().getFullYear()}
            value={filters.minYear || ''}
            onChange={(e) => onFilterChange({ ...filters, minYear: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
          />
          <input
            type="number"
            placeholder="Max Year"
            min="1990"
            max={new Date().getFullYear()}
            value={filters.maxYear || ''}
            onChange={(e) => onFilterChange({ ...filters, maxYear: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
          />
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-white font-semibold mb-3">Fuel Type</label>
        <select
          value={filters.fuelType || ''}
          onChange={(e) => onFilterChange({ ...filters, fuelType: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
        >
          <option value="">All Types</option>
          {FUEL_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-white font-semibold mb-3">Transmission</label>
        <select
          value={filters.transmission || ''}
          onChange={(e) => onFilterChange({ ...filters, transmission: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
        >
          <option value="">All Types</option>
          {TRANSMISSION_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-3 bg-red-500/20 text-red-300 rounded-lg font-semibold hover:bg-red-500/30 transition"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-purple-500/50 transition"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-24">
        <FilterContent />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="lg:hidden fixed inset-y-0 right-0 w-80 bg-slate-900 p-6 z-50 overflow-y-auto">
            <FilterContent />
          </div>
        </>
      )}
    </>
  );
};

export default FilterSidebar;