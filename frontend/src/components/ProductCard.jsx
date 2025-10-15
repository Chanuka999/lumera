import "./ProductCard.css";

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="productCard">
      <h1>{name}</h1>
      <p>{price}</p>
      <img className="productImage" src={image} alt="" />
      <button>add to cart</button>
    </div>
  );
};

export default ProductCard;
