import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Search } from "lucide-react";


const initialMenu = [
  {
    id: 1,
    name: "Burger",
    category: "Makanan",
    price: 25000,
    status: "Aktif",
    description: "Burger daging sapi dengan keju dan sayuran segar",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Kopi Latte",
    category: "Minuman",
    price: 15000,
    status: "Non-Aktif",
    description: "Kopi espresso dengan susu panas yang lembut",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.6Lb2xzBM3B6maFHPDwhw5AHaE8?pid=Api&P=0&h=180",
  },
  {
    id: 3,
    name: "Soft Drink",
    category: "Minuman",
    price: 10000,
    status: "Aktif",
    description: "Minuman bersoda segar dingin",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Soft Drink",
    category: "Minuman",
    price: 10000,
    status: "Aktif",
    description: "Minuman bersoda segar dingin",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
  },

];

export default function MenuPage() {
  const [menu, setMenu] = useState(initialMenu);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Makanan",
    price: "",
    status: "Aktif",
    description: "",
    image: "",
  });

  // Filtered menu
  const filteredMenu = menu.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || item.category === filter)
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open modal for add/edit
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "Makanan",
        price: "",
        status: "Aktif",
        description: "",
        image: "",
      });
    }
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => setModalOpen(false);

  // Save menu item
  const handleSave = () => {
    if (!formData.name || !formData.price) return alert("Nama dan harga wajib diisi");

    if (editingItem) {
      // Update
      setMenu((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...formData, id: item.id } : item))
      );
    } else {
      // Create
      const newItem = {
        ...formData,
        id: menu.length ? Math.max(...menu.map((i) => i.id)) + 1 : 1,
      };
      setMenu((prev) => [...prev, newItem]);
    }
    closeModal();
  };

  // Delete menu item
  const handleDelete = (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus menu ini?")) {
      setMenu((prev) => prev.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <AdminNavbar />
  
     <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
          onClick={() => openModal()}
        >
          Tambah Menu
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md bg-white mb-6">
        <table className="min-w-full">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nama Menu</th>
              <th className="py-3 px-4 text-left">Kategori</th>
              <th className="py-3 px-4 text-left">Harga</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Menu tidak ditemukan
                </td>
              </tr>
            ) : (
              filteredMenu.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">Rp {item.price.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        item.status === "Aktif" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Grid Card Produk */}
      <h2 className="text-xl font-bold mb-4">Preview Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-blue-700 font-bold mb-2">
                Rp {item.price.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? "Edit Menu" : "Tambah Menu"}
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Nama Menu"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Harga"
                value={formData.price}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="image"
                placeholder="URL Gambar"
                value={formData.image}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Deskripsi singkat"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Aktif">Aktif</option>
                <option value="Non-Aktif">Non-Aktif</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

        
      </div>
    </div>
  );
}
