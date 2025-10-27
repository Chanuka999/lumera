import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";

import UserData from "./UserData";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="w-full h-[100px] bg-accent text-white px-[40px]">
      <div className="w-full h-full flex relative">
        <img
          src="/logo.png"
          alt=""
          className="h-full w-[170px] hidden lg:flex  absolute left-0 object-cover"
        />
        <div className="lg:hidden w-full relative flex items-center justify-center">
          <MdMenu
            className="absolute left-0 text-3xl"
            onClick={() => setIsSidebarOpen(true)}
          />
          <img
            src="/logo.png"
            alt=""
            className="h-full w-[170px]  object-cover"
          />
        </div>
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] text-secondary z-100">
            <div className="w-[300px] flex flex-col bg-primary h-full">
              <div className="lg:hidden h-[100px] bg-accent w-full relative flex items-center justify-center">
                <MdMenu
                  className="absolute left-2 text-white text-3xl"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <img
                  src="/logo.png"
                  alt=""
                  className="h-full w-[170px]  object-cover"
                />
              </div>
              <a href="/" className="p-4 border-b border-secondary/10">
                Home
              </a>
              <a href="/products" className="p-4 border-b border-secondary/10">
                Products
              </a>
              <a href="/about" className="p-4 border-b border-secondary/10">
                About
              </a>
              <a href="/contact" className="p-4 border-b border-secondary/10">
                Contact
              </a>
              <a href="/cart" className="p-4 border-b border-secondary/10">
                Cart
              </a>
              <div className="lg:hidden flex w-[200px] absolute right-[100px] justify-end items-center gap-4">
                <UserData />
              </div>
            </div>
          </div>
        )}
        <div className="hidden h-full lg:flex justify-center w-full gap-[20px] text-lg items-center">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="h-full w-[80px] absolute right-[80px] top-0 flex justify-center items-center gap-4">
          <UserData />
        </div>

        <Link
          to="/cart"
          className="h-full absolute hidden right-0 text-3xl lg:flex justify-center items-center"
        >
          <BsCart4 />
        </Link>
      </div>
    </div>
  );
};

export default Header;
