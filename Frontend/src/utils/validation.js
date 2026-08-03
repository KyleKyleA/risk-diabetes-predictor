// REGION  LIBRARY
import validator from 'validator';
// END REGION LIBRARY
// REGION HELPERS
export const validateRequired = (field, value) => {
    if (!value.trim()) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;

    }
        return '';
}

export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
            return 'email is required';
        }
    if (!validator.isEmail(email)) {
        return 'please enter a valid email address';
    }
        return null; // if everything seems right in the form process 
            // if not return a error
}


            
export const getErrorMessages = (errors) => {
    const messages = Object.entries(errors)
    .filter(([, msg]) => msg)
    .map(([field, msg]) =>`${field}: ${msg}`)
    return messages.join('\n');
}
// END REGION HELPERS
