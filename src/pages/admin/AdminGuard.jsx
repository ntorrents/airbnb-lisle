import { Navigate, Outlet } from "react-router-dom";
import { useCms } from "../../cms/CmsContext";
import "./Admin.css";

const AdminGuard = () => {
  const { authed } = useCms();
  if (!authed) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

export default AdminGuard;
