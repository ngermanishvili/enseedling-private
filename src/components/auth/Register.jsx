import React, {useState, useEffect} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
          role: "intern",
        },
        {withCredentials: true}
      );
      if (data) {
        if (data.errors) {
          const {firstName, email, password} = data.errors;
          if (firstName) generateError(firstName);
          else if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
          role: "teacher",
        },
        {withCredentials: true}
      );
      if (data) {
        if (data.errors) {
          const {firstName, email, password} = data.errors;
          if (firstName) generateError(firstName);
          else if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <>
      <Wrapper>
        <div className="container">
          <h2>Register Account</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Already have an account ?<Link to="/login"> Login</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
        <div className="container">
          <h2>Register Account</h2>
          <form onSubmit={(e) => handleSubmit2(e)}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setValues({...values, [e.target.name]: e.target.value})
                }
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Already have an account ?<Link to="/login"> Login</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </Wrapper>
    </>
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
export default Register;
