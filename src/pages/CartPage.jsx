import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, updateNote, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBayar = () => {
  if (cart.length === 0) return alert("Keranjang masih kosong!");

  const transaction = {
    id: Date.now().toString(),
    table: Math.floor(Math.random() * 20) + 1, // bisa ganti ke input meja
    customer: "Pelanggan",
    items: cart,
    total: totalPrice,
    status: "Menunggu",
    estimatedTime: 0,
  };

  // Simpan ke localStorage
  const queue = JSON.parse(localStorage.getItem("queue")) || [];
  queue.push(transaction);
  localStorage.setItem("queue", JSON.stringify(queue));

  // Simpan ID terakhir untuk pelanggan
  localStorage.setItem("lastOrderId", transaction.id);

  // Kosongkan keranjang & pindah ke halaman antrian
  clearCart();
  navigate("/queue");
};

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-gradient-to-br">
      <h1 className="text-3xl font-bold text-center text-blue-950 mb-8 flex items-center justify-center gap-2">
        <ShoppingCart size={30} /> Pesanan Anda
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 mt-16">
          <p>Keranjang masih kosong 🍽️</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-950 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition"
          >
            Lihat Menu
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <div className="divide-y divide-amber-100">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-start justify-between py-4"
              >
                {/* Kiri: Gambar dan info */}
                <div className="flex items-center gap-4 w-full sm:w-2/3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-blue-950">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-500">Jumlah: {item.quantity}</p>
                  </div>
                </div>

                {/* Kanan: tombol aksi */}
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-blue-950 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="text-sm font-medium text-gray-800 w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-blue-950 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-blue-950 hover:text-blue-800 flex items-center gap-1 ml-3"
                  >
                    <Trash2 size={18} /> Hapus
                  </button>
                </div>

                {/* Textarea catatan per item */}
                <div className="w-full sm:w-64 mt-2 sm:mt-0 sm:ml-4">
                  <textarea
                    value={item.note || ""}
                    onChange={(e) => updateNote(item.id, e.target.value)}
                    placeholder="Catatan untuk menu ini (contoh: pedas, tanpa es, dll)"
                    className="w-full bg-gray-100 rounded-md p-2 text-sm resize-none focus:ring-0 focus:outline-none"
    rows="2"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Pesanan:
              </h3>
              <p className="text-2xl font-bold text-blue-900">
                Rp {totalPrice.toLocaleString("id-ID")}
              </p>
            </div>

            <button
               onClick={() => navigate("/payment")}
              className="bg-blue-950 text-white px-8 py-3 rounded-full hover:bg-blue-950 transition text-lg font-semibold shadow-md"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
