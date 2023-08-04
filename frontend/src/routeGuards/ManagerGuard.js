import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ManagerGuard = () => {
  const { userDetails, isManager } = useContext(UserContext);
  return !userDetails.isLoggedIn || !isManager() ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Outlet />
  );
};

export default ManagerGuard;
