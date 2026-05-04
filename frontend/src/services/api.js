import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
    changePassword: (data) => api.put('/auth/change-password', data),
};

// Blog APIs
export const blogAPI = {
    getAll: (params) => api.get('/blogs', { params }),
    getBySlug: (slug) => api.get(`/blogs/${slug}`),
    create: (data) => api.post('/blogs', data),
    update: (id, data) => api.put(`/blogs/${id}`, data),
    delete: (id) => api.delete(`/blogs/${id}`),
    like: (id) => api.post(`/blogs/${id}/like`),
    getRelated: (id) => api.get(`/blogs/related/${id}`),
    getUserBlogs: () => api.get('/blogs/my-blogs'),
    getStats: () => api.get('/blogs/stats'),
    getCategories: () => api.get('/blogs/categories'),
    getTags: () => api.get('/blogs/tags'),
};

// Comment APIs
export const commentAPI = {
    getByBlog: (blogId) => api.get(`/comments/${blogId}`),
    create: (data) => api.post('/comments', data),
    delete: (id) => api.delete(`/comments/${id}`),
};

// Bookmark APIs
export const bookmarkAPI = {
    toggle: (blogId) => api.post(`/bookmarks/${blogId}`),
    getAll: () => api.get('/bookmarks'),
};

// Upload APIs
export const uploadAPI = {
    image: (formData) => api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export default api;
