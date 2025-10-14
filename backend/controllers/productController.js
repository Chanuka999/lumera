import e from "express";
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export const createProduct = async (req, res) => {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "you are not authorized to create a product",
    });
    return;
  }

  try {
    const productData = req.body;

    const product = new Product(productData);

    await product.save();
    res.status(200).json({
      message: "product data added successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteproduct = async (req, res) => {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "you are not authorized to delete a product",
    });
    return;
  }
  try {
    const productId = req.params.productId;

    await Product.deleteOne({
      productId: productId,
    });
    res.status(200).json({
      message: "product id delete succedfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "you are not authorized to create a product",
    });
    return;
  }
  try {
    const productId = req.params.productId;
    const updateData = req.body;
    await Product.updateOne({ productId: productId }, updateData);
    res.json({ message: "product updated successfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal verdver" });
  }
};

export const getproductId = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findOne({
      productId: productId,
    });

    if (product == null) {
      res.status(403).json({
        message: "product not found",
      });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "internel server error" });
  }
};
