import React from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

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
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Link
          to="/cart"
          className="h-full absolute right-0 text-3xl flex justify-center items-center"
        >
          <BsCart4 />
        </Link>
      </div>
    </div>
  );
};

export default Header;
