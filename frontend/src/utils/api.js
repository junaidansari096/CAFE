const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const api = {
  // Auth
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data;
  },

  // Bookings
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create booking');
    return data;
  },

  getMyBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch bookings');
    return data;
  },

  // Reviews
  createReview: async (reviewData) => {
    // Note: We use FormData for image uploads
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        // Content-Type is NOT set here because browser automatically sets it for FormData
      },
      body: reviewData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to submit review');
    return data;
  },

  getReviews: async () => {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch reviews');
    return data;
  },

  // Admin
  adminGetAllReviews: async () => {
    const response = await fetch(`${API_BASE_URL}/reviews/admin/all`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Admin check failed');
    return data;
  },

  adminApproveReview: async (id) => {
    const response = await fetch(`${API_BASE_URL}/reviews/admin/approve/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Approval failed');
    return data;
  },

  adminGetAllBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings/admin/all`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch all bookings');
    return data;
  },

  adminUpdateBookingStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/bookings/admin/status/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Update failed');
    return data;
  },

  // Products (Menu)
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch menu');
    return data;
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Specimen data extraction failed');
    return data;
  },

  adminCreateProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create product');
    return data;
  },

  adminUpdateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update product');
    return data;
  },

  adminDeleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    let data;
    try {
      data = await response.json();
    } catch {
      if (response.ok) return { message: 'Product deleted' };
      throw new Error('Failed to delete product — server returned invalid response');
    }
    if (!response.ok) throw new Error(data.message || 'Failed to delete product');
    return data;
  },

  // Orders
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to place order');
    return data;
  },

  getMyOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders/myorders`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch your orders');
    return data;
  },

  adminGetAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch all orders');
    return data;
  },

  adminUpdateOrderStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Status update failed');
    return data;
  },

  cancelOrder: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Cancellation failed');
    return data;
  },

  adminUpdateBooking: async (id, bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings/admin/update/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Booking update failed');
    return data;
  },

  adminApproveReview: async (id) => {
    const response = await fetch(`${API_BASE_URL}/reviews/admin/approve/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Review approval failed');
    return data;
  },

  adminDeleteReview: async (id) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Review deletion failed');
    return data;
  },
};
