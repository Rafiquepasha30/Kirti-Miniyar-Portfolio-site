export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Hi, I’m{" "}
          <span className="font-semibold text-orange-600">Kirti Miniyar</span>, a passionate interior designer
          who believes every space tells a story. My focus is on creating
          beautiful, functional, and personalized interiors that reflect the
          unique lifestyle of my clients. From modern 2D drawings and drafting
          to innovative 3D design visualizations, I bring ideas to life with
          creativity and precision.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          I specialize in designing both <span className="font-semibold text-orange-600">Commercial & Residential Interiors</span>, 
          ensuring every project is tailored to match style, comfort, and functionality.
        </p>
        <a
          href="/Kirti_Miniyar_Portfolio.pdf"
          download
          className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow hover:bg-teal-700 transition"
        >
          Download Portfolio
        </a>
      </div>
    </section>
  );
}
