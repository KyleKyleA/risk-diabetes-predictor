// Author: Kyle Angeles
// File-Name: Login.jsx
// Description: This component will handle the login components of the app.
import {useState} from 'react';


function LoginForm({onSuccess}) {

    const [formData, setFormData] = useState({username: "", password: ""});
    const [isLogged, setIsLogged] = useState(false);
    const [errors, setErrors] = useState({});

     

    const validateLogin = () => {
        const newErrors = {};
        const {username, password} = formData

        // Validate username
        if (!username) {
            newErrors.username = "Username is required";
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
        const body = new URLSearchParams({
            username: formData.username,
            password: formData.password
        })


        const response = await fetch('/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: body,

        });

        const data = await response.json();

        if(!response.ok) {
            if(data.detail === "User not found") {
                setErrors({ username: "No account found with this username."});
            } else {
                setErrors({general: data.detail || "Login failed."});
            }
        } else {
            console.log("Login successfully", data);
            if (onSuccess) onSuccess(data.access_token);
        }
    } catch (err) {
        setErrors({general: "Network error. Please try again."});
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
                    <label className="text-black block mb-1">Username</label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" required></input>
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                <br></br>

                <div className="w-full">
                    <label className="text-black block mb-1">Password</label>
                    <input className="rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all focus:shadow-soft-primary-outline focus:border-blue-400" type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required></input>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <br></br>

                <button type="submit" disabled={isLogged} className="px-6 py-2 rounded-md text-black font-semibold bg-gradient-to-r from blue-400 to black-500 hover:from-blue-500 hover:to-black-600 transition h-12 w-32 px-4 rounded active:scale-95 transition">{isLogged ? "Logging in..." : "Login"}</button>
                {errors.general && <p className="text-red-500 text-xs mt-1">{errors.general}</p>}
            </form>
            </div>

        
        
        </>
    )
}

export default LoginForm;