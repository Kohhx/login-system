import React from "react";
import classNames from "classnames";

const Button2 = ({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  addClass,
  className,
  ...rest
}) => {

  // Create the classNames builder based on user custom class and props options
  const classes = classNames(
    "px-3 py-1.5 border",
    {
      "border-blue-500 bg-blue-500 text-white": primary,
      "border-gray-900 bg-gray-900 text-white": secondary,
      "border-green-500 bg-green-500 text-white": success,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "border-red-500 bg-red-500 text-white hover:bg-red-400 hover:border-red-500": danger,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-400": outline && warning,
      "text-red-500": outline && danger,
    },
    className,  // Other custom classname that comes in as props
  );



  return (
    <div>
      <button className={classes} {...rest}>
        {children}
      </button>
    </div>
  );
};

Button2.propTypes = {
  checkVariationValues: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only 1 primary, secondary, success, awarning, danger can be true"
      );
    }
  },
};

export default Button2;
