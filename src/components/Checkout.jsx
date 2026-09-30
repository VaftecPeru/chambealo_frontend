import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

// URL de tu backend Laravel (definida en .env como VITE_API_BASE_URL)
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

// Estos valores son solo de visualización. El total real lo calcula el backend.
const SHIPPING_COST = 0;
const DISCOUNT = 0;

function money(n) {
  return `S/ ${n.toFixed(2)}`;
}

const REQUIRED_FIELDS = ['firstName', 'lastName', 'address', 'city', 'zip', 'email', 'phone'];

const FIELD_LABELS = {
  firstName: 'Ingresa tu nombre.',
  lastName: 'Ingresa tu apellido.',
  address: 'Ingresa tu dirección.',
  city: 'Ingresa tu ciudad.',
  zip: 'Ingresa tu código postal.',
  email: 'Ingresa un correo válido.',
  phone: 'Ingresa tu teléfono.',
};

export default function Checkout() {
  const { cartItems, getCartTotal } = useCart();

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', address: '', city: '', zip: '', email: '', phone: '',
  });
  const [errors, setErrors] = useState({});
  const [method, setMethod] = useState('card'); // 'card' | 'paypal'
  const [status, setStatus] = useState(null);    // { type: 'ok'|'err'|'info', message }
  const [cardSubmitting, setCardSubmitting] = useState(false);
  const [paypalSubmitting, setPaypalSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const total = Math.max(subtotal + SHIPPING_COST - DISCOUNT, 0);
  const isCartEmpty = cartItems.length === 0;

  // Si el usuario vuelve atrás desde PayPal, el navegador puede restaurar la
  // página desde caché con el botón bloqueado. Esto lo reactiva.
  useEffect(() => {
    function onPageShow(e) {
      if (e.persisted) {
        setPaypalSubmitting(false);
        setStatus(null);
      }
    }
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  function handleChange(field, value) {
    setShipping(prev => ({ ...prev, [field]: value }));
  }

  function validateShipping() {
    const newErrors = {};
    REQUIRED_FIELDS.forEach(field => {
      const value = shipping[field].trim();
      let valid = value.length > 0;
      if (field === 'email' && valid) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      if (!valid) newErrors[field] = FIELD_LABELS[field];
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSelectMethod(next) {
    setMethod(next);
    setStatus(null);
  }

  // PASO 2: crea la Order en el backend (POST /api/orders).
  // El backend recalcula el precio real por product_id: aquí solo
  // enviamos product_id + cantidad, nunca el precio ni el total.
  // Campos que valida el backend: items[].product_id, items[].quantity,
  // shipping_address (array) y billing_address (array).
  async function createBackendOrder() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Debes iniciar sesión para poder pagar.');
    }

    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        shipping_address: shipping,
        billing_address: shipping,
      }),
    });

    const body = await res.json().catch(() => ({}));

    if (res.status === 401) {
      throw new Error('Tu sesión expiró. Inicia sesión de nuevo.');
    }
    if (res.status === 422) {
      const firstError = body.errors ? Object.values(body.errors)[0]?.[0] : null;
      throw new Error(firstError || body.message || 'Datos del pedido inválidos.');
    }
    if (!res.ok || !body.success) {
      throw new Error(body.error || body.message || 'No se pudo crear el pedido.');
    }

    return body.data;
  }

  // PASO 3: pide al backend la sesión de pago de PayPal para la Order creada.
  // Devuelve la approve_url a la que hay que redirigir al usuario.
  async function createPaymentSession(order) {
    const token = localStorage.getItem('access_token');

    const res = await fetch(`${API_BASE}/payment/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_id: order.id,
        gateway: 'paypal',
      }),
    });

    const body = await res.json().catch(() => ({}));

    if (res.status === 401) {
      throw new Error('Tu sesión expiró. Inicia sesión de nuevo.');
    }
    if (!res.ok) {
      throw new Error(body.error || body.message || 'No se pudo iniciar el pago con PayPal.');
    }

    const approveUrl = body.data?.approve_url || body.approve_url;
    if (!approveUrl) {
      throw new Error('El servidor no devolvió el enlace de pago de PayPal.');
    }

    return approveUrl;
  }

  async function handlePayPal() {
    if (isCartEmpty || paypalSubmitting) {
      if (isCartEmpty) setStatus({ type: 'err', message: 'Tu carrito está vacío.' });
      return;
    }
    if (!validateShipping()) {
      setStatus({ type: 'err', message: 'Revisa los datos de envío resaltados antes de continuar.' });
      return;
    }

    setPaypalSubmitting(true);
    setStatus({ type: 'info', message: 'Creando tu pedido…' });

    try {
      const order = await createBackendOrder();

      setStatus({ type: 'info', message: 'Redirigiendo a PayPal…' });
      const approveUrl = await createPaymentSession(order);

      // PASO 4: sale de la app hacia PayPal para que el cliente apruebe el pago.
      // No se reactiva el botón: la página se descarga al navegar.
      window.location.href = approveUrl;
    } catch (err) {
      setStatus({ type: 'err', message: err.message || 'Ocurrió un error al procesar el pago.' });
      setPaypalSubmitting(false);
    }
  }

  async function submitCardOrder() {
    if (isCartEmpty) {
      setStatus({ type: 'err', message: 'Tu carrito está vacío.' });
      return;
    }
    if (!validateShipping()) {
      setStatus({ type: 'err', message: 'Revisa los datos de envío resaltados antes de continuar.' });
      return;
    }
    setCardSubmitting(false);
    setStatus({
      type: 'err',
      message: 'El pago con tarjeta aún no está habilitado. Usa PayPal para completar la compra.',
    });
  }

  return (
    <>
      <div className="wrap">
        <div>
          <div className="page-title">Finalizar compra</div>
          <div className="page-sub">Completa tus datos de envío y elige tu método de pago.</div>

          <div className="card">
            <h2><span className="num">1</span> Datos de envío</h2>
            <div className="grid2">
              <Field id="firstName" label="Nombres" placeholder="Ej. María" value={shipping.firstName} onChange={handleChange} error={errors.firstName} />
              <Field id="lastName" label="Apellidos" placeholder="Ej. Torres" value={shipping.lastName} onChange={handleChange} error={errors.lastName} />
              <Field id="address" label="Dirección" placeholder="Av. Ejemplo 123, Dpto. 4" value={shipping.address} onChange={handleChange} error={errors.address} full />
              <Field id="city" label="Ciudad" placeholder="Lima" value={shipping.city} onChange={handleChange} error={errors.city} />
              <Field id="zip" label="Código postal" placeholder="15001" value={shipping.zip} onChange={handleChange} error={errors.zip} />
              <Field id="email" label="Correo electrónico" placeholder="tucorreo@ejemplo.com" type="email" value={shipping.email} onChange={handleChange} error={errors.email} />
              <Field id="phone" label="Teléfono" placeholder="+51 900 000 000" type="tel" value={shipping.phone} onChange={handleChange} error={errors.phone} />
            </div>
          </div>

          <div className="card">
            <h2><span className="num">2</span> Método de pago</h2>

            <div className="pay-methods">
              <div
                className={`pay-method ${method === 'card' ? 'selected' : ''}`}
                onClick={() => handleSelectMethod('card')}
              >
                <span className="icon">💳</span> Tarjeta de crédito/débito
              </div>
              <div
                className={`pay-method ${method === 'paypal' ? 'selected' : ''}`}
                onClick={() => handleSelectMethod('paypal')}
              >
                <span className="icon">🅿️</span> PayPal
              </div>
            </div>

            {method === 'card' && (
              <div id="card-fields">
                <div className="field full">
                  <label>Número de tarjeta</label>
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid2">
                  <div className="field"><label>Vencimiento</label><input type="text" placeholder="MM/AA" /></div>
                  <div className="field"><label>CVV</label><input type="text" placeholder="123" /></div>
                </div>
                <button className="btn-primary" disabled={cardSubmitting || isCartEmpty} onClick={submitCardOrder}>
                  Pagar {money(total)}
                </button>
              </div>
            )}

            {method === 'paypal' && (
              <div id="paypal-panel" className="visible">
                <div className="paypal-note">
                  Serás redirigido a PayPal para confirmar tu pago de forma segura. El total se procesa en soles peruanos (PEN).
                </div>
                <button className="btn-primary" disabled={paypalSubmitting || isCartEmpty} onClick={handlePayPal}>
                  {paypalSubmitting ? 'Procesando…' : `Pagar con PayPal ${money(total)}`}
                </button>
              </div>
            )}

            {status && (
              <div className={`status-banner ${status.type}`}>{status.message}</div>
            )}

            <div className="secure-note">🔒 Tus datos de pago están protegidos y encriptados.</div>
          </div>
        </div>

        <div>
          <div className="card summary-card">
            <h2>Resumen del pedido</h2>

            {isCartEmpty && (
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Tu carrito está vacío.</p>
            )}

            {cartItems.map(item => (
              <div className="item-row" key={item.id}>
                <img className="item-thumb-img" src={item.image} alt={item.name} />
                <div className="item-info">
                  <div className="name">{item.name}</div>
                  <div className="qty">Cantidad: {item.quantity}</div>
                </div>
                <div className="item-price">{money(item.price * item.quantity)}</div>
              </div>
            ))}

            <div className="totals-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="totals-row"><span>Envío</span><span style={{ color: 'var(--success)' }}>{SHIPPING_COST === 0 ? 'Gratis' : money(SHIPPING_COST)}</span></div>
            {DISCOUNT > 0 && (
              <div className="totals-row"><span>Descuento</span><span style={{ color: 'var(--red)' }}>− {money(DISCOUNT)}</span></div>
            )}
            <div className="totals-row total"><span>Total</span><span>{money(total)}</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ id, label, placeholder, value, onChange, error, type = 'text', full = false }) {
  return (
    <div className={`field ${full ? 'full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        className={error ? 'invalid' : ''}
      />
      {error && <div className="field-error visible">{error}</div>}
    </div>
  );
}