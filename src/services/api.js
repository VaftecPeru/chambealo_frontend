import axios from 'axios';

// Toma la URL del .env de Vite (con fallback al backend local)
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor para incluir el token Bearer en cada petición
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Expirar la sesión solo si falló una ruta protegida.
// Un login con credenciales inválidas debe permanecer en la pantalla.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = String(error.config?.url || '').split('?')[0].toLowerCase();
        const isPublicAuth = url === '/login' || url === '/register';
        if (error.response?.status === 401 && !isPublicAuth) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('currentUser');
            if (window.location.pathname.toLowerCase() !== '/login') {
                window.location.replace('/Login');
            }
        }
        return Promise.reject(error);
    }
);

export default api;