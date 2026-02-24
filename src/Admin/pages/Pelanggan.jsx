import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";

const initialOrders = [
  {
    id: 1,
    table: "Meja 1",
    items: [
      { name: "Burger", qty: 2, price: 25000 },
      { name: "Kopi Latte", qty: 1, price: 15000 },
    ],
    status: "Sedang Diproses",
    waitingTime: "10 menit",
  },
  {
    id: 2,
    table: "Meja 3",
    items: [
      { name: "Pasta", qty: 1, price: 30000 },
      { name: "Soft Drink", qty: 2, price: 10000 },
    ],
    status: "Selesai",
    waitingTime: "0 menit",
  },
  {
    id: 3,
    table: "Meja 2",
    items: [{ name: "Burger", qty: 1, price: 25000 }],
    status: "Sedang Diproses",
    waitingTime: "5 menit",
  },
  {
    id: 4,
    table: "Meja 6",
    items: [{ name: "Burger", qty: 1, price: 25000 }],
    status: "Sedang Diproses",
    waitingTime: "5 menit",
  },
  {
    id: 5,
    table: "Meja 7 ",
    items: [{ name: "Burger", qty: 1, price: 25000 }],
    status: "Sedang Diproses",
    waitingTime: "5 menit",
  },
  {
    id: 6,
    table: "Meja 11",
    items: [{ name: "Burger", qty: 1, price: 25000 }],
    status: "Sedang Diproses",
    waitingTime: "5 menit",
  },
  {
    id: 7,
    table: "Meja 20",
    items: [{ name: "Burger", qty: 1, price: 25000 }],
    status: "Sedang Diproses",
    waitingTime: "5 menit",
  },
  {
    id: 8,
    table: "Meja 15",
    items: [{ name: "Burger", qty: 1, price: 25000 }],
    status: "Sedang Diproses",
    waitingTime: "5 menit",
  },
  {
    id: 9,
    table: "Meja 8",
    items: [{ name: "Burger", qty: 1, price: 25000 }],
    status: "Sedang Diproses",
    waitingTime: "5 menit",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  // Hitung total harga
  const calcTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.qty, 0);



  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <AdminNavbar />
  
     <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Order Pelanggan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow flex flex-col justify-between"
          >
            {/* Header: Meja & Status */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{order.table}</h2>
              <span
                className={`px-2 py-1 rounded-full text-white text-sm ${
                  order.status === "Selesai" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items List */}
            <div className="mb-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-gray-700 text-sm mb-1"
                >
                  <span>
                    {item.qty} x {item.name}
                  </span>
                  <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Footer: Total & Waiting Time */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 text-gray-800 font-semibold">
              <span>Total: Rp {calcTotal(order.items).toLocaleString()}</span>
              <span className="text-sm text-gray-500">{order.waitingTime}</span>
            </div>

            {/* Optional action buttons */}
            <div className="mt-3 flex gap-2">
              {order.status !== "Selesai" && (
                <button
                  onClick={() =>
                    setOrders((prev) =>
                      prev.map((o) =>
                        o.id === order.id ? { ...o, status: "Selesai", waitingTime: "0 menit" } : o
                      )
                    )
                  }
                  className="flex-1 bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-800 text-sm"
                >
                  Tandai Selesai
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
        ))}
      </div>
    </div>

        
      </div>
    </div>
  );
}
