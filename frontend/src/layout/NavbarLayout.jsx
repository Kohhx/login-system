import React, { useContext } from "react";
import NavBar from "../components/shared/NavBar";
import { UserContext } from "../context/UserContext";
import { Outlet } from "react-router-dom";

const NavbarLayout = () => {
  const { userDetails } = useContext(UserContext);
  return (
    <div>
      {/* {userDetails.isLoggedIn && <NavBar />} */}
      <NavBar />
      <Outlet />
    </div>
  );
};

export default NavbarLayout;
