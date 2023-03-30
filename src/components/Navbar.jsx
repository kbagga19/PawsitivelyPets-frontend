import React, { useEffect } from 'react'
import '../styles/Navbar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {CartState} from '../Context/Context';

const Navbar = () => {
  const [openprofile, setOpenProfile] = useState(false);
  const [username, setUsername] = useState(null);

  const {
    state: { cart },
  } = CartState();
  
  useEffect(() => {
    fetch('https://pawsitivelypets-api.onrender.com/profile',{
        credentials: 'include',
        }).then(response => {
        response.json().then(userInfo => {
            setUsername(userInfo.name);
        })
    })
  },[]);

  function logout() {
    fetch('https://pawsitivelypets-api.onrender.com/logout', {
        credentials: 'include',
        method: 'POST'
    });
    setUsername(null);
  }

  return (
    <div className="navbar">
        <div className="left">
            <li><Link to={'/'}>HOME</Link></li>
            <li className="shop" onClick={() => setOpenProfile((prev) => !prev)}>SHOP
                <span>
                    <ExpandMoreIcon/>
                    </span>
            </li>
            {
                openprofile && (
                    <div className="shopdropdown">
                        <ul>
                            <li><Link to={'/groomingproducts'}>PET GROOMING</Link></li>
                            <li><Link to={'/foodproducts'}>PET FOOD</Link></li>
                            <li><Link to={'/accessories'}>ACCESSORIES</Link></li>
                        </ul>
                    </div>
                )
            }
            <li><Link to={'/blog'}>BLOGS</Link></li>
            <li><Link to={'/adoption'}>ADOPTION</Link></li>
        </div>
        <div className="center">            
            <a href="../index.html"><img src={require('../images/logo.png')}/></a>
        </div>
        <div className="right">
            <li><Link to={'/footer'}>CONTACT</Link></li>
            <span>
                <AccountCircleIcon/>
                </span>
                {username && (
                    <>
                        <span id ="greeting">Hello,</span> <span id="userName">{username}</span>
                    </>
                )}
            <Link to="/cart"><span id="shopping_cart">
              <ShoppingCartIcon/>
              </span></Link>
              {
                username && (
                    <p id="cart_count">({cart.length})</p>
                )
              }
              {
                !username && (
                    <p id="cart_count">(0)</p>
                )
              }
              
              {!username && (
                <>
                    <span className="span2" id="sign_in"><Link to={'/'}>SIGN IN</Link></span>
                </>
              )}
            {username && (
                    <>
                        <span className="span2" id="logout" onClick={logout}>LOGOUT</span>
                    </>
                )}
        </div>
    </div>
  )
}

export default Navbar
