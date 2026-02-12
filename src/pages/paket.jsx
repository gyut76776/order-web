import React from "react";
import MenuCard from "../components/menuCard";

export default function paket() {
  const menus = [
    { id: 1, name: "Pumpkin Latte", price: 22000, img: "https://source.unsplash.com/400x300/?pumpkin-latte" },
    { id: 2, name: "Caramel Macchiato", price: 25000, img: "https://source.unsplash.com/400x300/?caramel-macchiato" },
    { id: 3, name: "Matcha Frappe", price: 24000, img: "https://source.unsplash.com/400x300/?matcha" },
    { id: 4, name: "Hazelnut Coffee", price: 26000, img: "https://source.unsplash.com/400x300/?hazelnut-coffee" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <h1 className="text-4xl font-bold text-center text-amber-800 mb-10">
        Paket Makan & Minum 🍁
      </h1>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
}
