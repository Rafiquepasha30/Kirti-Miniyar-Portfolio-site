import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50" id="portfolio">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Our Portfolio
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Link
              key={p._id}
              to={`/projects/${p.slug}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={`${BASE}/uploads/${p.heroImage}`}
                alt={p.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm">{p.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
