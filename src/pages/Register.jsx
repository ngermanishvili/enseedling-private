// components/Register.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        { ...values },
        { withCredentials: true }
      );

      if (data.errors) {
        const { email, password } = data.errors;
        if (email) showErrorToast(email);
        else if (password) showErrorToast(password);
      } else {
        showSuccessToast("Registration successful!");
      }
    } catch (err) {
      console.log(err);
      showErrorToast("Email is already registered.");
    }
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "bottom-right",
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "bottom-right",
    });
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already Have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
