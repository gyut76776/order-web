import express from "express";
import cors from "cors";
import db from "./db.js"; // pastikan sudah buat db.js koneksi MySQL
const app = express();

app.use(cors());
app.use(express.json());

// ========================
// POST /api/order → buat order baru
// ========================
app.post("/api/order", async (req, res) => {
  try {
    const { cart, metode, customer_name = "Pelanggan" } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Keranjang kosong" });
    }

    // Hitung total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Cari nomor antrian terbaru
    const [lastQueue] = await db.query("SELECT MAX(queue_number) as last FROM orders");
    const queue_number = (lastQueue[0].last || 0) + 1;

    // Simpan ke database
    const [result] = await db.query(
      `INSERT INTO orders 
      (customer_name, items, division, queue_number, status, total, metode, payment_method, estimasi_cashier, estimasi_bar, estimasi_kitchen) 
      VALUES (?, ?, 'kasir', ?, 'waiting', ?, ?, ?, 0, 0, 0)`,
      [customer_name, JSON.stringify(cart), queue_number, total, metode, metode]
    );

    // Return id baru dan nomor antrian
    res.status(201).json({
      id: result.insertId,
      queue_number,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ========================
// GET /api/order-status/:id → ambil status & estimasi
// ========================
app.get("/api/order-status/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Order tidak ditemukan" });

    const order = rows[0];
    res.json({
      queue_number: order.queue_number,
      status: order.status,
      estimasi_cashier: order.estimasi_cashier,
      estimasi_bar: order.estimasi_bar,
      estimasi_kitchen: order.estimasi_kitchen,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));

