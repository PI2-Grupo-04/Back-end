import Restaurant from "../models/Restaurant";
import Order from "../models/Order";

class RestaruantController {
  orders = async (req, res) => {
    const { id } = req.params;
    const orders = await Order.find({ restaurant: id, status: "Awaiting" });

    return res.json({
      status: "success",
      data: { orders },
      message: null,
    });
  };

  list = async (req, res) => {
    const user = await req.user.populate("restaurants");

    return res.json({
      status: "success",
      data: user.restaurants,
      message: null,
    });
  };

  create = async (req, res) => {
    const { name } = req.body;
    const user = req.user;
    const restaurant = await Restaurant.create({ name });
    user.restaurants.push(restaurant);
    user.save();

    return res.json({
      status: "success",
      data: null,
      message: "Restaurant Created",
    });
  };

  retrieve = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    return res.json({
      status: "success",
      data: restaurant,
      message: null,
    });
  };

  update = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    const { name } = req.body;
    restaurant.name = name;
    restaurant.save();

    return res.json({
      status: "success",
      data: null,
      message: "Restaurant Updated",
    });
  };

  delete = async (req, res) => {
    await Restaurant.deleteOne({ id: req.params.id });

    return res.json({
      status: "success",
      data: null,
      message: "Restaurant Deleted",
    });
  };
}

export default new RestaruantController();
