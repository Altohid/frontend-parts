import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CAR_BRANDS, BIKE_BRANDS } from '../utils/constants';

const SearchBar = ({ onSearch, vehicleType = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ search: searchTerm, brand: selectedBrand });
  };

  const brands = vehicleType === 'car' ? CAR_BRANDS : vehicleType === 'bike' ? BIKE_BRANDS : [...CAR_BRANDS, ...BIKE_BRANDS];

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col md:flex-row gap-2 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
        <div className="flex-1 flex items-center px-4 py-3 bg-white/5 rounded-xl">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search by brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
          />
        </div>

        <div className="flex items-center px-4 py-3 bg-white/5 rounded-xl min-w-[200px]">
          <Filter className="w-5 h-5 text-gray-400 mr-3" />
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-white text-black outline-none w-full rounded-md px-2 py-1"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;