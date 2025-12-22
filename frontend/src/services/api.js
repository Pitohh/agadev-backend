import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');
export const changePassword = (data) => api.post('/auth/change-password', data);

// News
export const getNews = (params) => api.get('/news', { params });
export const getNewsBySlug = (slug, lang = 'fr') => api.get(`/news/${slug}`, { params: { lang } });
export const getAllNewsAdmin = (params) => api.get('/news/admin/all', { params });
export const createNews = (data) => api.post('/news', data);
export const updateNews = (id, data) => api.put(`/news/${id}`, data);
export const deleteNews = (id) => api.delete(`/news/${id}`);
export const toggleNewsPublish = (id, published) => api.patch(`/news/${id}/publish`, { published });

// Projects
export const getProjects = (params) => api.get('/projects', { params });
export const getProjectBySlug = (slug, lang = 'fr') => api.get(`/projects/${slug}`, { params: { lang } });
export const getAllProjectsAdmin = (params) => api.get('/projects/admin/all', { params });
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const toggleProjectPublish = (id, published) => api.patch(`/projects/${id}/publish`, { published });

// Media
export const uploadFile = (formData) => api.post('/media/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const uploadMultipleFiles = (formData) => api.post('/media/upload-multiple', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getMedia = (params) => api.get('/media', { params });
export const deleteMedia = (id) => api.delete(`/media/${id}`);

export default api;
