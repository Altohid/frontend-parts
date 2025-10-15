import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Car, Bike, X } from 'lucide-react';
import { vehicleService } from '../services/vehicleService';
import { CAR_BRANDS, BIKE_BRANDS, FUEL_TYPES, TRANSMISSION_TYPES } from '../utils/constants';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    type: 'car',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    description: '',
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: { city: '', state: '' },
    features: []
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'location') {
          data.append('location', JSON.stringify(formData.location));
        } else if (key === 'features') {
          data.append('features', JSON.stringify(formData.features));
        } else {
          data.append(key, formData[key]);
        }
      });

      // Append images
      images.forEach(image => {
        data.append('images', image);
      });

      await vehicleService.addVehicle(data);
      navigate('/my-listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 5 - images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    setImages([...images, ...filesToAdd]);

    // Create previews
    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (featureInput.trim() && formData.features.length < 10) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const brands = formData.type === 'car' ? CAR_BRANDS : BIKE_BRANDS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">List Your Vehicle</h1>
          <p className="text-gray-300">Fill in the details to list your vehicle for sale</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Type */}
            <div>
              <label className="block text-white font-semibold mb-3">Vehicle Type *</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'car', brand: '' })}
                  className={`py-4 rounded-lg border-2 transition flex items-center justify-center space-x-3 ${formData.type === 'car'
                    ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 border-white/20 text-gray-300 hover:border-purple-500'
                    }`}
                >
                  <Car className="w-6 h-6" />
                  <span className="font-semibold">Car</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'bike', brand: '' })}
                  className={`py-4 rounded-lg border-2 transition flex items-center justify-center space-x-3 ${formData.type === 'bike'
                    ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 border-white/20 text-gray-300 hover:border-purple-500'
                    }`}
                >
                  <Bike className="w-6 h-6" />
                  <span className="font-semibold">Bike</span>
                </button>
              </div>
            </div>

            {/* Brand & Model */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Brand *</label>
                <select
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                >
                  <option value="" className="text-white bg-black">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand} className="text-black bg-white">
                      {brand}
                    </option>
                  ))}
                </select>

              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Model *</label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                  placeholder="e.g., Swift, City, Classic 350"
                />
              </div>
            </div>

            {/* Year & Price */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Year *</label>
                <input
                  type="number"
                  required
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                  placeholder="500000"
                />
              </div>
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-white font-semibold mb-2">
                {formData.type === 'car' ? 'Kilometers Driven *' : 'Kilometers Driven *'}
              </label>
              <input
                type="text"
                required
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                placeholder="e.g., 25000 km or 15 km/l"
              />
            </div>

            {/* Fuel Type & Transmission */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Fuel Type</label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                >
                  {FUEL_TYPES.map(type => (
                    <option key={type} value={type} className="text-black bg-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Transmission</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                >
                  {TRANSMISSION_TYPES.map(type => (
                    <option key={type} value={type} className="text-black bg-white">
                      {type}
                    </option>
                  ))}
                </select>

              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">City</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                  placeholder="e.g., Mumbai"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">State</label>
                <input
                  type="text"
                  value={formData.location.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, state: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                  placeholder="e.g., Maharashtra"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition resize-none"
                placeholder="Describe your vehicle's condition, service history, etc..."
              ></textarea>
            </div>

            {/* Features */}
            <div>
              <label className="block text-white font-semibold mb-2">Features (Optional)</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                  placeholder="e.g., AC, Power Steering, ABS"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition"
                >
                  Add
                </button>
              </div>
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="hover:text-red-400 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Upload Images ({images.length}/5)
              </label>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-4 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {images.length < 5 && (
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer"
                  >
                    <span className="text-purple-400 hover:text-purple-300 font-semibold">
                      Click to upload images
                    </span>
                    <p className="text-gray-400 text-sm mt-2">
                      PNG, JPG up to 5MB each (Max 5 images)
                    </p>
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Adding Vehicle...' : 'List Vehicle'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;