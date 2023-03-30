import React, { useState, useEffect }from 'react';
import StarIcon from '@mui/icons-material/Star';
import { CartState } from '../Context/Context';

const Items = ({prod}) => {
    const [username, setUsername] = useState(null);

    const {
        state: { cart },
        dispatch,
      } = CartState();

      console.log(cart);

      useEffect(() => {
        fetch ('https://pawsitivelypets-api.onrender.com/profile',{
            credentials: 'include',
          }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.name);
            })
        })
      }, [])
      
    return (
        <>
            <div className="img1">
                <img className="productimg" src={prod.img} alt="error"/>
                {/* <img className="shop_image1" src={require('../images/featureditem1-1.jpg')} alt="error"/> */}
                <h2 className="product-title">{prod.title}</h2>
                <span className="itmprice">Rs. {prod.price}</span>
                <p className="desc">{prod.description}</p>
                <div className="stars">
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                </div>
                
                {   
                    username && (
                        cart.some((p) => p._id == prod._id) ? (<button onClick={() => {
                            alert("Item Already In Cart!");
                        }} className="addtocart">Add to cart</button> ) : (
                            <button onClick={() => {
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: prod
                                })
                            }} className="addtocart">Add to cart</button> 
                        ) 
                    )
                }
                {
                    !username && (
                        <button onClick={() => {
                            alert("Login to Shop!");
                        }} className="addtocart">Add to cart</button>
                    )
                }
               
            </div>
        </>
    )
}

export default Items
