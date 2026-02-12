import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderInfoPage = () => {
  const { orderId } = useParams(); // ambil ID dari URL
  const [order, setOrder] = useState(null);

  // countdown estimasi (menit)
  const [countdowns, setCountdowns] = useState({ cash: 0, bar: 0, kitchen: 0 });

  // Fetch status order tiap 5 detik
  useEffect(() => {
  if (!orderId) return;

  let intervalId;

  const fetchStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/order/status/${orderId}`
      );

      const data = { ...res.data };

      // Parsing items aman
      if (typeof data.items === "string") {
        try {
          data.items = JSON.parse(data.items);
        } catch {
          data.items = [];
        }
      }

      setOrder(data);

      // Update countdown hanya sekali / jika masih aktif
      setCountdowns(prev => ({
        cash:
          prev.cash === 0 && data.estimasi_cashier > 0
            ? data.estimasi_cashier
            : prev.cash,

        bar:
          prev.bar === 0 && data.estimasi_bar > 0
            ? data.estimasi_bar
            : prev.bar,

        kitchen:
          prev.kitchen === 0 && data.estimasi_kitchen > 0
            ? data.estimasi_kitchen
            : prev.kitchen,
      }));

      // STOP polling jika order selesai
      if (data.status === "done" || data.status === "cancelled") {
        clearInterval(intervalId);
      }

    } catch (err) {
      // 404 = order belum siap → abaikan
      if (err.response?.status !== 404) {
        console.error("Fetch status error:", err);
      }
    }
  };

  fetchStatus();
  intervalId = setInterval(fetchStatus, 5000);

  return () => clearInterval(intervalId);
}, [orderId]);


  // decrement countdown setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdowns(prev => ({
        cash: prev.cash > 0 ? prev.cash - 1 : 0,
        bar: prev.bar > 0 ? prev.bar - 1 : 0,
        kitchen: prev.kitchen > 0 ? prev.kitchen - 1 : 0,
      }));
    }, 60000); // 1 menit = 60.000ms

    return () => clearInterval(timer);
  }, []);

  if (!order) return <p className="text-center mt-32 text-gray-500">Loading...</p>;

  const statusColors = {
    waiting: "bg-red-400",
    process: "bg-blue-500",
    done: "bg-green-500",
  };

  return (
    <div className="pt-32 px-4 max-w-xl mx-auto space-y-6">
      {/* Nomor Antrian & Status */}
      <div className="text-center animate-pulse">
        <h1 className="text-5xl font-extrabold text-gray-800">Antrian #{order.queue_number}</h1>
        <span className={`inline-block mt-2 px-4 py-1 rounded-full text-white font-medium ${statusColors[order.status]}`}>
          {order.status.toUpperCase()}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${statusColors[order.status]}`}
          style={{
            width:
              order.status === "waiting"
                ? "33%"
                : order.status === "process"
                ? "66%"
                : "100%",
          }}
        ></div>
      </div>

      {/* Estimasi Realtime */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-500">Kasir</p>
          <p className="mt-2 text-xl font-semibold">{countdowns.cash} menit</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-500">Barista</p>
          <p className="mt-2 text-xl font-semibold">{countdowns.bar} menit</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-500">Kitchen</p>
          <p className="mt-2 text-xl font-semibold">{countdowns.kitchen} menit</p>
        </div>
      </div>

      {/* Ringkasan Order */}
      <div className="bg-white rounded-xl shadow p-4 divide-y divide-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Detail Order</h2>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between py-1">
            <span>{item.name} x {item.quantity}</span>
            <span>Rp {Number(item.price).toLocaleString("id-ID")}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold pt-2">
          <span>Total</span>
          <span>Rp {Number(order.total).toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoPage;
