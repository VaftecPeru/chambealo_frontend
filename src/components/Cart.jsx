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
          <h1 className="text-[23px] font-bold leading-[34px] text-[#3a085c]">
            Mi Carrito de Compras
          </h1>
          <span className="rounded-full bg-[#70169e]/10 px-3 py-1 text-xs font-semibold text-[#70169e]">
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
                <div className="text-center">Acción</div>
              </div>

              {/* PRODUCTOS */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => {
                  const itemSubtotal = Number(item.price) * item.quantity;
                  return (
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
                        <button onClick={() => decreaseQuantity(item.id)} className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">-</button>
                        <span className="text-[14px] font-medium text-gray-900">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">+</button>
                      </div>
                      <div className="text-[14px] font-bold text-red-600">{formatPrice(itemSubtotal)}</div>
                      <div className="flex justify-end">
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CUPÓN Y SEGUIR COMPRANDO */}
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-7 py-6 bg-white">
                <div className="flex w-full max-w-[377px]">
                  <div className="flex h-12 flex-1 items-center rounded-l-lg border border-r-0 border-gray-200 bg-white px-4">
                    <Ticket size={16} className="mr-2 text-gray-400" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Código de cupón"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <button className="h-12 rounded-r-lg bg-sky-900 px-6 text-sm font-semibold text-white transition hover:bg-sky-800">
                    Aplicar
                  </button>
                </div>
                <Link to="/OurStore" className="flex items-center justify-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 hover:underline">
                  <ShoppingBag size={15} /> Seguir Comprando
                </Link>
              </div>
            </div>

            {/* RESUMEN DEL PEDIDO */}
            <aside className="rounded-xl border border-gray-100 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-bold text-sky-900">Resumen del Pedido</h2>

              <div className="mt-7 flex justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-medium text-gray-800">{formatPrice(subtotal)}</span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-sm text-gray-500">Envío estimado</span>
                <span className="rounded bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">Gratis</span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-sm text-gray-500">Descuento</span>
                <span className="text-sm text-gray-500">{formatPrice(discount)}</span>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-800">Total a Pagar</span>
                <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="mt-8 h-12 w-full rounded-full bg-orange-500 text-sm font-bold text-white transition hover:bg-orange-600 shadow-md hover:shadow-lg"
              >
                Proceder al Pago
              </button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                  <ShieldCheck size={16} className="text-green-500" /> Pago 100% Seguro
                </div>
                <div className="flex justify-center gap-2">
                  <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-white"><CreditCard size={18} className="text-gray-400" /></div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-white"><Smartphone size={17} className="text-gray-400" /></div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-white"><span className="text-[10px] font-bold text-purple-700">Yape</span></div>
                  <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-white"><span className="text-[10px] font-bold text-teal-500">Plin</span></div>
                </div>
              </div>
            </aside>

          </div>
        )}
      </section>
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-white px-6 text-center shadow-sm border border-gray-100">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">
        <ShoppingBag size={34} className="text-violet-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Tu carrito está vacío</h2>
      <p className="mt-2 max-w-md text-sm text-gray-500">Agrega productos a tu carrito para comenzar tu compra.</p>
      <Link to="/OurStore" className="mt-6 rounded-full bg-orange-500 px-8 py-3 text-sm font-bold text-white hover:bg-orange-600 transition shadow-md">
        Ir a la tienda
      </Link>
    </div>
  );
}
