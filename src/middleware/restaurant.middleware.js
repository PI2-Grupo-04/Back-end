import Restaurant from "../models/Restaurant";

const restaurantMiddleware = async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const includes = user.restaurants.includes(id);

  if (includes) {
    return next();
  }

  return res.status(403).json({
    status: "error",
    data: null,
    message: "User cannot alter this Restaurant",
  });
};

export default restaurantMiddleware;
