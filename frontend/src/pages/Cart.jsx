import React, { useState } from "react";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[600px] flex flex-col gap-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white flex flex-col sm:flex-row relative p-4 sm:p-3 rounded-lg shadow-sm"
          >
            {/* Delete Button */}
            <button
              onClick={() => {
                addToCart(item, -item.quantity);
                setCart(loadCart());
              }}
              className="absolute top-2 right-2 sm:static sm:order-3 text-red-500 text-2xl hover:bg-red-500 hover:text-white rounded-full p-1 transition"
            >
              <MdOutlineDeleteForever />
            </button>

            {/* Image */}
            <img
              className="w-full sm:w-[120px] h-[120px] object-cover rounded-md"
              src={item.image}
              alt={item.name}
            />

            {/* Product Details */}
            <div className="flex flex-col flex-grow sm:pl-4 mt-3 sm:mt-0">
              <h1 className="font-semibold text-lg sm:text-xl text-secondary">
                {item.name}
              </h1>
              <span className="text-sm text-gray-500">{item.productId}</span>
            </div>

            {/* Quantity Controls */}
            <div className="flex sm:flex-col items-center justify-center gap-2 mt-3 sm:mt-0">
              <CiCircleChevUp
                className="text-3xl cursor-pointer hover:text-accent transition"
                onClick={() => {
                  addToCart(item, 1);
                  setCart(loadCart());
                }}
              />
              <span className="font-semibold text-2xl sm:text-3xl">
                {item.quantity}
              </span>
              <CiCircleChevDown
                className="text-3xl cursor-pointer hover:text-accent transition"
                onClick={() => {
                  addToCart(item, -1);
                  setCart(loadCart());
                }}
              />
            </div>

            {/* Price Section */}
            <div className="flex sm:flex-col items-center justify-center sm:items-end mt-3 sm:mt-0 ml-auto">
              {item.labelPrice > item.price && (
                <span className="text-gray-500 line-through text-sm sm:text-lg sm:text-right">
                  LKR {item.labelPrice.toFixed(2)}
                </span>
              )}
              <span className="font-semibold text-accent text-xl sm:text-2xl text-right">
                LKR {item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {/* Checkout Section */}
        <div className="w-full bg-white flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg shadow-sm">
          <Link
            to="/checkout"
            state={cart}
            className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent/80 transition w-full sm:w-auto text-center"
          >
            Proceed to Checkout
          </Link>

          <span className="font-semibold text-accent text-xl sm:text-2xl mt-3 sm:mt-0">
            Total: LKR {getTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
