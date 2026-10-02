import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavbarHeader from './components/NavbarHeader';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import MainCards from './components/MainCards';
import TopCategories from './components/TopCategories';
import ShopByDepartments from './components/ShopByDepartments';
import Banner1 from './components/Banner1';
import BestSelling from './components/BestSelling';
import MainCards2 from './components/MainCards2';
import OurProducts from './components/OurProducts';
import OurLatestNews from './components/OurLatestNews';
import Products from './components/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PaypalCheckoutUI from './pages/Paypal_Checkout_Ui.jsx';
import Checkout from './components/Checkout.jsx';
import Cart from './components/Cart.jsx';
import { CartProvider } from './contexts/CartContext';
import MyOrders from './pages/MyOrders.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <CartProvider>
          <NavbarHeader />
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Slider />
                  <MainCards />
                  {/* <TopCategories /> */}
                  <ShopByDepartments />
                  <Banner1 />
                  <BestSelling />
                  <MainCards2 />
                  <OurProducts />
                  <OurLatestNews />
                </>
              }
            />

            <Route
              path="/OurStore"
              element={<Products />}
            />

            <Route
              path="/checkout"
              element={<PaypalCheckoutUI />}
            />

            <Route
              path="/pagar"
              element={<Checkout />}
            />

            <Route
              path="/mis-pedidos"
              element={<MyOrders />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/producto/:id"
              element={<ProductDetail />}
            />

            <Route
              path="/Login"
              element={<Login />}
            />

            <Route
              path="/Register"
              element={<Register />}
            />
          </Routes>

          {/* Footer global para todas las rutas */}
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;