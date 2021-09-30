import Restaurant from "../models/Restaurant";
import User from "../models/User";

class RestaruantController {
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
