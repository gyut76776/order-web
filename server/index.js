import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";



const app = express();

app.use(cors());
app.use(express.json()); // 🔥 WAJIB, TANPA INI REQUEST HANG

app.use("/api/order", orderRoutes);
app.use("/api/admin/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Backend OK");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
