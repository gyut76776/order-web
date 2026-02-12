import React from "react";

export default function MenuCard({ menu, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={menu.img} alt={menu.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2 text-center">
          {menu.name}</h3>
        <p className="text-blue-950 font-bold mb-4">
          Rp {menu.price.toLocaleString()}
        </p>
        <p className="text-gray-600 text-sm mt-1 m-2  leading-relaxed">
              {menu.desc}
            </p>
        <button
          onClick={onAddToCart}
          className="bg-blue-950 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
}
