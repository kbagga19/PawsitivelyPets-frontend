import React, { useEffect } from 'react'
import '../styles/Navbar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import {CartState} from '../Context/Context';
import CloseIcon from '@mui/icons-material/Close';
import $ from 'jquery';

const Navbar = () => {
  const {id} = useParams();
  const [openprofile, setOpenProfile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [username, setUsername] = useState(null);

  const {
    state: { cart },
  } = CartState();

  useEffect(() => {
    fetch('https://pawsitivelypets-api.onrender.com/profile',{
        method: "POST",
        crossDomain: true,
        headers: {'Content-Type':'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },    
        body: JSON.stringify({
            token: window.localStorage.getItem("token")
        }),
        })
          .then((res) => res.json())
          .then((data) => {
                console.log(data);
                let usname = data.data.name;
                let usemail = data.data.email;
                localStorage.setItem('username', usname);
                localStorage.setItem('email', usemail);
                setUsername(usname);
            });
  },[]);

  function logout() {
    window.localStorage.clear();
    setUsername(null);
    alert("User Logged Out!");
  }

  return (
    <div className="navbar">
    { dropdown && (
        <div id="droplist">
            <span id='dropclose' onClick={() => setDropdown((prev) => !prev)}><CloseIcon/></span>
            <div className="dropcontent">
            <ul>
                <li><Link to={'/'}>Home</Link></li><hr/>
                <li><Link to={'/shop'}>Shop</Link></li><hr/>
                <li><Link to={'/blog'}>Blogs</Link></li><hr/>
                <li><Link to={'/adoption'}>Adoption</Link></li><hr/>
                <li>
                {!username && (
                    <>
                        <span className="span2" id="droploginbtn"><Link to={'/'}>SIGN IN</Link></span>
                    </>
                )}
                {username && (
                        <>
                            <span className="span2" id="droplogoutbtn" onClick={logout}>LOGOUT</span>
                        </>
                )}
                </li>
            </ul>
            </div>
        </div>
        )
    }  
        <div className="left">
        <div id='hamburger' onClick={() => setDropdown((prev) => !prev)}><img src={require('../images/menu.png')}/></div>
        
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
            <Link to={'/'}><img src={require('../images/logo.png')}/></Link>
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
