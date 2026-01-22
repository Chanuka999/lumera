import React from "react";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-gray-400 overflow-hidden px-6 py-12">
      {/* ❄️ Snow Effect */}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-green-700 text-center mb-4 animate-fade-in">
          📞 Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12 animate-fade-in">
          We'd love to hear from you 🌱 Get in touch anytime
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow animate-float">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                🌿 Address
              </h3>
              <p className="text-gray-600">
                Aurora Bloom, Green Street,
                <br />
                Nature City, Sri Lanka
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow animate-float">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                📧 Email
              </h3>
              <p className="text-gray-600">chanukaranditha99@gmail.com</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow animate-float">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                📞 Phone
              </h3>
              <p className="text-gray-600">+94 77 2849767</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 hover:scale-105 transition transform duration-300"
            >
              🌱 Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
