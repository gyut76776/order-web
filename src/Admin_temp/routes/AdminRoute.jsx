import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
