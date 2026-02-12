import express from "express";
import db from "../db.js";

const router = express.Router();

// GET order status
router.get("/order-status/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT status, division, items, queue_number, total FROM orders WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) return res.status(404).json({ message: "Order tidak ditemukan" });

    const order = rows[0];
    const cart = JSON.parse(order.items || "[]");

    const drinks = cart.filter(item => item.category?.toLowerCase() === "drink");
    const foods = cart.filter(item => item.category?.toLowerCase() === "food");

    const estimasi = {
      cashier: 2,
      bar: drinks.length > 0 ? 5 : 0,
      kitchen: foods.length > 0 ? 10 : 0
    };

    res.json({
      success: true,
      id: req.params.id,
      queueNumber: order.queue_number,
      division: order.division,
      status: order.status,
      total: order.total,
      estimasi
    });
  } catch (err) {
    console.error("GET /api/order-status/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
