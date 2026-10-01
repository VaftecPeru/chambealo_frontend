import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Banner1 from './components/Banner1';
import BestSelling from './components/BestSelling';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Login from './components/Login.jsx';
import MainCards from './components/MainCards';
import MainCards2 from './components/MainCards2';
import Navbar from './components/Navbar';
import NavbarHeader from './components/NavbarHeader';
import OurLatestNews from './components/OurLatestNews';
import OurProducts from './components/OurProducts';
import Products from './components/Products.jsx';
import Register from './components/Register.jsx';
import ShopByDepartments from './components/ShopByDepartments';
import Slider from './components/Slider';
import TopCategories from './components/TopCategories';
import { CartProvider } from './contexts/CartContext';
import MyOrders from './pages/MyOrders.jsx';
import PaypalCheckoutUI from './pages/Paypal_Checkout_Ui.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <NavbarHeader />
          <Navbar />

          <Routes>
            {/* Inicio */}
            <Route
              path="/"
              element={
                <>
                  <Slider />
                  <MainCards />
                  <TopCategories />
                  <ShopByDepartments />
                  <Banner1 />
                  <BestSelling />
                  <MainCards2 />
                  <OurProducts />
                  <OurLatestNews />
                </>
              }
            />

            {/* Tienda y Catálogo (Ruta principal + Alias) */}
            <Route path="/tienda" element={<Products />} />
            <Route path="/OurStore" element={<Navigate to="/tienda" replace />} />

            {/* Detalle del producto */}
            <Route path="/producto/:id" element={<ProductDetail />} />

            {/* Carrito de compras (Ruta principal + Alias) */}
            <Route path="/carrito" element={<Cart />} />
            <Route path="/cart" element={<Navigate to="/carrito" replace />} />

            {/* Checkout y Pagos */}
            <Route path="/checkout" element={<PaypalCheckoutUI />} />
            <Route path="/pagar" element={<Checkout />} />

            {/* Pedidos del usuario */}
            <Route path="/mis-pedidos" element={<MyOrders />} />

            {/* Autenticación (Ruta principal + Alias) */}
            <Route path="/login" element={<Login />} />
            <Route path="/Login" element={<Navigate to="/login" replace />} />

            <Route path="/registro" element={<Register />} />
            <Route path="/Register" element={<Navigate to="/registro" replace />} />

            {/* Manejo de rutas 404 (Redirección al inicio) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;