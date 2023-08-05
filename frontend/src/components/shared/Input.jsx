import React, { useState } from "react";
import { BiShowAlt } from "react-icons/bi";

const Input = ({ type, input, placeHolder, label }) => {
  const [togglePassword, setTogglePassword ] = useState("password");
  const { inputData, ...inputRest } = input;
  console.log(inputData);

  let inputClasses =
    "w-full border border-black rounded-md pt-2 pb-2 pl-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400";
  let disabledClasses =
    "disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-70 disabled:border-transparent";
  inputClasses += disabledClasses;
  if (inputData.isFocused && !inputData.isValid) {
    inputClasses += " border-red-500 focus:ring-red-200 bg-red-100";
  }

  const errorClasses = "text-red-500 text-sm";

  const handleToggleShowPassword = () => {
    if (togglePassword === "password") {
      setTogglePassword("text");

    } else {
      setTogglePassword("password");
    }
  }

  return (
    <div className="mb-6">
      {label && (
        <div className="mb-1">
          <label>{label}</label>
        </div>
      )}
      <div className="relative">
        {type === "password" && <BiShowAlt onClick={handleToggleShowPassword} className="text-xl absolute right-[10px] top-[25%] cursor-pointer"/>}
        <input
          value={inputData.value}
          disabled={!inputData.isEditable}
          type={type === "password" ? togglePassword : type}
          placeholder={inputData.isEditable && placeHolder}
          {...inputRest}
          className={inputClasses}
        />
      </div>

      <div className="mt-1">
        {inputData.isFocused &&
          !inputData.isValid &&
          inputData.errorMessages.map((message, index) => {
            return (
              <p className={errorClasses} key={index}>
                {message}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Input;
