import { CreditCard, ShieldCheck, ShoppingBag, Smartphone, Ticket, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const formatPrice = (value) => {
  return `S/ ${Number(value).toFixed(2)}`;
};

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
    getCartItemsCount
  } = useCart();

  const [coupon, setCoupon] = useState('');
  const subtotal = getCartTotal();
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans">
      <section className="mx-auto w-full max-w-[1440px] px-5 py-8 md:px-10">

        {/* TÍTULO */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-[23px] font-bold leading-[34px] text-sky-900">
            Mi Carrito de Compras
          </h1>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
            {getCartItemsCount()} {getCartItemsCount() === 1 ? 'Producto' : 'Productos'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-7 pt-4 lg:grid-cols-[minmax(0,932px)_400px]">

            {/* CARRITO */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100">
              {/* HEADER TABLA */}
              <div className="hidden grid-cols-[2.6fr_1fr_1.2fr_1.1fr_0.7fr] border-b border-gray-100 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.27px] text-gray-400 md:grid">
                <div>Producto</div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Subtotal</div>
                <div className="text-right">Acción</div>
              </div>

              {/* PRODUCTOS */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 gap-4 px-7 py-6 md:grid-cols-[2.6fr_1fr_1.2fr_1.1fr_0.7fr] md:items-center">
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-gray-900">{item.name}</span>
                        <span className="text-[12px] text-gray-500">{item.category}</span>
                      </div>
                    </div>
                    <div className="text-[14px] font-medium text-gray-600">{formatPrice(item.price)}</div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => decreaseQuantity(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">-</button>
                      <span className="text-[14px] font-medium text-gray-900">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">+</button>
                    </div>
                    <div className="text-[14px] font-bold text-sky-900">{formatPrice(item.price * item.quantity)}</div>
                    <div className="flex justify-end">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESUMEN */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="mb-6 text-[18px] font-bold text-gray-900">Resumen del Pedido</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-[14px] text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-gray-600">
                  <span>Envío</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-[16px] font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-sky-900">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Cupón de descuento"
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-[14px] outline-none focus:border-sky-500"
                  />
                  <button className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-gray-800">Aplicar</button>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full rounded-lg bg-sky-600 py-3 text-[14px] font-bold text-white shadow-md hover:bg-sky-700 transition-colors"
                >
                  Proceder al Pago
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 opacity-60">
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <ShieldCheck size={14} />
                  Pago Seguro
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <CreditCard size={14} />
                  Todas las tarjetas
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 rounded-full bg-gray-100 p-6 text-gray-400">
        <ShoppingBag size={64} />
      </div>
      <h2 className="mb-2 text-[23px] font-bold text-gray-900">Tu carrito está vacío</h2>
      <p className="mb-8 max-w-[400px] text-[15px] text-gray-500">
        Parece que aún no has añadido ningún producto a tu carrito. ¡Explora nuestra tienda y encuentra algo que te encante!
      </p>
      <Link
        to="/products"
        className="rounded-lg bg-sky-600 px-8 py-3 text-[14px] font-bold text-white shadow-md hover:bg-sky-700 transition-colors"
      >
        Ir a la tienda
      </Link>
    </div>
  );
}
