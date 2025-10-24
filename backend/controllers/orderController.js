import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  //   if (req.user == null) {
  //     res.status(401).json({
  //       message: "user not found",
  //     });
  //     return;
  //   }

  try {
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

    const newOrder = new Order({
      orderId: newOrderId,
      items: [],
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      total: req.body.total,
    });

    const savedOrder = await newOrder.save();

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
