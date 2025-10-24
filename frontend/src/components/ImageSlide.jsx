import React, { useState } from "react";

const ImageSlide = (props) => {
  const images = Array.isArray(props.images) ? props.images : [];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-[400px] ">
      <img
        className="w-full h-[400px] object-cover"
        src={images[activeImage]}
        alt=""
      />
      <div className="w-full h-[100px] flex gap-2 justify-center items-center">
        {images.map((img, index) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlide;
