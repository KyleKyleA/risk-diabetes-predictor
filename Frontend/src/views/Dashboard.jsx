import DiabetesDashboard from "../Components/DashBoardComponent.jsx";
import { useLocation } from "react-router-dom";


function Dashboard() {

    const { riskResult } = useRisk();

    if (!riskResult) {
        return <p>No Data yet - complete the questionnaire first</p>
    }
    return (    
        <>
        
            <DiabetesDashboard  userData={riskResult} prediction={prediction}/>
            
        
        </>

    )
}


export default Dashboard;
