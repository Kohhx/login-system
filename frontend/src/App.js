import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import i18n from './config/i18n';

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import LogoutGuard from "./routeGuards/LogoutGuard";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import UserGuard from "./routeGuards/UserGuard";
import NavbarLayout from "./layout/NavbarLayout";
import ManagerGuard from "./routeGuards/ManagerGuard";
import ManagerRestricted from "./pages/ManagerRestricted";
import Unauthorized from "./pages/Unauthorized";
import Notfound from "./pages/Notfound";
import ManageUsers from "./pages/ManageUsers";

function App() {
  console.log(process.env.REACT_APP_CLIENT_ID);

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
            </Route>

            <Route element={<NavbarLayout />}>
              {/* Routes protected by Login user guard */}
              <Route element={<UserGuard />}>
                <Route path="/welcome" element={<Welcome />} />
              </Route>

              {/* Routes protected by Manager user guard */}
              <Route element={<ManagerGuard />}>
                <Route path="/manager" element={<ManagerRestricted />} />
                <Route path="/users" element={<ManageUsers />} />
              </Route>
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
