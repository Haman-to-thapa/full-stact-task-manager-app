import React from "react";
import { Navigate } from "react-router-dom";
import { usetAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = usetAuth();

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, render the child components
  return children;
};

export default ProtectedRoute;