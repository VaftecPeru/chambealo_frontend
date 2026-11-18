
import { Link } from 'react-router-dom';
import './Checkout.css';

export default function PagoFallido() {
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
        <h2>No se pudo completar el pago</h2>

        <div className="status-banner err">
          Ocurrió un problema al procesar tu pago con PayPal.
          Puedes volver a intentarlo. Tu carrito se mantiene intacto.
        </div>

        <p style={{ marginTop: 16 }}>
          <Link to="/pagar">Volver a intentar el pago</Link>
        </p>
      </div>
    </div>
  );
}
