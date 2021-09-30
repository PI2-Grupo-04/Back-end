import Menu from "../models/Menu";
import Restaurant from "../models/Restaurant";

class MenuController {
  create = async (req, res) => {
    const { name } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    const menu = await Menu.create({ name });

    restaurant.menus.push(menu);
    restaurant.save();

    return res.json({
      status: "success",
      data: null,
      message: "Menu Created",
    });
  };

  retrieve = async (req, res) => {
    const menu = await Menu.findById(req.params.id);

    return res.json({
      status: "success",
      data: menu,
      message: null,
    });
  };

  update = async (req, res) => {
    const { name } = req.body;
    const menu = await Menu.findById(req.params.id);
    menu.name = name;
    menu.save();

    return res.json({
      status: "success",
      data: null,
      message: "Menu Updated",
    });
  };

  delete = async (req, res) => {
    await Menu.deleteOne({ id: req.params.id });

    return res.json({
      status: "success",
      data: null,
      message: "Menu Deleted",
    });
  };
}

export default new MenuController();
