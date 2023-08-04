import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const LogoutGuard = () => {
  const { userDetails } = useContext(UserContext);
  return userDetails.isLoggedIn ? <Navigate to="/welcome" /> : <Outlet />;
};

export default LogoutGuard;
