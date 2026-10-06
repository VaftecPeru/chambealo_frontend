import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export default function PagoExitoso() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  // PayPal vuelve con ?token=<id de la orden de PayPal>&PayerID=...
  const paymentId = searchParams.get('token');

  const [state, setState] = useState({ phase: 'loading', message: 'Confirmando tu pago…' });

  // Evita la doble ejecución del efecto en StrictMode (capturaría el pago dos veces).
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    async function confirmPayment() {
      if (!paymentId) {
        setState({ phase: 'error', message: 'No se encontró la referencia del pago.' });
        return;
      }

      const token = localStorage.getItem('access_token');
      if (!token) {
        setState({ phase: 'error', message: 'Tu sesión expiró. Inicia sesión de nuevo.' });
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/payment/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ gateway: 'paypal', payment_id: paymentId }),
        });

        const body = await res.json().catch(() => ({}));

        if (res.status === 401) {
          throw new Error('Tu sesión expiró. Inicia sesión de nuevo.');
        }
        if (!res.ok || !body.success) {
          throw new Error(body.error || body.message || 'No se pudo confirmar el pago.');
        }

        if (body.status === 'completed') {
          if (typeof clearCart === 'function') clearCart();
          setState({ phase: 'ok', message: '¡Pago confirmado! Gracias por tu compra.' });
        } else if (body.status === 'pending') {
          setState({
            phase: 'pending',
            message: 'Tu pago está en revisión. Te avisaremos cuando se confirme.',
          });
        } else {
          setState({ phase: 'error', message: `El pago quedó en estado: ${body.status}.` });
        }
      } catch (err) {
        setState({ phase: 'error', message: err.message });
      }
    }

    confirmPayment();
  }, [paymentId, clearCart]);

  const bannerType =
    state.phase === 'ok' ? 'ok' : state.phase === 'error' ? 'err' : 'info';

  return (
    <div className="wrap">
      <div className="card" style={{ maxWidth: 520, margin: '40px auto', textAlign: 'center' }}>
        <h2>{state.phase === 'ok' ? 'Pago exitoso' : 'Estado de tu pago'}</h2>
        <div className={`status-banner ${bannerType}`}>{state.message}</div>
        {state.phase !== 'loading' && (
          <p style={{ marginTop: 16 }}>
            <Link to="/">Volver al inicio</Link>
          </p>
        )}
      </div>
    </div>
  );
}