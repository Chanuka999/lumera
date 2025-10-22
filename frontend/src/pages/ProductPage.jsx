import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((responce) => {
          // API returns { data: products }
          setProducts(responce.data?.data || []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products", error);
          setIsLoading(false);
          toast.error("failed to load products");
        });
    }
  }, [isLoading]);
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-row flex-wrap justify-center items-center">
          {products.map((item) => {
            return <ProductCard key={item.productId} product={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
