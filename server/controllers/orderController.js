import db from "../db.js";


// Estimasi default tiap divisi (menit)
const ESTIMASI_DEFAULT = {
  cashier: 3,   // selalu 3 menit
  bar: 5,       // per item drink
  kitchen: 7,   // per item food
};

// Buat order baru
export const createOrder = async (req, res) => {
  try {
    const { cart, metode } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Keranjang kosong" });
    }

    if (!metode) {
      return res.status(400).json({ message: "Metode pembayaran wajib diisi" });
    }

    // Hitung total harga
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Ambil queue_number terakhir
    const [lastQueue] = await db.query("SELECT MAX(queue_number) as maxQueue FROM orders");
    const queueNumber = (lastQueue[0].maxQueue || 0) + 1;

    // Hitung estimasi untuk barista dan kitchen
    let estimasiBar = 0;
    let estimasiKitchen = 0;

    cart.forEach(item => {
      if (item.category === "drink") estimasiBar += ESTIMASI_DEFAULT.bar * item.quantity;
      if (item.category === "food") estimasiKitchen += ESTIMASI_DEFAULT.kitchen * item.quantity;
    });

    // Insert order baru ke database
    const [result] = await db.query(
      `INSERT INTO orders 
       (items, total, metode, queue_number, status, estimasi_cashier, estimasi_bar, estimasi_kitchen) 
       VALUES (?, ?, ?, ?, 'waiting', ?, ?, ?)`,
      [
        JSON.stringify(cart),
        total,
        metode,
        queueNumber,
        ESTIMASI_DEFAULT.cashier, // kasir selalu 3 menit
        estimasiBar,
        estimasiKitchen
      ]
    );

    // Ambil order baru
    const [newOrder] = await db.query("SELECT * FROM orders WHERE id = ?", [result.insertId]);
    if (newOrder.length === 0) return res.status(500).json({ message: "Gagal membuat order" });

    // Kirim balik data order lengkap
    res.json({
      id: newOrder[0].id,
      queue_number: newOrder[0].queue_number,
      status: newOrder[0].status,
      items: JSON.parse(newOrder[0].items),
      total: newOrder[0].total,
      metode: newOrder[0].metode,
      estimasi_cashier: newOrder[0].estimasi_cashier,
      estimasi_bar: newOrder[0].estimasi_bar,
      estimasi_kitchen: newOrder[0].estimasi_kitchen,
    });

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Cek status order
export const getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // ambil ID order dari URL
    const [rows] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Order tidak ditemukan" });

    const order = rows[0];
    if (typeof order.items === "string") order.items = JSON.parse(order.items);

    res.json({
      id: order.id,
      queue_number: order.queue_number,
      status: order.status,
      items: order.items,
      total: order.total,
      metode: order.metode,
      estimasi_cashier: order.estimasi_cashier,
      estimasi_bar: order.estimasi_bar,
      estimasi_kitchen: order.estimasi_kitchen,
    });
  } catch (err) {
    console.error("GET ORDER STATUS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

