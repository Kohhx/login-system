import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const initalState = {
    isLoggedIn: false,
    role: [],
    id: "",
    userAuth: "",
  };
  const [userDetails, setUserDetails] = useState(returnUserDetails());

  function returnUserDetails() {
    return {
      isLoggedIn:
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("authenticatedUser") &&
        true,
      roles: JSON.parse(sessionStorage.getItem("roles")),
      id: sessionStorage.getItem("id"),
      userAuth: sessionStorage.getItem("authenticatedUser"),
    };
  }

  function loadUserDetails() {
    setUserDetails(returnUserDetails());
  }

  function resetUserDetails() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("id");
    setUserDetails(initalState);
  }

  function isManager() {
    return userDetails?.roles?.includes("ROLE_MANAGER");
  }

  return (
    <UserContext.Provider
      value={{
        userDetails,
        isManager,
        loadUserDetails,
        resetUserDetails
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
