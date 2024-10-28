import React from "react";
import { useNavigate } from "react-router-dom";
export const ProtectedRoute = ({ element: Component, ...rest }) => {
    const Navigate=useNavigate();
    const token = localStorage.getItem('authToken');
  
    return token ? <Component {...rest} /> : <Navigate to="/login" />;
  };
  