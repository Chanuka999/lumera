import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  altname: {
    type: [String],
    default: [],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    default: [],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  labelPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
