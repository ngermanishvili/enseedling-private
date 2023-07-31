import Register from "./components/auth/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import InternDashboard from "./pages/InternDashboard";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/InternDashboard" element={<InternDashboard />} />
          <Route exact path="/update" element={<InternDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}