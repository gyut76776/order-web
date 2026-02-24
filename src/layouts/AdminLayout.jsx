import { useState } from "react";
import Sidebar from "../Admin/components/Sidebar.jsx";
import AdminDashboard from "../Admin/pages/Dashboard.jsx";
import Pesanan from "../Admin/pages/Pesanan.jsx";
import Menu from "../Admin/pages/Menu.jsx";
import Pelanggan from "../Admin/pages/Pelanggan.jsx";
import Barista from "../Admin/pages/Barista.jsx";
import Kitchen from "../Admin/pages/Kitchen.jsx";

export default function AdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="flex-1 p-6">
        {activePage === "dashboard" && <AdminDashboard />}
        {activePage === "pesanan" && <Pesanan />}
        {activePage === "menu" && <Menu/>}
        {activePage === "pelanggan" && <Pelanggan/>}
        {activePage === "barista" && <Barista/>}
        {activePage === "kitchen" && <Kitchen/>}

      </main>
    </div>
  );
}
