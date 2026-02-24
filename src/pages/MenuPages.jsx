import React from "react";
import { useParams } from "react-router-dom";
import MenuCard from "../components/menuCard";

export default function MenuPage() {
  const { id } = useParams();

  // Data tiap kategori
  const menuData = {
    rekomendasi: {
      title: "Rekomendasi Nilu Coffee",
      subtitle: "Menu favorit pelanggan yang wajib kamu coba!",
      items: Array.from({ length: 10 }).map((_, i) => ({
        id: `rekomendasi-${i + 1}`,
        name: `Menu Rekomendasi ${i + 1}`,
        price: 20000 + i * 2000,
        img: `https://source.unsplash.com/400x300/?coffee,menu-${i + 1}`,
        category : "kitchen",
        duration: 3
      })),
    },
    seasonal: {
      title: "Seasonal Menu",
      subtitle: "Nikmati menu musiman yang cuma ada di waktu tertentu!",
      items: Array.from({ length: 10 }).map((_, i) => ({
        id: `seasonal-${i + 1}`,
        name: `Seasonal Menu ${i + 1}`,
        price: 25000 + i * 1500,
        img: `https://source.unsplash.com/400x300/?seasonal,coffee-${i + 1}`,
        category : "kitchen",
        duration: 3
      })),
    },
    paket: {
      title: "Paket Makan & Minum",
      subtitle: "Lebih hemat dengan pilihan paket lengkap.",
      items: Array.from({ length: 10 }).map((_, i) => ({
        id: `paket-${i + 1}`,
        name: `Paket Hemat ${i + 1}`,
        price: 30000 + i * 1000,
        img: `https://source.unsplash.com/400x300/?meal,combo-${i + 1}`,
        category : "kitchen",
        duration: 3
      })),
    },
    makanan: {
      title: "Aneka Makanan",
      subtitle: "Nikmati berbagai hidangan khas Nilu.",
      items: Array.from({ length: 10 }).map((_, i) => ({
       id: `makanan-${i + 1}`,
        name: `Makanan ${i + 1}`,
        price: 20000 + i * 2000,
        img: `https://source.unsplash.com/400x300/?food-${i + 1}`,
        category : "kitchen",
        duration: 3
      })),
    },
    minuman: {
      title: "Aneka Minuman",
      subtitle: "Segarkan harimu dengan minuman terbaik dari Nilu.",
      items: Array.from({ length: 10 }).map((_, i) => ({
        id: `minuman-${i + 1}`,
        name: `Minuman ${i + 1}`,
        price: 15000 + i * 1500,
        img: `https://source.unsplash.com/400x300/?drink-${i + 1}`,
        category : "bar",
        duration: 3
      })),
    },
  };

  const section = menuData[id];

  if (!section) {
    return (
      <div className="pt-24 text-center text-gray-700">
        <h2 className="text-3xl font-semibold">Kategori tidak ditemukan ☕</h2>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-amber-50 to-amber-100 min-h-screen">
      {/* Hero Title */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-amber-900 mb-2">
          {section.title}
        </h1>
        <p className="text-gray-700 text-lg">{section.subtitle}</p>
      </div>

      {/* Menu List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {section.items.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
}
