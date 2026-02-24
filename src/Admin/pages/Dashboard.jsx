import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import StatCard from "../components/StatCard";

import {
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  /* =============================
     FETCH DATA ORDER (ADMIN)
  ============================== */
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/order");
      setOrders(res.data);
    } catch (err) {
      console.error("Gagal ambil data order:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =============================
     UPDATE STATUS ORDER
  ============================== */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/order/status/${id}`,
        { status }
      );

      // refresh tabel admin
      fetchOrders();
    } catch (err) {
      console.error("Gagal update status:", err);
    }
  };

  /* =============================
     HITUNG STATISTIK
  ============================== */
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );

  const waitingOrders = orders.filter(
    o => o.status === "waiting"
  ).length;

  const doneOrders = orders.filter(
    o => o.status === "done"
  ).length;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <AdminNavbar />

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            Ringkasan Pesanan
          </h1>

          {/* ================= STAT GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Jumlah Pesanan"
              value={totalOrders}
              icon={ShoppingCart}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
            />
            <StatCard
              title="Total Pendapatan"
              value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
              icon={DollarSign}
              color="bg-gradient-to-r from-green-500 to-green-600"
            />
            <StatCard
              title="Menunggu"
              value={waitingOrders}
              icon={Clock}
              color="bg-gradient-to-r from-yellow-500 to-yellow-600"
            />
            <StatCard
              title="Pesanan Selesai"
              value={doneOrders}
              icon={CheckCircle}
              color="bg-gradient-to-r from-indigo-500 to-indigo-600"
            />
          </div>

          {/* ================= RIWAYAT PESANAN ================= */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">
              Pesanan
            </h2>

            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
                <tr>
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Antrian</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3">#{order.id}</td>
                    <td>{order.queue_number}</td>
                    <td>
                      Rp {Number(order.total).toLocaleString("id-ID")}
                    </td>
                    <td className="font-medium">
                      {order.status === "waiting" && (
                        <span className="text-yellow-600">Menunggu</span>
                      )}
                      {order.status === "process" && (
                        <span className="text-blue-600">Diproses</span>
                      )}
                      {order.status === "done" && (
                        <span className="text-green-600">Selesai</span>
                      )}
                    </td>

                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          disabled={order.status !== "waiting"}
                          onClick={() =>
                            updateStatus(order.id, "process")
                          }
                          className="px-3 py-1 bg-yellow-500 disabled:opacity-40 text-white rounded text-xs"
                        >
                          Proses
                        </button>

                        <button
                          disabled={order.status === "done"}
                          onClick={() =>
                            updateStatus(order.id, "done")
                          }
                          className="px-3 py-1 bg-green-500 disabled:opacity-40 text-white rounded text-xs"
                        >
                          Selesai
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-400"
                    >
                      Belum ada pesanan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
