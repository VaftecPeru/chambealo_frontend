import { CreditCard, ShieldCheck, ShoppingBag, Smartphone, Ticket, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const formatPrice = (value) => {
  return `S/ ${Number(value || 0).toFixed(2)}`;
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
      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-10">

        {/* TÍTULO Y CONTADOR GLOBAL */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold leading-tight text-[#3a085c] md:text-[23px]">
            Mi Carrito de Compras
          </h1>
          <span className="rounded-full bg-[#70169e]/10 px-3 py-1 text-xs font-semibold text-[#70169e]">
            {getCartItemsCount()} {getCartItemsCount() === 1 ? 'Producto' : 'Productos'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-7 pt-2 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,932px)_400px]">

            {/* TABLA / LISTA DE PRODUCTOS */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              
              {/* HEADER TABLA (Solo Desktop) */}
              <div className="hidden grid-cols-[2.6fr_1fr_1.2fr_1.1fr_0.7fr] border-b border-gray-100 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.27px] text-gray-400 md:grid">
                <div>Producto</div>
                <div>Precio</div>
                <div>Cantidad</div>
                <div>Subtotal</div>
                <div className="text-center">Acción</div>
              </div>

              {/* LISTA DE ITEMS */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => {
                  // Mapeo seguro para variables de API o locales
                  const itemId = item.id || item.product_id;
                  const itemName = item.name || item.nombre || 'Producto sin nombre';
                  const itemPrice = Number(item.price || item.precio || 0);
                  const itemImage = item.image || item.image_url || item.img1 || 'https://via.placeholder.com/64?text=No+Image';
                  const itemCategory = item.category?.name || item.category_name || item.category || 'General';
                  const itemSubtotal = itemPrice * item.quantity;
                  const maxStock = item.stock || item.stock_quantity || 99;

                  return (
                    <div 
                      key={itemId} 
                      className="flex flex-col gap-4 px-5 py-5 sm:px-7 md:grid md:grid-cols-[2.6fr_1fr_1.2fr_1.1fr_0.7fr] md:items-center"
                    >
                      {/* Información del Producto */}
                      <div className="flex items-center gap-4">
                        <img 
                          src={itemImage} 
                          alt={itemName} 
                          className="h-16 w-16 flex-shrink-0 rounded-lg border border-gray-100 object-cover p-1" 
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                          }} 
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[14px] font-bold text-gray-900 truncate">{itemName}</span>
                          <span className="text-[12px] text-gray-500 uppercase font-medium">{itemCategory}</span>
                          <span className="text-[13px] font-semibold text-gray-700 md:hidden mt-0.5">
                            {formatPrice(itemPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Precio Unitario (Desktop) */}
                      <div className="hidden text-[14px] font-medium text-gray-600 md:block">
                        {formatPrice(itemPrice)}
                      </div>

                      {/* Control de Cantidades */}
                      <div className="flex items-center justify-between md:justify-start gap-3">
                        <span className="text-xs text-gray-500 md:hidden font-medium">Cantidad:</span>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => decreaseQuantity(itemId)} 
                            disabled={item.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                            aria-label="Disminuir cantidad"
                          >
                            -
                          </button>
                          <span className="min-w-[20px] text-center text-[14px] font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => increaseQuantity(itemId)} 
                            disabled={item.quantity >= maxStock}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal por Item */}
                      <div className="flex items-center justify-between md:block">
                        <span className="text-xs text-gray-500 md:hidden font-medium">Subtotal:</span>
                        <span className="text-[14px] font-bold text-red-600">
                          {formatPrice(itemSubtotal)}
                        </span>
                      </div>

                      {/* Botón Eliminar */}
                      <div className="flex justify-end pt-2 border-t border-gray-50 md:border-0 md:pt-0">
                        <button 
                          onClick={() => removeFromCart(itemId)} 
                          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium transition"
                          title="Eliminar producto"
                        >
                          <Trash2 size={18} />
                          <span className="md:hidden">Quitar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BARRA DE CUPÓN Y SEGUIR COMPRANDO */}
              <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex w-full max-w-[377px]">
                  <div className="flex h-11 flex-1 items-center rounded-l-lg border border-r-0 border-gray-200 bg-white px-3.5 focus-within:border-sky-900">
                    <Ticket size={16} className="mr-2 flex-shrink-0 text-gray-400" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Código de cupón"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <button className="h-11 rounded-r-lg bg-sky-900 px-5 text-sm font-semibold text-white transition hover:bg-sky-800">
                    Aplicar
                  </button>
                </div>
                <Link 
                  to="/OurStore" 
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700 hover:underline"
                >
                  <ShoppingBag size={15} /> Seguir Comprando
                </Link>
              </div>
            </div>

            {/* RESUMEN DEL PEDIDO */}
            <aside className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-lg font-bold text-sky-900">Resumen del Pedido</h2>

              <div className="mt-6 space-y-3.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Envío estimado</span>
                  <span className="rounded bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-600">Gratis</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Descuento</span>
                  <span className="text-gray-500">{formatPrice(discount)}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5 flex justify-between items-center">
                <span className="text-base font-bold text-gray-800">Total a Pagar</span>
                <span className="text-2xl font-black text-red-600">{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="mt-6 h-12 w-full rounded-full bg-orange-500 text-sm font-bold text-white transition hover:bg-orange-600 shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                Proceder al Pago
              </button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-3 font-medium">
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
    <div className="flex min-h-[380px] flex-col items-center justify-center rounded-xl bg-white px-6 py-12 text-center shadow-sm border border-gray-100">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 text-violet-500">
        <ShoppingBag size={36} />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Tu carrito está vacío</h2>
      <p className="mt-2 max-w-md text-sm text-gray-500 leading-relaxed">
        Parece que aún no has agregado productos. Explora el catálogo para comenzar tu compra.
      </p>
      <Link 
        to="/OurStore" 
        className="mt-6 rounded-full bg-orange-500 px-8 py-3 text-sm font-bold text-white hover:bg-orange-600 transition shadow-md hover:shadow-lg"
      >
        Ir a la tienda
      </Link>
    </div>
  );
}