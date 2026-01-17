import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Site Info */}
        <div>
          <h2 className="text-xl font-semibold">Aurora Bloom</h2>
          <p className="text-sm mt-2 text-green-100">
            Bringing nature closer to your home with healthy and beautiful
            plants.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          <ul className="space-y-1 text-green-100">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/plants" className="hover:underline">
                Plants
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-medium mb-2">Contact</h3>
          <p className="text-green-100 text-sm">📧 aurorabloom@gmail.com</p>
          <p className="text-green-100 text-sm">📞 +94 77 123 4567</p>
          <p className="text-green-100 text-sm">📍 Sri Lanka</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm bg-green-800 py-3 text-green-100">
        © {new Date().getFullYear()} Aurora Bloom. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
