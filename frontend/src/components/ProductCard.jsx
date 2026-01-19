import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = (props) => {
  const product = props.product;

  // Handle both labelPrice and labelledPrice field names
  const labelPrice = product.labelPrice || product.labelledPrice;

  // Map category values to display names
  const getCategoryDisplayName = (categoryValue) => {
    const categoryMap = {
      indoor: "Indoor Plants",
      flowering: "Flowering Plant",
      "low-maintence": "Low-Maintenance",
      herbal: "Herbal",
      outdoor: "Outdoor",
      rare: "Rare",
      seed: "Seed & Starter Kits",
      // Legacy categories (for backward compatibility)
      cream: "Cream",
      lotion: "Lotion",
      serum: "Serum",
    };
    return categoryMap[categoryValue] || categoryValue;
  };

  return (
    <div className="w-[300px] h-[400px] shadow-2xl flex flex-col m-3 p-[10px] bg-yellow-100">
      {Array.isArray(product.images) && product.images.length > 0 ? (
        <img
          className="w-full h-[250px] object-cover"
          src={product.images[0]}
          alt={product.name || "product"}
        />
      ) : (
        <div className="w-full h-[250px] bg-gray-100 flex items-center justify-center text-sm text-gray-500">
          No image
        </div>
      )}
      <h1 className="text-xl font-bold text-secondary">{product.name}</h1>
      {labelPrice > product.price && (
        <div className="flex gap-3 items-center">
          <p className="text-lg text-secondary font-semibold line">
            LKR{labelPrice.toFixed(2)}
          </p>
          <p className="text-lg text-accent font-semibold">
            LKR{product.price.toFixed(2)}
          </p>
        </div>
      )}
      <p className="text-sm text-secondary/70">{product.productId}</p>
      <p className="text-sm text-secondary/70">
        {getCategoryDisplayName(product.category)}
      </p>
      <Link
        to={"/overview/" + product.productId}
        className="w-full h-[30px] border text-center border-accent text-accent hover:bg-accent hover:text-white"
      >
        View Product
      </Link>
    </div>
  );
};

export default ProductCard;
