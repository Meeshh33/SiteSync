import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// RFI Services
export const rfiService = {
  createRFI: (data) => api.post('/rfis', data),
  getAllRFIs: () => api.get('/rfis'),
  getRFIById: (id) => api.get(`/rfis/${id}`),
  updateRFIStatus: (id, data) => api.put(`/rfis/${id}/status`, data),
  addRFIComment: (id, data) => api.post(`/rfis/${id}/comments`, data),
  getRFIHistory: (id) => api.get(`/rfis/${id}/history`),
  deleteRFI: (id) => api.delete(`/rfis/${id}`),
};

// Change Order Services
export const changeOrderService = {
  createChangeOrder: (data) => api.post('/change-orders', data),
  getAllChangeOrders: () => api.get('/change-orders'),
  getChangeOrderById: (id) => api.get(`/change-orders/${id}`),
  updateChangeOrderStatus: (id, data) => api.put(`/change-orders/${id}/status`, data),
  addChangeOrderComment: (id, data) => api.post(`/change-orders/${id}/comments`, data),
  getChangeOrderHistory: (id) => api.get(`/change-orders/${id}/history`),
  deleteChangeOrder: (id) => api.delete(`/change-orders/${id}`),
};

// User Services
export const userService = {
  getUserProfile: () => api.get('/users/profile'),
  getAllUsers: () => api.get('/users'),
  updateUserProfile: (data) => api.put('/users/profile', data),
};

export default api;
