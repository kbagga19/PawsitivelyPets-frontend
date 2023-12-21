import './App.css';
import {Route , Routes} from 'react-router-dom';
import Home from './components/Home';
import Shop from './pages/Shop';
import BlogHome from './pages/BlogHome'; 
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Adoption from './pages/Adoption';
import { CartState } from './Context/Context';
import Payment from './pages/Payment';
import Success from './pages/Success';
import FoodProducts from './pages/FoodProducts';
import GroomingProducts from './pages/GroomingProducts';
import Accessories from './pages/Accessories';
import Create from './pages/CreatePost';
import PostPage from './pages/PostPage';
import PrivateRoute from './PrivateRoute';
import PetDetails from './pages/PetDetails';
import ReHome from './pages/ReHome';
import PetAdoption from './pages/PetAdoption';

export default function App() {

  const { 
    state: { cart }
  } = CartState();

  console.log(cart);

  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/shop' element={<Shop/>}></Route>
        <Route exact path='/blog' element={<BlogHome/>}></Route>
        <Route exact path='/adoption' element={<Adoption/>}></Route>
        <Route exact path='/footer' element={<Footer/>}></Route>
        <Route exact path='/cart' element={<Cart/>}></Route>
        <Route exact path='/payment' element={<Payment/>}></Route>
        <Route exact path='/success' element={<Success/>}></Route>
        <Route exact path='/foodproducts' element={<FoodProducts/>}></Route>
        <Route exact path='/groomingproducts' element={<GroomingProducts/>}></Route>
        <Route exact path='/accessories' element={<Accessories/>}></Route>
        <Route exact path='/create' element={<Create/>}></Route>
        <Route exact path='/petAdoption' element={<PetAdoption/>}></Route>

        <Route element={<PrivateRoute/>}>
          <Route exact path='/post/:id' element={<PostPage/>}></Route>
          <Route exact path='/pets/:id' element={<PetDetails/>}></Route>
          <Route exact path='/rehome' element={<ReHome/>}></Route>
        </Route>
      </Routes>  
    </div>
    
  );
}

// export default App;

