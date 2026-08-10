import Login from "../Components/Login.jsx";
import { useNavigate } from "react-router-dom";
function Login() {
  
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