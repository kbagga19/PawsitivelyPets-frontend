import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Items from '../products/shopItems';

const FoodProducts = () => {

  const [product, setproduct] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/food',{
        credentials: 'include',
        }).then(response => {
        response.json().then(productInfo => {
            console.log(productInfo);
            setproduct(productInfo);
        })
    })
  }, [])

  return (
    <div>
        <Navbar/>
        <div class="shop-container">
          <h1 class="shop-title">SHOP PRODUCTS</h1>
            <div class="shop-content">
              {
                product.map((prod) => {
                  return <Items prod={prod} key = {prod._id}/>
                })
              }
            </div>
        </div>  
    </div>
  )
}

export default FoodProducts