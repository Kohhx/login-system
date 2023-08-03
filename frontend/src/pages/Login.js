import React from "react";
import useInput from "../hooks/useInput";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utility/InputValidator";

const Login = () => {
  const { inputData: usernameData, ...usernameRest } = useInput("", [
    VALIDATOR_REQUIRE("Username is required"),
  ]);
  const { inputData: passwordData, ...passwordRest } = useInput("", [
    VALIDATOR_REQUIRE("Password is required"),
    VALIDATOR_MINLENGTH(7, "Password must be at least 7 characters long"),
  ]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(usernameData);
    console.log(passwordData);
  };

  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center border border-red-400 w-1/2">
        <form className="flex flex-col" onSubmit={handleLoginSubmit}>
          <div>
            <input type="text" placeholder="Enter username" {...usernameRest} />
            <div>
              {usernameData.isFocused &&
                !usernameData.isValid &&
                usernameData.errorMessages.map((message, index) => {
                  return <p key={index}>{message}</p>;
                })}
            </div>
          </div>
          <div>
            <input type="text" placeholder="Enter password" {...passwordRest} />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
      <div className="border-2 border-red-400 w-1/2">Hello</div>
    </div>
  );
};

export default Login;
