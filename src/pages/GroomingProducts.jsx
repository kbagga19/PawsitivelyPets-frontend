import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Items from '../products/shopItems';
import '../styles/shopProducts.css'

const GroomingProducts = () => {
    const [product, setproduct] = useState([]);
    useEffect(() => {
      fetch('http://localhost:3001/grooming',{
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

export default GroomingProducts