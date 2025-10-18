import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Gauge, MapPin, Phone, Mail, User, Fuel, Cog, ArrowLeft } from 'lucide-react';
import { vehicleService } from '../services/vehicleService';
import { paymentService } from '../services/paymentService';
import { fullImageUrl } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';


const VehicleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!user) {
      alert('Please login to continue with payment');
      window.location.href = '/login';
      return;
    }

    setPaymentProcessing(true);
    try {
      // Step 1: Get Razorpay Key from backend
      const keyData = await paymentService.getRazorpayKey();
      
      if (!keyData.success) {
        throw new Error('Failed to get payment configuration');
      }

      // Step 2: Create order
      const orderData = await paymentService.createOrder(vehicle._id);
      
      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      // Step 3: Initialize Razorpay options
      const options = {
        key: keyData.key, // ✓ Now fetched from backend!
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        order_id: orderData.data.id,
        name: 'AutoMart',
        description: `${vehicle.brand} ${vehicle.model} (${vehicle.year})`,
        image: '/logo.png',
        handler: async function(response) {
          try {
            // Verify payment with backend
            const verifyData = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            if (verifyData.success) {
              alert('🎉 Payment successful! Your vehicle booking is confirmed.');
              window.location.reload(); // Refresh to update vehicle status
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support with Order ID: ' + response.razorpay_order_id);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || '9999999999'
        },
        notes: {
          vehicleId: vehicle._id,
          buyerId: user.id,
          vehicleName: `${vehicle.brand} ${vehicle.model}`
        },
        theme: {
          color: '#8B5CF6'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment cancelled by user');
            setPaymentProcessing(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      
      razorpayInstance.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setPaymentProcessing(false);
      });

      razorpayInstance.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed: ' + (error.message || 'Please try again'));
      setPaymentProcessing(false);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const data = await vehicleService.getVehicle(id);
      setVehicle(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading vehicle details...</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Vehicle not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/vehicles"
          className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Vehicles</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20">
              <div className="h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <img 
                    src={fullImageUrl(vehicle.images[currentImage].url)} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl">
                    {vehicle.type === 'car' ? '🚗' : '🏍️'}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {vehicle.images && vehicle.images.length > 1 && (
                <div className="p-4 flex space-x-4 overflow-x-auto">
                  {vehicle.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={fullImageUrl(img.url)}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition ${
                        currentImage === idx ? 'ring-2 ring-purple-500' : 'opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Details */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Vehicle Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-gray-400 text-sm">Year</div>
                    <div className="text-white font-semibold">{vehicle.year}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Gauge className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-gray-400 text-sm">Mileage</div>
                    <div className="text-white font-semibold">{vehicle.mileage}</div>
                  </div>
                </div>

                {vehicle.fuelType && (
                  <div className="flex items-center space-x-3">
                    <Fuel className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-gray-400 text-sm">Fuel Type</div>
                      <div className="text-white font-semibold">{vehicle.fuelType}</div>
                    </div>
                  </div>
                )}

                {vehicle.transmission && (
                  <div className="flex items-center space-x-3">
                    <Cog className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-gray-400 text-sm">Transmission</div>
                      <div className="text-white font-semibold">{vehicle.transmission}</div>
                    </div>
                  </div>
                )}

                {vehicle.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-gray-400 text-sm">Location</div>
                      <div className="text-white font-semibold">
                        {vehicle.location.city}, {vehicle.location.state}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {vehicle.description && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h3 className="text-white font-semibold mb-3">Description</h3>
                  <p className="text-gray-300">{vehicle.description}</p>
                </div>
              )}

              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h3 className="text-white font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Price & Seller Info */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-24">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {vehicle.brand} {vehicle.model}
                </h1>
                <div className="text-4xl font-bold text-purple-400">
                  ₹{vehicle.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Seller Information */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-white font-semibold mb-4">Seller Information</h3>
                
                {vehicle.sellerId && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-gray-400 text-sm">Name</div>
                        <div className="text-white">{vehicle.sellerId.name}</div>
                      </div>
                    </div>

                    {vehicle.sellerId.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-gray-400 text-sm">Email</div>
                          <a 
                            href={`mailto:${vehicle.sellerId.email}`}
                            className="text-purple-400 hover:text-purple-300 transition"
                          >
                            {vehicle.sellerId.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {vehicle.sellerId.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-gray-400 text-sm">Phone</div>
                          <a 
                            href={`tel:${vehicle.sellerId.phone}`}
                            className="text-purple-400 hover:text-purple-300 transition"
                          >
                            {vehicle.sellerId.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={handlePayment}
                  disabled={paymentProcessing} 
                  className="w-full mt-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Phone className="w-5 h-5" />
                  <span>{paymentProcessing ? 'Processing Payment...' : 'Pay Now and Book Your Item'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;