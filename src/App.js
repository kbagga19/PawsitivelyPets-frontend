// import logo from './logo.svg';
import './App.css';
// import Navbar from './components/Navbar';
import {Route , Routes} from 'react-router-dom';
import Home from './components/Home';
import Shop from './pages/Shop';
import BlogHome from './pages/BlogHome'; 
import Cart from './pages/Cart';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import Adoption from './pages/Adoption';
import CheckoutForm from './pages/CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useState, useEffect} from 'react';
import { CartState } from './Context/Context';
import Payment from './pages/Payment';
import Success from './pages/Success';
import FoodProducts from './pages/FoodProducts';
import GroomingProducts from './pages/GroomingProducts';
import Accessories from './pages/Accessories';
import Create from './pages/CreatePost';
import PostPage from './pages/PostPage';

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
        <Route exact path='/post/:id' element={<PostPage/>}></Route>

      </Routes>  
    </div>
    
  );
}

// export default App;

