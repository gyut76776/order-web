import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";

import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminRoute from "./Admin/routes/AdminRoute.jsx";

import Barista from "./Admin/pages/Barista.jsx";
import Kitchen from "./Admin/pages/Kitchen.jsx";
import Menu from "./Admin/pages/Menu.jsx";
import Pesanan from "./Admin/pages/Pesanan.jsx";
import Pelanggan from "./Admin/pages/Pelanggan.jsx";
import Login from "./Admin/pages/Login.jsx";
import AdminDashboard from "./Admin/pages/Dashboard.jsx";

import Home from "./pages/Home.jsx";
import MenuPages from "./pages/MenuPages.jsx";
import CartPage from "./pages/CartPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import QueuePage from "./pages/QueuePages.jsx";
import OrderInfoPage from "./pages/OrderInfoPage.jsx";


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
