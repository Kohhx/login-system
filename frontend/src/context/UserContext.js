import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const initalState = {
    isLoggedIn: false,
    role: "",
    id: "",
    userAuth: "",
  };
  const [userDetails, setUserDetails] = useState(loadUserDetails());

  function loadUserDetails() {
    return {
      isLoggedIn:
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("authenticatedUser") &&
        true,
      role: sessionStorage.getItem("roles"),
      id: sessionStorage.getItem("id"),
      userAuth: sessionStorage.getItem("authenticatedUser"),
    };
  }

  // function handleUserLogin() {
  //   if (
  //     sessionStorage.getItem("token") &&
  //     sessionStorage.getItem("authenticatedUser")
  //   ) {
  //     setUserDetails((prev) => ({ ...prev, isLoggedIn: true }));
  //   }
  // }

  // function handleUserRole() {
  //   setUserDetails((prev) => ({
  //     ...prev,
  //     role: sessionStorage.getItem("role"),
  //   }));
  // }

  // function handleUserId() {
  //   setUserDetails( prev => ({ ...prev, id: sessionStorage.getItem("id") }));
  // }

  // function handleUserEmail() {
  //   setUserDetails( prev => ({
  //     ...prev,
  //     userAuth: sessionStorage.getItem("authenticatedUser"),
  //   }));
  // }

  // function loginUserDetails() {
  //   handleUserLogin()
  //   handleUserRole();
  //   handleUserId();
  //   handleUserEmail();
  // }

  // function logoutUserDetails() {
  //   setUserDetails(initalState);
  // }

  // function isUserLoggedIn() {
  //   return  (sessionStorage.getItem("token") &&
  //   sessionStorage.getItem("authenticatedUser")) || false;
  // }

  // function getUserRole() {
  //   return sessionStorage.getItem("role");
  // }

  // function getUserId() {
  //   return sessionStorage.getItem("id");
  // }

  return (
    <UserContext.Provider
      value={{
        userDetails,
        // handleUserLogin,
        // handleUserRole,
        // handleUserId,
        // loginUserDetails,
        // logoutUserDetails,
        // isUserLoggedIn,
        // getUserRole,
        // getUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
