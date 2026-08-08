import SignupForm from "../Components/SignupForm.jsx";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const handleSubmit = () => {

        navigate("/dashboard");
    };
    return (
       <>
            <SignupForm onSuccess={handleSubmit} />
       </>
    )
}

export default Signup;