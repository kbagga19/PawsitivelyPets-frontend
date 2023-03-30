import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Items from '../products/shopItems';

const Accessories = () => {

  const [product, setproduct] = useState([]);
  useEffect(() => {
    fetch('https://pawsitivelypets-api.onrender.com/accessories',{
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

export default Accessories
