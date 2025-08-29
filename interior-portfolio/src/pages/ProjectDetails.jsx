import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, User, Calendar, Layers, Folder } from "lucide-react";
import api from "../lib/api";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    api
      .get(`/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch(console.error);
  }, [slug]);

  if (!project) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
          {project.title}
        </h1>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg p-8">
          {/* Project Image */}
          <div className="overflow-hidden rounded-xl">
            <img
              src={`${BASE}/uploads/${project.heroImage}`}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Project Info */}
          <div>
            <p className="text-gray-600 mb-6">{project.description}</p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <User className="text-orange-500" />
                <span className="font-semibold text-gray-700">Client:</span>
                <span className="text-gray-600">{project.client}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <span className="font-semibold text-gray-700">Location:</span>
                <span className="text-gray-600">{project.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Folder className="text-orange-500" />
                <span className="font-semibold text-gray-700">Category:</span>
                <span className="text-gray-600">{project.category}</span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="text-orange-500" />
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="text-gray-600">
                  {new Date(project.date).toLocaleDateString()}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Layers className="text-orange-500 mt-1" />
                <div>
                  <span className="font-semibold text-gray-700 block">
                    Technologies Used:
                  </span>
                  <ul className="list-disc list-inside text-gray-600 mt-1">
                    {project.technologies.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
              Project Gallery
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={`${BASE}/uploads/${img}`}
                    alt={`Gallery ${i}`}
                    className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
