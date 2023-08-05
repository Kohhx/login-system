import React from "react";

const Button = ({ classNames, name, ...rest }) => {
  return (
    <button
      {...rest}
      className={`bg-black text-white text-[1rem] py-2 rounded-md  hover:bg-white hover:text-black hover:border-black border border-black transition-all ${classNames}`}
      type="submit"
    >
      {name}
    </button>
  );
};

export default Button;
