import DiabetesDashboard from "../Components/DashBoardComponent.jsx";
import { useLocation } from "react-router-dom";


function DashboardView() {

    const location = useLocation();
    const { userData, prediction } = location.state ?? {};

    if (!prediction) {
        return <p>No Data yet - complete the questionnaire first</p>
    }
    return (    
        <>
        
            <DiabetesDashboard  userData={userData} prediction={prediction}/>
            
        
        </>

    )
}


export default DashboardView;
