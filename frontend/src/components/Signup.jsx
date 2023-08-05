import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import useInput from "../hooks/useInput";
import Input from "./shared/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utility/InputValidator";
import Button from "./shared/Button";
import { toast } from "react-toastify";
import { AuthenticationAPI } from "../api/AuthenticationAPI";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import Language from "./shared/Language";
import Select from "./shared/Select";

const Signup = ({ type, data = {} }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loadUserDetails, isManager } = useContext(UserContext);
  console.log("data", data)

  if (data) {

  }

  const { setFocus: firstNameFocus, ...firstNameInput } = useInput(
    data.firstName || "",
    [VALIDATOR_REQUIRE(t("First name is required"))],
    t
  );

  const { setFocus: lastNameFocus, ...lastNameInput } = useInput(
    data.lastName || "",
    [VALIDATOR_REQUIRE(t("Last name is required"))],
    t
  );

  const { setFocus: userNameFocus, ...userNameInput } = useInput(
    data.username || "",
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

  const { setFocus: confirmPasswordFocus, ...confirmPasswordInput } = useInput(
    "",
    [
      VALIDATOR_REQUIRE(t("Confirm password is required")),
      VALIDATOR_MINLENGTH(
        8,
        t("Confirm password must be at least 8 characters long")
      ),
    ],
    t
  );

  const { setFocus: rolesFocus, ...rolesInput } = useInput(
    (data.roles && data.roles[0]) ||  "",
    [VALIDATOR_REQUIRE("Select a role")],
    t
  );

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Check if all inputs are valid
    if (
      !firstNameInput.inputData.isValid ||
      !lastNameInput.inputData.isValid ||
      !userNameInput.inputData.isValid ||
      !passwordInput.inputData.isValid ||
      !confirmPasswordInput.inputData.isValid
    ) {
      firstNameFocus(true);
      lastNameFocus(true);
      userNameFocus(true);
      passwordFocus(true);
      confirmPasswordFocus(true);
      toast.error("Please enter valid details");
      return;
    }

    // Check if password and confirm password are same
    if (
      passwordInput.inputData.value !== confirmPasswordInput.inputData.value
    ) {
      toast.error("Password and confirm password must be same");
      return;
    }

    // TODO: Login logic
    const signUpUser = {
      firstName: firstNameInput.inputData.value,
      lastName: lastNameInput.inputData.value,
      username: userNameInput.inputData.value,
      password: passwordInput.inputData.value,
    };

    try {
      await AuthenticationAPI.signup(signUpUser);
      loadUserDetails();
      toast.success("Sign up successful");
      navigate("/welcome");
    } catch (err) {
      toast.error(err);
      return;
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  };

  const handleEditManagerSubmit = async (e) => {
    e.preventDefault();
  };

  let handlesubmit = handleSignupSubmit;
  if (type === "edit") {
    handlesubmit = handleEditSubmit;
  }

  if (type === "editManager") {
    handlesubmit = handleEditManagerSubmit;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-3 text-4xl items-center">
          <h1 className="font-bold">{t("Sign Up")}</h1>
          <BiUserCircle className="text-5xl" />
        </div>
        <Language iconClassNames="text-4xl" />
      </div>

      <form onSubmit={handlesubmit}>
        <div className="flex gap-5">
          <Input
            type="text"
            label={t("First Name")}
            placeHolder={t("Enter first name")}
            input={firstNameInput}
          />
          <Input
            type="text"
            label={t("Last Name")}
            placeHolder={t("Enter last name")}
            input={lastNameInput}
          />
        </div>
        <Input
          type="text"
          label={t("User Name")}
          placeHolder={t("Enter user name")}
          input={userNameInput}
        />
        <Input
          type="password"
          label={t("Password")}
          placeHolder={t("Enter password")}
          input={passwordInput}
        />
        <Input
          type="password"
          label={t("Confirm Password")}
          placeHolder={t("Enter confirm password")}
          input={confirmPasswordInput}
        />
        {isManager() && type === "editManager" && (
          <Select
            label="Role"
            options={[
              { name: "User", value: "ROLE_USER" },
              { name: "Manager", value: "ROLE_MANAGER" },
            ]}
            selectHeader="Select a role"
            input={rolesInput}
          />
         )}
        <Button name="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
