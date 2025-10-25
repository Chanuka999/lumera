import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import OrderModal from "../../components/OrderInfoModel";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [SelectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          // API returns { data: products }
          setOrders(response.data?.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          // ensure loader stops on error
          setOrders([]);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-primary min-h-screen">
      <OrderModal
        isModelOpen={isModelOpen}
        closeModal={() => setIsModelOpen(false)}
        selectedOrder={SelectedOrder}
        refresh={() => {
          setIsLoading(true);
        }}
      />
      <h1 className="text-2xl font-bold text-secondary mb-6">orders</h1>

      <div className="overflow-x-auto shadow-md rounded-2xl bg-white">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full text-center border-collapse">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Number of Items</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr
                  key={item.orderId}
                  className={`border-b hover:bg-primary transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedOrder(item);
                    setIsModelOpen(true);
                  }}
                >
                  <td className="py-3 px-4 font-medium text-secondary">
                    {item.orderId}
                  </td>
                  <td className="py-3 px-4">{item.items.length}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    {item.customerName}
                  </td>
                  <td className="py-3 px-4  text-gray-500">{item.email}</td>
                  <td className="py-3 px-4 text-gray-500">{item.phone}</td>
                  <td className="py-3 px-4">{item.address}</td>
                  <td className="py-3 px-4">LKR{item.total.toFixed(2)}</td>
                  <td className="py-3 px-4">{item.status}</td>
                  <td className="py-3 px-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
