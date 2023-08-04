import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const UserGuard = () => {
  const { userDetails } = useContext(UserContext);
  console.log(userDetails);
  return !userDetails.isLoggedIn &&
    !userDetails.roles?.includes("ROLE_USER") &&
    !userDetails.roles?.includes("ROLE_MANAGER") ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default UserGuard;
