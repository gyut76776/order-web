import db from "../db.js";
import bcrypt from "bcryptjs";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM admins WHERE username = ?",
      [username.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }

    const admin = rows[0];

    const isMatch = await bcrypt.compare(password.trim(), admin.password);

    console.log("LOGIN MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    return res.status(200).json({
      message: "Login berhasil",
      admin: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

