import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [labelPrice, setLabelPrice] = useState(0);
  const [category, setCategory] = useState("cream");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  const addProduct = async () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
      return;
    }

    // Validate required fields

    if (!productId || productId.trim() === "") {
      toast.error("Product ID is required");
      return;
    }
    if (!labelPrice || Number(labelPrice) === 0) {
      toast.error("Label Price is required");
      return;
    }

    // Convert FileList to array
    const imageArray = images && images.length ? Array.from(images) : [];
    if (imageArray.length === 0) {
      toast.error("No images selected");
      return;
    }

    let urls = [];
    try {
      urls = await Promise.all(imageArray.map((file) => mediaUpload(file)));
      const alternativenames = altNames
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const product = {
        productId: productId,
        name: name,
        altName: alternativenames,
        description: description,
        images: urls,
        price: price,
        labelPrice: labelPrice,
        category: category,
        stock: stock,
      };
      // Ensure VITE_API_URL is set and valid
      let base = import.meta.env.VITE_API_URL;
      if (!base || typeof base !== "string" || !/^https?:\/\//.test(base)) {
        toast.error(
          "VITE_API_URL is not set or invalid. Check your .env file."
        );
        console.error("VITE_API_URL is invalid:", base);
        return;
      }
      if (!base.endsWith("/")) base += "/";
      const postUrl = base + "api/products";
      console.log("POST URL:", postUrl);
      console.log("Payload:", product);
      await axios.post(postUrl, product, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("product added successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error("An error occurred");
      console.error(err);
    }

    console.log(urls);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-primary p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl border-t-4 border-accent p-8">
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          Add New Product
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-secondary">
              product Id
            </label>
            <input
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-secondary">
              product Name
            </label>
            <input
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-secondary">
              AltName
            </label>
            <input
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Alternate Name"
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-secondary">
              Description
            </label>
            <textarea
              className="p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Product Description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-secondary">
              Upload Images
            </label>
            <div className="flex items-center gap-4">
              <input
                id="product-images"
                type="file"
                onChange={(e) => setImages(e.target.files)}
                multiple
                className="hidden"
              />
              <label
                htmlFor="product-images"
                className="inline-block rounded-lg cursor-pointer shadow"
              >
                Choose Images
              </label>
              <span className="text-sm text-gray-500">
                {images && images.length > 0
                  ? `${images.length} selected`
                  : "No images selected"}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="block mb-2 text-sm font-semibold text-secondary">
              price
            </label>
            <input
              type="number"
              placeholder="Price"
              className="w-1/2 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label className="block mb-2 text-sm font-semibold text-secondary">
              Label Price
            </label>
            <input
              type="number"
              placeholder="Label Price"
              className="w-1/2 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              value={labelPrice}
              onChange={(e) => setLabelPrice(e.target.value)}
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="block mb-2 text-sm font-semibold text-secondary">
              category
            </label>
            <select
              className="w-1/2 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="cream">Cream</option>
              <option value="lotion">Lotion</option>
              <option value="serum">Serum</option>
            </select>

            <label className="block mb-2 text-sm font-semibold text-secondary">
              Stock
            </label>
            <input
              type="number"
              placeholder="Stock Quantity"
              className="w-1/2 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="flex flex-row gap-[10px]">
            <button
              onClick={() => {
                navigate("/admin/products");
              }}
              className=" w-[50%]  bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-[#5f0404] transition-all duration-300 shadow-md"
            >
              cancel
            </button>

            <button
              onClick={addProduct}
              className="w-[50%]  bg-accent text-white font-semibold py-3 rounded-lg hover:bg-[#ff6b88] transition-all duration-300 shadow-md"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
