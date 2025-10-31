import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Animals Service
export const animalsService = {
  getAll: (params) => api.get('/animals', { params }),
  getById: (id) => api.get(`/animals/${id}`),
  create: (data) => api.post('/animals', data),
  update: (id, data) => api.put(`/animals/${id}`, data),
  delete: (id) => api.delete(`/animals/${id}`),
  getStats: () => api.get('/animals/stats'),
};

// Feeding Service
export const feedingService = {
  getAll: (params) => api.get('/feeding', { params }),
  create: (data) => api.post('/feeding', data),
  update: (id, data) => api.put(`/feeding/${id}`, data),
  delete: (id) => api.delete(`/feeding/${id}`),
  getStats: () => api.get('/feeding/stats'),
  getInventory: () => api.get('/feeding/inventory'),
  addToInventory: (data) => api.post('/feeding/inventory', data),
  updateInventory: (id, data) => api.put(`/feeding/inventory/${id}`, data),
  deleteFromInventory: (id) => api.delete(`/feeding/inventory/${id}`),
};

// Manure Service
export const manureService = {
  getProduction: (params) => api.get('/manure/production', { params }),
  createProduction: (data) => api.post('/manure/production', data),
  updateProduction: (id, data) => api.put(`/manure/production/${id}`, data),
  deleteProduction: (id) => api.delete(`/manure/production/${id}`),
  getSales: (params) => api.get('/manure/sales', { params }),
  createSale: (data) => api.post('/manure/sales', data),
  updateSale: (id, data) => api.put(`/manure/sales/${id}`, data),
  deleteSale: (id) => api.delete(`/manure/sales/${id}`),
  getStats: () => api.get('/manure/stats'),
};

// Financial Service
export const financialService = {
  getAll: (params) => api.get('/financial', { params }),
  getById: (id) => api.get(`/financial/${id}`),
  create: (data) => api.post('/financial', data),
  update: (id, data) => api.put(`/financial/${id}`, data),
  delete: (id) => api.delete(`/financial/${id}`),
  getReport: (params) => api.get('/financial/report', { params }),
  getMonthlyStats: () => api.get('/financial/monthly'),
};

export default api;

