import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import emailjs from '@emailjs/browser';
import '../styles/PetDetails.css'

function PetDetails() {
    const [petInfo, setPetInfo] = useState(null);
    const { id } = useParams();

    const [fromname, setfromname] = useState(null);
    const [fromEmail, setfromEmail] = useState(null);
    const [toEmail, settoEmail] = useState("");
    const [message, setmessage] = useState("");
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');
    const [toname, setToname] = useState('');
    const [petname, setPetname] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    const sendEmail = (e) => {
        e.preventDefault();

        var templateParams = {
            from_name: fromname,
            from_email: fromEmail,
            to_email: toEmail,
            to_name: toname,
            city: city,
            message: message,
            state: state,
            contact: contact,
            pet_name: petname,
        };

        emailjs.send('service_1a30tig', 'template_fp7989f', templateParams, '3l4D56Hv6nafOi3BZ')
            .then((result) => {
                console.log(result.text);
                alert('Form submitted successfully!')
            }, (error) => {
                console.log(error.text);
                alert('An error has occured, Try again!')
            });
        e.target.reset();
    };

    useEffect(() => {
        fetch(`https://pawsitivelypets-api.onrender.com/pets/${id}`, {
            responseType: 'arraybuffer'
        })
            .then(response => {
                response.json().then(petInfo => {
                    console.log(petInfo);
                    settoEmail(petInfo.email);
                    setfromEmail(localStorage.getItem('email'))
                    setToname(petInfo.contactName);
                    setPetname(petInfo.name)
                    setPetInfo(petInfo);
                    if (petInfo.img) {
                        const buffer = new Uint8Array(petInfo.img.data);
                        const CHUNK_SIZE = 8192; // Process 8KB chunks

                        let binary = '';
                        const len = buffer.byteLength;
                        let start = 0;

                        while (start < len) {
                            const end = Math.min(start + CHUNK_SIZE, len);
                            const chunk = new Uint8Array(buffer.slice(start, end));
                            binary += String.fromCharCode.apply(null, chunk);
                            start = end;
                        }

                        const base64Image = btoa(binary);
                        setImageSrc(`data:image/png;base64,${base64Image}`);
                    }
                })
            })
    }, []);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);

        return formattedDate;
    };

    if (!petInfo) return '';

    return (
        <>
            <Navbar />
            <div className="petdesc-container">

                <div className="petdesc-right">
                    <div className='postdate'>Posted on {formatDate(petInfo.createdAt)}</div>
                    <h1>Meet <span id='petName'>{petInfo.name}</span> - Your Future Furry Friend</h1>
                    <h3 id='factsheading'>Facts about {petInfo.name}:</h3>
                    <div className='factscontainer'>
                        <p><span>🐾 Breed: </span> {petInfo.breed}</p>
                        <p><span>🎂 Age:</span> {petInfo.age}</p>
                        <p><span>🚺 Gender:</span> {petInfo.gender}</p>
                        <p><span>💉 vaccinated:</span> {petInfo.isVaccinated}</p>
                        <p><span>🔍 Pet ID: </span> {petInfo._id.slice(0, 7)}</p>
                    </div>

                </div>
                <div className="petdesc-left">
                    <img src={imageSrc} />
                </div>
            </div>
            <div className="additionalinfo-container">
                <h3>🤔 Reason for Adoption: </h3>
                <p>{petInfo.reasonForAdoption}</p>
                <h3>🐶 About {petInfo.name}:</h3>
                <p>{petInfo.aboutPet}</p>
            </div>
            <div className="contactinfo-container">
                <h3>Owner's Contact Info:</h3>
                <div>
                    <p><span>👤Owner:</span> {petInfo.contactName}</p>
                    <p><span>📍Location:</span> {petInfo.location}</p>
                    <p><span>📧 Email: </span>{petInfo.email}</p>
                </div>

            </div>

            <div className="MainForm">
                <div className="formContainer">
                    <div className="formTitle">Fill out this form to contact with the owner & adopt {petInfo.name}</div>
                    <form onSubmit={sendEmail} id="contact-form">
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" name="user_name" placeholder="Enter your name" required onChange={(e) => { setfromname(e.target.value) }} />
                            </div>
                            <div className="input-box">
                                <span className="details">Contact no.</span>
                                <input type="text" name="user_contact" placeholder="Enter your contact no." onChange={(e) => { setContact(e.target.value) }} required />
                            </div>
                            <div className="input-box">
                                <span className="details">City</span>
                                <input type="text" name="user_city" placeholder="Enter your city" onChange={(e) => { setCity(e.target.value) }} required />
                            </div>
                            <div className="input-box">
                                <span className="details">State</span>
                                <input type="text" name="user_state" placeholder="Enter your state" onChange={(e) => { setState(e.target.value) }} required />
                            </div>
                            <div className="textarea-box">
                                <span className="details">Please Mention why do you want to adopt</span>
                                <textarea name="message" placeholder="Brief description about yourself..." onChange={(e) => { setmessage(e.target.value) }} required></textarea>
                            </div>
                        </div>
                        <div className="formbutton">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PetDetails