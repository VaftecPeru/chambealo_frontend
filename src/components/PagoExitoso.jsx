
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export default function PagoExitoso() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // PayPal devuelve el identificador de la orden en "token".
  const paymentId = searchParams.get('token');

  const [state, setState] = useState({
    phase: 'loading',
    message: 'Confirmando tu pago…',
  });

  // Evita ejecutar dos veces el efecto en StrictMode.
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    async function confirmPayment() {
      if (!paymentId) {
        setState({
          phase: 'error',
          message: 'No se encontró la referencia del pago.',
        });
        return;
      }

      const token = localStorage.getItem('access_token');

      if (!token) {
        setState({
          phase: 'error',
          message: 'Tu sesión expiró. Inicia sesión de nuevo.',
        });
        return;
      }

      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      // Consulta el estado registrado en el backend.
      // No realiza capturas ni cobros.
      async function checkPaymentStatus() {
        const response = await fetch(
          `${API_BASE}/payment/status/${encodeURIComponent(paymentId)}`,
          { headers }
        );

        if (!response.ok) {
          throw new Error('No se pudo consultar el estado del pago.');
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error('No se pudo verificar el pago.');
        }

        return result.status;
      }

      // Muestra el resultado confirmado por el backend.
      function showPaymentStatus(status) {
        if (status === 'completed' || status === 'paid') {
          if (typeof clearCart === 'function') {
            clearCart();
          }

          setState({
            phase: 'ok',
            message: '¡Pago confirmado! Gracias por tu compra.',
          });

          return true;
        }

        if (status === 'failed') {
          navigate('/pago-fallido', { replace: true });
          return true;
        }

        if (status === 'pending') {
          setState({
            phase: 'pending',
            message:
              'Tu pago todavía está pendiente. ' +
              'Revisa tu pedido antes de volver a intentarlo.',
          });

          return true;
        }

        return false;
      }

      try {
        // Confirmar el pago con el backend.
        const response = await fetch(`${API_BASE}/payment/confirm`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gateway: 'paypal',
            payment_id: paymentId,
          }),
        });

        const result = await response.json().catch(() => ({}));

        if (response.status === 401) {
          throw new Error(
            'Tu sesión expiró. Inicia sesión de nuevo.'
          );
        }

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ||
            result.message ||
            'No pudimos confirmar el pago.'
          );
        }

        if (showPaymentStatus(result.status)) {
          return;
        }

        setState({
          phase: 'error',
          message:
            'El backend devolvió un estado desconocido. ' +
            'Revisa tu pedido antes de volver a pagar.',
        });

      } catch (error) {
        // Si falla la confirmación, consultar el estado guardado.
        // No asumir que un error significa que PayPal rechazó el pago.
        try {
          const status = await checkPaymentStatus();

          if (showPaymentStatus(status)) {
            return;
          }

          setState({
            phase: 'pending',
            message:
              'No pudimos determinar el resultado final del pago. ' +
              'Verifica tu pedido antes de volver a intentarlo.',
          });

        } catch {
          setState({
            phase: 'error',
            message:
              error.message ||
              'No pudimos verificar el estado de tu pago.',
          });
        }
      }
    }

    confirmPayment();
  }, [paymentId, clearCart, navigate]);

  const bannerType =
    state.phase === 'ok'
      ? 'ok'
      : state.phase === 'error'
        ? 'err'
        : 'info';

  return (
    <div className="wrap">
      <div
        className="card"
        style={{
          maxWidth: 520,
          margin: '40px auto',
          textAlign: 'center',
        }}
      >
        <h2>
          {state.phase === 'ok'
            ? 'Pago exitoso'
            : 'Estado de tu pago'}
        </h2>

        <div className={`status-banner ${bannerType}`}>
          {state.message}
        </div>

        {state.phase !== 'loading' && (
          <p style={{ marginTop: 16 }}>
            <Link to="/">Volver al inicio</Link>
          </p>
        )}
      </div>
    </div>
  );
}
