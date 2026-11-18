import { Link } from 'react-router-dom';
import './Checkout.css';

export default function PagoCancelado() {
  return (
    <div className="wrap">
      <div className="card" style={{ maxWidth: 520, margin: '40px auto', textAlign: 'center' }}>
        <h2>Pago cancelado</h2>
        <div className="status-banner info">
          Cancelaste la aprobación en PayPal. Tu carrito sigue intacto, pero el pedido puede quedar pendiente. Consulta «Mis Pedidos» antes de intentar otro pago.
        </div>
        <p style={{ marginTop: 16 }}>
          <Link to="/pagar">Volver al checkout</Link>
        </p>
      </div>
    </div>
  );
}