import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Adoption.css'
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
import {useState, useEffect} from 'react';
import $ from 'jquery';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

const Adoption = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_1a30tig', 'template_9zmbmey', form.current, '3l4D56Hv6nafOi3BZ')
          .then((result) => {
              console.log(result.text);
              alert('Form submitted successfully!')
          }, (error) => {
              console.log(error.text);
              alert('An error has occured, Try again!')
          });
          e.target.reset();
      };

    const [openprofile1, setOpenProfile1] = useState(false);
    const [openprofile2, setOpenProfile2] = useState(false);
    const [openprofile3, setOpenProfile3] = useState(false);
    const [openprofile4, setOpenProfile4] = useState(false);
    const [plusShow1, setPlusShow1] = useState(true);
    const [plusShow2, setPlusShow2] = useState(true);
    const [plusShow3, setPlusShow3] = useState(true);
    const [plusShow4, setPlusShow4] = useState(true);

    function handleClick1() {
        setOpenProfile1(current => !current); 
        setPlusShow1(current => !current); 
    }

    const handleClick2 = event => {
        setOpenProfile2(current => !current); 
        setPlusShow2(current => !current); 
    };

    const handleClick3 = event => {
        setOpenProfile3(current => !current); 
        setPlusShow3(current => !current); 
    };

    const handleClick4 = event => {
        setOpenProfile4(current => !current); 
        setPlusShow4(current => !current); 
    };
    
    return (
    <div>
        <Navbar/>
        <div className="journey">
        <h1>Your Pet Adoption Journey With Pawsitively Pets</h1>
        <div className="journeycontent">
            <div className="journeyright">
                <img src={require('../images/adoptme.jpg')}/>
            </div>
            <div className="journeyleft">
                <div className="adoptionpoints">
                    <img src={require('../images/form.png')}/>
                    <div className="pointscontent">
                        <span>Fill the form</span>
                        <p>Adopt a dog or cat or any pet who's right for you. Simply enter your details in the form.</p>
                    </div> 
                </div>
                <div className="adoptionpoints">
                    <img src={require("../images/24-hours.png")}/>
                    <div className="pointscontent">
                        <span>Connect</span>
                        <p>Once you find a pet, we will send you a mail to get contact info for the pet parent or rescue. Contact them to learn more about how to meet and adopt the pet.</p>
                    </div> 
                </div>
                <div className="adoptionpoints">
                    <img src={require("../images/animal-care.png")}/>
                    <div className="pointscontent">
                        <span>AdoptLove</span>
                        <p>The rescue or pet parents will walk you through their adoption process. Prepare your home for the arrival of your fur baby to help them adjust to their new family.</p>
                    </div> 
                </div>
                <div className="adoptionpoints">
                    <img src={require("../images/veterinary.png")}/>
                    <div className="pointscontent">
                        <span>Free vet Consultation</span>
                        <p>Pawsitively Pets will help your pet to settle down in its new home, once you complete the Adoption journey reach out to us for free vet consultation.</p>
                    </div> 
                </div>
            </div>
        </div>
    </div>



<div className="MainForm">
    <div className="formContainer">
        <div className="formTitle">ADOPTION</div>
        <form ref={form} onSubmit={sendEmail} id="contact-form">
            <div className="user-details">
                <div className="input-box">
                    <span className="details">Name</span>
                    <input type="text" name="user_name" placeholder="Enter your name" required/>
                </div>
                <div className="input-box">
                    <span className="details">Email</span>
                    <input type="email" name="user_email" placeholder="Enter your Email" required/>
                </div>
                <div className="input-box">
                    <span className="details">Contact no.</span>
                    <input type="text" name="user_contact" placeholder="Enter your contact no." required/>
                </div>
                <div className="input-box">
                    <span className="details">Pet Type</span>
                    <input type="text" name="user_pet" placeholder="Enter the pet type" required/>
                </div>
                <div className="input-box">
                    <span className="details">City</span>
                    <input type="text" name="user_city" placeholder="Enter your city" required/>
                </div>
                <div className="input-box">
                    <span className="details">State</span>
                    <input type="text" name="user_state" placeholder="Enter your state" required/>
                </div>
                <div className="input-box">
                    <span className="details">Message</span>
                    <textarea name="message" placeholder="Enter additional information..."></textarea>
                </div>
            </div>
            <div className="formbutton">
                <input type="submit" value="Submit"/>
            </div>
        </form>
    </div>
</div>

    <div className="questionsContainer">
        <h1>Frequently Asked Questions</h1>
        <div className="questionsContent">
            <div className="questions">
                <span>Why Should You Adopt a pet?
                    <div className="plus" onClick={handleClick1}>
                    {
                        plusShow1 && (
                        <span className="add material-symbols-outlined">
                            <AddIcon/>
                            </span>
                        )
                    }
                        {
                            openprofile1 && (
                                <span id="removebtn" className="remove material-symbols-outlined">
                                    <MinimizeIcon/>
                                </span>
                            )
                        } 
                    </div>
                </span>
                {
                    openprofile1 && (
                        <div className="answer">Did you know that over 2000 people per hour in India run a search right here looking to adopt a pet? Pet adoption is becoming the preferred way to find a new pet. Adoption will always be more convenient than buying a puppy for sale from a pet shop or finding a kitten for sale from a litter. Pet adoption brings less stress and more savings! So what are you waiting for? Go find that perfect pet for home!</div> 
                    )
                }   
            </div>
            <div className="questions">
                <span>What is the fee to adopt a pet?
                    <div className="plus" onClick={handleClick2}>
                        {
                            plusShow2 && (
                                <span className="add material-symbols-outlined">
                                <AddIcon/>
                                </span> 
                            )
                        }
                        {
                            openprofile2 && (
                                <span id="removebtn" className="remove material-symbols-outlined">
                                <MinimizeIcon/>
                                    </span>
                            )
                        }
                     </div>
                </span>
                {
                    openprofile2 && (
                        <div className="answer">No, there is no fee for pet adoption on ThePetnest. However, if you adopt from a different city pet owner/rescuer can ask for travel charges. In case if you find someone asking for charges you can write us at support@thepetnest.com.</div>
                    )
                }
            </div>
            <div className="questions">
                <span>How old do I need to be to adopt a pet?
                    <div className="plus" onClick={handleClick3}>
                        {
                            plusShow3 && (
                                <span className="add material-symbols-outlined">
                                <AddIcon/>
                                </span> 
                            )
                        }
                        {
                            openprofile3 && (
                                <span id="removebtn" className="remove material-symbols-outlined">
                                <MinimizeIcon/>
                                    </span>
                            )
                        }
                     </div>
                </span>
                {
                    openprofile3 && (
                        <div className="answer">You need to be at least 18+ years old to adopt.</div>
                    )
                }
            </div>
            <div className="questions">
                <span>Can you return an adopted pet?
                <div className="plus" onClick={handleClick4}>
                    {
                        plusShow4 && (
                        <span className="add material-symbols-outlined">
                            <AddIcon/>
                            </span>
                        )
                    }
                        {
                            openprofile4 && (
                                <span id="removebtn" className="remove material-symbols-outlined">
                                    <MinimizeIcon/>
                                </span>
                            )
                        } 
                    </div>
                </span>
                {
                    openprofile4 && (
                        <div className="answer">We understand it can be hard to get an adjusted pet in the new home and vice versa, as long as your reason for returning is reasonable, you'll be welcome to put it up for adoption again.</div>
                    )
                }
            </div>   
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Adoption
