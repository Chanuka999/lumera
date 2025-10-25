import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ImageSlide from "../components/ImageSlide";
import { addToCart } from "../utils/cart";

const ProductOverview = () => {
  const params = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("failed to fetch product details");
        setStatus("error");
      });
  }, []);

  return (
    <div className="w-full  min-h-[calc(100vh-100px)] text-secondary bg-primary">
      {status == "loading" && <Loader />}
      {status == "success" && (
        <div className="w-full flex-col flex lg:flex-row p-10">
          <h1 className="text-2xl text-center font-bold lg:hidden">
            {product.name}
          </h1>
          <div className="w-full lg:w-[50%] flex justify-center items-center">
            <ImageSlide images={product.images} />
          </div>
          <div className="w-full lg:w-[50%] h-full flex-col flex bg-primary items-center gap-4 p-10">
            <span>{product.productId}</span>
            <h1 className="text-2xl text-center font-bold">
              {product.name}
              {product.altnames.map((name, index) => {
                return (
                  <span key={index} className="font-normal bg-secondary">
                    {"|" + name}
                  </span>
                );
              })}
            </h1>
            <p className="mt-[30px] text-justify">{product.description}</p>
            <p>Category:{product.category}</p>
            {product.labelPrice > product.price ? (
              <div className="flex gap-3 items-center">
                <p className="text-lg text-secondary font-semibold line-through">
                  LKR {product.labelPrice.toFixed(2)}
                </p>
                <p className="text-lg text-accent font-semibold">
                  LKR {product.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-lg text-accent font-semibold">
                LKR {product.price.toFixed(2)}
              </p>
            )}
            <div className="w-full h-[40px] flex gap-4 mt-[60px]">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Added to cart");
                }}
                className="w-[50%] h-full bg-accent text-white font-semibold hover:bg-accent/80"
              >
                Add To Cart
              </button>
              <Link
                to="/checkout"
                state={[
                  {
                    image: product.images[0],
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    labelPrice: product.labelPrice,
                    quantity: 1,
                  },
                ]}
                className="w-[50%] text-center flex justify-center items-center h-full border border-accent text-accent font-semibold hover:bg-accent"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}
      {status == "error" && (
        <h1 className="text-red-500">failed to load product details</h1>
      )}
    </div>
  );
};

export default ProductOverview;
