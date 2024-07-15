import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (!currentUser)
    return (
      <Navigate
        replace
        state={location.pathname + location.search}
        to="/login"
      />
    );
  return children;
}

export default ProtectedRoute;
