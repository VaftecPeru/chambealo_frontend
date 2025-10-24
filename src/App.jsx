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
import ProductDetail from './components/ProductDetail.jsx';
//Aquí importamos los productos al componente App.jsx
import { totalProductsRaw } from './components/products.js';


function App() {

  return (
      <div>
          <BrowserRouter>
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
                path='/producto/:id'
                element={
                  <ProductDetail allProducts={totalProductsRaw}/> //Aquí estamos pasando los productos como props
                }
              />
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App;