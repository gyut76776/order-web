import { useState } from "react";

export default function Produk() {
  const [produk, setProduk] = useState([
    {
      id: 1,
      name: "Ayam Bakar Madu",
      price: 20000,
      img: "https://cdn-brilio-net.akamaized.net/news/2019/10/22/172646/1114926-1000xauto-14-resep-cara-membuat-ayam-bakar.jpg",
      category: "Makanan",
    },
    {
      id: 2,
      name: "Nasi Goreng Spesial",
      price: 25000,
      img: "https://cdn.idntimes.com/content-images/community/2021/11/fried-2509089-1280-bec8ca4d0cc8847c90aa5e38a58e6685-d5836399684f43cd048e2c16456f35aa.jpg",
      category: "Makanan",
    },
    {
      id: 3,
      name: "Es Teh Manis",
      price: 7000,
      img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/ice-tea-1239944_1280.jpg",
      category: "Minuman",
    },
  ]);

  const [newProduk, setNewProduk] = useState({
    name: "",
    price: "",
    img: "",
    category: "Makanan",
  });

  const handleChange = (e) => {
    setNewProduk({ ...newProduk, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      ...newProduk,
      id: produk.length + 1,
      price: Number(newProduk.price),
    };
    setProduk([...produk, newItem]);
    setNewProduk({ name: "", price: "", img: "", category: "Makanan" });
  };

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">📦 Daftar Produk</h1>

      {/* Form Tambah Produk */}
      <form
        className="mb-6 bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        onSubmit={handleAdd}
      >
        <div>
          <label className="block mb-1 font-semibold">Nama</label>
          <input
            type="text"
            name="name"
            value={newProduk.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Harga</label>
          <input
            type="number"
            name="price"
            value={newProduk.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Gambar URL</label>
          <input
            type="text"
            name="img"
            value={newProduk.img}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Kategori</label>
          <select
            name="category"
            value={newProduk.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Makanan</option>
            <option>Minuman</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Tambah Produk
          </button>
        </div>
      </form>

      {/* Daftar Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produk.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow hover:scale-105 transform transition duration-300">
            <img src={p.img} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-3" />
            <h2 className="font-bold text-lg text-blue-900">{p.name}</h2>
            <p className="text-gray-600 mb-1">{p.category}</p>
            <p className="text-blue-700 font-semibold">Rp {p.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
