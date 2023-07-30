// Cards.js
import React from "react";
import { ToastContainer } from "react-toastify";
import AuthChecker from "../components/auth/authChecker";
import AuthActions from "../components/auth/AuthActions";

export default function Cards() {
  return (
    <>
      <AuthChecker />
      <div className="private">
        <h1>Super Secret Page</h1>
        <AuthActions />
      </div>
      <ToastContainer />
    </>
  );
}
