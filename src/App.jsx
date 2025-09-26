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

function App() {

  return (
    <>
    <div>
      <NavbarHeader />
      <Navbar />
      <Slider />
      <MainCards />
      <TopCategories />
      <ShopByDepartments />
      <Banner1 />
      <BestSelling />
      <MainCards2 />
    </div>
    </>
  )
}

export default App;