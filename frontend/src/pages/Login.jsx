import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import useInput from "../hooks/useInput";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utility/InputValidator";
import Input from "../components/shared/Input";
import { toast } from "react-toastify";
import { AuthenticationAPI } from "../api/AuthenticationAPI";

import { UserContext } from "../context/UserContext";
import LoginImage from "../assets/images/login2.jpg";
import { AiOutlineLogin } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const { loadUserDetails } = useContext(UserContext);

  const { ...usernameInput } = useInput("", [
    VALIDATOR_REQUIRE("Username is required"),
  ]);
  const { ...passwordInput } = useInput("", [
    VALIDATOR_REQUIRE("Password is required"),
    VALIDATOR_MINLENGTH(8, "Password must be at least 8 characters long"),
  ]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!usernameInput.inputData.isValid || !passwordInput.inputData.isValid) {
      toast.error("Please enter valid username and password");
      return;
    }

    // TODO: Login logic
    const loginUser = {
      username: usernameInput.inputData.value,
      password: passwordInput.inputData.value,
    };

    try {
      await AuthenticationAPI.login(loginUser);
      loadUserDetails();
      toast.success("Login successful");
      navigate("/welcome");
    } catch (err) {
      toast.error(err);
      return;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full flex items-center justify-center  md:w-1/2 lg:w-1/2">
        <div className="border p-6 rounded-lg shadow-lg w-[60%] md:min-w-[350px]">
          <h2 className="text-xl mb-4">Welcome !</h2>
          <div className="flex items-center gap-2 ">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <AiOutlineLogin className="text-2xl" />
          </div>
          <p className="mb-[35px]">Login to find up more!</p>

          <form className="flex flex-col" onSubmit={handleLoginSubmit}>
            <Input
              type="text"
              input={usernameInput}
              placeHolder="Enter username"
              label="User name"
            />
            <Input
              type="text"
              input={passwordInput}
              placeHolder="Enter password"
              label="Password"
            />
            <div className="flex items-center justify-between text-[0.8rem] mb-4">
              <div className="flex items-center">
                <input type="checkbox" className="checked:accent-black mr-1"/>
                <span>Remember me</span>
              </div>

              <span>Forgot Password?</span>
            </div>

            <button
              className="w-full bg-black text-white text-[1rem] py-2 rounded-md mb-10 hover:bg-white hover:text-black hover:border-black border border-black transition-all"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="text-center text-[0.85rem]">
            <span className="mr-2 text-[#7d7d7d]">Don't have an Account?</span>
            <Link
              to="/signup"
              className="text-black font-medium cursor-pointer hover:opacity-70"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden w-1/2 md:flex lg:flex items-center justify-center">
        <img src={LoginImage} alt="login" />
      </div>
    </div>
  );
};

export default Login;
