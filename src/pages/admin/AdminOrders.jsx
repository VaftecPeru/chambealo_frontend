
import { useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Notice, Spinner } from '../../components/admin/ui.jsx';
import {
  fetchAdminOrders,
  updateOrderStatus,
  getApiError,
} from '../../services/adminService';
import {
  formatMoney,
  primaryButton,
  secondaryButton,
} from '../../utils/admin';

const STATUS_LABELS = {
  cart: 'Carrito',
  checkout: 'Procesando',
  payment_pending: 'Pendiente de pago',
  paid: 'Pagado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

const STATUS_COLORS = {
  paid: 'bg-green-100 text-green-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const result = await fetchAdminOrders(page);
      setOrders(result.data);
      setLastPage(result.last_page);
    } catch (err) {
      setError(getApiError(err, 'No se pudieron cargar los pedidos.'));
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleUpdate = async (order, status) => {
    const label = STATUS_LABELS[status];

    if (!window.confirm(`¿Cambiar el pedido a "${label}"?`)) {
      return;
    }

    setSavingId(order.order_id);
    setNotice(null);

    try {
      await updateOrderStatus(order.order_id, status);

      setNotice({
        type: 'success',
        text: `Pedido actualizado a ${label}.`,
      });

      await load();
    } catch (err) {
      setNotice({
        type: 'error',
        text: getApiError(err, 'No se pudo actualizar el pedido.'),
      });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Administración de pedidos
          </h2>
          <p className="text-sm text-gray-600">
            Consulta los pedidos y actualiza su estado.
          </p>
        </div>

        <button
          type="button"
          className={secondaryButton}
          onClick={load}
          disabled={loading || savingId !== null}
        >
          <RefreshCw size={15} />
          Actualizar
        </button>
      </div>

      {notice && (
        <Notice
          type={notice.type}
          onClose={() => setNotice(null)}
        >
          {notice.text}
        </Notice>
      )}

      {loading ? (
        <Spinner label="Cargando pedidos..." />
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <p className="mb-4 text-red-700">{error}</p>
          <button className={primaryButton} onClick={load}>
            Reintentar
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-600">
          No hay pedidos registrados.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">N.º Pedido</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const nextStatus =
                  order.status === 'paid'
                    ? 'shipped'
                    : order.status === 'shipped'
                      ? 'delivered'
                      : null;

                return (
                  <tr
                    key={order.id}
                    className="border-t border-gray-100"
                  >
                    <td className="px-4 py-4 font-semibold break-all">
                      {order.order_id}
                    </td>

                    <td className="px-4 py-4">
                      {order.user?.name || `Usuario #${order.user_id}`}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('es-PE')}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {formatMoney(order.total_amount)}
                    </td>

                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        STATUS_COLORS[order.status] ||
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {nextStatus ? (
                        <button
                          type="button"
                          className={primaryButton}
                          disabled={savingId !== null}
                          onClick={() => handleUpdate(order, nextStatus)}
                        >
                          {savingId === order.order_id
                            ? 'Guardando...'
                            : `Marcar ${STATUS_LABELS[nextStatus].toLowerCase()}`}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500">
                          Sin acciones disponibles
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          className={secondaryButton}
          disabled={page <= 1 || loading || savingId !== null}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </button>

        <span className="text-sm text-gray-600">
          Página {page} de {lastPage}
        </span>

        <button
          className={secondaryButton}
          disabled={page >= lastPage || loading || savingId !== null}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
