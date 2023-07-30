import React from "react";
import { ToastContainer } from "react-toastify";
import AuthChecker from "../components/auth/authChecker";
import LayoutDashboard from "../layout/Layout";

export default function Cards() {
  return (
    <>
      <LayoutDashboard>
        <AuthChecker />
        <ToastContainer />
      </LayoutDashboard>
    </>
  );
}
