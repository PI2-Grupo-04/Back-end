import Menu from "../models/Menu";
import User from "../models/User";
import Restaurant from "../models/Restaurant";

const menuMiddleware = async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const restaurant = await Restaurant.findOne({ menus: { _id: id } });
  const compared_user = await User.findOne({
    restaurants: { _id: restaurant.id },
  });

  if (user.id == compared_user.id) {
    req.menu = await Menu.findById(id);
    return next();
  }

  return res.status(403).json({
    status: "error",
    data: null,
    message: "User cannot alter this Menu",
  });
};

export default menuMiddleware;
