import { NavLink, Outlet } from 'react-router-dom';
import { Boxes, Package, Tags } from 'lucide-react';
import { getCurrentUser } from '../../services/session';

const TABS = [
  { to: '/admin/productos', label: 'Productos', icon: Package, roles: ['admin', 'vendor'] },
  { to: '/admin/categorias', label: 'Categorías', icon: Tags, roles: ['admin'] },
  { to: '/admin/inventario', label: 'Inventario', icon: Boxes, roles: ['admin', 'vendor'] },
];

const ROLE_LABELS = { admin: 'Administrador', vendor: 'Vendedor' };

export default function AdminLayout() {
  const user = getCurrentUser();
  const visibleTabs = TABS.filter((tab) => tab.roles.includes(user?.role));

  return (
    <div className="flex-1 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de administración</h1>
            <p className="text-sm text-gray-600">
              Gestiona los productos, las categorías y el inventario de CHAMBEALO.
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {user?.email} · {ROLE_LABELS[user?.role] ?? user?.role}
          </p>
        </div>

        <nav className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3" aria-label="Secciones del panel">
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#670cb7] text-white'
                      : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-purple-50'
                  }`
                }
              >
                <Icon size={16} />
                {tab.label}
              </NavLink>
            );
          })}
        </nav>

        <Outlet />
      </div>
    </div>
  );
}