import React from "react";

const Header = () => {
  return (
    <div className="w-full h-[100px] bg-accent text-white px-[40px]">
      <div className="w-full h-full flex relative">
        <img
          src="/logo.png"
          alt=""
          className="h-full w-[170px] absolute left-0 object-cover"
        />
        <div className="h-full flex justify-center w-full gap-[20px] text-lg items-center">
          <a href="/">Home</a>
          <a href="/products">Produts</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
