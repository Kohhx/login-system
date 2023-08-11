import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserProvider from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
    <UserProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </UserProvider>
  </GoogleOAuthProvider>
);
