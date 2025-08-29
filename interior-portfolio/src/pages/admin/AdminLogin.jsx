import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      navigate("/admin");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
        <input className="border rounded-lg p-3 w-full mb-3" placeholder="Email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border rounded-lg p-3 w-full mb-4" placeholder="Password" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-teal-600 text-white p-3 rounded-lg">Login</button>
      </form>
    </div>
  );
}
