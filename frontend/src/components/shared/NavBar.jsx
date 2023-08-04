import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthenticationAPI } from "../../api/AuthenticationAPI";
import { toast } from "react-toastify";
import LogoImage from "../../assets/images/logo.png";

import { UserContext } from "../../context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { userDetails, resetUserDetails } = useContext(UserContext);
  return (
    <div className="bg-white flex items-center justify-between py-3 px-5 shadow-md text-xl h-[60px]">
      <div>
        <Link to="/welcome">
          <img
            src={LogoImage}
            alt="logo"
            className="h-[40px] w-[40px] cursor-pointer"
          />
        </Link>
      </div>

      <button
        className="hover:scale-110 transition-all link"
        onClick={() => {
          toast.success("Logout successful");
          resetUserDetails();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
