import React from 'react'
import '../styles/Home.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import {useState, useEffect} from 'react';
import $ from 'jquery';
import { Link, useParams } from "react-router-dom";
import Footer from './Footer';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import BlogPost from '../components/BlogPost';
import CountUp from 'react-countup';
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import PetsIcon from '@mui/icons-material/Pets';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import img1 from '../images/adoption1.jpeg'
import img2 from '../images/adoption2.jpeg'
import img3 from '../images/adoption3.jpeg'

const images = [img1, img2, img3];

const Home = () => {
    const {id} = useParams();
    const navigate = useNavigate();    
    const [openprofile, setOpenProfile] = useState(false);
    const [opensignin, setopensignin] = useState(false);
    const [opensignup, setopensignup] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(images[Math.floor(Math.random() * images.length)]);
        }, 2000)
        
        return () => clearInterval(intervalId);
    }, [])    

  useEffect(() => {
    fetch('https://pawsitivelypets-api.onrender.com/homePost').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
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
                setUsername(usname);
            });
  }, []);

    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('https://pawsitivelypets-api.onrender.com/register', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type':'application/json'}
        });  
        if (response.status === 200) {
            alert("User Registered Successfully!");
        } else {
            alert("User Already Registered!");
        }
    }

    function login(ev){
        ev.preventDefault();
        fetch('https://pawsitivelypets-api.onrender.com/login', {
            method: 'POST',
            crossDomain: true,
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },    
            credentials: 'include',
        }).then((res) => res.json())
        .then((data) => {
            console.log(data, "UserRegister");
            if (data.status == "ok") {
                alert("User Logged In!");
                window.localStorage.setItem("token", data.data);
                window.location.href="./";
                //navigate("/shop");
                $('body').css('overflow', "visible");
            } else {
                alert('Wrong Credentials!');
            }
        });
    } 

    const handleClick = event => {
        setopensignin(current => !current); 
        setDropdown(current => !current);
    };

    const handleSignUpClick = event => {
        setopensignup(current => !current); 
        setopensignin(current => !current); 
    };

    const handleCross = event => {
        setopensignup(current => !current); 
    };

    useEffect(() => {
        $(document).ready(function(){
            $('#sign_in').click(function(){
              $('body').css('overflow', "hidden");
            });  
          
            $('#cross1').click(function(){
              $('body').css('overflow', "visible");
            });
          
            $('#cross').click(function(){
              $('body').css('overflow', "visible");
            });
          });
        //   fetch('http://localhost:3001/profile',{
        //     credentials: 'include',
        //   }).then(response => {
        //     response.json().then(userInfo => {
        //         setUsername(userInfo.name);
        //     })
        //   })
    }, [])

    function logout() {
        window.localStorage.clear();
        setUsername(null);
        alert("User Logged Out!");
      }
    
    

 return (
    <>
    <div>
    <div className={`navbar ${opensignin ? 'opacity' : ''} ${opensignup ? 'opacity' : ''}`}>
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
                        <span className="span2" onClick={handleClick} id="droploginbtn">SIGN IN</span>
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

            <li><Link to={"/"}>HOME</Link></li>
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
            <li><Link to={"/blog"}>BLOGS</Link></li>
            <li><Link to={"/adoption"}>ADOPTION</Link></li>
        </div>
        <div className="center">            
            <Link to={"/blog"}><img src={require('../images/logo.png')}/></Link>
        </div>
        <div className="right">
            <li><Link to={'/footer'}>CONTACT</Link></li>
            <span className="material-symbols-outlined">
                <AccountCircleIcon/>
                </span>
            {username && (
                <>
                <span id="greeting">Hello,</span> <span id="userName">{username}</span>
                </>
            )}
            {!username && (
                <>
                    <span className="span2" onClick={handleClick} id="sign_in">SIGN IN</span>
                </>
            )}
            {username && (
                <>
                    <span className="span2" id="logout" onClick={logout}>LOGOUT</span>
                </>
            )}
        </div>
    </div>
    
    {/* signup */}

    <div className={`sign-up ${opensignup ? 'sign_up_focus' : ''}`}>
        <div className="container1">
            <span id="cross" onClick={handleCross}>
                <CloseIcon/>
                </span>
            <h1>Register</h1>
            <hr/>

            <label for="name"><b>Name</b></label>
            <input type="text" placeholder="Full Name" name="name" id="name" 
                value = {name}
                onChange = {ev => setName(ev.target.value)}
                required/>
        
            <label for="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" id="login-email" 
                value = {email}
                onChange = {ev => setEmail(ev.target.value)}
                required/>
        
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" id="password"
                value = {password}
                onChange = {ev => setPassword(ev.target.value)}
                required/>
            <hr/>
        
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button id="register" className="registerbtn" onClick={register}>Register</button>
        </div>
        
        <div className="container1 signin1">
            <p>Already have an account? <a id="signbtn" onClick={handleSignUpClick} href="#">Sign in</a>.</p>
        </div>
    </div>

    {/* signin */}

    {/* {
    opensignin && ( */}
        <div className={`sign-in ${opensignin ? 'sign_in_focus' : ''}`}>
            <div className="container2">
                <span id="cross1" onClick={handleClick} className="material-symbols-outlined">
                    <CloseIcon/>
                    </span>
                <h1>Sign In</h1>
            <hr/>

                <label for="email"><b>Email</b></label>
                <input type="email" placeholder="Enter Email" name="email" id="login-email" 
                    value={email} 
                    onChange={ev  => setEmail(ev.target.value)} 
                required/>
            
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="login-password" 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}
                required/>
                <hr/>
            
                <button id = "sign" className="signinbtn" onClick={login}>Sign In</button>
            </div>
            
            <div className="container2 signup">
                <p>Create an account? <a id="signupbtn" onClick={handleSignUpClick} href="#">Sign up</a>.</p>
            </div>
        </div>
    {/* )
} */}
        
    <div className={`home ${opensignin ? 'opacity' : ''} ${opensignup ? 'opacity' : ''}`}>
        <div className="TwoThirdpart">
            <div className="homeleft">
                <span className="homeText">Your Pet,<br/>Our Priority!</span>
                <div className="buttoncontainer">
                    <span className="span1"><Link to={"/shop"}>SHOP NOW</Link></span>
                   <span className="span2"><Link to={'/blog'}>WRITE A BLOG</Link></span>
                   </div>
                
            </div>
            <div className="homeright">
                <img className="dryerimg" src="https://petmania.vamtam.com/wp-content/uploads/2022/06/illustration-1.svg"/>
                <img className="catimg" src="https://images-ext-1.discordapp.net/external/M1vv_PE7Qf0CyL7TaIgWAvfOV9tLLT1UzLFKgO5tP-M/https/petmania.vamtam.com/wp-content/uploads/2022/06/iStock-1143440918.png" width="250px"/>
                <img className="combimg" src="https://petmania.vamtam.com/wp-content/uploads/2022/06/illustration-2.svg" alt="homeimg"/>
                <img className="dogimg" src="https://images-ext-2.discordapp.net/external/UWZYPkWJ9lP5JInhgCFOGE7KbR6XPf1bgV67FAbYkro/https/petmania.vamtam.com/wp-content/uploads/2022/06/iStock-157527277.png?width=453&height=586"/>
            </div>
        </div>
        <div className="OneThirdpart">
            <div className="hero">
                <div className="row">
                    <div className="col">
                        <div className="counter-box">
                            <StoreIcon/>
                            <div className="innerCounter"><h2 className="counter"><CountUp end={10} duration={4}/></h2><p>+</p></div>
                            <h4>STORES</h4>
                        </div>
                    </div>
                    <div className="col">
                        <div className="counter-box">
                            <GroupIcon/>
                            <div className="innerCounter"><h2 className="counter"><CountUp end={101} duration={3}/></h2><p>+</p></div>
                            <h4>HAPPY CLIENTS</h4>
                        </div>
                    </div>
                    <div className="col">
                        <div className="counter-box">
                            <PetsIcon/>
                            <div className="innerCounter"><h2 className="counter"><CountUp end={300} duration={4}/></h2><p>+</p></div>
                            <h4>PETS ADOPTED</h4>
                        </div>
                    </div>
                    <div className="col">
                        <div className="counter-box">
                            <VolunteerActivismIcon/>
                            <div className="innerCounter"><h2 className="counter">20</h2></div>
                            <h4>OUR TEAM</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="heading">OUR PRODUCTS</div>
        <div className="container">
            <div className="card">
                <img src={require('../images/pet.jpg')} alt="pets"/>
                <div className="intro">
                    <h1>PET GROOMING</h1>
                    <h3>Give your pet a new look</h3>
                    <button><Link to={'/groomingproducts'}>SHOP NOW</Link></button>
                </div>
            </div>
            <div className="card">
                <img src={require('../images/food.jpg')} alt="food"/>
                <div className="intro">
                    <h1>ORGANIC FOOD</h1>
                    <h3>Healthy & Cheap</h3>
                    <button><Link to={'/foodproducts'}>SHOP NOW</Link></button>
                </div>
            </div>
            <div className="card">
                <img src={require('../images/toys.jpg')} alt="toys"/>
                <div className="intro">
                    <h1>ACCESSORIES</h1>
                    <h3>Fun & Exciting</h3>
                    <button><Link to={'/accessories'}>SHOP NOW</Link></button>
                </div>
            </div>
        </div>
    </div>

    
    
    <div className="blog-heading">
        <h1>BLOGS</h1>
    </div>
    <section className="home-blogs-section">
        {
            posts.length > 0 && posts.map(post => ( 
                <BlogPost {...post}/>
            ))
         }  </section>

    <h1 className="adopt">ADOPTION</h1>
    <div className="adoption">
        <div className="adoptionContent">
            <div className="adoptleft">
                <div className="carousel">
                    <div className="slide">
                        <img src={currentImage} height="400px" width="400px" />
                    </div>
                </div>
            </div>
            <div className="adoptright">
                <h3>Our promise to you...</h3>
                <h1>Happy pets, <br/> Happy humans</h1>
                <p>Get the latest on adoption processes, learn how local shelters and rescue groups are adapting and find out what you can do   to help dogs and cats in need right now. <br/>
                At Pawsitively Pets, we’re all real pet owners and lovers, so we experience it all, the funny moments, the adorable moments,the weird moments, the only-I-will-find-this-amusing moments.</p><br/><br/>
                <button><Link to={'/adoption'}>Learn More</Link></button>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home
