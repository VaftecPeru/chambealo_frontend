import { Link, Navigate, useLocation } from 'react-router-dom';
import { ADMIN_PANEL_ROLES, getCurrentUser, hasSession } from '../../services/session';

// esto protegera las pantallas del panel segun la sesion y el rol guardados al iniciar sesion
// ojo esto solo cuida la interfaz. La seguridad real la aplica el backend
// (middleware role:admin / role:vendor,admin en routes/api.php).
export default function AdminRoute({ roles = ADMIN_PANEL_ROLES, children }) {
  const location = useLocation();

  if (!hasSession()) {
    return <Navigate to="/Login" replace state={{ from: location.pathname }} />;
  }

  const user = getCurrentUser();

  if (!roles.includes(user.role)) {
    return (
      <div className="flex-1 bg-gray-50 px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Acceso restringido</h1>
        <p className="mx-auto mt-2 max-w-md text-gray-600">
          Tu cuenta no tiene permisos para ver esta sección.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-700"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return children;
}