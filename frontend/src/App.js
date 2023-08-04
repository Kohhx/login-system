import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import LogoutGuard from "./routeGuards/LogoutGuard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import UserGuard from "./routeGuards/UserGuard";
import NavbarLayout from "./layout/NavbarLayout";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="app-container h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Routes protected by Logout Guard */}
            <Route element={<LogoutGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
            </Route>

            {/* Routes protected by Login user guard */}
            <Route element={<UserGuard />}>
              <Route element={<NavbarLayout />}>
                <Route path="/welcome" element={<Welcome />} />
              </Route>
            </Route>

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
