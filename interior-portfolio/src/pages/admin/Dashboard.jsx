import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const load = () => api.get("/projects").then((r) => setItems(r.data));
  useEffect(() => {
    load();
  }, []);

  const del = async (id) => {
    if (!confirm("Delete project?")) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/admin/login");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex gap-2">
          <Link
            to="/admin/new"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            New
          </Link>
          <button onClick={logout} className="border px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={`${BASE}/uploads/${p.heroImage}`}
              alt={p.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-gray-500 text-sm">{p.shortDescription}</p>
              <div className="flex gap-2 mt-3">
                <Link
                  to={`/admin/edit/${p._id}`}
                  className="px-3 py-1 border rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={() => del(p._id)}
                  className="px-3 py-1 border rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
