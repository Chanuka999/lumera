import Order from "../models/order.js";
import Product from "../models/product.js";

export const createOrder = async (req, res) => {
  //   if (req.user == null) {
  //     res.status(401).json({
  //       message: "user not found",
  //     });
  //     return;
  //   }

  try {
    const user = req.user;
    if (user == null) {
      res.status(401).json({
        message: "Unauthorized use",
      });
      return;
    }
    // Get the most recent order (by date) from the DB
    const lastOrder = await Order.findOne().sort({ date: -1 });

    let newOrderId = "CBC00000001";

    if (lastOrder) {
      // lastOrder.orderId has format like "CBC00000001"
      const lastOrderIDInString = lastOrder.orderId || "";
      const lastOrderNumberInString = lastOrderIDInString.replace("CBC", "");
      const lastOrderNumber = parseInt(lastOrderNumberInString, 10) || 0;
      const newOrderNumber = lastOrderNumber + 1;

      const newOrderNumberInString = newOrderNumber.toString().padStart(7, "0");

      newOrderId = "CBC" + newOrderNumberInString;
    }

    let customerName = req.body.customerName;
    if (customerName == null) {
      customerName =
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Guest";
    }

    let phone = req.body.phone;
    if (phone == null) {
      phone = "not provided";
    }

    const itemsInRequest = req.body.items;

    if (itemsInRequest == null) {
      res.status(400).json({
        message: "items are required to place an order",
      });
      return;
    }

    if (!Array.isArray(itemsInRequest)) {
      res.status(400).json({
        message: "items should be in array",
      });
      return;
    }

    const itemsToBeAdded = [];
    let total = 0;

    for (let i = 0; i < itemsInRequest.length; i++) {
      const item = itemsInRequest[i];

      const product = await Product.findOne({ productId: item.productId });

      if (product == null) {
        return res.status(400).json({
          code: "not found",
          message: `product with ID ${item.productId} not found`,
          productId: item.productId,
        });
      }

      const quantity = Number(item.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return res.status(400).json({
          code: "invalid_quantity",
          message: `invalid quantity for product ${item.productId}`,
          productId: item.productId,
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          code: "stock",
          message: `insufficient stock for product with ID ${item.productId}`,
          productId: item.productId,
          availableStock: product.stock,
        });
      }

      itemsToBeAdded.push({
        productId: product.productId,
        quantity: quantity,
        name: product.name,
        price: product.price,
        image:
          Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : "",
      });

      total += product.price * quantity;
    }

    const newOrder = new Order({
      orderId: newOrderId,
      items: itemsToBeAdded,
      customerName: customerName,
      email: user.email,
      phone: phone,
      address: req.body.address || "",
      total: Number(total.toFixed(2)),
    });

    const savedOrder = await newOrder.save();

    // for (let i = 0; i < itemsToBeAdded.length; i++) {
    //   const item = itemsToBeAdded[i];
    //   await Product.updateOne(
    //     { productId: item.productId },
    //     { $inc: { stock: -item.quantity } }
    //   );
    // }

    res.status(200).json({
      message: "order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const user = req.user;

    // If no user (no auth) -> forbidden
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    // Admins see all orders
    if (user.role === "admin") {
      const orders = await Order.find().sort({ date: -1 });
      return res.json({ data: orders });
    }

    // Regular users see their own orders
    const orders = await Order.find({ email: user.email }).sort({ date: -1 });
    return res.json({ data: orders });
  } catch (error) {
    console.error("getOrder error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "you are not authorized to update order" });
    }

    const orderId = req.params.orderId || req.params.orderID || req.params.id;
    const newStatus = req.body.status;

    if (!newStatus || typeof newStatus !== "string") {
      return res.status(400).json({ message: "status is required" });
    }

    // Use findOneAndUpdate to return the updated document
    const updated = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: newStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.json({
      message: "Order status updated successfully",
      order: updated,
    });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
