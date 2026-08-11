// Author: Kyle Angeles
// Date: 2026-07-28
// File: Frontend/src/views/AppLayout.jsx
// Description: This file contains the AppLayout component, which is the main layout for the application. It includes the background paths and the main content area.
import { FluidParticlesBackground }  from "../Components/ui/background.jsx";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Aup from "../Components/Aup";
import PrivacyPolicy from "../Components/Terms&Conditions.jsx"; 

function AppLayout() {
    return (
        <div className="min-h-screen w-full flex flex-col relative">
        <FluidParticlesBackground />

        <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
       
        


        <main className="w-full flex-1 pt-24">
                    {<Outlet />}
        </main>

        {/*  Footer can be added here if needed */}
        {/* Below the footer will be the policies or like term and conditions of the application */}
        <footer className="w-full py-4 flex justify-center gap-6 text-sm text-black/70">
                    <Link to="/aup" className="hover:text-white underline">
                        Acceptable Use Policy
                    </Link>
                    <Link to="/privacy-policy" className="hover:text-white underline">
                        Privacy Policy
                    </Link>
        </footer>
        </div>
        </div>

        

       
        


    );
    
}
export default AppLayout;