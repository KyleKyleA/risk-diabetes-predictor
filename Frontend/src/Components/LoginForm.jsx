// Author: Kyle Angeles
// File-Name: Login.jsx
// Description: This component will handle the login components of the app.
import {useState} from 'react';


function LoginForm({onSuccess}) {

    const [formData, setFormData] = useState({email: "", password: ""});
    const [isLogged, setIsLogged] = useState(false);
    const [errors, setErrors] = useState({});

     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateLogin = () => {
        const newErrors = {};
        const {email, password} = formData

        // validate email
        if (!email) {
            newErrors.email = "Email is required";

        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    
    };


    const handleChange = (e) => {
        const {name, value } = e.target;

        setFormData((prev) => ({
            ...prev, [name]: value
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev, 
                [name]: "",
                general: ""
            }));
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateLogin()) return;

        setIsLogged(true);


    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)

        });

        const data = await response.json();

        if(!response.ok) {
            if(data.message === "User not found") {
                setErrors({ email: "No account found with this email address."});
            } else {
                setErrors({general: data.message || "Login failed."});
            }
        } else {
            console.log("Login successfully", data);
            if (onSuccess) onSuccess(data);
        }
    } catch (err) {
        setErrors("Network error. Please try again.");
    } finally {
        setIsLogged(false);
    }
};

    return (

        <>
        <div className="login-form-container max-w-md mx-auto my-8 p-8 rounded-2xl bg-grey border border-[var(--border)] shadow-2xl shadow-black/50">
            <h2 className="font-bold text-center">Login</h2>
            <form className="flex flex-col items-center text-sm on" onSubmit={handleSubmit}>
    
                <div className="w-full">
                    <label className="text-black block mb-1">Email</label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="email" id="email"name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required></input>
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                <br></br>

                <div className="w-full">
                    <label className="text-black block mb-1">Password</label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required></input>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <br></br>

                <button type="submit" disabled={isLogged} className="px-6 py-2 rounded-md text-black font-semibold bg-gradient-to-r from blue-400 to black-500 hover:from-blue-500 hover:to-black-600 transition h-12 w-32 px-4 rounded active:scale-95 transition">{isLogged ? "Logging in..." : "Login"}</button>
            </form>
            </div>

        
        
        </>
    )
}

export default LoginForm;