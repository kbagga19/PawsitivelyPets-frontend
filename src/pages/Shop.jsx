import React, {useState} from 'react'
import Navbar from '../components/Navbar.jsx'
import '../styles/Shop.css'
// import StarIcon from '@mui/icons-material/Star';
import {products} from '../products/products.js';
import Items from '../products/items.js';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';



const Shop = () => {
  const [isZoomed1, setIsZoomed1] = useState(false);
  const [isZoomed2, setIsZoomed2] = useState(false);
  const [isZoomed3, setIsZoomed3] = useState(false);
  const [item, setItem] = useState(products);

  return (
    <>
    <div>
        <Navbar/>
        <div className="zoomout">
        <img className="shop_home_image" id="towel" src={require('../images/towelDog.png')} alt="error"/>
        <img className="shop_home_image" id="glasses" src={require('../images/shopBanner.png')} alt="error"/>
        <div id="shopspacex" className="animate__animated animate__fadeInUp">SHOP PAWSITIVELY</div>
        </div>

        <div className="shop__main">
            <h2 className="featuredproducts">FEATURED PRODUCTS</h2>
            <div className="products">
              {
              item.map((prod) => {
                return <Items prod={prod} key = {prod._id}/>
              })
            }
              {/* <div className="img1">
                <img className="productimg" src={require('../images/featureditem1-2.jpg')} alt="error"/>
                <img className="shop_image1" src={require('../images/featureditem1-1.jpg')} alt="error"/>
                <h2 className="product-title">Gingerbread Biscuits</h2>
                <span className="price">Rs. 160</span>
                <p className="desc">If you want to see those tricks, then you must reward your pets with treats in our Berry Blast treats. What’s more they are healthy and chewy, just perfect to train your furry babies.</p>
                <div className="stars">
                  <span className="material-symbols-outlined"><StarIcon/></span>
                  <span className="material-symbols-outlined"><StarIcon/></span>
                  <span className="material-symbols-outlined"><StarIcon/></span>
                  <span className="material-symbols-outlined"><StarIcon/></span>
                  <span className="material-symbols-outlined"><StarIcon/></span>
                </div>
                <button className="addtocart">Add to cart</button> 
              </div>
              
              <div className="img2">
                <img className="productimg" src={require('../images/featureditem2-1.jpg')} alt="error"/>
                <img className="shop_image2" src={require('../images/featureditem2-2.jpg')} alt="error"/>
                
                <h2 className="product-title">Wiggles Dog Treats Berry Blast</h2>
                <span className="price">Rs. 149</span>
                <p className="desc">If you want to see those tricks, then you must reward your pets with treats in our Berry Blast treats. What’s more they are healthy and chewy, just perfect to train your furry babies.</p>
                <div className="stars">
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                </div>
                <button className="addtocart">Add to cart</button> 
              </div>

              <div className="img3">
                <img className="productimg" src={require('../images/featureditems3-2.jpg')} alt="error"/>
                <img className="shop_image3" src={require('../images/featureditems3-1.jpg')} alt="error"/>
                
                <h2 className="product-title">Wiggles Barkstix Dog Berry Blast</h2>
                <span className="price">Rs. 149</span>
                <p className="desc">If you want to see those tricks, then you must reward your pets with treats in our Berry Blast treats. What’s more they are healthy and chewy, just perfect to train your furry babies.</p>
                <div className="stars">
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                    <span className="material-symbols-outlined"><StarIcon/></span>
                </div>
                <button className="addtocart">Add to cart</button> 
              </div> */}
            </div>
            <section className="sec1">
    
            </section>
            <div className="item">
              <div className="item_img"><img id="womens_img" src={require('../images/grooming.jpeg')} alt="error" style={{transform : `${isZoomed1 ? 'scale(1.3)' : ''}`}}/> 
              <h1 className="content">GROOMING</h1>
              <Link to={'/groomingproducts'}>
              <div className="view_products">
                <section className="sec2">
                  <button className="view_products1">
                    
                    View Products
                  </button>  
                </section>
              </div>
            </Link>
              <div id="opacity1" className="item-opacity" onMouseEnter={() => setIsZoomed1(true)} onMouseLeave={() => setIsZoomed1(false)}></div>
              </div>
              <div className="item_img1"><img id="mens_img" src={require('../images/shopfood.jpeg')} alt="error" style={{transform : `${isZoomed2 ? 'scale(1.3)' : ''}`}}/>
              <h1 className="content">FOOD</h1>
              <Link to={'/foodproducts'}>
              <div className="view_products">
               <section className="sec2">
    
                 <button className="view_products1">
                  View Products
                  </button>
                </section> 
              </div></Link>
              <div id="opacity2" className="item-opacity" onMouseEnter={() => setIsZoomed2(true)} onMouseLeave={() => setIsZoomed2(false)}></div>
              </div>
              <div className="item_img2"><img id="accessories_img" src={require('../images/accessories.jpg')} alt="error" style={{transform : `${isZoomed3 ? 'scale(1.3)' : ''}`}}/>
              <h1 className="content">ACCESSORIES</h1>
              <Link to={'/accessories'}>
              <div className="view_products">
               <section className="sec2">
                
                 <button className="view_products1">
                   View Products
                   
                  </button>
                </section>
              </div></Link>
              <div id="opacity3" className="item-opacity" onMouseEnter={() => setIsZoomed3(true)} onMouseLeave={() => setIsZoomed3(false)}></div>
              </div>

    </div>
    </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Shop