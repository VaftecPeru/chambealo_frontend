// src/services/authService.js
// Manejo de sesión JWT para Chambealo: token, logout, 401/403 y errores 422.
// Requiere Vite (import.meta.env). En el .env del front: VITE_API_URL=http://localhost:8000/api

const API_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';
const TOKEN_KEY = 'access_token';
   const USER_KEY = 'currentUser';

// ---------- Sesión ----------
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const isLoggedIn = () => Boolean(getToken());

// Llamar después de un login exitoso con el JSON que devuelve /api/login
export function setSession(data) {
  localStorage.setItem(TOKEN_KEY, data.access_token);
  if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function redirectToLogin(reason = 'expired') {
  clearSession();
  window.location.href = `/login?reason=${reason}`;
}

// ---------- Renovar token (una sola petición a la vez) ----------
let refreshing = null;

async function refreshToken() {
  if (!refreshing) {
    refreshing = fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: { Accept: 'application/json', Authorization: `Bearer ${getToken()}` },
    })
      .then(async (res) => {
        if (!res.ok) return false;
        const data = await res.json();
        localStorage.setItem(TOKEN_KEY, data.access_token);
        return true;
      })
      .catch(() => false)
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

// ---------- fetch con token y manejo de 401/403 ----------
// Usar para todo lo que requiere sesión: órdenes, pagos, perfil...
// Ejemplo: const res = await authFetch('/orders', { method: 'POST', body: JSON.stringify(datos) });
// OJO: path SIN "/api" al inicio (ya va en API_URL), por ejemplo '/payment/confirm'.
export async function authFetch(path, options = {}, retry = true) {
  // redirectOnExpire: false -> si la sesión venció no redirige, solo lanza el error
  const { redirectOnExpire = true, ...fetchOptions } = options;
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401) {
    // Un intento de renovar el token; si falla, se cierra la sesión
    if (retry && token && (await refreshToken())) {
      return authFetch(path, options, false);
    }
    if (redirectOnExpire) {
      redirectToLogin('expired');
    } else {
      clearSession();
    }
    throw new Error('Sesión expirada');
  }

  if (res.status === 403) {
    const err = new Error('No tienes permiso para esta acción');
    err.status = 403;
    throw err;
  }

  return res;
}

// ---------- Logout ----------
export async function logout() {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: { Accept: 'application/json', Authorization: `Bearer ${getToken()}` },
    });
  } catch {
    // aunque falle la petición, se cierra la sesión local
  }
  clearSession();
  window.location.href = '/login';
}

// ---------- Errores de validación (422) ----------
// Devuelve una lista de mensajes lista para mostrar en pantalla.
export async function readErrors(res) {
  try {
    const body = await res.json();
    if (body.errors) return Object.values(body.errors).flat();
    return [body.message ?? 'Ocurrió un error'];
  } catch {
    return ['Ocurrió un error'];
  }
}