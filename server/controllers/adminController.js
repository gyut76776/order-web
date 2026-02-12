import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // semua pesanan
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Gagal ambil data pesanan" });
  }
};
