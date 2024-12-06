import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

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
