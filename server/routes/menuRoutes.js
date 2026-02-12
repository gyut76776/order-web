// server/routes/menuRoutes.js
import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM menu ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /menu error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, category, img } = req.body;
    const [result] = await db.query("INSERT INTO menu (name, price, category, img) VALUES (?, ?, ?, ?)", [name, price, category, img || null]);
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("POST /menu error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, price, category, img } = req.body;
    await db.query("UPDATE menu SET name=?, price=?, category=?, img=? WHERE id=?", [name, price, category, img || null, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("PUT /menu/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM menu WHERE id=?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /menu/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
