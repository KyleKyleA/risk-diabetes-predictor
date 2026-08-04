// Author: Kyle Angeles
// File-Name: ContactForm.jsx
// Description: This component handles contact form for users to inquire about any issues or questions they have about the
// the application


// REGION COMPONENTS
import {useState} from "react";
import validator from "validator";
import emailjs from "@emailjs/browser";

import GitHubIcon from "../images/github.png";
import InstagramIcon from "../images/instagram.png";
import LinkedinIcon from "../images/linkedin.png";

// Social icons 

const email = [

    {
        title: "Email",
        description: " You can reach us at out email address for any inquiries or questions you may have about the application. We will respond to your email as soon as possible:",
        email: "kyleangeles2006@gmail.com"
    }
]

// REGION FUNCTION
function ContactForm({onSuccess}) { 

    const [formData, setFormData] = useState({

        name: "",
        title: "",
        email: "",
        message: ""
    })

   
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState("idle");
    const [message, setStatusMessage] = useState("");
   
    const validateForm = () => {
        const newErrors = {};

        // Validate name
        const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
        
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = "Name can only contain letters and spaces";
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 or more characters long";
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validator.isEmail(formData.email)) {
            newErrors.email = "Invalid email format";
        } else if (formData.email.length < 5) {
            newErrors.email = "Email must be at least 5 or more characters long";
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (!formData.message.trim() || formData.message.length < 10) {
            newErrors.message = ("Message must be at least 10 or more characters long");
        }

        


        // if empty no errors, if otherwise notify user with the errors
        return newErrors;

    };

    // Submission Validation
     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

     // EmailJS Integration
    const sendEmail = async (e) => { 
        e.preventDefault();

        emailjs
            .sendForm(
            'service_bu4nvsq', // SERVICE ID
            'template_zv6oh4i', // TEMPLATE ID
            e.target, // FORM ELEMENT
            'V9NUCftt00Ip-8UW_' // PUBLIC KEY

        )
            .then((result ) => {
                console.log(result.text);
                setStatus("Success");
                setStatusMessage(" Your message has been sent successfully! will get back to you as soon as possible.");
                e.target.reset();
                setFormData({name: "", email: "", message: ""});
                if (onSuccess) {
                    onSuccess();
                }
            }, (error) => {
                console.log(error.text);
                setStatus("Error");
                setStatusMessage("An error occurred while sending your message. Please try again later.");

                
            }
        );
    };

    // Form submission
     // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStatus("submitting");
        setStatusMessage("Please wait while we process your request.");

        sendEmail(e);
    };



    // Styling and UI for the contact form
    return (
        <>
        
        
        {/* Contact Form */}
        <div className="contact-form-container">
            <form className="flex flex-col items-center text-sm on" onSubmit={handleSubmit}>
            <p className="text-lg text-black-600 font-medium pb-2 pt-24">Contact Us</p>
            
            <div className="">
                <div className="w-full">
                    <label className="text-black/100 gap-2" >Your Name:</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required
                    />
                   
                </div>
                <div className="w-full">
                    <label className="text-black/100" htmlFor="email">Your Email</label>
                    <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required
                    />
                    
                </div>
                <div className="mt-6 w-[350px] md:w-[700px]">
                    <label className="text-black/100" htmlFor="title">Subject</label>
                    <textarea id="title" name="title"className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300" placeHolder="Enter subject of your message" value={formData.title} onChange={handleChange} required 
                    />
                   
                </div>
                <div className="w-mt-6 w-[350px] md:w-[700px]">
                    <label className="text-black/100" htmlFor="message">Message</label>
                    <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300" id="message" name="message" placeholder="Write your message here..." value={formData.message} onChange={handleChange} required 
                    />
                   
                </div>
            </div>

            <button type="submit" disabled={status === 'submitting'} className="mt-5 bg-violet-500 text-black h-12 w-32 px-4 rounded active:scale-95 transition" >Send Message
            </button>

           

            <br />
            </form>


        {/* Email for easy contact if they don't prefer filling out the form */}

        {/* Social Links */}
        <div className="contact-social mt-12 text-center">
            <p className="text-m text-black-500 font-medium pt-8">Or reach out to me on social media</p>
            {/* LinkedIn */}
            <div className="flex items-center justify-center gap-2 mt-4">
                <a href="https://www.linkedin.com/in/kyle-angeles-b07ba7315/" target="_blank" rel="noopener noreferrer" className="">
                    <img src={LinkedinIcon} alt="LinkedIn" className="w-15 h-20" >
                    
                    </img>
                </a>
            </div>
            {/* Github */}
            <div className="flex items-center justify-center gap 2 mt-4">
                <a href="https://github.com/KyleKyleA" target="_blank" rel="noopener noreferrer" className="">
                    <img src={GitHubIcon} alt="github" className="w-15 h-10">
                    
                    </img>
                </a>
            </div>
            {/* Instagram */}
            <div className="flex items-center justify-center gap 2 mt-4">
                <a href="https://www.instagram.com/kai__topluto/" target="_blank" rel="noopener noreferrer" className="">
                    <img src={InstagramIcon} alt="instagram" className="w-15 h-10">
                    
                    </img>
                </a>
            </div>

        </div>
        
        
        </div>
        </>
    )


};




export default ContactForm;