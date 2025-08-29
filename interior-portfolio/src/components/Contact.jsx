export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Me</h2>
        
        <form
          action="mailto:kirtiminiyar7111@gmail.com"
          method="POST"
          encType="text/plain"
          className="grid gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-3 border rounded-lg"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="p-3 border rounded-lg"
            required
          ></textarea>
          
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
