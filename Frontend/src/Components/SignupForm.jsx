// Author: Kyle Angeles
// File-name: Signup.jsx
// Description: This file contains the signup component that will ask the user or basic information like their email name date of birth and password. Once they 
// submit the form will create a new user will would lead them to answer a bit of informational questions based off their health style.

// REGION IMPORTS
import { useState } from 'react';
import validator from 'validator';
import { supabase } from '../utils/supabaseClient'


function SignUpForm({ onSuccess }) {

    const [formData, setFormData] = useState({name: "", email: "", phone: "", dob: "", password: ""});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("")

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
        setSubmitError("")

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const newErrors = validateSignUp();

        // validation 
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            })

            if (authError) {
                setSubmitError(authError.message);
                return;
            }

            const {data, error} = await supabase
            .from('users')
            .insert([
                {
                    user_id: authData.user.id,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone, 
                    dob: formData.dob,
                }
            ])
            .select();

        if (error) {
            if (error.code === '23505') {
                setSubmitError("An account with this email already has been registered");
            } else {
                setSubmitError(error.message);
            }
            return;
        }

        setIsSubmitted(true);
        
        setTimeout(() => {
            if(onSuccess) onSuccess(data ? data[0] : formData);
        }, 2000);

        } catch (err) {
            setSubmitError("Unexpected error occurred while signing up.");
        }
    };

        if (isSubmitted) {

            return <div className='flex justify-center items-center min-h-[300px] text-lg font-semibold text-gray-800'>Redirecting to questionnaire page </div>
        }




    return (

        <>

        {/* Signup form */}
        <div className="signup-form-container max-w-md mx-auto my-8 p-8 rounded-2xl bg-gray-50 shadow-2xl shadow-black/50">
        <h2 className="text-2xl font-bold mb-6 text-gray-500 text-center">Signup </h2>

            {submitError && (
                <div className="mb-4 text-xs font-semibold text-red-600 bg-red-100 p-2.5 rounded-lg border border-red-200 text-center">
                    {submitError}
                </div>
            )}
            <form className="flex flex-col items-center text-sm" onSubmit={handleSubmit}>

            <div className="">
                <div className="w-full">
                    <label className="text-black block mb-1">Name</label>
                    <input className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400" id="name" name="name" value={formData.name} onChange={handleChange} placeholder='enter name' required></input>
                    {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
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
                    <label className="text-black block mb-1">Phone </label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder='enter phone number' required></input>
                </div>
                <br></br>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
                <div className="w-full">
                    <label className="text-black block mb-1">Date of Birth </label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="date" placeholder="Please select a date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required></input>
                </div>
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                <br></br>
                <div className="w-full">
                    <label className="text-black block mb-1">Password </label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder='enter password' required></input>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <br></br>


            <button type="submit" className="text-black font-semibold bg-gradient-to-r from-blue-400 to-gray-800 hover:from-blue-500 hover:to-gray-900 transition h-12 w-32 rounded-md active:scale-95">Signup</button>
            </form>
        </div>
        
        
        </>
    )

}

export default SignUpForm;