import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ManagerGuard = () => {
  const { userDetails } = useContext(UserContext);
  return !userDetails.isLoggedIn &&
    !userDetails.roles?.includes("ROLE_MANAGER") ? (
    <Navigate to="/Unauthorized" />
  ) : (
    <Outlet />
  );
};

export default ManagerGuard;
