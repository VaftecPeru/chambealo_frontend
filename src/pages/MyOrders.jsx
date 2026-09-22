import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/MyOrders.css';

const STATUS_LABELS = {
  cart: 'En carrito',
  checkout: 'Procesando',
  payment_pending: 'Pendiente de pago',
  paid: 'Pagado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

const CANCELLABLE_STATUSES = ['cart', 'checkout', 'payment_pending'];

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  const loadOrders = async () => {
    try {
      setError('');

      const response = await api.get('/orders');

      setOrders(response.data.orders || []);
    } catch (err) {
      console.error('Error al cargar los pedidos:', err);
      setError('No se pudieron cargar tus pedidos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Sin fecha';

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };

  const formatMoney = (amount) => {
    return `S/ ${Number(amount || 0).toFixed(2)}`;
  };

  const handleCancel = async (orderId) => {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas cancelar este pedido?'
    );

    if (!confirmed) return;

    try {
      setCancellingId(orderId);

      await api.patch(`/orders/${orderId}/cancel`);

      await loadOrders();
    } catch (err) {
      console.error('Error al cancelar el pedido:', err);

      const message =
        err.response?.data?.message ||
        'No se pudo cancelar el pedido.';

      window.alert(message);
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <p className="orders-breadcrumb">Inicio / Mis Pedidos</p>
          <h1 className="orders-title">Mis Pedidos</h1>

          <div className="orders-message-card">
            <div className="orders-loader"></div>
            <p>Cargando tus pedidos...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <p className="orders-breadcrumb">Inicio / Mis Pedidos</p>
          <h1 className="orders-title">Mis Pedidos</h1>

          <div className="orders-message-card">
            <h2>No pudimos cargar tus pedidos</h2>
            <p>{error}</p>

            <button
              className="orders-primary-button"
              onClick={() => {
                setLoading(true);
                loadOrders();
              }}
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">
        <p className="orders-breadcrumb">
          <span onClick={() => navigate('/')}>Inicio</span>
          <span className="orders-breadcrumb-separator">›</span>
          Mis Pedidos
        </p>

        <h1 className="orders-title">Mis Pedidos</h1>

        {orders.length === 0 ? (
          <section className="orders-empty">
            <div className="orders-empty-icon">▣</div>

            <h2>Aún no tienes pedidos</h2>

            <p>
              Cuando realices una compra, tus pedidos aparecerán aquí
              para que puedas revisar su estado y detalle.
            </p>

            <button
              className="orders-primary-button"
              onClick={() => navigate('/OurStore')}
            >
              Seguir comprando
            </button>
          </section>
        ) : (
          <section className="orders-list">
            {orders.map((order) => {
              const canCancel = CANCELLABLE_STATUSES.includes(order.status);

              return (
                <article className="order-card" key={order.order_id}>
                  <div className="order-card-header">
                    <div>
                      <span className="order-label">Pedido</span>
                      <h2>#{order.order_id}</h2>
                    </div>

                    <span
                      className={`order-status order-status-${order.status}`}
                    >
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>

                  <div className="order-info">
                    <div>
                      <span>Fecha</span>
                      <strong>{formatDate(order.created_at)}</strong>
                    </div>

                    <div>
                      <span>Total</span>
                      <strong>{formatMoney(order.total_amount)}</strong>
                    </div>

                    <div>
                      <span>Productos</span>
                      <strong>
                        {Array.isArray(order.items)
                          ? order.items.reduce(
                              (total, item) =>
                                total + Number(item.quantity || 0),
                              0
                            )
                          : 0}
                      </strong>
                    </div>
                  </div>

                  {Array.isArray(order.items) && order.items.length > 0 && (
                    <div className="order-products">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div
                          className="order-product"
                          key={`${order.order_id}-${item.product_id || index}`}
                        >
                          <div className="order-product-placeholder">
                            {item.name?.charAt(0)?.toUpperCase() || 'P'}
                          </div>

                          <div>
                            <strong>{item.name || 'Producto'}</strong>
                            <span>
                              {item.quantity || 0} × {formatMoney(item.price)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="order-actions">
                    <button
                      className="order-detail-button"
                      onClick={() =>
                        window.alert(
                          `Pedido ${order.order_id}\nEstado: ${
                            STATUS_LABELS[order.status] || order.status
                          }\nTotal: ${formatMoney(order.total_amount)}`
                        )
                      }
                    >
                      Ver detalle
                    </button>

                    {canCancel && (
                      <button
                        className="order-cancel-button"
                        disabled={cancellingId === order.order_id}
                        onClick={() => handleCancel(order.order_id)}
                      >
                        {cancellingId === order.order_id
                          ? 'Cancelando...'
                          : 'Cancelar pedido'}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default MyOrders;