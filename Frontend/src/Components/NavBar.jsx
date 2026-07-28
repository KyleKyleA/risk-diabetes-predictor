// Author: Kyle Angeles
// Date: 2026-07-28
// File: Frontend/src/views/About.jsx
// Description: This compoenent is focused on building the navbar for the application 
// The navbar will only contain the login, signup, and about buttons. The login and signup buttons will be used to navigate to the login and signup pages respectively. The about button will be used to navigate to the about page.

// all code is used from previous projects.

import { Link } from "react-router-dom";

const listItems = [
    {label: "signup", path: "/signup"},
    {label: "login", path: "/login"},
    {label: "about", path: "/about"},
    {label: "home", path: "/"},
    {label: "dashboard", path: "/dashboard"},
    {label: "contact", path: "/contact"}

]

// Used old code for the navbar 
// But going to be changing the colors for major difference
const Navbar = () => {

    return(

        <div className = 'fixed bg-black flex justify-between items-center gap-16 py-3 px-10 left-1/2 translate-x-[-50%] top-[20px] rounded-full backdrop-blur-md bg-opacity-60 text-white shadow-lg z-10'>

            <ul className="flex gap-8 text-xl">
                {listItems.map((item) => (
                    <li className="relative group cursor-pointer" key={item.label}>
                    <Link to={item.path}>
                        {item.label}
                    </Link>
                        <span className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                ))}
            </ul>

            <Link to="/contact">
            <button className="bg-gradient-to-r from-blue-500 to green-400 py-1 px-6 rounded-3xl shadow-2xl text-white text-lg font-semibold hover:from-blue-600 hover:to-green-500 hover:shadow-green shadow-blue-500">
                Contact
            </button>
            </Link>
        </div>
    
    )

}


export default Navbar;