// Author: Kyle Angeles
// File-name: Signup.jsx
// Description: This file contains the signup component that will ask the user or basic information like their email name date of birth and password. Once they 
// submit the form will create a new user will would lead them to answer a bit of informational questions based off their health style.

// REGION IMPORTS
import { useState } from 'react';
import validator from 'validator';


function SignUpForm({ onSuccess }) {

    const [formData, setFormData] = useState({name: "", email: "", phone: "", dob: "", password: ""});

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validateSignUp = () => {
        const newErrors = {};


        // Validate name
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";

        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = "Name can only contain letters and spaces";
        } else if (formData.name.length < 5) {
            newErrors.name = "Name must be at least 5 or more characters long";
        }

        // validate email 
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (formData.email.length < 10) {
            newErrors.email = "Email must contain 10 or more characters along with the associate email (e.g google, hotmail outlook etc.)";

        } else if(!validator.isEmail(formData.email)) {
            newErrors.email = "Invalid Email format";
        }

        // validate phone
        const phoneRegex = /^[0-9]+$/;

        if(!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (formData.phone.length < 10) {
            newErrors.phone = "Phone number must be at least 10 characters long";
        } else if (!validator.isMobilePhone(formData.phone)) {
            newErrors.phone = "Phone number is invalid format";
        } else if(!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number can only contain numerical values";
        }

        // validate password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at length minium 8 characters and above";
        }


        // Validate date of birth
        if (!formData.dob) {
            newErrors.dob = "Date of birth is required";
        }

        return newErrors
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));

        if(errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: ""}));
        }

    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const newErrors = validateSignUp();

        // validation 
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitted(true);
        
        setTimeout(() => {
            if(onSuccess) onSuccess(formData);
        }, 2000);

        if (isSubmitted) {

            return <div>Redirecting to questionnaire page </div>
        }

    
    }


    return (

        <>

        {/* Signup form */}
        <div className="signup-form-container max-w-md mx-auto my-8 p-8 bg-white border border-gray-300 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-grey-500 text-center">Signup </h2>
            <form className="flex flex-col items-center text-sm on" onSubmit={handleSubmit}>

            <div className="">
                <div className="w-full">
                    <label className="text-black block mb-1">Name</label>
                    <input className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400" id="name" name="name" value={formData.name} onChange={handleChange} placeholder='enter name' required></input>
                </div>
                <br></br>
                <div className="w-full">
                    <label className="text-black block mb-1">Email</label>
                    <input className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='enter email'required></input>
                </div>
                <br></br>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="">
                <div className="w-full">
                    <label className="text-black block mb-1">Phone: </label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder='enter phone number' required></input>
                </div>
                <br></br>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
                <div className="w-full">
                    <label className="text-black block mb-1">Date of Birth: </label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="date" placeholder="Please select a date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required></input>
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                <br></br>
                <div className="w-full">
                    <label className="text-black block mb-1">Password </label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='enter password' required></input>
                </div>
                <br></br>


            <button type="submit" className="px-6 py-2 rounded-md text-black font-semibold bg-gradient-to-r from-blue-400 to purple-500 hover:from-blue-500 hover:to-purple-600 transition">SignUp</button>
            </form>
        </div>
        
        
        </>
    )

}

export default SignUpForm;