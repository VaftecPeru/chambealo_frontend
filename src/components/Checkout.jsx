import { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

// TODO: reemplaza por tu Client ID real de PayPal (sandbox mientras pruebas)
const PAYPAL_CLIENT_ID = 'YOUR_SANDBOX_CLIENT_ID';

// TODO: ajusta si tu API Laravel no está en la misma raíz que el frontend
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

// TODO: estos dos valores son de ejemplo — reemplázalos por tu lógica real
// de envío/descuentos (o quítalos si no aplican). Deben coincidir con lo
// que calcule PayPalController.php en el backend.
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

  const paypalContainerRef = useRef(null);
  const paypalButtonsInstance = useRef(null);

  const subtotal = getCartTotal();
  const total = Math.max(subtotal + SHIPPING_COST - DISCOUNT, 0);
  const isCartEmpty = cartItems.length === 0;

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

  // El backend recalcula el precio real por id de producto — aquí solo
  // enviamos id + cantidad, nunca el precio ni el total.
  function getCartPayload() {
    return cartItems.map(item => ({ id: item.id, quantity: item.quantity }));
  }

  function handleSelectMethod(next) {
    setMethod(next);
    setStatus(null);
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
    setCardSubmitting(true);
    setStatus({ type: 'info', message: 'Procesando pago…' });

    // Aquí iría la llamada real a tu pasarela de tarjeta (Stripe/Culqi),
    // enviando shipping + cart a tu backend Laravel. Nunca envíes un
    // monto calculado solo en el frontend.
    setTimeout(() => {
      setCardSubmitting(false);
      setStatus({ type: 'ok', message: '✓ Pago simulado con tarjeta procesado correctamente.' });
    }, 700);
  }

  // Carga el SDK de PayPal y renderiza los botones cuando el método
  // seleccionado es 'paypal'. Se limpia el botón anterior al desmontar
  // o al cambiar de método, para no duplicar instancias.
  useEffect(() => {
    if (method !== 'paypal') return;

    let cancelled = false;

    function renderButtons() {
      if (cancelled || !window.paypal || !paypalContainerRef.current) return;

      paypalContainerRef.current.innerHTML = '';

      paypalButtonsInstance.current = window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal', height: 45 },

        onClick: (data, actions) => {
          if (isCartEmpty) {
            setStatus({ type: 'err', message: 'Tu carrito está vacío.' });
            return actions.reject();
          }
          if (!validateShipping()) {
            setStatus({ type: 'err', message: 'Revisa los datos de envío resaltados antes de continuar.' });
            return actions.reject();
          }
          return actions.resolve();
        },

        createOrder: () => {
          return fetch(`${API_BASE}/api/paypal/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cart: getCartPayload(),
              shipping,
            }),
          })
            .then(res => {
              if (!res.ok) throw new Error('create-order failed');
              return res.json();
            })
            .then(order => order.id);
        },

        onApprove: (data) => {
          return fetch(`${API_BASE}/api/paypal/capture-order/${data.orderID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
            .then(res => {
              if (!res.ok) throw new Error('capture failed');
              return res.json();
            })
            .then(details => {
              setStatus({
                type: 'ok',
                message: `✓ Pago con PayPal completado. ID de transacción: ${details.id || data.orderID}`,
              });
            })
            .catch(() => {
              setStatus({ type: 'err', message: 'No se pudo confirmar el pago. Intenta nuevamente.' });
            });
        },

        onError: (err) => {
          console.error('Error de PayPal:', err);
          setStatus({ type: 'err', message: 'Ocurrió un problema al procesar el pago con PayPal.' });
        },

        onCancel: () => {
          setStatus({ type: 'err', message: 'Pago con PayPal cancelado.' });
        },
      });

      paypalButtonsInstance.current.render(paypalContainerRef.current);
    }

    const existingScript = document.getElementById('paypal-sdk');
    if (existingScript && window.paypal) {
      renderButtons();
    } else if (existingScript) {
      existingScript.addEventListener('load', renderButtons);
    } else {
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=PEN&intent=capture`;
      script.addEventListener('load', renderButtons);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (paypalContainerRef.current) paypalContainerRef.current.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, cartItems, isCartEmpty]);

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
                <div id="paypal-button-container" ref={paypalContainerRef}></div>
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