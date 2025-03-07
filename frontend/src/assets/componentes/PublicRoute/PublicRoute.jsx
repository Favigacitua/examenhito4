import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../../Context/UserContext";  

const PublicRoute = ({ children }) => {
  const { token } = useUserContext();
  const location = useLocation();  

  
  if (token && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to="/perfil" />;
  }

  return children;
};

export default PublicRoute;
