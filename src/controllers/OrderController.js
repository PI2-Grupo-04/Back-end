import Menu from "../models/Menu";
import Restaurant from "../models/Restaurant";
import Order from "../models/Order";

class OrderController {
  create = async (req, res) => {
    const { order, notes } = req.body;

    const new_order = await Order.create({ notes });

    for (const items of order) {
      const menu = await Menu.findById(items.menu);
      const restaurant = await Restaurant.findOne({
        menus: { _id: items.menu },
      });

      new_order.restaurant = restaurant.id;

      for (const item of items.items) {
        new_order.items.push(menu.items.id(item));
      }
      new_order.save();
    }

    return res.json({
      status: "success",
      data: {
        order: new_order,
      },
      message: "Order Created",
    });
  };

  cancel = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    order.status = "Cancelled";

    order.save();

    return res.json({
      status: "success",
      data: null,
      message: "Order Cancelled",
    });
  };

  confirm = async (req, res) => {
    const { order_id } = req.params;

    const order = await Order.findById(order_id);

    order.status = "Confirmed";
    order.save();

    return res.json({
      status: "success",
      data: null,
      message: "Order Confirmed",
    });
  };

  reject = async (req, res) => {
    const { order_id } = req.params;

    const order = await Order.findById(order_id);

    order.status = "Rejected";
    order.save();

    return res.json({
      status: "success",
      data: null,
      message: "Order Rejected",
    });
  };
}

export default new OrderController();
