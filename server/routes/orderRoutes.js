import express from "express";
import db from "../db.js"; // sesuaikan koneksi mysql kamu

const router = express.Router();

/* =========================
   BUAT ORDER (PELANGGAN)
========================= */
router.post("/create", async (req, res) => {
  const { cart, metode } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart kosong" });
  }

  try {
    // 🔢 HITUNG NOMOR ANTRIAN (order yang masih waiting / process)
    const [[{ totalQueue }]] = await db.query(`
      SELECT COUNT(*) AS totalQueue 
      FROM orders 
      WHERE status IN ('waiting', 'process')
    `);

    const queueNumber = totalQueue + 1;

    // ⏱️ ESTIMASI (contoh statis, bisa kamu ubah)
    const estimasi_cashier = 5;
    const estimasi_bar = 7;
    const estimasi_kitchen = 10;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const [result] = await db.query(
      `INSERT INTO orders 
      (items, total, metode, status, queue_number, estimasi_cashier, estimasi_bar, estimasi_kitchen) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        JSON.stringify(cart),
        total,
        metode,
        "waiting",
        queueNumber,
        estimasi_cashier,
        estimasi_bar,
        estimasi_kitchen
      ]
    );

    res.json({
      id: result.insertId,
      queue_number: queueNumber,
      estimasi_cashier,
      estimasi_bar,
      estimasi_kitchen,
      status: "waiting"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


/* =========================
   GET SEMUA ORDER (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   STATUS ORDER (PELANGGAN)
========================= */
router.get("/status/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM orders WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =========================
   UPDATE STATUS ORDER (ADMIN)
========================= */

/* =========================
   UPDATE STATUS ORDER (ADMIN)
========================= */
router.put("/status/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const allowedStatus = ["waiting", "process", "done"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Status tidak valid" });
  }

  try {
    await db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({ message: "Status berhasil diupdate", status });
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
