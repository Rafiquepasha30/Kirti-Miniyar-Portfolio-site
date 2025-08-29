export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          className="text-3xl font-bold text-teal-700"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          KIRTI MINIYAR
        </h1>

        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          <li>
            <a href="#home" className="hover:text-teal-600">
              Home
            </a>
          </li>
          <li>
            <a href="#portfolio" className="hover:text-teal-600">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-teal-600">
              Services
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-teal-600">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-teal-600">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
