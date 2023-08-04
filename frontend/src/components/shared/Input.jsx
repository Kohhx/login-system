import React from "react";

const Input = ({ type, input, placeHolder, label }) => {
  const { inputData, ...inputRest } = input;

  let inputClasses="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400";
  if (inputData.isFocused && !inputData.isValid) {
    inputClasses += " border-red-500 focus:ring-red-200 bg-red-100";
  }

  const errorClasses = "text-red-500 text-sm";

  return (
    <div className="mb-6">
      {label && (
        <div className="mb-1">
          <label >{label}</label>
        </div>
      )}
      <input type={type} placeholder={placeHolder} {...inputRest} className={inputClasses}/>
      <div className="mt-1">
        {inputData.isFocused &&
          !inputData.isValid &&
          inputData.errorMessages.map((message, index) => {
            return <p className={errorClasses} key={index}>{message}</p>;
          })}
      </div>
    </div>
  );
};

export default Input;
