// pages/api/pelanggan.js
import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "passwordmu",
  database: "namadb",
};

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);

    if (req.method === "GET") {
      // Ambil data pelanggan dari transaksi
      const [rows] = await connection.execute(`
        SELECT 
          t.id_pelanggan, 
          p.nama, 
          t.tipe, 
          SUM(t.total) as total_transaksi
        FROM transaksi t
        JOIN pelanggan p ON t.id_pelanggan = p.id
        GROUP BY t.id_pelanggan, p.nama, t.tipe
        ORDER BY total_transaksi DESC
      `);
      res.status(200).json(rows);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }

    await connection.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
