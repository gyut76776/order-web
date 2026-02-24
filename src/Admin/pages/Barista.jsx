import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";

  const initialOrders = [
  {
    id: 101,
    table: "Meja 1",
    items: [
      { name: "Kopi Latte", qty: 2 },
      { name: "Soft Drink", qty: 1 },
    ],
    status: "Menunggu",
    waitingTime: 10 * 60, // detik
  },
  {
    id: 102,
    table: "Meja 2",
    items: [{ name: "Kopi Espresso", qty: 1 }],
    status: "Sedang Disiapkan",
    waitingTime: 5 * 60, // detik
  },
  {
    id: 103,
    table: "Meja 3",
    items: [
      { name: "Cappuccino", qty: 1 },
      { name: "Teh Tarik", qty: 2 },
    ],
    status: "Menunggu",
    waitingTime: 12 * 60, // detik
  },
];

export default function BaristaPageInteractive() {
  const [orders, setOrders] = useState(initialOrders);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.waitingTime > 0 && order.status !== "Siap Diantar") {
            return { ...order, waitingTime: order.waitingTime - 1 };
          }
          return order;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Convert detik ke format mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Update status
  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <AdminNavbar />
  
     <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Pesanan Barista </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orders.map((order) => {
          const isUrgent = order.waitingTime <= 120 && order.status !== "Siap Diantar"; // <2 menit
          return (
            <div
              key={order.id}
              className={`bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow flex flex-col justify-between border-l-4 ${
                isUrgent ? "border-red-500" : "border-transparent"
              }`}
            >
              {/* Header: ID & Meja */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">ID: {order.id}</h2>
                <span className="text-sm text-gray-500">{order.table}</span>
              </div>

              {/* Items List */}
              <div className="mb-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-gray-700 text-sm mb-1"
                  >
                    <span>
                      {item.qty} x {item.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status & Timer */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    order.status === "Menunggu"
                      ? "bg-yellow-500"
                      : order.status === "Sedang Disiapkan"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {order.status}
                </span>
                <span className="text-gray-500 text-sm">{formatTime(order.waitingTime)}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                {order.status === "Menunggu" && (
                  <button
                    onClick={() => updateStatus(order.id, "Sedang Disiapkan")}
                    className="flex-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Mulai Masak
                  </button>
                )}
                {order.status === "Sedang Disiapkan" && (
                  <button
                    onClick={() => updateStatus(order.id, "Siap Diantar")}
                    className="flex-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
                  >
                    Siap Diantar
                  </button>
                )}
                <button
                  onClick={() =>
                    setOrders((prev) => prev.filter((o) => o.id !== order.id))
                  }
                  className="flex-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>

        
      </div>
    </div>
  );
}
