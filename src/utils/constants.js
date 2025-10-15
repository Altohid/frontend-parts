export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Base URL (without the /api prefix) used for serving static assets like uploaded images
export const API_BASE = API_URL.replace(/\/api\/?$/, '');

// Helper to produce a fully-qualified image URL. If the stored URL is already absolute,
// return it as-is. If it's a relative path (e.g. '/uploads/filename.jpg'), prefix it
// with the backend base URL so the browser requests the correct host.
export function fullImageUrl(url) {
  if (!url) return '';
  // already absolute
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
}

export const VEHICLE_TYPES = ['car', 'bike'];

export const CAR_BRANDS = [
  'Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Mahindra',
  'Toyota', 'Ford', 'Volkswagen', 'Renault', 'Nissan'
];

export const BIKE_BRANDS = [
  'Hero', 'Honda', 'Bajaj', 'TVS', 'Royal Enfield',
  'Yamaha', 'KTM', 'Suzuki', 'Kawasaki', 'Harley-Davidson'
];

export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'];
export const TRANSMISSION_TYPES = ['Manual', 'Automatic'];