// src/api/orders.js
import axios from "axios";
const ADMIN_BASE = "http://localhost:4000/admin";

export const getOrders = (params = "") => axios.get(`${ADMIN_BASE}/orders${params}`).then(r => r.data);
export const updateOrderStatus = (id, status) => axios.put(`${ADMIN_BASE}/order/${id}/status`, { status }).then(r => r.data);
export const getStats = () => axios.get(`${ADMIN_BASE}/stats`).then(r => r.data);
