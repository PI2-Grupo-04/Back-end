import Order from "../models/Order";

const orderMiddleware = async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const includes = user.restaurants.includes(id);

  if (includes) {
    const order = await Order.findById(req.params.order_id);
    if (id == order.restaurant) {
      return next();
    } else {
      return res.status(403).json({
        status: "error",
        data: null,
        message: "Order does not belong to this Restaurant",
      });
    }
  } else {
    return res.status(403).json({
      status: "error",
      data: null,
      message: "Restaurant does not belong to this user",
    });
  }
};

export default orderMiddleware;
