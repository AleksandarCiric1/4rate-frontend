import { NotFoundPage } from "@/pages/errors/not-found";
import React from "react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const isLoggedIn = !!sessionStorage.getItem("isLogged");

  return isLoggedIn ? children : <NotFoundPage />;
};

export default AdminRoute;
