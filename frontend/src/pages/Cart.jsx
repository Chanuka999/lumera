import React, { useState } from "react";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col p-[25px] items-center">
      <div className="w-[600px] flex flex-col gap-4">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[120px] bg-white flex relative lg:flex"
            >
              <button
                onClick={() => {
                  addToCart(item, -item.quantity);
                  setCart(loadCart);
                }}
                className="absolute text-red-500 right-[-30px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] font-bold"
              >
                <MdOutlineDeleteForever />
              </button>
              <img
                className="h-full aspect-square object-cover"
                src={item.image}
              />
              <div className="w-[200px] h-full flex flex-col pl-[5px] pt-[10px]">
                <h1 className="font-semibold text-lg w-full text-wrap">
                  {item.name}
                </h1>
                <span className="text-sm text-secondary">{item.productId}</span>
              </div>
              <div className="w-[100px] h-full  flex flex-col justify-center items-center">
                <CiCircleChevUp
                  className="text-3xl"
                  onClick={() => {
                    addToCart(item, 1);
                    setCart(loadCart());
                  }}
                />
                <span className="font-semibold text-4xl">{item.quantity}</span>
                <CiCircleChevDown
                  onClick={() => {
                    addToCart(item, -1);
                    setCart(loadCart());
                  }}
                  className="text-3xl"
                />
              </div>
              <div className="w-[180px]  h-full flex flex-col">
                {item.labelPrice > item.price && (
                  <span className="text-secondary w-full text-right line-through text-lg pr-[10px] mt-[20px]">
                    LKR {item.labelPrice.toFixed(2)}
                  </span>
                )}
                <span className="font-semibold text-accent w-full text-right text-2xl pr-[10px] mt-[5px]">
                  LKR {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
        <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
          <Link
            to="/checkout"
            state={cart}
            className="absolute left-0 bg-accent text-white px-6 py-3 ml-[20px] hover:bg-accent/80"
          >
            procede to checkout
          </Link>
          <div className="h-[50px]">
            <span className="font-semibold text-accent w-full text-right text-2xl pr-[10px] mt-[5px]">
              Total:LKR{getTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
