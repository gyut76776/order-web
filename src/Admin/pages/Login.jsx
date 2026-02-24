import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM SEND:", form);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/admin/auth/login",
        {
          username: form.username.trim(),
          password: form.password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (res.status === 200) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/admin");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          name="username"
          value={form.username}
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
