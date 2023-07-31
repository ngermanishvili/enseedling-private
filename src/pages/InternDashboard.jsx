import { ToastContainer } from "react-toastify";
import AuthChecker from "../components/auth/AuthActions";
import LayoutDashboard from "../layout/Layout"

export default function InternDashboard() {
  return (
    <>
      <LayoutDashboard>
        <AuthChecker />
        <ToastContainer />
      </LayoutDashboard>
    </>
  );
}
