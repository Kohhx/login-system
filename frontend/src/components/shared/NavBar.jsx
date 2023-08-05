import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthenticationAPI } from "../../api/AuthenticationAPI";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LogoImage from "../../assets/images/logo.png";

import { UserContext } from "../../context/UserContext";
import "./NavBar.css";
import Language from "./Language";

const NavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userDetails, resetUserDetails, isManager } = useContext(UserContext);
  return (
    <div className="bg-white flex items-center justify-between py-3 px-5 shadow-md text-xl h-[60px]">
      <div className="flex gap-7 items-center">
        <Link to="/welcome">
          <img
            src={LogoImage}
            alt="logo"
            className="h-[40px] w-[40px] cursor-pointer"
          />
        </Link>
        <NavLink
          to="/welcome"
          className={({ isActive }) =>
            isActive ? "link-active" : "transition-all link"
          }
        >
          {t("Welcome")}
        </NavLink>
        {isManager() && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "link-active" : "transition-all link"
            }
          >
            {t("Manage Users")}
          </NavLink>
        )}
      </div>
      <div className="flex items-center gap-5">
        <Language />
        <button
          className="transition-all link"
          onClick={() => {
            toast.success(t("Logout successful"));
            resetUserDetails();
            navigate("/login");
          }}
        >
          {t("Logout")}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
