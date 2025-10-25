import React from "react";
import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverview from "./ProductOverview";
import CartPage from "./Cart";
import Checkout from "./Checkout";
import Test from "./Test";

const HomePage = () => {
  return (
    <div className="w-full h-full bg-primary">
      <Header />
      <Routes>
        <Route path="/" element={<h1>welcome to the homepage</h1>} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<h1>contact us</h1>} />
        <Route path="/overview/:id" element={<ProductOverview />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<h1>About us</h1>} />
        <Route path="/*" element={<h1>404 not found</h1>} />
      </Routes>
    </div>
  );
};

export default HomePage;
