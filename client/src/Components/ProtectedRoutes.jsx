import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
  
    if (!token) {
      return false;
    }
    
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
  
      console.log("Decoded Token:", decodedToken);
      console.log("Current Time:", currentTime);

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return false;
      }
  
      return true;
    } catch (error) {
      console.error("JWT Decode Error:", error);
      return false;
    }
  };
  

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
