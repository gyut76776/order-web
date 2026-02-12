const BASE_URL = "http://localhost:4000/admin";

export const getAllOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`);
  if (!res.ok) throw new Error("Gagal ambil data admin");
  return res.json();
};
