// Author: Kyle Angeles
// File-Name: ContactForm.jsx
// Description: This component handles contact form for users to inquire about any issues or questions they have about the
// the application


// REGION COMPONENTS
import {useState} from "react";
import validator from "validator";
import emailjs from "@emailjs/browser";

// Social icons 

const email = [

    {
        title: "Email",
        description: " You can reach us at out email address for any inquiries or questions you may have about the application. We will respond to your email as soon as possible:",
        email: "kyleangeles2006@gmail.com"
    }
]

// REGION FUNCTION
function ContactForm({onSubmit}) { 

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        message: ""
    })

    
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState("");
    const [message, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!formData.message.trim() || formData.message.length < 10) {
            newErrors.message 
        }


        // if empty no errors, if otherwise notify user with the errors
        return newErrors;





}


    // Form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validateForm);
            return
        }

        setStatus("Submitting... ");
        setStatusMessage("Please wait while we process your request.");
    }
}

export default ContactForm;