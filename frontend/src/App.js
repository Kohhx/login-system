import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import './App.css';

import LogoutGuard from "./routeGuards/LogoutGuard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Routes protected by Logout Guard */}
            {/* <Route element={<LogoutGuard/>}> */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
            {/* </Route> */}

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
