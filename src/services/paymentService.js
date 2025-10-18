import api from './api';

export const paymentService = {
  // Get Razorpay Key
  getRazorpayKey: async () => {
    try {
      const response = await api.get('/payments/key');
      if (!response.data.success) {
        throw new Error('Failed to fetch Razorpay key');
      }
      return response.data;
    } catch (error) {
      console.error('Error getting Razorpay key:', error);
      throw error;
    }
  },

  // Create a new order
  createOrder: async (vehicleId) => {
    try {
      const response = await api.post('/payments/create-order', { vehicleId });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create order');
      }
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/verify-payment', paymentData);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to verify payment');
      }
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }
};