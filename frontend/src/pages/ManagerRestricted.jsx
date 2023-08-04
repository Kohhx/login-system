import React from "react";
import Card from "../components/shared/Card";
import "./ManagerRestricted.css";

const ManagerRestricted = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
      <h1 className="text-6xl mb-8 down-animate">Welcome, Manager</h1>
      <div className=" down-animate2 opacity-0">
        <Card>
          <div className="text-xl">
            <h1>This is a secret announcement to all managers.</h1>
            <h1>
              The managers retreat will be held in Hawaii from
              <strong> 9th Aug - 15th Aug.</strong>
            </h1>
            <h1>Shh....🤫</h1>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManagerRestricted;
