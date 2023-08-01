// AuthActions.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthActions = () => {
  const navigate = useNavigate();
  
  const [, , removeCookie] = useCookies();

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <div className="auth-actions">
      <button onClick={logOut}>Sign out</button>
    </div>
  );
};

export default AuthActions;
