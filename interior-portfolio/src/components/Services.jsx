import { FaTools, FaDraftingCompass, FaCubes, FaPencilRuler } from "react-icons/fa";

const services = [
  { title: "Renovation", desc: "Creative remodeling and interior upgrades.", icon: <FaTools /> },
  { title: "Space Planning", desc: "Smart layouts for functional living.", icon: <FaDraftingCompass /> },
  { title: "2D Drawings & Drafting", desc: "Accurate floor plans and detailed drafting.", icon: <FaPencilRuler /> },
  { title: "3D Designs visualizations", desc: "Realistic 3D visualizations for interiors.", icon: <FaCubes /> },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-900">Services</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
              <div className="text-teal-600 text-4xl mb-3 flex justify-center">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
