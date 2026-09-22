import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import NavbarHeader from './components/NavbarHeader';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import MainCards from './components/MainCards'
import TopCategories from './components/TopCategories';
import ShopByDepartments from './components/ShopByDepartments'
import Banner1 from './components/Banner1'
import BestSelling from './components/BestSelling'
import MainCards2 from './components/MainCards2'
import OurProducts from './components/OurProducts';
import OurLatestNews from './components/OurLatestNews';
import Products from './components/Products.jsx'
import  ProductDetail  from './pages/ProductDetail.jsx';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx';
import PaypalCheckoutUI from './pages/Paypal_Checkout_Ui.jsx';
import Cart from './components/Cart.jsx';
import { CartProvider } from './contexts/CartContext';
//Aquí importamos los productos al componente App.jsx
import { totalProductsRaw } from './components/products.js';



function App() {

  return (
      <div>
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
              <Route 
                path="/OurStore" 
                element={
                  <Products />     
                }
              />
              <Route
                path="/checkout"
                element={
                  <PaypalCheckoutUI />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart />
                }
              />
              <Route
                path='/producto/:id'
                element={
                  <ProductDetail allProducts={totalProductsRaw} />
                }
              />   
              <Route
                path='/Login'
                element={
                  <Login/>
                }
              />   
              <Route
                path='/Register'
                element={
                  <Register />
                }
              />
               
              </Routes>
          </CartProvider>          
          </BrowserRouter>
      </div>
  )
}

export default App;