import React from "react";
import { Navigate } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UseAuth();
  

  if (!user) {
    window.alert("Redirecting to Sign Up");
    return <Navigate to="/signUp" />;
  }
  return children;
};

export default ProtectedRoute;
