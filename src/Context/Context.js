import { createContext, useReducer, useContext } from 'react'
import {products} from '../products/products.js';
import Items from '../products/items.js'; 
import { cartReducer } from './Reducers.js';

const Cart = createContext()

const Context = ({ children }) => {
//   const products = [...Array(3)].map(() => ({

//   }))

//   console.log(products)
  const [state, dispatch] = useReducer(cartReducer,{
    products: products,
    cart:[]
  })
  return <Cart.Provider value={{state, dispatch}}>{children}</Cart.Provider>
}

export default Context

export const CartState = () => {
    return useContext(Cart);
}