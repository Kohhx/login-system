import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthenticationAPI } from "../../api/AuthenticationAPI";
import { toast } from "react-toastify";

import { UserContext } from "../../context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { userDetails, resetUserDetails } = useContext(UserContext);
  return (
    <div className="bg-white flex items-center justify-between py-3 px-5 shadow-md text-xl">
      <div className="cursor-pointer">Logo</div>
      <button
        className="hover:scale-110 transition-all link"
        onClick={() => {
          toast.success("Logout successful");
          resetUserDetails();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
