import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react"; // ✅ ikon dari lucide-react

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const scrollToSection = (id) => {
    navigate("/"); // pindah ke halaman utama
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => scrollToSection("rekomendasi")}
          className="text-2xl font-bold text-blue-950 cursor-pointer"
        >
         Nilu Coffee
        </h1>

        {/* Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-950 cursor-pointer" onClick={() => scrollToSection("rekomendasi")}>
            Rekomendasi
          </li>
          <li className="hover:text-blue-950  cursor-pointer" onClick={() => scrollToSection("makanan")}>
            Makanan
          </li>
          <li className="hover:text-blue-950 cursor-pointer" onClick={() => scrollToSection("minuman")}>
            Minuman
          </li>
          <li className="hover:text-blue-950  cursor-pointer" onClick={() => scrollToSection("paket")}>
            Paket
          </li>
          <li className="hover:text-blue-950 cursor-pointer" onClick={() => scrollToSection("seasonal")}>
            Seasonal
          </li>
        </ul>


        {/* Keranjang */}
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <ShoppingCart className="w-6 h-6 text-blue-800" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
