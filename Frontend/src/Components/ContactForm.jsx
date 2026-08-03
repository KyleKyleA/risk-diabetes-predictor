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
    const sendEmail = async () => { 
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
                setStatus("An error occurred while sending your message. Please try again later."

                );
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
            <form className="">
            <p className="">Contact Us</p>
                <div className="">

                </div>


            </form>


        {/* Email for easy contact if they don't prefer filling out the form */}

        {/* Social Links */}
        <div className="contact-social mt-12 text-center">
            <p className="">Or reach out to me on social media</p>

        </div>
        
        
        </div>
        </>
    )


};




export default ContactForm;