import React from 'react'
import '../styles/Cart.css'
import { CartState } from '../Context/Context'
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [username, setUsername] = useState(null);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, settotal] = useState();

  useEffect(() => {
      settotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0));

      fetch ('https://pawsitivelypets-api.onrender.com/profile',{
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
            setUsername(userInfo.name);
        })
    })
  }, [cart]);
  
  console.log(cart)

  return (
    <div>
        <Navbar/>
        {cart.length == 0 || !username ? (
          <>
            <div className="maincart">
              <h1 id="cartheading">Oops..Your Cart Is Empty!</h1>
            </div>
          </>
        ) : (
          <div className="maincart">
          <h1 id="cartheading">Your Cart ({cart.length} Items)</h1>
          <div >
              <table className="cartItems">
                <tr className="cartHead">
                  <th className="headItems">Items</th>
                  <th className='pricehead'>Price</th>
                  <th>Quantity</th>
                  <th>Total</th> 
                </tr>
                {
                  cart.map((prod) => (
                    <tr className="cartBox"><td className="addedItem">
                    <img className="cartItemImg" src={prod.img} alt=""/>
                      <h2 className="itemName">{prod.title}</h2></td>
                      <td className="price">Rs. {prod.price}</td>
                      <td><input type="number" value={prod.qty} className="quantity" min="1" id="input"
                        onChange={(e) =>
                          dispatch({
                            type : "CHANGE_CART_QTY",
                            payload : {
                              _id : prod._id,
                              qty: e.target.value,
                            },
                          })
                        }
                      /></td>
                      <td className="totalAmt">Rs. {prod.price * prod.qty}</td>
                      <td onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }} className="delete"><span><DeleteIcon/></span></td></tr>
                  ))
                }
              </table>
              
              <div className="finalTotal">
                  <div className="subtotal"><h3>Subtotal :</h3><p className="total-price">Rs. {total}</p></div>
                  {
                    total != 0 ? (<Link to={'/payment'}><button type="submit" id="checkout-button" className="CheckOutButton">Checkout</button></Link>) :
                    (
                    <button type="submit" id="checkout-button" className="CheckOutButton" onClick={() => {alert("Cart is Empty!")}}>Checkout</button>)
                  } 
                  
              </div>
              
          </div>
      </div>
        )}
        
    </div>
    
  )
}

export default Cart
