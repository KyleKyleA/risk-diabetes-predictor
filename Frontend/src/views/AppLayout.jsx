// Author: Kyle Angeles
// Date: 2026-07-28
// File: Frontend/src/views/AppLayout.jsx
// Description: This file contains the AppLayout component, which is the main layout for the application. It includes the background paths and the main content area.


import { BackgroundPaths } from "@/Components/ui/background";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

function AppLayout() {
    return (

        <div className="min-h-screen w-full fle">
            <BackgroundPaths />

        <div className="relative z-10 flex flex-col min-h-screen">
                <NavBar />

        <main className="w-full flex-1">
                    {<Outlet />}
        </main>


        // Footer can be added here if needed
        // Below the footer will be the policies or like term and conditions of the application
        </div>
        </div>


    )
}
export default AppLayout;