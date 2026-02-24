import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Search } from "lucide-react";

export default function PesananCard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  /* =============================
     FETCH ORDER
  ============================== */
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/order");

      // Parse items jadi array kalau masih string
      const parsedOrders = res.data.map(order => ({
        ...order,
        items: Array.isArray(order.items)
          ? order.items
          : order.items
            ? JSON.parse(order.items)
            : []
      }));

      setOrders(parsedOrders);
    } catch (err) {
      console.error("Gagal ambil data pesanan:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =============================
     UPDATE STATUS
  ============================== */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/order/status/${id}`,
        { status }
      );
      fetchOrders();
    } catch (err) {
      console.error("Gagal update status:", err);
    }
  };

  /* =============================
     FILTER DATA
  ============================== */
  const filteredOrders = orders.filter((o) => {
    const matchStatus =
      filter === "all" ? true : o.status === filter;

    const matchSearch =
      o.id.toString().includes(search) ||
      o.queue_number?.toString().includes(search);

    return matchStatus && matchSearch;
  });

  /* =============================
     STATUS BADGE
  ============================== */
  const statusBadge = (status) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-700";
      case "process":
        return "bg-blue-100 text-blue-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /* =============================
     HITUNG TOTAL
  ============================== */
  const calcTotal = (items) =>
    items.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AdminNavbar />

        {/* ================= FILTER BAR ================= */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between bg-white p-4 rounded-xl shadow-sm">
          {/* SEARCH */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Cari ID / Antrian"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* FILTER STATUS */}
          <div className="flex gap-2">
            {["all", "waiting", "process", "done"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition
                  ${
                    filter === s
                      ? "bg-slate-900 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                {s === "all" && "Semua"}
                {s === "waiting" && "Menunggu"}
                {s === "process" && "Diproses"}
                {s === "done" && "Selesai"}
              </button>
            ))}
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition flex flex-col justify-between">
                {/* ID & Queue */}
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">#{order.id}</span>
                  <span className="text-gray-500 text-sm">Antrian: {order.queue_number}</span>
                </div>

                {/* Total */}
                <div className="mb-2">
                  <span className="text-gray-700 font-medium">Total: Rp {calcTotal(order.items).toLocaleString("id-ID")}</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(order.status)}`}>{order.status}</span>
                </div>

                {/* Produk list */}
                <div className="mb-3">
                  {Array.isArray(order.items) && order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-700 border-b py-1">
                      <span>{item.name}</span>
                      <span>{item.qty}x</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    disabled={order.status !== "waiting"}
                    onClick={() => updateStatus(order.id, "process")}
                    className="flex-1 px-3 py-1 bg-yellow-500 disabled:opacity-40 text-white rounded text-xs"
                  >
                    Proses
                  </button>
                  <button
                    disabled={order.status !== "process"}
                    onClick={() => updateStatus(order.id, "done")}
                    className="flex-1 px-3 py-1 bg-green-500 disabled:opacity-40 text-white rounded text-xs"
                  >
                    Selesai
                  </button>
                  <button
                    onClick={() => setOrders((prev) => prev.filter((o) => o.id !== order.id))}
                    className="flex-1 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-20">Tidak ada pesanan</div>
          )}
        </div>
      </div>
    </div>
  );
}
