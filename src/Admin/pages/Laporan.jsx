import { useState, useEffect } from "react";

export default function LaporanCard() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Dummy data
  const dummyData = [
    { id: 1, tanggal: "2026-01-01", pelanggan: "Andi", tipe: "Takeaway", total: 50000 },
    { id: 2, tanggal: "2026-01-02", pelanggan: "Budi", tipe: "Dine In", total: 75000 },
    { id: 3, tanggal: "2026-01-03", pelanggan: "Citra", tipe: "Takeaway", total: 30000 },
    { id: 4, tanggal: "2026-01-04", pelanggan: "Dewi", tipe: "Dine In", total: 120000 },
    { id: 5, tanggal: "2026-01-05", pelanggan: "Eko", tipe: "Takeaway", total: 45000 },
    { id: 6, tanggal: "2026-01-05", pelanggan: "fina", tipe: "Takeaway", total: 45000 },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLaporan(dummyData);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = laporan.filter(item =>
    item.pelanggan.toLowerCase().includes(search.toLowerCase())
  );

  const totalTransaksi = filtered.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="p-6 bg-gradient-to-br from-white-50 via-white-50 to-yellow-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700">Laporan Penjualan</h1>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Cari pelanggan..."
          className="borounded-lg shadow focus:ring-2 focus:ring-purple-400 w-full md:w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-blue-600 font-semibold">Loading data...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transform transition duration-300 "
              >
                <div className="flex justify-between mb-2">
                  <span className="text-blue-700 font-bold">{item.pelanggan}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      item.tipe === "Takeaway" ? "bg-green-400" : "bg-blue-400"
                    }`}
                  >
                    {item.tipe}
                  </span>
                </div>
                <p className="text-gray-500 mb-2">Tanggal: {item.tanggal}</p>
                <p className="text-green-700 font-bold text-lg">
                  Rp {item.total.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-200 rounded-lg text-blue-800 font-bold text-right">
            Total Filtered: Rp {totalTransaksi.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}
