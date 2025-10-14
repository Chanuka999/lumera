import express from "express";
import {
  createProduct,
  deleteproduct,
  getProduct,
  getproductId,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.post("/", createProduct);
productRouter.delete("/:productId", deleteproduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getproductId);

export default productRouter;
