import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        console.log("/api/products response:", response.data);
        const data = response.data;
        let list = [];

        if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.products)) list = data.products;
        else if (Array.isArray(data?.data)) list = data.data;
        else if (data && typeof data === "object") {
          const found = Object.values(data).find((v) => Array.isArray(v));
          if (Array.isArray(found)) list = found;
        }

        if (mounted) setProducts(list);
      })
      .catch((err) => {
        console.error("Failed to fetch /api/products:", err);
        if (mounted)
          setError(
            err?.response?.data?.message ||
              err.message ||
              "Failed to fetch products"
          );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--color-primary)]">
        <div className="text-[var(--color-secondary)] text-lg font-semibold">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--color-primary)]">
        <div className="text-red-500 text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 bg-[var(--color-primary)] min-h-screen">
      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent"
      >
        <CiCirclePlus />
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-secondary)] mb-6 text-center">
        Product Management
      </h1>

      <div className="overflow-x-auto shadow-md rounded-xl bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-[var(--color-secondary)] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Product ID</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Product Price</th>
              <th className="py-3 px-4 text-left">Labelled Price</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(products) &&
              products.map((item, index) => (
                <tr
                  key={item.productId || index}
                  className="border-b hover:bg-[var(--color-primary)] transition-all duration-300"
                >
                  <td className="py-3 px-4">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-4 text-[var(--color-secondary)] font-medium">
                    {item.productId}
                  </td>
                  <td className="py-3 px-4 text-[var(--color-secondary)]">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-[var(--color-secondary)]">
                    {item.productId}
                  </td>
                  <td className="py-3 px-4 text-[var(--color-secondary)]">
                    {item.labelPrice}
                  </td>
                  <td className="py-3 px-4 text-[var(--color-secondary)]">
                    {item.category}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        title="Delete"
                        className="p-2 rounded-lg hover:bg-red-100 transition"
                      >
                        <FaRegTrashAlt className="text-red-500 hover:scale-110 transition-transform" />
                      </button>
                      <button
                        title="Edit"
                        className="p-2 rounded-lg hover:bg-[var(--color-accent)]/20 transition"
                      >
                        <FaRegEdit className="text-[var(--color-accent)] hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductPage;
