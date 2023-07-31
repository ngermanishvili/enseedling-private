import { ToastContainer } from "react-toastify";
import AuthChecker from "../../auth/authChecker";
import LayoutDashboard from "../../../layout/Layout";

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
