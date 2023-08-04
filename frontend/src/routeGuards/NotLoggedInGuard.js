import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const NotLoggedInGuard = ({ component }) => {
  // const navigate = useNavigate();
  const { userDetails } = useContext(UserContext);

  if (ctx.isUserLoggedIn()) {
    return <Navigate to="/welcome" />;
  }
  return component;
};

export default NotLoggedInGuard;
