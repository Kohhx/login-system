import React from "react";

const Card = ({ children }) => {
  return (
    <div className="border p-10 rounded-2xl shadow-lg md:min-w-[350px]">
      {children}
    </div>
  );
};

export default Card;
