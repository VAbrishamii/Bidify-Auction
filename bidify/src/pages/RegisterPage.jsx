import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
/**
 * RegisterPage component that handles user registration.
 * It uses the RegisterForm component to collect user information
 * and handles successful registration by showing an alert and navigating to the login page.
 *
 */
const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    alert("Registration successful");
    navigate("/login");
  };
  return (
    <div>
      <RegisterForm onregisterSuccess={handleRegisterSuccess} />
    </div>
  );
};
export default RegisterPage;
