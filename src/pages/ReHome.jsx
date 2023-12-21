import { useState } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/ReHome.css'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'

const ReHome = () => {

    const navigate = useNavigate();

    const [petData, setpetData] = useState({
        petName: '',
        petType: '',
        age: '',
        breed: '',
        isRescued: '',
        isVaccinated: '',
        gender: '',
        img: null,
        aboutPet: '',
        reasonForAdoption: '',
        contactName: '',
        email: '',
        location: '',
    });

    const [uploadedFile, setUploadedFile] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpetData((prevData) => ({
            ...prevData,
            [name]: value,
            contactName: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
        }));
    };

    const handleDrop = (acceptedFiles) => {
        // Handle the dropped files
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setpetData((prevDetails) => ({
            ...prevDetails,
            img: file,
        }));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        noClick: true
    });

    async function handleSubmit(e) {
        const data = new FormData();
        console.log(uploadedFile)
        data.set('name', petData.petName);
        data.set('type', petData.petType);
        data.set('age', petData.age);
        data.set('breed', petData.breed);
        data.set('isRescued', petData.isRescued);
        data.set('isVaccinated', petData.isVaccinated);
        data.set('gender', petData.gender);
        data.set('file', uploadedFile);
        data.set('aboutPet', petData.aboutPet);
        data.set('reasonForAdoption', petData.reasonForAdoption);
        data.set('contactName', petData.contactName);
        data.set('email', petData.email);
        data.set('location', petData.location);

        console.log('Form Data Submitted:', data.get('contactname'));

        e.preventDefault();

        if (uploadedFile === '') {
            alert("Add image!")
            return;
        }

        const response = await fetch('https://pawsitivelypets-api.onrender.com/addPet', {
            method: 'POST',
            headers: { 'token': localStorage.getItem("token") },
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            alert("Details recorded!")
            navigate("/petAdoption");
        } else {
            alert("Fill out all fields!")
        }

        setpetData({
            petName: '',
            petType: '',
            age: '',
            breed: '',
            isRescued: '',
            isVaccinated: '',
            gender: '',
            img: null,
            aboutPet: '',
            reasonForAdoption: '',
            contactName: '',
            email: '',
            location: '',
        });
    };


    return (
        <div>
            <Navbar />
            <div className="rehomeheading">
                <h1>Rehome a Pet</h1>
                <span>Where Tails Become Tales of Happiness.</span>
            </div>
            <div className="petDetails"><span>Pet Details</span></div>
            <form onSubmit={handleSubmit} className="rehomeForm">
                <label>
                    <span>Pet Name:</span>
                    <input required type="text" name="petName" value={petData.petName} onChange={handleInputChange} placeholder='What do we call your pet?*' />
                </label>
                {/* Pet Type */}
                <label>
                    <span>Pet Type</span>
                    <div className='rehomeradioinput'>
                        <label>
                            <input
                                required
                                type="radio"
                                name="petType"
                                value="Dog"
                                checked={petData.petType === 'Dog'}
                                onChange={handleInputChange}
                            />
                            <div className='radioimg'>
                                <img id="basket" src={require("../images/basket.png")} ></img>
                                <img id="pet" src={require("../images/havanese-bichon.png")}></img>
                            </div>
                        </label>
                        <label>
                            <input
                                required
                                type="radio"
                                name="petType"
                                value="Cat"
                                checked={petData.petType === 'Cat'}
                                onChange={handleInputChange}
                            />
                            <div className='radioimg'>
                                <img id="basket" src={require("../images/basket.png")} ></img>
                                <img id="pet" src={require("../images/happy.png")}></img>
                            </div>
                        </label>
                    </div>
                </label>

                {/* Gender */}
                <label>
                    <span>What is the gender of your pet?</span>
                    <div className='rehomeradioinput'>
                        <label className='radiobtn-container'> Male
                            <input
                                required
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={petData.gender === 'Male'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                        </label>
                        <label className='radiobtn-container'> Female
                            <input
                                required
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={petData.gender === 'Female'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                        </label>
                    </div>
                </label>

                <label>
                    <span>Pet Breed:</span>
                    <input required type="text" name="breed" value={petData.breed} onChange={handleInputChange} placeholder='Enter pet breed*' />
                </label>

                {/* Pet Age */}
                <label>
                    <span>Age of your pet?</span>
                    <div className='rehomeradioinput'>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="age"
                                value="Baby"
                                checked={petData.age === 'Baby'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            Baby (upto 6 months)
                        </label>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="age"
                                value="Adolescence"
                                checked={petData.age === 'Adolescence'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            Adolescence (6-8 months)
                        </label>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="age"
                                value="Adult"
                                checked={petData.age === 'Adult'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            Adulthood (1.5-3 years)
                        </label>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="age"
                                value="Senior"
                                checked={petData.age === 'Senior'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            Senior (3 or more years)
                        </label>
                    </div>
                </label>

                {/* Rescue Status Radio Buttons */}
                <label>
                    <span>Is the pet rescued?</span>
                    <div className='rehomeradioinput'>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="isRescued"
                                value="Yes"
                                checked={petData.isRescued === 'Yes'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            Yes, Pet is rescued.
                        </label>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="isRescued"
                                value="No"
                                checked={petData.isRescued === 'No'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            No, Pet is not rescued.
                        </label>
                    </div>
                </label>

                {/* Vaccination Status */}
                <label>
                    <span>Is the pet vaccinated?</span>
                    <div className='rehomeradioinput'>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="isVaccinated"
                                value="Yes"
                                checked={petData.isVaccinated === 'Yes'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            Yes, Pet is vaccinated.
                        </label>
                        <label className='radiobtn-container'>
                            <input
                                required
                                type="radio"
                                name="isVaccinated"
                                value="No"
                                checked={petData.isVaccinated === 'No'}
                                onChange={handleInputChange}
                            />
                            <span className='checkmark'></span>
                            No, Pet is not vaccinated.
                        </label>
                    </div>
                </label>

                <label>
                    <span>Upload a picture of your pet:</span>
                    <div {...getRootProps()} className='rehomeFileUpload'>
                        <input {...getInputProps()} />
                        {uploadedFile ? (
                            <div>
                                <p>File uploaded successfully!</p>
                                <img
                                    src={URL.createObjectURL(uploadedFile)}
                                    alt="Uploaded"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                                <p>File name: {uploadedFile.name}</p>
                            </div>
                        ) : isDragActive ? (
                            <p>Drop the image here...</p>
                        ) : (
                            <>
                                <p>Drag & drop to upload,<br /> or <span>browse</span></p>
                            </>
                        )}
                    </div>
                </label>

                <label>
                    <span>Why do you want to donate the Pet?</span>
                    <textarea required type="text" name="reasonForAdoption" value={petData.reasonForAdoption} onChange={handleInputChange} placeholder='Please mention a reason for adoption*' />
                </label>
                <label>
                    <span>Briefly tell about your pet:</span>
                    <textarea required type="text" name="aboutPet" value={petData.aboutPet} onChange={handleInputChange} placeholder='Tell us about your pet*' />
                </label>
                <label>
                    <span>Enter your location:</span>
                    <input required type="text" name="location" value={petData.location} onChange={handleInputChange} placeholder='City, State, Country*' />
                </label>
                <div className='rehomebutton'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div >
    )
}

export default ReHome
