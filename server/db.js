import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",        // sesuaikan kalau ada
  database: "nilu_orders", // 🔥 DATABASE YANG BENAR
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
