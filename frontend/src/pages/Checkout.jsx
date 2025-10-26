import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const [cart, setCart] = useState(location.state);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const purchaseCart = async () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("please login to place an order");
      navigate("/login");
      return;
    }

    try {
      const items = [];
      for (let i = 0; i < cart.length; i++) {
        items.push({
          productId: cart[i].productId,
          quantity: cart[i].quantity,
        });
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: address,
          customerName: name == "" ? null : name,
          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("order placed successfully");
    } catch (error) {
      toast.error("failed to place order");
      console.error(error);

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

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
              onClick={() => {}}
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
                  const newCart = [...cart];
                  newCart[index].quantity += 1;
                  setCart(newCart);
                }}
              />
              <span className="font-semibold text-2xl sm:text-3xl">
                {item.quantity}
              </span>
              <CiCircleChevDown
                className="text-3xl cursor-pointer hover:text-accent transition"
                onClick={() => {
                  const newCart = [...cart];
                  if (newCart[index].quantity > 1) {
                    newCart[index].quantity -= 1;
                  }
                  setCart(newCart);
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
        <div className="w-full bg-white flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg shadow-sm">
          <div className="w-full  h-full flex flex-col justify-between items-center p-4">
            <label htmlFor="name" className="text-sm text-secondary mr-2">
              name
            </label>
            <textarea
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[50px] border border-secondary rounded-md px-3 text-center"
            />
          </div>

          <div className="w-full  h-full flex flex-col justify-between items-center p-4">
            <label htmlFor="address" className="text-sm text-secondary mr-2">
              Shopping address
            </label>
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-[150px] border border-secondary rounded-md px-3 text-center"
            />
          </div>
        </div>

        {/* Checkout Section */}
        <div className="w-full bg-white flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg shadow-sm">
          <button
            to="/checkout"
            onClick={purchaseCart}
            className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent/80 transition w-full sm:w-auto text-center"
          >
            Order
          </button>

          <span className="font-semibold text-accent text-xl sm:text-2xl mt-3 sm:mt-0">
            Total: LKR {getTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
