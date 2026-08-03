// Author: Kyle Angeles
// File-Name: Contact.jsx
// Description: This page is for the user to contact the developer of the application if they have any questions or issues with the application.

// REGION COMPONENTS
import ContactForm from "../Components/ContactForm.jsx";
import {useNavigate} from "react-router-dom";



function Contact() {
    const navigate = useNavigate();

    const handleSubmit = () => {

        navigate("/dashboard");
    };


    return (
        <>
        
            <ContactForm onSuccess={handleSubmit} />

        </>
    );
}


export default Contact;