import React from "react";
// snow animation css

const About = () => {
  return (
    <div className="relative bg-gray-400 min-h-screen overflow-hidden px-6 py-12">
      {/* ❄️ Snow Effect */}
      <div className="snow"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-green-700 text-center mb-12 animate-fade-in">
          🌱 Our Story
        </h1>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          {/* Text */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-green-600">Aurora Bloom</span>{" "}
              started with a simple idea:
            </p>

            <p className="text-gray-600 leading-relaxed">
              To connect people with nature in the easiest way possible. What
              began as a small passion for plants has grown into a platform
              where plant lovers explore, learn, and grow.
            </p>

            <p className="mt-4 text-green-600 font-medium">
              🌍 We grow responsibly — for you and the planet.
            </p>
          </div>

          {/* Image */}
          <img
            src="/home.jpg"
            alt="Plant"
            className="w-full max-w-md mx-auto animate-float hover:scale-105 transition duration-500"
          />
        </div>

        {/* Why Choose Us */}
        <h2 className="text-3xl font-semibold text-green-700 text-center mb-8">
          🌼 Why Choose Aurora Bloom?
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {["/home2.jpg", "/home3.jpg", "/home4.jpg", "/home.jpg"].map(
            (img, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:-translate-y-2 transition duration-300 text-center"
              >
                <img
                  src={img}
                  alt="plant"
                  className="h-32 mx-auto animate-float"
                />
              </div>
            ),
          )}
        </div>

        {/* Vision */}
        <div className="bg-green-100 rounded-2xl p-10 text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">
            🌿 Our Vision
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            To build a greener future by encouraging plant-based living and
            helping people reconnect with nature — one plant at a time.
          </p>
        </div>

        {/* Promise */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            🌸 Our Promise
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "💚 Freshness guaranteed",
              "💚 Safe delivery",
              "💚 Customer happiness",
              "💚 Nature-first mindset",
            ].map((p, i) => (
              <span
                key={i}
                className="bg-white px-6 py-3 rounded-full shadow-md animate-float"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
