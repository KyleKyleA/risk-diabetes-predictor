import LoginForm from "../Components/LoginForm.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/context/AuthContext.jsx";

function LoginPage() {
  
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = (accessToken) => {
        login(accessToken);
        navigate("/dashboard");
    };
    return (


        <>
            <LoginForm onSuccess={handleSubmit} />
        
        </>
    )
}


export default LoginPage;