// Author: Kyle Angeles
// File-Name: DashBoard.jsx
// Description: This component handles the dashboard which will should different parts of Analytics where the user can 
// see real time updates.
import {useState, useEffect, useRef} from "react";


function DashBoard({ StatChart, RiskCalc, RiskGuage = []}) {


    // useStates & useRef's
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState=("stat");
    const hasInitializedFromUrl = useRef(false);
    const statPerPage = 4;






    return (

        <>



        {/* Dashboard componenets
            -> Stats chart
            -> Bar graph
            -> timeline graph
            -> statistics (numerical)
            -> which will be all exported by the machine learning model
        */}
        <div className ="">

            
        </div>

        
        
        </>
    )
}

export default DashBoard;