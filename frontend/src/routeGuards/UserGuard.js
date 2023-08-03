import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const UserGuard = () => {
  const ctx = useContext(UserContext);
  console.log(ctx.getUserRole());
  return !ctx.isUserLoggedIn() &&
    ctx.getUserRole() !== "ROLE_USER" &&
    ctx.getUserRole() !== "ROLE_ADMIN" ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default UserGuard;
