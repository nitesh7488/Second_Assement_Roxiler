import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { api } from "./api";

export const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const { id: storeId } = useParams();

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" />;

  // If no role requirement, allow access
  if (!role) return children;

  // Special handling for store details page
  if (storeId && userRole === "store_owner") {
    // Allow store owners to access their own store details
    return children;
  }

  // For other routes, check role match
  if (userRole !== role) return <Navigate to="/unauthorized" />;

  return children;
};
