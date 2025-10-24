import React from "react";

export const loadCart = () => {
  let cartString = localStorage.getItem("cart");

  if (cartString == null) {
    localStorage.setItem("cart", "[]");
    cartString = "[]";
  }

  const cart = JSON.parse(cartString);
  return cart;
};

export const addToCart = (product, quantity) => {
  let cart = loadCart();

  const existingItemIndex = cart.findIndex((item) => {
    return item.productId == product.productId;
  });

  if (existingItemIndex == -1) {
    if (quantity < 1) {
      console.log("quentity must be at least 1");
      return;
    }

    const cartItem = {
      productId: product.productId,
      name: product.name,
      price: product.price,
      labelPrice: product.labelPrice,
      quantity: quantity,
      // guard against missing or non-array images; store null when absent
      image:
        Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : null,
    };
    cart.push(cartItem);
  } else {
    // item already in cart
    const existingItem = cart[existingItemIndex];

    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity < 1) {
      cart = cart.filter((item) => {
        return item.productId != product.productId;
      });
    } else {
      existingItem.quantity = newQuantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getTotal = () => {
  const cart = loadCart();
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};
