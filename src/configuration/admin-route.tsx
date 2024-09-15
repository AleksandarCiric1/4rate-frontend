import { NotFoundPage } from "@/pages/errors/not-found";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const location = useLocation();
  const isLoggedIn = !!sessionStorage.getItem("accountId"); // Check if user is logged in

  return isLoggedIn ? children : <NotFoundPage />;
};

export default AdminRoute;
