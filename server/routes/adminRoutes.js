import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isAdmin = true; // ganti logic auth kamu

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
