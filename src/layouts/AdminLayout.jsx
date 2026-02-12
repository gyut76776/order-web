import { useState } from "react";
import Sidebar from "../Admin/components/Sidebar";
import AdminDashboard from "../Admin/pages/Dashboard";
import Pesanan from "../Admin/pages/Pesanan";
import Menu from "../Admin/pages/Menu";
import Pelanggan from "../Admin/pages/Pelanggan";
import Barista from "../Admin/pages/barista";
import Kitchen from "../Admin/pages/kitchen";

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
