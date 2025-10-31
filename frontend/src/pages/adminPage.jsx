import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProduct from "./admin/adminAddProduct";
import UpdateProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";
import AdminUsersPage from "./admin/userPage";

const AdminPage = () => {
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("please login to access admin panel");
      navigate("/login");
      return;
    }
    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.role != "admin") {
          toast.error("you are not authorized to access the admin panel"),
            navigate("/");
          return;
        }
        setUserLoaded(true);
      })
      .catch(() => {
        toast.error("session expired. please login again");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  return (
    <div className="w-full h-full bg-primary flex p-2">
      <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-[20px]">
        <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl mb-[20px]">
          <img
            src="/logo.png"
            alt="CBC- Crystal Beauty Clear"
            className="h-[70px]"
          />
          <span className="text-white text-xl ml-4">Admin panel</span>
        </div>
        <Link
          to="/admin"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <FaChartLine />
          Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <MdShoppingCartCheckout className="text-xl" />
          Orders
        </Link>

        <Link
          to="/admin/products"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <GoInbox />
          Products
        </Link>

        <Link
          to="/admin/users"
          className="w-[90%] flex items-center gap-2 px-4 rounded-lg"
        >
          <HiOutlineUsers />
          users
        </Link>
      </div>
      <div className="w-[calc(100%-300px)] h-full bg-primary border-[4px] border-accent rounded-[20px] overflow-hidden">
        <div className="h-full max-h-full w-full max-w-full overflow-y-scroll">
          {userLoaded ? (
            <Routes path="/">
              <Route path="/" element={<h1>Dashboard</h1>} />
              <Route path="/products" element={<AdminProductPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/add-product" element={<AdminAddProduct />} />
              <Route path="/update-product" element={<UpdateProduct />} />
              <Route path="/users" element={<AdminUsersPage />} />
            </Routes>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
