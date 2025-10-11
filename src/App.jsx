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
import Filter from './components/Filter.jsx';
import Products from './components/Products.jsx'


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
                  <> 
                    {/* Contenedor responsive */}
                    <div className='flex flex-col md:flex-row'>
                      {/* Filter - Oculto en móvil, visible en desktop */}
                      <div className='hidden md:block md:ml-20 md:mt-20'>                         
                        <Filter /> 
                      </div>
                      {/* Products - Siempre visible, ajustado para móvil */}
                      <div className='w-full mt-4 md:mt-10'>
                        <Products />
                      </div>
                    </div>  
                  </>
              } 
            />
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App;