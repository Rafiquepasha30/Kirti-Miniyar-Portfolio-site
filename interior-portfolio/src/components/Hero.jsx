export default function Hero() {
  return (
    <section
      id="home"
      className="h-[90vh] bg-cover bg-center flex items-center justify-start px-6 md:px-20"
      style={{ backgroundImage: "url('/hero.jpg')" }} // put hero.jpg inside public/
    >
      <div className="bg-black/40 p-8 rounded-lg text-white max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Transforming Spaces with Fresh Ideas
        </h1>
        <p className="text-lg md:text-xl">
          Modern interiors that blend beauty and functionality.
        </p>
      </div>
    </section>
  );
}
