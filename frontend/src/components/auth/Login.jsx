import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const [cookies, setCookies] = useCookies(["jwt"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/login",
        { ...values },
        { withCredentials: true }
      );
      console.log(
        "🚀 ~ file: Login.jsx:42 ~ handleSubmit ~ response:",
        response
      );
      setLoading(false);

      if (response.data.status === false) {
        const { email, password } = response.data.errors;
        if (email) generateError(email);
        if (password) generateError(password);
      } else {
        // Successful login, set the 'jwt' cookie
        setCookies("jwt", response.data.token, { path: "/" });
        navigate("/");
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
      generateError("An unexpected error occurred.");
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <h2>Login to your Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
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
