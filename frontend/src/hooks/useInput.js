import { useState, useEffect, useCallback } from "react";
import { validate } from "../utility/InputValidator";

export default function useInput(initialValue, validators = [], t = undefined) {
  const initialState = {
    value: initialValue,
    isFocused: false,
    isValid: validators.length === 0 ? true : false,
    errorMessages: [],
  };

  const [inputData, setInputData] = useState(initialState);

  const handleChange = (e) => {
    setInputData((prev) => ({ ...prev, value: e.target.value }));
  };

  const setFocus = (isFocused) => {
    setInputData((prev) => ({ ...prev, isFocused }));
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
  }, [inputData.value, t]);

  const handleFocus = () => {
    setInputData((prev) => ({ ...prev, isFocused: true }));
  };

  return {
    inputData,
    setFocus,
    onChange: handleChange,
    onFocus: handleFocus,
  };
}
