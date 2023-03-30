import React, {useState, useEffect}from 'react';
import StarIcon from '@mui/icons-material/Star';
import { CartState } from '../Context/Context';
import '../styles/shopProducts.css'

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
            <div className="product-card">
                <img className="product-img" src={prod.img} alt="error"/>
                {/* <img className="shop_image1" src={require('../images/featureditem1-1.jpg')} alt="error"/> */}
                <h2 className="product-title">{prod.title}</h2>
                <span className="price">Rs. {prod.price}</span>
                <p>{prod.description}</p>
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
