import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./Admin/routes/AdminRoute";

import Pesanan from "./Admin/pages/Pesanan";
import Menu from "./Admin/pages/menu";
import Pelanggan from "./Admin/pages/Pelanggan";
import Barista from "./Admin/pages/Barista";
import Kitchen from "./Admin/pages/Kitchen";
import Login from "./Admin/pages/Login";
import AdminDashboard from "./Admin/pages/Dashboard";

import Home from "./pages/Home";
import MenuPages from "./pages/MenuPages";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import QueuePage from "./pages/QueuePages";
import OrderInfoPage from "./pages/OrderInfoPage";


export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          {/* ================= USER ================= */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu/:id" element={<MenuPages />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/order/:orderId" element={<OrderInfoPage />} />
          </Route>

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin/login" element={<Login />} />

          {/* ================= ADMIN (PROTECTED) ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminProvider>
                  <AdminLayout />
                </AdminProvider>
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} /> {/* default */}
            <Route path="pesanan" element={<Pesanan />} /> {/* klik Pesanan */}
            <Route path="menu" element={<Menu />} /> {/* bisa ganti sesuai kebutuhan */}
            <Route path="pelanggan" element={<Pelanggan />} /> {/* contoh */}
            <Route path="barista" element={<Barista />} /> {/* contoh */}
            <Route path="kitchen" element={<Kitchen />} /> {/* contoh */}
          </Route>

        </Routes>
      </Router>
    </CartProvider>
  );
}
