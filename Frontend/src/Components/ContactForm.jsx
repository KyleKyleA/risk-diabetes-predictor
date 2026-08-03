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
    // Submission Validation
    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ""}));
    }
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

    // EmailJS Integration
    const sendEmail = async () => { 
        e.preventDefault();

        email.js.sendForm(
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
            }, (error) => {
                console.log(error.text);
                setStatus("Error");
                setStatus("An error occurred while sending your message. Please try again later.");
            });




    };

    // Styling and UI for the contact form
    return (
        <>
        
        {/* Contact Form */}

        {/* Email for easy contact if they don't prefer filling out the form */}

        {/* Social Links */}
        
        </>

    )


}


export default ContactForm;