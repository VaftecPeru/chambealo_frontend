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
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const getProductCount = (items) => {
    if (!Array.isArray(items)) return 0;

    return items.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    );
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
          <div className="orders-heading">
            <span className="orders-heading-line"></span>
            <h1 className="orders-title">Mis Pedidos</h1>
          </div>

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
          <div className="orders-heading">
            <span className="orders-heading-line"></span>
            <h1 className="orders-title">Mis Pedidos</h1>
          </div>

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
        <div className="orders-heading">
          <span className="orders-heading-line"></span>
          <h1 className="orders-title">Mis Pedidos</h1>
        </div>

        {orders.length === 0 ? (
          <section className="orders-empty">
            <div className="orders-empty-icon">
              <span>🛍</span>
              <div className="orders-empty-icon-badge">✓</div>
            </div>

            <h2>Aún no tienes pedidos</h2>

            <p>
              Parece que todavía no has realizado ninguna compra.
              ¡Explora nuestros productos y encuentra lo que necesitas!
            </p>

            <button
              className="orders-empty-button"
              onClick={() => navigate('/OurStore')}
            >
              <span>🛒</span>
              Seguir comprando
            </button>
          </section>
        ) : (
          <section className="orders-list">
            {orders.map((order) => {
              const canCancel = CANCELLABLE_STATUSES.includes(order.status);
              const productCount = getProductCount(order.items);

              return (
                <article className="order-card" key={order.order_id}>
                  <div className="order-card-top">
                    <div className="order-summary">
                      <div className="order-summary-item">
                        <span className="order-summary-label">
                          Nº Pedido
                        </span>

                        <strong className="order-number">
                          #{order.order_id}
                        </strong>
                      </div>

                      <div className="order-summary-item">
                        <span className="order-summary-label">
                          Fecha
                        </span>

                        <strong className="order-summary-value">
                          {formatDate(order.created_at)}
                        </strong>
                      </div>

                      <div className="order-summary-item">
                        <span className="order-summary-label">
                          Total
                        </span>

                        <strong className="order-summary-total">
                          {formatMoney(order.total_amount)}
                        </strong>
                      </div>
                    </div>

                    <span
                      className={`order-status order-status-${order.status}`}
                    >
                      <span className="order-status-dot"></span>

                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>

                  <div className="order-products-section">
                    <div className="order-products">
                      {Array.isArray(order.items) &&
                        order.items.slice(0, 3).map((item, index) => (
                          <div
                            className="order-product"
                            key={`${order.order_id}-${
                              item.product_id || index
                            }`}
                          >
                            <div className="order-product-placeholder">
                              {item.name?.charAt(0)?.toUpperCase() || 'P'}
                            </div>

                            <div className="order-product-info">
                              <strong>
                                {item.name || 'Producto'}
                              </strong>

                              <span>
                                {item.quantity || 0} ×{' '}
                                {formatMoney(item.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="order-product-count">
                      <span>Productos</span>
                      <strong>{productCount}</strong>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button
                        className="order-detail-button"
                        onClick={() => setSelectedOrder(order)}
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

      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="order-modal-header">
              <div>
                <span className="order-modal-label">Detalle del pedido</span>
                <h2>#{selectedOrder.order_id}</h2>
              </div>

              <button
                className="order-modal-close"
                onClick={() => setSelectedOrder(null)}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="order-modal-summary">
              <div>
                <span>Fecha</span>
                <strong>{formatDate(selectedOrder.created_at)}</strong>
              </div>

              <div>
                <span>Estado</span>
                <strong>
                  {STATUS_LABELS[selectedOrder.status] || selectedOrder.status}
                </strong>
              </div>
            </div>

            <div className="order-modal-products">
              <h3>Productos</h3>

              {Array.isArray(selectedOrder.items) &&
                selectedOrder.items.map((item, index) => (
                  <div
                    className="order-modal-product"
                    key={`${selectedOrder.order_id}-detail-${item.product_id || index}`}
                  >
                    <div>
                      <strong>{item.name || 'Producto'}</strong>
                      <span>
                        {item.quantity || 0} × {formatMoney(item.price)}
                      </span>
                    </div>

                    <strong>
                      {formatMoney(
                        Number(item.quantity || 0) * Number(item.price || 0)
                      )}
                    </strong>
                  </div>
                ))}
            </div>

            <div className="order-modal-total">
              <span>Total</span>
              <strong>{formatMoney(selectedOrder.total_amount)}</strong>
            </div>

            <button
              className="order-modal-button"
              onClick={() => setSelectedOrder(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyOrders;