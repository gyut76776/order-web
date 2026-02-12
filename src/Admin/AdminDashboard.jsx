import { useState } from "react";
import MenuItem from "./components/MenuItem";
import Dashboard from "./pages/Dashboard";
import Pesanan from "./pages/Pesanan";
import Produk from "./pages/Produk";
import Pelanggan from "../../server/serverAdmin/pelanggan";
import Laporan from "./pages/Laporan";


import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  ClipboardList,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white">
        <div className="p-4 text-xl font-bold border-b border-slate-700">
          WEB PEMESANAN
        </div>

        <nav className="p-4 space-y-2">
          <MenuItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={activeMenu === "dashboard"}
            onClick={() => setActiveMenu("dashboard")}
          />
          <MenuItem
            icon={<ShoppingCart />}
            label="Pesanan"
            active={activeMenu === "pesanan"}
            onClick={() => setActiveMenu("pesanan")}
          />
          <MenuItem
            icon={<Package />}
            label="Produk"
            active={activeMenu === "produk"}
            onClick={() => setActiveMenu("produk")}
          />
          <MenuItem
            icon={<Users />}
            label="Pelanggan"
            active={activeMenu === "pelanggan"}
            onClick={() => setActiveMenu("pelanggan")}
          />
          <MenuItem
            icon={<ClipboardList />}
            label="Laporan"
            active={activeMenu === "laporan"}
            onClick={() => setActiveMenu("laporan")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeMenu === "dashboard" && <Dashboard />}
        {activeMenu === "pesanan" && <Pesanan />}
        {activeMenu === "produk" && <Produk />}
        {activeMenu === "pelanggan" && <Pelanggan />}
        {activeMenu === "laporan" && <Laporan />}
      </main>
    </div>
  );
}

export { AdminDashboard };
