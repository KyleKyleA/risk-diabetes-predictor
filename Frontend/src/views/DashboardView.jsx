import DiabetesDashboard from "../Components/DashBoardComponent.jsx";
import { useLocation } from "react-router-dom";
import { riskResult} from "../Components/DashBoardComponent.jsx"

function DashboardView() {

    const location = useLocation();
    const { userData, prediction } = location.state ?? {};

    if (!riskResult) {
        return <p>No Data yet - complete the questionnaire first</p>
    }
    return (    
        <>
        
            <DiabetesDashboard  userData={riskResult} prediction={prediction}/>
            
        
        </>

    )
}


export default DashboardView;
