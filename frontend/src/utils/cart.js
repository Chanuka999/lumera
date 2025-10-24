import React from "react";

export const loadCart = () => {
  let cartString = localStorage.getItem("cart");

  if (cartString == null) {
    localStorage.getItem("cart", "[]");
    cartString = "[]";
  }

  const cart = JSON.parse(cartString);
  return cart;
};

export const addToCart = (product, quantity) => {
  let cart = loadCart();

  const existingitemIndex = cart.findIndex((item) => {
    return item.productId == product.productId;
  });

  if (existingitemIndex == -1) {
    if (quantity < 1) {
      console.log("Quantity must be at least 1");
      return;
    }

    const cartItem = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      labelprice: product.labelprice,
      quantity: product.quantity,
      image: product.image[0],
    };
    cart.push(cartItem);
  } else {
    const existingitem = cart[existingitemIndex];

    const newQuantity = existingitem.quantity + quantity;

    if (newQuantity < 1) {
      cart = cart.filter((item) => {
        return item.productId != product.productId;
      });
    } else {
      cart[existingitem].quantity = newQuantity;
    }
  }

  localStorage.getItem("cart", JSON.stringify(cart));
};
