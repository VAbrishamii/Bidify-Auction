import React from "react";
import { Navigate } from "react-router-dom";
/**
 * AuthGuard component checks if the user is authenticated by verifying the presence of a token in localStorage.
 */
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
