import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate that inputs are not empty
    if (!values.email || !values.password) {
      if (!values.email) generateError("Email is required");
      if (!values.password) generateError("Password is required");
      return; // exit the function early if inputs are empty
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (response.data.status === false) {
        const { email, password } = response.data.errors;
        if (email) generateError(email);
        if (password) generateError(password);
      } else {
        navigate("/");
      }
    } catch (ex) {
      console.log(ex);
      generateError("An unexpected error occurred.");
    }
  };

  return (
    <Wrapper>
      <GoogleOAuthProvider clientId="431445019366-34ivq50hqso9fjlekjsvir29rv1elbjv.apps.googleusercontent.com">
        ...
        <div className="container">
          <h2>Login to your Account</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Don't have an account ?<Link to="/register"> Register </Link>
            </span>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const details = jwt_decode(credentialResponse.credential);
                console.log(details);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </form>
          <ToastContainer />
        </div>
      </GoogleOAuthProvider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(236, 236, 238);
  overflow: hidden;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export default Login;
