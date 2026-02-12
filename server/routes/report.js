import express from "express";
import db from "../db.js";
import { authMiddleware } from "./auth.js";

const router = express.Router();

// Riwayat pesanan (admin/kasir)
router.get("/history", authMiddleware(["admin","kasir"]), async (req,res)=>{
  try{
    const [orders] = await db.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(orders);
  }catch(err){
    console.error(err);
    res.status(500).json({message:"Server error"});
  }
});

// Statistik antrian per kategori
router.get("/stats", authMiddleware(["admin","kasir"]), async (req,res)=>{
  try{
    const [stats] = await db.query(`
      SELECT division, COUNT(*) AS total, 
      SUM(CASE WHEN status='waiting' THEN 1 ELSE 0 END) AS waiting,
      SUM(CASE WHEN status='processing' THEN 1 ELSE 0 END) AS processing,
      SUM(CASE WHEN status='done' THEN 1 ELSE 0 END) AS done
      FROM orders GROUP BY division
    `);
    res.json(stats);
  }catch(err){
    console.error(err);
    res.status(500).json({message:"Server error"});
  }
});

export default router;
