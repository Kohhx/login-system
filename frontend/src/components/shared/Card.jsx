import React from "react";

const Card = ({ children, classNames }) => {
  return (
    <div className={`border p-10 rounded-2xl shadow-lg md:min-w-[350px] ${classNames}`}>
      {children}
    </div>
  );
};

export default Card;
