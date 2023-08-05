import React, { useContext, useState, useEffect } from "react";
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
import { UserAPI } from "../api/UserAPI";
import { FiEdit3 } from "react-icons/fi";

const Signup = ({ type, data = {}, loadUser, handleModal, header }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loadUserDetails, isManager } = useContext(UserContext);
  const [isEditable, setIsEditable] = useState(
    type === "editManager" ? false : true
  );

  const { inputMethods: firstNameMethods, inputRest: firstNameRest } = useInput(
    data.firstName || "",
    [VALIDATOR_REQUIRE(t("First name is required"))],
    t,
    type === "editManager" && false
  );

  const { inputMethods: lastNameMethods, inputRest: lastNameRest } = useInput(
    data.lastName || "",
    [VALIDATOR_REQUIRE(t("Last name is required"))],
    t,
    type === "editManager" && false
  );

  const { inputMethods: userNameMethods, inputRest: userNameRest } = useInput(
    data.username || "",
    [VALIDATOR_REQUIRE(t("Username is required"))],
    t,
    type === "editManager" && false
  );

  const { inputMethods: passwordMethods, inputRest: passwordRest } = useInput(
    "",
    [
      VALIDATOR_REQUIRE(t("Password is required")),
      VALIDATOR_MINLENGTH(8, t("Password must be at least 8 characters long")),
    ],
    t,
    type === "editManager" && false
  );

  const {
    inputMethods: confirmPasswordMethods,
    inputRest: confirmPasswordRest,
  } = useInput(
    "",
    [
      VALIDATOR_REQUIRE(t("Confirm password is required")),
      VALIDATOR_MINLENGTH(
        8,
        t("Confirm password must be at least 8 characters long")
      ),
    ],
    t,
    type === "editManager" && false
  );

  const { inputMethods: rolesMethods, inputRest: rolesRest } = useInput(
    (data.roles && data.roles[0]) || "USER_ROLE",
    [VALIDATOR_REQUIRE("Select a role")],
    t,
    type === "editManager" && false
  );

  // Overall form check to make sure all fields are valid
  const checkInputsAreValid = () => {
    if (
      !firstNameRest.inputData.isValid ||
      !lastNameRest.inputData.isValid ||
      !userNameRest.inputData.isValid ||
      !passwordRest.inputData.isValid ||
      !confirmPasswordRest.inputData.isValid ||
      !rolesRest.inputData.isValid
    ) {
      firstNameMethods.setFocus(true);
      lastNameMethods.setFocus(true);
      userNameMethods.setFocus(true);
      passwordMethods.setFocus(true);
      confirmPasswordMethods.setFocus(true);
      rolesMethods.setFocus(true);
      toast.error(t("Please enter valid details"));
      return false;
    }
    return true;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!checkInputsAreValid()) {
      return;
    }

    // Check if password and confirm password are same
    if (passwordRest.inputData.value !== confirmPasswordRest.inputData.value) {
      toast.error(t("Password and confirm password must be same"));
      return;
    }

    // TODO: Login Rest
    const signUpUser = {
      firstName: firstNameRest.inputData.value,
      lastName: lastNameRest.inputData.value,
      username: userNameRest.inputData.value,
      password: passwordRest.inputData.value,
    };

    try {
      await AuthenticationAPI.signup(signUpUser);
      loadUserDetails();
      toast.success(t("Sign up successful"));
      navigate("/welcome");
    } catch (err) {
      toast.error(err);
      return;
    }
  };

  const checkIfPasswordMatches = () => {
    if (passwordRest.inputData.value !== confirmPasswordRest.inputData.value) {
      toast.error(t("Password and confirm password must be same"));
      return false;
    }
    return true;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Check if all inputs are valid
    if (!checkInputsAreValid()) return;

    // Check if password and confirm password are same
    if (!checkIfPasswordMatches) return;

    // Handle edit user
    const editUser = {
      id: data.id,
      firstName: firstNameRest.inputData.value,
      lastName: lastNameRest.inputData.value,
      username: userNameRest.inputData.value,
      password: passwordRest.inputData.value,
      roles: [rolesRest.inputData.value],
    };

    try {
      await UserAPI.updateUserInfo(editUser);
      loadUserDetails();
      toast.success(t("Edit user successful"));
      handleModal(false);
      loadUser();
    } catch (err) {
      toast.error(err);
      return;
    }
  };

  const handleEditManagerSubmit = async (e) => {
    e.preventDefault();
    // Check if all inputs are valid
    if (!checkInputsAreValid()) return;

    // Check if password and confirm password are same
    if (!checkIfPasswordMatches) return;

    // Handle edit user
    const editUser = {
      id: data.id,
      firstName: firstNameRest.inputData.value,
      lastName: lastNameRest.inputData.value,
      username: userNameRest.inputData.value,
      password: passwordRest.inputData.value,
      roles: [rolesRest.inputData.value],
    };

    try {
      await UserAPI.updateUserInfoAndRole(editUser);
      toast.success(t("Edit user successful"));
      handleModal(false);
      loadUser();
    } catch (err) {
      toast.error(err);
      return;
    }
  };

  let handlesubmit = handleSignupSubmit;
  if (type === "edit") {
    handlesubmit = handleEditSubmit;
  }

  if (type === "editManager") {
    handlesubmit = handleEditManagerSubmit;
  }

  const handleEdit = () => {
    firstNameMethods.setEditable(isEditable);
    lastNameMethods.setEditable(isEditable);
    userNameMethods.setEditable(isEditable);
    passwordMethods.setEditable(isEditable);
    confirmPasswordMethods.setEditable(isEditable);
    rolesMethods.setEditable(isEditable);
  };

  useEffect(() => {
    handleEdit();
  }, [isEditable]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-3 text-4xl items-center">
          <h1 className="font-bold">{t(header)}</h1>
          <BiUserCircle className="text-5xl" />
          {type === "editManager" && (
            <button
              onClick={() => setIsEditable(!isEditable)}
              className="flex gap-2 items-center text-sm bg-black text-white px-4 py-2 rounded-full hover:opacity-75"
            >
              <FiEdit3 className="cursor-pointer" />
              <span>{t("Toggle Edit")}</span>
            </button>
          )}
        </div>
        <Language iconClassNames="text-4xl" />
      </div>
      <form onSubmit={handlesubmit}>
        <div className="flex gap-5">
          <Input
            type="text"
            label={t("First Name")}
            placeHolder={t("Enter first name")}
            input={firstNameRest}
          />
          <Input
            type="text"
            label={t("Last Name")}
            placeHolder={t("Enter last name")}
            input={lastNameRest}
          />
        </div>
        <Input
          type="text"
          label={t("User Name")}
          placeHolder={t("Enter user name")}
          input={userNameRest}
        />
        <Input
          type="password"
          label={t("Password")}
          placeHolder={t("Enter password")}
          input={passwordRest}
        />
        <Input
          type="password"
          label={t("Confirm Password")}
          placeHolder={t("Enter confirm password")}
          input={confirmPasswordRest}
        />
        {isManager() && type === "editManager" && (
          <Select
            label={t("Role")}
            options={[
              { name: t("User"), value: "ROLE_USER" },
              { name: t("Manager"), value: "ROLE_MANAGER" },
            ]}
            selectHeader={t("Select a role")}
            input={rolesRest}
          />
        )}

        {isEditable && (
          <Button
            name={
              type === "edit" || type === "editManager"
                ? t("Update")
                : t("Sign Up")
            }
            classNames="w-full"
          />
        )}
      </form>
    </div>
  );
};

export default Signup;
