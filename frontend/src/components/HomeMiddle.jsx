import axios from "axios";
import ImageSection from "./ImageSection";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

const HomeMiddle = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((responce) => {
          // API returns { data: products }
          setProducts(responce.data?.data || []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products", error);
          setIsLoading(false);
          toast.error("failed to load products");
        });
    }
  }, [isLoading]);

  // Array of 4 wallpaper images
  const wallpapers = [
    "../public/home.jpg",
    "../public/home2.jpg",
    "../public/home3.jpg",
    "../public/home4.jpg",
  ];

  // Navigate to previous image
  const handlePrevious = () => {
    setActiveImage((prev) => (prev === 0 ? wallpapers.length - 1 : prev - 1));
  };

  // Navigate to next image
  const handleNext = () => {
    setActiveImage((prev) => (prev === wallpapers.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full relative">
      {/* Main Image Display */}
      <div className="w-full h-[500px] overflow-hidden relative group">
        <img
          src={wallpapers[activeImage]}
          alt={`Wallpaper ${activeImage + 1}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Left Arrow Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Scrollbar/Indicator Dots */}
      <div className="flex justify-center items-center gap-3 mt-4 pb-6">
        {wallpapers.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer hover:opacity-80 ${
              activeImage === index
                ? "w-12 h-3 bg-blue-600"
                : "w-3 h-3 bg-gray-400 hover:bg-gray-600"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      <ImageSection />
      <div className="w-full h-full flex flex-row flex-wrap justify-center items-center p-3">
        {products.map((item) => {
          return <ProductCard key={item.productId} product={item} />;
        })}
      </div>
    </div>
  );
};

export default HomeMiddle;
