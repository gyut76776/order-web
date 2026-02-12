import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function QueuePage() {
  const { state } = useLocation();
  const orderId = state?.orderId;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const getStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/order-status/${orderId}`
        );
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getStatus(); // fetch pertama

    const interval = setInterval(getStatus, 2000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <p className="pt-24 p-6">Loading...</p>;

  return (
    <div className="pt-24 p-6">
      <h1 className="text-3xl font-bold mb-2">Nomor Antrian #{order.id}</h1>
      <p>Status: {order.status}</p>

      <div className="mt-4 bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Estimasi Waktu (menit)</h3>

        <p>Kasir: {order.remaining?.cashier?? ""}</p>
        <p>Bar: {order.remaining?.bar ?? ""}</p>
        <p>Dapur: {order.remaining?.kitchen ?? ""}</p>
      </div>

      {order.status === "done" && (
        <div className="mt-4 p-4 bg-green-200 text-green-900 font-bold rounded">
          Pesanan siap diantar!
        </div>
      )}
    </div>
  );
}
