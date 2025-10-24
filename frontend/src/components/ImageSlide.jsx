import React, { useState } from "react";

const ImageSlide = (props) => {
  const images = Array.isArray(props.images) ? props.images : [];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-[400px] ">
      {images[activeImage] ? (
        <img
          className="w-full h-[400px] object-cover"
          src={images[activeImage]}
          alt={"image-" + activeImage}
        />
      ) : (
        <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center text-sm text-gray-500">
          No image
        </div>
      )}
      <div className="w-full h-[100px] flex gap-2 justify-center items-center">
        {images.map((img, index) => {
          return img ? (
            <img
              onClick={() => {
                setActiveImage(index);
              }}
              key={index}
              className={`w-[90px] h-[90px] object-cover${
                activeImage === index ? " border-[4px] border-accent" : ""
              }`}
              src={img}
              alt={`thumbnail-${index}`}
            />
          ) : (
            <div
              key={index}
              onClick={() => setActiveImage(index)}
              className="w-[90px] h-[90px] bg-gray-100 flex items-center justify-center text-xs text-gray-500"
            >
              No image
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlide;
