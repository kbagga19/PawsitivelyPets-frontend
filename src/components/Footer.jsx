import React from 'react';
import '../styles/Footer.css';
import footerDog from '../images/footerDog.png';
import logo from '../images/logo.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer" id="foot">
        <div className="footer-topbar">
            <div className="footer-logo">
                <Link to={'/'}><img src={logo}/></Link>
            </div>
            <div className="social-icon">
                <img src={instagram}/>
                <img src={facebook}/>
            </div>
            
        </div>
        <div className="footer-secondbar">
            <p>One stop shop for all your pet needs <br/> New Delhi, India</p>
            <div className="footer-list">
                <ul>
                    <li>Services</li>
                    <li>About Us</li>
                    <li>Locations</li>
                    <li>Contact Us</li>
                </ul>
            </div>
        </div>
        <div className="main-footer">
            <span>Are You ready to get started?</span>
            <div className="main-footer-email">
                <span>pawsitivelypets19@gmail.com</span>
                <button><Link to={'/shop'}>SHOP NOW</Link></button>
                <span>+91 746378922</span>
            </div>
            <div className="footer-foot">
                <img src={footerDog}/>
                <div className="details">
                    <span>PawsitivelyPets @ 2023 | New Delhi, India</span>
                    <span className="termsprivacy">
                        <ul>
                            <li>Privacy</li>
                            <li>Terms</li>
                            <li>Contact</li>
                        </ul>
                    </span>
                </div>
            </div>   
        </div>
    </div>
  )
}

export default Footer
