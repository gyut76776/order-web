import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { cart, clearCart, totalPrice } = useCart();
  const [method, setMethod] = useState("QRIS");
  const navigate = useNavigate();

  const handleConfirm = async () => {
  if (!cart.length) {
    alert("Keranjang kosong!");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:4000/api/order/create",
      {
        cart,
        metode: method, // ✅ BENAR
      }
    );

    clearCart();

    navigate(`/order/${res.data.id}`, {
      state: { orderInfo: res.data },
    });
  } catch (err) {
    console.error(err);
    alert("Gagal membuat order!");
  }
};


  return (
    <div className="pt-24 p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pembayaran</h1>

        {/* Ringkasan Pesanan */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Ringkasan Pesanan</h2>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between text-gray-600 text-sm py-1">
              <span>{item.name} x {item.quantity}</span>
              <span>Rp {Number(item.price).toLocaleString("id-ID")}</span>
            </div>
          ))}
          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Metode Pembayaran</h2>
          <div className="grid grid-cols-1 gap-3">
            {["QRIS", "Transfer Bank", "Bayar di Tempat"].map((m, i) => (
              <label key={i} className={`border rounded-xl p-4 cursor-pointer flex items-center gap-3 ${method === m ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}`}>
                <input type="radio" value={m} checked={method === m} onChange={() => setMethod(m)} className="w-5 h-5"/>
                <span className="font-medium text-gray-800">{m}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bayar Sekarang */}
        <button onClick={handleConfirm} className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg hover:opacity-90 active:scale-95 transition transform duration-150">
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
