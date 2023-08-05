import React from "react";

const Input = ({ type, input, placeHolder, label }) => {
  const { inputData, ...inputRest } = input;
  console.log(inputData)

  let inputClasses="w-full border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400";
  let disabledClasses = "disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-70 disabled:border-transparent";
  inputClasses += disabledClasses;
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
      <input value={inputData.value} disabled={!inputData.isEditable} type={type} placeholder={inputData.isEditable && placeHolder} {...inputRest} className={inputClasses}/>
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
