import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const ManagerGuard = () => {
  const ctx = useContext(UserContext);
  console.log(ctx.getUserRole());
  return !ctx.isUserLoggedIn() &&
    ctx.getUserRole() !== "ROLE_MANAGER" ? (
    <Navigate to="/Unauthorized" />
  ) : (
    <Outlet />
  );
};

export default ManagerGuard;
