import Login from "../Components/LoginForm.jsx";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  
    const navigate = useNavigate();

    const handleSubmit = () => {

        navigate("/dashboard")
    };
    return (


        <>
            <LoginForm onSuccess={handleSubmit} />
        
        </>
    )
}


export default Login;