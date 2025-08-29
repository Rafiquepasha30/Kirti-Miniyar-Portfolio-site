import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/projects")
      .then((r) => setItems(r.data))
      .catch(console.error);
  }, []);

  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const PUBLIC_BASE = API.replace(/\/api\/?$/, "");

  // helper to safely join (handles leading slash)
  const imgURL = (path) =>
    `${PUBLIC_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  return (
    <section id="portfolio" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10">Portfolio</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
            onClick={() => navigate(`/project/${p.slug}`)}
          >
            <img
              src={imgURL(p.heroImage)}
              alt={p.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-600">{p.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
