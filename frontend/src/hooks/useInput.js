import { useState, useEffect } from "react";
import { validate } from "../utility/InputValidator";

export default function useInput(initialValue, validators = []) {
  const initialState = {
    value: initialValue,
    isFocused: false,
    isValid: validators.length === 0 ? true : false,
    errorMessages: [],
  };
  const [inputData, setInputData] = useState(initialState);

  const handleChange = (e) => {
    setInputData((prev) => ({ ...prev, value: e.target.value }));

    // const [isInputValid, validatorMessages] = validate(
    //   e.target.value,
    //   validators
    // );

    // if (isInputValid) {
    //   setInputData((prev) => ({ ...prev, isValid: true, errorMessages: [] }));
    // } else {
    //   setInputData((prev) => ({
    //     ...prev,
    //     isValid: false,
    //     errorMessages: validatorMessages,
    //   }));
    // }
  };

  useEffect(() => {
    const [isInputValid, validatorMessages] = validate(
      inputData.value,
      validators
    );

    if (isInputValid) {
      setInputData((prev) => ({ ...prev, isValid: true, errorMessages: [] }));
    } else {
      setInputData((prev) => ({
        ...prev,
        isValid: false,
        errorMessages: validatorMessages,
      }));
    }
  },[inputData.value])

  const handleFocus = () => {
    setInputData((prev) => ({ ...prev, isFocused: true }));
  };

  return {
    inputData,
    onChange: handleChange,
    onFocus: handleFocus,
  };
}
