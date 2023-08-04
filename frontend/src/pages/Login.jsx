import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useInput from "../hooks/useInput";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utility/InputValidator";
import Input from "../components/shared/Input";
import { toast } from "react-toastify";
import { AuthenticationAPI } from "../api/AuthenticationAPI";
import { useTranslation } from "react-i18next";
import Language from "../components/shared/Language";

import { UserContext } from "../context/UserContext";
import LoginImage from "../assets/images/login2.jpg";
import { AiOutlineLogin } from "react-icons/ai";
import Modal from "../components/shared/Modal";
import { MdCancel } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import Signup from "../components/Signup";
import Button from "../components/shared/Button";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loadUserDetails } = useContext(UserContext);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);

  const { setFocus: usernameFocus, ...usernameInput } = useInput(
    "",
    [VALIDATOR_REQUIRE(t("Username is required"))],
    t
  );
  const { setFocus: passwordFocus, ...passwordInput } = useInput(
    "",
    [
      VALIDATOR_REQUIRE(t("Password is required")),
      VALIDATOR_MINLENGTH(8, t("Password must be at least 8 characters long")),
    ],
    t
  );

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!usernameInput.inputData.isValid || !passwordInput.inputData.isValid) {
      usernameFocus(true);
      passwordFocus(true);
      toast.error("Please enter valid username or password");
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
    <>
      <CSSTransition
        in={isOpenSignUpModal}
        timeout={300}
        classNames="fadedown" // Classes for css transition in index.css
        unmountOnExit
      >
        <Modal
          isOpen={isOpenSignUpModal}
          closeModal={() => setIsOpenSignUpModal(false)}
        >
          <MdCancel
            className="absolute top-[-10px] right-[-10px] text-3xl cursor-pointer"
            onClick={() => setIsOpenSignUpModal(false)}
          />
        <Signup />
        </Modal>
      </CSSTransition>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full flex items-center justify-center  md:w-1/2 lg:w-1/2">
          <Language
            divClassNames="absolute top-[30px] left-[30px]"
            iconClassNames="text-4xl"
          />
          <div className="border p-6 rounded-lg shadow-lg w-[60%] md:min-w-[350px]">
            <h2 className="text-xl mb-4">{t("Welcome")}!</h2>
            <div className="flex items-center gap-2 ">
              <h1 className="text-3xl font-bold">{t("Sign in")}</h1>
              <AiOutlineLogin className="text-2xl" />
            </div>
            <p className="mb-[35px]">{t("Login to find out more")}</p>

            <form className="flex flex-col" onSubmit={handleLoginSubmit}>
              <Input
                type="text"
                input={usernameInput}
                placeHolder={t("Enter username")}
                label={t("User name")}
              />
              <Input
                type="text"
                input={passwordInput}
                placeHolder={t("Enter password")}
                label={t("Password")}
              />
              <div className="flex items-center justify-between text-[0.8rem] mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="checked:accent-black mr-1"
                  />
                  <span className="text-[#7d7d7d]">{t("Remember me")}</span>
                </div>

                <span className="text-[#7d7d7d]">{t("Forgot password")}?</span>
              </div>
              <Button classNames="mb-10" name="Login"/>
            </form>
            <div className="text-center text-[0.85rem]">
              <span className="mr-2 text-[#7d7d7d]">
                {t("Dont have an Account")}?
              </span>
              <button
                onClick={() => setIsOpenSignUpModal(true)}
                className="text-black font-medium cursor-pointer hover:opacity-70"
              >
                {t("Register")}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 md:flex lg:flex items-center justify-center pr-5">
          <img src={LoginImage} alt="login" className="w-[90%]" />
        </div>
      </div>
    </>
  );
};

export default Login;
