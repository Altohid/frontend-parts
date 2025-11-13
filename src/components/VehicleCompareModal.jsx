import React from 'react';
import { X, Trash2, CheckCircle, User } from 'lucide-react';
import { fullImageUrl } from '../utils/constants';

const VehicleCompareModal = ({ isOpen, onClose, vehicles = [], onRemove }) => {
  if (!isOpen) return null;

  const hasEnoughVehicles = vehicles.length >= 2;

  const renderPrice = (price) => {
    if (typeof price !== 'number') return 'N/A';
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const formatLocation = (vehicle) => {
    if (!vehicle?.location) return 'N/A';
    const { city = '', state = '' } = vehicle.location;
    const parts = [city, state].filter(Boolean);
    return parts.length ? parts.join(', ') : 'N/A';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { label: 'Available', color: 'text-green-300' },
      sold: { label: 'Sold', color: 'text-red-300' },
      pending: { label: 'Pending', color: 'text-yellow-300' }
    };
    const config = statusConfig[status] || statusConfig.available;
    return <span className={config.color}>{config.label}</span>;
  };

  const attributes = [
    {
      key: 'type',
      label: 'Type',
      render: (vehicle) => vehicle.type ? vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1) : 'N/A'
    },
    {
      key: 'brand',
      label: 'Brand',
      render: (vehicle) => vehicle.brand || 'N/A'
    },
    {
      key: 'model',
      label: 'Model',
      render: (vehicle) => vehicle.model || 'N/A'
    },
    {
      key: 'year',
      label: 'Year',
      render: (vehicle) => vehicle.year || 'N/A'
    },
    {
      key: 'price',
      label: 'Price',
      render: (vehicle) => renderPrice(vehicle.price)
    },
    {
      key: 'kilometersDriven',
      label: 'Kilometers Driven',
      render: (vehicle) => {
        if (vehicle.kilometersDriven !== undefined && vehicle.kilometersDriven !== null) {
          return `${vehicle.kilometersDriven.toLocaleString('en-IN')} km`;
        }
        return 'N/A';
      }
    },
    {
      key: 'mileage',
      label: 'Mileage',
      render: (vehicle) => {
        if (!vehicle.mileage || vehicle.mileage === '') return 'N/A';
        // Format mileage with units if not already included
        const mileageValue = vehicle.mileage.toString().trim();
        // Check if it already has units
        if (mileageValue.match(/\d+\s*(km\/l|kmpl|km\/L|mpg|km\/kg)/i)) {
          return mileageValue;
        }
        // Add km/l if it's just a number
        if (mileageValue.match(/^\d+\.?\d*$/)) {
          return `${mileageValue} km/l`;
        }
        return mileageValue;
      }
    },
    {
      key: 'fuelType',
      label: 'Fuel Type',
      render: (vehicle) => vehicle.fuelType || 'N/A'
    },
    {
      key: 'transmission',
      label: 'Transmission',
      render: (vehicle) => vehicle.transmission || 'N/A'
    },
    {
      key: 'ownership',
      label: 'Ownership',
      render: (vehicle) => vehicle.ownership || 'N/A'
    },
    {
      key: 'location',
      label: 'Location',
      render: (vehicle) => formatLocation(vehicle)
    },
    {
      key: 'status',
      label: 'Status',
      render: (vehicle) => getStatusBadge(vehicle.status)
    },
    {
      key: 'description',
      label: 'Description',
      render: (vehicle) => 
        vehicle.description ? (
          <p className="text-sm text-gray-100 max-w-xs">{vehicle.description}</p>
        ) : (
          <span className="text-gray-400">N/A</span>
        )
    },
    {
      key: 'features',
      label: 'All Features',
      render: (vehicle) =>
        Array.isArray(vehicle.features) && vehicle.features.length > 0 ? (
          <ul className="space-y-1 text-sm text-gray-100">
            {vehicle.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-400">N/A</span>
        )
    },
    {
      key: 'sellerName',
      label: 'Seller Name',
      render: (vehicle) => 
        vehicle.sellerId?.name ? (
          <div className="flex items-center gap-2 text-gray-100">
            <User className="w-4 h-4 text-purple-400" />
            <span>{vehicle.sellerId.name}</span>
          </div>
        ) : (
          <span className="text-gray-400">N/A</span>
        )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8">
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col rounded-3xl border border-purple-500/40 bg-slate-900/95 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-white">Vehicle Comparison</h2>
            <p className="text-sm text-gray-300">
              {hasEnoughVehicles
                ? `Comparing ${vehicles.length} ${vehicles[0].type === 'bike' ? 'bikes' : 'four wheelers'}`
                : 'Select at least two vehicles to compare'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-purple-400 hover:bg-purple-500/20"
            aria-label="Close comparison"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 z-20">
              <tr>
                <th className="w-48 bg-slate-900/95 backdrop-blur-sm px-6 py-6 text-left text-sm font-semibold uppercase tracking-wide text-gray-300 border-b border-white/10">Overview</th>
                {vehicles.map((vehicle) => (
                  <th key={vehicle._id} className="min-w-[280px] border-l border-white/10 bg-slate-900/95 backdrop-blur-sm px-6 py-6 align-top border-b border-white/10">
                    <div className="flex flex-col items-start gap-4 text-left text-white">
                      <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {vehicle.images && vehicle.images.length > 0 ? (
                          <img
                            src={fullImageUrl(vehicle.images[0].url)}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="h-36 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-36 w-full items-center justify-center text-5xl">
                            {vehicle.type === 'car' ? '🚗' : '🏍️'}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">
                          {vehicle.brand} {vehicle.model}
                        </div>
                        <div className="text-sm text-purple-300">{renderPrice(vehicle.price)}</div>
                      </div>
                      {typeof onRemove === 'function' && (
                        <button
                          type="button"
                          onClick={() => onRemove(vehicle._id)}
                          className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-sm text-red-200 transition hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {hasEnoughVehicles && (
              <tbody>
                {attributes.map((attribute) => (
                  <tr key={attribute.key} className="border-t border-white/5">
                    <td className="bg-white/[0.04] px-6 py-5 text-sm font-medium uppercase tracking-wide text-purple-200">
                      {attribute.label}
                    </td>
                    {vehicles.map((vehicle) => (
                      <td key={vehicle._id + attribute.key} className="border-l border-white/10 px-6 py-5 text-sm text-gray-100 align-top">
                        {attribute.render(vehicle)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {!hasEnoughVehicles && (
          <div className="px-6 py-12 text-center text-sm text-gray-300">
            Add at least two vehicles to see a side-by-side comparison.
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleCompareModal;

