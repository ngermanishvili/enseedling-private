import React, { useEffect, useState } from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  // const [user, setUser] = useState({});

  // let handleCallbackResponse = (response) => {
  //   console.log(response);
  // }

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id: "431445019366-34ivq50hqso9fjlekjsvir29rv1elbjv.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })

  //   google.accounts.id.renderbutton(document)
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Cards />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}