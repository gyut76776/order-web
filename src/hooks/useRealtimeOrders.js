// src/hooks/useRealtimeOrders.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useRealtimeOrders(query = "") {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const url = `http://localhost:4000/admin/orders${query}`;
      const res = await axios.get(url);
      setOrders(res.data);
    } catch (err) {
      console.error("fetchOrders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const t = setInterval(fetchOrders, 3000); // polling 3s
    return () => clearInterval(t);
  }, [query]);

  return { orders, loading, refresh: fetchOrders };
}
