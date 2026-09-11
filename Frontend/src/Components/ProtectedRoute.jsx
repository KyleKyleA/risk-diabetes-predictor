// Description: This component helps to protect routes that require authenication. It checks if the user is authenticated and if not, it redirects them to the login page.
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext.jsx";


export default function ProtectedRoute({ children }) {


    const { user }  = useAuth();
    const location = useLocation();

    if (user === undefined) return <div>Loading... </div>
    if (!user) {

        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}