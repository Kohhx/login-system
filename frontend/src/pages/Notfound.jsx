import React, { useContext } from "react";
import NotFoundImage from "../assets/images/404 Crop.jpg";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";

const Notfound = () => {
  const { t } = useTranslation();
  const { userDetails } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center justify-center gap-10 mb-14">
          <div>
            <h1 className="text-7xl mb-2">404</h1>
            <h3 className="text-xl">{t('Opps! Page not found!')}</h3>
          </div>
          <img src={NotFoundImage} alt="Not found" className="w-[30%]" />
        </div>

        <Link
          className="flex gap-3 pr-10 pl-8 bg-black text-white text-[1rem] py-2 rounded-full mb-10 hover:bg-white hover:text-black hover:border-black border border-black transition-all"
          to={userDetails.isLoggedIn ? "/welcome" : "/login"}
        >
          <BsArrowLeftShort className="text-2xl" />
          <span>{t('Go Back Home')}</span>
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
