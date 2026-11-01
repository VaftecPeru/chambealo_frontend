// Lectura de la sesión guardada por Login.jsx en localStorage

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;

    const user = JSON.parse(raw);
    return user && user.email ? user : null;
  } catch {
    return null;
  }
}

export function hasSession() {
  try {
    return Boolean(localStorage.getItem('access_token')) && getCurrentUser() !== null;
  } catch {
    return false;
  }
}

export const ADMIN_PANEL_ROLES = ['admin', 'vendor'];

export function canAccessAdminPanel(user) {
  return Boolean(user) && ADMIN_PANEL_ROLES.includes(user.role);
}