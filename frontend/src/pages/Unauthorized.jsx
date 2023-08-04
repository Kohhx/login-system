import React, { useContext} from "react";
import UnauthorizedImage from "../assets/images/403.jpg";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Unauthorized = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center justify-center gap-10 mb-8">
          <div>
            <h1 className="text-7xl mb-2">403 Forbidden</h1>
            <h3 className="text-xl">You are not allow access to the webpage!</h3>
          </div>
        <img src={UnauthorizedImage} alt="Not found" className="w-[30%]" />
        </div>

        <Link
          className="flex gap-3 pr-10 pl-8 bg-black text-white text-[1rem] py-2 rounded-full mb-10 hover:bg-white hover:text-black hover:border-black border border-black transition-all"
          to={userDetails.isLoggedIn ? "/welcome" : "/login"}
        >
          <BsArrowLeftShort className="text-2xl" />
          <span>Go back Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
