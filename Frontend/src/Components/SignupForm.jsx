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
        } else if (!formData.name.length < 5) {
            newErrors.name = "Name must be at least 5 or more characters long";
        }

        // validate email 
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!formData.email.length < 10) {
            newErrors.email = "Email must contain 10 or more characters along with the associate email (e.g google, hotmail outlook etc.)";

        } else if(!validator.isEmail(formData.email)) {
            newErrors.email = "Invalid Email formate";
        }

        // validate phone
        const phoneRegex = /^[0-9]+$/;

        if(!formData.phone.trim()) {
            newErrors = "Phone number is required";
        } else if (!formData.phone.length < 15) {
            newErrors = "Phone number must be at least 15 characters long";
        } else if (!validator.isPhone(formData.phone)) {
            newErrors = "Phone number is invalid format";
        } else if(!phoneRegex.test(FormData)) {
            newErrors = "Phone number can only contain numerical values";
        }

        // validate password
        if (!formData.password.trim()) {
            newErrors = "Password is required";
        } else if (!formData.password.length < 8) {
            newErrors = "Password must be at length minium 8 characters and above";
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
        if (onSuccess) onSuccess(formData);
        };


        if (isSubmitted) {
            return <div>Redirecting to questionnaire page</div>
        }

    



    return (

        <>

        {/* Signup form */}
        <div className="signup-form-container">
            <form className="flex flex-col items-center text-sm on" onSubmit={handleSubmit}>
            <h2 className="">Sign Up</h2>

            <div className="">
                <div className="w-full">
                    <label className="">Name</label>
                    <input className="" id="name" name="name" value={formData.name} onChange={handleChange} required></input>
                </div>
                <div className="w-full">
                    <label className="">Email</label>
                    <input className="" id="email" name="email" value={formData.email} onChange={handleChange} required></input>
                </div>
            </div>
            <div className="">
                <div className="w-full">
                    <label className="">Phone</label>
                    <input className="" id="phone" name="phone" value={formData.phone} onChange={handleChange} required></input>
                </div>
            </div>
                <div className="w-full">
                    <label className="">Date of Birth</label>
                    <input className="" id="dob" name="dob" value={formData.dob} onChange={handleChange} required></input>
                </div>
                <div className="w-full">
                    <label className="">Password</label>
                    <input className="" id="password" name="password" onChange={handleChange}  required></input>
                </div>
            


            <button type="submit" className="">SignUp</button>
            </form>
        </div>
        
        
        </>
    )

}

export default SignUpForm;