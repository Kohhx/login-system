import React, { useContext} from "react";
import NotFoundImage from "../assets/images/404.jpg";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Notfound = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={NotFoundImage} alt="Not found" className="w-[50%]" />
      <Link
        className="flex gap-3 pr-10 pl-8 bg-black text-white text-[1rem] py-2 rounded-full mb-10 hover:bg-white hover:text-black hover:border-black border border-black transition-all"
        to={userDetails.isLoggedIn ? "/welcome" : "/login"}
      >
        <BsArrowLeftShort className="text-2xl" />
        <span>Go back Home</span>
      </Link>
    </div>
  );
};

export default Notfound;
