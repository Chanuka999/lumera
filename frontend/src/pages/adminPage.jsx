import React from "react";
import { Route, Routes } from "react-router-dom";

const adminPage = () => {
  return (
    <div className="w-full h-full bg-primary flex p-2">
      <div className="w-[300px] h-full bg-primary flex flex-col items-center">
        <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl">
          <img
            src="/logo.png"
            alt="CBC- Crystal Beauty Clear"
            className="h-[70px]"
          />
          <span className="text-white text-xl ml-4">Admin panel</span>
        </div>
      </div>
      <div className="w-[calc(100%-300px)] h-full bg-primary border-[2px] border-accent rounded-[20px] overflow-hidden">
        <div className="bg-red-900 h-full max-h-full overflow-y-scroll">
          <Routes path="/">
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/products" element={<h1>Products</h1>} />
            <Route path="/orders" element={<h1>Orders</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default adminPage;
