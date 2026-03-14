import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import UserData from "./UserData";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <header className="w-full h-[80px] bg-accent text-white px-4 sm:px-6 lg:px-10 sticky top-0 z-40">
      <div className="w-full h-full flex items-center justify-between gap-4 max-w-[1280px] mx-auto relative">
        <div className="hidden lg:flex items-center h-full">
          <img
            src="/aurora1.png"
            alt="Aurora Bloom logo"
            className="h-full w-[120px] object-cover"
          />
        </div>

        <div className="lg:hidden w-full relative flex items-center justify-center">
          <MdMenu
            className="absolute left-0 text-3xl cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          />
          <img
            src="/logo.png"
            alt="Aurora Bloom logo"
            className="h-full w-[170px] object-cover"
          />

          <Link
            to="/cart"
            className="absolute right-0 text-2xl"
            aria-label="Open cart"
          >
            <BsCart4 />
          </Link>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black/55 text-secondary z-50"
            onClick={closeSidebar}
          >
            <nav
              className="w-[290px] flex flex-col bg-primary h-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lg:hidden h-[100px] bg-accent w-full relative flex items-center justify-center px-4">
                <button
                  className="absolute left-3 text-white text-3xl cursor-pointer"
                  onClick={closeSidebar}
                  aria-label="Close menu"
                >
                  <IoClose />
                </button>
                <img
                  src="/logo.png"
                  alt="Aurora Bloom logo"
                  className="h-full w-[170px] object-cover"
                />
              </div>

              <Link
                to="/"
                onClick={closeSidebar}
                className="p-4 border-b border-secondary/10 font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={closeSidebar}
                className="p-4 border-b border-secondary/10 font-medium"
              >
                Plants
              </Link>
              <Link
                to="/about"
                onClick={closeSidebar}
                className="p-4 border-b border-secondary/10 font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={closeSidebar}
                className="p-4 border-b border-secondary/10 font-medium"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                onClick={closeSidebar}
                className="p-4 border-b border-secondary/10 font-medium"
              >
                Cart
              </Link>

              <div className="lg:hidden p-4 mt-auto border-t border-secondary/10">
                <UserData />
              </div>
            </nav>
          </div>
        )}

        <div className="hidden h-full lg:flex justify-center flex-1 gap-8 text-lg items-center font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="h-full hidden lg:flex items-center gap-4">
          <UserData />
          <Link to="/cart" className="text-3xl" aria-label="Open cart">
            <BsCart4 />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
