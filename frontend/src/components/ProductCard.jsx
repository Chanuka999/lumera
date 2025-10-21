import "./ProductCard.css";

const ProductCard = ({ name, price, images }) => {
  return (
    <div className="productCard">
      <h1>{name}</h1>
      <p>{price}</p>
      <img className="productImage" src={images} alt="" />
      <button>add to cart</button>
    </div>
  );
};

export default ProductCard;
